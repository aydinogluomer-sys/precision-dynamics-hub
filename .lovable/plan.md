

# Teklif Al Sayfasi - Referans Gorunume Uygun Yeniden Tasarim

## Mevcut Durum
Teklif Al sayfasi (/teklif-al) su an karanlik bir hero bolumu ve 4 adimli bir form sihirbazi olarak calisiyor. Kullanicinin istegi, sayfanin referans goruntudeki profesyonel CAD Dashboard gorunumune donusturulmesi.

## Hedef Gorunum (Referans Gorsele Gore)
Referans gorseldeki arayuz su bilesenlerden olusuyor:

1. **Ust Kisim - Parca Tablosu**: Tam genislikte, satirlarda checkbox, satir numarasi, indirme ikonu ve 12 sutunlu veri tablosu. 5. satir secili ve pembe vurgulu. Altinda "Sikistirilmis gorunumu goster" butonu.

2. **Alt Sol (%60) - 3D Viewer ve Arac Cubugu**:
   - Ust arac cubugu: 3D/Kamera/2D/Olcum ikonlari, "3D Search" dropdown, "Tavsiyeler" butonu, pembe "CAD (1) Indir" butonu, paylasim ikonlari
   - Sol dikey arac cubugu: Liste, Poligon, Kesit ikonlari
   - 3D Canvas: Placeholder model (flans/silindir), XYZ eksen cizgileri
   - Sag ust: ViewCube (GizmoHelper)
   - Sag alt: AR ve Tam Ekran butonlari

3. **Alt Sag (%40) - Bilgi Sekmeleri**:
   - 3 sekme: "Parca bilgileri", "Benzer parcalar", "Request for quote (RFQ)"
   - Parca bilgileri: Baslik, key-value veri listesi, renkli badge'ler (CAD, Components, LIBRARY, system)

## Uygulama Plani

### Adim 1: TeklifAl.tsx Sayfasini Tamamen Yeniden Yazmak
Mevcut 4 adimli sihirbaz yapisini kaldirip, referans gorseldeki tek sayfa CAD Dashboard duzeniyle degistirecegiz. Bu aslinda CADDashboard.tsx dosyasindaki yapi ile neredeyse ayni ama TeklifAl sayfasina ozel olarak uyarlanacak.

Yeni sayfa yapisi:
- Header bilesenini koruyoruz
- Hero bolumunu kaldiriyoruz (veya cok kucuk tutuyoruz)
- Sayfa icerigini 3 ana bolume ayiriyoruz: Tablo, 3D Viewer, Bilgi/RFQ Paneli

### Adim 2: Parca Tablosu (Ust Kisim)
- shadcn/ui Checkbox kullanan satirlar
- 12 sutun: Ident Number, Length, Head Dia, Body Dia, Head Thickness, Inside Dia, Step, Hole Distance, Cbore Dia, Drill, Inside OD, Depth
- Sutun basliklarinda kalem (Pencil) ikonu
- Siralama ve arama ozellikleri
- 5. satir (SB 4335-60) secili ve pembe vurgulu
- Sayfalama ve "Sikistirilmis gorunum" butonu

### Adim 3: Alt Panel - Ikiye Bolunmus Duzen
**Sol Panel (3D Viewer):**
- Ust arac cubugu: 3D, Kamera, 2D, Olcum, 3D Search dropdown, Tavsiyeler, pembe CAD Indir butonu, Paylas ikonu
- Sol dikey mini arac cubugu (List, PenTool, Scissors)
- Three.js Canvas ile placeholder model (silindir/flans)
- axesHelper ile XYZ eksen cizgileri
- GizmoHelper/GizmoViewport ile ViewCube
- Sag alt: AR ve Fullscreen butonlari
- Dosya yukleme (STL/OBJ/STEP) destegi

**Sag Panel (Bilgi Sekmeleri):**
- shadcn/ui Tabs: "Parca bilgileri", "Benzer parcalar", "Request for quote (RFQ)"
- Parca bilgileri: DME - Sprue Bushings basligi, key-value bilgiler, renkli Badge'ler
- Benzer parcalar: Listeli oneri kartlari
- RFQ: Basit iletisim formu (Firma, E-posta, Adet, Notlar, Gonder butonu)

### Adim 4: ModelViewer Entegrasyonu
- Mevcut ModelViewer bileseni yerine, CADDashboard'daki gibi dogrudan Canvas icerisinde STL/OBJ/STEP yukleme destegi saglayacagiz
- OrbitControls ile model dondurme
- Grid, wireframe, renk degistirme kontrolleri

## Teknik Detaylar

### Degistirilecek Dosyalar
1. **src/pages/TeklifAl.tsx** - Tamamen yeniden yazilacak (mevcut sihirbaz yapisi kaldirilip CAD Dashboard duzenine gecilecek)

### Korunacak Islevsellik
- STL/OBJ/STEP dosya yukleme ve 3D gosterim
- RFQ formu (RFQ sekmesi icerisinde kalacak)
- Supabase'e veri kaydetme islevi
- Header ve Footer bilesenleri

### Kullanilacak Bilesenler
- `@react-three/fiber` Canvas, useThree, useFrame, useLoader
- `@react-three/drei` OrbitControls, Grid, Center, GizmoHelper, GizmoViewport
- `shadcn/ui` Tabs, TabsList, TabsTrigger, TabsContent, Checkbox, Badge
- `lucide-react` ikonlari (Box, Camera, Ruler, Search, Lightbulb, Download, Share2, Pencil, Maximize, List, PenTool, Scissors vb.)
- `three` STLLoader, OBJLoader
- `occt-import-js` STEP dosya destegi

### Sayfa Duzeni (CSS Grid)
```text
+--------------------------------------------------+
|  Header                                          |
+--------------------------------------------------+
|  Arama + Secim Bilgisi                           |
+--------------------------------------------------+
|  Parca Tablosu (tam genislik, 5 satir)           |
|  [x] # dl | ID | Length | Head.. | Body.. | ...  |
+--------------------------------------------------+
|  Sikistirilmis gorunum butonu + Sayfalama        |
+--------------------------------------------------+
|  3D Viewer (%60)    |  Bilgi Sekmeleri (%40)     |
|  [Arac Cubugu]      |  [Tabs: Info|Benzer|RFQ]   |
|  [Canvas + Model]   |  [Icerik]                  |
|  [ViewCube]         |  [Badge'ler]               |
+--------------------------------------------------+
|  Footer                                          |
+--------------------------------------------------+
```

