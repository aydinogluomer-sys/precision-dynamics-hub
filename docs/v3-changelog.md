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
- [ ] `xlsx` dynamic import (bundle baseline öneri)
- [ ] Footer/Malzemeler/NotFound içindeki kalan hardcoded renkler (v3.1)
- [ ] Memory dosyaları güncellemesi (`forge-steel-palette` → v2.0 referansı)
