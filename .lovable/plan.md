

# Landing Page UI/UX Geliştirmeleri

Odak: Sayfa akışı & performans, mikro-etkileşimler & feedback, erişilebilirlik (a11y). Yalnızca landing page.

---

## 1. Sayfa Akışı & Performans

### 1a. Section Sayısını Azaltma / Birleştirme
Mevcut landing page 17 section + divider barındırıyor — kullanıcı yorgunluğu (scroll fatigue) yaratıyor.
- **NexusPromoSection** ile **FinalCTASection** benzer CTA amacı taşıyor. NexusPromo'nun dashboard mockup'ını koruyup FinalCTA'yı sadeleştir (tekrarlayan mesajı kaldır).
- **StatsSection** verilerini **WhyUsSection** içine entegre et (zaten WhyUs'ta `stats` dizisi var). Bağımsız StatsSection kaldırılır, Index.tsx'ten çıkarılır.
- **SectionDivider** kullanımını azalt: Arka arkaya aynı renk paletindeki section'lar arasındaki divider'ları kaldır (17 → ~10 divider).

### 1b. Lazy Loading Genişletme
Şu anda sadece 4 section lazy. Fold altındaki tüm ağır section'ları lazy yap:
- `IndustriesSection`, `MaterialsSection`, `WhyUsSection`, `CapabilitiesSection`, `FAQBlogSection`, `FinalCTASection` → `React.lazy`
- Bu, initial bundle'ı ~40% küçültür.

### 1c. Scroll İpucu (Scroll Affordance)
Hero section'ın altına animasyonlu bir aşağı ok / "Keşfet" göstergesi ekle. Kullanıcı scroll ettiğinde kaybolur. Şu anda Hero'dan sonra ne olduğu hakkında görsel ipucu yok.

---

## 2. Mikro-Etkileşimler & Feedback

### 2a. QuickQuote Dosya Yükleme Feedback
Mevcut durumda dosya sürüklendiğinde sadece `isDragging` state'i var. Geliştirmeler:
- Sürükleme alanına pulse border animasyonu + dosya ikonu büyütme
- Başarılı yüklemede kısa "checkmark" animasyonu (Framer Motion `AnimatePresence`)
- Hatalı dosyada shake animasyonu (kısa `x: [-8, 8, -4, 4, 0]` keyframes)

### 2b. CTA Buton Hover Geri Bildirimi
Tüm primary CTA butonlarına (Teklif Al, Bize Ulaşın) tutarlı hover state:
- Arrow ikonu `x: 0 → 4` translate
- Buton arka planında subtle gradient shift
- Active state'te `scale: 0.97` basma efekti

### 2c. Kart Hover Derinlik Efekti
Services, Industries ve FAQ kartlarına tutarlı hover mikro-etkileşimi:
- `translateY: -4px`, `box-shadow` artışı
- Border'da subtle `primary` renk geçişi
- 200ms transition ile yumuşak giriş/çıkış

### 2d. Section Arası Progress İndikatör
Mevcut `ScrollProgress` barı sadece 2px çizgi. Geliştirme:
- Sağ kenara küçük (w-1) dot-based section tracker ekle
- Aktif section'a karşılık gelen dot `primary` renkle highlight olur
- Tıklanabilir: ilgili section'a smooth scroll

---

## 3. Erişilebilirlik (a11y)

### 3a. Focus Yönetimi
- Tüm interaktif öğelere (kartlar, CTA butonları, nav linkleri) visible `focus-visible` outline ekle: `ring-2 ring-primary ring-offset-2`
- `MagneticButton` bileşeninde keyboard focus'ta manyetik efekti devre dışı bırak (sadece mouse hover'da aktif)
- `ServicesSection` yatay scroll gallery'sine keyboard arrow key navigasyonu ekle

### 3b. ARIA Etiketleri
- Her section'a `aria-labelledby` + section heading'e `id` ekle
- `SectionHeader` bileşenine otomatik `id` generation (tag → kebab-case)
- `QuickQuoteSection` drop zone'una `role="button"` ve `aria-label="CAD dosyası yükle"`
- `ScrollProgress` barına `role="progressbar"` + `aria-valuenow`

### 3c. Renk Kontrastı İyileştirmeleri
- `text-foreground/60` kullanılan açıklamalarda kontrast ratio'yu kontrol et ve gerekirse `/70`'e yükselt (WCAG AA 4.5:1)
- `forge-silver` açık modda background üzerinde yetersiz — `forge-steel` ile değiştir veya font-weight artır
- SectionHeader'daki `text-primary` tag'inin light background üzerinde kontrastını doğrula

### 3d. Reduced Motion İyileştirmeleri
- `PageLoader` bileşeninde `prefersReduced` true ise loader'ı tamamen atlat (1.8s bekleme yok)
- `CursorFollower` bileşenini `prefersReduced` modda gizle
- `LogoLoop` infinite scroll animasyonunu durdur, statik grid göster

---

## Teknik Detaylar

- **Dosya değişiklikleri**: ~15 dosya (section bileşenleri + Index.tsx + SectionHeader + ScrollProgress + QuickQuoteSection + index.css)
- **Yeni bileşen**: `SectionDotNav.tsx` (sağ kenar section tracker)
- **Silinen bileşen**: StatsSection verisi WhyUs'a taşınır, dosya korunabilir ama Index'ten çıkarılır
- **Kütüphane**: Mevcut Framer Motion + Tailwind yeterli, yeni bağımlılık yok
- **Admin/Müşteri paneli**: Hiçbir değişiklik yapılmaz

