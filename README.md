# wego

哪都通官网（GitHub Pages）

## 数据源

**GitHub Releases 是唯一真源。** 发布一个 Release，官网首屏、历史版本列表、客户端更新提示三处同时生效，
不需要再维护任何版本清单文件（原先的 `latest.json` 已废弃删除）。

| 用途 | 取数方式 |
| --- | --- |
| 官网首屏「下载 vX.X.X」 | 构建期调 Releases API 内联进产物，首屏无需等网络、不吃限流 |
| 官网「历史版本」列表 | 浏览器端调 Releases API，缓存 30 分钟；失败时沿用旧缓存 |
| 客户端「检查更新」 | `wego-desktop` 的 `/upgrade/check` 调 Releases API（经 gh-proxy 加速） |

## 目录结构

```
site/                               官网源码（React + Vite + TypeScript）
  src/config.ts                     站点文案，改官网内容只改这个文件
  vite.config.ts                    base='/wego/'，构建期抓取最新 Release
.github/workflows/deploy-pages.yml  push main 或发布 Release 时自动部署
```

站点地址：<https://nudc.github.io/wego/>

## 首次启用 Pages（只需做一次）

GitHub 仓库 → **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。

## 本地开发

```bash
cd site
npm install
npm run dev      # http://localhost:5173/wego/
npm run build    # 产物在 site/dist
npm run preview  # 预览构建结果
```

## 发布新版本

在 GitHub 上创建 Release（tag 如 `v0.0.7`）并上传 `wego-v0.0.7.zip`，就结束了。

- Release 的 **tag** → 版本号（自动去掉前缀 `v`）
- Release 的 **正文** → 更新说明
- 第一个 `.zip` **asset** → 下载链接
- 发布后自动触发 Pages 重新部署

安装包只放 Release，不要提交进仓库：Pages 有 1GB 站点限制，二进制进 git 后历史也清不掉。

## 自定义域名

在 `site/public/` 下加 `CNAME` 文件，并把 `site/vite.config.ts` 的 `base` 改成 `'/'`。
