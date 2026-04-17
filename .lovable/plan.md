# MAS TECHNIC — v3.3 LOVABLE EXECUTION CONTRACT

> **Statü:** PRODUCTION-GRADE · SELF-HEALING · PHASE-GATED **Hedef Runner:** Lovable (Cursor/Claude Code ile de uyumlu) **Amaç:** Ölü kod temizliği + MoldCast sahnesi kaldırma + v2.0 token migration + scroll system kalibrasyonu + regresyon önleyici guardrail kurulumu. **Kritik Prensip:** Bu bir yorumlama görevi değildir. Deterministic state machine execution'dır. Her fail durumunda DIAGNOSE → FIX → RETRY (max 2) → HARD STOP. **Dil:** Kod yorumları Türkçe, identifier'lar İngilizce.

---

## 🧠 EXECUTION ENGINE RULES (NON-NEGOTIABLE)

Lovable aşağıdaki runtime davranışını uygulamak ZORUNDADIR:

### Lifecycle (her faz için)

```
EXECUTE → VALIDATE → IF FAIL → DIAGNOSE → APPLY PREDEFINED FIX → RETRY → VALIDATE
                                                                         ↓
                                                          IF FAIL AGAIN → HARD STOP

```

### Global kurallar

1. **Faz başlama koşulu:** Önceki fazın tüm validation check'leri PASS olmalı. Aksi halde fazı BAŞLATMA.
2. **Retry limiti:** Faz başına maksimum **2 retry**. Üçüncü denemede HARD STOP ve `PHASE X HARD STOP` raporu.
3. **Freeform reasoning yasak:** Fix'ler yalnızca bu dokümanda tanımlanmış `AUTO-FIX PROTOCOL`'den seçilebilir. "İyileştirme önerisi" yok.
4. **Scope expansion yasak:** Bu dokümanda olmayan dosyaya dokunma. Bu dokümanda olmayan iş yapma.
5. **Her faz sonunda zorunlu rapor formatı:** Aşağıdaki `PHASE REPORT FORMAT` bölümüne bak. Rapor eksikse faz INVALID sayılır.
6. **Her faz kendi commit'inde.** Commit mesajı: `chore(v3): phase-N — <özet>`.

### Emin değilsen kuralı

> Eğer bir pattern, efekt veya trigger'ın ne yaptığı belirsizse → **DOKUNMA**, `AMBIGUITY DETECTED` raporu yaz ve fazı durdur.

---

## 📋 PHASE REPORT FORMAT (ZORUNLU)

Her faz sonunda Lovable TAM OLARAK şu formatı üretmek zorundadır:

```
================================================
PHASE <N> REPORT — <faz adı>
================================================

STATUS: PASS | FAIL | HARD_STOP
ATTEMPT: 1 | 2

VALIDATION CHECKS:
- tsc --noEmit: PASS | FAIL
- grep guard-1: PASS | FAIL
- grep guard-2: PASS | FAIL
- visual smoke: PASS | FAIL | SKIPPED
- lint: PASS | FAIL | SKIPPED

ERRORS (if any):
  TYPE: <TS_COMPILE | CSS_TOKEN | COLOR_MIGRATION | SCROLL_BREAK | ORPHAN_REF | Z_INDEX_DRIFT | BUILD_FAIL | AMBIGUITY | UNKNOWN>
  FILE: <path>:<line>
  CAUSE: <1-line>
  ROOT CAUSE: <1-line>

FIXES APPLIED (if retry):
  - <fix ID from AUTO-FIX PROTOCOL>

CHANGES:
  - <file>: <what changed>

COMMIT: <SHA kısa>
NEXT ACTION: CONTINUE phase-<N+1> | STOP
================================================

```

Rapor eksikse → execution invalid. Kullanıcı raporu görmeden "ilerledim" deme.

---

## 🔒 LOCKED ZONES (ZERO TOUCH — HER FAZDA GEÇERLİ)

Aşağıdakilere **hiçbir koşulda** edit/rename/delete uygulanamaz:

- `src/pages/admin/**`
- `src/pages/musteri-paneli/**`
- `src/components/admin/**`
- `src/integrations/supabase/**`
- `src/hooks/useAuth*`
- `vite.config.ts` → `build`, `define`, `resolve` blokları (yalnız `plugins` array'ine Faz 5'te geçici visualizer eklenebilir, faz sonunda geri alınır)
- `tailwind.config.ts` → mevcut `content` paths, `theme.extend.fontFamily` (IBM Plex Mono/Sans korunur), `borderRadius: { DEFAULT: "0" }` kuralı
- `package.json` — **yeni npm paketi YOK.** (Mevcut `lenis`, `gsap`, `three`, `framer-motion` sürümleri değişmez.)

**Locked zone ihlali = HARD STOP.**

---

## 📐 SABİT ENGINEERING KURALLARI (NEVER VIOLATE)

