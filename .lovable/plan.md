```markdown
# Scroll Kilitleme ve İçerik Hazırlık Planı

## Problem
PageLoader animasyonu oynarken (ilk 2.2s + 0.9s kapanış) kullanıcı serbestçe scroll yapabiliyor. Lazy-loaded section'lar henüz yüklenmeden scroll pozisyonu ilerliyor, bu da GSAP ScrollTrigger'ların yanlış konumda tetiklenmesine ve boş/yarım içerik görünmesine yol açıyor.

## Çözüm — 3 Adım

### 1. PageLoader sırasında scroll'u kilitle
**Dosya:** `src/components/PageLoader.tsx`
- `isVisible` true iken `document.body.style.overflow = 'hidden'` uygula
- Lenis instance'ına context veya ref üzerinden eriş (`window.__lenis` kullanma)
- Loader kapanırken (`isVisible` false olduğunda):
  - `document.body.style.overflow = ''` geri al
  - `setTimeout(100ms)` içinde sırasıyla:
    1. `lenis.scrollTo(0, { immediate: true })`
    2. `lenis.start()`
    3. `ScrollTrigger.refresh()`

### 2. SmoothScrollProvider'da loader-aware başlatma
**Dosya:** `src/components/providers/SmoothScrollProvider.tsx`
- Lenis oluşturulduktan hemen sonra `lenis.stop()` çağır (varsayılan olarak durdurulmuş başlasın)
- PageLoader'ın `start()` çağrısını beklesin
- `window.__lenis` yerine global type declaration kullan:
  ```typescript
  declare global {
    interface Window { __lenis?: Lenis }
  }

```

- İlk ziyaret değilse (`sessionStorage` kontrolü) Lenis'i hemen başlat

### 3. Lazy section'lar için ScrollTrigger.refresh() zamanlama

**Dosya:** `src/pages/Index.tsx`

- Tüm critical Suspense fallback'ları (`SectionLoader`) mount/unmount olduğunda `ScrollTrigger.refresh()` tetikle
- Ana `<main>` üzerinde `ResizeObserver` ile yükseklik değiştiğinde `ScrollTrigger.refresh()` çağır
  - ResizeObserver callback'i `debounce(200ms)` ile sar
  - İlk render'da çalışmasın — sadece yükseklik değişiminde tetiklensin

## Teknik Detaylar


| Dosya                      | Değişiklik Özeti                                                                                          |
| -------------------------- | --------------------------------------------------------------------------------------------------------- |
| `PageLoader.tsx`           | `useEffect` içinde `overflow: hidden` + Lenis stop/start + ScrollTrigger.refresh                          |
| `SmoothScrollProvider.tsx` | Lenis başlangıçta `stopped` durumda (ilk ziyarette) + global type declaration                             |
| `Index.tsx`                | `<main>` üzerinde ResizeObserver → `ScrollTrigger.refresh()` debounced (200ms), ilk render'da tetiklenmez |
| Timing Buffer              | `lenis.start()` ve `ScrollTrigger.refresh()` çağrıları `setTimeout 100ms` içine al                        |


## Beklenen Sonuç

- PageLoader oynarken sayfa scroll edilemez
- Loader kapandığında 100ms buffer sonrası scroll serbest kalır ve tüm GSAP trigger pozisyonları doğru hesaplanır
- Lazy section'lar yüklendiğinde pozisyonlar otomatik güncellenir
- Native `scrollTo` ile Lenis çakışması olmaz

```
 
```