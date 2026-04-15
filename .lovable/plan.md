

# İçerik Kaybı Sorunu — Plan

## Problem

`Scene` wrapper (`sticky top-0 min-h-screen overflow-hidden`) viewport yüksekliğinden uzun içerikleri kesiyor. Etkilenen bölümler:

| Bölüm | Neden taşıyor |
|---|---|
| **ServicesSection** | 5 servis + sağ görsel panel, mobilde dikey stack |
| **IndustriesSection** | Marquee + 13 endüstri kartı grid |
| **FAQBlogSection** | 7 FAQ + 3 blog kartı yan yana |
| **CapabilitiesSection** | Sticky sol panel + 5 satırlı tablo |
| **TestimonialsSection** | 6+ testimonial + logo loop |
| **MaterialsSection** | 4 malzeme kartı + karşılaştırma grid |
| **WhyUsSection** | 4 avantaj + 4 stat + 2 görsel |
| **NexusPromoSection** | Feature list + dashboard mockup |
| **CertificationsSection** | Sertifika kartları grid |

## Kök Neden

`Index.tsx` satır 107-124'teki `Scene` wrapper:
```
sticky top-0 min-h-screen overflow-hidden
```

`sticky` + `overflow-hidden` kombinasyonu, içerik `100vh`'den uzunsa alt kısmı keser. Stacking scroll efekti için `sticky` gerekli ama `overflow-hidden` ve sabit `min-h-screen` sorun yaratıyor.

## Çözüm Stratejisi

**İki farklı wrapper tipi:** İçerik yüksekliğine göre `Scene` veya `FlowScene` kullanımı.

### Değişiklik 1 — `Scene` wrapper'ını güncelle

`overflow-hidden` yerine `overflow-visible` kullan. Stacking efekti zaten `z-index` ile sağlanıyor — overflow-hidden gerekli değil. Ek olarak `min-h-screen` yerine `min-h-[100dvh]` kullanarak mobilde adres çubuğu sorununu da çöz.

```tsx
const Scene = ({ children, z, className = "", style }) => (
  <div
    className={`sticky top-0 min-h-[100dvh] w-full ${className}`}
    style={{ zIndex: z, ...style }}
  >
    {children}
  </div>
);
```

### Değişiklik 2 — İçerik-ağır bölümleri FlowScene'e taşı

Aşağıdaki bölümler `Scene` → `FlowScene` olarak değiştirilecek çünkü içerikleri viewport'tan uzun:

- **ServicesSection** (5 servis kartı)
- **IndustriesSection** (13 endüstri kartı)
- **FAQBlogSection** (7 FAQ + 3 blog)
- **TestimonialsSection** (6 testimonial)
- **MaterialsSection** (4 malzeme kartı)

Bu bölümler zaten internal scroll/pin mantığı kullanmıyor, sadece statik içerik gösteriyor.

### Değişiklik 3 — Kalan Scene bölümlerinde overflow düzeltmesi

Scene olarak kalan bölümlerde (NexusPromo, Certifications, WhyUs, Capabilities, FinalCTA) `overflow-hidden` kaldırılacak.

### Değişiklik 4 — Her bileşende `min-h-screen` → `min-h-[100dvh]` ve padding güvencesi

Her section bileşeninin kendi CSS'inde `min-h-screen` yerine responsive padding ile doğal yüksekliğe izin ver:
- `min-h-screen` → `py-24 md:py-32` (içerik kadar yer kapla)
- Veya `min-h-[100dvh]` tut ama `overflow-y-auto` ekle

## Dosya Değişiklikleri

| Dosya | Değişiklik |
|---|---|
| `src/pages/Index.tsx` | Scene wrapper: `overflow-hidden` kaldır. Services, Industries, FAQ, Testimonials, Materials bölümlerini `Scene` → `FlowScene` olarak değiştir |
| `src/components/ServicesSection.tsx` | `min-h-screen` → responsive padding |
| `src/components/IndustriesSection.tsx` | `min-h-screen` → responsive padding |
| `src/components/FAQBlogSection.tsx` | `min-h-screen` → responsive padding |
| `src/components/TestimonialsSection.tsx` | İçerik taşmasını kontrol et |
| `src/components/MaterialsSection.tsx` | İçerik taşmasını kontrol et |
| `src/components/CapabilitiesSection.tsx` | `overflow-hidden` kontrol |
| `src/components/NexusPromoSection.tsx` | `min-h-screen` korunur ama taşma düzeltilir |
| `src/components/CertificationsSection.tsx` | `overflow-hidden` kaldır |
| `src/components/WhyUsSection.tsx` | `overflow-hidden` kaldır |

## Dokunulmayacaklar

- Cinematic sahneler (Hero, Lava, MoldCast, CNC, Video, MaterialMorph) — bunlar tasarım gereği tam ekran ve scroll-driven, değişmeyecek
- Z-index sıralaması
- Animasyon mantığı
- Renk sistemi

