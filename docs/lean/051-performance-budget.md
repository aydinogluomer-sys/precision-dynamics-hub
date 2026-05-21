# Performance Budget — Mas Technic Precision Dynamics Hub

## Lighthouse Hedefleri (Awwwards Developer Score ≥8)

| Metrik | Hedef | Kritik Eşik |
|--------|-------|-------------|
| Performance | ≥90 | <80 = blocker |
| LCP (Largest Contentful Paint) | <2.5s | >4s = blocker |
| CLS (Cumulative Layout Shift) | <0.1 | >0.25 = blocker |
| FID / INP (Interaction to Next Paint) | <200ms | >500ms = blocker |
| FCP (First Contentful Paint) | <1.8s | — |
| TBT (Total Blocking Time) | <200ms | — |

Test koşulları: **Mobile**, Slow 4G throttle, CPU 4x slowdown.

## Bundle Boyut Limitleri

| Chunk | Mevcut | Limit |
|-------|--------|-------|
| `vendor-three` | ~688 kB | 750 kB |
| `vendor-fiber` | ~310 kB | 350 kB |
| `vendor-framer` | ~135 kB | 180 kB |
| `vendor-gsap` | ~70 kB | 100 kB |
| `index` (main) | ~495 kB | 550 kB |
| Admin/Müşteri chunk | ~330-330 kB | lazy-loaded ✅ |

Three.js + R3F birlikte ~1 MB gzip öncesi — kabul edilebilir (lazy-loaded bölümde).

## Animasyon Bütçesi

| Kaynak | Hedef |
|--------|-------|
| GSAP ScrollTrigger instance sayısı (total) | ≤40 aktif (route sonrası cleanup) |
| Framer Motion `motion.*` eleman sayısı (tek sayfada) | ≤30 |
| Three.js Canvas sayısı (eşzamanlı) | ≤2 (IO lazy mount zorunlu) |
| rAF döngüleri (eşzamanlı, Three.js dışı) | ≤3 |
| `will-change: transform` kullanan eleman | ≤10 |

## Görsel Varlık Limitleri

| Tür | Max Boyut | Format |
|-----|-----------|--------|
| Hero image | 300 kB | WebP / AVIF |
| Section image | 150 kB | WebP |
| Sequence frame (CNC / material) | 80 kB/frame | WebP |
| Video (machine-loop) | 5 MB | MP4 H.264, autoplay muted |
| Font (Space Grotesk) | 120 kB woff2 | subset |
| Font (IBM Plex Mono) | 80 kB woff2 | subset |

## JS / CSS Yükleme Kuralları

- Above-fold bileşenler: `loading="eager"`, `fetchpriority="high"`
- Below-fold bileşenler: `loading="lazy"`, `decoding="async"`
- Kritik CSS: `<style>` inline (Tailwind purge + cssnano)
- Font: `font-display: swap` + `preconnect` (Google Fonts)
- Supabase CDN: `<link rel="preconnect">` index.html'de
- Three.js canvas: `IntersectionObserver` ile lazy mount zorunlu (13-forbidden-patterns.md)

## Monitoring

```bash
# Build sonrası kontrol
npx vite-bundle-visualizer   # chunk analiz (opt.)
npx lighthouse http://localhost:8080 --output=json --chrome-flags="--headless"
```
