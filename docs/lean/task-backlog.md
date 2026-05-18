# Task Backlog — Mas Technic
> Planlanan görevler. Aktif task için ACTIVE_TASK.md.

---

## Phase 1 — Documentation ✅ (2026-05-12)
Tüm root + docs/lean/ + snippets/ tamamlandı.

## Phase 2 — Animation Architecture ✅ (2026-05-12)
- animation-manager.ts (singleton registerPlugin + batchReveal + killAll)
- useScrollAnimation.ts (universal hook + reduced-motion)
- 5 dosyadan duplicate registerPlugin kaldırıldı
- Lenis tuning: lerp:0.065, wheelMultiplier:0.75, exponential easing
- npm run build temiz

---

## Phase 2.5 — Cleanup ✅ (2026-05-12)
- [x] Doc kısaltma (tüm lean dosyalar ≤150 satır)
- [x] plan-revised eklemeleri (Todo Kuralı, Soyutlama, Phase 4.5, 3 Zorunlu Adım, Doc Lifecycle)
- [x] Browser ScrollTrigger leak check (headless kısıtı — canlı tarayıcıda manuel)
- [x] Phase 3 reference repo snippet damıtması
- [x] isFirstVisit + reuse hook doğrulaması

---

## Phase 3 — Visual Elevation ✅ (2026-05-12)

### 3A — Hero Cold-Load Entrance ✅
- useHeroEntrance.ts (t=0 grid → 0.3 tag → 0.6 headline → 1.0 CTA → 1.2 canvas, toplam 1.7s)
- showHeadline state gate
- Reduced-motion: instant state

### 3B — Kinetic Typography ✅
- HeadlineStagger + useScrollVelocity skewX (±3deg max)
- Reduced-motion: skew yok

### 3C — Depth System CSS ✅
- `.section-pin`, `.depth-layer-{1,2,3}`, `.reveal-clip-vertical`, `.text-balance`
- Snippet cinematic-hero-timeline.ts → implement sonrası silindi

---

## Phase 4 — Interaction Polish ✅ (2026-05-12)

### 4A — Cursor ✅
- CustomCursor: velocity × hover scale (hoverScaleRef + velocityMultRef, 1.0→1.5 mult)
- BrutalCrosshairCursor: inline scroll listener → dot scale 1.0→1.5
- mix-blend-mode:difference cursor dot zaten mevcuttu

### 4B — Hover Standardize ✅
- Baseline: `a`, `button`, `[role=button]` → `transition: 0.25s cubic-bezier(0.76,0,0.24,1)`
- `:not` selector ile mevcut btn-*/transition sınıflarını atla

### 4C — Page Transition ✅
- Exit: 0.5s → 0.4s
- forge-teal (std routes) / forge-molten (/teklif-al, /iletisim)

---

## Phase 4.5 — Art Direction QA ⏳
Geçiş koşulu (Phase 5'e): tüm maddeler ✅ (release-checklist.md'deki QA bölümü)

---

## Phase 5 — Performance ✅ (2026-05-12)

