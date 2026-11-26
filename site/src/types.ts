import { displayNotes } from './utils'

/** 首屏展示用的精简版本信息，由 GitHub Release 归一化而来。 */
export interface LatestRelease {
  version: string
  downloadUrl: string
  note: string
  /** 形如 20251228 */
  pubTime: string
}

/** GitHub Releases API 返回中我们用到的字段。 */
export interface GithubRelease {
  tag_name: string
  name: string | null
  body: string | null
  published_at: string
  html_url: string
  prerelease: boolean
  draft: boolean
  assets: Array<{
    name: string
    browser_download_url: string
    size: number
    download_count: number
  }>
}

/** 把 Releases API 的条目转成首屏用的结构。 */
export function toLatestRelease(release: GithubRelease): LatestRelease {
  const asset =
    release.assets.find((a) => a.name.toLowerCase().endsWith('.exe')) ??
    release.assets.find((a) => a.name.toLowerCase().endsWith('.zip')) ??
    release.assets[0]

  return {
    version: release.tag_name.replace(/^v/i, ''),
    downloadUrl: asset?.browser_download_url ?? release.html_url,
    note: displayNotes(release.body),
    pubTime: release.published_at,
  }
}
