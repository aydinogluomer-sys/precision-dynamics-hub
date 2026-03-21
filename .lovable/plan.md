

# Tüm Section'ları 9/10+ Seviyeye Çıkarma Planı

Mevcut durum ve hedef arasındaki farkları kapatmak için section bazlı aksiyonlar:

---

## 1. HERO SECTION (8/10 → 9/10)

**Sorunlar:** CAD upload widget odağı dağıtıyor, skewed badge amacı belirsiz, headline rotate bazen yarım kare yakalıyor.

**Aksiyonlar:**
- CAD upload widget'ı sağ sütundan çıkar, Hero'nun altına bağımsız mini "Hızlı Teklif" bölümü olarak taşı (CNCScrollStory öncesine)
- "Disiplinli Operasyon, Güvenilir Üretim" badge'ini kaldır — CTA butonlarına odak ver
- Hero'yu full-width tek sütun yap: büyük headline ortada, CTA'lar altta, arka planda video + parallax
- Headline rotate interval'ı 3s → 4s, `AnimatePresence` exit'e 100ms buffer ekle

---

## 2. CNCScrollStory (6/10 → 9/10)

**Sorunlar:** Frame'ler 404 olursa siyah canvas, 500vh çok uzun, mobilde basit fallback.

**Aksiyonlar:**
- `ready` state'e timeout fallback ekle: 5 saniye sonra hâlâ `!ready` ise statik poster göster (siyah ekran engellensin)
- Scroll mesafesini `500vh` → `350vh`'e düşür
- Mobil fallback'e parallax image efekti ekle (şu an düz statik görsel)
- Story overlay text'lerine subtle backdrop-blur ekle (okunabilirlik)

---

## 3. NexusPromoSection (7/10 → 9/10)

**Sorunlar:** Dashboard mockup statik, feature açıklamaları generic.

**Aksiyonlar:**
- Dashboard mockup'a subtle scan-line animasyonu ekle (CSS `@keyframes` — canlılık hissi)
- Feature açıklamalarını CNC'ye özel concrete metriklerle güncelle ("78 aktif sipariş", "3.2s ortalama CMM ölçüm" gibi)
- Mockup kartına hover'da hafif `scale(1.02)` + glow border ekle

---

## 4. HowWeWorkSection (7/10 → 9/10)

**Sorunlar:** Section'a girişte boş alan, ilk kart ekranda yok.

**Aksiyonlar:**
- Header opacity range'ini `[0, 0.05]`'e çek — kullanıcı section'a girer girmez başlık görünsün
- İlk kartın x offset'ini `75%` → `40%`'e düşür — giriş anında kart kısmen görünsün
- Her kartın checklist öğelerine stagger reveal ekle (scroll'a bağlı)

---

## 5. CertificationsSection (4/10 → 9/10) — EN KRİTİK

**Sorunlar:** Sadece text marquee, logo yok, çok soluk, çok dar, filler hissi.

**Aksiyonlar:**
- Her sertifika için SVG/ikon badge ekle (ISO kalkan ikonu, AS9100 havacılık ikonu vb.)
- Opacity 0.5 → 0.8
- Padding `py-6` → `py-12 md:py-16`
- Arka plana subtle metalik doku/gradient ekle
- Marquee hızını 20s → 25s (daha zarif)
- Sertifika adının altına küçük açıklama satırı ekle ("Kalite Yönetimi" gibi)

---

## 6. VideoScrollSection (6/10 → 9/10)

**Sorunlar:** Typo "ÜÜHENDİSLİK", feature kartları scroll-reveal yok, 200vh uzun.

**Aksiyonlar:**
- Typo düzelt: "ÜÜHENDİSLİK" → "MÜHENDİSLİK"
- Feature kartlarına scroll-driven stagger opacity ekle (şu an hepsi static opacity:1)
- Scroll height'ı `200vh` → `150vh`'e düşür
- `autoPlay` + `preload="none"` çelişkisini çöz: `preload="metadata"` yap

---

## 7. Aurora "Çözümlerimizi Keşfedin" (3/10 → 9/10) — KRİTİK

**Sorunlar:** Sadece başlık, CTA yok, 50vh boş alan, değer üretmiyor.

**Aksiyonlar:**
- Bu section'ı tamamen kaldır — Services section'ın kendi başlığı yeterli
- Alternatif: Aurora'yı ServicesSection'ın header'ına embed et (ayrı section yerine)

---

## 8. ServicesSection (7/10 → 9/10)

**Sorunlar:** Tüm kartlarda aynı CTA metni, video lazy-mount doğrulanmalı.

**Aksiyonlar:**
- Her karta özel CTA metni: "Frezeleme Detayları", "Torna İşleme", "Yüzey İşleme" vb.
- Video lazy-mount'un çalıştığını doğrula (sadece hover'da `<video>` render)
- Kart hover'da title'ın hafif yukarı kayması (translateY -4px)

---

## 9. IndustriesSection (5/10 → 9/10) — KRİTİK

**Sorunlar:** 13 endüstri eşit ağırlıkta, wall of cards, monoton.

