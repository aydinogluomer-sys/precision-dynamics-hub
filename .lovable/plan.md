## Landing Page — Brutalist Awwwards 2026 Redesign

Mevcut iş mantığı, route'lar, Header, Footer, alt sayfalar ve admin/müşteri panelleri **dokunulmadan** kalır. Sadece `/` route'unun art direction'ı, sectionların görsel dili ve sinematik akışı tamamen yeniden kurulur. Üç ayrı sahne (Lava + Mold + CNC Story) tek bir kesintisiz "FORGE SEQUENCE" filmine birleştirilir.

---

### 1) Yeni Görsel Dil — Industrial Brutalist

```text
┌─────────────────────────────────────────────────┐
│  PURE BLACK #0A0A0A  ·  RAW STEEL #1C1C1C       │
│  MOLTEN #FF4A1C  ·  BONE #EDE6D6                │
│                                                  │
│  TYPE:  IBM Plex Mono (HUGE)                     │
│  H1:    clamp(6rem, 18vw, 22rem)  ALL CAPS       │
│         tracking -0.06em · leading 0.82          │
│  Body:  Space Grotesk · 14-16px · mono labels    │
│                                                  │
│  GRID:  Visible 12-col baseline (opacity 0.04)   │
│  EDGE:  No border-radius. Sharp 0px corners.     │
│  RULES: 1px hairlines everywhere. Mono numbers.  │
└─────────────────────────────────────────────────┘

```

- Tüm gradient/glow çoğunluğu kaldırılır → düz blok renkler + tek bir sıcak vurgu (molten orange).
- Film grain density %4 → %8'e çıkar. Subtle CRT scanline overlay (opacity 0.03) eklenir.
- Tüm CTA'lar köşeli (`rounded-none`), `border-1` hairline + hover'da molten bg invert.

> ⚠️ **NOT:** Söhne Mono planın tüm versiyonlarından çıkarıldı. Ticari lisanslı, CDN'de mevcut değil, Lovable bundle'a ekleyemez. Tek font: IBM Plex Mono (projede zaten mevcut).

---

### 2) Hero — Sıfırdan Brutalist Editorial

```text
┌────────────────────────────────────────────────────────┐
│ MAS / TECHNIC ─── İZMİR · TR              [01 / 17] │  ← thin top bar (mono)
├────────────────────────────────────────────────────────┤
│                                                        │
│  PRECISION                                             │
│  AT ±0.005mm.        ⟶ giant editorial headline       │
│  FORGED IN İZMİR.    ⟶ word-by-word reveal            │
│                                                        │
│  ─── Aerospace · Defense · Energy                     │
│                                                        │
│  [TEKLİF AL  →]    [HİZMETLER]     SCROLL ↓           │
│                                                        │
├────────────────────────────────────────────────────────┤
│ AS9100D · ISO 9001 · NADCAP · ITAR ──── EST. 1998    │  ← marquee bottom
└────────────────────────────────────────────────────────┘
       ▲ background: hero-cnc.jpg %30 opacity + grain
       ▲ NO mask-grow logo, NO horizontal slide, NO lava panel

```

- Mevcut MAS-mask büyütme + 200vw yatay kayma + lava panel **kaldırılır**.
- Hero artık tek viewport, statik kompozisyon + sadece word-by-word headline reveal + scroll cue.
- QuickQuoteSection Hero'dan ayrılır → **kendi bağımsız sektion olarak Hero altına** gelir (kapsam netleştirildi).
- Mouse hareketinde subtle parallax (4px max) — agresif tilt yerine.

> ⚠️ **NOT:** `HeroSection.tsx` "tamamen yeniden yazılır" ifadesi **execution fazlarında surgical edit olarak uygulanır** — Lovable'a tek seferde "rewrite" talimatı verilmez. Mevcut state, prop ve context bağlantıları korunarak section-by-section değiştirilir.

---

