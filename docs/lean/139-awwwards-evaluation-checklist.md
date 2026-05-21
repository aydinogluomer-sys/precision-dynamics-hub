# Awwwards Evaluation Checklist — Mas Technic Precision Dynamics Hub

**Hedef:** Honorable Mention (SOTD değil)
**5 Kriter:** Her biri /10. Geçme eşiği ~7.5.

---

## 1. Design (Hedef: ≥7.5)

### Layout & Composition
- [ ] Visual hierarchy açık — tek bakışta odak noktası anlaşılıyor
- [ ] Grid sistemi tutarlı — 8-kolon, 2rem gap, max-w-[1400px]
- [ ] Negatif alan bilinçli — her section nefes alıyor
- [ ] Section geçişleri pürüzsüz — renk ve ritim sürekliliği

### Typography
- [ ] Display büyük, cesur — Space Grotesk Bold `clamp(6rem, 18vw, 22rem)` hero'da
- [ ] Mono font teknik elementlerde — IBM Plex Mono etiketler, stat'lar
- [ ] Satır uzunluğu kontrol — body ≤65 karakter
- [ ] Leading sıkı başlıklarda (`0.9–1.05`) — okuyuculuğu artırır

### Color
- [ ] Forge paleti tutarlı — obsidian / gunmetal / workshop döngüsü
- [ ] Molten aksan az — max 2 CTA/section
- [ ] Teal interaktif rolde — buton, link, fokus

---

## 2. Usability (Hedef: ≥7.5)

- [ ] Nav: tüm section'lara smooth scroll link
- [ ] CTA butonlar: `aria-label` ve anlamlı metin
- [ ] Mobile: tek sütun, touch target ≥44px
- [ ] Form (RFQ): validation gerçek zamanlı, hata açıklayıcı
- [ ] Loading state: skeleton veya spinner
- [ ] Keyboard nav: Tab sırası mantıklı, focus visible
- [ ] Skip-to-content link (`#main`) en üstte (screen reader)

---

## 3. Creativity (Hedef: ≥7.5)

- [ ] Hero: LiquidImage R3F shader + parallax
- [ ] WhyUs: IndustrialFogBg FBM domain warp
- [ ] Certifications: HexPrecisionBg hexagonal grid
- [ ] HowWeWork: horizontal pin-scrub + BlueprintLines
- [ ] CNC Story: frame sequence scroll animation
- [ ] Typography kinetics: skewX scroll velocity reaktif
- [ ] Custom cursor: velocity reactive (desktop)
- [ ] Page transition: clip-path polygon reveal

---

## 4. Content (Hedef: ≥8.0)

- [ ] Hero manifesto anlamlı — "mikron hassasiyet" net mesaj
- [ ] Stats gerçek — 45+ tezgâh, 3500+ proje, 15+ yıl
- [ ] Sertifikalar logosu/ismi doğru (ISO/AS/IATF/NIST)
- [ ] Hizmetler kapsam tüm CNC kategorileri
- [ ] Malzemeler 500+ kaydı Supabase'de
- [ ] Müşteri referansları: isim + sektör + kısa alıntı
- [ ] Blog: en az 3 teknik makale
- [ ] İletişim: gerçek adres, telefon, harita

---

## 5. Developer (Hedef: ≥8.0)

### Performance
- [ ] Lighthouse Performance ≥90 (mobile throttled)
- [ ] LCP <2.5s, CLS <0.1, INP <200ms
- [ ] Bundle: Three.js + R3F lazy (code-split) ✅
- [ ] Images: WebP, `loading="lazy"` below-fold
- [ ] Fonts: `font-display: swap`, subset woff2

### Code Quality
- [ ] TypeScript strict, no `any`
- [ ] `npm run build` — zero TS error
- [ ] GSAP cleanup — `ctx.revert()` her component
- [ ] No console.error in prod
- [ ] Env vars: `.env.example` dokümante

### Accessibility
- [ ] Semantic HTML — `section`, `article`, `main`, `nav`
- [ ] Alt text tüm görsellerde
- [ ] WCAG AA kontrast
- [ ] `prefers-reduced-motion` kontrol her animasyonda
- [ ] Canvas/video: `aria-hidden="true"`

---

## Puanlama Tahmini (Mevcut Durum)

| Kriter | Tahmini Skor | Açık |
|--------|-------------|------|
| Design | 7.5 | Display mega typography eksik bazı section'larda |
| Usability | 7.5 | Skip-to-content, enhanced form validation |
| Creativity | 7.8 | Shader backgrounds ✅, kinetic typo ✅ |
| Content | 7.5 | Blog yazıları, gerçek müşteri referansları |
| Developer | 8.0 | Lighthouse ≥90 hedef, accessibility audit |
