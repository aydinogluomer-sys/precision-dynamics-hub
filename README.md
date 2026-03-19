# Mas Technic — CNC Hassas İmalat Web Platformu

Endüstriyel hassasiyet odaklı, Awwwards kalitesinde B2B web platformu. CNC teklif akışı, gerçek zamanlı 3D CAD görüntüleyici, müşteri paneli ve yönetim panosu içerir.

**Canlı URL:** [https://mas-technic-precision.lovable.app/](https://mas-technic-precision.lovable.app/)

---

## Teknoloji Yığını

| Katman           | Teknoloji                                            |
| ---------------- | ---------------------------------------------------- |
| Framework        | React 18 + TypeScript 5                              |
| Build            | Vite 5 (`@vitejs/plugin-react-swc` — SWC transpiler) |
| Stil             | Tailwind CSS 3 + shadcn/ui                           |
| Animasyon        | Framer Motion 12                                     |
| 3D Görüntüleyici | Three.js + @react-three/fiber + @react-three/drei    |
| CAD Parser       | occt-import-js (STEP/STL/OBJ)                        |
| Backend/Auth     | Supabase (PostgreSQL + Realtime + Storage)           |
| Routing          | React Router DOM 6                                   |
| State            | TanStack Query 5                                     |
| Form             | React Hook Form + Zod                                |
| Grafikler        | Recharts                                             |
| Bildirim         | Sonner                                               |

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
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
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
│   ├── auth/           # Giriş sayfası bileşenleri
│   ├── musteri/        # Müşteri paneli sekmeleri (10 sekme)
│   └── ui/             # shadcn/ui temel bileşenler
├── data/               # Statik içerik (hizmetler, malzemeler, SSS)
├── hooks/              # Özel React hook'ları
├── integrations/       # Supabase istemci yapılandırması
├── lib/                # Yardımcı fonksiyonlar
├── pages/              # Sayfa bileşenleri (23 sayfa)
└── assets/             # Görseller ve medya dosyaları

supabase/
└── functions/
    ├── chat/              # AI chatbot — Gemini 2.0 Flash, SSE stream
    ├── finance-ai/        # Finansal analiz — Lovable AI gateway (Gemini 2.5 Flash)
    ├── ocr-extract/       # Fatura OCR — vision modeli ile belge ayrıştırma
    └── payment-reminder/  # Vade hatırlatma — cron, otomatik bildirim
```

---

## Ana Özellikler

### Landing Page

- Video arka plan + katmanlı parallax (0.2x / 0.5x / 1x hız)
- 3D fare perspektifi (±3° eğim)
- Yatay scroll timeline (HowWeWork)
- Endüstri card stack (scroll-driven, 3D tilt ±8°)
- CSS marquee sertifika bandı
- Section geçiş animasyonları (7 farklı variant)

### Teklif Akışı (`/teklif-al`)

- 4 adımlı wizard (CAD Yükle → Özellikler → İncele → Gönder)
- Gerçek zamanlı 3D model görüntüleme (STEP / STL / OBJ)
- Toolbar: wireframe, grid, renk seçici, tam ekran, boyut ölçümü
- Supabase Storage'a CAD dosyası yükleme
- RFQ kaydı (rfqs tablosu)

### Müşteri Paneli (`/musteri-paneli`)

- 10 sekme: Genel Bakış, Teklifler, Siparişler, Üretim, Arşiv, Kalite, Ödeme/Fatura, Destek, Bildirimler, Profil
- Sayfalama (PAGE_SIZE=20) + Supabase Realtime (INSERT/UPDATE/DELETE)
- Split-panel destek chati (ResizablePanelGroup)
- URL tabanlı sekme routing (`?tab=teklifler`)
- Sidebar collapsed modu

### Yönetim Paneli (`/admin`)

- 15 modül: Dashboard, RFQ Yönetimi, Sipariş Günlüğü, WBS, Zamanlama, Finansal Analitik, Satış Pipeline, TPM, Envanter, Nakit Akışı, Destek, Chatbot Analitik, Sorun Merkezi, Müşteriler, Ayarlar
- Excel export (xlsx-js-style)
- Chatbot FAQ motoru

---

## Edge Functions

| Fonksiyon          | Açıklama                                                      | Model                              |
| ------------------ | ------------------------------------------------------------- | ---------------------------------- |
| `chat`             | Public AI chatbot — OpenAI-compatible SSE stream              | Gemini 2.0 Flash                   |
| `finance-ai`       | Finansal belge analizi + çok turlu sohbet                     | Gemini 2.5 Flash (Lovable gateway) |
| `ocr-extract`      | Fatura/fiş OCR — vision ile JSON çıkarımı                     | Gemini 2.5 Flash (Lovable gateway) |
| `payment-reminder` | Cron: 3 gün içinde vadesi dolacak belgelere otomatik bildirim | —                                  |

`chat` fonksiyonu admin yetkisi gerektirmez. `finance-ai` ve `ocr-extract` fonksiyonları admin rolü doğrulaması yapar (`user_roles` tablosu). `payment-reminder` service role key ile çalışır; aynı belge için aynı gün ikinci bildirim gönderilmez.

---

## Veritabanı Şeması (Supabase)

Tüm tablolarda RLS (Row Level Security) aktif.

| Tablo                      | Açıklama                                      |
| -------------------------- | --------------------------------------------- |
| `profiles`                 | Kullanıcı profili (ad, firma, telefon, şehir) |
| `rfqs`                     | Teklif talepleri + CAD dosya yolları          |
| `orders`                   | Siparişler + üretim ilerleme bilgisi          |
| `customer_files`           | Müşteri yüklediği belgeler                    |
| `quality_reports`          | Kalite kontrol raporları                      |
| `financial_documents`      | Faturalar ve ödeme belgeleri                  |
| `support_tickets`          | Destek talepleri                              |
| `support_messages`         | Ticket mesajları (`is_staff` flag)            |
| `notifications`            | Kullanıcı bildirimleri                        |
| `notification_preferences` | Bildirim tercihleri                           |

Storage bucket'ları: `cad-uploads`, `customer-files`, `finance-docs`, `avatars`

---

## Tasarım Sistemi

### Renkler

```css
/* index.css CSS token'ları */
--primary:          hsl(186 87% 29%)    /* #0a7e8c — Coolant Teal  */
--forge-obsidian:   hsl(0 0% 6%)        /* #0f0f0f                 */
--forge-gunmetal:   hsl(240 28% 14%)    /* #1a1a2e                 */
--forge-molten:     hsl(23 92% 47%)     /* #e8610a — Vurgu / CTA   */
--forge-amber:      hsl(37 88% 44%)     /* #d4850e                 */
--forge-teal:       hsl(186 87% 29%)    /* #0a7e8c                 */
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

### Border Radius

```ts
// tailwind.config.ts
borderRadius: { lg: "var(--radius)", ... }
// index.css
--radius: 0rem   // Sıfır border-radius — industrial sharp-edge tasarım dili
```

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
