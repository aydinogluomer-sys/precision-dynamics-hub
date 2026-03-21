

# Section Geçiş Animasyonlarını Güçlendirme — Faz 1 (Güvenli Değişiklikler)

Kullanıcı feedback'ine göre revize edildi. CNCScrollStory/MaterialMorphScroll sarma ve sticky overlap tekniği Faz 2'ye ertelendi.

---

## Kapsam

### 1. SectionDivider Dramatikleştirme
- Yükseklik: 100px → 160px
- Parallax: ±20px → ±50px
- Çift katman SVG: mevcut path + ikinci ince çizgi path (opacity 0.3, farklı eğri)
- Scroll-driven subtle rotate: 0 → 2deg

### 2. ParallaxSection Variant Güçlendirme
- **stack**: scale `[1, 0.88]`, translateY `[0, -40]`
- **zoom-out-blur**: scale `[1, 0.85]`, blur `[0, 10]`, opacity fade %30'da başlasın
- **slide-up**: translateY `[0, -120]` (şu an -60)
- **depth-3d**: rotateX `[0, 6deg]`, perspective 1200px
- **color-fade**: scale `[1, 0.90]`, overlay gradient
- **wipe-mask**: clipPath'i diagonal polygon'a çevir

### 3. ProjectShowcase'i ParallaxSection İçine Al
- ProjectShowcase düz `<div>` yerine ParallaxSection variant="stack" ile sarılır
- Bu section sticky kullanmıyor, güvenli

### Kapsam Dışı (Faz 2)
- CNCScrollStory / MaterialMorphScroll çıkış animasyonları (kendi useScroll hook'larına eklenir)
- Sticky + negatif margin-top overlap tekniği (tek section'da test edilir)

---

## Dosya Değişiklikleri

| Dosya | Değişiklik |
|-------|-----------|
| `SectionDivider.tsx` | Yükseklik, parallax aralığı, çift SVG katman, rotate |
| `ParallaxSection.tsx` | Tüm variant transform değerlerini güçlendir, perspective/rotateX ekle |
| `Index.tsx` | ProjectShowcase'i ParallaxSection içine al |

3 dosya, yeni bileşen yok, kütüphane eklenmez.

