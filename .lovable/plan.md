

# Landing Page Section Animasyonları Güncellemesi

17 bağımsız section'a özel giriş animasyonları eklenecek. Tüm animasyonlar `usePrefersReducedMotion` kontrolü, `whileInView` + `once: true` tetiklemesi ve admin/müşteri paneli dışında çalışma kurallarına uyar. `ParallaxSection` wrapper'larına dokunulmaz.

---

## Değişiklik Listesi

### 1. HeroSection.tsx — Lens Flare
- Section'ın en dışına `position: absolute inset-0` beyaz overlay eklenir
- `filter: brightness(3) blur(8px)` → `brightness(1) blur(0)`, `opacity: 1 → 0`, 0.4s
- `usePrefersReducedMotion` true → overlay render edilmez

### 2. CNCScrollStory.tsx — Scanline Overlay
- Canvas'ın üzerine statik `div` eklenir: `repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 2px, transparent 2px, transparent 4px)`, opacity 0.04, pointer-events none
- Animasyon yok, sadece statik doku. Reduced motion'da da gösterilir (statik olduğu için).

### 3. NexusPromoSection.tsx — Ink Bleed
- Section wrapper'a `motion.div` eklenir: `clipPath: circle(0% at 0% 0%)` → `circle(150% at 0% 0%)`, 0.8s, cubic-bezier(0.76,0,0.24,1)
- Background: forge-obsidian (#0f0f0f)

### 4. HowWeWorkSection.tsx — Horizontal Slide-in
- Section container'ına `initial: { opacity: 0, x: -80 }`, `animate: { opacity: 1, x: 0 }`, 0.7s
- `whileInView` ile tetiklenir

### 5. CertificationsSection.tsx — Venetian Blind
- İçeriği 6 yatay şeride bölen wrapper oluşturulur
- Her şerit: `clipPath: inset(0 0 100% 0)` → `inset(0 0 0% 0)`, stagger 80ms, 0.5s

### 6. VideoScrollSection.tsx — Spotlight Sweep
- Giriş anında `mask-image` ile radial-gradient soldan sağa taranır
- CSS `@keyframes` veya Framer Motion `style` ile 0.9s sürede mask-position animasyonu

### 7. ServicesSection.tsx — Skew Entrance
- Section wrapper: `initial: { opacity: 0, skewY: 4, y: 40 }` → `{ opacity: 1, skewY: 0, y: 0 }`, 0.7s

### 8. IndustriesSection.tsx — Grid Explode
- Her kart: `initial: { opacity: 0, scale: 0.85, y: 30 }` → `{ opacity: 1, scale: 1, y: 0 }`
- `transition: { delay: index * 0.06, duration: 0.5 }`

### 9. ProjectShowcase.tsx — Chromatic Aberration
- 3 overlay katman (R, G, B), mix-blend-mode: screen
- CSS `@keyframes chroma`: farklı translateX offset → 0, sonra opacity 0
- 0.3s toplam süre, sonra katmanlar kaybolur

### 10. MaterialMorphScroll.tsx — Exposure Burn
- Container: `initial: { filter: "brightness(0)" }` → `{ filter: "brightness(1)" }`, 1.0s, easeIn

### 11. MaterialsSection.tsx — Perspective Tilt
- Container'a `perspective: 1000px`
- `initial: { opacity: 0, rotateX: 12 }` → `{ opacity: 1, rotateX: 0 }`, 0.8s

### 12. WhyUsSection.tsx — Split Reveal
- İçerik iki yarıya bölünür (sol/sağ overflow hidden wrapper)
- Sol: `x: -60 → 0`, Sağ: `x: 60 → 0`, 0.7s, aynı anda

### 13. CapabilitiesSection.tsx — Rack Focus
- `initial: { opacity: 0, filter: "blur(8px)", scale: 0.97 }` → `{ opacity: 1, filter: "blur(0px)", scale: 1 }`, 0.8s

### 14. StatsSection.tsx — Circle Expand
- `clipPath: "circle(0% at 50% 50%)"` → `"circle(150% at 50% 50%)"`, 0.8s

### 15. TestimonialsSection.tsx — Word Scatter
- Section başlığındaki metin kelimelere bölünür
- Her kelime: `initial: { opacity: 0, y: 20, rotate: random(-8,8) }` → `{ opacity: 1, y: 0, rotate: 0 }`, stagger 50ms, 0.5s

### 16. FAQBlogSection.tsx — Tile Flip
- Container'a `perspective: 1200px`
- Her kart: `initial: { opacity: 0, rotateY: 90 }` → `{ opacity: 1, rotateY: 0 }`, stagger 80ms, 0.5s

### 17. FinalCTASection.tsx — Flash Cut
- Beyaz overlay: `opacity: 0 → 0.6 → 0`, 0.25s
- Ardından section content: `opacity: 0 → 1, y: 10 → 0`, 0.4s

---

## Teknik Detaylar

- **Ortak pattern**: Her section'da `const prefersReduced = usePrefersReducedMotion()` import edilir. `prefersReduced` true ise `initial` = `animate` (animasyonsuz).
- **whileInView**: Tüm animasyonlar `viewport={{ once: true, amount: 0.2 }}` ile tetiklenir.
- **Ease curve**: `[0.76, 0, 0.24, 1]` — çoğu animasyonda kullanılır (easeInOutQuart benzeri).
- **Admin/müşteri paneli**: Bu dosyalar zaten yalnızca landing page'de (`Index.tsx`) render edilir, ek kontrol gerekmez.
- **ParallaxSection**: Dokunulmaz, animasyonlar section'ların iç JSX'inde uygulanır.
- **Dosya sayısı**: 17 dosya düzenlenecek, her biri bağımsız.

