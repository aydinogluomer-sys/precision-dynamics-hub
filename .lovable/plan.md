

# Kök Neden Analizi: Mobilde Soluk Yazılar

## Tespit

Sorun **renk değişikliğiyle** değil, **CSS renk token'larının mobilde küçük yazılarda yetersiz kontrast üretmesiyle** ilgili.

Üç bölümde de ortak sorun: `text-muted-foreground` CSS değişkeni light modda `hsl(220, 8%, 46%)` — bu orta gri renk, 10-12px yazılarda okunması zor bir solukluğa yol açıyor. Ayrıca `text-foreground/70` (yani foreground renginin %70 opaklığı) de küçük yazılarda yeterli kontrast sağlamıyor.

### Bölüm bazında sorunlar:

**IndustriesSection (Endüstriler):**
- Başlık altı açıklama: `subheading-industrial` sınıfı → `text-muted-foreground` (soluk gri)
- Kart açıklamaları: `text-muted-foreground` (satır 185)
- Kart üst bölüm "Sektörler" etiketi: `text-muted-foreground` (satır 71)

**CapabilitiesSection (Kabiliyetler) — Mobil:**
- Kart etiketleri: `text-muted-foreground` + `text-[10px]` → çok küçük + soluk renk (satır 108)

**WhyUsSection (Neden Mas Technic) — Mobil:**
- Açıklamalar: `text-foreground/70` → %70 opaklık küçük yazıda yetersiz (satır 81, 92, 101)
- Badge'ler: `text-foreground/70` (satır 109)

## Çözüm Planı

Her üç bölümde `text-muted-foreground` kullanımlarını `text-foreground/80` ile değiştirmek ve mevcut `text-foreground/70` kullanımlarını `text-foreground/80`'e yükseltmek. Bu, opaklığı %70→%80'e çıkarır ve küçük yazılarda okunurluk sorununu giderir.

### Dosya değişiklikleri:

1. **`src/components/IndustriesSection.tsx`**: Satır 71 (`text-muted-foreground` → `text-foreground/70`), satır 185 (`text-muted-foreground` → `text-foreground/70`)

2. **`src/components/CapabilitiesSection.tsx`**: Mobil bölümdeki satır 108 (`text-muted-foreground` → `text-foreground/70`), desktop satır 180 (`text-muted-foreground` → `text-foreground/70`)

3. **`src/components/WhyUsSection.tsx`**: Mobil bölümdeki satır 81, 92, 101, 109'daki `text-foreground/70` → `text-foreground/80`

4. **`src/index.css`**: `subheading-industrial` sınıfının tanımını `text-muted-foreground`'dan `text-foreground/70`'e değiştirmek (satır 166-167) — bu tüm alt başlıkları etkiler.

Bu değişiklikler renk temasını bozmadan, sadece metin opaklığını artırarak mobilde okunurluğu iyileştirecektir.

