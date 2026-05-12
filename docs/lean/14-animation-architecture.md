# 14 · Animation Architecture — Mas Technic

## Katmanlar ve Sorumluluklar

```
Katman 1: SmoothScrollProvider (src/components/providers/)
  → Lenis başlatır ve yönetir
  → gsap.ticker.add() ile GSAP'e bağlar
  → ScrollTrigger.update() her scroll'da tetikler
  → Cleanup: lenis.destroy(), gsap.ticker.remove()

Katman 2: gsap.context (component düzeyi)
  → Her animasyonlu component kendi context'ini açar
  → containerRef ile scope sınırlanır
  → useEffect cleanup'ta ctx.revert()

Katman 3: ScrollTrigger (instance düzeyi)
  → gsap.context içinde oluşturulur
  → ctx.revert() ile otomatik kill

Katman 4: Framer Motion (component-level enter/exit)
  → AnimatePresence ile mount/unmount animasyonu
  → useMotionValue, useSpring, useTransform ile continuous motion
  → GSAP ile AYNI elemana uygulanmaz

Katman 5: Three.js useFrame (3D sahne döngüsü)
  → delta-based rotation ve animation
  → IntersectionObserver ile lazy canvas
```

---

## GSAP Yaşam Döngüsü

```typescript
// Pattern — her animasyonlu component
const containerRef = useRef<HTMLDivElement>(null)
const prefersReduced = usePrefersReducedMotion()

useEffect(() => {
  if (prefersReduced) {
    // Final state'i direkt uygula
    gsap.set(targetRef.current, { opacity: 1, y: 0 })
    return
  }

  const ctx = gsap.context(() => {
    // Tüm GSAP animasyonlar context içinde

    gsap.from(targetRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    })

  }, containerRef)  // scope = container

  return () => ctx.revert()  // cleanup — zorunlu
}, [prefersReduced])
```

---

## Lenis Entegrasyonu

```typescript
// src/components/providers/SmoothScrollProvider.tsx
// Tek kaynak, başka yerde Lenis init edilmez

const lenis = new Lenis({
  lerp: 0.08,           // Mevcut (Phase 2'de: 0.065)
  duration: 1.4,
  smoothWheel: true,
  wheelMultiplier: 0.8,  // Phase 2'de: 0.75
  touchMultiplier: 1.5,
  // Phase 2'de eklenecek:
  // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
})

window.__lenis = lenis   // global erişim (ScrollTrigger sync için)

lenis.on('scroll', () => ScrollTrigger.update())
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)

// Cleanup
return () => {
  gsap.ticker.remove(updateLenis)
  ScrollTrigger.getAll().forEach(t => t.kill())
  lenis.destroy()
  delete window.__lenis
}
```

---

## ScrollTrigger Batch Pattern

```typescript
// Birden fazla element için — per-element yerine batch
ScrollTrigger.batch(elements, {
  onEnter: (batch) => gsap.from(batch, {
    opacity: 0,
    y: 40,
    stagger: 0.08,
    duration: 0.6,
    ease: 'power2.out',
  }),
  start: 'top 85%',
  once: true,  // tekrar tetiklenmez
})
```

---

## Hero Section Mimarisi (4-Phase)

```typescript
// src/components/HeroSection.tsx
// gsap.context ile 4 phase birlikte yönetilir

const ctx = gsap.context(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scrollerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      pin: stickyRef.current,
    }
  })

  // Phase 1 (0-45%): mask + content fade
  tl.to(maskedRef.current, { ... }, 0)
  tl.to(contentRef.current, { ... }, 0)

  // Phase 2 (45-60%): pause (no-op)

  // Phase 3 (60-88%): horizontal slide
  tl.to(heroPanelRef.current, { x: '-100%' }, 0.6)
  tl.to(quotePanelRef.current, { x: '0%' }, 0.6)

  // Phase 4 (88-100%): lava
  tl.to(lavaRef.current, { '--lava-fill': '100%' }, 0.88)

}, scrollerRef)

return () => ctx.revert()
```

---

## Framer Motion Kullanım Alanları

```typescript
// 1. Component enter/exit (AnimatePresence)
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    />
  )}
</AnimatePresence>

// 2. Mouse-driven continuous motion (IndustryStackCard)
const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]))
const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]))

// 3. Scroll progress (passive read-only)
const { scrollY } = useScroll()
const opacity = useTransform(scrollY, [0, 300], [1, 0])

// ❌ FM ve GSAP aynı element — conflict
```

---

## Plugin Registration

```typescript
// src/hooks/use-gsap.ts — TEK YER
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

// Phase 2 hedefi: animation-manager.ts'e taşı
```

---

## Three.js Lazy Mount

```typescript
// src/components/r3f/HeroCanvas.tsx
// IntersectionObserver ile mount kontrolü

const [isVisible, setIsVisible] = useState(false)

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => setIsVisible(entry.isIntersecting),
    { rootMargin: '200px' }
  )
  observer.observe(containerRef.current)
  return () => observer.disconnect()
}, [])

// Canvas sadece visible'da render
return isVisible ? <Canvas>...</Canvas> : null
```
