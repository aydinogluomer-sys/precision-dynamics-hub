

# MAS TECHNIC — Awwwards Uygulama Planı v4.0

**5 faz, 13 yeni dosya, ~25 düzenleme**

---

## FAZ 0 — Altyapı (Tüm fazların temeli)

### Yeni dosyalar (5)
| Dosya | Amaç |
|-------|------|
| `src/styles/z-index.ts` | Global Z sabit haritası (0-100 arası tamsayı) |
| `src/components/ErrorBoundary.tsx` | Class-based error boundary, koyu fallback div |
| `src/hooks/useGPUCapability.ts` | WebGL tier tespiti: `none/low/high` — Index.tsx'te HeroCanvas ve lav sahnelerini koşullu render |
| `src/utils/useLocalTexture.ts` | drei'nin `useTexture` yerine lokal `useLoader(TextureLoader)` — LiquidImage.tsx'teki drei bağımlılığını keser |
| `src/components/ui/AmbientGlowOverlay.tsx` | IO + touch-device kontrolüyle mouse glow overlay — FAZ 3'te tüm koyu section'larda kullanılır |

---

## FAZ 1 — Bug Fix + Performans

### Düzenlemeler (11)

| Dosya | Değişiklik |
|-------|-----------|
| `SmoothScrollProvider.tsx` | Line 40: `window.dispatchEvent` sil (stack overflow riski). Mobil conditional ekle (768px altında Lenis skip) |
| `QuickQuoteSection.tsx` | `forwardRef` ile sar + `displayName` |
| `MotionGradientBg.tsx` | `forwardRef` + line 336'daki rAF leak fix (`cancelAnimationFrame` cleanup) + IO visibility gate |
| `ElegantShape.tsx` | `forwardRef` ile sar + `displayName` |
| `LiquidImage.tsx` | `useTexture` → `useLocalTexture` import değişimi |
| `HeroCanvas.tsx` | IO lazy render: viewport dışındayken Canvas unmount |
| `HeroSection.tsx` | Video tag'lerine `preload="none"` + IO play/pause |
| `VideoScrollSection.tsx` | Video `preload="auto"` → `preload="none"` + IO play/pause |
| `vite.config.ts` | `manualChunks`: three-vendor, gsap-vendor, framer |
| `index.html` | Font `rel="stylesheet"` → `rel="preload" as="style" onload` async pattern |
| `index.css` | Grain overlay: `will-change: auto; contain: strict` |

---

## FAZ 2 — Eksik Feature'lar (14 madde listesi)

### Yeni dosyalar (1)
| Dosya | Amaç |
|-------|------|
| `src/hooks/useStaggeredReveal.ts` | GSAP ScrollTrigger + `[data-stagger]` ile grid reveal |

### Düzenlemeler (9)

| Dosya | Değişiklik |
|-------|-----------|
| `ServicesSection.tsx` | `useStaggeredReveal` + `data-stagger` + `useTilt(4)` (mobilde skip) + `cta-arrow` class |
| `IndustriesSection.tsx` | Aynı pattern: stagger + tilt(3) |
| `MaterialsSection.tsx` | Aynı pattern: stagger + tilt(3), flip-card uyumu |
| `Header.tsx` | `nav-link-animated` zaten line 329'da var — mega menu alt linklere de ekle |
| `Footer.tsx` | `position: fixed` + ResizeObserver spacer + 12vw watermark + LiveClock + koordinat |
| `SectionHeader.tsx` | `<Reveal variant="word-stagger">` kaldır → `motion.span` kelime bazlı stagger |
| `PageTransition.tsx` | Polygon `clipPath` variant + route-aware text flash overlay (`Z.pageTransition`) |
| `App.tsx` | Mevcut inline AnimatePresence → `<PageTransition>` ile değiştir. `initial={false}` ekle |
| `index.css` | `.nav-link-animated`, `.cta-arrow`, marquee keyframes, mobil scroll-snap, iOS footer fix, lav CSS custom props |

---

## FAZ 3 — Lav Sahneleri + Ambient Glow

### Yeni dosyalar (2)
| Dosya | Amaç |
|-------|------|
| `src/components/LavaTypographyScene.tsx` | 300vh scroll-driven: "ERGİTME" text mask + `background-clip: text` lav dolgu + GSAP scrub |
| `src/components/MoldCastScene.tsx` | 400vh scroll-driven: lav akışı → kalıp → soğutma renk geçişi → zoom + 5 CSS buhar parçacığı |

### Düzenlemeler (6)

| Dosya | Değişiklik |
|-------|-----------|
| `Index.tsx` | GPU koşullu render + LavaTypography/MoldCast ekleme (Hero→Lav→Döküm→CNC sırası) + ErrorBoundary sarma + Z constant'ları + SECTIONS dizisi güncelleme |
| `NexusPromoSection.tsx` | `<AmbientGlowOverlay />` ekle |
| `CNCScrollStory.tsx` | `<AmbientGlowOverlay />` ekle |
| `MaterialsSection.tsx` | `<AmbientGlowOverlay />` ekle |
| `WhyUsSection.tsx` | `<AmbientGlowOverlay />` ekle |
| `FinalCTASection.tsx` | `<AmbientGlowOverlay />` ekle |

---

## FAZ 4 — Section Renk Geçişleri

Sahneler arası renk sürekliliği: `--lava-current-color` CSS custom property ile LavaTypography çıkışından MoldCast girişine aktarım. Koyu→açık geçişlerde radial glow fade, açık→açık geçişlerde ton farkı + grain doku.

---

## Doğrulama Notları

- `usePrefersReducedMotion` → **zaten var** (`src/hooks/use-reduced-motion.ts`) — yeni dosya gerekmez
- `useTilt` → **zaten var** (`src/hooks/useTilt.ts`) — yeni dosya gerekmez
- `MarqueeBand` → **zaten var** (`src/components/MarqueeBand.tsx`) — yeni dosya gerekmez
- `LiveClock` → **zaten var** ve Footer'da import ediliyor — yeni dosya gerekmez
- `useAmbientGlow` → **zaten var** (`src/hooks/useAmbientGlow.ts`) ve App.tsx'te çağrılıyor — yeni dosya gerekmez
- Konami Code → **zaten var** App.tsx'te (line ~113) — yeni kod gerekmez
- `nav-link-animated` → **zaten var** Header.tsx line 329'da — sadece mega menu alt linklerine eklenecek
- `@react-three/drei` kaldırılamaz — admin paneli kullanıyor. Sadece LiquidImage.tsx'teki import replace edilecek
- `MotionGradientBg.tsx` line 336: `requestAnimationFrame(tick)` cleanup yok — **gerçek memory leak**, düzeltilecek
- `SmoothScrollProvider.tsx` line 40: `window.dispatchEvent(new Event("scroll"))` — **stack overflow riski**, silinecek

**Toplam: 8 yeni dosya, ~26 düzenleme, 5 faz sıralı uygulama.**

