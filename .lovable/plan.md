

# Müşteri Paneli — 9 Bölüm Kapsamlı Test Raporu

Tüm bileşenleri kod düzeyinde inceledim. Aşağıda her bölümdeki buton/özellik ve testten geçip geçmediği listelenmiştir.

---

## TESTTEN GEÇENLER (Sorunsuz)

### 1. Genel Bakış
- Stat kartları (6 adet) — veri çekimi ve gösterimi sorunsuz
- Son Siparişler listesi — progress bar ve badge doğru
- Son Teklif Talepleri listesi — fiyat ve durum gösterimi doğru
- Skeleton loading — sorunsuz

### 2. Tekliflerim
- 4 sekmeli tab yapısı (Fiyat Bekleyenler, Fiyat Verildi, Onaylananlar, Reddedilenler) — doğru filtreleme
- "Yeni Teklif Talebi" butonu — `/teklif-al` sayfasına Link ile yönlendiriyor, sorunsuz
- "Onayla" butonu — `supabase.update` ile status güncelliyor, loading state var, sorunsuz
- CAD dosya genişletme (Paperclip butonu) — signed URL yükleme mantığı detaylı ve doğru
- CAD preview (lazy loaded) — sorunsuz

### 3. Siparişlerim
- Tablo gösterimi — sorunsuz
- Progress bar — sorunsuz
- "Teklif talebi oluşturun" link (boş durum) — sorunsuz

### 4. Üretim Takip
- 5 aşamalı step progress — sorunsuz
- Overall progress bar — sorunsuz
- Realtime subscription — sorunsuz

### 5. Teknik Arşiv
- Dosya listesi ve signed URL — sorunsuz
- Download butonu — sorunsuz
- CAD inline preview — sorunsuz

### 6. Kalite Raporları
- Rapor listesi — sorunsuz
- Download butonu — sorunsuz
- Type badge renklendirmesi — sorunsuz

### 7. Finans
- Özet kartları (3 adet) — sorunsuz
- Fatura tablosu — sorunsuz

### 8. Destek
- "Yeni Talep" butonu ve form — sorunsuz
- Ticket listesi ve genişletme — sorunsuz
- Mesaj gönderme (reply) — sorunsuz
- Realtime subscription — sorunsuz

### 9. Header
- Dark/Light mode toggle — sorunsuz
- "Ana Sayfa" linki — sorunsuz

### Sidebar
- 9 menü navigasyonu — sorunsuz
- Çıkış butonu — sorunsuz

---

## TESTTEN GEÇMEYENLER (Sorunlu / Eksik)

### 1. Siparişlerim — "Yeniden Sipariş" Butonu
- **Sorun**: `window.location.href = "/teklif-al"` kullanıyor. React Router SPA'da `window.location.href` tam sayfa yenilemeye neden olur ve state kaybedilir. Ayrıca `handleReorder` fonksiyonu sipariş bilgilerini (part_name, material, quantity) `/teklif-al` sayfasına aktarmıyor — sadece toast gösterip sayfayı yeniliyor.
- **Düzeltme**: `useNavigate()` ile yönlendirmeli ve sipariş bilgilerini state olarak aktarmalı.

### 2. Ödeme — Kart ile Ödeme Dialog
- **Sorun**: "Kart ile Ödeme" dialogu sadece Visa/Mastercard/Stripe logolarını ve "Geri Dön" butonunu gösteriyor. Gerçek bir ödeme formu (kart numarası, son kullanma, CVV) veya Stripe Checkout entegrasyonu yok. Kullanıcı bu dialogu açtığında ödeme yapamaz.
- **Düzeltme**: Stripe Checkout entegrasyonu eklemeli veya en azından "Stripe ile ödeme yakında aktif olacak" uyarısı gösterilmeli.

