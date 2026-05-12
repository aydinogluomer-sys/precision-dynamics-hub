# ACTIVE_TASK.md
> Her session başında oku. Bitince güncelle.

---

## Aktif Phase
**Phase 5 — Performance & Awwwards Criteria**

## Tamamlanan
- ✅ Phase 1 — Documentation (22 dosya)
- ✅ Phase 2 — Animation Architecture Centralization
- ✅ Phase 3 — Visual Elevation (entrance, kinetic typo, depth CSS)
- ✅ Phase 4 — Interaction Polish (velocity cursors, hover baseline, page transition)

## Şu An
Phase 4 tamamlandı. Phase 5'e hazır.

## Bir Sonraki
**Phase 5A — GPU Compositing Audit**
- will-change: transform → .hero-panel, .quote-panel
- transform: translateZ(0) → canvas overlay elements
- static elementlerden will-change kaldır

**Phase 5B — ScrollTrigger Batching**
- Individual ScrollTrigger reveals → ScrollTrigger.batch() (batchSize:3, stagger:0.08s)

**Phase 5C — Image Optimization**
- Above-fold: loading="eager"; below-fold: loading="lazy"; decoding="async"
- index.html preload hints (sequence frames, hero video)

**Phase 5D — Lighthouse Targets**
- Performance ≥90, LCP <2.5s, CLS <0.1
- font-display: swap (Space Grotesk), preconnect Supabase CDN

## Aktif Constraint'ler
- `npm run build` her commit öncesi geçmeli
- Supabase schema / `/admin/*` / `/musteri-paneli/*` — dokunma yok
- Lenis mobile'da (<768px) kapalı
- gsap.context() cleanup zorunlu
- Reduced-motion check zorunlu
- Hardcoded renk / Z dışı z-index yok

## Phase 3 Browser Doğrulaması (Manuel)
- sessionStorage'ı sıfırla → entrance 1.7s'de tamamlanmalı
- Headline t=0.6s'de belirmeli
- 4-phase scroll sonrasında çalışmalı
- Reduced-motion: tüm elementler instant görünmeli
- skewX: hızlı scroll'da ±3deg lean görünmeli

## Blocker
Yok.

---
*Detay için:* `docs/lean/task-backlog.md`
