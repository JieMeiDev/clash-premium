# Changelog

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

**Versioning:** bump `package.json` and add a changelog entry for every user-facing change before release.

---

## [0.1.17] - 2026-06-16

### Changed

- Typography: unified font weights to 400 (body/titles) and 500 (labels, table headers, modal titles)
- Page titles (`h1`): weight 400, Apple theme colors `#000` / `#fff`; removed conflicting `md:text-xl` utility
- Overview stat cards: labels and values share weight 400; hierarchy via size and color
- Settings, Connections drawer, and modal labels: `font-bold` (700) → medium (500)
- Statistics rank weight 500; proxy node names 12px for readability

---

## [0.1.16] - 2026-06-16

### Added

- **Statistics** page (`/statistics`, sidebar **Stats**): top 10 LAN IPs and top 10 destination IPs by download for the current calendar month
- Monthly stats persisted in `localStorage` (per external controller); survives Clash and router restarts when using the same browser
- One-click **Clear** button to reset current month statistics

### Changed

- Connections table: fixed **Destination IP** (180px) and **Chains** (320px) column widths
- Connections table layout: `table-layout: fixed` and standard table cells (fixes Type/TProxy wrapping into the first column)

---

## [0.1.15] - 2026-06-16

### Added

- **Theme switcher** in sidebar footer (YACD-style): single icon button opens Auto / Dark / Light menu with checkmark on the active choice
- Theme preference persisted in `localStorage`; **Auto** follows system `prefers-color-scheme`

### Changed

- Removed sidebar **Clash Version** label (version remains on **About** page)
- Sidebar footer now groups theme switcher and About icon, matching YACD layout

---

## [0.1.14] - 2026-06-16

### Added

- **Apple HIG** theme layer (`apple-theme.scss`): iOS Settings–style typography, colors, and grouped cards

### Changed

- Dark mode: pure black page background (`#000`) with `#1c1c1e` grouped cards on Connections and Logs
- Unified Connections table colors (header, fixed column, and card share one surface)
- Logs panel uses transparent inner background inside the card container
- Card radius 12px; header large-title style

---

## [0.1.13] - 2026-06-15

### Fixed

- **Mobile Proxies scroll (complete fix):** mobile `.page` uses `height: auto` so content can grow; Logs keeps internal scroll via `logs-page`
- **Policy group tags on mobile:** always expanded (no Expand/Collapse); removes iOS `overflow-y-hidden` swipe trap

---

## [0.1.12] - 2026-06-15

### Fixed

- **Mobile Proxies:** page can scroll vertically again (strategy groups and proxy list)
- Proxy group tags no longer block vertical swipe on iOS (`touch-action: pan-y`)

---

## [0.1.11] - 2026-06-15

### Changed

- **About** page: Clash core Source link now points to [JieMeiDev/clash](https://github.com/JieMeiDev/clash) archive mirror

---

## [0.1.10] - 2026-06-15

### Fixed

- **Mobile dark mode:** pinned Source IP column background now matches other columns (was `#1c1c1e` vs card `#2c2c2e`)

---

## [0.1.9] - 2026-06-15

### Added

- **Mobile Connections** page: show in top nav (label **Conns**), responsive table and full-width detail drawer

### Changed

- On small screens, Connections table hides Network / Chains / Rule / Type columns (tap a row for full details)

---

## [0.1.8] - 2026-06-15

### Changed

- **Connections** column order optimized for transparent-proxy production use: Source IP → Destination IP → Speed → Upload → Download → Time → Network → Chains → Rule → Type
- Source IP is now the pinned (fixed) column when scrolling horizontally
- Default sort changed to **Time** descending (newest first)

---

## [0.1.7] - 2026-06-15

### Changed

- Connections table first column renamed from **Host** to **Destination IP**, showing `destinationIP:port` instead of domain host

---

## [0.1.6] - 2026-06-15

### Removed

- **Start at login**, **Set as system proxy**, and **Allow connect from Lan** from Settings — not applicable to transparent-proxy / router deployments
- ClashX jsBridge handlers for system proxy and start-at-login
- `allow-lan` read/write from the dashboard

---

## [0.1.5] - 2026-06-15

### Added

- **Redir port** and **TProxy port** fields on the Settings page (between HTTP and Mixed ports)
- Read/write via Clash API `redir-port` and `tproxy-port`

---

## [0.1.4] - 2026-06-15

### Added

- **About** page showing Clash core version and Clash Dashboard version with GitHub source links
- About entry (info icon) in the sidebar footer

---

## [0.1.3] - 2026-06-15

### Removed

- **Chinese (zh_CN) locale** — UI is English-only
- Language selector on the Settings page

### Fixed

- External controller edit button no longer hardcoded as「编辑」

---

## [0.1.2] - 2026-06-15

### Added

- **Overview** page with real-time upload/download speed, traffic totals, active connection count, and traffic chart (via Clash `/traffic` and `/connections` WebSockets)
- Overview set as the default landing page

---

## [0.1.1] - 2026-06-15

### Removed

- **Process** column on the Connections page (no process metadata under transparent proxy)
- Process / path fields in the connection detail drawer

### Added

- **macOS dark mode** via `prefers-color-scheme: dark` (`src/styles/dark-mode.scss`)
- `color-scheme` and theme-aware `theme-color` meta tags in `index.html`

### Fixed

- README logo and CI badge no longer point at deleted `Dreamacro/*` repositories
- Favicon and PWA manifest icons served from local `public/` assets
- GitHub Actions workflow permissions and invalid `clash.razord.top` deploy target

---

## [0.1.0] - 2023-09-26（上游基线）

官方 Clash Dashboard 最终发布，含 ClashX jsBridge 等。详见 upstream commit history。
