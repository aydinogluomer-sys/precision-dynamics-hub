

# Musteri Paneli: Koruma + Zengin Ozellikler

## 1. Musteri icin ProtectedRoute olustur

Mevcut `ProtectedRoute` admin icin tasarlanmis (`user_roles` tablosunu kontrol ediyor ve `/admin/login`'e yonlendiriyor). Musteriler icin farkli bir koruma bilesenine ihtiyac var:

- **Yeni bileseni olustur:** `CustomerProtectedRoute` -- sadece oturum kontrolu yapar (rol kontrolu yok, cunku musterilerin `user_roles` tablosunda kaydi yok).
- Giris yapilmamissa `/giris` sayfasina yonlendirir.
- `MusteriPaneli` icindeki manuel oturum kontrolunu kaldir (artik route seviyesinde yapiliyor).
- `App.tsx`'te `/musteri-paneli` rotasini `CustomerProtectedRoute` ile sar.

## 2. Musteri Panelini Zenginlestir (Tab Yapisi)

Mevcut panelde sadece statik kartlar ve placeholder veriler var. Bunlari gercek, kullanilabilir sekmelere donusturecegiz:

### Tab Yapisi:
- **Genel Bakis** (varsayilan) -- Hos geldin mesaji, istatistik kartlari, son aktiviteler
- **Siparislerim** -- Musterinin siparislerini listeleyen tablo (durum, ilerleme, tarih)
- **Teklif Taleplerim** -- Musterinin gonderdigi RFQ'lari gosteren tablo
- **Odeme Takibi** -- Fatura durumu, vadesi gecen/bekleyen odemeler
- **Uretim Durumu** -- Aktif uretimdeki parcalarin ilerleme durumu (WBS verisi)

### Veri Kaynaklari:
Mevcut tablolar (orders, rfqs, wbs, financial_documents) admin/staff RLS politikalarina sahip. Musterilerin kendi verilerini gorebilmesi icin:

### Veritabani Degisiklikleri:
- `orders` tablosuna `user_id` (uuid, nullable, FK -> auth.users) kolonu ekle
- `rfqs` tablosuna `user_id` (uuid, nullable, FK -> auth.users) kolonu ekle  
- Her iki tabloya musteri icin SELECT RLS politikasi ekle: `auth.uid() = user_id`
- Boylece musteriler sadece kendi siparis ve tekliflerini gorebilir

### UI Bilesenleri:
- Radix Tabs kullanilarak sekme navigasyonu
- Her sekme icin:
  - Veri varsa: Tablo gorunumu (tarih, durum badge'leri, ilerleme cubugu)
  - Veri yoksa: Bos durum mesaji + aksiyona yonlendirme
- Profil bilgileri sol tarafta sabit kalir

## Teknik Detaylar

### Dosya Degisiklikleri:
1. **Yeni:** `src/components/CustomerProtectedRoute.tsx` -- Sadece oturum kontrolu, `/giris`'e yonlendirme
2. **Guncelle:** `src/App.tsx` -- `/musteri-paneli` rotasini `CustomerProtectedRoute` ile sar
3. **Guncelle:** `src/pages/MusteriPaneli.tsx` -- Tab yapisi, gercek veri sorgulari, zengin UI
4. **Veritabani:** Migration -- `orders` ve `rfqs` tablolarina `user_id` kolonu + RLS politikalari

### Siralama:
1. Veritabani migration'i (user_id kolonlari + RLS)
2. CustomerProtectedRoute bilesenini olustur
3. App.tsx'te rotayi sar
4. MusteriPaneli'ni tab yapisiyla yeniden tasarla

