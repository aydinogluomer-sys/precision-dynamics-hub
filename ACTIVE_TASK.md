# ACTIVE_TASK.md
> Her session başında oku. Bitince güncelle.
> Bu dosya session hafızasıdır — AI bağlamı kesilince bu dosyadan devam edilir.

---

## Şu An

**Phase:** Phase 2 — Animation Architecture ✅ TAMAMLANDI  
**Sonraki:** Phase 3 — Visual Elevation  
**Branch:** `claude/documentation-roadmap-nwV4C`  
**Tarih:** 2026-05-12

---

## Phase 2 — Tamamlanan İşler

- [x] `src/lib/animation-manager.ts` oluşturuldu (singleton registerPlugin, batchReveal, killAll)
- [x] `src/hooks/use-gsap.ts` → animation-manager'dan re-export only
- [x] `src/components/providers/SmoothScrollProvider.tsx` — duplicate registerPlugin kaldırıldı + Lenis tuning (lerp:0.065, wheelMultiplier:0.75, exponential easing)
- [x] `src/hooks/useStaggeredReveal.ts` — duplicate registerPlugin kaldırıldı
- [x] `src/components/LavaTypographyScene.tsx` — duplicate registerPlugin kaldırıldı
- [x] `src/components/MoldCastScene.tsx` — duplicate registerPlugin kaldırıldı
- [x] `src/hooks/useScrollAnimation.ts` oluşturuldu (universal scroll hook + reduced-motion + gsap.context cleanup)
- [x] `npm run build` — temiz, TypeScript hatası yok

**Sonuç:** `gsap.registerPlugin(ScrollTrigger)` artık yalnızca `src/lib/animation-manager.ts`'de çağrılıyor.

---

## Phase 3 — Başlamadan Önce Yap

### Doğrulama
- `src/components/HeroSection.tsx` — `isFirstVisit` prop var mı kontrol et
- `src/components/HeadlineStagger.tsx` — mevcut implementation'ı incele
- `src/hooks/useScrollVelocity.ts` — return type'ı ve kullanım şeklini kontrol et

### Phase 3 Dosyaları
**Değiştirilecek:**
- `src/components/HeroSection.tsx` — cold-load entrance sequence (gsap.timeline)
- `src/components/HeadlineStagger.tsx` — velocity-reactive skewX
- `src/index.css` — .section-pin, .depth-layer-{1,2,3}, .reveal-clip-vertical, .text-balance

---

## Phase 1 — Tamamlanan Dosyalar

### Root (5/5)
- [x] ROADMAP.md
- [x] CLAUDE.md
- [x] MASTER_CONTEXT.md
- [x] ACTIVE_TASK.md (bu dosya)
- [x] .env.example

### docs/lean/ (17/17)
- [x] 00-project-brief.md
- [x] 01-product-requirements.md
- [x] 02-success-metrics.md
- [x] design-tokens.json
- [x] motion-tokens.json
- [x] 06-design-system.md
- [x] 07-motion-system.md
- [x] 09-responsive-rules.md
- [x] 10-tech-stack.md
- [x] 11-app-architecture.md
- [x] 12-folder-structure.md
- [x] 13-forbidden-patterns.md
- [x] 14-animation-architecture.md
- [x] ai-coding-rules.md
- [x] ai-failure-patterns.md
- [x] context-loading-order.md
- [x] prompt-library.md
- [x] decision-log.md
- [x] task-backlog.md
- [x] release-checklist.md

### Snippets klasörleri (5/5)
- [x] snippets/gsap/
- [x] snippets/lenis/
- [x] snippets/transitions/
- [x] snippets/motion/
- [x] snippets/three/

---

## Phase Sırası (Özet)

```
✅ Phase 1 — Documentation (22 dosya)
✅ Phase 2 — Animation Architecture (animation-manager + useScrollAnimation)
⏳ Phase 3 — Visual Elevation (hero entrance, kinetic typo, depth system)
⏳ Phase 4 — Interaction Polish (cursor, hover, transitions)
⏳ Phase 4.5 — Art Direction QA (visual audit, geçemeyen fix)
⏳ Phase 5 — Performance & Awwwards (Lighthouse ≥90, LCP <2.5s)
```

---

## Aktif Constraint'ler

1. `npm run build` her commit öncesi geçmeli
2. Supabase schema'ya dokunma
3. /admin/* ve /musteri-paneli/* — silme yok
4. Lenis mobile'da (<768px) kapalı kalmalı
5. gsap.context() cleanup her component'te zorunlu
6. Her animasyon reduced-motion check içermeli
7. Hardcoded renk yok — CSS custom property
8. Z objesi dışında z-index yok

---

## Engel / Blocker

Şu an engel yok.

---

*Güncelleme: 2026-05-12 — Phase 2 tamamlandı, Phase 3 başlamaya hazır*
