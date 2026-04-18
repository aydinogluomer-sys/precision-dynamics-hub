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
