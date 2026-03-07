

## Plan: 5 Admin Panel Geliştirmesi

### Mevcut Durum Özeti
- **WBSView**: `wbs` tablosundan veri çeker, 6 adımlı ilerleme gösterir. RFQ onayıyla bağlantı yok.
- **SchedulingView**: Haftalık makine-gün grid'i, `orders` tablosundan iş atama. Atamalar sadece state'te, DB'ye kayıt yok.
- **SupportView**: Ticket listesi + mesajlaşma. Admin yeni ticket oluşturamıyor. Durum değişikliği müşteri panelinde realtime değil.
- **PipelineView**: Tamamen hardcoded demo veri. DB bağlantısı yok.
- **CustomersView**: `customers` tablosu ile CRUD. Alanlar: name, company, city, phone, email. CSV import yok.

---

### 1. RFQ Onayı → WBS Otomatik Kaydı + Müşteri Paneli Yansıması

**DB Değişikliği**: `wbs` tablosuna `order_id text`, `user_id uuid` sütunları ekle.

**RFQManager.tsx** (`handleApprove`): Sipariş oluşturma bloğunun yanına `wbs` insert ekle:
- `id`: `WBS-{rfq.id.slice(0,6)}`
- `customer`, `part_name`, `total_qty` → rfq'dan
- `current_step`: 0, `status`: "active"
- `order_id`: oluşturulan order ID
- `user_id`: rfq.user_id

**WBSView.tsx**: `advanceStep` fonksiyonunda aynı `order_id`'ye sahip `orders` kaydının `status`'ünü da güncelle (step 2→Üretimde, 4→Kalite Kontrol, 5→Tamamlandı). Bu sayede müşteri panelindeki `UretimTab` otomatik güncellenir (zaten realtime dinliyor).

**Müşteri RLS**: `wbs` tablosuna `user_id = auth.uid()` SELECT policy ekle (opsiyonel — orders üzerinden zaten yansıyor).

### 2. Kaynak Yerleşimi (SchedulingView) — DB Persistance + Planlama

**DB Değişikliği**: Yeni `machine_schedule` tablosu:
- `id uuid PK default gen_random_uuid()`
- `machine text NOT NULL`
- `day text NOT NULL` (Pazartesi-Cuma)
- `week_start date NOT NULL` (haftanın başlangıç tarihi)
- `order_id text` (orders referansı)
- `job_name text`
- `hours numeric default 4`
- `notes text`
- `created_at timestamptz default now()`
- RLS: Staff CRUD

**SchedulingView.tsx**:
- Sayfa yüklendiğinde `machine_schedule` + ilgili `orders` verisi çek
- Hafta seçici ekle (önceki/sonraki hafta navigasyonu)
- `assignOrder` fonksiyonunu DB insert'e çevir
- Atanan hücreye tıklayınca silme/düzenleme imkanı
- Grid'deki boş hücreye tıklayınca mevcut orders modal'ı açılsın (şu an çalışıyor)

### 3. Admin → Müşteriye Doğrudan Mesaj + Durum Değişikliği Realtime

**SupportView.tsx**:
- "Yeni Mesaj Gönder" butonu ekle → müşteri seçme dropdown'u (profiles tablosundan) + konu + mesaj alanları
- Bu buton yeni bir `support_tickets` kaydı oluşturur (admin tarafından, `is_staff` ile işaretli ilk mesajla)
- `updateTicketStatus` zaten çalışıyor

**DestekTab.tsx** (müşteri paneli):
- Realtime subscription ekle (`support_tickets` ve `support_messages` tabloları)
- Admin durum değiştirdiğinde müşteri panelinde otomatik güncelleme

### 4. Pipeline — DB Bağlantısı + CSV/Excel Import

**DB Değişikliği**: Yeni `pipeline_leads` tablosu:
- `id uuid PK default gen_random_uuid()`
- `company text`
- `contact_name text`
- `contact_email text`
- `stage text default 'prospect'`
- `value numeric default 0`
- `probability integer default 0`
- `last_action text`
- `notes text`
- `created_at timestamptz default now()`
- `updated_at timestamptz default now()`
- RLS: Staff CRUD, Admin DELETE

**PipelineView.tsx**: Tam yeniden yazım:
- Hardcoded veri yerine `pipeline_leads` tablosundan çek
- "Yeni Lead Ekle" butonu + modal (firma, kişi, e-posta, değer, aşama)
- "CSV/Excel İçe Aktar" butonu: dosya seçici → `FileReader` ile parse → toplu insert
- CSV format: `firma,kişi,e-posta,değer,aşama`
- Aşama filtresi ve KPI'lar mevcut yapıda kalacak ama DB'den hesaplanacak
- Outreach templates bölümü korunacak

### 5. Çözüm Ortakları (CustomersView) — Alan Değişikliği

**DB Değişikliği**: `customers` tablosuna yeni sütunlar:
- `short_name text` (kısa isim)
- `address text` (açık adres)
- `tax_info text` (vergi bilgileri)
- `iban text` (IBAN numaraları)

Mevcut `name` sütunu "Firma Unvanı" olarak kullanılacak. `balance`, `last_order` korunacak.

**CustomersView.tsx**:
- Form alanlarını güncelle: "Ad Soyad" → "Firma Unvanı" (name), yeni: "Kısa İsim" (short_name), "E-Posta" (email), "Açık Adres" (address), "Vergi Bilgileri" (tax_info), "IBAN Numaraları" (iban)
- Kart görünümünde yeni alanları göster
- Fiyat ve kişi ad soyad alanlarını kaldır

---

### Değişecek Dosyalar
1. **DB Migration**: `wbs` + `customers` tabloları güncelleme, `machine_schedule` + `pipeline_leads` tabloları oluşturma
2. `src/components/admin/RFQManager.tsx` — WBS insert ekle
3. `src/components/admin/WBSView.tsx` — adım ilerletmede orders status sync
4. `src/components/admin/SchedulingView.tsx` — DB persistence + hafta seçici
5. `src/components/admin/SupportView.tsx` — doğrudan mesaj gönderme
6. `src/components/musteri/DestekTab.tsx` — realtime subscription
7. `src/components/admin/PipelineView.tsx` — DB bağlantısı + CSV import
8. `src/components/admin/CustomersView.tsx` — alan değişikliği

