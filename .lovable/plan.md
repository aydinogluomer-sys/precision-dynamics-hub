# Mas Technic — Lovable Build Plan

> Her fazı tamamladıktan sonra PIN at.

---

## Tamamlananlar (dokunma)

| Bileşen                                           | Durum                                                                                 |
| ------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `HeroSection.tsx`                                 | Video BG, layered parallax (0.2x/0.5x), 3D mouse tilt (±3°), HeadlineStagger, CountUp |
| `HowWeWorkSection.tsx`                            | Hook-safe horizontal scroll, spring 200/40, lg:h-400vh, IO mobile fallback            |
| `CapabilitiesSection.tsx`                         | Split screen sticky + MagneticButton + tolerance CountUp                              |
| `ServicesSection.tsx`                             | IO active/passive, scale/opacity, clipPath mask reveal, text stagger                  |
| `IndustriesSection.tsx` + `IndustryStackCard.tsx` | Card stack desktop + 3D tilt ±8° + mobile horizontal scroll                           |
| `WhyUsSection.tsx`                                | clipPath reveal + imageScale scroll-driven — **TAM TAMAMLANDI**                       |
| `StatsSection.tsx`                                | CountUp + stagger (0.15\*index) + SectionHeader — **TAM TAMAMLANDI**                  |
| `CertificationsSection.tsx`                       | CSS marquee, py-6, hover:paused — **TAM TAMAMLANDI**                                  |
| `ParallaxSection.tsx`                             | 7 variant (stack, zoom-out-blur, slide-up, zoom-in, wipe-mask, color-fade, depth-3d)  |
| `SectionHeader.tsx`                               | tag + title + description + align + titleClassName — **MEVCUT**                       |
| `TeklifAl.tsx`                                    | CAD viewer, toolbar, STEP/STL/OBJ, sağ panel sekmeler, Supabase insert                |
| `DestekTab.tsx`                                   | Pagination, 3-event realtime — **MEVCUT** (sadece layout lazım)                       |
| `CursorFollower.tsx`                              | backdropFilter invert(0.8), mobile null                                               |
| `Index.tsx`                                       | isFirstVisit, footer sticky, tüm ParallaxSection variant atamaları                    |
| `App.tsx`                                         | /cad-dashboard redirect, CursorFollower mount                                         |
| Auth sayfaları                                    | Login, ForgotPassword, ResetPassword                                                  |
| `CustomerProtectedRoute.tsx`                      | getSession + onAuthStateChange                                                        |
| `AdminDashboard.tsx`                              | 15 modül, breadcrumb, export                                                          |

---

## Faz 1 — Veritabanı Tabloları + RLS

```
Supabase'de eksik tabloları oluştur ve RLS politikalarını kur.

rfqs tablosu zaten var — dokunma.
profiles tablosu zaten var — dokunma.

Eksik tablolar:
CREATE TABLE orders (
  id text PRIMARY KEY,
  part_name text,
  status text,
  progress integer DEFAULT 0,
  quantity integer,
  order_date date,
  deadline date,
  rfq_ref text,
  completed_qty integer DEFAULT 0,
  qc_passed_qty integer DEFAULT 0,
  packed_qty integer DEFAULT 0,
  user_id uuid REFERENCES auth.users(id)
);

CREATE TABLE customer_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name text NOT NULL,
  file_url text,
  file_type text,
  version text,
  notes text,
  user_id uuid REFERENCES auth.users(id)
);

CREATE TABLE quality_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  report_type text,
  file_url text,
  order_id text,
  notes text,
  user_id uuid REFERENCES auth.users(id)
);

CREATE TABLE financial_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doc_number text,
  title text,
  doc_type text,
  total_amount numeric,
  currency text DEFAULT 'TRY',
  payment_status text,
  due_date date,
  file_urls text[],
  user_id uuid REFERENCES auth.users(id)
);

CREATE TABLE support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'open',
  priority text DEFAULT 'normal',
  order_id text,
  user_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE support_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message text NOT NULL,
  is_staff boolean DEFAULT false,
  ticket_id uuid REFERENCES support_tickets(id),
  user_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text,
  title text NOT NULL,
  message text,
  read boolean DEFAULT false,
  user_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE notification_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE REFERENCES auth.users(id),
  email_rfq boolean DEFAULT true,
  email_order boolean DEFAULT true,
  email_quality boolean DEFAULT false,
  email_finance boolean DEFAULT true,
  push_rfq boolean DEFAULT true,
  push_order boolean DEFAULT true,
  push_quality boolean DEFAULT false,
  push_finance boolean DEFAULT false
);

RLS politikaları — tüm tablolarda:
ALTER TABLE [tablo] ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_own_data" ON [tablo]
  USING (user_id = auth.uid());

support_messages için ek: is_staff=true satırlarını herkes okuyabilir.

Storage bucket'lar (yoksa oluştur):
- cad-uploads (zaten var)
- customer-files (public: false)
- finance-docs (public: false)
- avatars (public: true)

Hiçbir .tsx dosyasına dokunma.
```