### 3) Birleşik FORGE SEQUENCE — Tek Film

Üç sahne (Lava 300vh + Mold 400vh + CNC 350vh = 1050vh) **tek bir 900vh sürekli scrollytelling deneyimine** birleştirilir. Sahneler arası "section break" hissi yok; tek bir kamera akışı:

```text
0vh ────────── HERO (100vh)
                 │
100vh ──────── ▼ FORGE SEQUENCE — 900vh sticky canvas
              ┌─────────────────────────────────────┐
              │ FAZE 01 — MELT      [0%   → 25%]    │
              │   Ham Ti-6Al-4V billet              │
              │   1.668°C molten flow + ember rain  │
              │   "ERGİTME" tipografi lava-fill     │
              ├─────────────────────────────────────┤
              │ FAZE 02 — POUR      [25%  → 45%]    │
              │   Lava stream → mold cavity         │
              │   Impact ripple + steam particles   │
              │   "DÖKÜM" reveal w/ pressure HUD    │
              ├─────────────────────────────────────┤
              │ FAZE 03 — COOL      [45%  → 60%]    │
              │   Color shift orange → silver       │
              │   Surface texture crystallization   │
              │   Material data scramble (Ti-6Al-4V)│
              ├─────────────────────────────────────┤
              │ FAZE 04 — MACHINE   [60%  → 90%]    │
              │   CNC frame sequence (120 frames)   │
              │   HUD readout: RPM/Feed/Tolerance   │
              │   4 story captions w/ scramble      │
              ├─────────────────────────────────────┤
              │ FAZE 05 — DELIVER   [90%  → 100%]   │
              │   Final part on bone-white surface  │
              │   "±0.005mm · AS9100D" stamp        │
              │   CTA: TEKLİF AL →                  │
              └─────────────────────────────────────┘
1000vh ─────── ▼ rest of page (Nexus, WhyUs, ...)

```

**Tek sticky container**, tek `ScrollTrigger`, tek progress (0→1). Faze geçişleri opacity crossfade + ortak ambient overlay (no abrupt cuts). Sol-üst sabit "FAZE XX / 05" indicator.

> ⚠️ **NOT:** `ForgeSequenceScene.tsx` 180 satır limitine sığmaz. Execution fazlarında **3 ayrı dosyaya** bölünür: `ForgeCanvas.tsx` (~150 satır) + `ForgePhaseController.tsx` (~140 satır) + `ForgeHUD.tsx` (~80 satır).
>
> ⚠️ **NOT:** Eski 3 sahne dosyası (`LavaTypographyScene`, `MoldCastScene`, `CNCScrollStory`) **silinmez** — `// DEPRECATED` olarak işaretlenir. Silme işlemi ayrı bir temizlik fazında yapılır. Lovable'da silme + import temizleme aynı prompt'ta yapılamaz (build break riski).
>
> ⚠️ **NOT:** Lenis + 900vh sticky ScrollTrigger konfigürasyonu (`ScrollTrigger.scrollerProxy()`) **ayrı bir execution fazında** ele alınır. Başka değişikliklerle aynı prompt'ta gönderilmez.

---

### 4) Ortak Brutalist Section Şablonu

Diğer tüm sectionlar (WhyUs, Services, Industries, Projects, Materials, Capabilities, Testimonials, FAQ, FinalCTA) **layout'u korunur** ama brutalist şablonla yeniden styled edilir:

```text
┌─ [02 / 17] ───────── HİZMETLER ─────────────────────┐
│                                                      │
│  WHAT WE                          ─── 6 disiplin   │
│  MANUFACTURE.                                        │
│                                                      │
│  ────────────────────────────────────────────────   │
│                                                      │
│  01 ─ CNC TORNALAMA           ±0.005mm   →          │
│  02 ─ CNC FREZE               5-axis     →          │
│  03 ─ HASSAS DÖKÜM            Ti/Al      →          │
│  04 ─ KAYNAK & MONTAJ         AS9100     →          │
│  ────────────────────────────────────                │
└──────────────────────────────────────────────────────┘

```

