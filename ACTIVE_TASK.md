# ACTIVE_TASK.md
> Her session başında oku. Bitince güncelle.
> Bu dosya session hafızasıdır — AI bağlamı kesilince bu dosyadan devam edilir.

---

## Şu An

**Phase:** Phase 1 — Documentation ✅ TAMAMLANDI  
**Sonraki:** Phase 2 — Animation Architecture Centralization  
**Branch:** `claude/documentation-roadmap-nwV4C`  
**Tarih:** 2026-05-12

---

## Phase 2 — Başlamadan Önce Yap

### 1. Codebase Doğrulama (zorunlu)
Aşağıdaki dosyaların gerçekten var olduğunu doğrula:
```bash
find src/hooks -name "*.ts" | sort
find src/lib -name "*.ts" | sort
```
Beklenen dosyalar:
- `src/hooks/useScrollVelocity.ts` ✓ (var — kesinleştirildi)
- `src/hooks/useClipReveal.ts` ✓ (var — kesinleştirildi)
- `src/hooks/useSplitTextReveal.ts` ✓ (var — kesinleştirildi)
- `src/hooks/use-reduced-motion.ts` ✓ (var — kesinleştirildi)
- `src/hooks/use-gsap.ts` ✓ (var — kesinleştirildi)
- `src/components/MagneticButton.tsx` ✓ (var — kesinleştirildi)
- `src/styles/z-index.ts` ✓ (var — kesinleştirildi)

### 2. Snippet Damıtma
```bash
git clone https://github.com/adrianhajdin/award-winning-website /tmp/ref-adrian
git clone https://github.com/Fullstack-Empire/GSAP-Awwwards-Website /tmp/ref-fullstack
```
Çıkarılacak:
- `snippets/gsap/animation-manager-reference.ts` ← adrianhajdin pattern
- `snippets/gsap/scrolltrigger-batch.ts` ← Fullstack-Empire pattern
- `snippets/lenis/smooth-scroll-config.ts` ← Lenis exponential easing

### 3. Phase 2 Dosyaları
**Yeni:**
- `src/lib/animation-manager.ts` — singleton, plugin reg, shared helpers
- `src/hooks/useScrollAnimation.ts` — universal scroll animation hook

**Değiştirilecek:**
- `src/hooks/use-gsap.ts` — registerPlugin kaldır, animation-manager'dan al
- `src/components/providers/SmoothScrollProvider.tsx` — lerp:0.065, exponential easing

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
⏳ Phase 2 — Animation Architecture (animation-manager + useScrollAnimation)
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

*Güncelleme: 2026-05-12 — Phase 1 tamamlandı, Phase 2 başlamaya hazır*
