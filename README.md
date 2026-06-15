# Clash Premium — binary backup mirror

Mirror of [zhongfly/Clash-premium-backup](https://github.com/zhongfly/Clash-premium-backup), maintained by [JieMeiDev](https://github.com/JieMeiDev) after upstream archival.

## Final build (recommended)

**Release:** [`2023-09-05-gdcc8d87`](https://github.com/JieMeiDev/clash-premium-backup/releases/tag/2023-09-05-gdcc8d87) — last known Premium nightly, commit hash `gdcc8d87`.

Official GitHub Release tag `premium` (**2023.08.17**) uses the same commit (`2023.08.17-13-gdcc8d87`).

| Platform (router) | Asset example |
|-------------------|---------------|
| Linux amd64 | `clash-linux-amd64-n2023-09-05-gdcc8d87.gz` |
| Linux arm64 | `clash-linux-arm64-n2023-09-05-gdcc8d87.gz` |
| Linux arm64 (OpenClash) | `clash-linux-arm64-2023.08.17-13-gdcc8d87.gz` |

Go **source** for Premium was never published by Dreamacro. See [JieMeiDev/clash-premium](https://github.com/JieMeiDev/clash-premium) for a community source snapshot.

---

# Clash-premium-backup

本仓库用于备份 Clash Premium 的 Release 版本以及每夜版本

Trigger by [pipedream](https://pipedream.com/)

## 每夜版本

从 https://nightly.icpz.workers.dev/latest/ 下载每夜构建进行备份（检查更新频率：每小时）

自2022.01.10版本开始备份

> 不会重复备份相同的文件，只有文件名中git提交hash发生变化时才会新建备份。

## Release版本

从 https://github.com/Dreamacro/clash/releases/tag/premium 下载release版本进行备份（检查更新频率：每小时）

自2022.01.03版本开始备份
