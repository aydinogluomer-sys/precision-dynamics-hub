# Plan: Kalan Fazları Uygula

## Durum Analizi


| Faz                                  | Durum      |
| ------------------------------------ | ---------- |
| Faz 1 — DB Tabloları + RLS           | TAMAMLANDI |
| Faz 2 — URL Routing + Sidebar Toggle | YAPILACAK  |
| Faz 3 — Sayfalama (5 Tab)            | TAMAMLANDI |
| Faz 4 — Destek Split-Panel Chat      | YAPILACAK  |
| Faz 5.1 — FAQ Accordion animasyonu   | TAMAMLANDI |
| Faz 5.2 — FinalCTA gradient text     | TAMAMLANDI |
| Faz 5.3 — Materials 3D flip          | TAMAMLANDI |
| Faz 6 — Güvenlik Denetimi            | YAPILACAK  |


**3 faz kaldı: Faz 2, Faz 4, Faz 6.**

---

## Faz 2 — URL Routing + Sidebar Toggle

**Dosyalar:** `MusteriPaneli.tsx`, `MusteriHeader.tsx`

1. **MusteriPaneli.tsx ve MusteriHeader.tsx'e iki değişiklik yap.**
  **1. MusteriPaneli.tsx — URL tabanlı tab routing:**
  **useState("genel") yerine useSearchParams kullan.**
  **const [searchParams, setSearchParams] = useSearchParams();**
  **const activeTab = searchParams.get("tab") || "genel";**
  **const setTab = (tab: string) => setSearchParams({ tab }, { replace: true });**
  **Tüm onTabChange={setActiveTab} çağrılarını onTabChange={setTab} yap.**
  **setSidebarCollapsed'ı MusteriHeader'a onToggleSidebar prop olarak geç.**
2. **MusteriHeader.tsx — Sidebar toggle butonu:**
  **onToggleSidebar: () => void prop'u ekle.**
  **Header'ın sol tarafına bu butonu ekle:**
  **<button onClick={onToggleSidebar} className="p-2 rounded hover:bg-muted transition-colors">**
    **{sidebarCollapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}**
  **</button>**
  **sidebarCollapsed prop'unu da MusteriHeader'a geç.**
  **Sadece bu iki dosyaya dokun.**

---

## Faz 4 — Destek Split-Panel Chat

**Dosya:** `DestekTab.tsx`

DestekTab.tsx'i split-panel chat layout'a çevir.

Tüm Supabase logic (fetchTickets, loadMessages, handleReply, handleSubmit, realtime channel, pagination) korunacak — sadece JSX layout değişecek.

resizable bileşeni zaten mevcut, kurulum yapma, direkt import et:

import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

Layout:

- ResizablePanelGroup direction="horizontal" (lg ve üzeri)

- Sol panel defaultSize=30: ticket listesi + üstte "Yeni Talep" butonu

- Sağ panel defaultSize=70: seçili ticket mesajlaşma ekranı

Ticket listesinde her item: subject (truncate) + message preview (truncate, 1 satır) + status badge + tarih. Aktif ticket: bg-primary/5 + border-l-2 border-primary.

Mesaj balonları:

- Müşteri mesajı: bg=#0688AD, color=white, justify-end, border-radius: 8px 8px 3px 8px

- Staff mesajı: bg=primary/10, color=primary, justify-start, border-radius: 8px 8px 8px 3px

- max-width: 75%, font-size: 13px

Input alanı: Textarea (2 satır) + gönder butonu. Enter gönderir, Shift+Enter yeni satır.

Kapalı/çözülmüş ticketlarda input gizle.

Sağ panel boşken: ortada MessageSquare ikonu + "Bir destek talebi seçin" yazısı.

Yeni talep formu: mevcut form state ve handleSubmit korunur, Dialog veya Sheet içine taşı.

Mobil (lg altı): expandedTicket null ise ticket listesi fullscreen. Ticket seçilince mesaj ekranı fullscreen + sol üstte geri butonu.

Sadece DestekTab.tsx'e dokun.

---

## Faz 6 — Güvenlik Denetimi

Kod değişikliği yapılmadan önce rapor:

1. Güvenlik denetimi yap. Hiçbir dosyayı değiştirme, sadece raporla.
  Kontrol et:
  1. Supabase tablolarının tamamında RLS aktif mi? RLS politikası olmayan tablo varsa işaretle.
  2. Tüm .tsx ve .ts dosyalarında hardcoded API key, token veya şifre var mı?
  3. CustomerProtectedRoute — getSession ve onAuthStateChange doğru sırada mı?
  4. rfqs tablosuna user_id olmadan insert mümkün mü? (anonim kullanıcı riski)
  5. cad-uploads storage bucket herkese açık mı, sadece auth kullanıcılar mı erişebilir?
  Her madde için: ✅ geçti / ⚠️ uyarı / ❌ kritik
  Rapor bittikten sonra ❌ kritik olan varsa düzeltmek için onay iste.

---

## Uygulama Sırası

1. Faz 2 (2 dosya, hızlı)
2. Faz 4 (1 dosya, orta karmaşıklık)
3. Faz 6 (audit + gerekli fix'ler)