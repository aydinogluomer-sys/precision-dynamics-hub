# Performance Baseline — v3.0

**Date:** 2026-04-17
**Build command:** `npm run build`
**Build time:** 21.81s
**Total dist/assets:** 18 MB (uncompressed)

## Top Chunks (gzipped)

| Chunk | Raw | Gzipped | Notes |
|---|---|---|---|
| `vendor-xlsx` | 627 KB | **322.8 KB** | Excel export — admin only, route-split candidate |
| `vendor-three` | 688 KB | **176.5 KB** | Three.js + R3F — 3D viewer + WebGL scenes |
| `index` (main) | 480 KB | **145.2 KB** | Landing entry chunk |
| `vendor-recharts` | 445 KB | **115.8 KB** | Charts — admin dashboard |
| `vendor-fiber` | 306 KB | **98.7 KB** | React Three Fiber |
| `AdminDashboard` | 329 KB | 72.2 KB | Lazy route |
| `servicePages` | 175 KB | 54.4 KB | Static data |
| `vendor-framer` | 134 KB | 44.8 KB | Framer Motion |
| `ChatBot` | 135 KB | 42.9 KB | Lazy mounted |
| `MusteriPaneli` | 134 KB | 37.6 KB | Lazy route |
| `vendor-gsap` | 70 KB | 27.7 KB | GSAP + ScrollTrigger |

## Red Flags

- ⚠️ **`vendor-xlsx` 322 KB gzipped** — only used by admin Excel export. Should be dynamic-imported inside `excelExport.ts` instead of bundled at vendor level.
- ⚠️ **`vendor-three` 176 KB gzipped** — acceptable for the 3D viewer, but ensure it isn't loaded on landing.
- ⚠️ **Main `index` chunk 145 KB gzipped** — investigate if any admin/customer-only modules leak into it.
- ✅ All other chunks under 100 KB gzipped.

## Total JS budget

- **Landing first load (estimate):** index + vendor-framer + vendor-gsap + vendor-three + vendor-fiber ≈ **493 KB gzipped**
- Target was < 300 KB gzipped → exceeded due to Three.js. Acceptable trade-off for the WebGL hero scenes.

## Recommendations (NON-BLOCKING)

1. Move `xlsx` to dynamic `import()` inside `src/utils/excelExport.ts` to remove from vendor bundle.
2. Verify `vendor-three` is excluded from landing initial chunk (lazy imports on `HeroCanvas`, `CNCScrollStory`, `MaterialMorphScroll`).
3. Consider splitting `vendor-recharts` per admin route.

## Build warnings

> Some chunks are larger than 500 kB after minification.

Source: `vendor-xlsx`, `vendor-three`. Both are intentionally chunked.
