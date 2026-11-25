# wego

哪都通官网（GitHub Pages）。

## 数据源

- **GitHub Releases**：安装包与发布说明的真源。
- **`site/public/updates/latest.json`**：桌面端自动更新清单，由私有 `wego-desktop` 发布流程自动写入并触发 Pages 部署。

| 用途 | 取数方式 |
| --- | --- |
| 官网首屏/历史版本 | 构建期/运行时调 GitHub Releases API |
| 桌面端检查更新 | 请求 `https://nudc.github.io/wego/updates/latest.json` |

## 目录结构

```
site/                               官网源码（React + Vite + TypeScript）
  public/updates/latest.json        桌面端更新清单（自动生成）
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
2. 上传安装包到本仓库 GitHub Release。
3. 更新 `site/public/updates/latest.json`（版本、下载 URL、sha256、size、发布时间、说明）。
4. 提交 manifest 后触发 Pages 部署。

`latest.json` 示例：

```json
{
  "version": "0.1.1",
  "pub_date": "2026-11-25T00:00:00Z",
  "notes": "更新说明",
  "windows": {
    "x64": {
      "url": "https://github.com/NUDC/wego/releases/download/v0.1.1/wego-windows-x64-0.1.1.zip",
      "sha256": "<sha256>",
      "size": 12345678
    }
  },
  "min_supported_version": "0.1.0"
}
```

## 自定义域名

在 `site/public/` 下加 `CNAME` 文件，并将 `site/vite.config.ts` 中 `base` 改成 `'/'`。
