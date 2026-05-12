# 13 · Forbidden Patterns — Mas Technic

## Animation Anti-Patterns

### ❌ gsap.context() olmadan ScrollTrigger
```typescript
// YANLIŞ — cleanup yok, memory leak
useEffect(() => {
  gsap.from(el, { scrollTrigger: { trigger: el }, y: 60 })
}, [])

// DOĞRU — gsap.context ile cleanup
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(el, { scrollTrigger: { trigger: el }, y: 60 })
  }, containerRef)
  return () => ctx.revert()
}, [])
```

### ❌ Framer Motion ve GSAP aynı elemana
```typescript
// YANLIŞ — conflict, undefined behavior
<motion.div animate={{ x: 100 }}>
  {/* GSAP da bu div'i hedefliyorsa → çakışır */}
</motion.div>

// DOĞRU — ayrı elementler
<div ref={gsapRef}>  {/* GSAP buraya */}
  <motion.div animate={{ opacity: 1 }}>  {/* FM buraya */}
```

### ❌ Lenis mobile'da aktif
```typescript
// YANLIŞ — mobile'da Lenis başlatılır
const lenis = new Lenis()

// DOĞRU — mobile check
const isMobile = window.matchMedia('(max-width: 768px)').matches
if (isMobile) return  // Lenis başlatma
```

### ❌ gsap.registerPlugin birden fazla yerde
```typescript
// YANLIŞ — her component'te register
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// DOĞRU — sadece use-gsap.ts'de (bir kez)
// import { gsap, ScrollTrigger } from '@/hooks/use-gsap'
```

### ❌ will-change statik elementlere
```css
/* YANLIŞ — her şeye will-change */
* { will-change: transform; }
.static-text { will-change: transform; }

/* DOĞRU — sadece animate edilen elementlere */
.hero-panel, .quote-panel { will-change: transform; }
```

### ❌ Layout properties animate etmek
```typescript
// YANLIŞ — reflow ve CLS tetikler
gsap.to(el, { width: '100%', height: '200px', top: '50px' })

// DOĞRU — sadece transform + opacity
gsap.to(el, { x: '100%', scaleY: 1.2, opacity: 0 })
```

---

## Z-Index Anti-Patterns

### ❌ Magic number z-index
```css
/* YANLIŞ */
.my-element { z-index: 999; }
.modal { z-index: 1000; }
.tooltip { z-index: 9999; }

/* DOĞRU — Z objesinden */
import { Z } from '@/styles/z-index'
style={{ zIndex: Z.header }}
```

### ❌ Z-index olmadan position:fixed / position:absolute
```tsx
// YANLIŞ — z-index kontrol edilmemiş
<div style={{ position: 'fixed' }}>

// DOĞRU — Z objesinden alınmış
<div style={{ position: 'fixed', zIndex: Z.preloader }}>
```

---

## Renk Anti-Patterns

### ❌ Hardcoded hex/rgb
```tsx
// YANLIŞ
<div style={{ color: '#e8610a', background: '#0a7e8c' }}>

// DOĞRU — CSS custom property
<div className="text-forge-molten bg-forge-teal">
// veya
style={{ color: 'hsl(var(--forge-molten))' }}
```

---

## Mimari Anti-Patterns

### ❌ Admin/müşteri panel bileşenlerini landing'de kullanmak
```tsx
// YANLIŞ — panel bileşeni landing'e import edilir
import { DashboardHome } from '@/components/admin/DashboardHome'

// DOĞRU — landing kendi bileşenlerini kullanır
import { HeroSection } from '@/components/HeroSection'
```

### ❌ Supabase client'ı birden fazla yerde init etmek
```typescript
// YANLIŞ — her dosyada createClient()
const supabase = createClient(url, key)

// DOĞRU — tek kaynak
import { supabase } from '@/integrations/supabase/client'
```

### ❌ Three.js canvas'ı IntersectionObserver olmadan mount etmek
```tsx
// YANLIŞ — her zaman render eder
<Canvas>
  <CNCModel />
</Canvas>

// DOĞRU — viewport'ta ise render et
const HeroCanvas = lazy(() => import('./r3f/HeroCanvas'))
// + IntersectionObserver ile conditional render
```

---

## İçerik Anti-Patterns

### ❌ 180 satırı aşan component dosyası
```
// > 180 satır → sub-component çıkar
HeroSection.tsx'de scroll logic → useHeroScroll.ts
```

### ❌ Yorum olarak "what" açıklaması
```typescript
// YANLIŞ — kod zaten anlatıyor
// loop through all items
items.forEach(item => ...)

// DOĞRU — sadece "why" yorumlanır
// iOS Safari'de -webkit-fill-available olmadan 100vh yanlış hesaplar
```
