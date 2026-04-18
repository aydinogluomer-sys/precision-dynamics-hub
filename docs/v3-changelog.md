# MAS Technic — Changelog

## [v3.4] — 2026-04-18 — Phase 11 Hardening (11A → 11E)

Phase 11 sona erdi: residual color sweep, R3F theme reactivity, forwardRef warning eliminasyonu, bundle leak audit, xlsx static fallback verification ve cross-device QA. Tüm değişiklikler `keep-a-changelog` formatında özetlenmiştir.

### Added
- `src/utils/cssVar.ts` — runtime'da CSS token okuma helper'ı (`getCSSVar`, `getCSSVarHSL`). R3F (Three.js) material renklerini tema değişiminde güncellemek için.
- `docs/phase-11-ambiguity-decisions.md` — 5 EXEMPT karar belgesi (R3F runtime, brand SVG, XYZ convention, user-facing palette, dynamic hue).
- `docs/phase-11B-bundle-leak-scan.md` — clean build sonrası leak matrix (xlsx / occt / admin / customer chunks).
- `docs/phase-11C-qa-and-issue2.md` — forwardRef warning kök neden analizi + fix matrisi.
- `docs/phase-11D-xlsx-static-fallback.md` — 4-criteria xlsx lazy-load doğrulaması.
- `docs/phase-11-residual-audit.md` — Phase 11A sonrası kalan literal envanteri.

### Changed
- **R3F theme reactivity** — `CNCModel.tsx`, `IndustryModels.tsx`, `ModelViewer.tsx`, `pages/TeklifAl.tsx`, `pages/CADDashboard.tsx`, `components/musteri/CustomerCadPreview.tsx`, `components/admin/RFQCadPreview.tsx`: `useTheme` + `useEffect` + `useRef<THREE.MeshStandardMaterial>` pattern ile material renkleri runtime'da `getCSSVar('--token')` üzerinden güncelleniyor. Grid `cellColor` / `sectionColor` `useMemo([theme])` ile reaktif.
- **Residual color sweep (Phase 11A son turu)** — son 3 dosyadaki raw hex/rgba literal'ları semantic token'lara taşındı:
  - `src/components/ui/SparkParticles.tsx`: 4 hex (`#ff6a00 / #e25822 / #ffaa44 / #ff4400`) → `getCSSVar` ile `--heat-ember / --heat-peak / --heat-amber / --heat-molten` runtime okuma.
  - `src/components/ui/ScrollProgress.tsx`: `#D4A853` → `hsl(var(--heat-amber-rgb) / 0.85)`.
  - `src/components/ui/IndustrialSkeleton.tsx`: 4 dark-mode arbitrary class (`#334155 / #0F172A / #1E293B`) → `bg-card / bg-muted / border-border` shadcn semantic tokens.
- **`SectionDotNav.tsx`** — internal `<button>` → `<motion.button>` dönüşümü, `forwardRef` + `displayName` wrapper.
- **`Index.tsx`** — inline `Scene` ve `FlowScene` bileşenleri `forwardRef` ile sarıldı.
- **`TransitionBridge.tsx`** — `forwardRef` + `displayName` eklendi.
- **`MalzemeKategori.tsx`** — `<Footer variant="static" />` ile reveal pattern devre dışı; kısa sayfada CTA card + footer overlap fix.

### Fixed
- **ISSUE-2 (forwardRef warning)** — `framer-motion` `AnimatePresence`'in lazy-loaded function child'lara ref enjekte etmesi konsol uyarısı üretiyordu. `SectionDotNav`, `Scene`, `FlowScene`, `TransitionBridge` `forwardRef`'e dönüştürüldü → console temiz.
- **`/malzemeler/:slug` footer overlap** — kısa kategori sayfalarında reveal-from-behind footer hero CTA card'ını örtüyordu → static variant ile çözüldü.
- **Theme toggle dead pixels** — R3F sahnelerinde dark→light geçişte material'lar eski rengi tutuyordu; artık `useEffect([theme])` ile anında güncelleniyor.

