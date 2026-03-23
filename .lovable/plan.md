# Mas Technic — Awwwards Seviyesi Animasyon Entegrasyonu

## Komple Uygulama Planı

**Kaynak:** 9 Awwwards referans sitesinin kaynak kod analizi (v2.0 taksonomisi) + UI/UX geliştirme raporu **Hedef:** [mas-technic-precision.lovable.app](http://mas-technic-precision.lovable.app) → Awwwards Nominee/HM seviyesi **Kapsam:** 4 faz, 13 teknik, tahmini 6-8 hafta

---

## GENEL MİMARİ KARARLAR

### Animasyon Stack

- **GSAP 3.12+** (core) — tüm animasyonların merkezi
- **ScrollTrigger** — scroll-linked reveal, pin, scrub
- **SplitText** — karakter/kelime/satır bazlı metin animasyonu (Club GSAP gerektirir)
- **Flip** — preloader-to-hero geçişi (Faz 4'te opsiyonel)
- **Lenis** — mevcut smooth scroll korunur, GSAP ticker'a bağlanır

### Framer Motion → GSAP Geçiş Stratejisi

Mevcut Framer Motion animasyonları bir seferde kaldırılmaz. Her faz kendi section'larını GSAP'a taşır. Geçiş sırası:

1. Faz 1'de yeni global Reveal sistemi GSAP ile yazılır
2. Her section güncellenirken Framer Motion varyantları GSAP karşılığıyla değiştirilir
3. Tüm section'lar taşındığında Framer Motion dependency kaldırılır

### Easing Standardizasyonu

Tüm yeni animasyonlarda tutarlı easing seti — CSS variable olarak tanımlanır:

```
--ease-reveal: cubic-bezier(0.19, 1, 0.22, 1)        → Genel reveal, smooth deceleration
--ease-transition: cubic-bezier(0.76, 0, 0.24, 1)     → Sayfa geçişleri, clip-path
--ease-bounce: cubic-bezier(0.24, 1.66, 0.71, 0.96)   → Buton hover, drag spring (overshoot)
--ease-menu: cubic-bezier(0.075, 0.82, 0.165, 1)      → Menu toggle, yavaş başlayıp hızlanan

GSAP karşılıkları:
- Reveal: power4.out
- Overlay reveal: power4.inOut
- Magnetic button geri dönüş: elastic.out(1, 0.5)
- Genel: power3.out

```

### Performans Kuralları

- will-change: transform yalnızca animasyon sırasında eklenir, onComplete'te kaldırılır
- SplitText elementlerinde: transform: translateZ(0), font-kerning: none, text-rendering: optimizeSpeed
- Tüm scroll-linked animasyonlarda: GSAP ticker Lenis'e bağlı (gsap.ticker.add → lenis.raf)
- Görsellerde: loading="lazy", decoding="async" korunur
- Video kullanılırsa: .webm formatı, CDN üzerinden, reverse video ayrı dosya

### Responsive Strateji


| Mekanizma              | Desktop                        | Mobil (≤900px)                        |
| ---------------------- | ------------------------------ | ------------------------------------- |
| Hero mask reveal       | Scroll-linked mask-size büyüme | Statik büyük mask veya basit fade     |
| Pin+Scrub sections     | GSAP horizontal wipe           | Splide.js carousel veya dikey stack   |
| Custom cursor          | Aktif (GSAP quickTo)           | display: none                         |
| SplitText              | Karakter bazlı reveal          | Kelime/satır bazlı (performans)       |
| Parallax katmanlar     | Çoklu katman scrub             | Tek katman veya devre dışı            |
| Overlay reveal stagger | stagger: 0.08                  | stagger: 0 (tek seferde)              |
| Glow line divider      | Scroll-linked translateX       | Statik gradient (animasyon yok)       |
| Bracket buton          | Hover bracket genişleme        | Padding küçültülür, animasyon korunur |
| Menu görselleri        | Mouse-follow preview           | Statik thumbnail veya gizli           |


---

## FAZ 1: ALTYAPI + GLOBAL REVEAL SİSTEMİ

**Süre:** 1-2 hafta **Etki:** Tüm siteye yayılan temel hareket dili

### 1.1 Lenis + GSAP ScrollTrigger Senkronizasyonu

**Neden:** Diğer her şeyin temeli. Pin, scrub, scroll-linked animasyonlar bu olmadan jank yapar. **Dosya:** src/lib/smooth-scroll.ts (yeni veya mevcut güncelleme)

Yapılacak:

- Lenis instance'ı GSAP ticker'a bağlanır: `gsap.ticker.add((time) => lenis.raf(time * 1000))`
- gsap.ticker.lagSmoothing(0) — lag smoothing kapatılır (Lenis kendi yönetir)
- ScrollTrigger.scrollerProxy() ile Lenis entegrasyonu
- Modal/drawer açıldığında lenis.stop(), kapandığında lenis.start()
- RFQ wizard, contact modal gibi overlay'larda scroll kilitleme

### 1.2 Global GSAP Reveal Sistemi

**Neden:** Mevcut Framer Motion reveal'ları GSAP'a taşınır. Tüm section'lar bu sistemi kullanır. **Dosya:** src/components/ui/Reveal.tsx (güncelleme veya yeni) **Referans:** Oaksun Studio data-attribute sistemi + Highful Minds percentage-based reveal

Varyantlar:

- **fade-up**: opacity: 0 + translateY(30px) → normal. Varsayılan. (Genel pattern)
- **percentage-reveal**: translateY(100%) → translateY(0%). overflow: hidden wrapper. Elementin kendi yüksekliğine göre kayma — responsive garanti. (Highful Minds)
- **slide-left / slide-right**: translateX(±50px) → 0. (Kirigumi waypoint)

Props:

```
variant: 'fade-up' | 'percentage-reveal' | 'slide-left' | 'slide-right'
delay: number (saniye)
duration: number (varsayılan: 1)
stagger: number (children varsa, varsayılan: 0.08)
triggerStart: string (varsayılan: 'top 82%')

```

Her varyant ScrollTrigger ile tetiklenir, toggleActions: 'play none none none'.

### 1.3 Overlay Reveal Bileşeni

**Neden:** Drop Edition'ın en yaygın tekniği. Kart ve görsel reveal'ları "perde açılma" hissi verir. **Dosya:** src/components/ui/OverlayReveal.tsx (yeni) **Referans:** Drop Edition overlay reveal

Mekanizma:

- Wrapper: position: relative, overflow: hidden
- Overlay div: position: absolute, inset: 0, background: var(--bg) (#0a0d10 — forge-obsidian, BEYaz DEĞİL)
- Animasyon: overlay scaleY(1→0), transform-origin: top. Easing: power4.inOut, duration: 0.9
- Eşzamanlı: içerik scale(1.15→1). Easing: power2.out, duration: 1.4
- stagger: 0.08 (children varsa). Mobilde stagger: 0

Kullanılacak yerler: ServicesSection kartları, MaterialsSection grid, CapabilitiesSection görselleri, ProjectShowcase

### 1.4 Global SplitText Word/Line Reveal

**Neden:** 9/9 referans sitede var. Tek başına en büyük algısal farkı yaratan teknik. **Dosya:** src/hooks/useSplitTextReveal.ts (yeni hook) **Referans:** Beaucoup Studio global pattern

Mekanizma:

- SplitText ile element satır veya kelime bazında parçalanır
- Her parça overflow: hidden wrapper içinde
- yPercent: 100 → 0, stagger: 0.12s (satır), stagger: 0.06s (kelime)
- ScrollTrigger ile tetikleme, start: 'top 82%'
- Cleanup: component unmount'ta SplitText.revert()

Uygulanacak yerler: Tüm h2, h3 elementleri (section başlıkları). Paragraflar değil — yalnızca başlıklar.

### 1.5 SectionHeader Editorial Sistemi

**Neden:** Highful Minds + WorldQuant'tan. Endüstriyel karakter katar. **Dosya:** src/components/SectionHeader.tsx (güncelleme) **Referans:** Highful Minds section numaralama + broken grid

Değişiklikler:

- sectionNumber?: number prop eklenir
- Numara verildiğinde: grid grid-cols-[1fr_auto] layout. Sol: tag + başlık, sağ: "— 01" formatında monospace numara
- Numara stili: text-sm font-mono tracking-widest text-muted (küçük, sağ hizalı — Highful Minds'daki devasa yarı-transparan numara DEĞİL, Mas Technic'in endüstriyel estetiğine uygun ince format)
- Başlık: useSplitTextReveal hook'u ile word reveal otomatik uygulanır
- Tag: GSAP ile opacity: 0→1, ScrollTrigger tetiklemeli

Güncellenen bileşenler ve numara atamaları:

```
ServicesSection      → sectionNumber={1}
HowWeWorkSection     → sectionNumber={2}
MaterialsSection     → sectionNumber={3}
WhyUsSection         → sectionNumber={4}
CapabilitiesSection  → sectionNumber={5}
StatsSection         → (numara yok — tam genişlik bant, header farklı)
FAQBlogSection       → sectionNumber={6}

```

---

## FAZ 2: İMZA DENEYİMLER

**Süre:** 2-3 hafta **Etki:** "Bunu daha önce görmedim" tepkisi yaratacak imza teknikler

### 2.1 Hero SVG Mask Reveal ★★★★★

**Neden:** En yüksek etkili tek teknik. 9/9 sitede hero'da scroll-linked imza deneyim var. Bu olmadan site "template" kalır. **Dosya:** src/components/HeroSection.tsx (major güncelleme) **Referans:** Drop Edition SVG logo mask + Kirigumi masked video

Mimari:

```
hero-scroller (height: 300vh)
└── hero-sticky (position: sticky, top: 0, height: 100vh)
    ├── hero-bg (koyu gradient arka plan — mevcut)
    ├── hero-bg-img (CNC atölye fotoğrafı, başlangıçta opacity: 0)
    ├── hero-mask (aynı fotoğraf, CSS mask-image ile MAS TECHNIC logosu)
    │   └── mask-size: 40% başlangıç → scroll ile 250%'e büyür
    ├── hero-grid-overlay (mevcut teknik çizgi grid)
    ├── hero-vignette (radial-gradient karartma)
    └── hero-content (başlık, açıklama, CTA'lar)

```

CSS mask implementasyonu:

- mask-image: url('/images/mas-logo.svg') — monospace "MAS" wordmark SVG
- mask-repeat: no-repeat, mask-position: center
- mask-size: başlangıçta 40%, scroll sonunda 250% (tam ekranı aşar → foto tamamen görünür)
- Responsive: mobilde logo-s.svg (daha basit form) veya mask-size başlangıcı %60

GSAP ScrollTrigger:

```javascript
gsap.to('.hero-mask', {
  maskSize: '250%',
  scrollTrigger: {
    trigger: '.hero-scroller',
    start: 'top top',
    end: 'bottom top',
    scrub: 1.5
  }
});

```

Eşzamanlı animasyonlar:

- hero-bg-img: opacity 0→1, filter brightness artışı (scroll %30-80 arası)
- hero-content: y: 0→-120, opacity: 1→0 (scroll %20-50 arası — içerik kaybolur)
- hero-scroll-indicator: opacity 1→0 (scroll %5-12 arası)

Hero giriş sekansı (preloader sonrası):

1. 0.0s — hero-bg-img opacity 0→0.6 (2s, power2.out)
2. 0.3s — başlık satırları line-by-line yPercent reveal (stagger: 0.12, power4.out)
3. 0.8s — eyebrow fade+translateY
4. 1.0s — subtitle fade
5. 1.2s — CTA butonları fade+translateY
6. 1.4s — tech specs (sağ alt) fade
7. 1.6s — scroll indicator fade

SVG hazırlığı: /public/images/mas-logo.svg — "MAS" text, monospace, font-weight: 900, viewBox uygun boyutlu. Tek renkli (siyah), mask olarak kullanılacak.

### 2.2 Services Section Layout Dönüşümü

**Neden:** Mevcut grid-of-cards formatı her B2B sitesinde var. Kirigumi'nin dual-column hover-linked image switch'i hem layout hem interaction inovasyonu. **Dosya:** src/components/ServicesSection.tsx (major güncelleme) **Referans:** Kirigumi dual-column hover-linked image switch

Yeni layout:

```
services-grid (display: grid, grid-template-columns: 1fr 1.2fr)
├── services-list (sol kolon)
│   ├── service-item[0] (active) — 01/06 · CNC Freze · açıklama
│   ├── service-item[1] — 02/06 · CNC Torna · açıklama
│   └── ... (6 item)
└── services-visual (sağ kolon, position: relative, overflow: hidden)
    ├── service-img[0] (active — opacity: 1, scale: 1)
    ├── service-img[1] (inactive — opacity: 0, scale: 1.08)
    └── ... (6 görsel)

```

Etkileşim:

- Her service-item mouseenter'da: item.classList.add('active'), diğerlerinden kaldır
- Karşılık gelen service-img: [gsap.to](http://gsap.to) opacity: 1, scale: 1 (duration: 1, ease: power2.out)
- Diğer img'ler: [gsap.to](http://gsap.to) opacity: 0, scale: 1.08

Aktif item göstergeleri:

- Sol kenar çizgisi: width: 2px, height: 0→100%, background: var(--primary), power4.out
- Başlık rengi: var(--text) → var(--primary)
- Açıklama: max-height: 0 → auto (CSS transition veya GSAP)

Numaralama: 01/06 formatı, font-mono, text-dim

Mobil (≤900px): Tek kolon, görseller gizli veya her item'ın altında küçük thumbnail. Splide.js carousel opsiyonel.

### 2.3 Clip-Path Sayfa Geçişi

**Neden:** %67 sıklık (6/9 site). Sayfalar arası geçiş Awwwards jürisinin ilk baktığı şeylerden biri. **Dosya:** src/components/PageTransition.tsx (güncelleme) **Referans:** Beaucoup Studio clip-path inset + WorldQuant Foundry sağdan sola varyant

Mekanizma:

```
Sayfa çıkış:
  clip-path: inset(0 0 0 0) → clip-path: inset(0 0 100% 0)
  // Aşağıdan yukarı kapanma
  easing: cubic-bezier(0.76, 0, 0.24, 1)
  duration: 600ms

Route değişimi (çıkış animasyonu bittikten sonra)

Sayfa giriş:
  clip-path: inset(100% 0 0 0) → clip-path: inset(0 0 0 0)
  // Yukarıdan aşağı açılma
  easing: cubic-bezier(0.76, 0, 0.24, 1)
  duration: 600ms

```

React Router entegrasyonu:

- Layout.tsx'te TransitionProvider wrapper
- useNavigate hook'u intercept edilir
- Çıkış animasyonu → navigate() → giriş animasyonu
- Body scroll kilitleme: çıkış başında overflow: hidden, giriş sonunda kaldır

### 2.4 Custom Cursor Sistemi

**Neden:** %78 sıklık (7/9 site). Mevcut MagneticButton'ın doğal genişlemesi. **Dosya:** src/components/ui/CustomCursor.tsx (yeni) **Referans:** WorldQuant Foundry dual cursor + Kirigumi custom cursor

İki katman:

- **cur-dot**: 6px daire, background: var(--accent), GSAP quickTo (duration: 0.08)
- **cur-ring**: 44px daire, border: 1px solid var(--primary), GSAP quickTo (duration: 0.3)
- **cur-label**: ring içinde, font-size: 7px, letter-spacing: .12em, uppercase. Varsayılan: opacity: 0

Context-sensitive davranış:

```
Element tipi          → Label    → Ring scale
──────────────────────────────────────────────
.service-item         → "Detay"  → 1.8x
.btn-solid, .btn-cta  → "Teklif" → 2x
.mat-card             → ""       → 1.5x (label yok, sadece büyüme)
a[href], .nav-link    → ""       → 1.3x
.project-image        → "Zoom"   → 2x
varsayılan            → ""       → 1x

```

Mobilde (≤900px): Tüm cursor elementleri display: none.

### 2.5 Preloader — Yüzde Sayacı

**Neden:** %67 sıklık (6/9 site). İlk izlenim. **Dosya:** src/components/PageLoader.tsx (güncelleme) **Referans:** WorldQuant Foundry counter + SeaCat "Start Experience"

Mekanizma:

- Büyük monospace sayı: 0 → 100 (GSAP interpolasyon, font-variant-numeric: tabular-nums)
- Alt çizgi: width: 0→120px (progress bar)
- Font: IBM Plex Mono, clamp(4rem, 12vw, 9rem)
- Süre: 2 saniye, ease: power2.inOut
- Tamamlandığında:
  1. Sayı scale(0.8) + opacity(0) + y(-30) ile kaybolur (0.5s)
  2. Preloader overlay yPercent: -100 ile yukarı kayar (0.9s, power4.inOut)
  3. heroReveal() tetiklenir

NOT: Beaucoup'un circle clip-path expand'i daha çarpıcı ama implementasyonu karmaşık. Yüzde sayacı endüstriyel estetiğe (IBM Plex Mono + rakamlar) mükemmel uyuyor. Circle expand Faz 4'te opsiyonel upgrade olarak bırakılır.

---

## FAZ 3: DETAY VE CİLALAMA

**Süre:** 1-2 hafta **Etki:** "Her detay düşünülmüş" hissi

### 3.1 Glow Line Divider

**Dosya:** src/components/ui/GlowLineDivider.tsx (yeni) **Referans:** Highful Minds glow line divider

Mekanizma:

- line-base: height: 1px, background: var(--border) (#1e2632). Tam genişlik.
- line-glow: position: absolute, height: 1px, width: 250px, background: linear-gradient(90deg, transparent, var(--primary), transparent). Başlangıç: left: -250px.
- ScrollTrigger: viewport'a girdiğinde translateX ile soldan sağa kayar (duration: 1.5, power2.inOut)
- Mobilde: statik gradient (scroll animasyonu yok, performans)

Yerleşim: ServicesSection → ProcessSection, MaterialsSection → WhyUsSection, WhyUsSection → StatsSection aralarına. Her section arasına değil — seçici kullanım.

### 3.2 Bracket Buton

**Dosya:** src/components/ui/BracketButton.tsx (yeni) **Referans:** WorldQuant Foundry bracket button

Yapı:

```html
<button class="btn-bracket">
  <span class="bracket">[</span>
  TEKLİF AL
  <span class="bracket">]</span>
</button>

```

Stil: IBM Plex Mono, uppercase, letter-spacing: 0.18em, border: 1px solid var(--border) Hover: bracket'lar CSS transform: translateX(±4px) ile genişler (GSAP gereksiz — CSS transition yeterli). Border color: var(--primary)'ye geçiş.

Kullanım: FinalCTASection ikincil buton, QuickQuoteSection, navbar CTA. Primary CTA (Teklif Al) mevcut solid buton kalır, bracket buton secondary/outline alternatifi olur.

### 3.3 Background Clipping Text Highlight

**Dosya:** src/components/ui/TextHighlight.tsx (yeni) **Referans:** Kirigumi bgclipping text

Mekanizma:

- Hedef metin span'a sarılır
- CSS: background: linear-gradient(90deg, var(--primary) 50%, transparent 50%), background-size: 200% 100%, background-position: 100% 0, background-clip: text, -webkit-text-fill-color: transparent
- GSAP ScrollTrigger: background-position: '0% 0' (soldan sağa dolma efekti)
- **HER SPAN'A AYRI ScrollTrigger** — tek genel trigger değil. Aksi halde tüm highlight'lar aynı anda dolar ve efekt kaybolur.
- Duration: 1s, ease: power2.out

Kullanım: WhyUsSection'da "±0.01mm tolerans", "ISO 9001:2015" gibi vurgu metinleri. StatsSection açıklamalarında rakamsal vurgular. Az ve seçici kullanım — her yere koymak etkiyi öldürür.

### 3.4 Dual-Direction Industry Marquee

**Dosya:** src/components/IndustriesStrip.tsx (güncelleme) **Referans:** Kirigumi 4-satır marquee

Mevcut tek bantın altına ikinci bir bant eklenir:

- Bant 1: sağa doğru → Denizcilik · Havacılık · Otomotiv · Savunma · Enerji · Medikal
- Bant 2: sola doğru ← CNC Freze · CNC Torna · Yüzey İşlem · Kalite Kontrol · Prototip · Seri Üretim

GSAP:

```javascript
gsap.to('#track1', { xPercent: -50, duration: 25, repeat: -1, ease: 'none' });
gsap.to('#track2', { xPercent: 50, duration: 28, repeat: -1, ease: 'none' });
gsap.set('#track2', { xPercent: -50 }); // başlangıç pozisyonu

```

Farklı süre (25 vs 28) görsel monotonluğu kırar.

### 3.5 Scroll-Linked Highlight Section

**Dosya:** src/components/HighlightSection.tsx (yeni) **Referans:** Drop Edition scroll-linked typewriter + Kirigumi bgclipping

ServicesSection ile MaterialsSection arasına veya WhyUsSection'a entegre edilecek tam genişlik vurgu bölümü:

- Büyük serif/italic metin: "Mikron seviyesinde hassasiyet, tekrarlanabilir kalite ve sıkı tolerans kontrolü"
- Vurgu kelimeleri (hassasiyet, kalite, tolerans kontrolü) bgclipping ile scroll'a bağlı dolma
- Arka plan: koyu, minimal — metnin kendisi star

### 3.6 Magnetic Button Genişletmesi

**Dosya:** src/components/ui/MagneticButton.tsx (güncelleme) **Referans:** Good Fella, WorldQuant, Oaksun

Mevcut MagneticButton'a:

- Geri dönüş easing'i elastic.out(1, 0.5) olarak güncellenir (şu an muhtemelen power3.out)
- Bubble ripple efekti eklenir: tıklamada position: absolute daire, scale(0→4), opacity(1→0), duration: 0.6s. Renk: rgba(255,255,255,0.15)
- Hover'da hafif scale(1.02) — mevcut translate'e ek olarak

---

## FAZ 4: İLERİ SEVİYE (OPSİYONEL)

**Süre:** İhtiyaca göre **Etki:** "Bu site başka bir seviye" hissi

### 4.1 Process Section — Pin+Scrub Horizontal Wipe

**Dosya:** src/components/HowWeWorkSection.tsx (major güncelleme) **Referans:** Kirigumi horizontal wipe carousel

Mekanizma:

- Section height: 400vh (4 adım × 100vh)
- Sticky container: position: sticky, top: 0, height: 100vh, overflow: hidden
- İçerik track: display: flex, width: 400vw
- GSAP ScrollTrigger: track'i x: -(scrollWidth - windowWidth) ile kaydırır, scrub: 1.5
- Alt progress bar: width 0→100% scroll progress'e bağlı
- Sağ alt counter: 01/04 → 02/04 → ... scroll ilerledikçe güncellenir

Mobil fallback: Pin kaldırılır, 4 adım dikey stack olarak gösterilir. Her adım fade-up reveal ile. Veya Splide.js horizontal carousel.

### 4.2 Menu Follow-Mouse Görselleri

**Dosya:** src/components/MobileMenu.tsx veya FullscreenMenu.tsx (güncelleme) **Referans:** Beaucoup Studio menu follow-mouse

Tam ekran menü açıldığında:

- Her linke hover'da farklı CNC/atölye görseli
- Görsel mouse pozisyonunu lerp ile takip eder: lerp(currentX, mouseX, 0.08)
- Geçiş: opacity: 0→1, scale: 0.95→1 (duration: 0.5)
- Mobilde: statik thumbnail veya gizli

### 4.3 Preloader Upgrade — GSAP Flip Logo

**Dosya:** src/components/PageLoader.tsx (güncelleme) **Referans:** Oaksun Studio GSAP Flip

Yüzde sayacı yerine veya sonrasına:

- "M", "A", "S" harfleri preloader'da büyük (scale: 2-3), ekranın ortasında
- Sayaç tamamlandığında harfler GSAP Flip ile navbar'daki logo pozisyonuna küçülür
- Flip.from() ile smooth geçiş (duration: 1.2, ease: power3.inOut)
- İki katmanlı SVG: outlined (preloader) → solid (navbar) — opacity swap

### 4.4 Stacked Z-Index Cards

**Dosya:** src/components/ui/StackedCards.tsx (yeni) — YALNIZCA testimonials/referanslar section'ına uygulanır **Referans:** Highful Minds stacked cards

Kartlar z-index: n, n-1, n-2 ile yığılır. position: sticky + artan top offset. Scroll ile kartlar üst üste biner. CapabilitiesSection'a DEĞİL — o mevcut grid layout ile iyi çalışıyor. Testimonials section'ı için uygun.

### 4.5 3D Perspective Typography

**Dosya:** src/components/HeroSection.tsx (opsiyonel ek) **Referans:** Beaucoup Studio CSS 3D

Hero başlığına:

- transform-style: preserve-3d
- transform: perspective(1200px) rotateX(var(--rx)) rotateY(var(--ry))
- Mouse pozisyonundan hesaplanan 8-12 derece açılar
- Three.js gerektirmez — saf CSS + JS

### 4.6 Ses Tasarımı

**Referans:** SeaCat Rossinavi

- CNC tezgahı ambient sesi (düşük, arka plan) — hero'da
- Buton tıklamalarında mekanik tık sesi
- Sayfa geçişlerinde whoosh efekti
- Toggle ile açma/kapama (varsayılan: kapalı)
- Web Audio API ile, dosya boyutu minimal

---

## DOSYA ÖZETİ

### Yeni Dosyalar

```
src/components/ui/OverlayReveal.tsx          → Faz 1
src/components/ui/CustomCursor.tsx           → Faz 2
src/components/ui/GlowLineDivider.tsx        → Faz 3
src/components/ui/BracketButton.tsx          → Faz 3
src/components/ui/TextHighlight.tsx          → Faz 3
src/components/HighlightSection.tsx          → Faz 3
src/hooks/useSplitTextReveal.ts              → Faz 1
src/lib/smooth-scroll.ts                     → Faz 1 (veya mevcut güncelleme)
public/images/mas-logo.svg                   → Faz 2 (hero mask için)

```

### Güncellenen Dosyalar

```
src/components/ui/Reveal.tsx                 → Faz 1 (percentage-reveal varyantı)
src/components/SectionHeader.tsx             → Faz 1 (editorial numara + SplitText)
src/components/HeroSection.tsx               → Faz 2 (SVG mask reveal — major)
src/components/ServicesSection.tsx            → Faz 2 (dual-column layout — major)
src/components/PageTransition.tsx             → Faz 2 (clip-path inset)
src/components/PageLoader.tsx                → Faz 2 (yüzde sayacı)
src/components/IndustriesStrip.tsx           → Faz 3 (dual-direction)
src/components/ui/MagneticButton.tsx         → Faz 3 (elastic + ripple)
src/components/HowWeWorkSection.tsx          → Faz 4 (pin+scrub — opsiyonel)
src/pages/Index.tsx                          → Faz 1+ (section numara atamaları, glow line yerleşimi)

```

### Faz bazlı section güncellemeleri

```
Faz 1: Tüm section'lar — Reveal ve SplitText entegrasyonu, Framer Motion kaldırma
Faz 2: HeroSection (major), ServicesSection (major), PageTransition, PageLoader
Faz 3: Index.tsx glow line yerleşimi, IndustriesStrip, HighlightSection ekleme
Faz 4: HowWeWorkSection (opsiyonel major), MobileMenu (opsiyonel)

```

---

## UYGULAMA SIRASI (KESİN)

```
Faz 1 (Hafta 1-2):
  1. Lenis + ScrollTrigger senkronizasyonu
  2. Global Reveal sistemi (fade-up, percentage-reveal)
  3. OverlayReveal bileşeni
  4. useSplitTextReveal hook
  5. SectionHeader editorial sistemi + tüm section'lara numara ataması

Faz 2 (Hafta 3-5):
  6. Hero SVG Mask Reveal ← EN ÖNCELİKLİ
  7. Services dual-column layout dönüşümü
  8. Clip-path sayfa geçişi
  9. Custom cursor sistemi
  10. Preloader yüzde sayacı

Faz 3 (Hafta 5-6):
  11. GlowLineDivider + yerleşim
  12. BracketButton + kullanım
  13. TextHighlight + HighlightSection
  14. Dual-direction marquee
  15. MagneticButton genişletmesi

Faz 4 (Hafta 7+, opsiyonel):
  16. Process pin+scrub horizontal
  17. Menu follow-mouse görselleri
  18. Preloader GSAP Flip upgrade
  19. Stacked cards (testimonials)
  20. 3D perspective typography
  21. Ses tasarımı

```