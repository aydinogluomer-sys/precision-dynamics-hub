## Light Mode Düzeltmesi — Simsiyah Sorunun Kök Nedeni ve Çözüm

### Sorun

`ParallaxSection` wrapper'a eklenen `backgroundColor: "hsl(var(--forge-obsidian))"` TÜM section'ları siyah yapıyor.  style={{ backgroundColor: "hsl(var(--forge-obsidian))" }} yerine style={{ backgroundColor: "hsl(var(--forge-workshop))" }} yap. Sayfadaki bölümlerin yarısı açık renkli:

```text
KOYU (kasıtlı):                    AÇIK (tema uyumlu):
─────────────────                  ─────────────────
HeroSection (obsidian)             HowWeWorkSection (workshop)
QuickQuoteSection (obsidian)       ServicesSection (concrete)
CNCScrollStory (obsidian)          IndustriesSection (→ şu an obsidian, YANLIŞ)
NexusPromoSection (gunmetal)       MaterialsSection (mist)
CertificationsSection (iron)       CapabilitiesSection (concrete)
VideoScrollSection (obsidian)      TestimonialsSection (workshop)
WhyUsSection (gunmetal)            FAQBlogSection (mist)
MaterialMorphScroll (obsidian)
ProjectShowcase (obsidian)
FinalCTASection (obsidian)
```

Wrapper'a forge-obsidian vermek, açık renkli bölümlerde scroll animasyonu sırasında siyah zemin gösteriyor ve tüm sayfa karanlık görünüyor.

### Çözüm

#### 1. ParallaxSection.tsx — Wrapper background'u kaldır

`backgroundColor: "hsl(var(--forge-obsidian))"` satırını sil. Her section kendi arka planını zaten tanımlıyor. Wrapper'a gerek yok — parallax animasyonu sırasında alttan görünen, bir üstteki (daha yüksek z-index'li) section'dır, wrapper değil.

```
// Önce:
style={{
  zIndex: index,
  perspective: useDepth3d ? 1200 : undefined,
  backgroundColor: "hsl(var(--forge-obsidian))",  // ← SİL
}}

// Sonra:
style={{
  zIndex: index,
  perspective: useDepth3d ? 1200 : undefined,
}}
```

#### 2. IndustriesSection.tsx — forge-obsidian yerine tema uyumlu renk

`backgroundColor: "hsl(var(--forge-obsidian))"` → `backgroundColor: "hsl(var(--forge-workshop))"` olarak değiştir. Bu section koyu olmamalı — HowWeWorkSection ve ServicesSection gibi açık bir section.

#### 3. IndustriesSection.tsx — text/border renkleri düzelt

forge-obsidian kaldırılınca `text-foreground`, `bg-card`, `border-border` gibi tema uyumlu class'lar zaten doğru çalışacak. Ek değişiklik gerekmez.

### Değişecek Dosyalar

- `src/components/ParallaxSection.tsx` — 1 satır silme
- `src/components/IndustriesSection.tsx` — 1 satır değişiklik

### Neden Bu Çalışır

ParallaxSection'ın z-index hiyerarşisi (1→19) sayesinde, bir section scroll ile uzaklaşırken **üstteki section** onu örter. Wrapper background'u kullanıcı tarafından görülmez — sadece aradaki geçiş anında (milisaniyeler) ve zaten üst section kapladığı için önemsiz. Asıl sorun, koyu wrapper'ın açık section'ların **kendi içeriğinin arkasından** sızmasıydı.