

# Çalışmayan, Kullanılmayan ve Sorunlu Kod Denetimi

## 1. KULLANILMAYAN GSAP HOOKLARİ VE BİLEŞENLERİ

### 1a. `GsapTextReveal` bileşeni — ASLA IMPORT EDİLMİYOR
- **Dosya:** `src/components/GsapTextReveal.tsx`
- **Sorun:** Bu bileşen hiçbir yerde kullanılmıyor. Hiçbir dosyada `from "@/components/GsapTextReveal"` import'u yok.
- **Durum:** Ölü kod (dead code)

### 1b. `useGsapHorizontalScroll` hook'u — ASLA KULLANILMIYOR
- **Dosya:** `src/hooks/use-gsap.ts` (satır 98-130)
- **Sorun:** `ProjectShowcase.tsx` kendi inline GSAP ScrollTrigger kodunu yazıyor, bu hook'u kullanmıyor.
- **Durum:** Ölü kod

### 1c. `useGsapParallax` hook'u — ASLA KULLANILMIYOR
- **Dosya:** `src/hooks/use-gsap.ts` (satır 139-175)
- **Sorun:** Hiçbir bileşende import edilmiyor.
- **Durum:** Ölü kod

### 1d. `useGsapTextReveal` hook'u — SADECE ölü `GsapTextReveal.tsx` tarafından kullanılıyor
- **Dosya:** `src/hooks/use-gsap.ts` (satır 12-90)
- **Sorun:** Tek consumer'ı `GsapTextReveal.tsx` ama o da hiçbir yerde kullanılmıyor. Dolaylı ölü kod.

---

## 2. REVEAL `line-split` VARİANTI — ASLA KULLANILMIYOR

- **Dosya:** `src/components/ui/Reveal.tsx` (satır 65-107, 131-136)
- **Sorun:** `LineSplit` alt bileşeni oluşturulmuş ama hiçbir yerde `variant="line-split"` ile çağrılmıyor. `SectionHeader.tsx` hâlâ standart `direction="up"` kullanıyor.
- **Durum:** Ölü kod — plan "section başlıklarında kullan" diyordu ama entegre edilmedi.

---

## 3. IMAGE SEQUENCE DOSYALARI — MUHTEMELEN EKSİK VEYA BOŞ

- **Sorun:** `CNCScrollStory` 120 frame (`/sequence-cnc/frame_0001.webp` … `frame_0120.webp`), `MaterialMorphScroll` 80 frame (`/sequence-material/frame_0001.webp` … `frame_0080.webp`) bekliyor.
- **Risk:** Bu dizinler `public/` altında var ama **içlerinde gerçekten 120+80 adet webp dosyası yoksa**, canvas boş kalır, loading spinner sonsuza kadar döner veya ilk frame gösterilip geri kalanı siyah kalır. `onerror` handler'ı frame'i `null` yapıp `onLoad` çağırıyor — yani 404'ler sessizce yutulur ve `ready` state yanlış pozitif verir.
- **Etki:** Hem `CNCScrollStory` hem `MaterialMorphScroll` masaüstünde boş/siyah canvas gösterebilir.

---

## 4. `machine-loop.mp4` VİDEO REFERANSLARI — ÇALIŞIYOR AMA PERFORMANS RİSKİ

- **Dosya:** 4 yerde kullanılıyor (`ServicesSection`, `CapabilitiesSection`, `Malzemeler`, `ServiceDetail`)
- **Sorun:** `ServicesSection`'da **her bir kart** için ayrı bir `<video>` elementi oluşturuluyor (5 adet). Tüm videolar `autoPlay loop muted` ile yükleniyor — hover olmasa bile. `opacity: 0` CSS ile gizlense de, video decode işlemi devam ediyor.
- **Etki:** Mobilde video `hidden md:block` ile gizleniyor ama DOM'da hâlâ var ve `autoPlay` sebebiyle decode olabilir.

---

## 5. `ScrollReveal.tsx` vs `Reveal.tsx` — İKİ PARALEL SİSTEM

- **Dosya:** `src/components/ScrollReveal.tsx` ve `src/components/ui/Reveal.tsx`
- **Sorun:** İki farklı reveal sistemi paralel yaşıyor:
  - `ScrollReveal.tsx`: `TextReveal`, `Parallax`, `SlideIn`, `ScaleReveal`, `StaggerContainer`, `StaggerItem` (5 bileşende aktif kullanılıyor)
  - `Reveal.tsx`: `clip`, `word-stagger`, `line-split` variant'ları (sadece `ProjectShowcase` kullanıyor)
- **Etki:** Duplicate mantık, tutarsız API, `line-split` variant kullanılmıyor.

---

## 6. `SectionDivider` — YER ALDIĞI AMA ETKİSİ SINIRLI

- **Dosya:** `src/components/ui/SectionDivider.tsx` + `src/pages/Index.tsx`
- **Sorun:** `Index.tsx`'de sadece 2 yere eklenmiş (`ProjectShowcase` öncesi ve `FinalCTA` öncesi). Planın hedeflediği "tüm section geçişlerinde curved SVG divider" gerçekleşmedi.
- **Etki:** Çoğu section geçişi hâlâ düz kesim.

---

