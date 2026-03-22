**Yapılacaklar:**

**1.** `CapabilitiesSection.tsx`

- `className` içindeki `border-t border-border` kaldır — aradaki çizgi gider
- Mevcut `<video>` elementi olduğu gibi kalır

**2.** `TestimonialsSection.tsx`

- `backgroundColor: "hsl(var(--forge-workshop))"` korunur — değiştirme
- `<style>` bloğundan hemen sonra şu video ekle:

tsx

```tsx
<video
  src="/machine-loop.mp4"
  autoPlay
  loop
  muted
  playsInline
  preload="none"
  className="absolute inset-0 w-full h-full object-cover opacity-[0.06] dark:opacity-[0.1] pointer-events-none hidden md:block"
  style={{ zIndex: 0 }}
  aria-hidden="true"
/>
```

- `container-industrial` div'ine `relative z-10` ekle

**3.** `Index.tsx`

- Wrapper `div`'deki `<video>` elementini kaldır — her section kendi videosunu taşıyor
- Wrapper div'i sadeleştir, gereksiz z-index katmanını temizle

**Önemli teknik not:** SVG `fill` attribute'unda `hsl(var(--token))` çalışmaz, hardcoded hex kullan.