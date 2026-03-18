

# Section Bazlı Geçiş Varyasyonları

## Mevcut Durum
Tüm 14 section aynı stacking-cards efektini kullanıyor (scale-down + fade + border-radius). Monoton hissediyor. Bazı section'lara farklı çıkış animasyonları ekleyerek ritim kırılımı yaratılacak.

## Geçiş Varyant Haritası

| # | Section | Tema | Geçiş Tipi | Neden |
|---|---------|------|------------|-------|
| 1 | Hero | dark | **Zoom-out blur** (scale 1→0.85, blur 0→8px) | Açılış sahnesi — sinematik giriş hissi, diğerlerinden farklı olmalı |
| 2 | NexusPromo | dark | Standart stacking | Dashboard mockup'ı temiz kalmalı |
| 3 | HowWeWork | light | **Slide-up fade** (translateY 0→-60px, opacity→0) | Adım adım süreç — yukarı kayarak "tamamlandı" hissi |
| 4 | Certifications | dark | Standart stacking | Kısa section, basit kalmalı |
| 5 | VideoScroll | dark | **Zoom-in** (scale 1→1.08, opacity→0) | Video içeriği — zoom-in ile "içine çekilme" efekti |
| 6 | Services | light | Standart stacking | Kart grid — klasik stacking iyi çalışıyor |
| 7 | Industries | light | Standart stacking | Grid yapısı — stacking yeterli |
| 8 | Materials | light | **Slide-up fade** (translateY 0→-60px) | Malzeme kartları — hafif değişiklik |
| 9 | WhyUs | dark | Standart stacking | Statik içerik, stacking yeterli |
| 10 | Capabilities | light | Standart stacking | Grid yapısı |
| 11 | Stats | dark | **Zoom-out blur** (scale 1→0.88, blur 0→6px) | Rakamlar — dramatik çıkış |
| 12 | Testimonials | light | Standart stacking | Sonsuz scroll — stacking yeterli |
| 13 | FAQ | light | Standart stacking | İçerik ağırlıklı |
| 14 | FinalCTA | dark | isLast (efekt yok) | Son section |

**Özet**: 14 section'dan 4'ü farklı geçiş alacak, 9'u standart stacking, 1'i isLast.

## Teknik Uygulama

### `ParallaxSection.tsx` — `variant` prop ekleme

```typescript
type TransitionVariant = "stack" | "zoom-out-blur" | "slide-up" | "zoom-in";
```

Her variant farklı `useTransform` değerleri üretir:

- **stack** (default): Mevcut scale(0.92) + opacity(0.4) + borderRadius(16)
- **zoom-out-blur**: scale(0.85) + opacity(0) + filter blur(8px) — Hero & Stats için
- **slide-up**: translateY(-60px) + opacity(0) — HowWeWork & Materials için  
- **zoom-in**: scale(1.08) + opacity(0) — VideoScroll için

### `Index.tsx` — variant prop'larını ekle

```tsx
<ParallaxSection index={1} variant="zoom-out-blur">  {/* Hero */}
<ParallaxSection index={3} variant="slide-up">        {/* HowWeWork */}
<ParallaxSection index={5} variant="zoom-in">         {/* VideoScroll */}
<ParallaxSection index={8} variant="slide-up">         {/* Materials */}
<ParallaxSection index={11} variant="zoom-out-blur">   {/* Stats */}
```

Geri kalan section'lar default `"stack"` kullanır.

### Dosya Değişiklikleri

| Dosya | İşlem |
|---|---|
| `src/components/ParallaxSection.tsx` | `variant` prop ekle, her variant için transform logic |
| `src/pages/Index.tsx` | İlgili section'lara variant prop ata |

Renkler ve section bileşenleri değiştirilmeyecek.

