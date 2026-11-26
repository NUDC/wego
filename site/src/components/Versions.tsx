import { REPO_URL } from '../config'
import type { ReleasesState } from '../hooks/useReleases'
import { displayNotes, formatDate, formatSize, normalizeVersion } from '../utils'

export default function Versions({ state }: { state: ReleasesState }) {
  const { releases, loading, failed, stale } = state

  return (
    <section className="section" id="versions">
      <div className="container">
        <h2 className="section-title">历史版本</h2>
        <p className="section-sub">全部版本直接来自 GitHub Releases，发布即生效。</p>

        {loading && <p className="hint">正在获取版本列表…</p>}

        {failed && (
          <p className="hint">
            版本列表获取失败（可能是网络或 API 限流），
            <a href={`${REPO_URL}/releases`} target="_blank" rel="noreferrer">
              前往 GitHub Releases
            </a>
            查看完整列表。
          </p>
        )}

        {!loading && !failed && releases.length === 0 && (
          <p className="hint">
            暂无发布记录，
            <a href={`${REPO_URL}/releases`} target="_blank" rel="noreferrer">
              前往 GitHub Releases
            </a>
            查看。
          </p>
        )}

        <div className="version-list">
          {releases.map((item, index) => {
            const asset =
              item.assets.find((a) => a.name.toLowerCase().endsWith('.exe')) ??
              item.assets.find((a) => a.name.toLowerCase().endsWith('.zip')) ??
              item.assets[0]
            const downloadUrl = asset?.browser_download_url ?? item.html_url
            const notes = displayNotes(item.body)

            return (
              <div className="card version-row" key={item.tag_name}>
                <div className="version-main">
                  <h3>
                    {normalizeVersion(item.name || item.tag_name)}
                    {index === 0 && !item.prerelease && (
                      <span className="tag tag-latest">最新</span>
                    )}
                    {item.prerelease && <span className="tag">预发布</span>}
                  </h3>
                  {notes && <p className="version-note">{notes}</p>}
                  <p className="version-meta">
                    {formatDate(item.published_at)}
                    {asset && ` · ${formatSize(asset.size)}`}
                    {asset && ` · ${asset.download_count} 次下载`}
                  </p>
                </div>
                <a className="btn btn-outline" href={downloadUrl}>
                  下载
                </a>
              </div>
            )
          })}
        </div>

        {stale && releases.length > 0 && (
          <p className="hint">
            当前为缓存数据，
            <a href={`${REPO_URL}/releases`} target="_blank" rel="noreferrer">
              在 GitHub 查看最新发布
            </a>
            。
          </p>
        )}
      </div>
    </section>
  )
}