### 5A — GPU Compositing ✅
- `body::after` grain: `will-change: auto` kaldırıldı (no-op'tu, `contain: strict` yeterli)
- `.hero-panel`/`.quote-panel` CSS'te yok — HeroSection GSAP scrub zaten GPU'da
- `.marquee-inner` + `.aw-lift` `will-change: transform` zaten doğruydu ✅

### 5B — ScrollTrigger Batching ✅ (değişiklik gerekmedi)
- HeroSection 4-phase choreography: scrub animation — batch'lenemez
- HowWeWorkSection: pin+scrub — batch'lenemez
- `useStaggeredReveal.ts`: zaten batch pattern kullanıyor ✅
- `batchReveal()` animation-manager'da hazır, ihtiyaç çıkınca kullanılabilir

### 5C — Image ✅
- `BlurImage.tsx`: `priority` prop eklendi + `decoding="async"` eklendi
- Above-fold kullanım: `<BlurImage priority />` ile LCP iyileştirmesi etkinleştirilebilir

### 5D — Font / Network ✅
- `font-display:swap`: Google Fonts URL'sinde `display=swap` zaten mevcuttu ✅
- Supabase CDN preconnect: `index.html`'e eklendi
- `type="module"` script implicit defer davranışı ✅

### Verification (Manuel — Headless Kısıtı)
- Lighthouse mobile (4x CPU, slow 4G): Performance ≥90, LCP<2.5s, CLS<0.1, INP<200ms

---

## Phase 6 — Section Animation Elevation ✅ (2026-05-17)

### 6A — CapabilitiesSection GSAP Clip-Path ✅
- FM `initial/whileInView` row reveals → GSAP `clip-path: inset(0 100% 0 0 → 0%)` scan-line stagger (0.12s)
- `gsap.context()` + ScrollTrigger, `caps-eq-row` class selector pattern
- Machine-loading scan aesthetic on equipment table

### 6B — StatsSection Scroll Fill Bars ✅
- FM `motion.div` fill bar (`h-px`, forge-molten) inside each StatCard
- `scaleX: 0 → 1`, duration: 1.4s, delay staggered by index × 0.12s
- Visual precision-measurement metaphor (progress bar sweep)

### 6C — README.md ✅
- 415-satır kapsamlı proje dökümantasyonu oluşturuldu
- Stack tablosu, DB şeması, animasyon mimarisi, awwwards kriterleri

---

## ROADMAP Phase 2 Backlog (İhtiyaç Çıkınca)
UX/IA, screen map, component system spec, microinteraction spec, code style guide, performance budget, SEO metadata, analytics events.

---

## Phase 7 — Interaction & GPU Polish ✅ (2026-05-17)

### 7A — TestimonialsSection Blur Reduction ✅
- Stacked card blur: `p * 6px` → `p * 2px` max — reduces motion sickness, cleaner stack

### 7B — FinalCTASection GPU Hint ✅
- Non-gradient char spans: added `will-change:transform` to inline style
- GPU compositing on 40+ simultaneously animated chars

### 7C — HowWeWorkSection Counter Animation ✅
- Step counter now `gsap.fromTo(y:-8→0, opacity:0.2→1, 0.22s)` on each step change
- Smooth slide-in on step increment (01 → 02 → 03 → 04)

### 7D — WhyUsSection Fill Bars ✅
- Same fill bar pattern (h-px, forge-molten, scaleX 0→1) added to 4 stats cells
- Consistent precision-measurement language across WhyUsSection + StatsSection

---

---

## Phase 8 — Release Polish ✅ (2026-05-18)

### 8A — Release Checklist Programatik Düzeltmeler ✅
- `public/robots.txt`: /admin + /musteri-paneli Disallow kuralları eklendi
- `index.html`: JSON-LD Organization + LocalBusiness schema eklendi
- `HeadlineStagger.tsx`: useEffect eksik dep fix ([velocity, direction, prefersReduced, velocityMV])
- `useHeroEntrance.ts`: useEffect deps eslint-disable (stable refs + state setter)
- `HeroSection.tsx`: bgVideoRef + maskVideoRef IntersectionObserver lazy play/pause
- `Header.tsx`: reduced-motion guard (FM animate, transition, stagger), hoverTimeout type fix

### 8B — KVKK Cookie Banner ✅
- `src/components/CookieBanner.tsx`: localStorage "mas-cookie-consent", AnimatePresence slide-up
- `src/App.tsx`: non-panel route'larda `<CookieBanner />` mount

### 8C — Mühendislik & Üretim Sahnesi ✅
- `src/components/EngineeringSection.tsx`: awwwards-quality 4-aşamalı GSAP scroll-pin
  - Blueprint SVG grid overlay, video bg (luminosity blend), scan-line clip-path reveal
  - 4 stage: Tasarım/teal, Malzeme/molten, İşleme/amber, Kalite/primary
  - Molten progress bar, step counter (fromTo y-10→0 flash)
  - IntersectionObserver video play/pause, usePrefersReducedMotion guard
- `src/styles/z-index.ts`: engineeringScene:22 eklendi
- `src/pages/Index.tsx`: EngineeringSection lazy import + FlowScene

### 8D — AtlasCloud Seedance 2.0 Script ✅
- `scripts/generate-engineering-video.py`: AtlasCloud REST API (Bearer auth, poll loop)
- Prompt Version B: "factory nighttime dolly, CNC rows, cold blue, no people"
- `ratio: "16:9"`, `generate_audio: False`, `watermark: False`
- Çalıştırma: `ATLASCLOUD_API_KEY=<key> python3 scripts/generate-engineering-video.py`

### Verification
- `tsc --noEmit` → hata yok ✅
- `eslint` (yeni/değiştirilen dosyalar) → warning yok ✅
- `npm run build` → temiz ✅

---

---

## Phase 9 — Navigation & SEO Fix ✅ (2026-05-18)

### 9A — CertificationsSection Index.tsx'e Eklendi ✅
- Lazy import eklendi
- FlowScene `id="sertifikalar"`, `backgroundColor: forge-iron`
- `hwwToCertGlow` SectionTransitionGlow (light-to-dark, toColor: forge-iron) eklendi
- Sıra: HowWeWork → glow → Certifications → VideoScroll (SECTION_Z sırasıyla uyumlu)

### 9B — Eksik FlowScene id'leri Eklendi ✅
| Section | Eski | Yeni |
|---------|------|------|
| HowWeWork | id yok | `id="nasil-calisiyoruz"` |
| Services | id yok | `id="hizmetler"` |
| Industries | id yok | `id="endustriler"` |
| Materials | id yok | `id="malzemeler"` |
| Capabilities | id yok | `id="kabiliyetler"` |
| Testimonials | id yok | `id="referanslar"` |
Dot-nav artık tüm 19 section'ı yakalar.

### 9C — sitemap.xml ✅
- `public/sitemap.xml` oluşturuldu (10 public route)
- `robots.txt`'e `Sitemap:` direktifi eklendi

### Verification
- `tsc --noEmit` → hata yok ✅
- `eslint src/pages/Index.tsx` → warning yok ✅
- `npm run build` → temiz ✅

---

---

## Phase 10 — Awwwards Reference Patterns I ✅ (2026-05-18)

### 10A — Hero Fold-Away ✅
- `HeroSection.tsx`: `gsap.to(stickyRef, { rotate:3, scale:0.9, scrub:1.5 })` — scroll off fold
- ref-fullstack BenefitSection pattern

### 10B — Circle Clip Expand ✅
- `VideoScrollSection.tsx`: `clipPath: circle(0%→150%)` GSAP on entry (1.6s, power3.out)
- ref-fullstack VideoPinSection pattern

### 10C — SplitText Word Color Reveal ✅
- `WhyUsSection.tsx`: manifesto paragraph word-by-word `forge-silver/0.2→foreground` scrub
- ref-fullstack MessageSection pattern

### 10D — Codrops Crush Exit ✅
- `ProjectShowcase.tsx`: horizontal scroll card exit `scaleX:0, scaleY:2.5, skewY:random(-5,5)`
- ref-codrops demo6 pattern

### 10E — Polygon Clip-Path Word Wipe ✅
- `SectionHeader.tsx`: each word `polygon(0→100%)` motion.span wipe reveal
- ref-fullstack BenefitSection title pattern

---

## Phase 11 — Awwwards Reference Patterns II ✅ (2026-05-18)

### 11A — Stats rotationZ Spin Entry ✅
- `WhyUsSection.tsx`: `.stat-item` FM→GSAP, `rotationZ: ±14, y:40, opacity:0` alternating spin-in
- ref-codrops demo8 pattern

### 11B — Advantages 3D rotationX Flip Entry ✅
- `WhyUsSection.tsx`: `.advantage-item` FM→GSAP, `rotationX:65, scale:0.78, opacity:0, perspective:1000px`
- ref-codrops demo7 pattern

---

*Sıra: Phase 4.5 QA (manuel browser) → Seedance video üretimi (ATLASCLOUD_API_KEY ile)*
