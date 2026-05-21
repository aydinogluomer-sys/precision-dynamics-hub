# ACTIVE_TASK.md
> Her session başında oku. Bitince güncelle.

---

## Aktif Phase
**Phase 4.5 — Art Direction QA (Manuel)**

## Tamamlanan
- ✅ Phase 1 — Documentation (22 dosya + README.md)
- ✅ Phase 2 — Animation Architecture Centralization
- ✅ Phase 3 — Visual Elevation (entrance, kinetic typo, depth CSS)
- ✅ Phase 4 — Interaction Polish (velocity cursors, hover baseline, page transition)
- ✅ Phase 5 — Performance (will-change, BlurImage priority, Supabase preconnect)
- ✅ Phase 6 — Section Animation Elevation (2026-05-17)
- ✅ Phase 7 — Interaction & GPU Polish (2026-05-17)
- ✅ Phase 8 — Release Polish (2026-05-18)
  - robots.txt, JSON-LD schema, useEffect dep fix, video lazy-load, header reduced-motion
  - CookieBanner (KVKK), EngineeringSection (awwwards scroll-pin sahne)
  - AtlasCloud Seedance 2.0 script (Version B prompt)
- ✅ Phase 9 — Navigation & SEO Fix (2026-05-18)
  - CertificationsSection Index.tsx'e eklendi (lazy import + FlowScene id="sertifikalar")
  - hwwToCertGlow SectionTransitionGlow (light-to-dark, forge-iron) eklendi
  - 6 FlowScene'e eksik id eklendi: nasil-calisiyoruz, hizmetler, endustriler, malzemeler, kabiliyetler, referanslar
  - sitemap.xml oluşturuldu (10 public route, priority/changefreq)
  - robots.txt Sitemap direktifi eklendi

- ✅ Phase 10 — Awwwards Reference Patterns I (2026-05-18)
  - Hero fold-away (rotate+scale scrub), VideoScrollSection circle clip expand
  - WhyUsSection SplitText word color reveal (manifesto paragraph)
  - ProjectShowcase codrops crush exit (scaleX+scaleY+skewY on scroll-off)
  - SectionHeader polygon clip-path word wipe (all SectionHeader titles)
- ✅ Phase 11 — Awwwards Reference Patterns II (2026-05-18)
  - WhyUsSection stats: rotationZ alternating spin entry (demo8 pattern)
  - WhyUsSection advantages: 3D rotationX perspective flip entry (demo7 pattern)
- ✅ Phase 12 — Shader Backgrounds (2026-05-21)
  - IndustrialFogBg.tsx: R3F FBM fog shader (gunmetal/teal/molten)
  - WhyUsCanvas.tsx: IO lazy R3F canvas wrapper
  - HexPrecisionBg.tsx: raw WebGL hexagonal precision grid
  - BlueprintLines.tsx: SVG diagonal blueprint pattern
  - WhyUsSection + CertificationsSection + HowWeWorkSection entegrasyon
- ✅ ROADMAP Phase 2 Docs (2026-05-21)
  - 11 yeni lean doc: code-style, state-mgmt, perf-budget, dependency-policy,
    frontend-perf-rules, anti-pattern-library, testing-strategy, definition-of-done,
    design-critique, awwwards-eval, pre-launch-audit

## Şu An
Tüm kod fazları ve ROADMAP Phase 2 auto-generable docs tamamlandı.

## Bekleyen Manuel Görevler (Headless Kısıtı)

### Phase 4.5 — Art Direction QA
`docs/lean/release-checklist.md` → Phase 4.5 bölümündeki her madde canlı tarayıcıda kontrol edilmeli:
- Hero: "Premium Industrial" ilk 3 saniyede net mi?
- Entrance 1.2s altında bitiyor mu?
- Motion ritmi: HIGH → CALM → CONTRAST → CALM var mı?
- CTA'lar (molten) dikkat çekiyor mu?
- Mobile'da premium hissi var mı, Lenis-off kırılıyor mu?

### Browser Verification
- sessionStorage sıfırla → entrance 1.7s'de tamamlanmalı
- Headline t=0.6s'de belirmeli
- hızlı scroll'da skewX ±3deg lean görünmeli
- ScrollTrigger: `ScrollTrigger.getAll().length` route geçişinden sonra artmamalı
- Cursor velocity scale: hızlı scroll'da ring büyümeli
- PageTransition: /teklif-al → molten, diğer → teal

## Aktif Constraint'ler
- `npm run build` her commit öncesi geçmeli
- Supabase schema / `/admin/*` / `/musteri-paneli/*` — dokunma yok
- Lenis mobile'da (<768px) kapalı
- gsap.context() cleanup zorunlu
- Reduced-motion check zorunlu
- Hardcoded renk / Z dışı z-index yok

## Blocker
Yok. Kalan görevler yalnızca canlı tarayıcıda manuel test ya da API key ile video üretimi.

---
*Detay için:* `docs/lean/task-backlog.md`
