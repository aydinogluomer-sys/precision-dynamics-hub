## Lenis Smooth Scroll — Automation Uyumluluğu

src/components/providers/SmoothScrollProvider.tsx dosyasını güncelle.

Dosyanın en üstüne şu import'ları ekle:

  import { gsap } from "gsap";

  import { ScrollTrigger } from "gsap/ScrollTrigger";

  gsap.registerPlugin(ScrollTrigger);

Sonra aşağıdaki implementasyonu uygula:

1) Fonksiyon başına ekle:

   if ([import.meta.env.DEV](http://import.meta.env.DEV) && import.meta.env.VITE_DISABLE_LENIS === "true") {

     return <>{children}</>;

   }

2) useEffect içinde Lenis'i şu parametrelerle başlat:

   const isAutomation = (navigator as any).webdriver === true;

   const lenis = new Lenis({

     lerp: isAutomation ? 1 : 0.08,

     duration: isAutomation ? 0 : 1.4,

     smoothWheel: !isAutomation,

     wheelMultiplier: 0.8,

     touchMultiplier: 1.5,

   });

3) Lenis başlatıldıktan sonra:

   (window as any).__lenis = lenis;

   lenis.on("scroll", () => {

     ScrollTrigger.update();

     window.dispatchEvent(new Event("scroll"));

   });

   gsap.ticker.add((time) => { lenis.raf(time * 1000); });

   gsap.ticker.lagSmoothing(0);

4) Cleanup'a ekle:

   lenis.destroy();

   delete (window as any).__lenis;

TypeScript için window tipini genişlet:

   declare global {

     interface Window { __lenis?: Lenis; }

   }

Admin ve müşteri panelinde hiçbir değişiklik yapma.

### Problem

Lenis smooth scroll, native `window.scrollTo` ve `window.scrollBy` çağrılarını override ediyor. Bu nedenle browser automation araçları (Playwright, Puppeteer, Lovable preview test) programatik scroll yapamıyor.

### Çözüm: Üç katmanlı hibrit yaklaşım

Kullanıcının önerdiği 3 çözümü tek dosyada birleştireceğiz — birbirini tamamlıyorlar:

### Değişiklik: `src/components/providers/SmoothScrollProvider.tsx`

1. **Çözüm 1 — Dev bypass flag**: `VITE_DISABLE_LENIS=true` ile Lenis tamamen atlanır
2. **Çözüm 2 — Global API**: `window.__lenis` expose edilir + scroll event dispatch
3. **Çözüm 3 — Webdriver detection**: `navigator.webdriver === true` ise `lerp: 1, duration: 0` ile instant scroll

```typescript
export const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  // Çözüm 1: Dev ortamında env flag ile tamamen devre dışı bırak
  if (import.meta.env.DEV && import.meta.env.VITE_DISABLE_LENIS === "true") {
    return <>{children}</>;
  }

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Çözüm 3: Automation ortamında instant scroll
    const isAutomation = (navigator as any).webdriver === true;

    const lenis = new Lenis({
      lerp: isAutomation ? 1 : 0.08,
      duration: isAutomation ? 0 : 1.4,
      smoothWheel: !isAutomation,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Çözüm 2: Global API expose
    (window as any).__lenis = lenis;

    // Sync Lenis → ScrollTrigger + native scroll event dispatch
    lenis.on("scroll", () => {
      ScrollTrigger.update();
      window.dispatchEvent(new Event("scroll"));
    });

    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      delete (window as any).__lenis;
    };
  }, []);

  return <>{children}</>;
};
```

### Ek: `.env` güncelleme (opsiyonel)

Kullanıcı isterse `.env` dosyasına `VITE_DISABLE_LENIS=true` eklenebilir — şu an eklenmeyecek çünkü production'da kullanılmıyor.

### Etki

- Production: Sıfır değişiklik (webdriver false, env flag yok)
- Lovable preview test: `window.__lenis.scrollTo()` ile programatik scroll
- CI/Playwright: Otomatik instant scroll modu