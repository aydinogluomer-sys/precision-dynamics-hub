# ACTIVE_TASK.md
> Her session başında oku. Bitince güncelle.

---

## Aktif Phase
**Phase 4 — Interaction Polish**

## Tamamlanan
- ✅ Phase 1 — Documentation (22 dosya)
- ✅ Phase 2 — Animation Architecture Centralization
- ✅ Phase 3 — Visual Elevation (entrance, kinetic typo, depth CSS)

## Şu An
Phase 3 tamamlandı. Phase 4'e hazır.

## Bir Sonraki
**Phase 4A — Cursor Enhancement**
- CustomCursor.tsx vs BrutalCrosshairCursor.tsx — biri sil (hangisi aktif?)
- Scroll velocity → scale 1.0→1.5
- mix-blend-mode:difference cursor dot
- MagneticButton koordinasyon

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