**PIN** — tamamlanınca.

---

## Faz 2 — URL Routing + Sidebar Toggle

`MusteriPaneli.tsx`'te `sidebarCollapsed` state var ama `setSidebarCollapsed` hiç çağrılmıyor.
URL routing yok, sadece `activeTab` state.

```
MusteriPaneli.tsx'e iki değişiklik yap:

1. URL tabanlı tab routing:
import { useSearchParams } from "react-router-dom";
const [searchParams, setSearchParams] = useSearchParams();
const activeTab = searchParams.get("tab") || "genel";
const setTab = (tab: string) => setSearchParams({ tab }, { replace: true });

Mevcut setActiveTab çağrılarını setTab ile değiştir.
Props'ları da güncelle: onTabChange={setTab}

2. Sidebar toggle butonu:
MusteriHeader.tsx'e bir toggle butonu ekle:
<button
  onClick={() => setSidebarCollapsed(prev => !prev)}
  className="p-2 rounded hover:bg-muted transition-colors"
  aria-label="Sidebar aç/kapat"
>
  {sidebarCollapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
</button>

setSidebarCollapsed'ı MusteriHeader'a prop olarak geç:
onToggleSidebar: () => void

MusteriSidebar.tsx'e dokunma — collapsed prop zaten handle ediliyor.

Sadece bu dosyalara dokun:
- src/pages/MusteriPaneli.tsx
- src/components/musteri/MusteriHeader.tsx
```

**PIN** — tamamlanınca.

---

## Faz 3 — Sayfalama (5 Tab)

`DestekTab.tsx` zaten tam sayfalama + realtime var — dokunma.

```
5 müşteri paneli tab'ına sayfalama ekle.

ORTAK PATTERN:
const PAGE_SIZE = 20;
const [page, setPage] = useState(0);
const [hasMore, setHasMore] = useState(true);
const [loadingMore, setLoadingMore] = useState(false);

fetch fonksiyonu pattern:
const fetchItems = async (pageNum: number, append: boolean) => {
  const from = pageNum * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  const { data } = await supabase.from("tablo").select("...").range(from, to);
  const items = data || [];
  setHasMore(items.length === PAGE_SIZE);
  if (append) setItems(prev => [...prev, ...items]);
  else setItems(items);
};

Realtime 3-event pattern (mevcut DestekTab.tsx'ten kopyala):
INSERT → setItems(prev => [payload.new, ...prev])
UPDATE → setItems(prev => prev.map(i => i.id === updated.id ? updated : i))
DELETE → setItems(prev => prev.filter(i => i.id !== deleted.id))
Realtime'da tüm listeyi sıfırlama.

"Daha Fazla Yükle" butonu (mevcut DestekTab.tsx'ten kopyala):
{hasMore && items.length > 0 && (
  <div className="flex justify-center pt-4">
    <Button variant="outline" size="sm" disabled={loadingMore} onClick={loadMore}>
      {loadingMore ? <Loader2 size={14} className="animate-spin" /> : "Daha Fazla Yükle"}
    </Button>
  </div>
)}

TAB'A ÖZEL KURALLAR:

1. TekliflerimTab.tsx — Server-side filtre:
   fetchRfqs(pageNum, append, statusFilter)
   bekleyen: .or('status.in.(Yeni,pending,Beklemede,Değerlendiriliyor),status.is.null')
   fiyat_verildi: .eq("status","Fiyat Verildi")
   onaylanan: .eq("status","Onaylandı")
   reddedilen: .eq("status","Reddedildi")
   Filter tab değişiminde: setPage(0); setRfqs([]); fetchRfqs(0, false, yeniFilter)

2. OdemeFaturaTab.tsx — İki ayrı sorgu:
   fetchSummary() — sayfalanmaz, sadece özet kartlar için
   fetchDocs(pageNum, append) — .range() ile sayfalanır
   İlk yüklemede: Promise.all([fetchSummary(), fetchDocs(0, false)])
   Realtime'da item güncelle + fetchSummary() yeniden çalıştır

3. SiparislerimTab.tsx — Standart pattern
4. KaliteRaporTab.tsx — Standart pattern
5. TeknikArsivTab.tsx — customer_files sorgusuna .range() ekle,
   rfqs dosyaları sayfalanmaz (az sayıda)

Sadece bu 5 dosyaya dokun:
- src/components/musteri/TekliflerimTab.tsx
- src/components/musteri/SiparislerimTab.tsx
- src/components/musteri/OdemeFaturaTab.tsx
- src/components/musteri/KaliteRaporTab.tsx
- src/components/musteri/TeknikArsivTab.tsx
```

