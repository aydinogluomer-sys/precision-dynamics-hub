# Mas Technic — CNC Hassas İmalat Web Platformu

Endüstriyel hassasiyet odaklı, Awwwards kalitesinde B2B web platformu. CNC teklif akışı, gerçek zamanlı 3D CAD görüntüleyici, müşteri paneli ve yönetim panosu içerir.

**Canlı URL:** [https://mas-technic-precision.lovable.app/](https://mas-technic-precision.lovable.app/)

---

## Kullanılan Diller

| Uzantı  | Dil / Format     | Kullanım Alanı                                                         |
| ------- | ---------------- | ---------------------------------------------------------------------- |
| `.ts`   | TypeScript       | Hook'lar, util'ler, tip tanımları, Vite/Tailwind config                |
| `.tsx`  | TypeScript + JSX | Tüm React bileşenleri ve sayfalar (161 dosya)                          |
| `.js`   | JavaScript       | Lovable/Vite araç konfigürasyonları                                    |
| `.css`  | CSS              | `index.css` — CSS custom property'ler, keyframe'ler, utility sınıfları |
| `.html` | HTML             | `index.html` — entry point, SEO meta, OG/Twitter tags, canonical       |
| `.sql`  | SQL / PostgreSQL | Supabase migration'ları, RLS politikaları, şema tanımları              |
| `.json` | JSON             | `package.json`, `components.json`, `tsconfig.json`                     |
| `.toml` | TOML             | `supabase/config.toml` — Supabase proje yapılandırması                 |
| `.md`   | Markdown         | `README.md`, dokümantasyon                                             |
| `.svg`  | SVG              | İkon ve vektör görseller                                               |
| `.ico`  | ICO              | Favicon                                                                |
| `.txt`  | Plaintext        | Lisans ve yardımcı metin dosyaları                                     |

---

## Teknoloji Yığını

| Katman           | Teknoloji                                            |
| ---------------- | ---------------------------------------------------- |
| Framework        | React 18 + TypeScript 5                              |
| Build            | Vite 5 (`@vitejs/plugin-react-swc` — SWC transpiler) |
| Edge Runtime     | Deno (Supabase Edge Functions)                       |
| Veritabanı       | PostgreSQL (Supabase) — RLS, FK, enum, trigger       |
| Stil             | Tailwind CSS 3 + shadcn/ui + `tailwindcss-animate`   |
| Animasyon        | Framer Motion 12                                     |
| 3D Görüntüleyici | Three.js + @react-three/fiber + @react-three/drei    |
| CAD Parser       | occt-import-js (STEP/STL/OBJ)                        |
| Backend/Auth     | Supabase (PostgreSQL + Realtime + Storage)           |
| Routing          | React Router DOM 6                                   |
| State            | TanStack Query 5                                     |
| Form             | React Hook Form + Zod                                |
| Grafikler        | Recharts                                             |
| Bildirim         | Sonner                                               |
| İkonlar          | lucide-react                                         |
| Excel Export     | xlsx-js-style                                        |
| Stil Utility     | clsx + tailwind-merge (`cn()`)                       |
| Dev Tooling      | lovable-tagger (dev-only component tagging)          |

---

## Başlangıç

### Gereksinimler

- Node.js 20+
- npm veya yarn

### Kurulum

```bash
git clone https://github.com/your-org/mas-technic.git
cd mas-technic
npm install
```

### Ortam Değişkenleri

Kök dizine `.env.local` dosyası oluştur:

```env
VITE_SUPABASE_URL=https://zdqiujpeewtyhtcqhdcj.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_M-lrTkYbdpncxT8SJY35fQ_hitBE7-e
VITE_SUPABASE_PROJECT_ID=zdqiujpeewtyhtcqhdcj
```

Edge Function'lar için Supabase projesinde aşağıdaki secret'lar tanımlanmalıdır (Settings → Edge Functions → Secrets):

```env
GOOGLE_GEMINI_API_KEY=your-gemini-api-key     # AI chatbot (chat edge function)
LOVABLE_API_KEY=your-lovable-key              # Finansal AI + OCR (finance-ai, ocr-extract)
SUPABASE_SERVICE_ROLE_KEY=                    # Otomatik — Supabase tarafından sağlanır
```

### Geliştirme Sunucusu

```bash
npm run dev
```

Uygulama `http://localhost:8080` adresinde açılır (`vite.config.ts` → `port: 8080`).

### Build

```bash
# Production build
npm run build

# Build önizleme
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Vite Yapılandırması

`vite.config.ts` temel ayarları:

```ts
plugins: [
  react(),                                        // @vitejs/plugin-react-swc (SWC tabanlı)
  mode === "development" && componentTagger()      // lovable-tagger — dev-only
],
resolve: {
  alias: { "@": path.resolve(__dirname, "./src") },
  dedupe: ["react", "react-dom", "react/jsx-runtime"],  // çift mount önleme
}
```

---

## Proje Yapısı

```
src/
├── components/
│   ├── admin/          # Yönetim paneli modülleri (15 modül)
│   ├── auth/           # Giriş, ForgotPassword, ResetPassword
│   ├── musteri/        # Müşteri paneli sekmeleri (10 sekme)
│   └── ui/             # shadcn/ui temel bileşenler
├── data/
│   ├── blogPosts.ts        # 6 tam blog makalesi + kategori sistemi
│   ├── categoryPages.ts    # Hizmet/Kabiliyet/Endüstriyel kategori sayfaları (13 grup)
│   ├── faqData.ts          # FAQ veri katmanı — TF-IDF benzeri eşleşme motoru
│   ├── materialsData.ts    # 500+ malzeme + 12 kategori sayfası
│   └── servicePages.ts     # 50+ hizmet detay sayfası (FAQ, makine, karşılaştırma tabloları)
├── hooks/
│   ├── usePrefersReducedMotion.ts   # Sistem erişilebilirlik tercihi
│   ├── useTheme.ts                  # dark/light toggle, localStorage
│   └── ...                          # Diğer özel hook'lar
├── integrations/
│   └── supabase/
│       ├── client.ts       # Supabase istemci başlatma
│       └── types.ts        # Tam veritabanı tip tanımları (23 tablo)
├── lib/
│   └── utils.ts            # cn() — clsx + tailwind-merge
├── pages/                  # 23 sayfa bileşeni
└── assets/                 # Görseller ve medya dosyaları

public/                     # Statik dosyalar (favicon, svg, ico)

supabase/
├── config.toml
├── migrations/             # SQL migration dosyaları
└── functions/
    ├── chat/               # AI chatbot — Gemini 2.0 Flash, SSE stream
    ├── finance-ai/         # Finansal analiz — Lovable AI gateway (Gemini 2.5 Flash)
    ├── ocr-extract/        # Fatura OCR — vision modeli ile belge ayrıştırma
    └── payment-reminder/   # Vade hatırlatma — cron, otomatik bildirim
```

---

## Ana Özellikler

### Landing Page

- Video arka plan + katmanlı parallax (0.2x / 0.5x / 1x hız)
- 3D fare perspektifi (±3° eğim)
- Yatay scroll timeline (HowWeWork)
- Endüstri card stack (scroll-driven, 3D tilt ±8°)
- CSS marquee sertifika bandı
- Section geçiş animasyonları (7 farklı variant: stack, zoom-out-blur, slide-up, zoom-in, wipe-mask, color-fade, depth-3d)

### Teklif Akışı (`/teklif-al`)

- 4 adımlı wizard (CAD Yükle → Özellikler → İncele → Gönder)
- Gerçek zamanlı 3D model görüntüleme (STEP / STL / OBJ)
- Toolbar: wireframe, grid, renk seçici, tam ekran, boyut ölçümü
- Supabase Storage'a CAD dosyası yükleme
- RFQ kaydı (`rfqs` tablosu)

### Müşteri Paneli (`/musteri-paneli`)

- 10 sekme: Genel Bakış, Teklifler, Siparişler, Üretim, Arşiv, Kalite, Ödeme/Fatura, Destek, Bildirimler, Profil
- Sayfalama (PAGE_SIZE=20) + Supabase Realtime (INSERT/UPDATE/DELETE)
- Split-panel destek chati (ResizablePanelGroup)
- URL tabanlı sekme routing (`?tab=teklifler`)
- Sidebar collapsed modu

### Yönetim Paneli (`/admin`)

- 15 modül: Dashboard, RFQ Yönetimi, Sipariş Günlüğü, WBS, Zamanlama, Finansal Analitik, Satış Pipeline, TPM, Envanter, Nakit Akışı, Destek, Chatbot Analitik, Sorun Merkezi, Müşteriler, Ayarlar
- Excel export (xlsx-js-style) — pivot sayfalar, KPI dashboard, ham veri sekmeleri
- Marka renkli stil sistemi (Space Grotesk + IBM Plex Mono, alternating row, total row)

### AI Chatbot

- Public-facing widget — tüm sayfalarda mevcut
- Gemini 2.0 Flash ile OpenAI-compatible SSE streaming
- Türkçe sistem promptu, MAS Technic domain bilgisi
- Rate limit (429) ve kredi (402) hata yönetimi

### FAQ Motoru

- `faqData.ts` içinde TF-IDF benzeri `findBestFaqMatch()` fonksiyonu
- Statik 25+ giriş + `servicePages` FAQ'larından otomatik toplama
- Türkçe token normalizasyonu (ğ, ü, ş, ö, ç, ı desteği)
- Skor eşiği 0.6 — düşük güven yanıtları filtrelenir
- `faq_analytics` tablosuna soru/eşleşme loglaması

### Blog (`/blog`)

- 6 tam makale: 5 Eksen CNC, Havacılık Malzeme Seçimi, DFM, CNC Torna vs Freze, CMM Ölçüm, Yüzey İşlemleri
- Kategori filtresi (Teknik, Malzeme, Mühendislik, Kalite, Rehber)
- Görüntülenme sayacı, okuma süresi, featured flag
- Slug tabanlı dinamik sayfa

### Malzemeler (`/malzemeler`)

- 500+ malzeme — metal, plastik, kompozit
- 12 kategori sayfası: Alüminyum, Çelik, Paslanmaz, Titanyum, Pirinç/Bronz, Bakır, Nikel, Magnezyum, Termoplastikler, Yüksek Performans Plastikler, Kompozitler
- Her kategoride: hero, SEO meta, içerik blokları, avantajlar, yaygın uygulamalar
- `machinability` (1–5) ve `corrosionResistance` (1–5) skorlaması

### Hizmet / Kabiliyet / Endüstriyel Sayfalar

- 50+ dinamik hizmet sayfası (`servicePages.ts`)
- Her sayfada: teknik özellikler tablosu, süreç adımları, makine listesi, malzeme listesi, FAQ, karşılaştırma tabloları
- 13 kategori grubu (`categoryPages.ts`): Talaşlı İmalat, Ön Üretim, Yüzey İşlemleri, İşaretleme, Montaj, Üretim Altyapısı, Kalite, Mühendislik Desteği, Seri Üretim, Süreç & Operasyon, Yüksek Teknoloji, Endüstriyel Sistemler, Enerji & Altyapı

### Toplantı Planlama

- `meetings` tablosuna kayıt
- Admin panelinden durum yönetimi (pending / confirmed / cancelled)

---

## Edge Functions

| Fonksiyon          | Yetki        | Açıklama                                                      | Model                              |
| ------------------ | ------------ | ------------------------------------------------------------- | ---------------------------------- |
| `chat`             | Public       | AI chatbot — OpenAI-compatible SSE stream                     | Gemini 2.0 Flash                   |
| `finance-ai`       | Admin        | Finansal belge analizi + çok turlu sohbet geçmişi             | Gemini 2.5 Flash (Lovable gateway) |
| `ocr-extract`      | Admin        | Fatura/fiş OCR — vision ile JSON çıkarımı, DB güncelleme      | Gemini 2.5 Flash (Lovable gateway) |
| `payment-reminder` | Service Role | Cron: 3 gün içinde vadesi dolacak belgelere otomatik bildirim | —                                  |

`finance-ai` ve `ocr-extract`, `user_roles` tablosundaki `admin` rolünü doğrular. `payment-reminder` her çalışmada aynı gün aynı belgeye ikinci bildirim göndermez (notifications tablosu kontrolü).

---

## Veritabanı Şeması (Supabase)

Tüm tablolarda RLS (Row Level Security) aktif. `app_role` enum: `admin | staff | production | quality`.

### Müşteri / Kullanıcı

| Tablo        | Açıklama                                                                        |
| ------------ | ------------------------------------------------------------------------------- |
| `profiles`   | Kullanıcı profili (ad, firma, telefon, şehir, avatar)                           |
| `user_roles` | RBAC rol atamaları — `app_role` enum                                            |
| `customers`  | B2B müşteri kaydı (firma, IBAN, bakiye, vergi bilgisi, `profiles`'dan bağımsız) |

### Üretim Akışı

| Tablo              | Açıklama                                                 |
| ------------------ | -------------------------------------------------------- |
| `rfqs`             | Teklif talepleri + CAD dosya yolları, fiyat, onay durumu |
| `orders`           | Siparişler — ilerleme %, tamamlanan/paketlenen/QC adet   |
| `wbs`              | Work Breakdown Structure — üretim adım takibi            |
| `machine_schedule` | Haftalık makine çizelgeleme                              |

### Kalite & Bakım

| Tablo              | Açıklama                                               |
| ------------------ | ------------------------------------------------------ |
| `quality_reports`  | Kalite kontrol raporları                               |
| `machine_health`   | TPM makine sağlık verileri (spindle saat, yağ, filtre) |
| `maintenance_logs` | Bakım kayıtları (tür, teknisyen, maliyet, süre)        |
| `issues`           | Üretim sorun/olay takibi (ciddiyet, maliyet, çözüm)    |

### Müşteri Paneli

| Tablo                      | Açıklama                                          |
| -------------------------- | ------------------------------------------------- |
| `customer_files`           | Müşteri yüklediği belgeler (order/rfq bağlantılı) |
| `quality_reports`          | Kalite raporlarına müşteri erişimi                |
| `support_tickets`          | Destek talepleri (öncelik, durum)                 |
| `support_messages`         | Ticket mesajları (`is_staff` flag)                |
| `notifications`            | Kullanıcı bildirimleri (tür, okundu)              |
| `notification_preferences` | Email / push bildirim tercihleri (4 kategori)     |

### Finans & Satış

| Tablo                 | Açıklama                                                    |
| --------------------- | ----------------------------------------------------------- |
| `financial_documents` | Faturalar, giderler — OCR alanları, KDV, vade, ödeme durumu |
| `pipeline_leads`      | Satış pipeline CRM (aşama, olasılık, değer)                 |
| `meetings`            | Toplantı planlama (tarih, saat, konu, durum)                |

### Envanter & Analitik

| Tablo            | Açıklama                                             |
| ---------------- | ---------------------------------------------------- |
| `raw_materials`  | Hammadde envanteri (stok, birim maliyet, fire oranı) |
| `tool_inventory` | Takım envanteri (min stok, tedarikçi)                |
| `faq_analytics`  | Chatbot sorgu ve eşleşme logları                     |
| `documents`      | Genel belge deposu (başlık, dosya URL'leri)          |

Storage bucket'ları: `cad-uploads`, `customer-files`, `finance-docs`, `avatars`

---

## Tasarım Sistemi

### Renkler

```css
/* index.css CSS token'ları — :root */
--primary:          hsl(186 87% 29%)    /* #0a7e8c — Coolant Teal  */
--forge-obsidian:   hsl(0 0% 6%)        /* #0f0f0f                 */
--forge-gunmetal:   hsl(240 28% 14%)    /* #1a1a2e                 */
--forge-iron:       hsl(220 46% 16%)    /* #16213e                 */
--forge-molten:     hsl(23 92% 47%)     /* #e8610a — Vurgu / CTA   */
--forge-amber:      hsl(37 88% 44%)     /* #d4850e                 */
--forge-ember:      hsl(0 58% 45%)      /* #b33030                 */
--forge-teal:       hsl(186 87% 29%)    /* #0a7e8c                 */
--forge-silver:     hsl(210 14% 70%)    /* #a8b2bc                 */
--forge-steel:      hsl(212 22% 29%)    /* #3a4a5c                 */
--forge-concrete:   hsl(36 22% 89%)     /* #e8e4de                 */
--forge-workshop:   hsl(38 25% 92%)     /* #f0ede8                 */
--forge-mist:       hsl(207 20% 89%)    /* #dde3e8                 */

/* Meta theme-color ve Excel/marka rengi */
#0688AD  /* brand teal */
```

### Tipografi

- **Space Grotesk** — tüm metin içeriği (`font-sans`)
- **IBM Plex Mono** — rakamlar, ID'ler, tarihler, teknik değerler (`font-mono`)

> ⚠️ `JetBrains Mono` değil. `index.html` Google Fonts linki ve `tailwind.config.ts → fontFamily.mono` **IBM Plex Mono**'yu referans alır.

### Animasyon Token'ları

```
UI geçişleri:    200–400ms / cubic-bezier(0.4, 0, 0.2, 1)   — hover, fade, tab switch
Dramatik:        600–1000ms / cubic-bezier(0.76, 0, 0.24, 1) — section reveal, hero
Spring (scroll): stiffness: 200, damping: 40                  — parallax, sticky
```

Sistem `prefers-reduced-motion` tercihi `usePrefersReducedMotion` hook'u ve `index.css` media query bloğu ile tam olarak desteklenir — tüm animasyonlar `0.01ms`'ye düşer.

### Özel CSS Utility Sınıfları

```css
.btn-industrial-primary    /* bg-primary, uppercase, tracking-wider, border-2 */
.btn-industrial-secondary  /* transparent bg, border-2 border-foreground, hover invert */
.card-industrial           /* bg-card, border, hover:border-primary */
.section-industrial        /* py-20 md:py-28 */
.container-industrial      /* max-w-7xl, merkez, padding */
.heading-industrial        /* font-bold tracking-tight */
.grid-lines                /* 40px background-size CSS grid efekti */
.accent-line               /* w-16 h-1 bg-primary */
.text-technical            /* IBM Plex Mono, text-sm tracking-wide */
.shadow-industrial         /* 8px 8px 0 0 border rengi — offset shadow */
.shadow-industrial-primary /* 8px 8px 0 0 primary/20 */
.animate-fire-text         /* forge-molten/amber renk geçişi, 2s infinite */
```

### Border Radius

```ts
// tailwind.config.ts
borderRadius: { lg: "var(--radius)", ... }
// index.css
--radius: 0rem   // Sıfır border-radius — industrial sharp-edge tasarım dili
```

### Özel Hook'lar

| Hook                      | Açıklama                                                                         |
| ------------------------- | -------------------------------------------------------------------------------- |
| `usePrefersReducedMotion` | `matchMedia("prefers-reduced-motion")` — reaktif, SSR safe                       |
| `useTheme`                | dark/light toggle — `localStorage` key: `mas-technic-theme`, varsayılan: `light` |

> ⚠️ `index.html` `<html class="dark">` ile başlar ancak `useTheme` varsayılanı `light`'tır. Mount öncesi FOUC riski — kritik sayfalarda `getInitialTheme()` ile senkronize edilmeli.

### Path Alias

```ts
import Something from "@/components/Something";
// → src/components/Something  (vite.config.ts resolve.alias)
```

---

## Ortam

Lovable.dev üzerinde geliştirilmiştir. shadcn/ui bileşen yapılandırması `components.json` dosyasında tanımlıdır. `dark` class `<html>` üzerinde varsayılan olarak aktiftir (`index.html`).

---

## Lisans

Özel proje — tüm hakları saklıdır.
