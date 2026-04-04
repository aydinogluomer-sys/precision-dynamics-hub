## Awwwards Seviyesine Ulaşmak İçin Kapsamlı UI/UX Önerileri

Mevcut kodu inceledikten sonra, projenin zaten güçlü bir temel üzerine kurulu olduğunu görüyorum — GSAP scrollytelling, custom cursor, R3F WebGL sahnesi, stacking scroll sistemi, magnetic buttons ve page transitions mevcut. Ancak Awwwards Site of the Day seviyesine ulaşmak için aşağıdaki eksik parçaların tamamlanması gerekiyor.

---

### A. SAYFA YÜKLEME DENEYİMİ (First Impression)

**1. Preloader → Hero Geçişi**
Mevcut `PageLoader` bileşenini sinematik bir sahneye dönüştür:

- Yükleme yüzdesi büyük monospace tipografi ile gösterilsin (`00` → `100`)
- Yüzde tamamlandığında ekran ortasından `clipPath: circle()` ile açılsın
- Yükleme sırasında arka planda asset'ler (görseller, fontlar, video poster) preload edilsin
- Süre: gerçek yükleme + minimum 2s dramatik bekleme

**2. Sayfa Arası Geçiş Katmanı**
Mevcut `PageTransition` iyi ama tek boyutlu. Ekle:

- Geçiş sırasında sayfa üzerine kayan koyu bir "perde" (`motion.div` overlay)
- Perde üzerinde hedef sayfanın başlığının bir an görünmesi (route-aware text flash)
- `clipPath: inset()` yerine `clipPath: polygon()` ile açısal/endüstriyel kesim

---

### B. TİPOGRAFİ & METİN ANİMASYONLARI

**3. Char-by-Char Reveal (Tüm Bölüm Başlıkları)**
`SectionHeader` bileşeninde `useSplitTextReveal` hook'u zaten var ama sadece kelime bazlı. Harf bazlı stagger ekle:

- Her harf `translateY(100%)` → `0` ile gelsin
- Stagger: `0.02s` per char
- Easing: `power4.out`
- Özellikle "Birlikte Üretelim" ve ana başlıklarda dramatik etki

**4. Marquee / Ticker Band**
Bölümler arasına (örneğin Hero altı veya Footer üstü) yatay akan bir metin bandı:

- "HASSAS ÜRETİM • CNC FREZELEME • TORNA • 5 EKSEN" gibi tekrarlayan endüstriyel terimler
- `translateX` CSS animasyonu, sonsuz döngü
- Ters yönde ikinci bir bant (paralaks hissi)
- Büyük, light-weight tipografi (`text-8xl font-light`)

---

### C. SCROLL DENEYİMİ

**5. Scroll Velocity İndikatörü**
Mevcut `ScrollProgress` barını genişlet:

- Scroll hızına göre bar kalınlığı değişsin (hızlı → kalın, yavaş → ince)
- Scroll yönüne göre renk tonu kayması (aşağı: teal, yukarı: amber)

**6. Parallax Depth Katmanları**
Her bölümün arka planına çoklu derinlik katmanı:

- z-0: arka plan rengi/gradient
- z-1: çok hafif noise/grain texture (CSS `feTurbulence`)
- z-2: geometrik dekoratif öğeler (çizgiler, noktalar) scroll'a bağlı yavaş hareket
- z-3: içerik

**7. Section Reveal — Staggered Grid Entrance**
`ServicesSection`, `IndustriesSection` gibi grid/kart tabanlı bölümlerde:

- Kartlar ekrana girdiğinde 2D grid koordinatlarına göre stagger (sol üstten sağ alta doğru dalga)
- Her kart: `scale(0.9)` + `opacity: 0` → `scale(1)` + `opacity: 1`
- Toplam süre: ~800ms, stagger: `50ms` per card

---

### D. HOVER & MİKRO-ETKİLEŞİMLER

**8. Kart Hover — 3D Tilt + Spotlight**
`ProjectShowcase` ve diğer kartlara:

- Mouse pozisyonuna göre `rotateX/rotateY` (max ±5°) — `perspective(1000px)`
- Mouse pozisyonunda radial gradient spot ışığı (`pointer-events: none` overlay)
- Hover'da kenarlık `border-color` geçişi (muted → primary)

**9. Link / Buton Hover — Underline Morph**
Nav linkleri ve metin linkleri için:

- Alttan gelen `scaleX(0→1)` çizgi animasyonu (mevcut `.story-link` var ama tüm yerlerde kullanılmıyor)
- CTA butonlarında hover'da ok ikonunun `→` yönüne doğru kayması (`translateX(4px)`)

