

# Kapsamli UI/UX Denetim ve CAD Drop Entegrasyonu Plani

## Tespit Edilen UI/UX Hatalari

### Kritik Sorunlar

1. **Header "Teklif Al" butonu kesiliyor** - Desktop gorunumde sag ust kosedeki "Teklif Al" butonu "Iletisim" linki ile ust uste biniyor. Nav itemlarin genisligi header alanina sigmiyor.

2. **Header nav linkleri sayfa ici anchor (#) kullaniyor** - SSS, Hakkimizda, Iletisim gibi linkler artik ayri sayfalara (`/sss`, `/hakkimizda`, `/iletisim`) sahip olmasina ragmen header'da hala `#sss`, `#neden-biz`, `#iletisim` seklinde anchor linkleri kullaniyor. Bu linkler sadece ana sayfada calisiyor, diger sayfalardan erisim saglanmiyor.

3. **Endüstriler bolumu oncesinde buyuk beyaz bosluk** - Industries section'dan once yaklasik 150-200px'lik bos beyaz alan var. Bu VideoScrollSection veya Services arasindaki bosluktan kaynaklaniyor.

4. **Mobilde Hero icerik eksik** - Mobilde hero'da aciklama metni ve 3D model bolumleri alt alta dusuyor ama istatistikler (tolerans, teklif suresi, malzeme) gorunmuyor veya cok asagida kaliyor.

5. **Mobilde CAD Drop Zone gorsel bozuklugu** - Mobilde CAD dosya birakim alani cok dar ve metin kesiliyor, iconlar hizasiz.

6. **FAQBlogSection: "Tum Yazilar" link rengi farkli** - FAQ kisminda "Tum Sorular" linki `text-primary` iken Blog kisminda "Tum Yazilar" linki `text-muted-foreground` renkte. Tutarsiz.

7. **FinalCTASection butonlari** - "Teklif Al" butonu yazi gorunmuyor (beyaz border + beyaz yazi, arka plan da acik renk olabilir), "Portfolyomuz" butonunda hover state gecis problemi.

8. **HowWeWorkSection sticky panel** - Sol taraftaki faz detaylari guncelleniyor ancak IntersectionObserver threshold'u nedeniyle bazen yanlis fazi gosteriyor. Ayrica `min-h-[80vh]` kartlar arasinda cok fazla bosluk yaratiyor.

9. **WebGL performans uyarilari** - 3D CNC modeli GPU stall uyarilari veriyor. Mobilde WebGL fallback sorunu mevcut.

10. **Video autoplay mobilde sorunlu olabilir** - iOS'ta muted + playsInline olmasina ragmen bazi durumlarda video baslamiyor olabilir.

### Orta Duzey Sorunlar

11. **Malzeme kartlarinda hover gorseli yok** - Kartlar sade gorunuyor, hover animasyonu onceki degisikliklerde eklenmis olmali ama gorsel dosyalarin yuklenmesi sorunlu olabilir.

12. **StatsSection useCountUp hook kurallarini ihlal ediyor** - `useCountUp` hook'u `.map()` icinde cagrilmis. Bu React Hook kurallarina aykiri (hooks cannot be called inside loops).

13. **Testimonials bolumunde cift tirnak** - `"` karakteri ile baslayip yine `"` ile quote metni sariliyor, gorsel olarak cift tirnak gorunuyor.

---

## Uygulama Plani

### Adim 1: Supabase Storage Bucket Olusturma
- `cad-uploads` adinda public bir storage bucket olustur
- Uygun RLS politikasi ekle (anon kullanicilar upload edebilsin)

### Adim 2: CAD Drop Zone'u Gercek Dosya Yukleme Formuna Donustur
- `HeroSection.tsx`'deki CAD drop zone'a hidden `<input type="file">` ekle
- Drag-and-drop event handler'lari ekle (`onDrop`, `onDragOver`, `onDragLeave`)
- Kabul edilen dosya turleri: `.step`, `.stp`, `.iges`, `.igs`, `.dxf`, `.sldprt`, `.sldasm`, `.pdf`
- Dosya secildikten sonra Supabase Storage'a yukle
- Yukleme durumunu goster (progress bar, spinner)
- Basarili yukleme sonrasi teklif formuna/sayfasina yonlendir
- `rfqs` tablosuna dosya yolunu kaydet

### Adim 3: Header Nav Linkleri Duzelt
- `Hakkimizda`, `SSS`, `Iletisim` linklerini `react-router-dom` Link componentine cevir
- Ana sayfa icindeki bolum linklerini (`#hizmetler`, `#kabiliyetler`, `#malzemeler`) aynen birak
- Sayfa icindeyken scroll, ayri sayfa ise navigate et

### Adim 4: Header Teklif Al Butonu Tasma Duzelt
- Nav items gap'ini kuculterek veya font boyutunu ayarlayarak tasmayi onle
- Teklif Al butonunun genisligini responsive yap

### Adim 5: Beyaz Bosluk Duzelt
- Sections arasindaki gereksiz padding/margin degerlerini kontrol et ve duzelt
- Ozellikle Industries section oncesindeki boslugu kaldir

### Adim 6: FAQBlogSection Renk Tutarliligi
- "Tum Yazilar" linkini "Tum Sorular" ile ayni renge (`text-primary`) cevir

### Adim 7: FinalCTASection Buton Gorseli
- "Hemen Teklif Al" butonuna dolgu arka plan ekle (bg-white text-primary veya ters kontrast)
- Butonlarin hover durumlarini duzelt

### Adim 8: HowWeWorkSection Sticky Mantik Iyilestirme
- IntersectionObserver `rootMargin` ve `threshold` degerlerini optimize et
- Kart yuksekligini `min-h-[60vh]` veya daha makul bir deger yap
- Gecis animasyonlarini netlestir (bulanikligi kaldir)

### Adim 9: StatsSection Hook Kurali Duzelt
- `useCountUp` hook'unu map icinden cikar
- Her stat icin ayri bir `StatCard` componenti olustur ve hook'u orada cagir

### Adim 10: Mobil Iyilestirmeler
- Hero bolumunde mobilde 3D modeli gizle veya boyutunu kucult (WebGL performans sorunu)
- CAD drop zone mobilde tam genislikte ve okunabilir olsun
- Video scroll bolumunde mobilde video boyutunu optimize et

### Adim 11: Kucuk Gorsel Duzeltmeler
- Testimonials cift tirnak sorununu duzelt
- Malzeme kartlarinin hover gorsellerini kontrol et

---

## Teknik Detaylar

### Supabase Storage Yapilandirmasi
```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('cad-uploads', 'cad-uploads', true);

CREATE POLICY "Allow public upload to cad-uploads"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'cad-uploads');

CREATE POLICY "Allow public read from cad-uploads"
ON storage.objects FOR SELECT
USING (bucket_id = 'cad-uploads');
```

### CAD Upload Akisi
```text
Kullanici dosya secer/surukler
  -> Client-side dosya turu dogrulama
  -> Supabase Storage'a upload
  -> rfqs tablosuna kayit ekle (dosya yolu ile)
  -> Basari mesaji goster
  -> Teklif formuna yonlendir
```

### Dosya Boyutu Siniri
- Maks 50MB (STEP/IGES dosyalari icin yeterli)
- Client-side ve upload sirasinda kontrol

### Degisecek Dosyalar
- `src/components/HeroSection.tsx` - CAD upload fonksiyonalitesi + mobil duzeltmeler
- `src/components/Header.tsx` - Nav linkleri + overflow duzeltmesi
- `src/components/HowWeWorkSection.tsx` - Sticky mantik iyilestirmesi
- `src/components/FAQBlogSection.tsx` - Link renk tutarliligi
- `src/components/FinalCTASection.tsx` - Buton kontrast duzeltmesi
- `src/components/StatsSection.tsx` - Hook kurali duzeltmesi
- `src/components/TestimonialsSection.tsx` - Cift tirnak duzeltmesi
- `src/components/IndustriesSection.tsx` veya `src/components/ServicesSection.tsx` - Bosluk duzeltmesi
- `src/pages/Index.tsx` - Section spacing ayarlari