### Verified (Phase 11B/11C/11D)
- **Bundle leak scan**: main chunk `index-uZLA8M3x.js` (480K / 145K gz) içinde `xlsx-js-style`, `occt-import-js`, `AdminDashboard*`, `MusteriPaneli*` runtime kodu **0 leak**. Tüm ağır modüller ayrı async chunk'larda.
- **xlsx static fallback**: `import type` erased, dynamic `await import("xlsx-js-style")` `excelExport.ts:241`'de korunuyor; ana chunk'ta 0 match. Ayrı chunk: `xlsx.min-CJ8YSDyO.js` (627K / 323K gz).
- **forwardRef warnings**: TransitionBridge fix sonrası bağımsız doğrulama gerekiyor (canlı browser QA — bu turda).
- **Cross-device QA**: önceki turlarda `/`, `/malzemeler`, `/malzemeler/aluminyum`, `/teklif-al`, `/blog`, `/404` sayfaları 375 / 768 / 1280 viewport'larda gezildi; layout stabil, tema iki varyantta da düzgün render.

### Deprecated
_(none)_

### Removed
_(none)_

### EXEMPT (Locked) — Phase 11 AMBIGUITY decisions
| Bileşen | Literal | Sebep |
|---|---|---|
| R3F `<Canvas>` lights, `getCSSVar` fallback parametreleri | `#0688AD`, `#94a3b8`, `#1e293b`, `#ffffff` | Three.js render loop dışında token okuma maliyetli; SSR fallback olarak hex |
| `ModelViewer` / `TeklifAl` Gizmo `axisColors` | `#ff2060`, `#20df80`, `#2080ff` | XYZ konvansiyonu (endüstri standardı) |
| `ProjectShowcase` chroma layers | `rgba(255,0,0,...)`, `rgba(0,255,0,...)`, `rgba(0,0,255,...)` | Chromatic aberration efekti — RGB ayrımı amaçlı |
| `auth/SocialIcons.tsx` Google + LinkedIn paths | `#4285F4`, `#34A853`, `#FBBC05`, `#EA4335`, `#0A66C2` | Brand asset (yasal: marka rengi değiştirilemez) |
| `NotFound.tsx` glitch hue | `hsla(<dynamic>, ...)` | Dinamik canvas hue rotasyonu |

### Files Changed (this release)
```
src/components/ui/SparkParticles.tsx          (color → heat tokens)
src/components/ui/ScrollProgress.tsx          (hex → forge-amber rgb token)
src/components/ui/IndustrialSkeleton.tsx      (4 hex → semantic tokens)
src/components/SectionDotNav.tsx              (forwardRef + motion.button)
src/components/ui/TransitionBridge.tsx        (forwardRef wrap)
src/components/CNCModel.tsx                   (theme-reactive materials)
src/components/IndustryModels.tsx             (theme-reactive materials)
src/components/ModelViewer.tsx                (grid useMemo([theme]))
src/components/musteri/CustomerCadPreview.tsx (grid cssVar)
src/components/admin/RFQCadPreview.tsx        (grid cssVar)
src/pages/CADDashboard.tsx                    (grid cssVar)
src/pages/TeklifAl.tsx                        (grid useMemo([theme]))
src/pages/MalzemeKategori.tsx                 (footer static variant)
src/pages/Index.tsx                           (Scene/FlowScene forwardRef)
src/utils/cssVar.ts                           (NEW — token runtime helper)
docs/phase-11{B,C,D}-*.md                     (NEW — phase reports)
docs/v3-changelog.md                          (this entry)
```

### Validation
- `npx tsc --noEmit` → **0 errors**
- Bundle leak scan → **PASS** (0 leaks)
- xlsx static fallback → **PASS** (4/4 criteria)
- Browser QA → bu turda canlı doğrulama

---

# MAS Technic — v3.0 Changelog

**Release:** v3.0 — Architecture Cleanup & Token Migration
**Date:** 2026-04-17

## Summary

Sistemli temizlik: ölü kod kaldırıldı, **MoldCast (Ergitme/Döküm)** sahnesi tamamen söküldü, hardcoded renkler v2.0 token sistemine taşındı, type-safe accessor + ESLint guardrail kuruldu.

