# wego

Wego Network Proxy 官网（GitHub Pages）。

## 数据源

**GitHub Releases 是唯一真源**：安装包、发布说明、版本列表和桌面端更新检查都来自 Releases API。不需要维护 `latest.json`。

| 用途 | 取数方式 |
| --- | --- |
| 官网首屏 | 构建期调 Releases API 内联进产物 |
| 官网「历史版本」列表 | 浏览器运行时调 Releases API，缓存 30 分钟 |
| 桌面端检查更新 | 请求 `https://api.github.com/repos/NUDC/wego/releases/latest`，读取 Windows exe 与 `.sha256` asset |

## 目录结构

```
site/                               官网源码（React + Vite + TypeScript）
  src/config.ts                     站点文案
  vite.config.ts                    base='/wego/'，构建期抓取最新 Release
.github/workflows/deploy-pages.yml  push main 或发布 Release 时自动部署
```

站点地址：https://nudc.github.io/wego/

## 首次启用 Pages（只需做一次）

GitHub 仓库 → **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。

## 本地开发

```bash
cd site
npm install
npm run dev      # http://localhost:5173/wego/
npm run build
npm run preview
```

## 发布新版本

由私有 `wego-desktop` 仓库的发布 workflow 自动完成：

1. 构建 Windows 安装包并计算 SHA256。
2. 上传 `wego-windows-x64-<version>.exe` 和 `.exe.sha256` 到本仓库 GitHub Release。
3. Release 发布后自动触发 Pages 重新部署。
4. 桌面端通过 Releases API 获取最新版本并校验下载包。

安装包只放 Release，不要提交进仓库：Pages 有 1GB 站点限制，二进制进 git 后历史也清不掉。

## 自定义域名

在 `site/public/` 下加 `CNAME` 文件，并将 `site/vite.config.ts` 中 `base` 改成 `'/'`。
