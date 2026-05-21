# Pre-Launch Audit — Mas Technic Precision Dynamics Hub

Yayına almadan önce tüm maddeler ✅ olmalı.

## Build & Deploy

- [ ] `npm run build` — sıfır TypeScript hatası
- [ ] `npm run test -- --run` — sıfır test hatası
- [ ] Bundle boyutları limit içinde (`051-performance-budget.md`)
- [ ] `.env.local` / üretim env değişkenleri Lovable/hosting'de set edildi
- [ ] Supabase üretim projesine geçildi (dev değil)
- [ ] CDN cache invalidate edildi (Lovable preview her deploy'da yapar)

## Lighthouse Audit (Mobile, Slow 4G)

```bash
npx lighthouse https://mas-technic-precision.lovable.app \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=html --output-path=./lighthouse-report.html
```

- [ ] Performance ≥90
- [ ] LCP <2.5s
- [ ] CLS <0.1
- [ ] INP <200ms
- [ ] Accessibility ≥90
- [ ] Best Practices ≥90
- [ ] SEO ≥90

## Erişilebilirlik

- [ ] Axe-core tarama: sıfır kritik hata (`@axe-core/puppeteer`)
- [ ] Klavye navigasyon tam çalışıyor (Tab + Enter + Escape)
- [ ] Screen reader test (VoiceOver / NVDA): hero, nav, form
- [ ] Focus indicator görünür (outline)
- [ ] Skip-to-main-content linki var
- [ ] `lang="tr"` html tag'inde

## Responsive / Cross-Browser

- [ ] Mobile 375px (iPhone SE) — layout kırılmıyor
- [ ] Mobile 390px (iPhone 14) — layout kırılmıyor
- [ ] Tablet 768px — geçiş noktası temiz
- [ ] Desktop 1440px — container sınırları tutarlı
- [ ] Ultrawide 1920px+ — max-width bound çalışıyor
- [ ] Chrome ≥120 ✅
- [ ] Safari ≥17 — GSAP clip-path, WebGL test
- [ ] Firefox ≥120 — WebGL fallback
- [ ] iOS Safari 17 — smooth scroll native

## Animasyon & Motion

- [ ] `prefers-reduced-motion: reduce` → tüm animasyonlar skip (test: DevTools > Rendering)
- [ ] Hero entrance ilk ziyarette çalışıyor (sessionStorage temizle)
- [ ] HowWeWork horizontal scrub takılmıyor
- [ ] Three.js canvas'lar viewport dışında unmount ediliyor
- [ ] GSAP ScrollTrigger route change'de temizleniyor
- [ ] Console'da "ScrollTrigger already registered" uyarısı yok

## SEO & Meta

- [ ] `<title>` her sayfa için unique (React Router meta)
- [ ] `<meta name="description">` doldurulmuş
- [ ] OG tags: `og:title`, `og:description`, `og:image` (1200×630px)
- [ ] Twitter Card tags
- [ ] `sitemap.xml` güncel ve tüm route'ları içeriyor
- [ ] `robots.txt` admin/müşteri paneli disallow edilmiş
- [ ] JSON-LD schema: `Organization` + `LocalBusiness` (İstanbul, CNC imalat)

## İçerik

- [ ] Türkçe metinler son kez gözden geçirildi (yazım hatası yok)
- [ ] Telefon numarası tıklanabilir (`href="tel:..."`)
- [ ] E-posta tıklanabilir (`href="mailto:..."`)
- [ ] Google Maps embed veya adres linki çalışıyor
- [ ] RFQ formu test edildi — email geldi mi?
- [ ] Tüm görseller yüklenıyor (404 yok)
- [ ] Tüm linkleri kontrol: internal + external (dead link yok)

## Güvenlik

- [ ] Supabase RLS aktif tüm tablolarda
- [ ] API key'ler env'de (`VITE_SUPABASE_*`), kaynak kodda değil
- [ ] hCaptcha RFQ formunda aktif
- [ ] Content Security Policy header set
- [ ] HTTPS zorunlu (redirect)

## Post-Launch

- [ ] Supabase dashboard monitor: sorgu süreleri, hata oranları
- [ ] Error tracking (Sentry opsiyonel)
- [ ] Analytics aktif (Lovable analytics veya external)
- [ ] Core Web Vitals field data 2 hafta izle (Google Search Console)
