

# Mevcut Supabase Altyapi Dokumantasyonu -- Tam SQL Kurulum Betigi

Bu plan, mevcut veritabanindaki **tum tablolari, fonksiyonlari, RLS politikalarini ve kisitlamalari** tek bir SQL dosyasina derleyecektir. Bu dosya referans dokumantasyon olarak saklanacak ve gerektiginde sifirdan kurulum icin kullanilabilecektir.

---

## Kapsam

Asagidaki bilesenlerin tamami tek bir SQL dosyasinda yer alacaktir:

- 1 Enum tanimlama (`app_role`)
- 2 Security Definer fonksiyon (`has_role`, `is_staff`)
- 1 Trigger fonksiyonu (`update_updated_at_column`)
- 13 Tablo olusturma (customers, rfqs, orders, wbs, meetings, issues, financial_documents, machine_health, maintenance_logs, tool_inventory, raw_materials, faq_analytics, user_roles)
- Tum RLS politikalari (toplam ~45 politika)
- CHECK kisitlamalari (customers tablosu)
- Storage bucket tanimlamalari (referans olarak)

---

## Olusturulacak Dosya

**`docs/supabase-full-setup.sql`** -- Tek bir referans SQL dosyasi

### Dosya Yapisi (sirali):

```text
1. Hazirlik (enum, fonksiyonlar, trigger)
2. Tablo olusturma (13 tablo)
3. Foreign key iliskileri
4. CHECK kisitlamalari
5. RLS etkinlestirme
6. RLS politikalari (tablo bazinda gruplu)
7. Trigger baglama
8. Storage bucket notlari
9. Admin kullanici atama ornegi
```

---

## Teknik Detaylar

### Bolum 1: Enum ve Fonksiyonlar

- `app_role` enum: `admin`, `staff`, `production`, `quality`
- `has_role(uuid, app_role)`: Belirli bir rolun varligini kontrol eder (SECURITY DEFINER)
- `is_staff(uuid)`: user_roles tablosunda herhangi bir kaydinin olup olmadigini kontrol eder (SECURITY DEFINER)
- `update_updated_at_column()`: Trigger fonksiyonu, `updated_at` sutununu otomatik gunceller

### Bolum 2: 13 Tablo

Her tablo `CREATE TABLE IF NOT EXISTS` ile olusturulacak, mevcut sutun tipleri, default degerler ve nullable ayarlari birebir korunacaktir.

### Bolum 3: RLS Politikalari

Her tablo icin ayri ayri:
- `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`
- Tum RESTRICTIVE politikalar (`PERMISSIVE: No`) dogru komutlarla (SELECT/INSERT/UPDATE/DELETE)
- `has_role()` ve `is_staff()` fonksiyonlari kullanilarak

Ornek yapi:
- **customers**: Staff okuma/yazma/guncelleme, Admin silme
- **financial_documents**: Sadece Admin (tum islemler)
- **rfqs**: Anonim INSERT (kisitli), Staff okuma/guncelleme, Admin silme
- **meetings**: `user_id = auth.uid()` bazli sahiplik kontrolu
- **user_roles**: Admin tum roller, kullanici kendi rolu

### Bolum 4: CHECK Kisitlamalari

customers tablosundaki mevcut kisitlamalar:
- name, company: max 200 karakter
- city: max 100 karakter
- phone: max 30 karakter
- email: max 255 karakter + format regex

---

## Onemli Notlar

- Bu dosya **referans ve yedek** amaclidir. Mevcut canli veritabanini degistirmez.
- `CREATE TABLE IF NOT EXISTS` ve `CREATE POLICY IF NOT EXISTS` / `DO $$ ... $$` bloklari kullanilarak idempotent (tekrar calistirilabilir) yazilacaktir.
- Dosya icinde aciklama satirlari Turkce olacaktir.

