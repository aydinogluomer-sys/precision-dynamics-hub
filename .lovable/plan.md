

# OneDollarLesson Tarzı "Stacking Cards" 3D Geçiş Sistemi

## Referans Analizi

OneDollarLesson.com'da her section tam ekran kaplıyor ve scroll sırasında **mevcut section geride kalarak küçülüyor** (scale-down), **yeni section alttan üzerine kayarak gelip onu örtüyor**. Bu "kart yığını" (stacking cards) efekti — rotateX tilt'ten çok daha etkileyici ve sinematik.

## Mevcut Sorun

Şu anki `rotateX(-4° → 0°)` ve `scale(0.96 → 1)` çok hafif ve yapay görünüyor. Ayrıca sadece gelen section'a uygulanıyor, giden section'a hiçbir efekt yok.

## Yeni Yaklaşım: Stacking Cards

```text
Scroll aşağı ilerlerken:

┌─────────────────────┐
│  Section A (aktif)   │  ← z-index: 1, scale: 1
│                     │
└─────────────────────┘

        ↓ scroll ↓

┌─────────────────────┐
│  Section A           │  ← scale: 0.92, opacity: 0.6 (geride kalır)
│  ┌─────────────────┐│
│  │  Section B       ││  ← z-index: 2, alttan kayarak gelir
│  │  (yeni section)  ││
│  └─────────────────┘│
└─────────────────────┘
```

## Teknik Uygulama

### `ParallaxSection.tsx` Yeniden Yazım

Her section `position: sticky; top: 0` olacak ve artan `z-index` ile üst üste yığılacak. Scroll ilerledikçe:

- **Giden section**: `scale(1 → 0.92)` + `opacity(1 → 0.4)` — geride kalarak küçülür, karartılır
- **Gelen section**: Doğal scroll ile alttan gelir, hiçbir transform yok — temiz ve doğal
- **Perspective**: Dış container'da `perspective: 1200px` korunur ama rotateX kaldırılır
- **Border-radius**: Giden section küçülürken `borderRadius: 0 → 16px` ile yuvarlanır (kart hissi)

### `Index.tsx` Güncelleme

- Her `ParallaxSection`'a sıralı index prop'u ekle (z-index stacking için)
- `sticky` prop'u kaldır — artık tüm section'lar sticky
- Footer hariç (footer normal akışta kalır)

### Dosya Değişiklikleri

| Dosya | İşlem |
|---|---|
| `src/components/ParallaxSection.tsx` | Yeniden yaz — stacking cards mantığı |
| `src/pages/Index.tsx` | Section'lara index prop ekle, sticky kaldır |

Renkler ve section bileşenlerinin kendileri **hiç değiştirilmeyecek**.