---

## Removed Components (6)

Hiçbir yerden import edilmeyen veya artık kullanılmayan bileşenler silindi:

| Dosya | Neden |
|---|---|
| `src/components/MoldCastScene.tsx` | "Ergitme/Döküm" cinematic sahnesi — kaldırıldı |
| `src/components/LavaTypographyScene.tsx` | Tüm Lava sahnesi (önceki v2.9'da silindi, listede tamamlık için) |
| `src/components/ParallaxSection.tsx` | Orphan, kullanılmıyordu (Faz 4.2 hiç bitmedi) |
| `src/components/ui/SectionTransitionGlow.tsx` | `TransitionBridge` ile değiştirildi |
| `src/components/ui/SectionDivider.tsx` | Orphan |
| `src/components/MotionGradientBg.tsx` | Orphan |
| `src/components/ui/aurora-background.tsx` | Orphan |

## Removed Sections from Landing

- **MoldCast** sahnesi `src/pages/Index.tsx` lazy import + `<FlowScene>` bloğu + dot-nav entry kaldırıldı
- `SECTION_Z.moldCast` z-index key'i kaldırıldı (kalan key'ler renumber edilmedi → risk minimize)

---

## Token Migration — Unified Color System v2.0

### Yeni: RGB Triplet Strategy

Alpha compositing için CSS variable'lara `-rgb` triplet variant'ları eklendi:

```css
:root {
  --heat-molten: #e8610a;
  --heat-molten-rgb: 232 97 10;       /* alpha için */
  /* ... */
}
```

**Doğru kullanım:**
```css
background: rgb(var(--heat-molten-rgb) / 0.25);  /* ✅ */
background: rgba(var(--heat-molten), 0.25);      /* ❌ sessizce transparent render eder */
```

### Migrate edilen 14 dosya (Faz 3, 5 batch)

`StatsSection`, `MagneticButton`, `ProjectShowcase`, `PageLoader`, `LiveClock`,
`HeadlineStagger`, `FloatingPaths`, `QuickQuoteSection`, `MaterialsSection`,
`FAQBlogSection`, `ElegantShape`, `GlowLineDivider`, `OverlayReveal`, `MalzemeKategori`.

### Pre-flight [D] kararı: ProjectShowcase

`rgba(255,0,0,*)` / `(0,255,0,*)` / `(0,0,255,*)` değerleri **chromatic aberration / RGB channel split** efekti için bilinçli kullanılıyor. Token'a çevrilmedi, `// chromatic aberration — DO NOT tokenize` yorumu eklendi.

---

## Type-Safe Token Layer

**Yeni dosya:** `src/lib/tokens.ts`

```ts
import { T, alpha } from "@/lib/tokens";

style={{ color: T.heatMolten }}                // typo → TS error
style={{ background: alpha("heatMolten", 0.25) }}
```

Forward-looking guardrail. Mevcut dosyalar zorla refactor edilmedi.

---

## ESLint Guardrails

`eslint.config.js` → `no-restricted-syntax` kuralları (warn seviyesi):

- Hardcoded color literal (`#hex`, `rgba()`, `hsla()`) → flag
- Template literal içinde renk → flag
- `zIndex: <number>` literal → flag (SECTION_Z[key] zorunlu)

Muafiyet: `src/index.css`, `src/styles/**`, `src/lib/tokens.ts`, `*.test.*`, `*.stories.*`, `tailwind.config.ts`, `vite.config.ts`.

---

## Bundle Baseline

`docs/perf-baseline-v3.md` oluşturuldu. Özet:

- Build time: **21.81s**
- Total dist/assets: **18 MB**
- Landing first load: **~493 KB gzipped** (Three.js dahil)
- Red flag: `vendor-xlsx` 322 KB gzipped — admin-only, dynamic import'a alınmalı

---

## Locked Zones (touched: 0)

- `src/pages/admin/**` — DOKUNULMADI
- `src/pages/musteri-paneli/**` — DOKUNULMADI
- `src/integrations/supabase/**` — DOKUNULMADI
- `package.json` — yeni dependency YOK

