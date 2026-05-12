# Task Backlog — Mas Technic
> Planlanan görevler. Aktif task için ACTIVE_TASK.md.

---

## Phase 1 — Documentation ✅ (2026-05-12)
Tüm root + docs/lean/ + snippets/ tamamlandı.

## Phase 2 — Animation Architecture ✅ (2026-05-12)
- animation-manager.ts (singleton registerPlugin + batchReveal + killAll)
- useScrollAnimation.ts (universal hook + reduced-motion)
- 5 dosyadan duplicate registerPlugin kaldırıldı
- Lenis tuning: lerp:0.065, wheelMultiplier:0.75, exponential easing
- npm run build temiz

---

## Phase 2.5 — Cleanup ⏳
- [ ] Doc kısaltma (motion-system, animation-arch, prompt-library, forbidden, backlog)
- [ ] plan-revised eklemeleri (Todo Kuralı, Soyutlama, Phase 4.5, 3 Zorunlu Adım, Doc Lifecycle)
- [ ] Browser ScrollTrigger leak check (manuel)
- [ ] Phase 3 reference repo clone'lama
- [ ] isFirstVisit + reuse hook doğrulaması

---

## Phase 3 — Visual Elevation

### 3A — Hero Cold-Load Entrance
- isFirstVisit prop doğrula
- gsap.timeline (t=0 grid → 0.3 tag → 0.6 headline → 1.0 CTA → 1.2 canvas)
- 4-phase scroll'u bozma
- Reduced-motion: instant state

### 3B — Kinetic Typography
- HeadlineStagger + useScrollVelocity skewX (±3deg max)
- Reduced-motion: skew yok

### 3C — Depth System CSS
- `.section-pin`, `.depth-layer-{1,2,3}`, `.reveal-clip-vertical`, `.text-balance`
- Snippet: DIGITALWERK → cinematic-hero-timeline.ts

---

## Phase 4 — Interaction Polish

### 4A — Cursor (Custom vs BrutalCrosshair — biri sil)
- Scroll velocity → scale 1.0→1.5
- mix-blend-mode:difference cursor dot
- MagneticButton koordinasyon

### 4B — Hover Standardize
- Tek transition kuralı (0.25s industrial ease)
- `.brutal-link` underline, `.btn-brutal-invert`
- Card'larda `.aw-lift` audit

### 4C — Page Transition
- Exit: 0.6s → 0.4s
- forge-teal (std) / forge-molten (CTA route)

---

## Phase 4.5 — Art Direction QA
Geçiş koşulu (Phase 5'e): tüm maddeler ✅ (release-checklist.md'deki QA bölümü)

---

## Phase 5 — Performance

### 5A — GPU Compositing
- `will-change:transform` → `.hero-panel`, `.quote-panel`
- Canvas overlay → `translateZ(0)`
- Statik elementlerden `will-change` kaldır

### 5B — ScrollTrigger Batching
- Per-element → `ScrollTrigger.batch()` (3/batch, 0.08s)

### 5C — Image
- BlurImage eager/lazy audit
- `decoding="async"` non-critical
- Sequence frame preload hint

### 5D — Font / Network
- `font-display:swap` Space Grotesk
- Supabase CDN preconnect
- Non-critical JS defer

### Verification
- Lighthouse mobile (4x CPU, slow 4G): Performance ≥90, LCP<2.5s, CLS<0.1, INP<200ms

---

## ROADMAP Phase 2 Backlog (İhtiyaç Çıkınca)
UX/IA, screen map, component system spec, microinteraction spec, code style guide, performance budget, SEO metadata, analytics events.

---

*Sıra: Phase 2.5 → 3 → 4 → 4.5 → 5*