**10. Magnetic Effect Genişletme**
Mevcut `MagneticButton` sadece belirli butonlarda. Tüm interaktif öğelere (kartlar, nav linkleri, sosyal ikonlar) hafif bir manyetik çekim ekle — ama mesafe ve güç daha düşük (`distance: 0.2`, `strength: 0.15`).

---

### E. VİZÜEL DERİNLİK & DOKU

**11. Grain/Noise Overlay (Global)**
Tüm sayfaya çok hafif bir film grain efekti:

```css
body::after {
  content: '';
  position: fixed; inset: 0; z-index: 9999;
  pointer-events: none;
  background-image: url("data:image/svg+xml,...noise...");
  opacity: 0.03;
  mix-blend-mode: overlay;
}
```

Bu tek başına "pahalı" hissiyat yaratır — Awwwards sitelerinin %80'i kullanır.

**12. Glow / Ambient Light**
Koyu bölümlerde mouse pozisyonunda çok hafif bir radial glow:

- `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), hsl(var(--primary) / 0.04), transparent)`
- Performans: CSS custom property + `mousemove` throttle

---

### F. FOOTER DENEYİMİ

**13. Footer — Reveal from Behind**
Footer'ı son section'ın "altından" çıkacak şekilde ayarla:

- Footer: `position: fixed; bottom: 0; width: 100%`
- Son section'ın altında footer yüksekliği kadar `margin-bottom`
- Sayfa sonunda footer doğal olarak "açığa çıkar" — paralaks hissi

**14. Footer — Büyük İmza Başlık**
Footer'ın en üstüne tam genişlik, çok büyük (`text-[12vw]`) bir "MAS TECHNIC" yazısı:

- `opacity: 0.05` — hafif, arka plan doku gibi
- Veya `clipPath` ile dolgu animasyonu (scroll'a bağlı)

---

### G. SES & HAPTİK GERİBİLDİRİM

**15. Ses Tasarımı Genişletme**
Mevcut `useSoundEngine` var. Eksik olan:

- Bölüm geçişlerinde hafif "whoosh" sesi
- Kart hover'da metalik "tick" sesi (mevcut cursor'da var ama kartlarda yok)
- Scroll milestone'larında (%25, %50, %75) çok hafif "ping"
- Tüm sesler varsayılan KAPALI, toggle ile açılsın

---

### H. PERFORMANS & PÜRÜZSÜZLÜK

**16. Image Reveal — OverlayReveal Yaygınlaştır**
Mevcut `OverlayReveal` bileşeni sadece bazı yerlerde kullanılıyor. Tüm görsellere:

- Görsel yüklenene kadar koyu/primary renk bir "perde"
- Görsel yüklendiğinde perde kayarak açılsın (`translateX(-100%)`)
- Skeleton shimmer yerine bu daha premium hissiyat verir

**17. Lazy Component Loading — Skeleton Geçişleri**
Mevcut `SectionLoader` sadece spinner. Her bölüm için:

- Bölüme özel skeleton layout (kart grid skeleton, metin satır skeleton)
- Skeleton → gerçek içerik geçişi `opacity + blur` ile

---

### I. MOBİL ÖZELLEŞTİRME

**18. Mobil Scroll Snapping**
Mobilde her bölüm `scroll-snap-align: start` ile ekrana otursun:

- Parmak kaydırmada bölüm bölüm ilerlesin
- Desktop'ta devre dışı (Lenis smooth scroll devam etsin)

**19. Mobil Menü — Fullscreen Takeover**
Mevcut hamburger menüyü tam ekran bir deneyime dönüştür:

- Menü açıldığında tüm ekranı kaplayan koyu overlay
- Menü öğeleri büyük tipografi (`text-4xl`) ile dikey sıralı
- Her öğe stagger reveal (`translateY + opacity`)
- Kapanışta ters animasyon

---

### J. DETAY FARKLILIKLARI (Polish)

**20. Zaman / Tarih Göstergesi**
Footer veya Header'da sürekli güncellenen bir saat:

- `HH:MM:SS` formatında, monospace font
- Timezone: İstanbul (UTC+3)
- Awwwards sitelerinde sıkça görülen "canlılık" detayı

**21. Koordinat / Konum Bilgisi**
Footer'da:

```
41°01'N 28°58'E — İstanbul, TR
```

Endüstriyel-teknik estetik. Monospace font.

**22. Easter Egg — Konami Code**
Belirli bir tuş kombinasyonunda (↑↑↓↓←→←→BA) gizli bir animasyon veya renk paleti değişimi. Awwwards jürisinin dikkatini çeker.

---

### ÖNCELİK SIRASI (Etki/Efor Oranına Göre)


