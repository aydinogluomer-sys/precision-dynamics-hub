# Phase 11 Residual Literal Audit
Date: 2026-04-17
Scope: Locked zones (admin/, musteri/, integrations/supabase/, ui/, AdminDashboard, MusteriPaneli, CADDashboard, AdminLogin, lib/tokens.ts) **EXCLUDED** per execution contract.

## Pass A — hex/rgb/hsl literals (non-locked)

**Total: 56 literals across 11 files.**

| File | Line | Value | Proposed Token |
|---|---|---|---|
| src/components/CNCModel.tsx | 16 | `"#0688AD"` | `var(--precision-ice)` (THREE.Color literal — see notes) |
| src/components/CNCModel.tsx | 17 | `"#1e293b"` | `var(--surface-base)` |
| src/components/CNCModel.tsx | 18 | `"#94a3b8"` | `var(--material-chrome)` |
| src/components/CNCModel.tsx | 107 | `color="#ffffff"` | `var(--text-primary)` |
| src/components/CNCModel.tsx | 108-109 | `color="#0688AD"` | `var(--precision-ice)` |
| src/components/IndustryModels.tsx | 10-13 | THREE.Color hex map | precision/material/surface tokens |
| src/components/IndustryModels.tsx | 348-351 | R3F light color props | precision tokens |
| src/components/ModelViewer.tsx | 23-28 | Material picker labels | static palette (KEEP — user-facing color picker) |
| src/components/ModelViewer.tsx | 40-53 | Error gizmo materials | `var(--heat-molten)` red |
| src/components/ModelViewer.tsx | 247 | useState init `"#94a3b8"` | `var(--material-chrome)` |
| src/components/ModelViewer.tsx | 506-520 | R3F GizmoViewport axes | static R3F palette (KEEP — XYZ axis convention) |
| src/components/ProjectShowcase.tsx | 181-183 | RGB chroma split | KEEP `// OK: chroma split` (already exempt) |
| src/components/QuickQuoteSection.tsx | 191 | `rgb(34 197 94 / 0.4)` Tailwind green | `rgb(var(--heat-molten-rgb) / 0.4)` (success state) |
| src/components/ServicesSection.tsx | 292 | `color: "#ffffff"` | `var(--text-primary)` |
| src/components/auth/SocialIcons.tsx | 3-11 | Brand SVG fills (Google/LinkedIn) | KEEP — official brand assets |
| src/hooks/useTilt.ts | 18 | `rgba(255,255,255,0.07)` radial | `rgb(var(--text-primary-rgb) / 0.07)` |
| src/pages/NotFound.tsx | 69-73 | `hsla(...)` glitch ribbon | KEEP — dynamic hue cycling, design intent |
| src/pages/NotFound.tsx | 121-129 | `rgba(0,0,0,...)` overlay | `rgb(var(--surface-base-rgb) / N)` |
| src/pages/ServiceDetail.tsx | 189 | `hsl(220,15%,8%)` gradient | `var(--surface-base)` |
| src/pages/TeklifAl.tsx | 63-68 | Material picker labels | static palette (KEEP — same as ModelViewer) |
| src/pages/TeklifAl.tsx | 76-91 | R3F meshStandardMaterial colors | precision tokens |
| src/pages/TeklifAl.tsx | 285 | useState init `"#94a3b8"` | `var(--material-chrome)` |
| src/pages/TeklifAl.tsx | 736-750 | R3F GizmoViewport axes | KEEP (XYZ convention) |

**AMBIGUITY → FIX-07 candidates** (not in deterministic mapping table):
- `#94a3b8` (slate-400) → mapped to `--material-chrome` (closest semantic match, both are silver-grey).
- `#1e293b` (slate-800) → mapped to `--surface-base` per table.
- `#0688AD` → mapped to `--precision-ice` per table.
- `#ffffff` → mapped to `--text-primary` per table.
- `hsl(220 15% 8%)` → mapped to `--surface-base` per table.
- Brand SVG colors (Google/LinkedIn icons) → **KEEP**, official brand assets.
- R3F XYZ axis colors (`#ef4444 #22c55e #3b82f6`) → **KEEP**, 3D viewer convention.
- ModelViewer/TeklifAl material picker palette → **KEEP**, user-facing color picker UI.
- NotFound glitch hsla cycling → **KEEP**, dynamic hue is design intent.

## Pass B — Tailwind preset literals (non-locked)

**Total: 31 occurrences across 9 files.**