1. `border-radius: 0` global — tüm yeni stiller dahil.
2. Font stack: IBM Plex Mono + IBM Plex Sans. Başka font eklenmez.
3. Scroll mekanizması: **yalnızca Lenis**. `scroll-behavior: smooth`, `smoothscroll-polyfill` vs. YASAK.
4. Animasyon: GSAP (ScrollTrigger) + Framer Motion. CSS `@keyframes` yalnızca hafif pulse/loader için.
5. Hardcoded renk YASAK (`#hex`, `rgb()`, `rgba()`, `hsl()` literal). Yalnızca token tanım dosyası (`tokens.css` / `src/index.css`) istisna.
6. `z-index` sayısal literal YASAK bileşenlerde. Yalnızca `SECTION_Z[key]` veya `SECTION_Z.key` üzerinden.
7. Her faz sonrası `tsc --noEmit` **0 error** döner.
8. ProjectShowcase.tsx → pre-flight [D] kararı ALINMADAN dokunulmaz.

---

## 🧭 TOKEN SYSTEM — FINAL KARAR: RGB TRIPLET STRATEGY

### Gerekçe (kısa)

- Tailwind `<alpha-value>` mekanizması **sadece** triplet ile çalışır.
- `color-mix()` mobil Safari 16.3 altında fallback gerektirir → endüstriyel müşteri cihaz parkında risk.
- Find/replace deterministik: tek pattern.
- DevTools'ta değer direkt okunabilir.

### Zorunlu Token Formatı (`src/index.css` veya `tokens.css`)

```css
:root {
  /* SOLID (hex) — sadece opaque kullanımlar için */
  --heat-molten: #e8610a;
  --heat-ember: #c24a00;
  --precision-steel: #007190;
  --precision-ice: #0688ad;
  --material-chrome: #b8bcc2;
  --surface-base: #0a0a0a;
  --surface-raised: #141414;
  --text-primary: #ffffff;
  --text-secondary: #a8a8a8;
  --overlay-dark-low: #000000;
  --overlay-dark-mid: #000000;

  /* RGB TRIPLETS — alpha compositing için ZORUNLU */
  --heat-molten-rgb: 232 97 10;
  --heat-ember-rgb: 194 74 0;
  --precision-steel-rgb: 0 113 144;
  --precision-ice-rgb: 6 136 173;
  --material-chrome-rgb: 184 188 194;
  --surface-base-rgb: 10 10 10;
  --text-primary-rgb: 255 255 255;
}

```

### Kullanım Tablosu (ZORUNLU)


| Durum              | DOĞRU                                            | YANLIŞ                                                                |
| ------------------ | ------------------------------------------------ | --------------------------------------------------------------------- |
| Solid renk         | `color: var(--heat-molten)`                      | `color: #e8610a`                                                      |
| Alpha overlay      | `background: rgb(var(--heat-molten-rgb) / 0.25)` | `background: rgba(232,97,10,0.25)`                                    |
| Tailwind arbitrary | `bg-[rgb(var(--heat-molten-rgb)/0.25)]`          | `bg-[rgba(232,97,10,0.25)]`                                           |
| ❌ YASAK            | —                                                | `rgba(var(--heat-molten), 0.25)` → tarayıcı `transparent` render eder |


**Kritik:** `rgba(var(--x), 0.25)` formatı **geçersiz CSS'tir.** CSS custom property içinde hex/hsl değer varsa `rgba()` içinde kullanılamaz. Build hatası vermez, TypeScript hatası vermez, runtime hatası vermez — **sessizce transparent render eder.** Bu pattern tespit edilirse `CSS_TOKEN` error olarak işaretle.

---

## 🚨 FAILURE CLASSIFICATION

Her hata aşağıdaki kategorilerden birine atanır:


| Code              | Trigger                                                |
| ----------------- | ------------------------------------------------------ |
| `TS_COMPILE`      | TypeScript error                                       |
| `CSS_TOKEN`       | Eksik/hatalı CSS variable tanımı                       |
| `COLOR_MIGRATION` | Yanlış token mapping, invalid rgba syntax              |
| `SCROLL_BREAK`    | GSAP ScrollTrigger / Lenis kayması                     |
| `ORPHAN_REF`      | Silinen component hâlâ referanslı                      |
| `Z_INDEX_DRIFT`   | Stacking order problemi, numeric literal sızması       |
| `BUILD_FAIL`      | `npm run build` hatası                                 |
| `AMBIGUITY`       | Efekt/pattern belirsiz, "emin değilsen dokunma" kuralı |
| `UNKNOWN`         | Yukarıdakilerden hiçbiri → HARD STOP                   |


---

## 🛠️ AUTO-FIX PROTOCOL (yalnızca bu listeden fix seç)

### FIX-01 · MISSING_TOKEN

**Trigger:** `CSS_TOKEN` error, token `src/index.css` veya `tokens.css`'te tanımsız. **Action:**

1. Bölüm *Zorunlu Token Formatı*'ndaki eksik token'ı `:root` bloğuna ekle.
2. Hem solid hem `-rgb` variant'ını ekle.
3. RETRY validation.

### FIX-02 · INVALID_RGBA_TOKEN_SYNTAX

