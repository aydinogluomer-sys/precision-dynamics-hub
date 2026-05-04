## MAS Technic — Awwwards 90+ Refinement Plan

Mevcut yapı, layout, grid, section sırası, routing ve business logic **dokunulmaz**. Sadece art direction, tipografi, motion ve sinematik akış katmanları rafine edilir.

---

### 1. Tipografi Sistemi (Global)
**Dosyalar:** `src/index.css`, `tailwind.config.ts`, `src/components/SectionHeader.tsx`

- Fluid heading scale (clamp tabanlı):
  - H1 → `clamp(3.5rem, 8vw, 9rem)`
  - H2 → `clamp(2.5rem, 5.5vw, 6rem)`
  - H3 → `clamp(1.75rem, 3vw, 3rem)`
- Letter-spacing: `-0.04em` (H1), `-0.02em` (subhead)
- Line-height: `0.92` (H1), `1.0` (H2), `1.05` (H3)
- Body: Space Grotesk korunur, `line-height: 1.55`
- Mono caption: `letter-spacing: 0.5em` sabit
- `tailwind.config.ts` → `fontSize` extend: `display-1`, `display-2`, `display-3` token'ları

### 2. Spacing & Ritim
**Dosyalar:** `tailwind.config.ts`, `src/index.css`

- Section vertical padding utility: `py-[clamp(120px,15vw,180px)]`
- İç ritim ölçeği: 16 / 32 / 64 / 96 (yeni Tailwind spacing token: `s-1`, `s-2`, `s-3`, `s-4`)
- Container max-width: `1400px`, asimetrik gutter desktop (`pl-8 pr-12`)
- Optik düzeltme: bazı başlıklar `-translate-x-[0.02em]`

### 3. Renk & Doku Katmanı
**Dosyalar:** `src/index.css`, **yeni** `src/components/ui/GrainOverlay.tsx`

- Yeni `GrainOverlay` component: SVG turbulence + feColorMatrix, `fixed inset-0`, `opacity 0.04`, `mix-blend-overlay`, `pointer-events-none`, `z-[5]`
- `App.tsx` veya `Index.tsx` root'a mount
- Token rafine:
  - `--foreground` saflığı +%3
  - `--muted-foreground` -%5 lightness
  - Light mode bg: `hsl(40 12% 97%)` warm off-white
  - Dark mode bg: `#0F0F10` korunur
- **Border radius `0rem` korunur** (kullanıcı talebi)

### 4. Sinematik Görseller
**Dosyalar:** **yeni** `src/assets/cinematic/*.jpg` (5 adet) + `HeroSection`, `IndustriesSection`, `ProjectShowcase`, `ServicesSection`

5 yeni image (premium, 1920x1080, jpg):
1. `cnc-chip-flow.jpg` — macro CNC chip + cutting fluid
2. `molten-pour.jpg` — molten metal pour, deep shadow
3. `dark-workshop.jpg` — atmospheric workshop, sparks
4. `precision-micrometer.jpg` — micrometer macro, brushed steel
5. `titanium-surface.jpg` — brushed titanium texture, raking light

Style prompt: *"Cinematic industrial photography: macro CNC details, brushed titanium, cutting fluid, metal chips, warm sparks, dark workshop atmosphere, shallow DOF, high contrast, no stock-photo look, no fake 3D render."*

ES6 import, `BlurImage` ile render. Hero `hero-cnc.jpg` korunur (kullanıcı bağlılığı).

### 5. Easing & Motion Standardı
**Dosyalar:** `src/components/ui/Reveal.tsx`, `SectionHeader.tsx`, `useStaggeredReveal.ts`

- Tüm entrance ease → `cubic-bezier(0.22, 1, 0.36, 1)`
- Stagger: `0.06–0.08s`
- Default: `opacity 0→1`, `translateY 24px→0`, `duration 0.7s`
- Hover scale tüm card/CTA: `1 → 1.03`, 400ms, aynı easing
- `usePrefersReducedMotion` override her yerde korunur

### 6. UI Detayları
**Dosyalar:** `src/components/ui/button.tsx`, `card.tsx`, `src/index.css`

- Border radius: **değiştirilmez** (`0rem` korunur)
- Shadow tier (CSS variables):
  - `--shadow-1: 0 1px 2px rgba(0,0,0,0.04)`
  - `--shadow-2: 0 8px 24px -8px rgba(0,0,0,0.12)`
  - `--shadow-3: 0 24px 60px -20px rgba(0,0,0,0.25)`
- Button hover: underline-grow + `translateY(-2px)`, no glow
- Global focus ring: `outline: 2px solid hsl(var(--primary) / 0.4); outline-offset: 2px`

### 7. Scroll Storytelling Rafinasyonu
**Dosyalar:** `src/pages/Index.tsx`, scene wrapper'ları, `SectionTransitionGlow.tsx`

- Hero → Lava → Mold → CNC sticky pin **korunur**, sadece transition tempo yumuşatılır
- Micro-parallax: arka plan elementleri `translateY 0.3x` scroll velocity (mevcut `useScrollVelocity` hook'u kullan)
- Sticky section header chip (desktop only): `top-24`, scroll fade-in
- `SectionTransitionGlow` opacity %40 → %60

### 8. Hero Refinements
**Dosya:** `src/components/HeroSection.tsx`

- "CNC HASSAS İŞLEME" başlık: kelime-bazlı stagger (`motion.span`, 0.07s gap), mevcut sola kaydırma korunur
- Subtitle: 200ms gecikmeli reveal
- Scroll indicator: mevcut `text-primary` korunur, 2s loop vertical line draw (`scaleY 0→1` infinite)

### 9. Detay Katmanı (Awwwards İmzası)
**Yeni:** `src/components/ui/SectionIndex.tsx`

- Sağ alt sabit: `01 / 17` mono, scroll'a senkron (`IntersectionObserver` ile aktif section)
- Sol alt sabit: live timestamp + lokasyon — `İZMİR · 14:32 GMT+3` (mevcut `LiveClock` component'i extend)
- `CustomCursor` label states genişlet: `VIEW` / `DRAG` / `EXPLORE` (data-cursor attribute ile)
- `Index.tsx` root'a mount, `z-[60]`, `pointer-events-none`, mobile gizli

### 10. Kapsam DIŞI (Dokunulmayacak)
- Layout, grid, section sırası, route, business logic
- Z-index mimarisi (1-17 stacking korunur)
- GSAP/Lenis kurulumu
- Forge & Steel renk paleti
- Border radius (`0rem` korunur)
- Cinematic scene `#0f0f0f` background kuralı
- Component dosya bölme (yalnız 180+ satır olursa)

---

### Teknik Notlar
- Tüm yeni component'ler **named export**, max **180 satır**
- Tailwind token'ları **HSL**
- Yeni görseller `src/assets/cinematic/*.jpg`, ES6 import
- `prefers-reduced-motion` her motion eklemesinde test
- Build sonrası smoke check: `SectionHeader`, `Hero`, `HowWeWork`, `ProjectShowcase`

### Etki Özeti
- ~9 dosya düzenleme
- 2 yeni component (`GrainOverlay`, `SectionIndex`)
- 5 yeni cinematic image
- Sıfır kırılma riski — tamamen presentational layer
