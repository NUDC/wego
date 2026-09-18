/// <reference types="vite/client" />

import type { LatestRelease } from './types'

declare global {
  /**
   * 构建期从 GitHub Releases API 抓取并内联的最新版本。
   * 构建时网络不可用则为 null，由运行时获取兜底。
   */
  const __RELEASE__: LatestRelease | null
}

export {}
