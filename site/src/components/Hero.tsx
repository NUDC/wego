import { APP, REPO_URL } from '../config'
import type { LatestRelease } from '../types'
import { formatDate } from '../utils'
import CopyLinkButton from './CopyLinkButton'

type Props = {
  /** 构建期内联或运行时获取到的最新版本；都拿不到时为 null */
  release: LatestRelease | null
  loading: boolean
}

export default function Hero({ release, loading }: Props) {
  return (
    <header className="hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-inner">
        <a className="badge" href={`${REPO_URL}/releases`} target="_blank" rel="noreferrer">
          <span className="badge-dot" />
          {release
            ? `最新版本 v${release.version} · ${formatDate(release.pubTime)}`
            : loading
              ? '正在获取最新版本…'
              : '前往 GitHub 查看发布'}
        </a>

        <h1 className="hero-title">
          {APP.name}
          <span className="hero-latin">{APP.latinName}</span>
        </h1>
        <p className="hero-tagline">{APP.tagline}</p>
        <p className="hero-desc">{APP.description}</p>

        <div className="hero-actions">
          {release ? (
            <>
              <a className="btn btn-primary" href={release.downloadUrl}>
                <span className="btn-icon" aria-hidden="true">
                  ↓
                </span>
                下载 v{release.version}
              </a>
              <CopyLinkButton url={release.downloadUrl} />
            </>
          ) : (
            <a className="btn btn-primary" href={`${REPO_URL}/releases/latest`}>
              <span className="btn-icon" aria-hidden="true">
                ↓
              </span>
              {loading ? '获取中…' : '前往 GitHub 下载'}
            </a>
          )}
        </div>

        <p className="hero-meta">
          {APP.platform} · zip 免安装 ·{' '}
          <a href={`${REPO_URL}/releases`} target="_blank" rel="noreferrer">
            查看全部版本
          </a>
        </p>

        {release?.note && (
          <div className="release-note">
            <span className="release-note-label">本次更新</span>
            <p>{release.note}</p>
          </div>
        )}
      </div>
    </header>
  )
}