**PIN** — tamamlanınca.

---

## Faz 4 — Destek Split-Panel Chat

`DestekTab.tsx` incelendi: ticket pagination, realtime, mesaj gönderme hepsi çalışıyor. Sadece layout accordion'dan split-panel'e dönüşecek.

```
DestekTab.tsx'i split-panel chat layout'a çevir.
Mevcut tüm Supabase logic'i (fetchTickets, loadMessages, handleReply,
handleSubmit, realtime channel) koru — sadece JSX layout değişecek.

npx shadcn add resizable

Yeni layout:
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

<ResizablePanelGroup direction="horizontal" className="min-h-[600px] border border-border">

  {/* Sol panel — Ticket listesi */}
  <ResizablePanel defaultSize={30} minSize={20}>
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-border flex items-center justify-between">
        <span className="text-sm font-semibold">Destek Talepleri</span>
        <Button size="sm" variant="outline" className="h-7 text-xs gap-1"
          onClick={() => setShowForm(true)}>
          <Plus size={12} /> Yeni
        </Button>
      </div>
      {/* Ticket listesi */}
      <div className="flex-1 overflow-y-auto">
        {tickets.map(t => (
          <button key={t.id}
            className={`w-full p-3 text-left border-b border-border hover:bg-muted/30 transition-colors
              ${expandedTicket === t.id ? "bg-primary/5 border-l-2 border-l-primary" : ""}`}
            onClick={() => loadMessages(t.id)}>
            <p className="text-xs font-medium truncate">{t.subject}</p>
            <p className="text-[10px] text-muted-foreground truncate mt-0.5">{t.message}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <Badge variant="outline" className={statusColor(t.status) + " text-[9px] py-0"}>
                {statusLabel(t.status)}
              </Badge>
              <span className="text-[9px] text-muted-foreground">
                {new Date(t.created_at).toLocaleDateString("tr-TR")}
              </span>
            </div>
          </button>
        ))}
        {hasMore && tickets.length > 0 && (
          <div className="p-3">
            <Button variant="ghost" size="sm" className="w-full text-xs"
              disabled={loadingMore} onClick={loadMore}>
              {loadingMore ? <Loader2 size={12} className="animate-spin" /> : "Daha Fazla"}
            </Button>
          </div>
        )}
      </div>
    </div>
  </ResizablePanel>

  <ResizableHandle withHandle />

  {/* Sağ panel — Mesajlaşma */}
  <ResizablePanel defaultSize={70}>
    <div className="flex flex-col h-full">
      {!expandedTicket ? (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <MessageSquare size={32} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">Bir destek talebi seçin</p>
          </div>
        </div>
      ) : (
        <>
          {/* Ticket header */}
          <div className="p-4 border-b border-border">
            <p className="text-sm font-semibold">
              {tickets.find(t => t.id === expandedTicket)?.subject}
            </p>
          </div>
          {/* Mesajlar */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* İlk mesaj (ticket.message) */}
            <div className="flex justify-end">
              <div className="max-w-[75%] bg-primary text-white text-[13px] px-3 py-2"
                style={{ borderRadius: "8px 8px 3px 8px" }}>
                <p>{tickets.find(t => t.id === expandedTicket)?.message}</p>
                <p className="text-[10px] text-white/60 mt-1 font-mono text-right">
                  {new Date(tickets.find(t => t.id === expandedTicket)?.created_at || "").toLocaleString("tr-TR")}
                </p>
              </div>
            </div>
            {/* Mesajlar */}
            {(messages[expandedTicket] || []).map(m => (
              <div key={m.id} className={`flex ${m.is_staff ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[75%] text-[13px] px-3 py-2 ${
                  m.is_staff
                    ? "bg-primary/10 text-primary"
                    : "bg-primary text-white"
                  }`}
                  style={{ borderRadius: m.is_staff ? "8px 8px 8px 3px" : "8px 8px 3px 8px" }}>
                  <p>{m.message}</p>
                  <p className={`text-[10px] mt-1 font-mono ${m.is_staff ? "text-primary/60" : "text-white/60"}`}>
                    {m.is_staff ? "MAS Technic · " : ""}
                    {new Date(m.created_at).toLocaleString("tr-TR")}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Input */}
          {tickets.find(t => t.id === expandedTicket)?.status !== "closed" &&
           tickets.find(t => t.id === expandedTicket)?.status !== "resolved" && (
            <div className="p-3 border-t border-border flex gap-2">
              <Textarea
                placeholder="Yanıtınızı yazın... (Enter = gönder, Shift+Enter = yeni satır)"
                value={reply}
                onChange={e => setReply(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleReply(expandedTicket);
                  }
                }}
                className="resize-none text-sm"
                rows={2}
              />
              <Button size="sm" className="self-end" disabled={sendingReply}
                onClick={() => handleReply(expandedTicket)}>
                {sendingReply ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  </ResizablePanel>
</ResizablePanelGroup>

Mobil (lg altı): ResizablePanelGroup direction="vertical" veya
expandedTicket null ise sol liste fullscreen, seçilince sağ panel fullscreen + geri butonu.

Yeni talep formu: Dialog veya Sheet olarak aç (accordion değil).
Mevcut handleSubmit ve form state koru.

Sadece bu dosyaya dokun: src/components/musteri/DestekTab.tsx
```

**PIN** — tamamlanınca.

---

## Faz 5 — Kalan 3 Animasyon

### 5.1 FAQ Accordion animasyonu

```
FAQBlogSection.tsx'deki accordion'a Framer Motion smooth height animasyonu ekle.

Mevcut conditional render ({open && <p>}) yerine:

import { AnimatePresence, motion } from "framer-motion";

<AnimatePresence initial={false}>
  {openIndex === index && (
    <motion.div
      key="content"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      style={{ overflow: "hidden" }}
    >
      <p className="text-sm text-foreground/70 pb-4 pt-2 leading-relaxed">
        {item.answer}
      </p>
    </motion.div>
  )}
</AnimatePresence>

Chevron ikonuna rotate animasyonu:
<motion.span
  animate={{ rotate: openIndex === index ? 45 : 0 }}
  transition={{ duration: 0.2 }}>
  +
</motion.span>

Sadece bu dosyaya dokun: src/components/FAQBlogSection.tsx
```

### 5.2 FinalCTA gradient text

```
FinalCTASection.tsx'deki ana başlıkta bir kelimeye gradient text ekle.

Başlıkta "Kritik" veya en güçlü sıfatı bul, sadece o kelimeye:

<span style={{
  background: "linear-gradient(90deg, hsl(var(--forge-molten)), hsl(var(--forge-amber)))",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
}}>
  [KELIME]
</span>

Sadece bu dosyaya dokun: src/components/FinalCTASection.tsx
```

### 5.3 MaterialsSection 3D flip cards

```
MaterialsSection.tsx'deki desktop kart bileşenine CSS 3D flip ekle.
Mobile kartlara dokunma.

<style> bloğuna veya global CSS'e ekle:
.flip-card { perspective: 1000px; }
.flip-card-inner {
  position: relative;
  width: 100%; height: 100%;
  transition: transform 0.7s cubic-bezier(0.76, 0, 0.24, 1);
  transform-style: preserve-3d;
}
.flip-card:hover .flip-card-inner { transform: rotateY(180deg); }
.flip-card-front,
.flip-card-back {
  position: absolute; inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.flip-card-back { transform: rotateY(180deg); }

Desktop kart wrapper'ına className="flip-card" ekle.
İç wrapper'a className="flip-card-inner" ekle.
Mevcut içeriği .flip-card-front div'ine koy.
.flip-card-back div'ine teknik özellikler tablosu koy.

BlurImage.tsx ve disableScaleTransform prop'una dokunma.

Sadece bu dosyaya dokun: src/components/MaterialsSection.tsx
```

---

## Faz 6 — Güvenlik Denetimi

```
Kapsamlı güvenlik denetimi. KOD DEĞİŞTİRME.

1. RLS: Her tabloyu listele. RLS olmayan var mı?
2. Secrets: Hardcoded API key, token var mı?
3. Auth: CustomerProtectedRoute doğru çalışıyor mu?
4. RFQ insert: user_id olmadan insert mümkün mü?
5. Storage: cad-uploads bucket herkese açık mı?

Rapor: ✅ geçti, ⚠️ uyarı, ❌ kritik
```

---

## Hata Ayıklama

### Section layout çökmesi

```
Hero'dan sonra tüm section'lar 0 yüksekliğe sahip görünüyor.

ADIM 1 — Hero wrapper:
position: relative ve min-h-screen birlikte var mı?
Tüm absolute çocuklar bu wrapper içinde mi?

ADIM 2 — Index.tsx:
Framer Motion wrapper'larından biri position: absolute almış mı?
overflow: hidden kesen bir parent var mı?

ADIM 3 — Geçici çözüm:
ParallaxSection whileInView'larda viewport={{ once: true, amount: 0 }}

KOD DEĞİŞTİRMEDEN ÖNCE raporla.
```

### Seviye 1

```
[BİLEŞEN] üzerindeki [HATA]'yı düzelt.
Konsol: [hata]
Beklenen: [X] / Gerçek: [Y]
Sadece [DOSYA]'ya dokun.
```

"Dene ve Düzelt" 3 kez → Seviye 2.

### Seviye 2

```
Sorun devam ediyor. KOD DEĞİŞİKLİKLERİNİ DURDUR.
1. Hata nereden kaynaklanıyor?
2. Beklenen vs gerçek akış?
3. Hangi dosyalar dahil?
4. Olası kök nedenler?
Düzeltme önermeden ÖNCE raporla.
```

---

## Tasarım Sistemi

### Renk Tokenları

```css
:root {
  --brand: #0688AD;  --brand-dark: #045E7A;  --brand-dim: rgba(6,136,173,0.12);
  --success: #1A7F37;  --success-bg: #DAFBE1;
  --warning: #9A6700;  --warning-bg: #FFF3CD;
  --danger:  #CF222E;  --danger-bg:  #FFEBE9;
}
```

### Tipografi

JetBrains Mono → tüm rakamlar, ID'ler, tarihler, teknik değerler. Exo 2 → metin.

### Animasyon

```
UI: 200–400ms / ease [0.4,0,0.2,1]
Dramatik: 600–1000ms / ease [0.76,0,0.24,1]
Spring (scroll): stiffness 200, damping 40
Stagger: 50–80ms
```

### Kritik Kurallar

```
1. useTransform → döngü içinde değil, child component
2. wipe-mask giriş: inset(100% 0 0 0) → inset(0% 0 0 0)
3. mix-blend-mode: difference → backdropFilter: invert(0.8)
4. footer → sticky bottom-0 -z-10 (position: fixed değil)
5. h-[400vh] → lg:h-[400vh] (mobile boşluk kalmasın)
```

### Credit Tasarrufu

CSS/spacing → Visual Edit (ücretsiz) · Tanı → Plan Mode · "Dene ve Düzelt" 3× ücretsiz · Her çalışan durum → PIN · Screenshot ekle · Tek promptta tek fix.
