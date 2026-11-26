/** 站点文案与仓库信息，改这里就能改官网内容。 */

export const REPO_OWNER = 'NUDC'
export const REPO_NAME = 'wego'
export const REPO_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}`

export const APP = {
  name: 'Wego Network Proxy',
  tagline: '轻量、专注的 Windows 桌面代理客户端',
  description:
    '支持订阅分组、节点管理、节点检测与一键连接；本地 HTTP / SOCKS5 混合入口，可按需开启系统代理。',
  platform: 'Windows 10 / 11 · 64 位',
}

export const FEATURES = [
  {
    icon: '📡',
    title: '订阅分组',
    desc: '订阅节点按订阅分组展示，更新订阅时自动替换，手动节点保留。',
  },
  {
    icon: '🧩',
    title: '多协议支持',
    desc: 'SOCKS5、HTTP、Shadowsocks、VMess、VLESS、Trojan、Hysteria2 等节点均可添加。',
  },
  {
    icon: '⚡',
    title: '一键连接',
    desc: '选中节点即可连接，本地 HTTP 与 SOCKS5 共用同一监听端口，应用无需逐个配置。',
  },
  {
    icon: '🔍',
    title: '节点检测',
    desc: '可检测选中节点或全部节点，延迟与出口 IP 实时展示，帮你快速挑出可用线路。',
  },
  {
    icon: '🛡️',
    title: '系统代理',
    desc: '连接时可自动写入 Windows 代理设置，断开时恢复；域名黑名单支持直连。',
  },
  {
    icon: '🔄',
    title: '自动更新',
    desc: '启动自动检查更新，可选更新每个版本只提醒一次，强制更新不可跳过。',
  },
]

export const INSTALL_STEPS = [
  '点击上方按钮下载 exe 安装包。',
  '将 exe 放到任意目录（建议非系统盘，路径不含中文）。',
  '双击 exe 启动，可右键发送到桌面快捷方式。',
  '若 Windows 提示「已保护你的电脑」，点击「更多信息 → 仍要运行」。',
]

export const FAQ = [
  {
    q: '支持哪些节点协议？',
    a: '支持 SOCKS5、HTTP、Shadowsocks、VMess AEAD、VLESS、Trojan、Hysteria2，输入格式涵盖分享链接、JSON 数组与 Clash YAML proxies。',
  },
  {
    q: '本地监听地址在哪里修改？',
    a: '点击状态栏左侧的监听地址，可在下拉选项中直接修改 IP 和端口，例如 http+socks://127.0.0.1:7890；HTTP 与 SOCKS5 共用一个端口。',
  },
  {
    q: '如何开启系统代理？',
    a: '点击状态栏右侧的「系统代理」开关即可。连接时会自动写入 Windows 代理设置，断开时自动恢复。',
  },
  {
    q: '下载速度慢怎么办？',
    a: '安装包托管在 GitHub Releases，国内访问偶尔较慢。可复制下载链接后用迅雷等多线程工具下载，或稍后重试。',
  },
  {
    q: '如何回退到旧版本？',
    a: '在下方「历史版本」中选择需要的版本下载，覆盖旧 exe 即可。',
  },
]
