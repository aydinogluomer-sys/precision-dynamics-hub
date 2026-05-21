# Frontend Performance Rules — Mas Technic Precision Dynamics Hub

## GPU Compositing Kuralları

```css
/* ✅ GPU katmanına taşı — scroll/transform animate edilen öğeler */
.hero-panel,
.hww-card,
.project-card { will-change: transform; }

/* ✅ Canvas overlay — GPU promote */
.absolute canvas { transform: translateZ(0); }

/* ❌ Statik öğede will-change: boş GPU belleği tüketir */
.static-text { will-change: transform; }  /* YANLIŞ */
```

GPU'ya taşı: opacity, transform, filter. Paint trigger eden: color, background, border.

## Scroll Performansı

- **Lenis** smooth scroll: sadece `>=768px` — `<768px` native + CSS scroll-snap
- GSAP ScrollTrigger: `scrub: 1.5` (pinned sections), `scrub: true` (snap sections)
- `ScrollTrigger.refresh()` sadece layout değişiminde çağır (resize handler içinde)
- `invalidateOnRefresh: true` — pin height değişikliklerini handle eder
- Scroll event listener: `passive: true` ekle (browser optimizasyonu)

## Layout Thrashing Önleme

```typescript
// ❌ Layout thrash — her iterasyonda okuma/yazma
items.forEach(item => {
  const h = item.offsetHeight  // okuma → layout
  item.style.height = h + "px" // yazma → reflow
})

// ✅ GSAP batch — read phase ayrı, write phase ayrı
const heights = items.map(item => item.offsetHeight)   // tüm okumalar
gsap.set(items, (i) => ({ height: heights[i] }))       // tüm yazmalar
```

## React Render Optimizasyonu

- `useMemo` — pahalı hesaplama (shader uniforms, sort/filter)
- `useCallback` — child'a geçilen event handler (prevent re-render)
- `React.memo` — sık re-render olan listeler (`StepCard`, sertifika kartları)
- `key` — stabil key kullan (ID), index kullanma (animated listeler)

```typescript
// ✅
const computedScale = useMemo<[number, number, number]>(() => {
  if (scale) return scale
  if (vpAspect > imgAspect) return [viewport.width, viewport.width / imgAspect, 1]
  return [viewport.height * imgAspect, viewport.height, 1]
}, [viewport.width, viewport.height, imgAspect, vpAspect, scale])
```

## Görsel Yükleme Sıralaması

```html
<!-- index.html — critical resource hints -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://[project].supabase.co" />
<link rel="preload" as="image" href="/sequence-cnc/frame-001.webp" />

<!-- Hero image — eager, high priority -->
<img loading="eager" fetchpriority="high" decoding="sync" />

<!-- Below-fold — lazy -->
<img loading="lazy" decoding="async" />
```

## Three.js / R3F Özel Kuralları

- Canvas mount: `IntersectionObserver` ile — viewport dışında `visible = false` → Canvas unmount
- `dpr={[1, 1.5]}` — Retina'da 2x yerine 1.5x (performans/kalite dengesi)
- `powerPreference: "high-performance"` — mobile'da battery drain riski, kabul edildi
- `antialias: false` — shader efektleri için gereksiz
- WebGL probe: `document.createElement("canvas").getContext("webgl")` → false ise Canvas mount etme
- `WebGLErrorBoundary` — render crash'i graceful handle et

## Mobile Özel Kurallar

- `<768px`: GSAP ScrollTrigger animasyonları kapat (horizontal pin vb.)
- `<768px`: Lenis devre dışı → `touchMultiplier: 0`
- CSS `scroll-snap-type: y mandatory` — native momentum scroll
- Three.js canvas: mobile'da da IO ile lazy — pil tasarrufu
- `usePrefersReducedMotion()` hook her animasyonda kontrol

## Font Performansı

```css
/* index.css */
@font-face {
  font-family: 'Space Grotesk';
  font-display: swap;   /* FOIT yerine FOUT — LCP için kritik */
}
```
