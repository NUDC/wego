/** 站点文案与仓库信息，改这里就能改官网内容。 */

export const REPO_OWNER = 'NUDC'
export const REPO_NAME = 'wego'
export const REPO_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}`

export const APP = {
  name: '哪都通',
  latinName: 'WeGo',
  tagline: '一个应用，哪都能通',
  description:
    '轻量、快速的桌面客户端，内置自动更新。下载解压即用，无需安装，不写注册表。',
  platform: 'Windows 10 / 11 · 64 位',
}

export const FEATURES = [
  {
    icon: '⚡',
    title: '即开即用',
    desc: '绿色免安装，解压后双击即可运行，不污染系统环境。',
  },
  {
    icon: '🔄',
    title: '自动更新',
    desc: '客户端启动时比对 GitHub 最新发布，有新版本会主动提示，一键升级。',
  },
  {
    icon: '🧩',
    title: '持续迭代',
    desc: '全新页面与全新功能持续上线，聊天功能开发中。',
  },
  {
    icon: '🔓',
    title: '公开透明',
    desc: '所有安装包均由 GitHub Releases 分发，来源可追溯，无第三方跳转。',
  },
]

export const INSTALL_STEPS = [
  '点击上方按钮下载 zip 安装包。',
  '右键解压到任意目录（建议非系统盘，路径不含中文）。',
  '双击目录中的主程序启动，可右键发送到桌面快捷方式。',
  '若 Windows 提示「已保护你的电脑」，点击「更多信息 → 仍要运行」。',
]

export const FAQ = [
  {
    q: '下载速度慢怎么办？',
    a: '安装包托管在 GitHub Releases，国内访问偶尔较慢。可复制下载链接后用迅雷等多线程工具下载，或稍后重试。',
  },
  {
    q: '为什么杀毒软件会报警？',
    a: '未做代码签名的小众程序容易被误报。可在 Releases 页面核对文件来源后添加信任，介意的话也可以自行构建。',
  },
  {
    q: '如何回退到旧版本？',
    a: '在下方「历史版本」中选择需要的版本下载，解压覆盖原目录即可。',
  },
]
