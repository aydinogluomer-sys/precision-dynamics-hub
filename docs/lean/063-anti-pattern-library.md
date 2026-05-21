# Anti-Pattern Library — Mas Technic Precision Dynamics Hub

> 13-forbidden-patterns.md temel yasakları içerir. Bu dosya performance, motion, layout anti-pattern'lerini genişletir.

## Animasyon Anti-Pattern'leri

### 1. GSAP + Framer Motion Çakışması
```tsx
// ❌ Aynı elemana ikisi birden
<motion.div animate={{ x: 100 }}>
  {useEffect(() => { gsap.to(containerRef.current, { x: 200 }) })}
</motion.div>

// ✅ Ayrım: FM → component mount/exit, GSAP → scroll-driven/timeline
<motion.div>         {/* FM sadece bu wrapper */}
  <div ref={ref} />  {/* GSAP sadece bu */}
</motion.div>
```

### 2. ScrollTrigger Context Temizleme Eksik
```typescript
// ❌ Memory leak
useEffect(() => {
  gsap.from(el, { scrollTrigger: { trigger: el } })
}, [])

// ✅ ctx.revert() cleanup zorunlu
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(el, { scrollTrigger: { trigger: el } })
  }, ref)
  return () => ctx.revert()
}, [])
```

### 3. `gsap.registerPlugin` Birden Fazla Yerde
```typescript
// ❌ 5 dosyada tekrar
gsap.registerPlugin(ScrollTrigger)

// ✅ Sadece src/lib/animation-manager.ts'de — diğerleri re-export eder
import { gsap, ScrollTrigger } from "@/lib/animation-manager"
```

### 4. Lenis Mobilde Aktif Bırakma
```typescript
// ❌ Mobile'da smooth scroll → iOS bounce + jank
const lenis = new Lenis({ ... })

// ✅ SmoothScrollProvider'da guard
const isMobile = window.innerWidth < 768
if (!isMobile) { /* Lenis init */ }
```

### 5. `useMotionValue` yerine React State Animasyon
```typescript
// ❌ Her frame'de re-render
const [skewX, setSkewX] = useState(0)
// requestAnimationFrame(() => setSkewX(velocity * 0.3))

// ✅ MotionValue → re-render yok
const skewX = useMotionValue(0)
useEffect(() => { skewX.set(velocity * 0.3) }, [velocity])
```

## Layout Anti-Pattern'leri

### 6. Z-Index Ad-Hoc Kullanımı
```tsx
// ❌ Hardcoded z-index → stacking savaşı
<div style={{ zIndex: 999 }} />

// ✅ src/styles/z-index.ts Z objesi
import { Z } from "@/styles/z-index"
<div style={{ zIndex: Z.header }} />
```

### 7. Hardcoded Renk (CSS ve GLSL dışında)
```tsx
// ❌ inline hex
<div style={{ color: "#e8610a" }} />

// ✅ CSS custom property
<div style={{ color: "hsl(var(--forge-molten))" }} />
```

### 8. Inline Style Animasyon (CSS transition)
```tsx
// ❌ CSS transition + inline style → CLS riski, GSAP ile çakışır
<div style={{ transform: `translateX(${x}px)`, transition: "all 0.3s" }} />

// ✅ GSAP kontrolü
gsap.to(el, { x: value, duration: 0.3, ease: "power2.out" })
```

## Performans Anti-Pattern'leri

### 9. Three.js Canvas `IntersectionObserver` Olmadan
```tsx
// ❌ Her zaman render eder — GPU overhead
<Canvas />

// ✅ IO ile lazy mount (HeroCanvas.tsx pattern)
{visible && <Canvas />}
```

### 10. `will-change` Statik Elemanlarda
```css
/* ❌ GPU belleği boşa harcama */
.hero-heading { will-change: transform; }  /* animate edilmiyor */

/* ✅ Sadece animasyon sırasında, sonra kaldır */
gsap.set(el, { willChange: "transform" })
gsap.to(el, { x: 100, onComplete: () => gsap.set(el, { willChange: "auto" }) })
```

### 11. `useEffect` İçinde Senkron DOM Ölçümü (Layout Thrash)
```typescript
// ❌
useEffect(() => {
  elements.forEach(el => {
    const h = el.offsetHeight  // forces reflow
    el.style.height = h + "px"
  })
})

// ✅ ResizeObserver veya GSAP batch
ScrollTrigger.batch(elements, { ... })
```

### 12. Her Frame'de Yeni Object Oluşturma (useFrame)
```typescript
// ❌ GC pressure
useFrame(() => {
  mesh.current.material.uniforms.uMouse.value = new THREE.Vector2(x, y)
})

// ✅ Uniform value'yu güncelle, obje oluşturma
useFrame(() => {
  mesh.current.material.uniforms.uMouse.value.set(x, y)
})
```

## Erişilebilirlik Anti-Pattern'leri

### 13. Reduced Motion Kontrolü Eksik
```typescript
// ❌ Tüm kullanıcılara animasyon zorla
gsap.from(el, { opacity: 0, y: 40 })

// ✅ Her animasyondan önce kontrol
const prefersReduced = usePrefersReducedMotion()
if (!prefersReduced) gsap.from(el, { opacity: 0, y: 40 })
```

### 14. Aria Hidden Video/Canvas'ta Eksik
```tsx
// ❌
<canvas />

// ✅
<canvas aria-hidden="true" />
```
