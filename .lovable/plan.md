

# Sanzo Wada Renk Kombinasyonları ile Section Geçişleri — Yeniden Tasarım

## Mevcut Durum

Şu an tüm bölümler tek bir "Industrial-Luxe" paletinden (#162038, #f0ebe3, #5a7a6c, #3d5a5b, #c17f59) besleniyor. Bölümler arası geçişler monoton ve Sanzo Wada'nın harmonik renk teorisinden yararlanmıyor.

## Önerilen Sanzo Wada Kombinasyonları (Machining Sektörüne Uygun)

Sanzo Wada'nın gerçek renk sözlüğünden, CNC/metal işleme sektörüne uygun **4 temel kombinasyon grubu** seçildi:

```text
COMBO A — "Çelik & Derinlik" (Koyu bölümler)
  Slate Color     #1b3644   (Wada Collection 6, #156)
  Dark Tyrian Blue #0d2b52  (Wada Collection 4, #20)
  Antwerp Blue    #008aa1   (Wada Collection 4, #13 — marka teal'e yakın)

COMBO B — "Sıcak Metal" (Vurgu & CTA)
  Raw Sienna      #b85e00   (Wada Collection 2, #14)
  Sudan Brown     #9b5348   (Wada Collection 2, #41)
  Vinaceous Tawny #c74300   (Wada Collection 2, #15)

COMBO C — "Atölye Yüzeyi" (Açık bölümler)
  Neutral Gray    #b5d1cc   (Wada Collection 6, #2)
  Mineral Gray    #9fc2b2   (Wada Collection 6, #3)
  White           #ffffff   (Wada Collection 6, #1)

COMBO D — "Tezgâh Patinası" (Orta ton bölümler)
  Dark Medici Blue #417777  (Wada Collection 4, #15)
  Warm Gray       #9cb29e   (Wada Collection 6, #4)
  Andover Green   #5c8a73   (Wada Collection 3, #9)
```

## Bölüm → Renk Eşleştirmesi

```text
Bölüm                Zemin           Metin/Vurgu           Combo
─────────────────────────────────────────────────────────────────
Hero                 #0d2b52         White + #b85e00       A+B
NexusPromo           #417777         White + #b5d1cc       D
HowWeWork            #f5f0eb (*)     #0d2b52 + #008aa1    C (warm)
Certifications       #1b3644         #b5d1cc               A+C
VideoScroll          #0d2b52         —                     A
Services             #eef3f1 (*)     #1b3644 + #008aa1    C (cool)
Industries           #ffffff         #1b3644               C
Materials            #f5f0eb (*)     #0d2b52               C (warm)
WhyUs                #b5d1cc         #0d2b52 + #b85e00    C+B
Capabilities         #eef3f1 (*)     #1b3644 + #c74300    C+B
Stats                #1b3644         #b85e00 + White       A+B
Testimonials         #f5f0eb (*)     #0d2b52               C (warm)
FAQ/Blog             #eef3f1 (*)     #1b3644               C (cool)
FinalCTA             #0d2b52         White + #b85e00       A+B
Footer               #1b3644         #9fc2b2               A+D

(*) #f5f0eb ve #eef3f1: Neutral Gray'in çok açık versiyonları,
    Sanzo Wada mantığıyla warm/cool light tonları ayrıştırmak için.
```

## Teknik Uygulama

### 1. CSS Değişkenleri Güncelleme (`src/index.css`)
- Mevcut `--terracotta`, `--camel`, `--forest-sage` gibi değişkenleri Sanzo Wada karşılıklarıyla değiştir
- Yeni değişkenler: `--sw-slate`, `--sw-tyrian`, `--sw-antwerp`, `--sw-sienna`, `--sw-sudan`, `--sw-tawny`, `--sw-neutral`, `--sw-mineral`, `--sw-medici`, `--sw-warm-gray`, `--sw-andover`
- Dark mode karşılıklarını da ayarla

### 2. Tailwind Config Güncelleme (`tailwind.config.ts`)
- Yeni Sanzo Wada renklerini `sanzo` namespace altında tanımla

### 3. Bölüm Bileşenlerini Güncelleme (14 dosya)
Her bileşendeki hardcoded `style={{ backgroundColor: "..." }}` değerlerini yeni Sanzo Wada renkleriyle değiştir:
- `HeroSection.tsx` — #162038 → #0d2b52, vurgular #c17f59 → #b85e00
- `NexusPromoSection.tsx` — #5a7a6c → #417777
- `HowWeWorkSection.tsx` — #f0ebe3 → #f5f0eb
- `CertificationsSection.tsx` — #3d5a5b → #1b3644, text → #b5d1cc
- `VideoScrollSection.tsx` — #162038 → #0d2b52
- `ServicesSection.tsx` — #e4eded → #eef3f1
- `IndustriesSection.tsx` — vurgu renkleri güncelle
- `MaterialsSection.tsx` — zemin → #f5f0eb
- `WhyUsSection.tsx` — #e4eded → #b5d1cc (bolder geçiş)
- `StatsSection.tsx` — #162038 → #1b3644, vurgu → #b85e00
- `CapabilitiesSection.tsx` — #f0ebe3 → #eef3f1, tablo başlık → #417777
- `TestimonialsSection.tsx` — #f0ebe3 → #f5f0eb
- `FAQBlogSection.tsx` — zemin → #eef3f1
- `FinalCTASection.tsx` — #162038 → #0d2b52
- `Footer.tsx` — #1e2d3a → #1b3644

### 4. Geçiş Ritmi
Bölümler arası renk akışı: **Koyu → Orta → Açık-sıcak → Koyu → Açık-soğuk → ... → Koyu → Footer**. Bu dalga deseni, machining atölyelerindeki çelik-ateş-soğutma döngüsünü yansıtır.