## 7. `PageLoader` — isFirstVisit BAĞIMLILIĞI

- **Dosya:** `src/components/PageLoader.tsx` + `src/pages/Index.tsx`
- **Sorun:** `PageLoader` sadece `isFirstVisit=true` iken render ediliyor (sessionStorage ile kontrol). İkinci ziyaretten sonra hiç gösterilmez — bu tasarım gereği. Ancak `isFirstVisit` state'i `Index.tsx` içinde oluşturuluyor ve `PageLoader` ile `Header`'a geçiliyor. `PageLoader`'ın `onComplete` callback'i `Header`'ın gösterilme zamanlamasını etkilemiyor — header hemen visible.
- **Etki:** PageLoader animasyonu sürerken header'ın arkasında görünebilir (z-index çakışması riski).

---

## 8. HEADER NAV UNDERLINE — DROPDOWN'LU LİNKLERDE YOK

- **Dosya:** `src/components/Header.tsx` (satır 373-374, 388-389)
- **Sorun:** Underline animasyonu yalnızca `!item.isBold && !item.isFire` koşulunda ekleniyor (Link'ler için) ve `!item.isBold && !item.hasDropdown` koşulunda (button'lar için). Dropdown'lu nav öğeleri (Hizmetler, Kabiliyetler, Endüstriyel) underline almıyor — bu design choice olabilir ama "beaucoup tarzı" hedefle tutarsız.

---

## 9. FinalCTASection `GsapCtaHeadline` — GSAP + FRAMER MOTION ÇAKIŞMASI

- **Dosya:** `src/components/FinalCTASection.tsx` (satır 8-70)
- **Sorun:** `GsapCtaHeadline` GSAP ile DOM'u manipüle ediyor (`el.innerHTML = ...`) ama aynı zamanda içinde React children (satır 65-68) var. GSAP `el.innerHTML`'yi üzerine yazıyor, React children hiç render edilmiyor (aslında GSAP innerHTML ile değiştiriliyor). Bu durumda React'in DOM reconciliation'ı ile GSAP'ın DOM manipülasyonu çakışabilir.
- **Etki:** Şu an çalışıyor gibi görünüyor çünkü `innerHTML` override ediyor ama React rerender'da beklenmeyen davranış riski var.

---

## 10. `ProjectShowcase` GSAP CARD ANIMATION — containerAnimation REF

- **Dosya:** `src/components/ProjectShowcase.tsx` (satır 70-90)
- **Sorun:** Card stagger'da `containerAnimation: tween` kullanılıyor. `tween` bir GSAP Tween referansı — bu `gsap.to()` return değerinden alınıyor. Ancak `gsap.context()` içinde oluşturuluyor ve `tween` değişkeni closure'da yakalanıyor. Bu genelde çalışır ama `invalidateOnRefresh: true` ile resize'da tekrar hesaplanırken sıkıntı çıkarabilir.

---

## ÖZET TABLOSU

```text
#   Sorun                                   Tip         Etki
──  ──────────────────────────────────────  ──────────  ─────────────────────
1a  GsapTextReveal kullanılmıyor            Ölü kod     Gereksiz bundle
1b  useGsapHorizontalScroll kullanılmıyor   Ölü kod     Gereksiz bundle
1c  useGsapParallax kullanılmıyor           Ölü kod     Gereksiz bundle
1d  useGsapTextReveal dolaylı ölü           Ölü kod     Gereksiz bundle
2   Reveal line-split hiç kullanılmıyor     Ölü kod     Plan hedefi eksik
3   Image sequence frame'leri eksik/boş?    Potansiyel  Canvas siyah kalır
4   5x video decode (ServicesSection)       Performans  Gereksiz GPU/CPU
5   İki paralel reveal sistemi              Tutarsız    Bakım zorluğu
6   SectionDivider yetersiz entegrasyon     Eksik       Plan hedefi eksik
7   PageLoader z-index çakışma riski        Görsel      Header overlap
8   Dropdown linkler underline almıyor      Tasarım     Tutarsızlık
9   GSAP innerHTML + React children         Risk        Rerender hatası
10  containerAnimation resize riski          Risk        Edge case bug
```

## ÖNERİLEN AKSİYONLAR

1. **Ölü kodu temizle:** `GsapTextReveal.tsx` sil, `use-gsap.ts`'den kullanılmayan hook'ları kaldır, `Reveal.tsx`'den `line-split`'i kaldır VEYA `SectionHeader`'a entegre et.
2. **Image sequence audit:** `/sequence-cnc` ve `/sequence-material` dizinlerindeki dosya sayısını doğrula, eksikse fallback poster göster.
3. **ServicesSection video optimize et:** Video'yu tek bir ref ile paylaş veya hover'da lazy load et.
4. **Reveal sistemlerini birleştir:** `ScrollReveal.tsx` ve `Reveal.tsx`'i tek bir API altında topla.
5. **GsapCtaHeadline'ı güvenli yap:** React children'ı kaldır (GSAP zaten innerHTML yazıyor) veya ref-based yaklaşıma geç.
6. **SectionDivider'ı daha fazla geçişe ekle** (plan gereği).
7. **PageLoader z-index'ini header'ın üstünde tut** (z-50+ olmalı).

