# 07 · Motion System — Mas Technic

## Temel İlke

Motion purpose-driven — her animasyon bir işlev taşır: yönlendirme, hiyerarşi, geri bildirim veya atmosfer.  
Dekoratif animasyon yok. Animasyon gürültü değil, ritim.

---

## Scroll Sistemi

### Lenis → GSAP Entegrasyonu

```typescript
// src/components/providers/SmoothScrollProvider.tsx
// Tek doğru implementasyon — başka yerde tekrar edilmez

const lenis = new Lenis({ lerp: 0.08, duration: 1.4, smoothWheel: true })
window.__lenis = lenis  // global erişim

lenis.on('scroll', () => ScrollTrigger.update())  // GSAP sync

gsap.ticker.add((time) => lenis.raf(time * 1000))  // RAF override
gsap.ticker.lagSmoothing(0)  // lag kompensasyon kapat

// Mobile (<768px): Lenis başlatılmaz, native scroll
// Admin/müşteri panel: Lenis devre dışı (App.tsx conditional)
```

### ScrollTrigger Pattern

```typescript
// ✅ Doğru — gsap.context ile cleanup
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,         // smooth scrub
        // veya scrub: true  // snap scrub
      },
      y: 60, opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
  }, containerRef)
  return () => ctx.revert()
}, [])
```

---

## Hero Scroll Koreografisi (4 Phase)

```
Phase 1 (0–45%):
  MAS mask grows (clip-path veya mask-size)
  Content (headline, sub, CTA) fades + translates up
  Header hides (opacity → 0)

Phase 2 (45–60%):
  PAUSE — section fullscreen pin'de kilitli
  Kullanıcı scroll ediyor ama sahne değişmiyor

Phase 3 (60–88%):
  Horizontal slide: Hero panel ← sola kayar
  QuickQuote panel → sağdan girer
  Her iki panel 100vw genişliğinde, viewport'u doldurur

Phase 4 (88–100%):
  Lava pour efekti (--lava-fill CSS custom prop 0 → 100%)
  Heat distortion overlay
```

---

## Reveal Primitifleri

### Clip-Path Reveal
```css
/* useClipReveal.ts */
from: clip-path: inset(0 100% 0 0)
to:   clip-path: inset(0)
duration: 0.9s
easing:   cubic-bezier(0.76, 0, 0.24, 1)
```

### Split Text Reveal
```typescript
// useSplitTextReveal.ts
// Karakter bazlı — 3D rotateY ile
stagger: 0.035s  // char
perspective: 400px
rotateY: 90deg → 0
```

### Stagger Grid Reveal
```typescript
// useStaggeredReveal.ts
ScrollTrigger.batch(elements, {
  onEnter: (batch) => gsap.from(batch, {
    opacity: 0, y: 40, stagger: 0.08, duration: 0.6
  })
})
```

---

## Page Transition

```typescript
// src/components/PageTransition.tsx
// clip-path polygon reveal

// Mevcut:
exit:  0.6s
enter: 0.6s
color: single overlay

// Phase 4 hedefi:
exit:  0.4s (daha hızlı)
enter: 0.6s
color: forge-teal (standart) / forge-molten (CTA route)
```

---

## Mikro-Etkileşimler

### Magnetic Button
```typescript
// src/components/MagneticButton.tsx
// Mouse follow ile %30 güç
// spring: stiffness:120, damping:18
```

### Card Hover
```css
.card-industrial:hover → translateY(-4px) + molten border glow
transition: all 0.25s cubic-bezier(0.76, 0, 0.24, 1)
```

### Link Underline Draw
```css
/* .brutal-link */
::after { content: ''; height: 1px; transform: scaleX(0); transform-origin: left }
:hover::after { transform: scaleX(1); transition: 0.4s cubic-bezier(0.76,0,0.24,1) }
```

---

## Reduced Motion Protokolü

```typescript
// Her animation component veya hook'ta zorunlu
const prefersReduced = usePrefersReducedMotion()

// GSAP:
if (prefersReduced) {
  gsap.set(element, { /* final state */ })
  return
}

// Framer Motion:
<motion.div animate={prefersReduced ? finalState : animatedState} />

// CSS:
@media (prefers-reduced-motion: reduce) {
  .animated-element { transition: none; animation: none; }
}
```

---

## Motion Ritmi (Section Düzeni)

```
Önerilen sayfa ritmi:
  Hero       → HIGH (sinematik, impactful)
  CNCStory   → HIGH (horizontal scroll drama)
  HowWeWork  → CALM (step-by-step, sade)
  Services   → MEDIUM (list reveal)
  Industries → HIGH (3D tilt cards)
  Materials  → MEDIUM (morph sequence)
  Capabilities → CALM (spec tablo, sade)
  Testimonials → LOW (typography-driven)
  FAQ        → LOW (accordion, minimal)
  FinalCTA   → HIGH (son vurgu, molten)
```

En az bir "silence zone" zorunlu — Capabilities veya Testimonials bu rolü üstlenir.

---

## Performans Kuralları

- Yalnızca `transform` ve `opacity` animate et (GPU composite)
- `width`, `height`, `top`, `left` animate etme → CLS riski + reflow
- `will-change: transform` — hero panel ve quote panel'e ekle
- `will-change` statik elementlerden kaldır (anti-pattern)
- ScrollTrigger.batch() — per-element yerine batch reveal tercih et
- Three.js canvas — IntersectionObserver ile lazy mount/unmount
