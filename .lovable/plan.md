

## Problem

WhyUsSection'ın hemen üstündeki dalga (satır 190-202) iki renk sorunu içeriyor:

1. **SVG dalga fill rengi** → `#3d3d5c` (lacivert/mor tonlu) — hardcoded
2. **Dalga wrapper backgroundColor** → `hsl(var(--forge-mist))` (açık gri) — dalganın üstündeki boşluğun rengi

WhyUsSection'ın arka planı `hsl(var(--forge-gunmetal))` yani `#1a1a2e` (koyu lacivert). Dalganın da bu renge uyması gerekiyor.

## Yapılacaklar

### 1. SVG dalga fill rengini güncelle
`src/pages/Index.tsx` satır 200'deki `fill="#3d3d5c"` değerini `fill="hsl(var(--forge-gunmetal))"` olarak değiştir — böylece dalga, WhyUsSection ile aynı renk olur.

### 2. Wrapper div backgroundColor'ı güncelle
Satır 194'teki `backgroundColor: "hsl(var(--forge-mist))"` değerini, dalganın üstündeki bölümün (MaterialsSection) arka plan rengiyle eşleştir. MaterialsSection açık tonlu bir bölümse `hsl(var(--forge-mist))` doğru kalabilir, ancak dalga ile WhyUs arasında kesintisiz geçiş için wrapper'ın da tutarlı olması lazım.

### Teknik Özet
- **Dosya:** `src/pages/Index.tsx` — satır 190-202
- **Değişiklik 1:** `fill="#3d3d5c"` → `fill="hsl(var(--forge-gunmetal))"`
- **Değişiklik 2:** Gerekirse wrapper backgroundColor'ı da Materials bölümüne uyumlu hale getir

