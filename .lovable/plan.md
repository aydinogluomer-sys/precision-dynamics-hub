

## Plan: RFQ Onayından Üretim Günlüğüne Otomatik Akış ve İlerleme Takibi

### Mevcut Durum
- `orders` tablosunda `progress` (0-100), `status`, `quantity`, `part_name`, `customer`, `rfq_ref`, `user_id` sütunları var.
- RFQ onaylandığında (`handleApprove`) sadece fatura oluşturuluyor, `orders` tablosuna kayıt düşmüyor.
- `OrdersView` sadece listeliyor, güncelleme yapılamıyor.
- Müşteri panelindeki `UretimTab` zaten 5 aşamalı progress bar ile `orders` tablosunu okuyor.

### Yapılacaklar

#### 1. DB Migration: `orders` tablosuna üretim parametreleri ekle
Yeni sütunlar:
- `completed_qty` (integer, default 0) — o ana kadar tamamlanan adet
- `qc_passed_qty` (integer, default 0) — kalite kontrolden geçen adet
- `packed_qty` (integer, default 0) — paketlenen adet
- `machine` (text, nullable) — atanan tezgah
- `notes` (text, nullable) — üretim notları

Progress otomatik hesaplanacak: üretim ağırlığı %50, kalite %30, paketleme %20 formülüyle.

#### 2. RFQManager: Onay sırasında `orders` tablosuna kayıt oluştur
`handleApprove` fonksiyonuna, fatura oluşturma bloğunun yanına `orders` insert ekle:
- `id`: `ORD-{rfq.id.slice(0,6)}` formatında
- `rfq_ref`: rfq.id
- `customer`: rfq.customer
- `part_name`: rfq.service + rfq.material
- `quantity`: rfq.quantity
- `user_id`: rfq.user_id
- `status`: "Hazırlık"
- `progress`: 0
- `order_date`: bugün

#### 3. OrdersView: Satıra tıklayınca üretim parametrelerini güncelleme paneli
Her satıra tıklanınca açılan bir modal/dialog:
- `completed_qty` input (örn: 100 adetten 35'i yapıldı)
- `qc_passed_qty` input
- `packed_qty` input
- `status` dropdown (Hazırlık / Üretimde / Kalite Kontrol / Paketleme / Tamamlandı)
- `machine` input
- `notes` textarea
- Kaydet butonu → Supabase update + progress otomatik hesaplama

Progress hesaplama formülü (client-side, kayıt sırasında):
```
progress = Math.round(
  (completed_qty / quantity) * 50 +
  (qc_passed_qty / quantity) * 30 +
  (packed_qty / quantity) * 20
)
```

Bu sayede admin parametreleri günceldikçe progress %0→%100 arasında değişir ve müşteri panelindeki `UretimTab` bunu gerçek zamanlı görür.

### Dosya Değişiklikleri
1. **DB Migration**: `orders` tablosuna 5 yeni sütun
2. **`src/components/admin/RFQManager.tsx`**: `handleApprove` içine orders insert
3. **`src/components/admin/OrdersView.tsx`**: Satır tıklama → güncelleme dialog'u ekle

