
# Font Kullanim Plani: Space Grotesk vs IBM Plex Mono

## Genel Strateji

| Font | Rol | Neden |
|------|-----|-------|
| **Space Grotesk** | Ana UI fontu (basliklar, paragraflar, butonlar, navigasyon) | Geometrik, modern, okunakli -- marka kimligine uygun |
| **IBM Plex Mono** | Teknik/veri icerikleri, footer, badge'ler, kod referanslari | Monospace = muhendislik/hassasiyet hissi, endüstriyel karakter |

---

## Bolum Bolum Atama

### Space Grotesk (font-sans) -- Varsayilan, Degisiklik Gerekmez
- **Header / Navigasyon**: Marka adi, menu linkleri, butonlar
- **Hero Section**: Ana baslik, alt baslik, CTA butonlari
- **StickyIntroReveal**: "Mas Technic, CNC Freze..." paragraf metni
- **Services Section**: Basliklar, aciklamalar
- **Industries Section**: Basliklar, sektor isimleri
- **How We Work Section**: Adim baslik ve aciklamalari
- **Why Us Section**: Basliklar, aciklama metinleri
- **Testimonials Section**: Musteri yorumlari, isimler
- **FAQ Section**: Soru/cevap metinleri
- **CTA Sections**: Basliklar, buton metinleri
- **Tum sayfa baslik ve paragraf icerikleri** (Hakkimizda, Iletisim, Blog, SSS vb.)

### IBM Plex Mono (font-mono) -- Guncellenmesi Gereken Bolumler

1. **Footer** (zaten uygulanmis -- `fontFamily: "'IBM Plex Mono'"`)
   - Tum footer icerigi mono kalacak

2. **Stats Section** (`StatsSection.tsx`)
   - Buyuk rakamlar (25+, 99.7%, 10K+ vb.) `font-mono` sinifi alacak
   - Etiketler (Yillik Deneyim, Zamaninda Teslimat) Space Grotesk kalacak

3. **Materials Section** (`MaterialsSection.tsx`)
   - Malzeme spec/tolerans degerleri ve badge'ler `font-mono` alacak
   - Malzeme basliklari (Aluminyum, Celik vb.) Space Grotesk kalacak

4. **Capabilities Section** (`CapabilitiesSection.tsx`)
   - Teknik spec degerleri (tolerans, olcu araligi vb.) `font-mono`
   - Basliklar ve aciklamalar Space Grotesk

5. **Certifications Section** (`CertificationsSection.tsx`)
   - Sertifika kodlari (ISO 9001, AS9100D vb.) `font-mono`
   - Aciklama metinleri Space Grotesk

6. **Comparison Table** (`ComparisonTable.tsx`)
   - Tablo icerisindeki sayisal degerler `font-mono`

7. **Admin Panel** (zaten cogunlukla `font-mono` kullaniyor)
   - Finansal rakamlar, tarihler, belge numaralari -- mevcut `font-mono` kullanimi korunacak

---

## Teknik Uygulama

### 1. Tailwind config guncelleme
`tailwind.config.ts` icindeki `fontFamily.mono` degerini `JetBrains Mono` yerine `IBM Plex Mono` olarak degistir. Boylece projede `font-mono` sinifi kullanan her yer otomatik olarak IBM Plex Mono'ya gecis yapar.

```text
font-mono: ['IBM Plex Mono', 'monospace']   (eskisi: JetBrains Mono)
```

### 2. CSS guncelleme
`src/index.css` icindeki Google Font import satirindan JetBrains Mono'yu cikar (zaten `index.html` uzerinden IBM Plex Mono yukleniyor). `.text-technical` sinifini da IBM Plex Mono'ya guncelle.

### 3. Footer temizligi
`Footer.tsx` icerisindeki inline `fontFamily` stilini kaldir; `font-mono` Tailwind sinifi yeterli olacak cunku config guncellendikten sonra otomatik IBM Plex Mono gelecek.

### 4. Bilesen guncellemeleri
Asagidaki dosyalarda ilgili sayisal/teknik degerlere `font-mono` sinifi ekle:
- `StatsSection.tsx` -- buyuk rakam elemanlarina
- `MaterialsSection.tsx` -- spec badge'lerine
- `CapabilitiesSection.tsx` -- teknik deger satirlarina
- `CertificationsSection.tsx` -- sertifika kod metinlerine

---

## Sonuc

Toplam **~8 dosyada** degisiklik yapilacak. Tum proje genelinde tek bir monospace font (IBM Plex Mono) kullanilacak, JetBrains Mono tamamen kaldirilacak. Space Grotesk ana icerik fontu olarak korunacak.
