

# BlurImage `disableScaleTransform` Prop Ekleme Planı

## Problem
BlurImage'ın varsayılan `transform: scale(1.1) → scale(1)` geçişi, MaterialsSection'daki CSS `group-hover:scale-105` ile çakışır — iki ayrı transform kaynağı birbirini ezebilir.

## Çözüm
`disableScaleTransform?: boolean` prop'u eklenir. `true` olduğunda BlurImage sadece blur animasyonu yapar, transform dokunmaz — CSS class'ları özgürce çalışır.

## Değişiklikler

### `src/components/BlurImage.tsx` (yeni dosya)
```tsx
interface BlurImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  disableScaleTransform?: boolean;
}

export function BlurImage({ src, alt, className, style, disableScaleTransform }: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div style={{ overflow: "hidden", position: "relative", width: "100%", height: "100%" }}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={className}
        style={{
          ...style,
          filter: loaded ? "blur(0px)" : "blur(20px)",
          transform: disableScaleTransform ? undefined : (loaded ? "scale(1)" : "scale(1.1)"),
          transition: "filter 0.5s ease, transform 0.5s ease",
          willChange: "filter, transform",
        }}
      />
    </div>
  );
}
```

### Kullanım kuralı (4 dosya)

| Dosya | `disableScaleTransform` | Neden |
|-------|------------------------|-------|
| **MaterialsSection.tsx** (Desktop + Mobile) | `true` | CSS `group-hover:scale-105` zaten transform yönetiyor |
| **ServicesSection.tsx** | `false` (varsayılan) | Framer Motion `whileHover` dış wrapper'da, BlurImage scale bağımsız |
| **WhyUsSection.tsx** | `false` (varsayılan) | Hover scale yok, BlurImage scale güvenle çalışır |
| **IndustriesSection.tsx** | `false` (varsayılan) | Hover scale yok |

Toplam: 5 dosya (1 yeni, 4 düzenleme). Mevcut planın BlurImage görevine bu prop dahil edilir.