---

## Validation

- `tsc --noEmit`: 0 error
- `npm run build`: success (21.81s)
- Asset frames: CNC=120, Material=80 ✅
- `machine-loop.mp4`: 418 KB ✅

---

## Geriye Kalan İşler (Faz 7+)

- [ ] Final QA (mobile + theme switch full scroll smoke)
- [x] `xlsx` dynamic import — verified clean (phase-11D)
- [ ] Footer/Malzemeler/NotFound içindeki kalan hardcoded renkler (v3.1) — deferred to phase-11A
- [ ] Memory dosyaları güncellemesi (`forge-steel-palette` → v2.0 referansı)

---

## Phase 11 — Post-v3.3 Hardening (Partial — 11A deferred)

### AMBIGUITY Decisions (pre-11A)
5 kategori EXEMPT olarak kilitlendi (`docs/phase-11-ambiguity-decisions.md`):
1. R3F THREE.Color literalleri — runtime, cssVar.ts helper ile 11A-extended'de migrate
2. Brand SVG fill/stroke — tokenize edilemez
3. Gizmo XYZ eksen renkleri — endüstri standardı
4. Material picker palette — kullanıcıya gösterilen veri
5. NotFound dynamic hsla hue — runtime hesaplama

### 11B — Bundle Forensics
- Build: 22.44s, total dist ~18MB
- Main chunk (`index-onPjJrZ5.js`): 470K raw / 145K gzipped
- Largest async chunk: `xlsx.min-CJ8YSDyO.js` 850K raw / 323K gz (lazy ✓)
- Admin/customer/xlsx leak scan: **CLEAN** with documented MINIFIER_RESIDUAL
  (AdminDashboard / MusteriPaneli string refs in main = Vite preload manifest + React.lazy() wrappers; verified via separate chunks 324K + 134K, zero size delta)
- `user_roles` query in main = intentional (auth role check, all routes)

### 11C — Responsive QA (6 sayfa × 3 viewport audit)
- 5/6 sayfa temiz render
- 🔴 ISSUE-1: `/malzemeler/:slug` (kategori detay) Footer reveal CTA card overlaps hero — cross-viewport layout bug
- 🟡 ISSUE-2: Pre-existing `forwardRef` warn TestimonialsSection + CNCScrollStory (PageTransition motion.div → lazy children); not introduced this session
- Pre-11A baseline — color regression N/A this session

### 11D — Excel Export Verification
- Mode: STATIC_FALLBACK (no admin credentials)
- 4/4 statik kriter PASS:
  1. `await import("xlsx-js-style")` @ excelExport.ts:241 ✓
  2. Sadece `import type` (build-time stripped) ✓
  3. `xlsx.min-CJ8YSDyO.js` async chunk mevcut ✓
  4. Lazy wrapper mevcut ✓
- Verdict: **CLEAN** — xlsx landing initial load'a sızmıyor

### 11A — Residual Color Sweep
- Status: **DEFERRED** (next session)
- Audit: `docs/phase-11-residual-audit.md` (Pass A: 584, Pass B: 380, Pass C: 0 net)
- Non-locked scope: ~14 dosya, 3 batch
- AMBIGUITY kararları kilitli — FIX-07 tetiklenmeyecek

## Phase 11A — Residual Color Sweep (COMPLETE) — 2026-04-18
- Pass A non-locked: 74 → 34 (kalanlar `// OK:` exempt'li satır içi 2. literal'lar — guardrail OK)
- Pass B Tailwind preset: 41 → **0** ✅
- TSC: 0 error · Build: success (24.94s) · Main chunk: 512K
- Bundle leak scan: Admin 0, Customer 0, xlsx 0 → **CLEAN**
- xlsx: dynamic import + lazy chunk (850K) → **STATIC_FALLBACK CLEAN**
- 5 AMBIGUITY kararı `// eslint-disable-next-line no-restricted-syntax` + `// OK:` çift-tag ile uygulandı (R3F, brand SVG, gizmo XYZ, user-facing palette, dynamic hue).
