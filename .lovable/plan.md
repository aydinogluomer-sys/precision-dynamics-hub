

## Plan: 3 Düzeltme — Üretim Realtime, Fiyat Verme Akışı, Tarih Bazlı Durum

### 1. UretimTab: Realtime dinleme ve status uyumu

**Sorun**: UretimTab `["Beklemede", "Üretimde", "Sevkiyata Hazır"]` statüleriyle filtreliyor ama OrdersView artık `["Hazırlık", "Üretimde", "Kalite Kontrol", "Paketleme", "Tamamlandı"]` kullanıyor. Ayrıca realtime subscription yok.

**Dosya**: `src/components/musteri/UretimTab.tsx`
- Status filtresini `["Hazırlık", "Üretimde", "Kalite Kontrol", "Paketleme"]` olarak güncelle ("Tamamlandı" hariç)
- Supabase realtime channel ekle (`postgres_changes` on `orders` table) — admin güncellediğinde müşteri paneli otomatik yenilensin
- Badge renk mapping'ini yeni statülere uyarla

### 2. Admin RFQManager: Fiyat verme akışının iyileştirilmesi + Müşteri paneli status rengi

**Sorun**: Admin panelinde yeni gelen RFQ'lar `null` veya `"pending"` statusuyla geliyor. "Yeni" filtresi bunları yakalamıyor. Ayrıca müşteri panelinde "Fiyat Verildi" için özel renk yok.

**Dosya**: `src/components/admin/RFQManager.tsx`
- `filtered` mantığını güncelle: "Yeni" filtresi `null`, `"pending"`, `"Yeni"` statuslarını kapsasın
- Filter sayılarında da aynı mantığı uygula

**Dosya**: `src/components/musteri/TekliflerimTab.tsx`
- `statusColor` fonksiyonuna `"Fiyat Verildi"` case'i ekle (mavi/cyan tonu)
- "Fiyat Verildi" statüsündeki RFQ'ları "Fiyat Bekleyenler" sekmesinden ayır — bu tekliflere fiyat verilmiş, müşteri onay bekliyor

### 3. TekliflerimTab: 1 haftadan eski RFQ'larda "Yeni" badge'i kaldırma

**Dosya**: `src/components/musteri/TekliflerimTab.tsx`
- `created_at` alanını da select sorgusuna ekle
- Status gösteriminde: eğer status "Yeni" veya null ise ve `created_at` 7 günden eskiyse, badge'i "Beklemede" olarak göster ("Yeni" yerine)
- RFQ interface'ine `created_at` ekle

### Değişecek Dosyalar
1. `src/components/musteri/UretimTab.tsx` — realtime + status uyumu
2. `src/components/admin/RFQManager.tsx` — "Yeni" filtre düzeltmesi
3. `src/components/musteri/TekliflerimTab.tsx` — Fiyat Verildi rengi + 1 hafta kuralı