**Aksiyonlar:**
- İlk 5 endüstriyi büyük kartlarla göster (Havacılık, Savunma, Otomotiv, Medikal, Robotik)
- Kalan 8 endüstriyi küçük chip/badge grid olarak alt satıra taşı
- 3D canvas'ı kaldır — her karta gerçek fotoğrafı (zaten var: `imgAerospace` vb.) daha belirgin göster
- Masaüstü card-stack scroll yüksekliğini azalt (13×40vh → 5×50vh ana kartlar)

---

## 10. ProjectShowcase (8/10 → 9/10)

**Sorunlar:** Kartlarda görsel yok (sadece gradient), 4 proje az.

**Aksiyonlar:**
- Her karta arka plan olarak gerçek proje fotoğrafı/render ekle (gradient üzerinde)
- En az 2 proje daha ekle (6 toplam)
- Kart genişliğini `w-[75vw]` → `w-[80vw]` yap

---

## 11. MaterialMorphScroll (5/10 → 9/10)

**Sorunlar:** Frame'ler 404 olursa siyah canvas, floating kart kısa süre görünüyor.

**Aksiyonlar:**
- CNCScrollStory ile aynı timeout fallback mekanizmasını uygula
- Floating properties kartının görünürlük aralığını genişlet: `[0.35, 0.82]` → `[0.25, 0.88]`
- Mobil fallback'e malzeme özellikleri kartını da ekle (şu an sadece başlık var)

---

## 12. MaterialsSection (7/10 → 9/10)

**Aksiyonlar:**
- `BlurImage` bileşenine `forwardRef` ekle (console uyarısı)
- Kart hover efektine subtle border-glow ekle (molten renk)

---

## 13. WhyUsSection (7/10 → 9/10)

**Aksiyonlar:**
- Advantage kartlarına scroll-driven stagger ekle
- Clip-path reveal'ın mobilde de çalıştığını doğrula

---

## 14. CapabilitiesSection (7/10 → 9/10)

**Aksiyonlar:**
- Tablo satırlarına hover highlight ekle
- Counter animasyonu başlangıcını viewport giriş anına bağla

---

## 15. StatsSection (7/10 → 9/10)

**Aksiyonlar:**
- Counter sayılarına GSAP `TextPlugin` veya mevcut animasyona subtle glow efekti ekle
- Stat kartlarına stagger reveal ekle

---

## 16. TestimonialsSection (6/10 → 9/10)

**Sorunlar:** `randomuser.me` fake avatarlar, büyük marka isimleri (TAI, ASELSAN, Ford Otosan) gerçek değilse güven kırıcı.

**Aksiyonlar:**
- Avatar'ları kaldır — yerine şirket logosu veya baş harfi ikonu koy
- Şirket isimlerini gerçek müşteri listesiyle (`clients` dizisi zaten var: Emir Alüminyum, Mert Teknik vb.) değiştir
- İsimleri anonim yap veya sadece unvan + şirket göster

---

## 17. FAQBlogSection (7/10 → 9/10)

**Aksiyonlar:**
- Blog kartlarına hover'da subtle image zoom efekti ekle
- FAQ accordion açılma animasyonunu smooth yap (height transition)

---

## 18. FinalCTASection (8/10 → 9/10)

**Sorunlar:** GSAP innerHTML React ile çakışma riski.

**Aksiyonlar:**
- `GsapCtaHeadline` bileşeninde `aria-label`'ı koru ama `useLayoutEffect` kullan (flicker önleme)
- Sweep overlay'a subtle grain texture ekle

---

## 19. GENEL İYİLEŞTİRMELER (Tüm Section'ları Etkiler)

- **Aurora section'ı kaldır** — Index.tsx'den çıkar
- **SectionDivider'ları doğru renk eşleştirmesi** ile kontrol et (her geçişte önceki/sonraki bg rengine uyumlu)
- **PageLoader z-index** → `z-[9999]` olduğunu doğrula
- **Console uyarılarını temizle** — `forwardRef` eksik bileşenlere ekle

---

## ÖNCELİK SIRASI

```text
Sıra  Section                    Mevcut  Hedef  Efor
────  ─────────────────────────  ──────  ─────  ────
1     CertificationsSection      4/10    9/10   Orta
2     Aurora section kaldır       3/10    —      Düşük
3     IndustriesSection           5/10    9/10   Yüksek
4     VideoScrollSection typo+    6/10    9/10   Orta
5     CNCScrollStory fallback    6/10    9/10   Orta
6     MaterialMorphScroll         5/10    9/10   Orta
7     TestimonialsSection         6/10    9/10   Orta
8     HeroSection refactor       8/10    9/10   Yüksek
9     ProjectShowcase görseller   8/10    9/10   Orta
10    HowWeWorkSection offset    7/10    9/10   Düşük
11    NexusPromoSection           7/10    9/10   Düşük
12    ServicesSection             7/10    9/10   Düşük
13    WhyUs/Capabilities/Stats   7/10    9/10   Düşük
14    FinalCTA/FAQ/Materials     7-8/10  9/10   Düşük
```

## TEKNİK DETAY

Toplam **11 dosya** büyük değişiklik, **8 dosya** küçük iyileştirme alacak. Aurora section kaldırılması ile sayfa 1 section kısalacak. IndustriesSection'da 13→5+8 chip yapısı en büyük refactor. Hero'da CAD upload'ın ayrı section'a taşınması layout değişikliği gerektirir.