| Öncelik | Öneri                         | Etki   | Efor  |
| ------- | ----------------------------- | ------ | ----- |
| 1       | Global Grain Overlay (#11)    | Yüksek | Düşük |
| 2       | Marquee Ticker Band (#4)      | Yüksek | Düşük |
| 3       | Footer Reveal (#13)           | Yüksek | Orta  |
| 4       | Kart 3D Tilt + Spotlight (#8) | Yüksek | Orta  |
| 5       | Ambient Mouse Glow (#12)      | Orta   | Düşük |
| 6       | Preloader Sinematik (#1)      | Yüksek | Orta  |
| 7       | Char-by-Char Reveal (#3)      | Orta   | Orta  |
| 8       | Footer Büyük İmza (#14)       | Orta   | Düşük |
| 9       | Koordinat/Saat Detay (#20-21) | Düşük  | Düşük |
| 10      | Mobil Fullscreen Menü (#19)   | Orta   | Orta  |


---

Önce mevcut siteyi bir göz atayım, sonra prompt'u yazayım.React app, DOM içeriği görünmüyor. Direkt prompt yazayım — belgeyi ve önceki reviewimi baz alarak.Şimdi kapsamlı prompt'u yazıyorum. Bu uzun olacak — her madde için net talimatlar, araç yönlendirmeleri ve Lovable kısıtları dahil.

---

# MAS TECHNİC — AWWWARDS PROMPT PAKETİ

Aşağıda **14 ayrı prompt** var. Sırayla çalıştır — her biri bir öncekinin üzerine inşa ediyor. Lovable dışına çıkman gereken yerler `[DIŞ ARAÇ]` ile işaretli.

---

## ─── PROMPT 01 — GRAIN OVERLAY + AMBIENT GLOW ───

*(Etki/efor en iyi oran. Buradan başla.)*

```
Aşağıdaki global görsel iyileştirmeleri yap. HİÇBİR bileşen mantığına dokunma, sadece global CSS ve tek bir React hook ekle.

━━━ 1. GRAIN OVERLAY ━━━
index.css veya globals.css içine ekle:

body::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9998;
  pointer-events: none;
  opacity: 0.035;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/feTurbulence%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}

━━━ 2. AMBIENT MOUSE GLOW ━━━
useAmbientGlow.ts adında bir hook oluştur:

import { useEffect } from 'react';

export function useAmbientGlow() {
  useEffect(() => {
    let ticking = false;
    const handler = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
          document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);
}

Bu hook'u App.tsx veya Layout bileşeninde çağır.

Sonra koyu arka planlı section'lara (dark background olan her section) şu overlay div'ini ekle — section'ın içine, diğer içeriklerin ARKASINDA (z-index: 0), pointer-events: none:

<div
  style={{
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none',
    background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(--primary) / 0.045), transparent 70%)',
  }}
  aria-hidden="true"
/>

Section'ın pozisyonu relative olduğundan emin ol. Bu div HER koyu section'da olacak.

━━━ KISITLAR ━━━
- border-radius: 0 kalacak
- IBM Plex Mono korunacak
- /admin/* ve /musteri-paneli/* dosyalarına dokunma
- Yeni npm paketi EKLEME

```

---

## ─── PROMPT 02 — MARQUEE TICKER BAND ───

```
İki adet yatay kayan metin bandı (marquee) oluştur. Biri Hero section'ının hemen altına, biri Footer'ın hemen üstüne yerleştirilecek.

━━━ MarqueeBand.tsx bileşeni ━━━

import React from 'react';

interface MarqueeBandProps {
  reverse?: boolean;
  className?: string;
}

const TERMS = [
  'HASSAS ÜRETİM',
  'CNC FREZELEME',
  '5 EKSEN TORNA',
  'Ti-6Al-4V',
  'EDM KESİM',
  'Inconel 718',
  '±0.002mm TOLERANS',
  'H13 TAKIM ÇELİĞİ',
  'PPAP SERTİFİKASYON',
  'AEROSPACE GRADE',
];

export function MarqueeBand({ reverse = false, className = '' }: MarqueeBandProps) {
  const content = [...TERMS, ...TERMS]; // duplicate for seamless loop

  return (
    <div
      className={`marquee-outer ${className}`}
      style={{
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '14px 0',
        background: 'rgba(0,0,0,0.2)',
      }}
    >
      <div
        className={reverse ? 'marquee-inner marquee-reverse' : 'marquee-inner'}
      >
        {content.map((term, i) => (
          <span key={i} style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 'clamp(10px, 1.5vw, 13px)', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.35)', whiteSpace: 'nowrap' }}>
            {term}
            <span style={{ margin: '0 24px', color: 'rgba(255,255,255,0.12)' }}>•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

globals.css veya index.css'e ekle:

@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes marquee-scroll-reverse {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}
.marquee-inner {
  display: flex;
  width: max-content;
  animation: marquee-scroll 28s linear infinite;
  will-change: transform;
}
.marquee-reverse {
  animation: marquee-scroll-reverse 22s linear infinite;
}
@media (prefers-reduced-motion: reduce) {
  .marquee-inner, .marquee-reverse { animation: none; }
}

Hero section'ının kapanış tag'inden HEMEN ÖNCE yerleştir:
<MarqueeBand />

Footer bileşeninin açılış tag'inden HEMEN SONRA yerleştir:
<MarqueeBand reverse />

━━━ KISITLAR ━━━
- border-radius: 0 — marquee container'da da sıfır kalacak
- IBM Plex Mono korunacak
- Yeni npm paketi EKLEME

```

---

## ─── PROMPT 03 — SCROLL VELOCITY İNDİKATÖRÜ ───

```
Mevcut ScrollProgress bar bileşenini bul. Şu iki davranışı ekle — başka hiçbir şeye dokunma:

1. Scroll hızına göre bar yüksekliği değişsin:
   - Yavaş/duruk scroll: 2px
   - Orta hız: 3px
   - Hızlı scroll: 5px
   Geçiş: CSS transition height 0.15s ease-out

2. Scroll yönüne göre renk:
   - Aşağı: var(--primary) veya teal tonu (#0688AD)
   - Yukarı: amber tonu (#D4A853)
   Geçiş: CSS transition background-color 0.3s ease

useScrollVelocity hook'u oluştur:

import { useEffect, useRef, useState } from 'react';

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const [direction, setDirection] = useState<'down' | 'up'>('down');
  const lastY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    let ticking = false;
    const handler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const now = Date.now();
          const dt = now - lastTime.current;
          const dy = window.scrollY - lastY.current;
          const v = Math.abs(dy) / Math.max(dt, 1) * 100;
          setVelocity(Math.min(v, 10));
          setDirection(dy >= 0 ? 'down' : 'up');
          lastY.current = window.scrollY;
          lastTime.current = now;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return { velocity, direction };
}

ScrollProgress bileşeninde bu hook'u kullan. velocity 0-3 arası → height 2px, 3-6 → 3px, 6+ → 5px. direction 'up' → amber renk.

━━━ KISITLAR ━━━
- Yeni npm paketi EKLEME
- /admin/* ve /musteri-paneli/* dokunma

```

---

## ─── PROMPT 04 — STAGGERED GRID ENTRANCE ───

```
ServicesSection, IndustriesSection ve kart grid içeren TÜM bölümlerde şu animasyonu uygula.

useStaggeredReveal.ts hook'u oluştur:

import { useEffect, useRef } from 'react';

export function useStaggeredReveal(selector = '[data-stagger]') {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = Array.from(container.querySelectorAll(selector)) as HTMLElement[];
    
    items.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'scale(0.92) translateY(20px)';
      el.style.transition = 'none';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const gridItems = Array.from(entry.target.querySelectorAll(selector)) as HTMLElement[];
            gridItems.forEach((el, i) => {
              const col = parseInt(el.dataset.col || '0');
              const row = parseInt(el.dataset.row || '0');
              const delay = (col + row) * 55;
              setTimeout(() => {
                el.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
                el.style.opacity = '1';
                el.style.transform = 'scale(1) translateY(0)';
              }, delay);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return containerRef;
}

Her kart grid container'ına containerRef ekle. Her kart/grid-item'a:
- data-stagger=""
- data-col="{sütun index}"
- data-row="{satır index}"

attribute'larını ekle. Grid 3 sütunluysa ilk satır col=0,1,2 row=0,0,0; ikinci satır col=0,1,2 row=1,1,1.

━━━ KISITLAR ━━━
- GSAP veya harici animasyon kütüphanesi EKLEME, saf CSS transition kullan
- Yeni npm paketi EKLEME

```

---

## ─── PROMPT 05 — KART 3D TİLT + SPOTLİGHT ───

```
ProjectShowcase kartlarına ve diğer büyük kartlara 3D tilt + spotlight efekti ekle.

useTilt.ts hook'u oluştur:

import { useRef, useCallback } from 'react';

export function useTilt(maxAngle = 5) {
  const ref = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${-y * maxAngle}deg) rotateY(${x * maxAngle}deg)`;
    if (spotRef.current) {
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      spotRef.current.style.background = `radial-gradient(280px circle at ${px}% ${py}%, rgba(255,255,255,0.07), transparent 70%)`;
    }
  }, [maxAngle]);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    if (spotRef.current) spotRef.current.style.background = 'none';
  }, []);

  return { ref, spotRef, handleMouseMove, handleMouseLeave };
}

Her büyük karta uygulama:

const { ref, spotRef, handleMouseMove, handleMouseLeave } = useTilt(5);

<div
  ref={ref}
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
  style={{ transition: 'transform 0.15s ease-out', willChange: 'transform', position: 'relative' }}
>
  {/* spotlight overlay */}
  <div
    ref={spotRef}
    style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}
    aria-hidden="true"
  />
  {/* mevcut kart içeriği */}
</div>

━━━ KISITLAR ━━━
- border-radius: 0 — kart wrapper'da da sıfır
- Yeni npm paketi EKLEME
- maxAngle değeri 5'i GEÇME (fazlası kusma hissi verir)

```

---

## ─── PROMPT 06 — UNDERLINE MORPH + OK KAYMA ───

```
Tüm nav linklerine ve metin linklerine scaleX underline animasyonu ekle. CTA butonlarına hover'da ok kayma efekti ekle.

globals.css'e ekle:

/* Underline morph */
.nav-link-animated {
  position: relative;
  display: inline-block;
}
.nav-link-animated::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.nav-link-animated:hover::after {
  transform: scaleX(1);
}

/* Ok kayma */
.cta-arrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.cta-arrow .arrow-icon {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  display: inline-block;
}
.cta-arrow:hover .arrow-icon {
  transform: translateX(5px);
}

Mevcut nav link bileşenlerine nav-link-animated class'ını ekle.
CTA butonlarındaki ok ikonunu (→) arrow-icon class'ı taşıyan bir span'a al ve üst elementi cta-arrow class'ı ile işaretle.

━━━ KISITLAR ━━━
- Yeni npm paketi EKLEME
- Mevcut link stillerini BOZMADAN ekle — sadece class ekle

```

---

## ─── PROMPT 07 — IMAGE OVERLAY REVEAL ───

```
Mevcut OverlayReveal bileşenini bul. Şu anda sadece bazı görsellerde kullanılıyor. Tüm <img> ve görsel içeren kartlara yaygınlaştır.

OverlayReveal bileşeni şu şekilde çalışmalı (mevcut bileşeni bu yapıya getir veya yoksa oluştur):

import { useEffect, useRef, useState } from 'react';

interface OverlayRevealProps {
  children: React.ReactNode;
  delay?: number;
}

export function OverlayReveal({ children, delay = 0 }: OverlayRevealProps) {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setRevealed(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
      {children}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--background, #0a0a0a)',
          transform: revealed ? 'translateX(-101%)' : 'translateX(0)',
          transition: revealed ? 'transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)' : 'none',
          zIndex: 2,
        }}
      />
    </div>
  );
}

Tüm proje görselleri, servis kartı görselleri ve hero görselleri bu bileşen ile sar. delay prop'unu stagger için kullan (ilk görsel 0ms, ikinci 100ms, üçüncü 200ms vb.)

━━━ KISITLAR ━━━
- overflow: hidden olan wrapper'da border-radius kullanma
- Yeni npm paketi EKLEME

```

---

## ─── PROMPT 08 — FOOTER REVEAL + BÜYÜK İMZA ───

```
Footer bileşenini "altından çıkan" paralaks footer'a dönüştür.

1. Footer'ı şu şekilde yapılandır:

Footer bileşeninin dış wrapper'ına:
- position: fixed
- bottom: 0
- left: 0
- width: 100%
- z-index: 0 (sayfa içeriğinin ARKASINDA)

Sayfa içeriğinin son section'ına (Footer'dan önceki son bileşen):
- margin-bottom: [footer yüksekliği]px — bu değeri useLayoutEffect ile ölç:

const footerRef = useRef<HTMLElement>(null);
useEffect(() => {
  if (footerRef.current) {
    const h = footerRef.current.offsetHeight;
    document.documentElement.style.setProperty('--footer-height', h + 'px');
  }
}, []);

Son main içerik wrapper'ına padding-bottom: var(--footer-height) ekle.

⚠️ MOBİL UYARI: Bu teknik iOS Safari'de sorun çıkarır. Şu güvenlik kodunu ekle:
@supports (-webkit-touch-callout: none) {
  footer { position: relative !important; }
}

2. Footer'ın EN ÜSTÜNE büyük imza başlık ekle:

<div style={{
  fontSize: 'clamp(60px, 12vw, 160px)',
  fontFamily: 'IBM Plex Mono, monospace',
  fontWeight: 700,
  letterSpacing: '-0.02em',
  color: 'rgba(255,255,255,0.04)',
  lineHeight: 1,
  userSelect: 'none',
  pointerEvents: 'none',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
}}>
  MAS TECHNIC
</div>

Bu div footer'ın diğer içeriklerinin ARKASINDA kalmalı (position: relative, z-index: -1 veya container flex column ile en üste koy).

━━━ KISITLAR ━━━
- border-radius: 0
- /admin/* /musteri-paneli/* dokunma
- Yeni npm paketi EKLEME

```

---

## ─── PROMPT 09 — SAAT + KOORDİNAT DETAYI ───

```
Footer bileşenine iki küçük detay ekle:

1. Canlı saat:

function LiveClock() {
  const [time, setTime] = useState('');
  
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const istanbul = new Intl.DateTimeFormat('tr-TR', {
        timeZone: 'Europe/Istanbul',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      setTime(istanbul);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)' }}>
      IST {time}
    </span>
  );
}

2. Koordinat satırı:

<span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.25)' }}>
  41°01'N 28°58'E — İZMİR, TR
</span>

⚠️ Not: Mas Technic İzmir'de. Koordinatı düzelt: 38°25'N 27°08'E

Her ikisini footer'ın alt satırına, copyright bilgisinin yanına yerleştir.

━━━ KISITLAR ━━━
- Yeni npm paketi EKLEME (Intl API native)

```

---

## ─── PROMPT 10 — MOBİL FULLSCREEN MENÜ ───

```
Mevcut hamburger menü bileşenini bul. Tam ekran takeover menüye dönüştür.

Menü açıkken:
- Tüm ekranı kaplayan koyu overlay (background: rgba(0,0,0,0.97) veya var(--background))
- z-index: 9990
- position: fixed, inset: 0
- Framer Motion kullanılıyorsa: initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} — yoksa CSS transition ile

Menü öğeleri:
- fontSize: clamp(32px, 8vw, 64px)
- fontFamily: IBM Plex Mono
- fontWeight: 700
- letterSpacing: -0.02em
- Her öğe ayrı bir satırda, dikey sıralı
- Stagger: her öğe 60ms sonra gelsin (CSS transition-delay veya Framer Motion stagger)

Animasyon sırası:
1. Overlay açılır (200ms)
2. Menü öğeleri translateY(40px) opacity:0 → translateY(0) opacity:1 gelir (stagger)
3. Kapanışta ters sıra

Mobil menünün YANINA küçük detaylar ekle:
- Sol alt: LiveClock bileşeni (Prompt 09'dan)
- Sağ alt: "MAS TECHNİC © 2024" — IBM Plex Mono, 10px

━━━ KISITLAR ━━━
- Sadece mobil (max-width: 768px) bu menü görünür
- Desktop nav değişmeyecek
- Yeni npm paketi EKLEME

```

---

## ─── PROMPT 11 — MOBİL SCROLL SNAPPING ───

```
Mobil cihazlarda (max-width: 768px) scroll snap ekle. Desktop'ta Lenis smooth scroll aynen devam edecek.

globals.css'e ekle:

@media (max-width: 768px) {
  html {
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
  }
  
  main > section,
  main > [data-section] {
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }
}

Lenis instance'ının mobilde devre dışı kalması için:

// Lenis'i başlatan dosyayı bul
const isMobile = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
if (!isMobile) {
  // mevcut Lenis init kodu buraya
}

━━━ KISITLAR ━━━
- Lenis paketine dokunma, sadece conditional init
- Desktop deneyimi HİÇ değişmeyecek

```

---

## ─── PROMPT 12 — PRELOADER SİNEMATİK ───

```
Mevcut PageLoader bileşenini sinematik bir preloader'a dönüştür.

Yeni tasarım:
- Tam ekran siyah arka plan
- Ortada büyük sayaç: "000" → "100" (IBM Plex Mono, clamp(80px, 15vw, 160px), font-weight: 700)
- Sayacın altında ince bir progress bar (genişlik: 200px, yükseklik: 1px, renk: rgba(255,255,255,0.4))
- Sayacın üstünde çok küçük: "MAS TECHNIC" (IBM Plex Mono, 10px, letter-spacing: 0.4em)

Animasyon mantığı:
const [count, setCount] = useState(0);
const [done, setDone] = useState(false);

useEffect(() => {
  const start = Date.now();
  const minDuration = 2200; // minimum 2.2 saniye dramatik bekleme
  
  const tick = () => {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / minDuration, 1);
    // Ease out: hızlı başla yavaş bitir
    const eased = 1 - Math.pow(1 - progress, 3);
    setCount(Math.floor(eased * 100));
    
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      setCount(100);
      setTimeout(() => setDone(true), 400);
    }
  };
  
  requestAnimationFrame(tick);
}, []);

Kapanış animasyonu (done === true olduğunda):
- clipPath: 'circle(0% at 50% 50%)' → 'circle(150% at 50% 50%)'
- Transition: 0.9s cubic-bezier(0.76, 0, 0.24, 1)
- Sonra bileşen unmount

Sayaç her zaman 3 hane gösterin: count.toString().padStart(3, '0')

━━━ KISITLAR ━━━
- border-radius: 0 — preloader wrapper'da da
- IBM Plex Mono korunacak
- Yeni npm paketi EKLEME
- Framer Motion kullanılıyorsa: animate={{ clipPath }} kullanabilirsin

```

---

## ─── PROMPT 13 — PAGE TRANSİTİON UPGRADE ───

```
Mevcut PageTransition bileşenini bul. Şu upgrade'i uygula:

Mevcut clipPath: inset() yerine endüstriyel açısal kesim:

Kapanış (exit): 
clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' → 'polygon(0 0, 100% 0, 100% 0, 0 0)'
(Üstten aşağı kapanır — "perde çekme" hissi)

Açılış (enter):
clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' → 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
(Alttan yukarı açılır)

Transition overlay üzerine hedef sayfanın başlığını flash et:
- Geçiş overlay'i aktifken ortada: hedef route'un başlığı
- IBM Plex Mono, clamp(32px, 6vw, 80px), opacity: 0.15
- Route başlıkları: '/' → 'ANASAYFA', '/hakkimizda' → 'HAKKIMIZDA', '/hizmetler' → 'HİZMETLER', '/iletisim' → 'İLETİŞİM', '/portfoy' → 'PORTFÖY'

Overlay rengi: rgba(6, 136, 173, 0.95) — primary renk
Transition süresi: 0.5s giriş + 0.4s çıkış

━━━ KISITLAR ━━━
- Yeni npm paketi EKLEME
- Router yapısına dokunma, sadece transition bileşeni

```

---

## ─── PROMPT 14 — CHAR-BY-CHAR REVEAL + KONAMI ───

```
İki bağımsız iyileştirme:

━━━ A. CHAR-BY-CHAR REVEAL ━━━
useSplitTextReveal hook'unu kelime bazlıdan harf bazlıya yükselt.

SectionHeader bileşenini bul. Başlık metnini harflere böl:

function CharReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <span ref={ref} style={{ display: 'inline-block', overflow: 'hidden' }}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            transform: visible ? 'translateY(0)' : 'translateY(110%)',
            transition: `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${visible ? i * 20 : 0}ms`,
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

SectionHeader bileşenindeki h1, h2 başlıklarını bu bileşen ile sar.

━━━ B. KONAMI CODE ━━━
App.tsx veya Layout bileşenine ekle:

useEffect(() => {
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let idx = 0;
  const handler = (e: KeyboardEvent) => {
    if (e.key === KONAMI[idx]) {
      idx++;
      if (idx === KONAMI.length) {
        // Easter egg: primary renk değişimi + flash
        document.documentElement.style.setProperty('--primary', '#D4A853');
        document.body.style.transition = 'filter 0.3s';
        document.body.style.filter = 'hue-rotate(45deg)';
        setTimeout(() => {
          document.body.style.filter = 'hue-rotate(0deg)';
          setTimeout(() => document.body.style.filter = '', 500);
        }, 2000);
        console.log('🏆 Mas Technic Easter Egg aktif');
        idx = 0;
      }
    } else {
      idx = 0;
    }
  };
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
}, []);

━━━ KISITLAR ━━━
- Yeni npm paketi EKLEME
- /admin/* /musteri-paneli/* dokunma

```

---

## ─── DIŞ ARAÇ YÖNLENDİRMELERİ ───

Aşağıdaki iki öğe Lovable'ın sınırlarını zorlar. Bu araçlarda yap, aldığın kodu Lovable'a yapıştır:

---

### 🔴 THREE.JS SAHNE — Spline veya elle yaz

**Seçenek A — Spline (önerilen, kolay):**

1. [spline.design](http://spline.design) → Yeni sahne
2. Sahne: dönen metalik CNC torna parçası veya titanyum bloğu (basit geometri — silindir + torus)
3. Material: "Physical" → Metalness: 1.0, Roughness: 0.15, renk #1a1a2e
4. Sahneyi export et → "Export for Web" → `@splinetool/react-spline` paketi
5. Lovable'a yapıştır:

```
Bağımsız bir ThreeScene.tsx bileşeni oluştur ve şu kodu içine yapıştır:

import Spline from '@splinetool/react-spline';

export function ThreeScene() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, opacity: 0.6 }}>
      <Spline scene="[SPLINE_EXPORT_URL_BURAYA]" />
    </div>
  );
}

Bu bileşeni HeroSection'a ekle — hero içeriğinin ARKASINA (z-index: 0), içerik önde kalacak (z-index: 1).
Yeni paket: @splinetool/react-spline — bu paketi ekleyebilirsin.

```

**Seçenek B — Elle Three.js (Spline istemiyorsan):**

```
HeroSection'a basit bir Three.js sahne ekle. Yeni bir ThreeBackground.tsx bileşeni oluştur:

import { useEffect, useRef } from 'react';
import * as THREE from 'three'; // three zaten projede varsa kullan, yoksa ekle

export function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // Metalik torus geometri
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 200, 32);
    const material = new THREE.MeshStandardMaterial({
      color: 0x1a1a2e,
      metalness: 0.95,
      roughness: 0.08,
      envMapIntensity: 1.5,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Işıklar
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x0688AD, 4, 8);
    pointLight1.position.set(3, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xD4A853, 2, 8);
    pointLight2.position.set(-3, -2, 2);
    scene.add(pointLight2);

    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      mesh.rotation.x += 0.003;
      mesh.rotation.y += 0.005;
      mesh.rotation.x += (mouseY * 0.3 - mesh.rotation.x) * 0.02;
      mesh.rotation.y += (mouseX * 0.3 - mesh.rotation.y) * 0.02;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.5, pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}

Bu bileşeni HeroSection'ın en dışına ekle. Hero section position: relative olmalı. three paketi projede yoksa ekle.

```

---

### 🟡 PARALLAX DEPTH KATMANLARI — Elle yaz (Lovable yapabilir ama yönlendirme lazım)

```
Her major section'ın arka planına çok hafif geometrik dekoratif katman ekle. Yeni bir SectionDecor.tsx bileşeni oluştur:

interface SectionDecorProps {
  scrollY?: number;
}

export function SectionDecor() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let ticking = false;
    const handler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (ref.current) {
            const rect = ref.current.closest('section')?.getBoundingClientRect();
            if (rect) {
              const progress = -rect.top / (rect.height + window.innerHeight);
              ref.current.style.transform = `translateY(${progress * 40}px)`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <svg
      ref={ref}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: 0.04, willChange: 'transform' }}
      aria-hidden="true"
    >
      <line x1="0" y1="30%" x2="100%" y2="30%" stroke="white" strokeWidth="0.5" />
      <line x1="0" y1="70%" x2="100%" y2="70%" stroke="white" strokeWidth="0.5" />
      <line x1="20%" y1="0" x2="20%" y2="100%" stroke="white" strokeWidth="0.5" />
      <line x1="80%" y1="0" x2="80%" y2="100%" stroke="white" strokeWidth="0.5" />
      <circle cx="20%" cy="30%" r="3" fill="white" />
      <circle cx="80%" cy="30%" r="3" fill="white" />
      <circle cx="20%" cy="70%" r="3" fill="white" />
      <circle cx="80%" cy="70%" r="3" fill="white" />
    </svg>
  );
}

Bu bileşeni her section içine ekle. Section position: relative olmalı.

```

---

## UYGULAMA SIRASI


| #   | Prompt               | Süre | Risk                       |
| --- | -------------------- | ---- | -------------------------- |
| 01  | Grain + Ambient Glow | 5dk  | Sıfır                      |
| 02  | Marquee Ticker       | 10dk | Sıfır                      |
| 03  | Scroll Velocity      | 15dk | Düşük                      |
| 04  | Staggered Grid       | 20dk | Düşük                      |
| 05  | 3D Tilt Spotlight    | 20dk | Düşük                      |
| 06  | Underline + Ok       | 10dk | Sıfır                      |
| 07  | Image Reveal         | 15dk | Düşük                      |
| 08  | Footer Reveal        | 25dk | Orta                       |
| 09  | Saat + Koordinat     | 5dk  | Sıfır                      |
| 10  | Mobil Menü           | 20dk | Orta                       |
| 11  | Scroll Snap Mobil    | 10dk | Düşük                      |
| 12  | Preloader            | 30dk | Orta                       |
| 13  | Page Transition      | 25dk | Orta                       |
| 14  | Char Reveal + Konami | 20dk | Düşük                      |
| DIŞ | Three.js Sahne       | 45dk | Spline=düşük / Elle=yüksek |


**Her prompt'tan sonra preview'da kontrol et — özellikle 08 ve 13 sonrası.**

&nbsp;

### DOKUNULMAYACAK DOSYALAR

- `/admin/*` ve `/musteri-paneli/*` altındaki hiçbir dosya
- `border-radius: 0rem` sabit kalacak
- IBM Plex Mono fontu korunacak
- Yeni npm paketi yalnızca `lenis` (zaten mevcut)