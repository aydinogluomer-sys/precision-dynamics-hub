# MAS TECHNIC — Kapsamlı Revizyon Planı v2.0

**Proje:** [mas-technic-precision.lovable.app](http://mas-technic-precision.lovable.app)  
**Stack:** React 18 + Vite 5 + GSAP + Lenis + Three.js + Framer Motion + Tailwind CSS + shadcn/ui  
**Kısıtlar:** `/admin/*` ve `/musteri-paneli/*` dokunulmaz · Sadece `lenis` yeni npm paketi · Font: IBM Plex Mono · border-radius: 0rem  
**Tarih:** 5 Nisan 2026

---

## İÇİNDEKİLER 

- [BÖLÜM A: Ön Hazırlık — Mimari Altyapı](https://claude.ai/chat/bd7bca97-e410-4b32-b049-d9ecd5b12e1f#b%C3%B6l%C3%BCm-a-%C3%B6n-haz%C4%B1rl%C4%B1k--mimari-altyap%C4%B1)
- [BÖLÜM B: Bug Fix — forwardRef ve Console Hataları](https://claude.ai/chat/bd7bca97-e410-4b32-b049-d9ecd5b12e1f#b%C3%B6l%C3%BCm-b-bug-fix--forwardref-ve-console-hatalar%C4%B1)
- [BÖLÜM C: Performans Optimizasyonu](https://claude.ai/chat/bd7bca97-e410-4b32-b049-d9ecd5b12e1f#b%C3%B6l%C3%BCm-c-performans-optimizasyonu)
- [BÖLÜM D: Eksik 6 Maddenin Uygulanması](https://claude.ai/chat/bd7bca97-e410-4b32-b049-d9ecd5b12e1f#b%C3%B6l%C3%BCm-d-eksik-6-maddenin-uygulanmas%C4%B1)
- [BÖLÜM E: Yeni Lav Sahneleri](https://claude.ai/chat/bd7bca97-e410-4b32-b049-d9ecd5b12e1f#b%C3%B6l%C3%BCm-e-yeni-lav-sahneleri)
- [BÖLÜM F: Ambient Mouse Glow](https://claude.ai/chat/bd7bca97-e410-4b32-b049-d9ecd5b12e1f#b%C3%B6l%C3%BCm-f-ambient-mouse-glow)
- [BÖLÜM G: 14 Madde Audit Tablosu](https://claude.ai/chat/bd7bca97-e410-4b32-b049-d9ecd5b12e1f#b%C3%B6l%C3%BCm-g-14-madde-audit-tablosu)
- [BÖLÜM H: Test Stratejisi ve Checklist](https://claude.ai/chat/bd7bca97-e410-4b32-b049-d9ecd5b12e1f#b%C3%B6l%C3%BCm-h-test-stratejisi-ve-checklist)
- [BÖLÜM I: z-index Haritası](https://claude.ai/chat/bd7bca97-e410-4b32-b049-d9ecd5b12e1f#b%C3%B6l%C3%BCm-i-z-index-haritas%C4%B1)
- [BÖLÜM J: Dosya Değişiklikleri Özet Tablosu](https://claude.ai/chat/bd7bca97-e410-4b32-b049-d9ecd5b12e1f#b%C3%B6l%C3%BCm-j-dosya-de%C4%9Fi%C5%9Fiklikleri-%C3%B6zet-tablosu)

---

## UYGULAMA ÖNCELİK SIRASI

Orijinal planda sıra "bug fix → performans → lav sahneleri → eksik maddeler → glow" idi.  
Revize sıra aşağıdaki gibidir. Gerekçe: Yeni feature eklemeden önce mevcut altyapının tam çalışır durumda olması gerekir. Eksik maddeler (footer reveal, scroll snap, page transition) lav sahnelerinin entegrasyonunu doğrudan etkiler.


| Sıra | Bölüm                  | Gerekçe                                                                                                    |
| ---- | ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| 1    | A — Mimari Altyapı     | Lenis+GSAP senkronizasyonu, z-index haritası, error boundary. Tüm sonraki işlerin temeli.                  |
| 2    | B — Bug Fix            | Hızlı, düşük risk, console temizliği.                                                                      |
| 3    | C — Performans (P1–P4) | Yüksek etki, yeni component'lar eklemeden önce mevcut yükü azalt.                                          |
| 4    | D — Eksik 6 Madde      | Footer reveal, scroll snap, page transition gibi yapısal maddeler lav sahnelerinin entegrasyonunu etkiler. |
| 5    | E — Lav Sahneleri      | Temeli sağlam altyapı üzerine yeni feature.                                                                |
| 6    | F — Ambient Glow       | Kozmetik, en son.                                                                                          |
| 7    | C — Performans (P5–P9) | Son rötuşlar.                                                                                              |


---

## BÖLÜM A: Ön Hazırlık — Mimari Altyapı

Bu bölüm orijinal planda yoktu. Diğer tüm bölümlerin sağlıklı çalışması için zorunlu altyapı işlerini kapsar.

### A1. Lenis + GSAP ScrollTrigger Senkronizasyonu

**Sorun:** Projede Lenis smooth scroll aktif. GSAP ScrollTrigger, native scroll event'ine bağlı çalışır. Lenis kendi scroll mekanizmasını kullandığı için, ScrollTrigger ile senkronize edilmezse yeni lav sahneleri tetiklenmez veya jank yapar.

**Çözüm:** `SmoothScrollProvider.tsx` içinde Lenis instance'ı oluşturulduktan hemen sonra şu senkronizasyon kodunu ekle:

```tsx
// SmoothScrollProvider.tsx — Lenis init'ten sonra
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

// Lenis → GSAP senkronizasyonu
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

```

**Kritik not:** Bu senkronizasyon olmadan Bölüm E'deki lav sahneleri çalışmaz. Bu yüzden en önce uygulanmalı.

### A2. z-index Haritası

Projede mevcut ve yeni eklenen tüm katmanların çakışmaması için tek bir z-index referans haritası oluşturulmalı. Ondalık z-index (2.5 gibi) kullanılmamalı — tamsayı scale kullan.


| Katman                    | z-index | Bileşen                        |
| ------------------------- | ------- | ------------------------------ |
| Arka plan base            | 0       | Body, section arka planları    |
| Section content           | 1       | Tüm section içerikleri         |
| Ambient glow overlay      | 2       | Mouse glow div'leri            |
| Grain overlay             | 5       | `body::after` noise SVG        |
| Scroll velocity indicator | 8       | Scroll speed renk şeridi       |
| LavaTypographyScene       | 10      | Yeni sahne 1                   |
| MoldCastScene             | 11      | Yeni sahne 2                   |
| CNCScrollStory            | 12      | Mevcut scroll story            |
| Marquee band              | 15      | Ticker band                    |
| SectionDotNav             | 20      | Sağ taraftaki dot navigation   |
| Header / Nav              | 50      | Üst menü                       |
| Mobile menu overlay       | 60      | Fullscreen takeover menü       |
| Custom cursor             | 90      | Industrial cursor              |
| Preloader                 | 100     | Sinematik preloader (en üstte) |


Bu harita `src/styles/z-index.ts` olarak export edilip tüm component'larda import edilmeli:

```tsx
// src/styles/z-index.ts
export const Z = {
  base: 0,
  content: 1,
  ambientGlow: 2,
  grain: 5,
  scrollVelocity: 8,
  lavaTypography: 10,
  moldCast: 11,
  cncStory: 12,
  marquee: 15,
  dotNav: 20,
  header: 50,
  mobileMenu: 60,
  cursor: 90,
  preloader: 100,
} as const;

```

### A3. Error Boundary Ekleme

**Sorun:** R3F canvas veya ağır animasyon component'ı crash'lerse tüm sayfa beyaz ekran olur. Bu bir B2B sitesi — müşteri bunu görürse güven kaybı olur.

**Çözüm:** Ağır component'ları Error Boundary ile sar:

```tsx
// src/components/ErrorBoundary.tsx
import { Component, ReactNode } from 'react';

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error) {
    // Production'da error tracking'e gönder (Sentry vb.)
    console.error('ErrorBoundary caught:', error);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <div className="w-full h-full bg-forge-obsidian" />;
    }
    return this.props.children;
  }
}

```

Sarılacak component'lar:

- `HeroCanvas` (R3F)
- `LavaTypographyScene` (yeni)
- `MoldCastScene` (yeni)
- `CNCScrollStory`
- `MaterialMorphScroll`

### A4. WebGL / GPU Yeterlilik Kontrolü ve Fallback

**Sorun:** Düşük donanımlı mobil cihazlar veya WebGL desteklemeyen tarayıcılar sayfayı render edemeyebilir.

**Çözüm:** Utility hook oluştur:

```tsx
// src/hooks/useGPUCapability.ts
export function useGPUCapability() {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  if (!gl) return 'none';
  
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  if (debugInfo) {
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    // Bilinen düşük performanslı GPU'lar
    if (/swiftshader|llvmpipe|mesa/i.test(renderer)) return 'low';
  }
  return 'high';
}

```

- `'none'` → R3F canvas'ı hiç yükleme, statik görsel göster.
- `'low'` → Lav sahnelerini devre dışı bırak, basitleştirilmiş CSS animasyonları kullan.
- `'high'` → Tüm efektler aktif.

### A5. `prefers-reduced-motion` Desteği

**Sorun:** Accessibility açısından kritik. Animasyon hassasiyeti olan kullanıcılar ve bazı pazarlarda yasal gereklilik.

**Çözüm:** Global hook:

```tsx
// src/hooks/useReducedMotion.ts
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

```

Bu hook tüm animasyonlu component'larda kontrol edilmeli:

- `reduced === true` → GSAP animasyonları skip, Framer Motion duration=0, lav sahneleri statik gradient, video autoplay kapalı.

### A6. Memory Leak Önleme Checklist'i

**Sorun:** JS Heap 41.6MB — yüksek. GSAP ScrollTrigger instance'ları, Lenis listener'ları, IntersectionObserver'lar düzgün temizlenmezse leak oluşur.

**Kural:** Her component'ta `useEffect` return fonksiyonunda şunlar yapılmalı:

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // ScrollTrigger animasyonları burada
  }, containerRef);
  
  return () => {
    ctx.revert(); // Tüm GSAP animasyonlarını ve ScrollTrigger'ları temizler
  };
}, []);

```

Kontrol edilecek component'lar:

- `CNCScrollStory` — ScrollTrigger cleanup
- `MaterialMorphScroll` — frame preload cleanup
- `HeroCanvas` — R3F dispose
- `MotionGradientBg` — rAF cancelAnimationFrame
- `SectionDotNav` — scroll listener / IO cleanup
- `LavaTypographyScene` (yeni) — ScrollTrigger cleanup
- `MoldCastScene` (yeni) — ScrollTrigger cleanup

---

## BÖLÜM B: Bug Fix — forwardRef ve Console Hataları

### B1. forwardRef Eksik Hataları

**Not:** React 19'da `forwardRef` deprecated olacak. Ancak projede React 18 kullanıldığından şu an için `forwardRef` ile sarmak doğru çözüm. İleride React 19'a geçildiğinde `ref` prop olarak direkt alınacak.

Her component için önce ref'in gerçekten gerekli olup olmadığını kontrol et. Eğer parent'tan ref gelmiyorsa, uyarının kaynağı `motion()` wrapper olabilir — bu durumda wrapper div'e ref ver.


| Bileşen                 | Sorun                                          | Çözüm                                                                                |
| ----------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------ |
| `MotionGradientBg.tsx`  | Function component'a ref verilmeye çalışılıyor | `forwardRef` ile sar. Eğer ref hiç kullanılmıyorsa, parent'taki ref prop'unu kaldır. |
| `QuickQuoteSection.tsx` | Aynı sorun                                     | `forwardRef` ile sar.                                                                |
| `ElegantShape.tsx`      | 5x tekrar eden uyarı                           | `forwardRef` ile sar. `motion.div` kullanılıyorsa wrapper'a ref ver.                 |
| `FlowScene` (Index.tsx) | Inline component'a ref                         | Eğer sadece `motion()` wrapper'dan geliyorsa, `forwardRef` ile sar.                  |


### B2. Console Temizliği (Genişletilmiş)

Orijinal plan sadece `console.log`'u kontrol etmiş. Genişletilmiş kontrol:

```bash
# Tüm console çıktılarını tara
grep -rn "console\.\(log\|warn\|error\|info\|debug\)" src/ --include="*.tsx" --include="*.ts"

```

Ayrıca kontrol edilecekler:

- React strict mode uyarıları (çift render kaynaklı yan etkiler)
- GSAP deprecated API uyarıları
- Framer Motion version uyarıları
- Three.js / R3F uyarıları (texture disposal, WebGL context lost)

### B3. Runtime Warning Taraması

Tarayıcı konsolunda şu kategorilerde uyarı aranacak:

- `Warning: React does not recognize the X prop` — DOM'a geçen custom prop'lar
- `Warning: Each child in a list should have a unique "key" prop`
- `Warning: Can't perform a React state update on an unmounted component` — memory leak belirtisi
- GSAP: `Invalid property` veya `target not found`
- Three.js: `THREE.WebGLRenderer: Context Lost`

---

## BÖLÜM C: Performans Optimizasyonu

### Mevcut Durum


| Metrik          | Mevcut              | Hedef   |
| --------------- | ------------------- | ------- |
| FCP             | 3088ms              | <1500ms |
| LCP             | Ölçülmemiş          | <2500ms |
| CLS             | Ölçülmemiş          | <0.1    |
| INP             | Ölçülmemiş          | <200ms  |
| Full Load       | 5398ms              | <3000ms |
| JS Bundle       | 2943KB (151 script) | <1500KB |
| Video           | 6481KB (10 video)   | <3000KB |
| JS Heap         | 41.6MB              | <25MB   |
| DOM Elements    | 1089                | <800    |
| Event Listeners | 595                 | <300    |


**Kritik:** Orijinal plan sadece FCP ölçmüş. LCP, CLS, INP (Core Web Vitals) da ölçülmeli. Lighthouse CI veya [web.dev](http://web.dev)'den tam rapor alınmalı.

### Performans Aksiyonları

#### P1 — HeroCanvas Lazy Load [YÜKSEK ETKİ]

`HeroCanvas` (R3F) IntersectionObserver ile sadece viewport'tayken render edilecek.

```tsx
const [isVisible, setIsVisible] = useState(false);
const ref = useRef<HTMLDivElement>(null);

useEffect(() => {
  const io = new IntersectionObserver(
    ([entry]) => setIsVisible(entry.isIntersecting),
    { rootMargin: '200px' } // 200px önden yüklemeye başla
  );
  if (ref.current) io.observe(ref.current);
  return () => io.disconnect();
}, []);

return (
  <div ref={ref}>
    {isVisible ? <HeroCanvas /> : <div className="w-full h-full bg-forge-obsidian" />}
  </div>
);

```

#### P2 — @react-three/drei Kaldırma [YÜKSEK ETKİ]

**Sorun:** `@react-three/drei` tek başına 777KB. Projede sadece `useTexture` kullanılıyor.

**Çözüm (orijinaldan farklı):** drei'yi tree-shake etmek yerine tamamen kaldır ve `useTexture`'ı kendi utility fonksiyonun olarak yaz:

```tsx
// src/utils/useTexture.ts
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

export function useTexture(url: string) {
  return useLoader(TextureLoader, url);
}

```

Ardından:

```bash
npm uninstall @react-three/drei

```

Bu 777KB → ~0KB tasarruf sağlar. Tree-shake'e güvenmekten çok daha kesin bir çözüm.

#### P3 — Vite Bundle Splitting [YÜKSEK ETKİ]

**Sorun:** Orijinal planda hiç yok. 151 script, 2943KB — tek monolitik bundle demek.

**Çözüm:** `vite.config.ts`'e manual chunks ekle:

```ts
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', '@react-three/fiber'],
          'gsap-vendor': ['gsap'],
          'framer': ['framer-motion'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-tooltip'], // shadcn bağımlılıkları
        }
      }
    }
  }
});

```

Bu, vendor code'unu ayrı chunk'lara böler → ilk yüklemede sadece gerekli chunk'lar yüklenir.

#### P4 — Video Optimizasyonu [YÜKSEK ETKİ]

**Sorun:** 10 video, 6481KB. Orijinal plan sadece "2 videoyu 1'e düşür" demiş — yetersiz.

**Kapsamlı çözüm:**

1. Tüm videoları WebM (VP9) formatına dönüştür — MP4'e göre %30-50 daha küçük:

```bash
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 35 -b:v 0 -an output.webm

```

2. Her `<video>` tag'ine şu attribute'ları ekle:

```html
<video 
  preload="none"           <!-- Sayfa yüklenirken video indirme -->
  loading="lazy"
  muted 
  playsInline
  poster="/img/video-poster.webp"  <!-- Video yüklenene kadar statik görsel -->
>
  <source src="video.webm" type="video/webm" />
  <source src="video.mp4" type="video/mp4" />  <!-- Fallback -->
</video>

```

3. IntersectionObserver ile sadece viewport'taki videoları oynat:

```tsx
useEffect(() => {
  const io = new IntersectionObserver(([entry]) => {
    const video = entry.target as HTMLVideoElement;
    entry.isIntersecting ? video.play() : video.pause();
  }, { threshold: 0.25 });
  
  videoRefs.forEach(ref => ref.current && io.observe(ref.current));
  return () => io.disconnect();
}, []);

```

4. Hero'daki 2 videoyu tek videoya birleştir (masked + background aynı kaynak).

#### P5 — Critical Rendering Path [YÜKSEK ETKİ]

**Sorun:** FCP 3088ms. Preloader'ın kendisi FCP'yi geciktiriyor çünkü tüm JS parse edilene kadar hiçbir şey görünmüyor.

**Çözümler:**

1. **Font preload:** Google Fonts link'i render-blocking. Şu şekilde değiştir:

```html
<link rel="preload" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="..."></noscript>

```

2. **font-display: swap** — font yüklenene kadar fallback font göster, layout shift'i önle.
3. **Above-the-fold CSS inline:** Preloader'ın CSS'ini `<head>` içinde inline `<style>` olarak ekle — harici CSS dosyası beklemesin.
4. **Preloader DOM'unu minimal tut:** Preloader'da sadece sayaç ve overlay olsun, ağır component'lar preloader bittikten sonra yüklensin.

#### P6 — MotionGradientBg Optimizasyonu [ORTA ETKİ]

WebGL canvas'ı `requestAnimationFrame` ile sadece görünürken çalıştır:

```tsx
useEffect(() => {
  const io = new IntersectionObserver(([entry]) => {
    isVisibleRef.current = entry.isIntersecting;
  });
  io.observe(canvasRef.current);
  
  const animate = () => {
    if (isVisibleRef.current) {
      // WebGL render
    }
    rafId = requestAnimationFrame(animate);
  };
  rafId = requestAnimationFrame(animate);
  
  return () => {
    cancelAnimationFrame(rafId);
    io.disconnect();
  };
}, []);

```

#### P7 — CNCScrollStory + MaterialMorphScroll Frame Yükleme [ORTA ETKİ]

120+80 = 200 frame preload çok ağır. Strateji:

1. İlk 5 frame'i eager yükle (above-the-fold).
2. Geri kalanını viewport'a yaklaştıkça `IntersectionObserver` + `rootMargin: '500px'` ile yükle.
3. Geçilen frame'leri `URL.revokeObjectURL()` ile bellekten serbest bırak.

#### P8 — SectionDotNav Throttle [DÜŞÜK ETKİ]

Her scroll event'te 17 section'ın `getBoundingClientRect()`'ini hesaplıyor. IntersectionObserver'a geçir:

```tsx
useEffect(() => {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    { threshold: 0.5 }
  );
  
  sections.forEach(section => io.observe(section));
  return () => io.disconnect();
}, []);

```

#### P9 — Grain Overlay GPU Layer [DÜŞÜK ETKİ]

```css
body::after {
  /* mevcut grain kodu */
  will-change: auto; /* GPU layer forcing önle */
  contain: strict;   /* Paint containment */
}

```

#### P10 — AnimatePresence Optimizasyonu [DÜŞÜK ETKİ]

```tsx
<AnimatePresence mode="wait" initial={false}>
  {/* route children */}
</AnimatePresence>

```

`initial={false}` ile ilk yüklemede gereksiz animation skip edilir.

#### P11 — Image Optimizasyonu [ORTA ETKİ] (Orijinal Planda Yok)

**Sorun:** Orijinal plan videoları ele almış ama static image'ları tamamen göz ardı etmiş.

**Çözümler:**

1. Tüm PNG/JPG'leri WebP/AVIF formatına dönüştür.
2. `<img>` tag'lerine `loading="lazy"` ve `decoding="async"` ekle.
3. Responsive images: `srcset` ve `sizes` attribute'ları kullan.
4. Placeholder: LQIP (Low Quality Image Placeholder) veya dominant-color placeholder.

---

## BÖLÜM D: Eksik 6 Maddenin Uygulanması

Orijinal plan hangi maddelerin eksik olduğunu tespit etmiş ama uygulama detaylarını vermemiş. Her madde için tam uygulama planı aşağıda.

### D1. Staggered Grid Entrance (Madde 4)

**Durum:** `useStaggeredReveal` hook'u ve `data-stagger` attribute'ları ServicesSection / IndustriesSection'a eklenmemiş.

**Uygulama:**

```tsx
// src/hooks/useStaggeredReveal.ts
export function useStaggeredReveal(containerRef: RefObject<HTMLElement>, stagger = 0.1) {
  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll('[data-stagger]');
    
    const ctx = gsap.context(() => {
      gsap.from(items, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);
}

```

Uygulanacak section'lar: `ServicesSection`, `IndustriesSection`, `MaterialsSection`.

Her section'daki kart/grid item'a `data-stagger` attribute'ı ekle:

```tsx
<div data-stagger className="...">

```

### D2. Kart 3D Tilt + Spotlight — Yaygınlaştırma (Madde 5)

**Durum:** Sadece ProjectShowcase'e uygulanmış.

**Uygulanacak component'lar:** ServicesSection kartları, IndustriesSection kartları, MaterialsSection kartları.

Mevcut `use3DTilt` hook'unu veya Tilt component'ını bu kartlara da uygula. Her karta:

```tsx
<TiltCard className="...">
  {/* kart içeriği */}
</TiltCard>

```

**Performans notu:** Mobilde tilt efekti DeviceOrientation API'ye bağlı — pil tüketir. Mobilde devre dışı bırak:

```tsx
const isMobile = window.innerWidth < 768;
// veya matchMedia('(hover: none)').matches

```

### D3. Underline Morph + Ok Kayma (Madde 6)

**Durum:** CSS'ler ve class atamaları yapılmamış.

**CSS (src/index.css'e eklenecek):**

```css
/* Nav link animated underline */
.nav-link-animated {
  position: relative;
  overflow: hidden;
}

.nav-link-animated::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: hsl(var(--primary));
  transform: translateX(-101%);
  transition: transform 0.4s cubic-bezier(0.77, 0, 0.18, 1);
}

.nav-link-animated:hover::after {
  transform: translateX(0);
}

/* CTA arrow slide */
.cta-arrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.cta-arrow svg {
  transition: transform 0.3s cubic-bezier(0.77, 0, 0.18, 1);
}

.cta-arrow:hover svg {
  transform: translateX(6px);
}

```

**Class atamaları:**

- `Header.tsx` — tüm nav link'lerine `nav-link-animated` class'ı ekle.
- Tüm CTA butonlarına `cta-arrow` class'ı ve yanına bir `→` SVG/icon ekle.

### D4. Footer Reveal from Behind (Madde 8)

**Durum:** Footer hala normal flow'da.

**Sorun + Lenis uyumu:** Footer `position: fixed; bottom: 0` yapılacak ve üstündeki content footer yüksekliği kadar `margin-bottom` alacak. Lenis ile fixed element etkileşimi sorunlu olabilir.

**Uygulama:**

```tsx
// Footer.tsx
const footerRef = useRef<HTMLElement>(null);
const [footerHeight, setFooterHeight] = useState(0);

useEffect(() => {
  if (footerRef.current) {
    setFooterHeight(footerRef.current.offsetHeight);
    // Resize'da güncelle
    const ro = new ResizeObserver(([entry]) => {
      setFooterHeight(entry.contentRect.height);
    });
    ro.observe(footerRef.current);
    return () => ro.disconnect();
  }
}, []);

return (
  <>
    {/* Spacer — footer'ın kapladığı alanı scroll'da tut */}
    <div style={{ height: footerHeight }} />
    <footer 
      ref={footerRef}
      className="fixed bottom-0 left-0 w-full"
      style={{ zIndex: Z.base }}
    >
      {/* footer içeriği */}
    </footer>
  </>
);

```

**Index.tsx'te:** Son section'ın arkasından footer "ortaya çıkar" (reveal from behind) — son section'a `position: relative; z-index: 1` ver.

**Test:** Lenis scroll'u ile footer'ın düzgün reveal olduğunu, üst kısımla örtüşmediğini kontrol et.

### D5. Mobil Scroll Snapping (Madde 11)

**Kritik mimari karar:** Lenis ve CSS `scroll-snap-type` birlikte çalışmaz. Lenis kendi scroll mekanizmasını kullanır ve native scroll-snap'i override eder.

**İki seçenek:**

**Seçenek A (Önerilen):** Mobilde Lenis'i devre dışı bırak, native scroll kullan:

```tsx
// SmoothScrollProvider.tsx
const isMobile = window.matchMedia('(max-width: 768px)').matches;

if (!isMobile) {
  // Lenis sadece desktop'ta
  const lenis = new Lenis({ ... });
  // GSAP senkronizasyonu...
} else {
  // Mobilde native scroll + CSS scroll-snap
  document.documentElement.style.scrollSnapType = 'y mandatory';
}

```

**Seçenek B:** Lenis'in kendi snap mekanizmasını kullan (daha karmaşık, daha fazla kontrol):

```tsx
// Lenis v1.1+ snap desteği
const lenis = new Lenis({
  // ...
});
// Lenis şu an native snap desteği yok — custom snap logic yazılmalı
// Bu yüzden Seçenek A önerilir.

```

**CSS (mobil için):**

```css
@media (max-width: 768px) {
  .snap-section {
    scroll-snap-align: start;
    min-height: 100vh;
    min-height: 100dvh; /* iOS safe area */
  }
}

```

### D6. Page Transition Upgrade (Madde 13)

**Durum:** Polygon clipPath ve route-aware text flash eklenmemiş.

**Mimari karar:** Framer Motion `AnimatePresence` mi, yoksa custom GSAP transition manager mı?

**Önerilen:** Framer Motion `AnimatePresence` + GSAP timeline hybrid:

```tsx
// src/components/PageTransition.tsx
import { motion } from 'framer-motion';

const variants = {
  initial: {
    clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', // üstten kapanık
    opacity: 1,
  },
  animate: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', // tam açık
    transition: { duration: 0.6, ease: [0.77, 0, 0.18, 1] },
  },
  exit: {
    clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', // alttan kapanır
    transition: { duration: 0.5, ease: [0.77, 0, 0.18, 1] },
  },
};

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div variants={variants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}

```

**Route-aware text flash:** Geçiş sırasında hedef sayfa adını gösteren overlay:

```tsx
// Geçiş overlay'inde
<motion.div className="fixed inset-0 z-[95] bg-forge-obsidian flex items-center justify-center">
  <span className="text-[10vw] font-mono font-bold text-forge-steel/20">
    {targetPageName}
  </span>
</motion.div>

```

### D7. Char-by-Char Reveal — SectionHeader'a Uygulama (Madde 14)

**Durum:** Sadece HeadlineStagger'da var, SectionHeader'a uygulanmamış.

```tsx
// SectionHeader.tsx içinde
// Her karakter bir <span> içinde, stagger ile animasyon
const chars = title.split('');

return (
  <h2>
    {chars.map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.03, duration: 0.4 }}
        viewport={{ once: true }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </h2>
);

```

**Performans notu:** 50+ karakterlik başlıklarda her karakter ayrı DOM elementi → çok fazla DOM node. 20 karakterin üzerindeki başlıklarda kelime bazlı stagger'a geç:

```tsx
const words = title.split(' ');
// Her kelime bir span, karakter değil

```

---

## BÖLÜM E: Yeni Lav Sahneleri

**Ön koşul:** Bölüm A (Lenis+GSAP senkronizasyonu) tamamlanmış olmalı. Aksi halde ScrollTrigger tetiklenmez.

### Index.tsx Sahne Sırası

```
HeroSection (z=content)
  ↓
LavaTypographyScene (z=lavaTypography)    ← YENİ
  ↓
MoldCastScene (z=moldCast)                ← YENİ
  ↓
CNCScrollStory (z=cncStory)
  ↓
...diğer section'lar

```

### E1. Sahne 1 — Lav Akışı Tipografi (`LavaTypographyScene.tsx`)

**Konsept:** Full-screen sticky sahne. Ortada dev tipografi ("ERGİTME" veya "DÖKÜM"). Tipografinin içinden scroll-driven lav akışı.

**Teknik detaylar:**

```
Scroller yüksekliği: 300vh
Sticky container: 100vh, position: sticky, top: 0

Scroll ilerleme haritası:
  %0–%40:   Tipografi opacity 0→1, scale 0.8→1
  %40–%80:  Lav dolgu yukarıdan aşağı (mask-image gradient animasyonu)
  %80–%100: Tüm sahne lav rengine bulanır (background-color transition)

```

**Tipografi boyutu (responsive):**

```css
font-size: clamp(3rem, 15vw, 20rem);
/* 375px → 56px, 768px → 115px, 1920px → 288px */

```

`15vw` yerine `clamp()` kullanılmalı — mobilde minimum 3rem garanti.

**Lav efekti teknik seçim:**

⚠️ **clip-path animasyonu KULLANMA** — her frame'de layout/paint tetikler, mobilde jank.

✅ **mask-image + gradient kullan** — GPU-accelerated, performanslı:

```tsx
const LavaTypographyScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  
  useEffect(() => {
    if (reduced || !containerRef.current) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: false, // sticky CSS ile pin'liyoruz, GSAP pin değil
        }
      });
      
      // %0-40: Tipografi belir
      tl.fromTo(textRef.current, 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 40 }
      );
      
      // %40-80: Lav dolgu — CSS custom property ile kontrol
      tl.fromTo(textRef.current, 
        { '--lava-fill': '0%' },
        { '--lava-fill': '100%', duration: 40 }
      );
      
      // %80-100: Sahne lav rengine bürünür
      tl.to(containerRef.current,
        { backgroundColor: '#e25822', duration: 20 }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, [reduced]);
  
  return (
    <div ref={containerRef} className="relative h-[300vh]" style={{ zIndex: Z.lavaTypography }}>
      <div className="sticky top-0 h-screen flex items-center justify-center bg-forge-obsidian overflow-hidden">
        <div 
          ref={textRef}
          className="font-mono font-bold select-none"
          style={{
            fontSize: 'clamp(3rem, 15vw, 20rem)',
            background: `linear-gradient(to bottom, #ff6a00, #e25822, #b8451a)`,
            backgroundSize: '100% 200%',
            backgroundPosition: `0 calc(100% - var(--lava-fill, 0%))`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          ERGİTME
        </div>
      </div>
    </div>
  );
};

```

**Lav renk paleti:**

- Başlangıç: `#ff6a00` (parlak turuncu)
- Orta: `#e25822` (koyu turuncu)
- Son: `#b8451a` (koyu kızıl)

### E2. Sahne 2 — Kalıp Döküm + Soğutma + Zoom (`MoldCastScene.tsx`)

**Konsept:** Lav önceki sahneden devam eden renkle ekranın üstünden aşağı akar, dikdörtgen kalıp içine girer, soğur, soğumuş metale zoom yapılır.

**Teknik detaylar:**

```
Scroller yüksekliği: 400vh
Sticky container: 100vh

Scroll ilerleme haritası:
  %0–%30:   Lav yukarıdan aşağı akar, kalıp silüetinin içine girer
  %30–%60:  Soğutma — renk geçişi (#ff6a00 → #888 → #c0c0c0)
            Buhar efekti (3-5 adet, CSS-only opacity animation)
  %60–%100: Zoom (scale 1→3), kalıp kenarları clip-path ile daralır
            Son renk: forge-steel

```

**Sahne geçiş renk sürekliliği mekanizması:** Sahneler arası renk sürekliliği için shared CSS custom property kullan:

```css
:root {
  --lava-current-color: #ff6a00;
}

```

LavaTypographyScene çıkışta bu property'yi günceller, MoldCastScene girişte bu property'den okur.

**Buhar efekti tanımı (belirsizlik giderildi):**

- **Parçacık sayısı:** 3-5 adet (fazla değil — performans)
- **Yöntem:** Pure CSS animation (Canvas veya WebGL değil)
- **Davranış:** `opacity: 0→0.6→0`, `translateY: 0→-40px`, `scale: 1→1.5`
- **Süre:** Her parçacık 2-3 saniye döngü, stagger ile

```css
.steam-particle {
  position: absolute;
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
  animation: steam 2.5s ease-out infinite;
}

@keyframes steam {
  0% { opacity: 0; transform: translateY(0) scale(1); }
  50% { opacity: 0.6; }
  100% { opacity: 0; transform: translateY(-40px) scale(1.5); }
}

```

**Zoom animasyonu:**

```tsx
// GSAP timeline devamı
// %60-100: Zoom
tl.to(moldRef.current, {
  scale: 3,
  duration: 40,
  ease: 'power2.inOut',
});
tl.to(moldRef.current, {
  clipPath: 'inset(30% 30% 30% 30%)', // Kenarları daralt, sadece metal yüzey
  duration: 40,
}, '<'); // Zoom ile eşzamanlı

```

⚠️ **clip-path burada kullanılabilir** çünkü sadece zoom aşamasında (sahnenin son %40'ı) aktif ve `inset()` fonksiyonu `polygon()`'dan çok daha performanslı.

---

## BÖLÜM F: Ambient Mouse Glow

### F1. Uygulama

Her koyu section'ın içine şu div eklenecek:

```tsx
<div 
  className="absolute inset-0 pointer-events-none" 
  style={{ 
    zIndex: Z.ambientGlow,
    background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(--primary) / 0.045), transparent 70%)' 
  }} 
/>

```

### F2. Eklenecek Section'lar

- HeroSection
- NexusPromoSection
- CNCScrollStory
- MaterialsSection
- WhyUsSection
- FinalCTASection
- LavaTypographyScene (yeni)
- MoldCastScene (yeni)

### F3. Performans Koruması

**Sorun:** 8 section'a glow div eklemek = her mouse move'da 8 element güncellenir.

**Çözüm:** Sadece viewport'taki section'ların glow'unu aktif et:

```tsx
// useAmbientGlow.ts — güncelleme
// CSS custom property --mouse-x, --mouse-y zaten set ediliyor.
// Ek olarak: viewport dışındaki section'ların glow div'ini visibility: hidden yap.

// Her glow div'de:
const [isInView, setIsInView] = useState(false);
const ref = useRef<HTMLDivElement>(null);

useEffect(() => {
  const io = new IntersectionObserver(([e]) => setIsInView(e.isIntersecting));
  if (ref.current) io.observe(ref.current);
  return () => io.disconnect();
}, []);

// Render:
<div 
  ref={ref}
  className="absolute inset-0 pointer-events-none"
  style={{ 
    visibility: isInView ? 'visible' : 'hidden',
    // ... gradient
  }} 
/>

```

### F4. Mobil Davranış

**Sorun:** Mouse glow touch cihazlarda anlamsız.

**Çözüm:** Mobilde glow'u devre dışı bırak:

```tsx
const isTouchDevice = window.matchMedia('(hover: none)').matches;
// isTouchDevice === true → glow div'i render etme

```

---

## BÖLÜM G: 14 Madde Audit Tablosu


| #   | Madde                      | Durum          | Aksiyon                                           | Bölüm |
| --- | -------------------------- | -------------- | ------------------------------------------------- | ----- |
| 1   | Grain Overlay              | ✅ Tam          | Sadece `will-change: auto` ekle                   | C-P9  |
| 2   | Marquee Ticker Band        | ✅ Tam          | —                                                 | —     |
| 3   | Scroll Velocity İndikatörü | ✅ Tam          | —                                                 | —     |
| 4   | Staggered Grid Entrance    | ❌ Uygulanmamış | `useStaggeredReveal` + `data-stagger`             | D1    |
| 5   | Kart 3D Tilt + Spotlight   | ⚠️ Kısmi       | Services, Industries, Materials kartlarına uygula | D2    |
| 6   | Underline Morph + Ok Kayma | ❌ Uygulanmamış | CSS + class atamaları                             | D3    |
| 7   | Image Overlay Reveal       | ⚠️ Kısmi       | Tüm görsellere `OverlayReveal` uygula             | D Ek  |
| 8   | Footer Reveal from Behind  | ❌ Uygulanmamış | fixed + spacer pattern                            | D4    |
| 9   | Saat + Koordinat           | ✅ Tam          | —                                                 | —     |
| 10  | Mobil Fullscreen Menu      | ✅ Tam          | —                                                 | —     |
| 11  | Mobil Scroll Snapping      | ❌ Uygulanmamış | Lenis conditional + CSS snap                      | D5    |
| 12  | Preloader Sinematik        | ✅ Tam          | —                                                 | —     |
| 13  | Page Transition Upgrade    | ❌ Uygulanmamış | clipPath + route-aware flash                      | D6    |
| 14  | Char-by-Char + Konami      | ⚠️ Kısmi       | SectionHeader'a char reveal                       | D7    |


**Özet:** 6 tam, 3 kısmi (7 dahil), 5 uygulanmamış.

---

## BÖLÜM H: Test Stratejisi ve Checklist

### H1. Tarayıcı Matrisi


| Tarayıcı         | Versiyon | Öncelik |
| ---------------- | -------- | ------- |
| Chrome Desktop   | Son 2    | Kritik  |
| Safari Desktop   | Son 2    | Kritik  |
| Firefox Desktop  | Son 2    | Yüksek  |
| Chrome Android   | Son 2    | Kritik  |
| Safari iOS       | Son 2    | Kritik  |
| Samsung Internet | Son 2    | Orta    |


### H2. Viewport Breakpoint'leri


| Breakpoint | Genişlik | Temsil Ettiği     |
| ---------- | -------- | ----------------- |
| Mobile S   | 375px    | iPhone SE         |
| Mobile L   | 428px    | iPhone 14 Pro Max |
| Tablet     | 768px    | iPad Mini         |
| Laptop     | 1024px   | 13" laptop        |
| Desktop    | 1440px   | Standart monitör  |
| Wide       | 1920px   | Full HD           |


### H3. Fonksiyonel Test Checklist'i

**Sayfa Yükleme:**

- [ ] Preloader 000→100 sayaç çalışıyor
- [ ] clipPath circle reveal çalışıyor
- [ ] sessionStorage temizleyip yeniledikten sonra preloader tekrar çalışıyor
- [ ] FCP < 1500ms
- [ ] LCP < 2500ms

**Scroll Efektleri:**

- [ ] Grain overlay tüm sayfa boyunca görünüyor
- [ ] Marquee ticker band düzgün kayıyor
- [ ] Scroll velocity renk değişimi çalışıyor
- [ ] LavaTypographyScene scroll ile doğru tetikleniyor
- [ ] MoldCastScene scroll ile doğru tetikleniyor
- [ ] CNCScrollStory frame'leri düzgün yükleniyor
- [ ] MaterialMorphScroll düzgün çalışıyor
- [ ] Footer reveal from behind çalışıyor
- [ ] Sahneler arası renk sürekliliği var

**Kartlar ve İnteraksiyon:**

- [ ] 3D tilt efekti tüm kartlarda çalışıyor (Services, Industries, Materials, Projects)
- [ ] Spotlight efekti takip ediyor
- [ ] Underline morph nav link'lerde çalışıyor
- [ ] Ok kayma CTA'larda çalışıyor
- [ ] Ambient mouse glow koyu section'larda görünüyor

**Mobil:**

- [ ] Fullscreen menü açılıyor
- [ ] Stagger reveal animasyonu çalışıyor
- [ ] LiveClock menüde görünüyor
- [ ] Scroll snapping çalışıyor (Lenis devre dışı, native scroll)
- [ ] 3D tilt mobilde devre dışı
- [ ] Ambient glow mobilde devre dışı
- [ ] Videolar mobilde autoplay kapalı, poster görünüyor

**Performans:**

- [ ] JS Heap < 25MB (5 dakika scroll sonrası)
- [ ] 60fps scroll (Chrome DevTools Performance monitor)
- [ ] Memory leak yok (10 dakika kullanım sonrası heap artmıyor)
- [ ] CLS < 0.1

**Accessibility:**

- [ ] `prefers-reduced-motion: reduce` ile tüm animasyonlar kapalı/minimal
- [ ] WebGL fallback düşük GPU'lu cihazlarda çalışıyor
- [ ] Klavye navigasyonu çalışıyor

**Edge Cases:**

- [ ] Hızlı scroll (scroll velocity çok yüksekken animasyonlar bozulmuyor)
- [ ] Yavaş scroll (sahneler düzgün ilerliyor)
- [ ] Scroll yönü değiştirme (ileri-geri)
- [ ] Tab değiştirip geri gelme (rAF, video, WebGL devam ediyor)
- [ ] Browser resize sırasında layout bozulmuyor

### H4. Lovable'ın Yapamayacağı Testler

Bu testler manuel olarak Ömer tarafından yapılmalı:

- Lighthouse / PageSpeed Insights tam rapor
- Chrome DevTools Performance profiling
- Memory leak tespiti (Chrome DevTools Memory tab → Heap snapshot karşılaştırma)
- Cross-browser testing (BrowserStack veya gerçek cihaz)
- Gerçek mobil cihazda pil tüketimi gözlemi
- Network throttle (3G) altında yükleme davranışı

---

## BÖLÜM I: z-index Haritası

(Bölüm A2'de detaylı anlatıldı. Referans için tekrar.)

```
0    — Base (body, section backgrounds)
1    — Section content
2    — Ambient glow overlays
5    — Grain overlay
8    — Scroll velocity indicator
10   — LavaTypographyScene
11   — MoldCastScene
12   — CNCScrollStory
15   — Marquee band
20   — SectionDotNav
50   — Header / Nav
60   — Mobile menu overlay
90   — Custom cursor
95   — Page transition overlay
100  — Preloader

```

---

## BÖLÜM J: Dosya Değişiklikleri Özet Tablosu


| Dosya                                               | İşlem                                            | Bölüm       |
| --------------------------------------------------- | ------------------------------------------------ | ----------- |
| `src/styles/z-index.ts`                             | YENİ — z-index constant'ları                     | A2          |
| `src/components/ErrorBoundary.tsx`                  | YENİ — Error boundary                            | A3          |
| `src/hooks/useGPUCapability.ts`                     | YENİ — WebGL/GPU kontrol                         | A4          |
| `src/hooks/useReducedMotion.ts`                     | YENİ — a11y motion kontrolü                      | A5          |
| `src/hooks/useStaggeredReveal.ts`                   | YENİ — Stagger grid hook                         | D1          |
| `src/components/LavaTypographyScene.tsx`            | YENİ — Lav tipografi sahnesi                     | E1          |
| `src/components/MoldCastScene.tsx`                  | YENİ — Kalıp döküm sahnesi                       | E2          |
| `src/components/PageTransition.tsx`                 | YENİ — Page transition                           | D6          |
| `src/components/MotionGradientBg.tsx`               | DÜZENLE — forwardRef ekle                        | B1          |
| `src/components/QuickQuoteSection.tsx`              | DÜZENLE — forwardRef ekle                        | B1          |
| `src/components/ui/ElegantShape.tsx`                | DÜZENLE — forwardRef ekle                        | B1          |
| `src/pages/Index.tsx`                               | DÜZENLE — Yeni sahne sırası, ErrorBoundary sarma | E           |
| `src/components/providers/SmoothScrollProvider.tsx` | DÜZENLE — Lenis+GSAP sync, mobil conditional     | A1, D5      |
| `src/components/r3f/HeroCanvas.tsx`                 | DÜZENLE — IO lazy render, dispose cleanup        | C-P1        |
| `src/components/NexusPromoSection.tsx`              | DÜZENLE — Ambient glow div                       | F           |
| `src/components/CNCScrollStory.tsx`                 | DÜZENLE — Glow div, cleanup, IO lazy frame       | F, A6, C-P7 |
| `src/components/MaterialsSection.tsx`               | DÜZENLE — Glow div, stagger                      | F, D1       |
| `src/components/WhyUsSection.tsx`                   | DÜZENLE — Glow div                               | F           |
| `src/components/FinalCTASection.tsx`                | DÜZENLE — Glow div                               | F           |
| `src/components/Header.tsx`                         | DÜZENLE — nav-link-animated class                | D3          |
| `src/components/Footer.tsx`                         | DÜZENLE — fixed + reveal pattern                 | D4          |
| `src/components/SectionHeader.tsx`                  | DÜZENLE — char-by-char reveal                    | D7          |
| `src/components/ServicesSection.tsx`                | DÜZENLE — stagger + tilt                         | D1, D2      |
| `src/components/IndustriesSection.tsx`              | DÜZENLE — stagger + tilt                         | D1, D2      |
| `src/index.css`                                     | DÜZENLE — underline, ok kayma, scroll snap CSS   | D3, D5      |
| `vite.config.ts`                                    | DÜZENLE — manualChunks bundle splitting          | C-P3        |
| `index.html`                                        | DÜZENLE — font preload, inline critical CSS      | C-P5        |


**Toplam:** 8 yeni dosya, 18 düzenleme.

---

## BÖLÜM K: Editor Sync Hatası (Platform Taraflı)

**Sorun:** "We're experiencing issues where edits made through the editor are not immediately reflecting in the user interface"

**Durum:** Bu Lovable platform taraflı bir sorun. Kod tarafında yapılabilecek bir şey yok.

**Workaround'lar (orijinal planda yoktu):**

1. Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
2. Tarayıcı cache temizle
3. Lovable editor'de farklı bir dosyaya git, geri gel
4. Preview URL'den doğrudan test et (editor preview yerine)
5. Lovable'ın status page'ini kontrol et: [status.lovable.dev](http://status.lovable.dev)

---

## ORİJİNAL PLANDAN FARKLAR ÖZETİ


| Konu                    | Orijinal Plan                    | Bu Plan                                          |
| ----------------------- | -------------------------------- | ------------------------------------------------ |
| Öncelik sırası          | Bug→Perf→Lav→Eksikler            | Bug→Eksikler→Perf→Lav                            |
| Lenis+GSAP sync         | Bahsedilmemiş                    | A1'de detaylı çözüm                              |
| z-index                 | Ondalıklı (2.5), haritasız       | Tamsayı, global harita + TS constant             |
| Error boundary          | Yok                              | A3'te eklendi                                    |
| GPU fallback            | Yok                              | A4'te eklendi                                    |
| prefers-reduced-motion  | Yok                              | A5'te eklendi                                    |
| Memory leak kontrolü    | Yok                              | A6'da checklist                                  |
| Bundle splitting        | Yok                              | C-P3'te Vite config                              |
| drei kaldırma           | "Tree-shake et"                  | Tamamen kaldır + custom utility                  |
| Video optimizasyonu     | "2'yi 1'e düşür"                 | WebM dönüşüm + IO play/pause + poster            |
| FCP stratejisi          | Hedef var, strateji yok          | C-P5'te critical path çözümleri                  |
| CWV metrikleri          | Sadece FCP                       | FCP + LCP + CLS + INP                            |
| Image optimizasyonu     | Yok                              | C-P11'de eklendi                                 |
| Lav clip-path           | "CSS clip-path animasyonu"       | mask-image + background-clip (daha performanslı) |
| Tipografi boyut         | 15vw sabit                       | clamp(3rem, 15vw, 20rem) responsive              |
| Buhar efekti            | "Beyaz parçacıklar" (belirsiz)   | 3-5 CSS particle, kesin spec                     |
| Sahne renk sürekliliği  | "Devam eden renk" (mekanizmasız) | CSS custom property paylaşımı                    |
| Eksik 6 madde detayı    | Sadece tespit                    | Tam uygulama planı                               |
| Lenis + scroll-snap     | "Conditional init" (belirsiz)    | İki seçenek + mimari karar analizi               |
| Footer + Lenis          | Bahsedilmemiş                    | ResizeObserver + spacer pattern                  |
| Page transition         | "Polygon clipPath" (belirsiz)    | FM + GSAP hybrid, tam kod                        |
| Ambient glow mobil      | Bahsedilmemiş                    | Touch cihazlarda devre dışı                      |
| Ambient glow performans | Bahsedilmemiş                    | IO ile viewport kontrolü                         |
| Test stratejisi         | "Test et"                        | Tarayıcı matrisi, checklist, edge case'ler       |
| SEO                     | Yok                              | Reminder olarak eklendi (ayrı plan gerekir)      |
| Lovable uygulama notu   | Yok                              | Bölüm bölüm, tek dosya grubu olarak verilmeli    |
