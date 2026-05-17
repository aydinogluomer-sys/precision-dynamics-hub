# FAZ 4 — Section Brutalist Pass + Mikro-Etkileşim

**Kapsam:** Landing page'deki content section'larının (WhyUs, Services, Industries, Projects, Materials, Capabilities, Testimonials, FAQ, FinalCTA) görsel dilini brutalist editorial tablo/liste formatına çevir. İki yeni primitive (`BrutalSectionHeader`, `BrutalListRow`) + brutalist crosshair cursor + clip-path reveal + link underline draw + buton invert hover.

**Dokunulmayan:** Hero, Forge sahneleri, Header, Footer, route'lar, iş mantığı, Supabase, mevcut `SectionHeader.tsx` (yan yana yaşar).

---

## 7 Faz Genel Özeti (referans)

1. **FAZ 1** — Brutalist token sistemi (tamamlandı)
2. **FAZ 2** — Hero brutalist editorial rewrite
3. **FAZ 3** — FORGE SEQUENCE birleşik film (3 sahne → 1)
4. **FAZ 4** — Section brutalist pass + mikro-etkileşim ← **bu plan**
5. **FAZ 5** — GrainOverlay + ScanlineOverlay (FAZ 7 olarak yapıldı)
6. **FAZ 6** — Section transition divider temizliği (glow → keskin kesim)
7. **FAZ 7** — Eski sahnelerin DEPRECATED işaretlemesi + cleanup

---

## FAZ 4 — 22 Alt Adım

Her adım atomiktir, bağımsız fail-safe, tek prompt'ta gönderilir.

### A · Primitive Component'ler (yeni dosyalar)

| # | Dosya | İş |
|---|---|---|
| **4.01** | `BrutalSectionHeader.tsx` (yeni, ~80 satır) | Mono index (`02 / 17`) + mega headline + sağ-üst meta etiketi. `forwardRef`, `displayName`, named export. Word-stagger reveal `whileInView`. |
| **4.02** | `BrutalListRow.tsx` (yeni, ~60 satır) | `01 ─ TITLE ─── meta ─── →` satır primitivi. Hover: bg molten invert, sağ ok translate-x. Keyboard focusable. |
| **4.03** | `BrutalCrosshairCursor.tsx` (yeni, ~70 satır) | 3px kare + label ("VIEW · DRAG · SCROLL"). `gsap.quickTo`. Mevcut `CustomCursor` ile çakışmasın → flag prop ile geçici devre dışı. Mobile'da render etmez. |
| **4.04** | `useClipReveal.ts` (yeni hook, ~40 satır) | `clip-path inset(0 100% 0 0)` → `inset(0)`, 0.9s `cubic-bezier(0.76,0,0.24,1)`. `prefers-reduced-motion` → instant. |

### B · Section Brutalist Styling Pass (mevcut dosyalar — surgical edit)

Her adımda **sadece presentation** değişir (className/JSX wrapper). Data, state, business logic dokunulmaz.

| # | Dosya | İş |
|---|---|---|
| **4.05** | `ServicesSection.tsx` | Card-grid → `BrutalListRow` listesi (6 disiplin). Header → `BrutalSectionHeader index="02/17"`. |
| **4.06** | `IndustriesSection.tsx` | Card grid'i tablo formatına: `INDUSTRY ─── parts/yr ─── certifications`. Header değişimi. |
| **4.07** | `WhyUsSection.tsx` | Stat blokları → mono numerals + hairline divider. Header değişimi. |
| **4.08** | `ProjectShowcase.tsx` | Card border-radius `0`, hairline border, hover bg invert. İçerik düzeni korunur. |
| **4.09** | `MaterialsSection.tsx` | Material listesi → `BrutalListRow` (kod ─ alaşım ─ tolerans). |
| **4.10** | `CapabilitiesSection.tsx` | Spec tablosu format. Header değişimi. |
| **4.11** | `TestimonialsSection.tsx` | Quote kartları → editorial tipografi (mega quote mark, mono attribution). |
| **4.12** | `FAQBlogSection.tsx` | Accordion item'ları → hairline rule + mono index. Header değişimi. |
| **4.13** | `FinalCTASection.tsx` | Tek mega headline + tek molten invert CTA. Glow/gradient kaldırılır. |

### C · Mikro-Etkileşim & Global UI

| # | Dosya | İş |
|---|---|---|
| **4.14** | `index.css` | `.brutal-link` utility: `::after` 1px line, `transform: scaleX(0)`, hover `scaleX(1)`, `transform-origin` left, 0.4s. |
| **4.15** | `index.css` | `.btn-brutal-invert` utility: `border 1px hairline`, `bg-transparent`, hover `bg-[hsl(var(--brutalist-molten))]` + text invert. |
| **4.16** | `button.tsx` (variant ekle) | `variant: "brutal"` ekle. Mevcut variant'lar dokunulmaz. |
| **4.17** | `App.tsx` veya `Index.tsx` | `BrutalCrosshairCursor` mount (sadece `/` route'unda). Mevcut `CustomCursor` flag ile gizlenir. |
| **4.18** | `useClipReveal.ts` kullanımı | `BrutalSectionHeader` ve `BrutalListRow` bu hook'u tüketir. |

### D · Doğrulama & Smoke Checks

| # | İş |
|---|---|
| **4.19** | Build temiz: `npm run build` hata yok. Tüm import'lar çözülüyor. |
| **4.20** | A11y: Tüm `BrutalListRow` tab-focusable, focus-ring görünür. `prefers-reduced-motion` aktifken animasyonlar instant. |
| **4.21** | Mobile (<768px): crosshair cursor render edilmiyor, list row'lar tek kolon, header font-size scale ediyor. |
| **4.22** | Visual QA: 9 section'da brutalist tutarlılık. Buton hover invert çalışıyor. Link underline draw çalışıyor. CTA route'ları (`/teklif-al`, `/hizmetler`, ...) bozulmadı. |

---

## Teknik Notlar

- Her dosya 180 satır limitine sığacak. Aşan section refactor edilirse alt-component çıkarılır.
- Mevcut `SectionHeader.tsx` **silinmez**, `BrutalSectionHeader` yan yana yaşar — diğer sayfalar (Hakkımızda, Iletisim, Blog) eski header'ı kullanmaya devam eder.
- `CustomCursor` ↔ `BrutalCrosshairCursor` çakışması için `Index.tsx` flag pattern: `<CustomCursor disabled />` veya conditional mount.
- Forge & Steel renk paleti korunur, sadece molten accent vurgusu artırılır.
- Z-index mimarisi (1-17) korunur. Crosshair `z-90` (mevcut cursor ile aynı katman).

## Lovable Execution Sırası

Tek prompt'ta tek alt-adım veya yakından ilişkili 2-3 adım grubu gönderilir:

1. **Bundle 1:** 4.01–4.04 (4 yeni dosya, hiçbir mevcut dosyaya dokunmaz — 0 risk)
2. **Bundle 2:** 4.14–4.16 (CSS utility + button variant)
3. **Bundle 3:** 4.17 (cursor mount)
4. **Bundle 4–9:** 4.05–4.13 her section ayrı prompt (9 ayrı tur)
5. **Bundle 10:** 4.19–4.22 doğrulama

**Toplam:** 4 yeni dosya + ~12 mevcut dosya surgical edit. Hiçbir route, backend, auth, admin/müşteri paneli etkilenmez.
