# Clash Premium — source & binary archive

Archive mirror of **Clash Premium** Go source and official binaries preserved by the community after Dreamacro removed the upstream repositories in November 2023.

Maintained by [JieMeiDev](https://github.com/JieMeiDev) as a read-only reference — no functional changes intended.

## Important: official source was never public

Dreamacro developed Clash Premium in a **private** repository. Only **compiled binaries** were published (free of charge). There is **no official public Git commit** matching the final Premium build.

| What | Status |
|------|--------|
| Official Premium **source** at final version | **Not available** |
| Official Premium **binaries** at final version | Archived in **[Releases](https://github.com/JieMeiDev/clash-premium-backup/releases)** of this repository |
| Community Premium **source** snapshot (this repo) | Best-effort mirror with TUN / TProxy / Fake-IP features |

## This snapshot

| Field | Value |
|-------|-------|
| **Module** | `github.com/Dreamacro/clash` |
| **Baseline commit** | `6fa5c10` (2022-08-25) |
| **Forked from** | [ElemenTP/Clash.Premium](https://github.com/ElemenTP/Clash.Premium) (community mirror of leaked/private Premium tree) |
| **License** | GPL-3.0 (see [LICENSE](LICENSE)) |
| **Binary backups since** | 2022-01-03 (releases), 2022-01-10 (nightlies) |

Premium-only features present in this tree include **TUN**, **TProxy**, **Fake-IP DNS**, **Rule Providers**, **Script rules**, and **Process-based routing** (`listener/tun`, `gvisor.dev/gvisor`, etc.).

## Final official binaries (not this source tree)

The last Premium builds distributed by Dreamacro:

| Channel | Version | Git hash in filename |
|---------|---------|----------------------|
| GitHub Release tag `premium` | **2023.08.17** | `gdcc8d87` (13 commits after 2023.08.17) |
| Last nightly backup | **2023-09-05** | `gdcc8d87` |

Download all platforms from **[Release `2023-09-05-gdcc8d87`](https://github.com/JieMeiDev/clash-premium-backup/releases/tag/2023-09-05-gdcc8d87)**.

For router / OpenWrt (arm64 example):

```text
clash-linux-arm64-2023.08.17-13-gdcc8d87.gz
```

| Platform (router) | Asset example |
|-------------------|---------------|
| Linux amd64 | `clash-linux-amd64-n2023-09-05-gdcc8d87.gz` |
| Linux arm64 | `clash-linux-arm64-n2023-09-05-gdcc8d87.gz` |
| Linux arm64 (OpenClash) | `clash-linux-arm64-2023.08.17-13-gdcc8d87.gz` |

## Related archives

| Repository | Contents |
|------------|----------|
| [JieMeiDev/clash](https://github.com/JieMeiDev/clash) | Open-source Clash core **v1.18.0** (no Premium features) |
| [MetaCubeX/mihomo](https://github.com/MetaCubeX/mihomo) | Actively maintained open-source successor |

## Build (community snapshot)

```bash
go build -o clash .
```

Requires Go 1.19+ (see `go.mod`). Build output is **not** byte-identical to official Premium `gdcc8d87` binaries.

## Notes

- This repository is **not** affiliated with Dreamacro.
- For production use on a router today, prefer official **`gdcc8d87` binaries** from [Releases](https://github.com/JieMeiDev/clash-premium-backup/releases), or migrate to **mihomo**.
- Original upstream docs: [Clash Wiki](https://github.com/Dreamacro/clash/wiki) (archived).

## Web UI

Bundled UI forks under `ui/`:

| Path | Origin |
|------|--------|
| [ui/clashdashboard/](ui/clashdashboard/) | clash-dashboard |
| [ui/yacd/](ui/yacd/) | yacd |

Use one UI against Clash External Controller. Build with `pnpm install && pnpm build` inside each directory.
