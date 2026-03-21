

## Sorunun Kök Nedeni

Konsolda **"Maximum call stack size exceeded"** hatası var. `SmoothScrollProvider.tsx` satır 40-42'de:

```text
lenis.on("scroll") → window.dispatchEvent("scroll") → Lenis tekrar tetikleniyor → sonsuz döngü → CRASH
```

Bu crash tüm sayfayı kırıyor — section'lar render olmuyor, scroll çalışmıyor, sayfa Hero + Footer olarak kalıyor. "Üç boş alan" aslında render edilemeyen section'lar.

### Çözüm

#### 1. SmoothScrollProvider.tsx — Sonsuz döngüyü kır

`window.dispatchEvent(new Event("scroll"))` satırını kaldır. Framer Motion `useScroll` zaten native scroll event'leri dinliyor, Lenis ile uyumlu çalışıyor. Sadece `ScrollTrigger.update()` yeterli.

```typescript
// Önce:
lenis.on("scroll", () => {
  ScrollTrigger.update();
  window.dispatchEvent(new Event("scroll"));  // ← sonsuz döngü
});

// Sonra:
lenis.on("scroll", ScrollTrigger.update);
```

### Etki
- 1 dosya, 1 satır değişiklik
- Sonsuz döngü kırılır → sayfa düzgün render olur → tüm section'lar görünür hale gelir
- "Boş alan" sorunu bu crash'in yan etkisi — crash düzelince section'lar da düzelecek

