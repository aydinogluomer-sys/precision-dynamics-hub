
# Mega Menu Implementasyonu

Referans gorseller ve JSX/CSS dosyalarindaki yapiyi temel alarak, mevcut Header bilesenini mega menu destekli bir yapiya donusturecegiz.

## Yapilacaklar

### 1. Header.tsx - Tam Yeniden Yapilandirma

Mevcut basit navigasyonu, 3 mega menu iceren (Hizmetler, Kabiliyetler, Endustriyel) bir yapiya donusturecegiz.

**Nav yapisi:**
- Ana sayfa (link, dropdown yok)
- Hizmetler (mega menu - 5 kolon: Talasli Imalat, On Uretim, Yuzey Islemleri, Isaretleme & Tanimlama, Montaj & Birlestirme)
- Kabiliyetler (mega menu - 5 kolon: Uretim Altyapisi, Kalite & Standartlar, Muhendislik Destegi, Prototipten Seri Uretime, Surec & Operasyon)
- Endustriyel (mega menu - 5 kolon: Yuksek Teknoloji, Seri Uretim, Endustriyel Sistemler, Uretim Cozumleri, Enerji & Altyapi)
- Iletisim (link, dropdown yok)
- Blog (link, ates animasyonlu, dropdown yok)
- Teklif Al (CTA buton)

**Mega menu davranisi:**
- Desktop: Mouse hover ile acilip kapanma (onMouseEnter/onMouseLeave)
- Chevron ikonu dropdown olan nav item'larda, hover'da 180 derece donme
- Mega menu tam genislikte, sabit pozisyonda (fixed, top: header yuksekligi)
- 5 kolonlu grid, her kolonda baslik (ikon + etiket) ve alt linkler
- Framer Motion ile fade-in animasyonu

**Mobil menu:**
- Mevcut hamburger menu korunacak
- Accordion tarzinda acilir/kapanir alt kategoriler
- Her kategorinin basligina tiklandiginda alt linkler gorunur

### 2. Teknik Detaylar

- Tum stiller Tailwind CSS ile yazilacak (CSS dosyasi kullanilmayacak)
- Lucide React ikonlari kullanilacak (ChevronDown, Wrench, Layers, Sparkles, Tag, Package, Factory, Shield, Cpu, Rocket, Car, Zap vb.)
- Framer Motion animasyonlari: AnimatePresence ile mega menu acilip kapanma
- Link'ler simdilik hepsi "#" veya mevcut sayfalara yonlenecek (henuz var olmayan sayfalar icin)
- Mevcut "Industrial Precision" tasarim diline uyumlu: keskin koseler, #0688AD primary renk

### 3. Dosya Degisiklikleri

- `src/components/Header.tsx` - Tamamen yeniden yazilacak (mega menu destekli)
- `src/index.css` - Gerekirse ates animasyonu icin kucuk bir keyframe eklenecek

Mevcut basit 6 linklik header yerine, referans gorsellerdeki gibi profesyonel, kategorize edilmis mega menu'lu bir header olusturulacak.
