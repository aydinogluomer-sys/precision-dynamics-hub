
# MAS TECHNIC - Kapsamli Gelistirme Plani (10 Madde)

Bu plan, musteri paneli ve admin paneli arasindaki entegrasyonu guclendiren, odeme altyapisini kuran ve hCaptcha ekleyen kapsamli bir gelistirme planidir.

---

## 1. hCaptcha Entegrasyonu (Admin + Musteri Giris)

Admin paneline (`/admin/login`) ve musteri giris sayfasina (`/giris`) hCaptcha widget'i eklenecek.

**Teknik Detaylar:**
- `@hcaptcha/react-hcaptcha` paketi yuklenecek
- `Login.tsx` ve `AdminLogin.tsx` dosyalarina hCaptcha bilesenini ekle
- `signInWithPassword` ve `signUp` cagrrilarina `options.captchaToken` parametresi ekle
- hCaptcha site key, Supabase Dashboard'daki Bot Protection ayarlariyla eslesmeli (kullanicinin Supabase'de hCaptcha secip ayarlamasi gerekecek)

**Dosyalar:** `Login.tsx`, `AdminLogin.tsx`

---

## 2-3. Kredi Karti Butonunda "Visa, Mastercard, Stripe" Yazisi ve Ikonlari

`OdemeTab.tsx` dosyasinda:
- "Kredi / Banka Karti" butonundaki alt yazi "Visa, Mastercard, Stripe" olarak guncellenecek
- Visa, Mastercard ve Stripe ikonlari SVG olarak inline eklenecek (CDN URL'leri guvenilir olmadigi icin)
- Kart odeme dialog'undaki ikon alani da ayni sekilde guncellenecek

**Dosyalar:** `OdemeTab.tsx`

---

## 4. Destek Mesajlari Akisi Aciklamasi

Mevcut durum:
- Musteri `support_tickets` tablosuna yeni kayit olusturur (subject, message, user_id)
- Mesajlasma `support_messages` tablosunda tutulur (ticket_id, user_id, message, is_staff)
- **Admin panelinde su an destek taleplerini goruntuleyen bir modül YOK** - yalnizca `IssuesView` (Olay Merkezi) var ama bu uretim sorunlari icin

**Yapilacak:** Admin paneline "Destek Talepleri" modulu eklenecek:
- `AdminSidebar.tsx`'e "Destek" menu ogesi ekle
- `AdminDashboard.tsx`'e yeni view import'u ekle
- Yeni `SupportView.tsx` bileseni: tum ticketlari listeler, durumu degistirir, staff mesaji gonderir
- Staff mesajlari `is_staff: true` ile kaydedilir ve musteri tarafinda gorunur (zaten mevcut)

**Dosyalar:** Yeni `src/components/admin/SupportView.tsx`, `AdminSidebar.tsx`, `AdminDashboard.tsx`

---

## 5. Odeme Mantigi ve Finans Kurgusu

**Mevcut Durum:** `financial_documents` tablosu bos. Odeme sekmesi 0 TL gosteriyor cunku hicbir fatura kaydedilmemis.

**Kurgu:**
1. Admin panelinde bir teklif (RFQ) "Onaylandi" durumuna gectiginde, otomatik olarak `financial_documents` tablosuna bir fatura kaydi olusturulacak (doc_type: 'fatura', total_amount: quoted_price, payment_status: 'odenmedi', user_id: rfq.user_id)
2. Musteri "Finans" sekmesinde tum faturalarini, vade tarihlerini ve toplam borcunu gorur
3. Musteri "Odeme" sekmesinde odenmemis faturalari gorur ve odeme yapabilir
4. Vadeli odeme takibi: due_date alani uzerinden geciken odemeleri takip

**Teknik Adimlar:**
- `RFQManager.tsx` icindeki `sendQuote` fonksiyonunu guncelle: fiyat verildiginde `quoted_price` ve `price_valid_until` degerlerini rfqs tablosuna kaydet
- Teklif onaylandiginda (admin veya musteri tarafindan) `financial_documents`'a otomatik fatura kaydi olustur
- `FinansTab.tsx` ve `OdemeTab.tsx` zaten bu tablodan veri cekiyor, veri olustugunda calisacak

**Dosyalar:** `RFQManager.tsx`, `TekliflerimTab.tsx` veya yeni edge function

---

## 6. Odeme Yansimasi (Kart/Havale/Cek -> Finans)

Musteri odeme yaptiginda:
- **Havale/EFT:** Musteri dekont bildirir -> admin panelinde onaylanir -> `financial_documents.payment_status` "odendi" olarak guncellenir
- **Cek:** Cek bilgileri `support_tickets` veya yeni bir `payment_notifications` tablosuna kaydedilir -> admin panelinde gorulur ve onaylanir
- **Kart (Stripe):** Stripe entegrasyonu aktif oldugunda otomatik olarak odeme durumu guncellenir

**Teknik Adimlar:**
- Cek form'undaki "Gonder" butonunu gercek bir Supabase insert'e bagla (support_tickets'a veya yeni tabloya)
- Admin paneline odeme bildirimi goruntuleme ve onaylama ozeligi ekle
- Onay verildiginde `financial_documents.payment_status` guncellenir

**Dosyalar:** `OdemeTab.tsx`, yeni admin bileseni

---

## 7. Admin RFQ Onay/Red Sistemi (Aciklama ile)

**Mevcut Durum:** `RFQManager.tsx`'de "Onayla" ve "Reddet" butonlari var ama:
- Red sebebi yazilmiyor
- Musteri paneline bildirim gitmiyor (ama musteri `rfqs` tablosundaki status degisikligini goruyor)

**Yapilacak:**
- Red butonuna tiklandiginda bir dialog acilacak, red sebebi yazilacak
- `rfqs` tablosuna `rejection_reason` (text) sutunu eklenecek (migration)
- Musteri panelinde `TekliflerimTab.tsx` red sebebini gosterecek
- Onay verildiginde `financial_documents`'a fatura kaydi olusturulacak

**Dosyalar:** `RFQManager.tsx`, `TekliflerimTab.tsx`, DB migration

---

## 8. Admin Panel Tasarimini Musteri Paneline Uyarla

Admin paneli koyu tema (`dark:bg-[#0F172A]`) kullanirken musteri paneli standart light tema kullanior. Iki panelin tutarli olmasi icin:
- Musteri panelinin genel layout yapisini admin paneldeki sidebar + header yapisina benzer sekilde duzenleme
- Renk paleti ve tipografi tutarliligi saglama
- Tab bar stilini admin paneldeki keskin, modern gorunume yakinlastirma

**Not:** Bu gorsel bir uyarlama oldugundan, islevsellik degismeyecek. Temel degisiklikler CSS siniflari ve layout yapisinda olacak.

**Dosyalar:** `MusteriPaneli.tsx`, `MusteriHeader.tsx`, ilgili tab bilesenler

---

## 9. Admin'den Musteri'ye Icerik Paylasimi (Resim/Kalite)

**Mevcut Durum:**
- `quality_reports` tablosu var, `user_id` ile musteriye bagli ve RLS ile musteri kendi raporlarini gorebiliyor
- `customer_files` tablosu da ayni sekilde calisiyor
- Admin tarafindan `staff manage` RLS politikasi ile ekleme yapilabiliyor

**Sonuc:** Altyapi zaten mevcut. Sadece admin panelinde bu tablolara kolayca veri ekleyecek bir UI gerekiyor:
- Admin paneline "Kalite Raporu Yukle" ve "Musteri Dosyasi Paylas" butonlari ekle
- Bu butonlarla admin bir musteri secip dosya yukleyecek
- `user_id` dogru atandiginda musteri panelinde otomatik gorunecek

**Dosyalar:** Admin tarafina yeni bilesenler veya mevcut `CustomersView.tsx` icerisine entegre

---

## 10. Tum Ozelliklerin Listesi ve Test Plani

### Musteri Paneli Ozellikleri:
1. **Genel Bakis** - Ozet istatistikler (teklif, siparis, destek sayilari)
2. **Tekliflerim** - RFQ listeleme, fiyat goruntuleme, onaylama
3. **Siparislerim** - Siparis takibi, yeniden siparis
4. **Uretim** - 5 asamali canli takip
5. **Teknik Arsiv** - CAD/cizim dosya yukleme ve indirme
6. **Kalite** - CMM/QC raporlari goruntuleme
7. **Finans** - Fatura listesi, odenen/odenmemis ozet
8. **Odeme** - Kart/Havale/Cek ile odeme
9. **Destek** - Ticket olusturma ve mesajlasma

### Admin Paneli Ozellikleri:
1. **Kontrol Paneli** - Dashboard grafikleri
2. **Talep Merkezi** - RFQ yonetimi, fiyat verme, onay/red
3. **Uretim Gunlugu** - Siparis takibi
4. **Is Akis Hatti** - WBS yonetimi
5. **Kaynak Yerlesimi** - Zamanlama
6. **Finansal Analitik** - Gelir/gider analizi
7. **Satis Pipeline** - Satis sureci takibi
8. **TPM & Bakim** - Makine bakimi
9. **Envanter & Takim** - Stok yonetimi
10. **Nakit Akisi** - Fatura/OCR yonetimi
11. **Olay Merkezi** - Sorun takibi
12. **Cozum Ortaklari** - Musteri yonetimi
13. **Sistem Ayarlari** - Genel ayarlar
14. **(Yeni) Destek Talepleri** - Musteri destek yonetimi

### Gercek Veri Testleri:
- RFQ olusturma -> Admin fiyat verme -> Musteri onaylama -> Fatura olusturulmasi -> Odeme akisi
- Destek ticket olusturma -> Admin cevaplama -> Musteri goruntuleme
- Dosya paylasimi -> Musteri tarafinda goruntulenme
- Bu testler uygulama onaylandiktan sonra browser tool ile yapilacak

---

## Uygulama Sirasi

1. DB migration: `rfqs` tablosuna `rejection_reason` sutunu ekle
2. hCaptcha entegrasyonu (Login + AdminLogin)
3. OdemeTab ikon ve yazi guncellemesi
4. Admin Destek Talepleri modulu
5. RFQ onay/red mekanizmasi (admin) + fatura olusturma
6. Odeme bildirim mekanizmasi
7. Admin'den musteri dosya/kalite raporu paylasimi
8. Tasarim uyumu
9. Test ve dogrulama

---

## Onemli Notlar
- hCaptcha icin kullanicinin Supabase Dashboard'da hCaptcha provider'i secmis ve site key/secret key'i ayarlamis olmasi gerekir
- Stripe entegrasyonu henuz aktif degil, kart odeme placeholder olarak kalacak
- Tum RLS politikalari mevcut ve dogru calisiyorlar
