import { useEffect, useState } from 'react'

export default function CopyLinkButton({ url, label = '复制下载链接' }: { url: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      // 非安全上下文下剪贴板不可用，退化成选中提示
      window.prompt('复制下载链接：', url)
    }
  }

  return (
    <button type="button" className="btn btn-ghost" onClick={copy}>
      {copied ? '已复制 ✓' : label}
    </button>
  )
}
