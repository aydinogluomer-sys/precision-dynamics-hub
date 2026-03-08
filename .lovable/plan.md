

# "Teklif Al" + "CAD Dashboard" Birleştirme Planı

## Mevcut Durum

- **TeklifAl** (`/teklif-al`): 4 adımlı wizard (Dosya Yükle → Özellikler → İncele → Gönder). Sol kolon adım içeriği, sağ kolon özet/destek kartları. Basit 3D önizleme (sabit ComplexPart modeli). Header + Footer var.
- **CADDashboard** (`/cad-dashboard`): Parça tablosu (arama, sıralama, sayfalama) + 3D Viewer (STL/OBJ/STEP yükleme, wireframe, renk, grid, fullscreen) + Sağ panel sekmeler (Parça Bilgileri, Benzer Parçalar, RFQ formu). Header var, Footer yok.

## Birleştirme Fikri

**Tek sayfa (`/teklif-al`)** üzerinden ikisini entegre etmek. Önerilen yaklaşım:

### Yapı: Adım 1'de CAD Dashboard'u Göm

```text
┌─────────────────────────────────────────────────────┐
│  Header + Stepper (4 adım)                          │
├────────────────────────────┬────────────────────────┤
│  ADIM 1: CAD YÜKLEME      │  Sağ Panel             │
│  ┌──────────────────────┐  │  ┌──────────────────┐  │
│  │ Dosya yükleme alanı  │  │  │ Tabs:            │  │
│  │ (drag & drop)        │  │  │ - Parça Bilgileri │  │
│  ├──────────────────────┤  │  │ - 3D Ayarları     │  │
│  │ 3D Viewer            │  │  │ - Kalite Güvence  │  │
│  │ (toolbar, grid,      │  │  └──────────────────┘  │
│  │  wireframe, renk,    │  │                        │
│  │  fullscreen, gizmo)  │  │                        │
│  └──────────────────────┘  │                        │
│  ┌──────────────────────┐  │                        │
│  │ Parça Tablosu        │  │                        │
│  │ (çoklu dosya/parça)  │  │                        │
│  └──────────────────────┘  │                        │
├────────────────────────────┴────────────────────────┤
│  ADIM 2-4: Mevcut haliyle (Özellikler/İncele/Gönder)│
└─────────────────────────────────────────────────────┘
```

### Detaylar

1. **Adım 1 — Gelişmiş CAD Yükleme**:
   - Mevcut basit dosya yükleme alanını CAD Dashboard'un gelişmiş 3D viewer'ı ile değiştir
   - STL/OBJ/STEP dosya yükleme + gerçek zamanlı 3D görüntüleme (toolbar, wireframe, renk, grid, fullscreen, gizmo)
   - Dosya yüklenmeden önce: drag-drop alanı göster
   - Dosya yüklendikten sonra: tam 3D viewer + toolbar göster
   - Parça tablosunu opsiyonel olarak göster (çoklu parça yüklenince)

2. **Adım 2-4 — Mevcut akış korunur**:
   - Özellikler, İnceleme, Gönderim adımları aynen kalır
   - Sağ kolondaki "Canlı Teklif Özeti" kartı korunur

3. **Sağ panel adaptasyonu**:
   - Adım 1'de: Parça bilgileri sekmesi + 3D ayarları (renk/wireframe/grid toggle)
   - Adım 2+'de: Mevcut teklif özeti + kalite güvence kartları

4. **CADDashboard sayfasını kaldır veya `/teklif-al`'a yönlendir**:
   - `/cad-dashboard` rotası → `/teklif-al`'a redirect

### Teknik Değişiklikler

| Dosya | İşlem |
|-------|-------|
| `src/pages/TeklifAl.tsx` | CAD Dashboard'un 3D viewer bileşenlerini (STL/OBJ/STEP loader, toolbar, canvas) buraya taşı. Adım 1'i genişlet. |
| `src/pages/CADDashboard.tsx` | Silinecek veya redirect bileşenine dönüştürülecek |
| `src/App.tsx` | `/cad-dashboard` rotasını `/teklif-al`'a redirect olarak güncelle |

### Avantajlar
- Kullanıcı tek bir akışta hem dosya yükleyip 3D görüntüleyebilir hem teklif gönderebilir
- Gereksiz sayfa duplikasyonu ortadan kalkar
- Profesyonel CAD viewer deneyimi doğrudan teklif sürecine entegre olur