- Card-grid yapısı çoğu yerde **tablo/liste** formatına dönüşür (brutalist editorial).
- Section header her yerde aynı formül: mono index + headline + mono meta.
- Section padding `py-[clamp(140px,18vw,220px)]`.
- Section arası glow/wave/transition divider'lar **kaldırılır** → keskin renk kesimleri (concrete → obsidian → bone).

---

### 5) Mikro-Etkileşim & Motion

- Cursor: brutalist crosshair (3px kare, label "VIEW · DRAG · SCROLL").
- Tüm reveal: `clip-path inset(0 100% 0 0)` → `inset(0)`, 0.9s `cubic-bezier(0.76,0,0.24,1)`.
- Headline: word-stagger 0.05s, her kelime aşağıdan slide + opacity.
- Hover: link altında 1px line draw (left → right, 0.4s).
- Buton hover: bg invert (transparent → molten), text invert (molten → black).
- Marquee bantlar: 60s linear, sertifika + müşteri logoları.

---

### 6) Yeni Görsel Asset (5 adet, premium imagegen)

```
src/assets/forge/
├── 01-billet-raw.jpg          (Ti-6Al-4V billet, dramatic side light)
├── 02-molten-pour.jpg         (lava stream into ceramic mold)
├── 03-cooling-surface.jpg     (silver-orange transition, macro)
├── 04-cnc-machining.jpg       (5-axis spindle, chip flow, blue coolant)
└── 05-finished-part.jpg       (titanium aerospace bracket on bone surface)

```

Premium tier, 1920×1080, cinematic editorial photography stili.

---

### 7) Teknik Notlar

- `HeroSection.tsx` surgical edit ile brutalist versiyona dönüştürülür (execution fazlarına göre, tek seferde rewrite değil).
- `ForgeCanvas.tsx` + `ForgePhaseController.tsx` + `ForgeHUD.tsx` (3 yeni dosya, her biri max 150 satır) → eski 3 sahne DEPRECATED işaretlenir.
- `Index.tsx` güncellenir: 3 ayrı `<FlowScene>` yerine tek `<ForgeSequence>`. `SECTION_Z` sadeleştirilir.
- `BrutalSectionHeader.tsx` (yeni, ~80 satır) ve `BrutalListRow.tsx` (yeni, ~60 satır). Mevcut `SectionHeader.tsx` dokunulmaz.
- `index.css`: brutalist token'lar, typography scale, grain + scanline overlay, hairline utility — **ayrı fazlarda** eklenir (tek prompt'ta tümü değil).
- `tailwind.config.ts`: `display-mega` token + IBM Plex Mono font-family — **ayrı fazda**.
- Mobile: forge sequence devre dışı, fallback statik image stack + native scroll-snap.
- Reduced-motion: tüm reveal'lar instant, FORGE SEQUENCE statik 5 image grid'e düşer.
- Performance: `useGPUCapability` hook **ayrı mini-fazda** yazılır, diğer fazlara bağımlılık yok.

---

### 8) Lovable Execution Fazları

> Bu bölüm her execution fazının atomik adımlarını tanımlar. Her adım bağımsız olarak başarısız olabilir ve başka hiçbir şeyi kırmaz. Lovable'a **her seferinde tek bir alt-faz** gönderilir.

---

#### FAZ 03 — Brutalist Token Sistemi

*Ön koşul: Mevcut* `index.css` *ve* `tailwind.config.ts` *dosyaları temiz, build geçiyor.*


