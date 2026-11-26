/** 把 ISO 时间或 20251228 格式化成 2025-12-28。 */
export function formatDate(value: string): string {
  if (/^\d{8}$/.test(value)) {
    return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`
  }
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? value
    : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
        date.getDate(),
      ).padStart(2, '0')}`
}

export function formatSize(bytes: number): string {
  if (!bytes) return ''
  const mb = bytes / 1024 / 1024
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`
}

/**
 * 发布说明里可能包含给客户端看的强制更新标记，官网上不展示这些元信息。
 */
export function displayNotes(body: string | null | undefined): string {
  if (!body) return ''
  return body
    .split(/\r?\n/)
    .filter(
      (line) =>
        !/^\s*(force|强制更新)\s*[:：]\s*true\s*$/i.test(line) &&
        !/^\s*(min-version|最低版本)\s*[:：]\s*\d+\.\d+\.\d+\s*$/i.test(line),
    )
    .join('\n')
    .trim()
}

/** 展示版本号时统一去掉历史 tag 中的 v 前缀。 */
export function normalizeVersion(value: string): string {
  return value.replace(/^v/i, '')
}