| File | Line | Class | Proposed Replacement |
|---|---|---|---|
| src/components/CertificationsSection.tsx | 43 | `group-hover:bg-white/10` | `group-hover:bg-[rgb(var(--text-primary-rgb)/0.1)]` |
| src/components/ChatBot.tsx | 240 | `hover:bg-white/20` | `hover:bg-[rgb(var(--text-primary-rgb)/0.2)]` |
| src/components/ProjectShowcase.tsx | 221 | `bg-white/10` | `bg-[rgb(var(--text-primary-rgb)/0.1)]` |
| src/components/auth/LoginLeftPanel.tsx | 27,32 | `text-white` | `text-[var(--text-primary)]` |
| src/components/auth/LoginLeftPanel.tsx | 28,35,48,54 | `text-white/N` | `text-[rgb(var(--text-primary-rgb)/0.N)]` |
| src/components/auth/LoginLeftPanel.tsx | 52 | `border-white/10` | `border-[rgb(var(--text-primary-rgb)/0.1)]` |
| src/pages/ForgotPassword.tsx | 90 | `text-white` | `text-[var(--text-primary)]` |
| src/pages/Login.tsx | 224 | `text-white` | `text-[var(--text-primary)]` |
| src/pages/Malzemeler.tsx | 117-123,339-340 | `text-white` / `text-white/N` / `bg-white/10` / `border-white/20` | token equivalents |
| src/pages/ResetPassword.tsx | 134 | `text-white` | `text-[var(--text-primary)]` |
| src/pages/ServiceDetail.tsx | 195-224 | `text-white` / `text-white/N` / `bg-white/N` / `border-white/N` / `hover:text-white` | token equivalents |
| src/pages/TeklifAl.tsx | 1212-1219 | `text-white` / `border-white/20` / `hover:bg-white/10` | token equivalents |

## Pass C — invalid `rgba(var(--))` syntax

**Total: 0** ✅

(Pass C is clean — no malformed alpha syntax.)

## Batch Strategy Decision

11 files in Pass A + 9 files in Pass B = **~14 unique files** (overlap on Malzemeler, ServiceDetail, TeklifAl, ProjectShowcase).

Per execution contract: **10–18 files → 3 batches × max 6 files** (UI primitives → interactive → sections).

- **Batch 1 (auth + small UI)**: SocialIcons (KEEP-only audit), LoginLeftPanel, ForgotPassword, Login, ResetPassword
- **Batch 2 (interactive overlays + tilt)**: ChatBot, CertificationsSection, ProjectShowcase, useTilt, QuickQuoteSection, ServicesSection
- **Batch 3 (pages + R3F)**: Malzemeler, ServiceDetail, NotFound, TeklifAl, CNCModel, IndustryModels, ModelViewer

R3F `THREE.Color()` literals technically run inside JS (not CSS), so `var(--*)` won't resolve there — they need a runtime CSS variable read or stay as hex with a `// OK: R3F runtime color, not CSS` exemption comment. Plan does not exempt these explicitly → **AMBIGUITY** flagged below.

## AMBIGUITY DETECTED — REQUIRES USER DECISION (FIX-07)

The following literals cannot be migrated without violating either the locked-zone rule, the no-CSS-in-JS-token rule, or the "no new dependencies" rule:

1. **R3F `THREE.Color("#xxxxxx")` literals** (CNCModel, IndustryModels, ModelViewer, TeklifAl): WebGL materials cannot read CSS custom properties at runtime without a `getComputedStyle` bridge. Options:
   - (a) Add `// OK: R3F runtime, not CSS` exemption comments and update the ESLint rule to honor `// OK:` markers (already supported).
   - (b) Build a runtime `getCssVar()` helper and read tokens at mount time (adds re-render complexity).
   - (c) Keep current hex values, document as "WebGL palette, separate from CSS tokens".

2. **Brand SVG colors** (SocialIcons.tsx — Google/LinkedIn): Official brand identity hex values required by brand guidelines. Recommend: add `// OK: brand asset` exemption.

3. **3D Gizmo XYZ axes** (`#ef4444`/`#22c55e`/`#3b82f6` in ModelViewer + TeklifAl): Industry-standard X=red, Y=green, Z=blue for 3D viewers. Recommend: `// OK: XYZ convention` exemption.

4. **Material picker palettes** (ModelViewer + TeklifAl `MATERIAL_COLORS`): User-facing color picker for STEP/STL render preview. Each entry IS the color shown to the user. Recommend: `// OK: user-facing palette` exemption.

5. **NotFound glitch hsla cycling** (lines 69-73): `hsla(${r.hue}, ...)` uses dynamic hue rotation — there is no single token to map to. Recommend: `// OK: dynamic glitch hue` exemption.

**Per FIX-07 protocol, execution HALTS pending user decision on items 1-5 above.**
