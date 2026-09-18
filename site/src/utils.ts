/** 把 latest.json 的 20251228 或 ISO 时间格式化成 2025-12-28。 */
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

/** v0.0.6 与 0.0.6 视为同一个版本。 */
export function normalizeVersion(value: string): string {
  return value.replace(/^v/i, '')
}
