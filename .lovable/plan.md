

# 3 Görev: Section Boyları, Nexus Video Kilidi, Hassas İşleme Aurora Geçişi

## 1. Section Boylarını Tam Ekran Yap

Şu anda birçok section kısa kalıyor. Tüm ana section'lara `min-h-screen` eklenecek:

| Section | Mevcut | Değişiklik |
|---------|--------|-----------|
| HeroSection | `min-h-screen` ✓ | Değişiklik yok |
| NexusPromoSection | `min-h-screen` ✓ | Değişiklik yok |
| HowWeWorkSection | `min-h-[50vh]` | → `min-h-screen` |
| CertificationsSection | `min-h-[60vh]` | → `min-h-screen` |
| VideoScrollSection | `h-[200vh]` (scroll area) | Değişiklik yok |
| ServicesSection | `py-20 md:py-28` | → `min-h-screen flex flex-col justify-center` |
| IndustriesSection | `py-16 md:py-20` | → `min-h-screen flex flex-col justify-center` |
| MaterialsSection | Kontrol edilecek | → `min-h-screen` |
| WhyUsSection | Kontrol edilecek | → `min-h-screen` |
| CapabilitiesSection | `py-16 md:py-24` | → `min-h-screen flex flex-col justify-center` |
| StatsSection | `py-20` | → `min-h-screen flex items-center` |
| TestimonialsSection | `py-20 md:py-28` | → `min-h-screen` |
| FAQBlogSection | section-industrial | → `min-h-screen` |
| FinalCTASection | `py-20 md:py-28` | → `min-h-screen flex items-center justify-center` |

**Dosyalar**: Tüm section component dosyaları (12 dosya)

---

## 2. NexusPromoSection'a Video + Scroll Kilidi

Müşteri panelini tanıtan kısa bir tanıtım videosu eklenecek. Video bitene kadar kullanıcı aşağı scroll yapamayacak.

**Teknik yaklaşım:**
- NexusPromoSection'a bir `<video>` elementi ekle (autoPlay, muted)
- Video oynatılırken `overflow: hidden` ile body scroll'u kitle (`document.body.style.overflow = "hidden"`)
- Video `onEnded` event'inde scroll kilidini kaldır
- Videonun üzerine "Skip" butonu ekle (kullanıcı isterse atlayabilsin)
- Video kaynağı: Mevcut `cnc-factory-zoom.mp4` kullanılabilir veya yeni bir placeholder video

**Not:** Projede sadece 2 mp4 var (`cnc-factory-zoom.mp4`, `cnc-machining-video.mp4`). Müşteri paneli için özel bir video olmadığından, `cnc-machining-video.mp4` kullanılacak ve ilerleyen aşamada gerçek tanıtım videosuyla değiştirilebilir.

**Dosya**: `src/components/NexusPromoSection.tsx`

---

## 3. Hassas İşleme (VideoScrollSection) — Beyaz Geçiş → Aurora Background

**Sorun:** VideoScrollSection'ın exit overlay'i `hsl(var(--background))` kullanıyor — light mode'da beyaz. Sonraki section'a geçişte beyaz bir flash oluşuyor.

**Çözüm:**
1. Exit overlay'in rengini `hsl(var(--forge-obsidian))` (koyu) yap — beyaz flash yok
2. Section'lar arası geçişe **Aurora Background** efekti ekle

**Aurora Background uygulaması:**
- `src/components/ui/aurora-background.tsx` dosyası oluştur (kullanıcının verdiği component)
- `tailwind.config.ts`'e `aurora` keyframe animation'ı ve `addVariablesForColors` plugin ekle
- VideoScrollSection'ın exit overlay'inde veya VideoScrollSection ile ServicesSection arasında bir ara geçiş bölümü olarak kullan
- Aurora renklerini mevcut forge palette ile uyumlu tut (teal/obsidian tonları)

**Dosyalar:**
- `src/components/ui/aurora-background.tsx` (yeni)
- `src/components/VideoScrollSection.tsx` (exit overlay düzeltme)
- `src/pages/Index.tsx` (Aurora geçiş section'ı ekleme)
- `tailwind.config.ts` (aurora animation + color variables plugin)

