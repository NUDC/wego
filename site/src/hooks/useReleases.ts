import { useEffect, useState } from 'react'
import { REPO_NAME, REPO_OWNER } from '../config'
import type { GithubRelease } from '../types'

export type ReleasesState = {
  releases: GithubRelease[]
  loading: boolean
  /** 拿不到就静默降级，首屏改用构建期内联的版本。 */
  failed: boolean
  /** 数据来自本地缓存（接口限流或断网时的兜底）。 */
  stale: boolean
}

const CACHE_KEY = `wego-releases:${REPO_OWNER}/${REPO_NAME}`
const FRESH_MS = 30 * 60 * 1000

type Cache = { at: number; data: GithubRelease[] }

function readCache(): Cache | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Cache
    return Array.isArray(parsed.data) ? parsed : null
  } catch {
    return null
  }
}

function writeCache(data: GithubRelease[], at: number) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at, data } satisfies Cache))
  } catch {
    // 隐私模式下 localStorage 可能不可写，忽略即可
  }
}

/**
 * 运行时拉取历史版本列表。
 *
 * GitHub 匿名 API 限 60 次/小时/IP，共享出口 IP 很容易打满，所以：
 * 缓存 30 分钟内直接用；过期则后台刷新，请求失败时继续沿用旧缓存，
 * 彻底没有数据时首屏回落到构建期内联的那一份（见 App.tsx）。
 */
export function useReleases(): ReleasesState {
  const [state, setState] = useState<ReleasesState>(() => {
    const cached = readCache()
    return cached
      ? { releases: cached.data, loading: false, failed: false, stale: true }
      : { releases: [], loading: true, failed: false, stale: false }
  })

  useEffect(() => {
    const cached = readCache()
    const now = Date.now()
    if (cached && now - cached.at < FRESH_MS) {
      setState({ releases: cached.data, loading: false, failed: false, stale: false })
      return
    }

    const controller = new AbortController()

    fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases?per_page=20`, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API ${res.status}`)
        return res.json() as Promise<GithubRelease[]>
      })
      .then((data) => {
        const releases = data.filter((item) => !item.draft)
        writeCache(releases, Date.now())
        setState({ releases, loading: false, failed: false, stale: false })
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        // 有旧缓存就继续用，没有才算失败
        setState(
          cached
            ? { releases: cached.data, loading: false, failed: false, stale: true }
            : { releases: [], loading: false, failed: true, stale: false },
        )
      })

    return () => controller.abort()
  }, [])

  return state
}
