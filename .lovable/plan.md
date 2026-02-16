

# Hero Animasyonlari ve 4 Bolum UI/UX Revizyonu

Bu plan iki ana gorevi kapsar:
1. Hero bolumune framer-motion ile scroll-triggered animasyonlar eklenmesi
2. "Nasil Calisiyoruz", "Sertifikalar", "Hizmetler" ve "Endustriler" bolumlerinin referans gorsellerdeki en iyi unsurlari harmanlayarak revizyonu

---

## 1. Framer Motion Kurulumu ve Hero Animasyonlari

**Bagimlilık:** `framer-motion` paketi projeye eklenecek.

**HeroSection.tsx degisiklikleri:**
- Sol icerik blogu (overline, baslik, aciklama, slogan, butonlar) icin `motion.div` ile staggered fade-in-up animasyonu
- Sag CAD upload blogu icin sagdan kayarak gelme animasyonu (slide-in + fade)
- Quick stats rakamlari icin ayri bir stagger grubu
- Rotating headline mekanigi korunacak, sadece ilk yukleme animasyonu eklenecek
- Tum animasyonlar sayfa yuklendiginde tetiklenecek (`viewport once` ile)

**Teknik detay:**
- `motion.div` ile `initial`, `whileInView`, `viewport={{ once: true }}` kullanilacak
- Stagger efekti icin `staggerChildren: 0.15` delay
- Animasyon suresi 0.6-0.8s, ease-out egri

---

## 2. Nasil Calisiyoruz (HowWeWorkSection) Revizyonu

Referans gorsellerden alinan en iyi unsurlar:
- Yatay timeline cizgisi uzerinde numaralandirilmis noktalar
- Her adimin uzerinde buyuk numara ve ikon
- Adimlar arasi ok/cizgi baglantisi daha belirgin
- Hover durumunda kartlarin yukari kayma efekti

**Degisiklikler:**
- Timeline cizgisi uzerine her adim icin `primary` renkli nokta (dot) eklenmesi
- Adim numarasi kartın icinde buyuk ve soluk arka plan olarak gosterilmesi (ornegin buyuk "01" watermark)
- Hover durumunda `translateY(-8px)` ve `shadow-lg` efekti
- Ikon kutusunun `primary` dolgu arka plana gecisi (hover'da)
- Mobilde dikey timeline cizgisi ile sol tarafa hizalama

---

## 3. Sertifikalar (CertificationsSection) Revizyonu

Referans gorsellerden alinan en iyi unsurlar:
- Koyu arka plan uzerinde minimal, kalkan/rozet ikonu vurgusu
- Her sertifika icin kucuk bir "checkmark" veya kalkan ikonu
- Yatay marquee/scroll efekti yerine sabit grid ama daha genis padding

**Degisiklikler:**
- Her sertifika kartina `ShieldCheck` ikonu eklenmesi (mevcut harf kisaltmasi yerine)
- Hover durumunda kart arka planinin `primary/20` olarak degismesi
- Ust kisma kisa bir aciklama satiri: "Uluslararasi standartlarda sertifikali uretim"
- Kartlarin icinde sertifika adini ve aciklamasini daha belirgin gosterme
- framer-motion ile staggered fade-in animasyonu

---

## 4. Hizmetler (ServicesSection) Revizyonu

Referans gorsellerden alinan en iyi unsurlar:
- Kartlarin ust kenarinda tam genislikte sabit `primary` accent bar (hover'da degil, her zaman gorunur)
- Ikon kutusunun daha buyuk ve belirgin olmasi
- Capability tag'lerinin daha teknik gorunmesi
- Kart iceriginin daha fazla boslukla nefes almasi

**Degisiklikler:**
- Accent bar'in her zaman `h-1 w-full bg-primary` olarak gorunur olmasi (hover'da renk degisimi yerine)
- Ikon kutusunun 16x16 (64px) olarak buyutulmesi
- Capability tag'lerine kucuk bir nokta/bullet eklenmesi
- Kart padding'inin arttirilmasi (p-8 -> p-10)
- Alt kisimda "Incele" ve "Teklif Al" butonlarinin daha belirgin olmasi
- framer-motion ile staggered gorunme animasyonu

---

## 5. Endustriler (IndustriesSection) Revizyonu

Referans gorsellerden alinan en iyi unsurlar:
- Kartlarin ust kenarinda ince accent cizgi (sol yerine ust)
- Ikon arka planinin daire yerine kare ve daha buyuk olmasi
- Highlight badge'inin kartın alt kisminda ayri bir bant olarak gosterilmesi
- Daha kompakt ve yoğun bilgi sunumu

**Degisiklikler:**
- Sol dikey accent cizgisi yerine ust yatay accent cizgisi
- Ikon kutusunun 18x18 (72px) buyuklugunde ve `bg-primary/5` olmasi
- Highlight badge'inin kart altinda tam genislikte bir bant olarak gosterilmesi
- "Detayli Bilgi" linkinin ok ile birlikte daha belirgin olmasi
- Hover durumunda kartın hafif yukari kaymasi (`translateY(-4px)`)
- framer-motion ile viewport-triggered stagger animasyonu

---

## Teknik Uygulama Ozeti

| Dosya | Islem |
|---|---|
| `package.json` | `framer-motion` eklenmesi |
| `src/components/HeroSection.tsx` | motion.div ile scroll-triggered animasyonlar |
| `src/components/HowWeWorkSection.tsx` | Timeline noktalar, watermark numaralar, hover efektleri |
| `src/components/CertificationsSection.tsx` | Kalkan ikonlari, stagger animasyonlar |
| `src/components/ServicesSection.tsx` | Sabit accent bar, buyuk ikonlar, stagger animasyonlar |
| `src/components/IndustriesSection.tsx` | Ust accent cizgi, buyuk ikonlar, bant highlight |

Tum bolumler `framer-motion`'in `whileInView` + `viewport={{ once: true }}` yaklasimini kullanarak scroll-triggered animasyonlar elde edecek. Animasyonlar asiri olmayacak - endüstriyel, profesyonel ve kontrollü bir his verecek.