| Adım     | Dosya                | İş                                                                                                                                                   |
| -------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **03.1** | `src/index.css`      | CSS custom property ekle: `--brutalist-bone: #EDE6D6`, `--brutalist-molten: #FF4A1C`, `--brutalist-steel: #1C1C1C`                                   |
| **03.2** | `src/index.css`      | Film grain SVG overlay CSS'i ekle: `@layer utilities` altında `.grain-overlay` class, `opacity-[0.08]`, `mix-blend-overlay`, `pointer-events-none`   |
| **03.3** | `src/index.css`      | CRT scanline utility ekle: `.scanline-overlay` class, `opacity-[0.03]`, repeating-linear-gradient pattern — grain ile **ayrı class**, birleştirilmez |
| **03.4** | `src/index.css`      | Hairline border utility ekle: `.border-hairline` → `border: 1px solid currentColor`, `opacity-[0.2]`                                                 |
| **03.5** | `tailwind.config.ts` | `fontSize` extend: `display-mega` → `clamp(6rem, 18vw, 22rem)`, line-height `0.82`, letter-spacing `-0.06em`                                         |
| **03.6** | `tailwind.config.ts` | `fontFamily` extend: `mono` array'ine `'IBM Plex Mono'` ekle (zaten mevcut, sadece alias teyit)                                                      |
| **03.7** | —                    | **Smoke check:** `npm run build` hatasız geçmeli. Tarayıcıda `getComputedStyle` ile `--brutalist-molten` değeri kontrol edilmeli.                    |
| **03.8** | —                    | **HOLD** — Kullanıcı onayı beklenir. Token'lar görünür, build temiz, bir sonraki faza geçilir.                                                       |


*Bu fazda hiçbir component değiştirilmez. Sadece token ve utility tanımları.*

---

#### FAZ 07 — GrainOverlay Component

*Ön koşul: FAZ 03 tamamlandı ve onaylandı.* `.grain-overlay` *CSS class mevcut.*


| Adım     | Dosya                                | İş                                                                                                                                                                                                                                        |
| -------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **07.1** | `src/components/ui/GrainOverlay.tsx` | Yeni component oluştur. Named export. Max 80 satır. SVG `<feTurbulence>` + `<feColorMatrix>` filter. `fixed inset-0`, `z-[5]`, `pointer-events-none`. `opacity-[0.08]`, `mix-blend-mode: overlay`. `prefers-reduced-motion` → opacity `0` |
| **07.2** | `src/App.tsx`                        | Root'a mount: `<GrainOverlay />` import + JSX'e ekle. **Sadece bu iki satır** — başka hiçbir şeye dokunulmaz.                                                                                                                             |
| **07.3** | —                                    | **Teyit:** `z-index: 5` olduğu ve tıklamayı bloklamadığı (`pointer-events: none`) DevTools'dan kontrol edilmeli. Header ve CTA'lar hâlâ tıklanabilir olmalı.                                                                              |
| **07.4** | —                                    | **Smoke check:** Light mode + dark mode'da grain görünür. Animasyon yok, statik texture. `prefers-reduced-motion` aktifken overlay tamamen şeffaf.                                                                                        |
| **07.5** | —                                    | **HOLD** — Kullanıcı onayı beklenir. Grain yoğunluğu kabul edilebilirse bir sonraki faza geçilir. Fazla yoğunsa `07.1`'e dönülür, `opacity` değeri düşürülür.                                                                             |


*Bu fazda* `index.css`*'e dokunulmaz. Scanline overlay (*`ScanlineOverlay.tsx`*) ayrı bir fazda aynı pattern ile uygulanır.*

---

### Kapsam Özeti


