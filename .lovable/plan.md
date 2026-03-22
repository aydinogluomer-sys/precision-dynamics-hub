## Plan: Tek ghost video ile iki section'u birleştir

### Yapılacaklar

#### 1. `CapabilitiesSection.tsx`

- **Satır 73:** `overflow-hidden` kaldır, `border-t border-border` zaten yok
- **Satır 74:** `backgroundColor` → `"rgba(240, 237, 232, 0.92)"`
- **Satır 80:** Dark override → `.dark #kabiliyetler { background-color: rgba(15,15,15,0.92) !important; }`
- **Satır 81-92:** `<video>` ve altındaki yorum satırını sil

#### 2. `TestimonialsSection.tsx`

- **Satır 150:** `overflow-hidden` kaldır
- **Satır 151:** `backgroundColor` → `"rgba(240, 237, 232, 0.92)"`
- **Satır 154:** Dark override → `.dark #referanslar { background-color: rgba(15,15,15,0.92) !important; }`
- **Satır 166-176:** `<video>` elementini sil

#### 3. `Index.tsx` — Wrapper'a tek video ekle

Satır 212-219'u şu yapıyla değiştir:

```tsx
<div className="relative" style={{ zIndex: 15, backgroundColor: "hsl(var(--forge-workshop))" }}>
  <video
    src="/machine-loop.mp4"
    autoPlay
    loop
    muted
    playsInline
    preload="none"
    className="absolute inset-0 w-full h-full object-cover pointer-events-none hidden md:block"
    style={{ opacity: 0.06, zIndex: 0 }}
    aria-hidden="true"
  />
  <div style={{ position: "relative", zIndex: 1 }}>
    <Suspense fallback={<SectionLoader />}>
      <CapabilitiesSection />
    </Suspense>
    <Suspense fallback={<SectionLoader />}>
      <TestimonialsSection />
    </Suspense>
  </div>
</div>
```

### Sonuç

Video wrapper seviyesinde tek sefer yüklenir, her iki section yarı-şeffaf arka planla videonun hafifçe görünmesine izin verir. Scroll sırasında video hiç kesilmez — tek sinematik blok.

Not

Her iki section'ın içerik wrapper div'leri `position: relative; z-index: 1` olsun.