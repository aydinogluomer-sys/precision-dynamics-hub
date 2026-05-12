# Task Backlog — Mas Technic
> Planlanan tüm geliştirme görevleri. Aktif task için ACTIVE_TASK.md'e bak.

---

## Phase 1 — Documentation ✅ TAMAMLANDI (2026-05-12)

- [x] ROADMAP.md — proje yol haritası
- [x] CLAUDE.md — AI master loader
- [x] MASTER_CONTEXT.md — session özeti
- [x] ACTIVE_TASK.md — task tracker
- [x] .env.example — env şablonu
- [x] docs/lean/ — 17 lean doc dosyası
- [x] snippets/ — klasör yapısı

---

## Phase 2 — Animation Architecture

**Hedef:** GSAP plugin registration centralize, Lenis tuning, universal scroll hook.

- [ ] `src/lib/animation-manager.ts` oluştur
  - Singleton plugin registration
  - batchReveal() helper
  - createScrollAnimation() helper
  - killAll() route cleanup
- [ ] `src/hooks/useScrollAnimation.ts` oluştur
  - Universal scroll animation hook
  - gsap.context ile cleanup
  - reduced-motion handling
- [ ] `src/hooks/use-gsap.ts` güncelle
  - Duplicate registerPlugin kaldır
  - animation-manager'dan import
- [ ] `src/components/providers/SmoothScrollProvider.tsx` güncelle
  - Duplicate registerPlugin kaldır
  - lerp: 0.065 (snappier)
  - wheelMultiplier: 0.75
  - Exponential easing ekle
- [ ] Snippet damıtma:
  - [ ] /tmp/ref-adrian clone → snippets/gsap/animation-manager-reference.ts
  - [ ] /tmp/ref-fullstack clone → snippets/gsap/scrolltrigger-batch.ts
- [ ] Build verification: `npm run build` clean
- [ ] Cleanup: duplicate imports, dead code
- [ ] ROADMAP.md Phase 2 maddelerini TAMAMLANAN'a taşı

---

## Phase 3 — Visual Elevation

**Hedef:** Cinematic hero entrance, kinetic typography, depth system.

### 3A — Hero Entrance Sequence
- [ ] HeroSection.tsx — isFirstVisit prop doğrula (gerçekten var mı?)
- [ ] gsap.timeline() cold-load entrance:
  - Grid lines scaleX reveal (t=0)
  - .typo-tag slide up (t=0.3s)
  - HeadlineStagger trigger (t=0.6s)
  - CTA clip-path reveal (t=1.0s)
  - HeroCanvas fade in (t=1.2s)
- [ ] 4-phase scroll choreography etkilenmediğini doğrula
- [ ] Reduced-motion: instant state

### 3B — Kinetic Typography
- [ ] HeadlineStagger.tsx — useScrollVelocity entegre
- [ ] skewX reactive: velocity * 0.05, ±3deg max
- [ ] Reduced-motion: skew yok

### 3C — Depth System CSS
- [ ] src/index.css'e ekle:
  - `.section-pin` utility
  - `.depth-layer-{1,2,3}` utilities
  - `.reveal-clip-vertical` utility
  - `.text-balance` utility
- [ ] Snippet damıtma: DIGITALWERK → snippets/gsap/cinematic-hero-timeline.ts
- [ ] Build + visual QA

---

## Phase 4 — Interaction Polish

**Hedef:** Velocity cursor, hover consistency, page transition tuning.

### 4A — Cursor Enhancement
- [ ] CustomCursor.tsx veya BrutalCrosshairCursor.tsx seç (hangisi aktif?)
- [ ] Scroll velocity → scale reactive (1.0 → 1.5)
- [ ] mix-blend-mode: difference — cursor dot
- [ ] MagneticButton koordinasyonu

### 4B — Hover Consistency
- [ ] src/index.css — standardize hover transition
- [ ] `.brutal-link` underline draw (FAZ 4 plan'da varsa kontrol et)
- [ ] `.btn-brutal-invert` utility (FAZ 4 plan'dan)
- [ ] Tüm card'larda `.aw-lift` kullanımını audit et

### 4C — Page Transition
- [ ] PageTransition.tsx:
  - Exit duration: 0.6s → 0.4s
  - forge-teal (standart) / forge-molten (CTA route) renk ayrımı

### Cleanup
- [ ] CustomCursor vs BrutalCrosshairCursor — hangisi kullanılmıyor? Sil.
- [ ] Build + browser QA

---

## Phase 4.5 — Art Direction QA

**Hedef:** Tüm checklist maddeleri ✅ — Phase 5'e geçiş koşulu.

- [ ] Section düzeyi QA (her section tek visual idea taşıyor mu?)
- [ ] Hero QA (entrance, scroll, premium feel)
- [ ] Typography QA (editorial mi? hierarchy var mı?)
- [ ] Görsel tutarlılık (ışık dünyası, renk rolleri)
- [ ] Motion ritmi (HIGH/CALM denge, silence zone)
- [ ] CTA/Conversion QA (molten dikkat çekiyor mu?)
- [ ] Mobile QA (premium feel, touch targets)
- [ ] Notları decision-log.md'e ekle

---

## Phase 5 — Performance & Awwwards

**Hedef:** Lighthouse ≥90, LCP <2.5s, CLS <0.1.

### 5A — GPU Compositing
- [ ] src/index.css — will-change audit
- [ ] .hero-panel, .quote-panel → will-change: transform
- [ ] Canvas overlay → transform: translateZ(0)
- [ ] Statik elementlerden will-change kaldır

### 5B — ScrollTrigger Batching
- [ ] Per-element ST instances → ScrollTrigger.batch()
- [ ] 3 element per batch, 0.08s stagger

### 5C — Image Optimization
- [ ] BlurImage.tsx — eager/lazy loading audit
- [ ] decoding="async" non-critical images
- [ ] index.html — sequence frame preload hints

### 5D — Font & Network
- [ ] font-display: swap — Space Grotesk
- [ ] Supabase CDN preconnect
- [ ] Non-critical JS defer

### Verification
- [ ] Lighthouse Mobile (4x CPU throttle, Slow 4G)
- [ ] Performance ≥90
- [ ] LCP <2.5s
- [ ] CLS <0.1
- [ ] INP <200ms

---

## ROADMAP.md Phase 2 Backlog (İhtiyaç Çıkınca)

- [ ] UX & IA flows (personas, navigation, conversion flow)
- [ ] Screen map (homepage, services, contact map)
- [ ] Component system spec (button, card, navigation, form)
- [ ] Microinteraction spec (button hover, card hover, link anim)
- [ ] Code style guide (TS rules, React rules, Tailwind rules)
- [ ] Performance budget (Lighthouse targets, animation budget)
- [ ] SEO metadata system (title, description, OG, structured data)
- [ ] Analytics events (page, click, scroll, form, conversion)

---

*Öncelik sırası: Phase 2 → 3 → 4 → 4.5 → 5*  
*Her phase tamamlanınca buradan TAMAMLANDI olarak işaretle + ROADMAP.md güncelle*
