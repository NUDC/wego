import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { REPO_NAME, REPO_OWNER } from './src/config'
import { toLatestRelease } from './src/types'
import type { GithubRelease, LatestRelease } from './src/types'

/**
 * 构建期抓一次最新 Release，内联进产物作为首屏数据。
 *
 * 这样首屏不依赖用户端网络、不吃 API 限流；运行时再拉一次拿到更新的数据。
 * 抓取失败不阻断构建，退化成纯运行时获取。
 */
async function fetchLatestRelease(): Promise<LatestRelease | null> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
  // CI 里带上 token，避开匿名 60 次/小时的限流
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`,
      { headers },
    )
    if (!res.ok) throw new Error(`GitHub API ${res.status}`)

    const data = (await res.json()) as GithubRelease
    return toLatestRelease(data)
  } catch (error) {
    console.warn(
      `[wego] 构建期获取 Release 失败，首屏改由运行时获取：${(error as Error).message}`,
    )
    return null
  }
}

// 项目页部署在 https://<user>.github.io/wego/，资源路径必须带上仓库名前缀。
// 换成自定义域名（CNAME）时把 base 改回 '/'。
export default defineConfig(async () => ({
  base: '/wego/',
  plugins: [react()],
  define: {
    __RELEASE__: JSON.stringify(await fetchLatestRelease()),
  },
}))