**Trigger:** `rgba(var(--x), 0.25)` pattern tespit edildi. **Action:**

1. `rgba(var(--<name>), <alpha>)` → `rgb(var(--<name>-rgb) / <alpha>)` olarak değiştir.
2. Eğer `--<name>-rgb` tanımsızsa FIX-01 uygula.
3. RETRY validation.

### FIX-03 · ORPHAN_IMPORT_REMOVAL

**Trigger:** Silinmiş component'e import kalmış. **Action:**

1. Import satırını kaldır.
2. Kullanıldığı JSX bloğunu kaldır.
3. RETRY validation.

### FIX-04 · SCROLL_OFFSET_NORMALIZATION

**Trigger:** `SCROLL_BREAK`, trigger kayması. **Action (sadece** `start`**/**`end` **string değişir; DOM/scene sırası değişmez):**

- `start: "top top"` sabit kalır.
- Relative `end: "+=<dynamic>"` → `end: "+=100%"` veya `end: "bottom top"`.
- Scrub değeri değişmez.
- RETRY validation.

### FIX-05 · BATCH_REVERT

**Trigger:** Faz 3 batch'inde görsel regresyon. **Action:**

1. SADECE o batch'teki dosyaları önceki commit'e revert et.
2. Önceki batch'ler korunur.
3. Root cause raporla, HARD STOP (manual intervention).

### FIX-06 · Z_INDEX_LITERAL_REPLACEMENT

**Trigger:** Bileşende `zIndex: <number>` literal bulundu. **Action:**

1. İlgili SECTION_Z key'ini bul.
2. `zIndex: 40` → `zIndex: SECTION_Z.moldCast` gibi değiştir (MoldCast kaldırıldıktan sonra: en yakın semantic eşdeğer).
3. RETRY.

### FIX-07 · AMBIGUITY_HALT

**Trigger:** `AMBIGUITY` error. **Action:** Fix UYGULAMA. `HARD STOP` ile fazı durdur, kullanıcı kararı beklet.

**Yukarıdaki listede olmayan fix uygulanamaz.** Fix seçilemiyorsa → `UNKNOWN` + HARD STOP.

---

## 🚦 PRE-FLIGHT BLOCKERS (hepsi PASS olmadan Faz 1 başlamaz)

### [A] Token Existence Audit

```bash
grep -rn "^\s*--" src/index.css src/styles/ 2>/dev/null | grep -E "(heat-|precision-|material-|surface-|text-|overlay-)"

```

**Expected:** *Zorunlu Token Formatı* bölümündeki tüm token'lar (solid + `-rgb`) mevcut. **If FAIL:** FIX-01 uygula, RETRY. Hâlâ FAIL → HARD STOP.

### [B] Dynamic Import & Hidden Reference Scan

```bash
grep -rn -E "MoldCastScene|ParallaxSection|SectionTransitionGlow|SectionDivider|MotionGradientBg|aurora-background" \
  src/ --include="*.tsx" --include="*.ts" --include="*.js"

```

**Expected:** Yalnızca dosyaların kendi tanım satırları. Başka import yok. **If FAIL:** Index.tsx ve silinecek dosyalar dışında referans varsa FIX-03 uygula.

### [C] Visual Baseline Capture

- Dev server'ı başlat.
- Landing page'de tam scroll dökümü kaydı al — desktop (1920×1080) + mobile (390×844).
- `docs/baseline/v2.9-before.mp4` olarak sakla.
- Dev server'ı durdur. **Not:** Bu adım manuel olabilir. Eğer screen recording mümkün değilse kullanıcıya bildir, screenshot'larla yetin, `SKIPPED` olarak işaretle.

### [D] ProjectShowcase.tsx RGB Channel Audit (KRİTİK)

```bash
grep -n -E "rgba\(255,\s*0,\s*0|rgba\(0,\s*255,\s*0|rgba\(0,\s*0,\s*255" src/components/ProjectShowcase.tsx

```

**Decision matrix:**

- Eğer değerler `filter`, `backdrop-filter`, `mix-blend-mode`, `feColorMatrix`, SVG shader veya canvas compositing context'inde kullanılıyorsa → **DOKUNMA.** Üstüne yorum ekle: `/* chromatic aberration / channel split — intentional, DO NOT tokenize */`. Pre-flight [D] kararı = `PRESERVE`.
- Eğer değerler yalnızca plain `background`/`border`/`color` ise → brand token ile değiştir (`var(--heat-molten)`, `var(--precision-ice)`, `var(--material-chrome)`). Pre-flight [D] kararı = `MIGRATE`.
- **Belirsizse:** `AMBIGUITY` → FIX-07 → HARD STOP, kullanıcı kararı beklet.

### [E] Asset Frame Count Doğrulama

```bash
ls -1 public/sequence-cnc/ 2>/dev/null | wc -l
ls -1 public/sequence-material/ 2>/dev/null | wc -l

```

**Expected:** Her dizinde ≥ 24 frame. **If FAIL:** Asset pipeline blocker raporla, HARD STOP. Kullanıcı frame'leri sağlamalı.

### [F] Dot Nav Index Integrity Audit

`src/pages/Index.tsx` (veya nav tanımı) içinde `navItems` array'ini bul. Her item için `{ id, label, ... }` yapısını belgele. MoldCast çıkarıldığında `data-index` değerleri `array.map((_, idx) => idx)` ile otomatik türetilecek — manuel integer atanmış mı kontrol et.

### Pre-flight rapor formatı

```
PRE-FLIGHT REPORT
[A] Token Audit: PASS | FAIL (+ detay)
[B] Orphan Scan: PASS | FAIL
[C] Visual Baseline: PASS | SKIPPED
[D] ProjectShowcase Decision: PRESERVE | MIGRATE | AMBIGUITY
[E] Asset Frames: CNC=<n>, Material=<n> — PASS | FAIL
[F] Dot Nav: documented
NEXT ACTION: BEGIN phase-1 | STOP

```

---

## 🛠️ FAZLI EXECUTION

---

### FAZ 1 — z-index Infrastructure + MoldCast Removal + Scroll Calibration

**Sıra kritik:** z-index.ts → Index.tsx → scroll calibration. Başka sıra TS compile'ı kırar.

#### 1.1 — `z-index.ts` güncelle

**Dosya:** `src/config/z-index.ts` (veya projedeki gerçek path — audit ile bul).

**Kurallar:**

- `moldCast` key'ini kaldır.
- **Kalan key'leri RENUMBER ETME.** Mevcut numerik değerleri koru, aradaki boşluğu bırak. Renumber = risk.
- `as const` yerine `satisfies Record<string, number>` kullan.

**Zorunlu final hal (anahtarlar projede farklıysa adapte et, ama MoldCast yok):**

```typescript
export const SECTION_Z = {
  hero: 10,
  cncStory: 20,
  materialMorph: 30,
  // moldCast: 40,  ← kaldırıldı, renumber yok
  machineLoop: 50,
  projectShowcase: 60,
  stats: 70,
  quickQuote: 80,
  faq: 90,
  footer: 100,
} satisfies Record<string, number>;

export type SectionZKey = keyof typeof SECTION_Z;

```

**Validation:**

```bash
tsc --noEmit
grep -rn "SECTION_Z\.moldCast" src/
grep -rn -E "z-\[[0-9]+\]|zIndex:\s*[0-9]+" src/components/ src/pages/ | grep -v "SECTION_Z"

```

- tsc: 0 error.
- Birinci grep: boş.
- İkinci grep: boş (numeric literal sızması yok). FAIL ise FIX-06.

#### 1.2 — `src/pages/Index.tsx` temizle

**Yapılacaklar:**

- `MoldCastScene` lazy import satırını sil.
- `<Suspense><FlowScene z={SECTION_Z.moldCast}>...</FlowScene></Suspense>` bloğunun tamamını sil.
- `navItems` array'inden `{ id: "dokum-sahne", ... }` entry'sini sil.
- Dot nav render kısmında `data-index` değeri **map index'inden türetilsin:**

```tsx
{navItems.map((item, idx) => (
  <DotNavItem
    key={item.id}
    data-index={idx}
    aria-label={item.label}
    {...}
  />
))}

```

Manuel integer atama kalmasın.

**Validation:**

```bash
tsc --noEmit
grep -n "MoldCast\|dokum-sahne" src/pages/Index.tsx

```

- tsc: 0 error.
- Grep: boş.

#### 1.3 — Scroll Kalibrasyonu

**Amaç:** MoldCast silinmesi sonrası GSAP trigger offset'lerinin ve Lenis scroll height'ının tutarlı olduğunu doğrulamak.

**Yordam:**

1. `src/pages/Index.tsx` veya scroll trigger'ların tanımlandığı dosyalarda, ilgili `ScrollTrigger.create({...})` / `gsap.to({scrollTrigger: {...}})` çağrılarına geçici olarak `markers: true` ekle.
2. Dev server'ı başlat. Landing'i sonuna kadar yavaşça scroll et.
3. Aşağıdaki checklist'i doğrula:
  - [ ] `cncStory` pin start/end marker'ları doğru pozisyonda.
  - [ ] `materialMorph` scrub animasyonu kesintisiz.
  - [ ] `machineLoop` background trigger doğru sahnede aktif.
  - [ ] Lenis scroll length tutarlı: DevTools → `document.documentElement.scrollHeight` makul değer.
  - [ ] Dot nav aktif indikatör doğru sahneye vuruyor.
  - [ ] İki ardışık sahne arasında "MoldCast'ten kalma" boş beyaz bölge YOK.
4. Kontroller geçtiyse `markers: true` → `markers: false` (veya satırı kaldır).

**If FAIL (trigger kayması):** FIX-04 uygula. Relative `end: "+=<dynamic>"` pattern'ini absolute forma (`"+=100%"` veya `"bottom top"`) çevir. RETRY. Hâlâ FAIL → HARD STOP.

**Commit:** `chore(v3): phase-1 z-index cleanup + moldcast removal + scroll recalibration`

**PHASE 1 REPORT** üret ve dur.

---

### FAZ 2 — Orphan Component Deletion

**Ön koşul:** Pre-flight [B] temiz ve Faz 1 PASS.

**Silinecek dosyalar:**

```bash
rm src/components/MoldCastScene.tsx
rm src/components/ParallaxSection.tsx
rm src/components/ui/SectionTransitionGlow.tsx
rm src/components/ui/SectionDivider.tsx
rm src/components/MotionGradientBg.tsx
rm src/components/ui/aurora-background.tsx

```

**Validation:**

```bash
tsc --noEmit
grep -rn -E "MoldCastScene|ParallaxSection|SectionTransitionGlow|SectionDivider|MotionGradientBg|aurora-background" src/

```

- tsc: 0 error.
- Grep: boş.

**If FAIL:** `ORPHAN_REF` → FIX-03. RETRY.

**Commit:** `chore(v3): phase-2 delete 6 orphan components`

**PHASE 2 REPORT** üret ve dur.

---

### FAZ 3 — Token Migration (14 Dosya, 5 Batch)

**Kurallar:**

- **Global find-replace YASAK.** Her değişiklik file-scoped.
- Max 3 dosya/batch. Her batch sonrası `tsc --noEmit` + dev server görsel kontrol.
- Batch FAIL olursa yalnızca o batch revert edilir (FIX-05).
- ProjectShowcase.tsx → Pre-flight [D] kararına göre işlenir.

#### Deterministic Mapping Table


| Dosya                   | FROM                             | TO                                            |
| ----------------------- | -------------------------------- | --------------------------------------------- |
| `StatsSection.tsx`      | `rgba(232,97,10,X)`              | `rgb(var(--heat-molten-rgb) / X)`             |
| `StatsSection.tsx`      | `rgba(255,255,255,X)`            | `rgb(var(--text-primary-rgb) / X)`            |
| `MagneticButton.tsx`    | `rgba(232,97,10,0.3)`            | `rgb(var(--heat-molten-rgb) / 0.3)`           |
| `ProjectShowcase.tsx`   | Pre-flight [D] kararına göre     | PRESERVE veya brand token                     |
| `PageLoader.tsx`        | `rgba(255,255,255,0.04)` / `0.1` | `rgb(var(--text-primary-rgb) / 0.04)` / `0.1` |
| `LiveClock.tsx`         | `rgba(255,255,255,0.3)`          | `rgb(var(--text-primary-rgb) / 0.3)`          |
| `HeadlineStagger.tsx`   | `rgba(6,136,173,0.15)`           | `rgb(var(--precision-ice-rgb) / 0.15)`        |
| `HeadlineStagger.tsx`   | `#0688AD`                        | `var(--precision-ice)`                        |
| `FloatingPaths.tsx`     | `rgba(6,136,173,X)`              | `rgb(var(--precision-ice-rgb) / X)`           |
| `QuickQuoteSection.tsx` | `rgba(0,113,144,0.08)`           | `rgb(var(--precision-steel-rgb) / 0.08)`      |
| `QuickQuoteSection.tsx` | `hsl(var(--forge-ember))`        | `var(--heat-ember)`                           |
| `QuickQuoteSection.tsx` | `hsl(var(--forge-obsidian))`     | `var(--surface-base)`                         |
| `QuickQuoteSection.tsx` | `hsl(var(--forge-mist))`         | `var(--surface-raised)`                       |
| `MaterialsSection.tsx`  | `rgba(232,97,10,0.25)`           | `rgb(var(--heat-molten-rgb) / 0.25)`          |
| `FAQBlogSection.tsx`    | `hsl(var(--forge-mist))`         | `var(--surface-raised)`                       |
| `ElegantShape.tsx`      | `rgba(255,255,255,X)`            | `rgb(var(--text-primary-rgb) / X)`            |
| `GlowLineDivider.tsx`   | `hsl(var(--primary))`            | `var(--precision-ice)`                        |
| `OverlayReveal.tsx`     | `hsl(var(--forge-obsidian))`     | `var(--surface-base)`                         |
| `MalzemeKategori.tsx`   | `text-white`                     | `text-[var(--text-primary)]`                  |
| `MalzemeKategori.tsx`   | `#0f172a`                        | `var(--surface-base)`                         |
| `MalzemeKategori.tsx`   | `rgba(255,255,255,X)`            | `rgb(var(--text-primary-rgb) / X)`            |


#### Batch Sırası (düşük risk → yüksek risk)

**Batch 1 — Low-risk utilities**

- `src/components/ui/ElegantShape.tsx`
- `src/components/ui/GlowLineDivider.tsx`
- `src/components/ui/OverlayReveal.tsx`

**Batch 2 — Interactive primitives**

- `src/components/MagneticButton.tsx`
- `src/components/LiveClock.tsx`
- `src/components/PageLoader.tsx`

**Batch 3 — Headline & background layers**

- `src/components/HeadlineStagger.tsx`
- `src/components/FloatingPaths.tsx`

**Batch 4 — Content sections**

- `src/components/StatsSection.tsx`
- `src/components/MaterialsSection.tsx`
- `src/components/FAQBlogSection.tsx`
- `src/components/QuickQuoteSection.tsx`

**Batch 5 — Complex/conditional**

- `src/components/ProjectShowcase.tsx` (Pre-flight [D] kararı)
- `src/pages/MalzemeKategori.tsx`

#### Her batch sonrası (ZORUNLU)

```bash
tsc --noEmit

```

- Dev server'da batch'teki bileşenleri aç, baseline ile karşılaştır.
- Görsel regresyon varsa (transparent render, renk kaybı, layout shift) → FIX-05 batch revert + HARD STOP.

#### Final validation (5 batch bittikten sonra)

```bash
grep -rn -E "#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(" src/components/ src/pages/ \
  | grep -v "tokens\.css\|index\.css\|\.test\.\|\.stories\." \
  | grep -v "var(--" \
  | grep -v "// OK:"

```

**Expected:** Boş, veya yalnızca `// OK:` yorumlu satırlar (ProjectShowcase PRESERVE vb.).

**Commit:** Her batch ayrı commit — `chore(v3): phase-3 token migration batch-N`.

**PHASE 3 REPORT** üret (her batch için sub-report, sonunda final report).

---

### FAZ 4 — Type-Safe Token Layer + ESLint Guardrails

#### 4.1 — `src/lib/tokens.ts` (yeni dosya)

```typescript
/**
 * Design System v2.0 — Token accessor
 * Kullanım: style={{ color: T.heatMolten }}  (typo → TS error)
 * Alpha: alpha('heatMolten', 0.25) → "rgb(var(--heat-molten-rgb) / 0.25)"
 */

export const T = {
  heatMolten: "var(--heat-molten)",
  heatEmber: "var(--heat-ember)",
  precisionSteel: "var(--precision-steel)",
  precisionIce: "var(--precision-ice)",
  materialChrome: "var(--material-chrome)",
  surfaceBase: "var(--surface-base)",
  surfaceRaised: "var(--surface-raised)",
  textPrimary: "var(--text-primary)",
  textSecondary: "var(--text-secondary)",
  overlayDarkLow: "var(--overlay-dark-low)",
  overlayDarkMid: "var(--overlay-dark-mid)",
} as const;

export type TokenKey = keyof typeof T;

const ALPHA_TOKEN_MAP = {
  heatMolten: "--heat-molten-rgb",
  heatEmber: "--heat-ember-rgb",
  precisionSteel: "--precision-steel-rgb",
  precisionIce: "--precision-ice-rgb",
  materialChrome: "--material-chrome-rgb",
  surfaceBase: "--surface-base-rgb",
  textPrimary: "--text-primary-rgb",
} as const;

export type AlphaTokenKey = keyof typeof ALPHA_TOKEN_MAP;

export const alpha = (token: AlphaTokenKey, opacity: number): string =>
  `rgb(var(${ALPHA_TOKEN_MAP[token]}) / ${opacity})`;

```

**Not:** Forward-looking guardrail. Mevcut dosyaları bu dosyayı kullanacak şekilde toplu refactor ETME.

#### 4.2 — ESLint Rule: Hardcoded Color Block

`eslint.config.js` veya `.eslintrc.*`:

```javascript
{
  rules: {
    "no-restricted-syntax": [
      "error",
      {
        selector:
          "Literal[value=/(#[0-9a-fA-F]{3,8}\\b|rgba?\\(\\s*\\d+|hsla?\\(\\s*\\d+)/]",
        message:
          "Hardcoded color detected. Use CSS tokens (var(--heat-molten)) or alpha() helper.",
      },
      {
        selector:
          "TemplateElement[value.raw=/(#[0-9a-fA-F]{3,8}\\b|rgba?\\(\\s*\\d+|hsla?\\(\\s*\\d+)/]",
        message:
          "Hardcoded color in template literal. Use CSS tokens.",
      },
      {
        selector:
          "Property[key.name='zIndex'] > Literal[value=/^[0-9]+$/]",
        message:
          "Numeric zIndex literal yasak. SECTION_Z[<key>] kullan.",
      },
    ],
  },
  overrides: [
    {
      files: ["src/index.css", "src/styles/**", "**/*.stories.*", "**/*.test.*"],
      rules: { "no-restricted-syntax": "off" },
    },
  ],
}

```

**Validation:**

```bash
npx eslint src/ --ext .ts,.tsx

```

**Expected:** 0 error.

**If FAIL:** ESLint rule mevcut kodu flag ediyor → rule'u zayıflatma. İhlal eden satırı düzelt (FIX-02 veya FIX-06).

**Commit:** `chore(v3): phase-4 type-safe token layer + eslint guardrails`

---

### FAZ 5 — Bundle Analysis & Performance Baseline

#### 5.1 — Visualizer (opsiyonel, yeni paket YOK)

**Eğer** `rollup-plugin-visualizer` **zaten** `devDependencies`**'te varsa:** `vite.config.ts` → `plugins: [...existing, visualizer({ open: false, filename: "dist/stats.html", gzipSize: true })]`

**Yoksa — bu fazın alternatif akışı:**

```bash
npm run build
du -sh dist/assets/*.js 2>/dev/null | sort -rh | head -20

```

Yeni paket KURMA. Visualizer yoksa `du` output'unu kullan.

#### 5.2 — Metrikleri kaydet

`docs/perf-baseline-v3.md` dosyası oluştur:

```markdown
# Performance Baseline — v3.0

**Date:** <YYYY-MM-DD>
**Build command:** `npm run build`

## Metrics
- Total JS (gzipped): __ KB
- Largest chunk: __ (__ KB gzipped)
- GSAP + Three.js combined: __ KB
- Initial route chunk: __ KB

## Red flags
- [ ] Herhangi bir chunk > 300 KB gzipped → code-split candidate
- [ ] Total JS > 800 KB gzipped → review

## Notlar
<bulgular>

```

#### 5.3 — Visualizer'ı kaldır

`vite.config.ts`'den plugin satırını geri al.

**Commit:** `chore(v3): phase-5 bundle baseline documented`

---

### FAZ 6 — Dokümantasyon Güncelleme

#### 6.1 — `README.md` yeniden yaz

Bölümler (sırayla):

1. **Overview** — Mas Technic B2B landing, React 18 + Vite + TS + GSAP + Lenis + Three.js + Tailwind.
2. **Design System v2.0** — Heat / Precision / Material üçgeni. Token tablosu (solid + rgb triplet). Kullanım kuralları.
3. **Scroll Architecture** — Lenis wrapper, FlowScene vs Scene ayrımı, GSAP ScrollTrigger pattern'leri.
4. **Stacking System** — `SECTION_Z` güncel haritası (MoldCast yok), z-index kullanım kuralı.
5. **Component Tree** — güncel liste. Silinmiş bileşenleri referans ETME.
6. **Locked Zones** — admin, musteri-paneli, supabase, package.json.
7. **Constraints** — border-radius 0, IBM Plex Mono, Lenis-only, no new deps.
8. **Dev Workflow** — `npm run dev`, `tsc --noEmit`, `npm run lint`, `npm run build`.

Eski `forge-*` referansları tamamen temizlenir.

#### 6.2 — `assets.md`

- Pre-flight [E]'deki gerçek frame sayılarıyla güncelle.
- `public/machine-loop.mp4` süre / bitrate / boyut ekle.

#### 6.3 — `plan.md2`

- Faz 4.2 (ParallaxSection) → `✅ Silindi (orphan)`.
- Faz 7 (Performans) → `✅ Baseline ölçüldü (docs/perf-baseline-v3.md)`.
- Faz 10 (Final QA) → v3.0 execution sonrası açılacak yeni checklist referansı.

#### 6.4 — `docs/v3-changelog.md` (yeni dosya)

- Silinen 6 bileşen + nedenleri.
- MoldCast removal gerekçesi.
- Token migration tablosu (özet).
- RGB triplet kararı + gerekçe.
- ESLint guardrail özeti.
- Pre-flight [D] kararı (ProjectShowcase PRESERVE / MIGRATE).

**Commit:** `docs(v3): phase-6 update readme + assets + plan + changelog`

---

## ✅ POST-EXECUTION VALIDATION (7 madde, hepsi PASS olmalı)

```bash
# 1. TypeScript
tsc --noEmit
# Expected: 0 error

# 2. Lint
npx eslint src/ --ext .ts,.tsx
# Expected: 0 error

# 3. Hardcoded renk sızması
grep -rn -E "#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(" src/components/ src/pages/ \
  | grep -v "var(--" | grep -v "// OK:" | grep -v "\.test\.\|\.stories\."
# Expected: boş

# 4. Orphan import sızması
grep -rn -E "MoldCastScene|ParallaxSection|SectionTransitionGlow|SectionDivider|MotionGradientBg|aurora-background" src/
# Expected: boş

# 5. Numerik zIndex sızması
grep -rn -E "zIndex:\s*[0-9]+|z-\[[0-9]+\]" src/components/ src/pages/ \
  | grep -v "SECTION_Z"
# Expected: boş

# 6. Build
npm run build
# Expected: success

# 7. Invalid rgba token syntax (CSS_TOKEN guard)
grep -rn "rgba(var(--" src/components/ src/pages/
# Expected: boş (rgba içinde var() asla olmaz)

```

### Dev server smoke test

- [ ] Landing full scroll'da kırılma yok
- [ ] Dot nav tüm sahnelere atlıyor, aktif indikatör doğru
- [ ] CNC scroll story frame'leri akıcı
- [ ] Material morph pin/scrub çalışıyor
- [ ] Machine loop BG doğru sahnede aktif
- [ ] HexWipe transition'ı kesilmiyor
- [ ] Custom cursor davranışı sürüyor
- [ ] Page transition entry/exit akıcı
- [ ] Mobile (390×844) aynı sıralama, okunabilir
- [ ] Hiçbir sahnede transparent-render edilmiş bölge yok
- [ ] Admin ve musteri-paneli routeleri dokunulmamış
- [ ] `docs/baseline/v2.9-before.mp4` ile after karşılaştırması: scroll story tutarlı

**Tüm 7 komut + tüm smoke test item'ları PASS → GO for deploy.**

---

## 🧯 ROLLBACK STRATEJİSİ

Her faz kendi commit'inde olduğu için:

```bash
# Son fazı geri al
git reset --hard HEAD~1

# Belirli bir faza dön
git reset --hard <commit-sha>

```

### Kritik fail senaryoları ve aksiyonları


| Senaryo                              | Aksiyon                                                                                                             |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| Faz 1.3 scroll kalibrasyonu FAIL     | Faz 1'i tamamen revert. Root cause (genelde relative GSAP trigger). FIX-04 ile yeniden dene. Hâlâ FAIL → HARD STOP. |
| Faz 3 batch görsel regresyon         | FIX-05: sadece o batch revert. Önceki batch'ler korunur. Kullanıcı kararı beklet.                                   |
| Faz 4.2 ESLint rule mevcut kodu flag | Rule'u zayıflatma. İhlal eden kodu düzelt (FIX-02/06).                                                              |
| `CSS_TOKEN` silent transparent       | FIX-01 + FIX-02. DevTools computed style ile doğrula.                                                               |
| 2 retry sonrası hâlâ FAIL            | HARD STOP. Manual intervention raporu üret.                                                                         |


---

## 📦 MEMORY & KNOWLEDGE BASE UPDATES (NON-BLOCKING)

**ÖNEMLİ:** Bu adımlar kod refactor ile aynı execution chain'de DEĞİL. Kodsal artifact değiller. Faz 6'dan sonra, deploy'u bloklamadan paralel yapılır. Lovable bunları aksiyon olarak ÇALIŞTIRMAZ — yalnızca kullanıcıya yapılacaklar listesi olarak raporlar.

- `mem://design/forge-steel-palette` → v2.0 (Heat/Precision/Material) referansı.
- `mem://infrastructure/error-boundary-protection` → LavaTypographyScene + MoldCastScene referanslarını kaldır.
- `mem://architecture/stacking-scroll-system` → MoldCast yok, FlowScene/Scene ayrımı, güncel z-index haritası.
- `mem://infrastructure/z-index-architecture` → `satisfies Record<string, number>` pattern'i.

---

## 🎯 GO / NO-GO KARARI

### GO koşulları (hepsi ZORUNLU)

- [ ] Pre-flight A–F tamamı PASS.
- [ ] Faz 1–6 sıralı tamamlandı, her biri kendi commit'inde.
- [ ] Post-execution 7 komut + smoke test item'ları PASS.
- [ ] Baseline video ile after karşılaştırması: scroll story tutarlı.
- [ ] Mobile viewport'ta kritik regresyon YOK.
- [ ] ESLint rule mevcut kodu flag etmiyor.

### NO-GO triggers (biri bile geçerse HARD STOP)

- `tsc --noEmit` error.
- Batch sonrası görsel regresyon.
- Scroll trigger kayması 2 retry sonrası hâlâ mevcut.
- Asset frame count < 24.
- `rgba(var(--`, `zIndex: <literal>`, `text-white` sızması.
- Locked zone ihlali.
- Yeni npm dependency eklenmiş.

---

## 📜 LOVABLE'A AÇIK DİREKTİF (tek paragraf — kopyala-çalıştır)

> Bu dokümanı execution contract olarak kabul et. Önce PRE-FLIGHT bölümünü çalıştır ve `PRE-FLIGHT REPORT` üret. Tüm A–F PASS olmadan Faz 1'e GEÇME. Her fazı sırayla uygula: Faz 1 → 2 → 3 → 4 → 5 → 6. Her faz sonunda zorunlu `PHASE REPORT FORMAT`'ını doldur. Validation bir faz için FAIL ise `AUTO-FIX PROTOCOL`'den uygun fix'i seç, max 2 retry. 2 retry sonrası hâlâ FAIL ise HARD STOP raporu yaz ve bekle. Freeform reasoning uygulama; bu dokümanda tanımlı olmayan fix uygulama. Belirsizlik varsa `AMBIGUITY` error olarak işaretle, FIX-07 uygula. `package.json` DEĞİŞTİRME, yeni dependency EKLEME, `/admin/*`, `/musteri-paneli/*`, `supabase`, `useAuth*` klasörlerine DOKUNMA. Her faz ayrı commit (`chore(v3): phase-N — …`). Execution sonunda POST-EXECUTION VALIDATION'ı çalıştır ve GO/NO-GO kararını raporla. Memory güncellemeleri kod refactor ile aynı chain'de DEĞİL — Faz 6 sonrası ayrı listede raporla.