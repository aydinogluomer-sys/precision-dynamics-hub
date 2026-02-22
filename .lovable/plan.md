

# NEXUS Admin Dashboard -- UI/UX Gelistirme ve Hata Duzeltme Plani

## Tespit Edilen Sorunlar

### 1. Konsol Hatalari (Kritik)
- **OrdersView ref hatasi**: `OrdersView` bilesenine ref atanmaya calisiyor ama `forwardRef` kullanilmiyor. Bu, `AdminDashboard`'da ref kullanimindan kaynaklaniyor.
- **MobileSidebar DialogTitle eksik**: Sheet/Dialog bileseninde `DialogTitle` ve `Description` eksik -- erisilebilirlik uyarisi veriyor.

### 2. Kaynak Yerlisimi (SchedulingView)
- Tamamen statik/hardcoded veri kullaniyor -- Supabase'e bagli degil.
- "Bos" hucrelere is atama butonu yok -- islevsiz gorunuyor.

### 3. Dashboard (DashboardHome)
- "Tam Gorunum" butonu hicbir sey yapmiyor (onClick yok).
- Tum veriler statik/hardcoded -- Supabase'den cekilmiyor.
- Light modda grafik tooltip'leri koyu tema renklerinde kaliyor (hardcoded `backgroundColor: "#1E293B"`).

### 4. Finansal Analitik (FinancialView)
- Tamamen statik veri -- hesaplayici calisir ama MHR tablosu sabit.
- Ayarlar'daki parametrelerle entegre degil.

### 5. Satis Pipeline (PipelineView)
- Tamamen statik veri -- Supabase'e bagli degil.
- Pipeline asamalarindaki sayilar hardcoded, gercek deal verisiyle eslesmiyor.

### 6. Sistem Ayarlari (SettingsView)
- Input'lar `defaultValue` kullaniyor -- degisiklikler kaydedilmiyor (Save butonu yok).
- Rol tablosundaki Switch/toggle'lar islevsiz.
- API Key gorunumu statik.

### 7. Nakit Akisi (FinanceDocsView)
- Parasut senkronizasyon butonu calisir ama API key'leri yoksa sessizce hata verir.
- Modal'larda `DialogTitle` ve erisilebilirlik eksik (div tabanlı modal kullaniliyor).

### 8. Light Mode Uyumsuzluklari
- Grafik tooltip'leri her zaman koyu tema renklerinde.
- Bazi badge ve durum gostergeleri light modda okunamaz hale gelebilir.

### 9. Mobil Sidebar (MobileSidebar)
- Sheet iceriginde `DialogTitle` ve `DialogDescription` eksik (erisilebilirlik hatasi).

### 10. Header
- Arama cubugu islevsiz (hicbir sey aramaz).
- Bildirim butonu islevsiz (onClick yok).

---

## Uygulama Plani

### Adim 1: Konsol Hatalarini Duzelt
- `MobileSidebar.tsx`'e `DialogTitle` ve `DialogDescription` ekle (`VisuallyHidden` ile).
- `OrdersView` ref sorununu duzelt.

### Adim 2: Dashboard Light Mode Duzeltmeleri
- Grafik tooltip stillerini `dark:` prefix'li CSS yerine dinamik tema algilama ile duzelt.
- Tum modullerde light/dark uyumunu kontrol et.

### Adim 3: Dashboard Islevsiz Butonlari Duzelt
- "Tam Gorunum" butonuna `onClick` ekle (scheduling tabina gecis).
- Header arama cubuguna temel filtreleme islevi ekle veya kaldir.
- Bildirim butonuna bir bildirim dropdown'u ekle veya gorsel olarak deaktif et.

### Adim 4: SettingsView Kaydetme Islevi
- `defaultValue`'lari `value` + `onChange` yapisina cevir.
- "Kaydet" butonu ekle.
- Verileri localStorage'da veya state'de tut (Supabase tablosu yok).

### Adim 5: SchedulingView Iyilestirmesi
- Bos hucrelere tiklandiginda kucuk bir tooltip/indicator goster.
- Genel UI polish: hover efektleri, gecis animasyonlari.

### Adim 6: PipelineView Stage Sayilarini Duzelt
- Asamalardaki sayilari gercek `deals` dizisinden hesapla (hardcoded yerine).

### Adim 7: Genel UI/UX Polish
- Tum modullerde tutarli bosluk, kenar yuvarlakligi ve animasyon kullan.
- Tum custom modal'lara (RFQ, Issues, Customers, FinanceDocs) erisilebilirlik ekle.
- Export CSV butonunun duzgun calistigini dogrula.

---

## Teknik Detaylar

### Dosya Degisiklikleri
| Dosya | Degisiklik |
|-------|-----------|
| `MobileSidebar.tsx` | DialogTitle + VisuallyHidden ekle |
| `AdminDashboard.tsx` | OrdersView ref sorununu duzelt |
| `DashboardHome.tsx` | "Tam Gorunum" onClick, tooltip tema duzeltmesi |
| `SettingsView.tsx` | Controlled input + Kaydet butonu |
| `PipelineView.tsx` | Stage count'lari dinamik hesapla |
| `SchedulingView.tsx` | Bos hucre UI iyilestirmesi |
| `AdminHeader.tsx` | Arama ve bildirim butonlari duzeltmesi |

### Degismeyen Dosyalar
- `RFQManager.tsx` -- tam islevsel (Supabase CRUD + realtime)
- `WBSView.tsx` -- tam islevsel (Supabase CRUD + adim ilerletme)
- `TPMView.tsx` -- tam islevsel (Supabase veri + realtime)
- `InventoryView.tsx` -- tam islevsel (Supabase veri + realtime)
- `IssuesView.tsx` -- tam islevsel (Supabase CRUD + cozumleme)
- `CustomersView.tsx` -- tam islevsel (Supabase CRUD + ekleme)
- `FinanceDocsView.tsx` -- tam islevsel (CRUD + OCR + filtreleme)