| Değişen                                                  | Korunan                                                  |
| -------------------------------------------------------- | -------------------------------------------------------- |
| Hero (surgical edit, brutalist)                          | Header / Footer / Routes / Auth / Admin / Müşteri paneli |
| 3 sinematik sahne → tek FORGE SEQUENCE (3 yeni dosya)    | Section sırası (Hero → Forge → Nexus → WhyUs → ...)      |
| Tüm section'ların görsel dili (brutalist)                | İş mantığı, data, Supabase, RFQ flow, modallar           |
| Tipografi sistemi (mega mono caps, IBM Plex Mono)        | Forge & Steel renk paleti (sadece kontrast artırılır)    |
| Section transition divider'lar (kaldırılır)              | Tüm CTA hedefleri (`/teklif-al`, `/hizmetler`, ...)      |
| 5 yeni cinematic image                                   | Mevcut sequence-cnc frame'leri (FAZE 04'te kullanılır)   |
| Eski 3 sahne → DEPRECATED (silinmez, ayrı temizlik fazı) | Z-index mimarisi (1-17 stacking korunur)                 |


**~9 dosya düzenleme + ~5 yeni component/dosya + ~5 yeni image. Hiçbir route veya backend etkilenmez.**

&nbsp;

## FAZ 03 — Brutalist Token Sistemi

Sadece presentational layer. Mevcut tokenlar, route'lar, iş mantığı dokunulmaz. FAZ 07 ayrı turda gelir.

### Değişiklikler

`**src/index.css**` (dosya sonuna ek)

```css
/* ═══ FAZ 03 — Brutalist Tokens ═══ */
:root {
  --brutalist-bone: 38 28% 89%;       /* #EDE6D6 */
  --brutalist-molten: 14 100% 55%;    /* #FF4A1C */
  --brutalist-steel: 0 0% 11%;        /* #1C1C1C */
  --brutalist-void: 0 0% 4%;          /* #0A0A0A */
  --hairline-color: 0 0% 100%;
  --grain-opacity: 0.04;
  --scanline-opacity: 0.03;
}

.brutalist-grain {
  position: fixed; inset: 0;
  pointer-events: none; z-index: 5;
  opacity: var(--grain-opacity);
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  background-size: 240px 240px;
}

.brutalist-scanline {
  position: fixed; inset: 0;
  pointer-events: none; z-index: 5;
  opacity: var(--scanline-opacity);
  mix-blend-mode: overlay;
  background-image: repeating-linear-gradient(
    0deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px,
    transparent 1px, transparent 3px
  );
}

.border-hairline        { border: 1px solid hsl(var(--hairline-color) / 0.12); }
.border-hairline-strong { border: 1px solid hsl(var(--hairline-color) / 0.24); }
.border-hairline-b      { border-bottom: 1px solid hsl(var(--hairline-color) / 0.12); }
.border-hairline-t      { border-top:    1px solid hsl(var(--hairline-color) / 0.12); }
```

`**tailwind.config.ts**` — `extend` içine yalnızca `fontSize` eklenir. `fontFamily.mono` zaten `IBM Plex Mono` olarak kayıtlı, dokunulmaz.

```ts
fontSize: {
  'display-mega': ['clamp(6rem, 18vw, 22rem)', {
    lineHeight: '0.82',
    letterSpacing: '-0.06em',
    fontWeight: '700',
  }],
},
```

### Smoke Check

- Tailwind otomatik build → hata yok.
- DevTools `getComputedStyle(document.documentElement).getPropertyValue('--brutalist-molten')` → `14 100% 55%`.
- `.brutalist-grain`, `.brutalist-scanline`, `.border-hairline*` CSS'te tanımlı (henüz DOM'da kullanılmıyor — sonraki fazlarda).
- `text-display-mega` Tailwind utility üretilmiş.

### HOLD

FAZ 07 (GrainOverlay component + App mount) sizin onayınızla ayrı turda uygulanır.

### Kapsam Özeti


| Değişen                                  | Dokunulmayan                                  |
| ---------------------------------------- | --------------------------------------------- |
| `src/index.css` (ek)                     | Mevcut Forge & Steel tokenları, border-radius |
| `tailwind.config.ts` (yalnız `fontSize`) | `fontFamily` (mono zaten doğru)               |
| —                                        | Hiçbir component, hiçbir route                |


**2 dosyada ek-only değişiklik. Sıfır kırılma riski.**