### 3. Ödeme — Çek Dialogu Veri Kaydetmiyor
- **Sorun**: Çek formu (çek numarası, banka, vade, tutar) doldurulup "Çek Bilgilerini Gönder" butonuna basıldığında sadece `toast.success()` gösteriyor. Form verileri hiçbir yere kaydedilmiyor (Supabase'e INSERT yok). Input değerleri state'e bağlı değil (uncontrolled inputs).
- **Düzeltme**: Form verilerini state ile kontrol etmeli ve Supabase'e (support_tickets veya ayrı bir tablo) kaydetmeli.

### 4. Ödeme — Havale Dialogu `selectedPayment` null Olabilir
- **Sorun**: Üst kısımdaki "Havale / EFT" butonuna tıklandığında `setSelectedPayment(null)` yapılıyor ama dialog içinde `selectedPayment?.doc_number` ve `selectedPayment?.total_amount` gösteriliyor. Bu durumda fatura bilgisi "— ₺0" olarak görünür, yanıltıcıdır.
- **Düzeltme**: `selectedPayment` null ise "Genel bilgi" metni göstermeli veya fatura seçimi zorunlu kılınmalı.

### 5. Finans — Download Butonu Raw URL Kullanıyor
- **Sorun**: `d.file_urls[0]` değerini direkt `href` olarak kullanıyor. Bu Supabase Storage path'i ise (örn: `user_id/dosya.pdf`), doğrudan erişilemez — signed URL gerekir. Teknik Arşiv'de bu doğru yapılmış ama Finans'ta yapılmamış.
- **Düzeltme**: `createSignedUrl` kullanarak indirme URL'si oluşturmalı.

### 6. Header — Arama Çubuğu Devre Dışı
- **Sorun**: `disabled` ve `cursor-not-allowed` ile kapatılmış. Tooltip ile "yakında aktif olacak" yazıyor ama kullanıcı deneyimi açısından ya kaldırılmalı ya da çalışır hale getirilmeli.
- **Düzeltme**: Basit bir client-side arama (teklif/sipariş/destek arasında) implemente edilmeli veya tamamen kaldırılmalı.

### 7. Header — Bildirim Butonu Devre Dışı
- **Sorun**: `opacity-60 cursor-not-allowed` ile devre dışı. Kırmızı badge gösteriliyor ama tıklanamıyor. Bu, kullanıcıyı yanıltıcı — okunmamış bildirim varmış gibi görünüyor.
- **Düzeltme**: Ya badge'i kaldırmalı ya da bildirim sistemi implemente edilmeli.

### 8. MusteriSidebar — `forwardRef` Uyarısı
- **Sorun**: Console'da `"Function components cannot be given refs"` hatası var. `MusteriMobileSidebar` bileşeni Sheet içinde `MusteriSidebar`'ı kullanıyor ve Radix Dialog ref geçirmeye çalışıyor ama `MusteriSidebar` bir function component olduğu için ref kabul edemiyor.
- **Düzeltme**: `MusteriSidebar`'ı `React.forwardRef` ile sarmalı.

---

## Özet Tablo

| # | Bölüm | Sorun | Öncelik |
|---|-------|-------|---------|
| 1 | Siparişlerim | "Yeniden Sipariş" full page reload + veri aktarmıyor | Orta |
| 2 | Ödeme | Kart ödeme dialogu boş (Stripe entegrasyonu yok) | Yüksek |
| 3 | Ödeme | Çek formu veri kaydetmiyor | Yüksek |
| 4 | Ödeme | Havale dialogu selectedPayment null iken yanıltıcı | Düşük |
| 5 | Finans | Download butonu signed URL kullanmıyor | Orta |
| 6 | Header | Arama çubuğu devre dışı | Düşük |
| 7 | Header | Bildirim butonu devre dışı + sahte badge | Düşük |
| 8 | Sidebar | forwardRef console hatası | Düşük |

Onay verirseniz bu 8 sorunu öncelik sırasına göre düzeltmeye başlayabilirim.

