# MAS TECHNIC v3.4 — FAZ 11 EXECUTION CONTRACT (LOVABLE)

> Bu doküman tek bir execution contract'tır. Okuduğun andan itibaren PRE-FLIGHT ile başla ve fazları sırayla uygula. Açıklama isteme, onay sorma, scope genişletme. Her fazın sonunda zorunlu raporu üret.

---

## 🔁 ENGINE

```
EXECUTE → VALIDATE → (FAIL → DIAGNOSE → AUTO-FIX → RETRY) × max 2 → HARD STOP

```

- Retry limiti: faz başına **2**. Üçüncüde HARD STOP.
- Freeform reasoning YASAK. Fix yalnızca `AUTO-FIX PROTOCOL` (FIX-01…08) içinden seçilir.
- Scope expansion YASAK. Bu dokümanda olmayan dosyaya/işe dokunma.
- Her faz sonunda `PHASE REPORT FORMAT` zorunlu. Rapor eksikse execution INVALID.
- Her faz kendi commit'inde: `chore(v3): phase-11<letter> — <özet>` veya `docs(v3): …`
- Kod yorumları Türkçe, identifier'lar İngilizce.
- Belirsizlik → `AMBIGUITY DETECTED` raporu + FIX-07 + HARD STOP.

---

## 🚫 LOCKED ZONES (DOKUNMA)

- `src/pages/admin/**`, `src/pages/musteri-paneli/**`
- `src/components/admin/**`, `src/components/musteri/**`
- `src/integrations/supabase/**`, `src/hooks/useAuth*`
- `src/components/ui/*` (shadcn vendor)
- `src/lib/tokens.ts` (sadece yeni token ekleme OK)
- `src/index.css` ve `src/styles/**` (token tanım dosyaları — yalnız FIX-01 için düzenlenebilir)
- `vite.config.ts` `build/define/resolve` blokları
- `tailwind.config.ts` `content` paths, `fontFamily`, `borderRadius.DEFAULT`
- `package.json` **— yeni npm paketi YOK. Kurulum girişimi = HARD STOP.**

Locked zone ihlali = HARD STOP.

---

## 📐 GLOBAL RULES

1. `border-radius: 0` global.
2. Font: IBM Plex Mono + IBM Plex Sans.
3. Scroll: yalnızca Lenis.
4. Animasyon: GSAP + Framer Motion.
5. Hardcoded renk YASAK (token tanım dosyaları hariç).
6. `z-index` numeric literal YASAK — `SECTION_Z` üzerinden.
7. `rgba(var(--x), A)` INVALID → `rgb(var(--x-rgb) / A)` zorunlu.
8. Tailwind preset renk class YASAK: `text-white`, `text-black`, `bg-white`, `bg-black`, `border-white`, `border-black`, `ring-white/black`, `fill-white/black`, `stroke-white/black`.
9. Her faz sonrası `tsc --noEmit` → 0 error.

---

## 🚦 PRE-FLIGHT (P1–P7) — HEPSİ PASS

### P1 · v3.3 state integrity

```bash
git log --oneline | head -20 | grep -E "phase-[1-6]"

```

FAIL → HARD STOP.

### P2 · Token existence audit

```bash
grep -rn "^\s*--" src/index.css src/styles/ 2>/dev/null | \
  grep -E "(heat-|precision-|material-|surface-|text-|overlay-|border-|bg-dark-)"

```

Eksik token (özellikle `--precision-teal`, `--bg-dark-obsidian` ve `-rgb` variant'ları) → FIX-01.

### P3 · ESLint baseline

```bash
npx eslint src/ --ext .ts,.tsx 2>&1 | tee /tmp/eslint-baseline.log
grep -c "no-restricted-syntax" /tmp/eslint-baseline.log || echo "0"

```

Count kayda geç.

### P4 · Residual literal scan (3 pass)

```bash
# Pass A — hex/rgb/hsl literal
grep -rn -E "#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*[0-9]|hsla?\([^)]*[0-9]" src/ \
  --include="*.tsx" --include="*.ts" --exclude-dir=node_modules \
  | grep -v "src/index.css" | grep -v "src/styles/" \
  | grep -v "\.test\." | grep -v "\.stories\." \
  | grep -v "// OK:" | grep -v "var(--"

# Pass B — Tailwind preset literal
grep -rn -E "\b(text|bg|border|ring|fill|stroke|divide|placeholder|caret|accent)-(white|black)\b" src/ \
  --include="*.tsx" --include="*.ts" --exclude-dir=node_modules \
  | grep -v "\.test\." | grep -v "\.stories\."

# Pass C — invalid rgba(var(--)
grep -rn "rgba(var(--\|rgba(\s*var(--" src/ --include="*.tsx" --include="*.ts"

```

Üç pass çıktısını `docs/phase-11-residual-audit.md` dosyasına tablo olarak yaz:

```markdown
# Phase 11 Residual Literal Audit
Date: <ISO>

## Pass A — hex/rgb/hsl literals
| File | Line | Value | Proposed Token |
|---|---|---|---|

## Pass B — Tailwind presets
| File | Line | Class | Proposed Replacement |
|---|---|---|---|

## Pass C — invalid rgba(var(--)
(should be empty)

```

### P5 · Build baseline

```bash
rm -rf dist/
npm run build
ls -la dist/assets/ > docs/phase-11-bundle-before.txt
du -sh dist/assets/*.js | sort -rh > docs/phase-11-bundle-sizes-before.txt

```

### P6 · Responsive baseline

`docs/baseline/v2.9-before.mp4` varsa reuse. Yoksa browser tool ile 6 kritik sayfa × 3 viewport = 18 screenshot, `docs/baseline/phase-11-before/`. Browser tool yoksa `SKIPPED`.

### P7 · xlsx haritalama

```bash
grep -rn "xlsx" src/ --include="*.tsx" --include="*.ts"
grep -rn "excelExport\|exportToExcel\|downloadExcel" src/ --include="*.tsx" --include="*.ts"

```

### PRE-FLIGHT raporu zorunlu:

```
PRE-FLIGHT 11 REPORT
[P1] v3.3 state: PASS | FAIL
[P2] Token audit: PASS | FAIL (missing: [...])
[P3] ESLint baseline: <N> errors
[P4] Pass A: <N>, Pass B: <N>, Pass C: <N>
[P5] Build: PASS | FAIL, total: <KB>
[P6] Responsive baseline: CAPTURED | REUSED | SKIPPED
[P7] xlsx integrations: <file:line list>
NEXT: BEGIN phase-11A | STOP

```

Herhangi bir P FAIL → HARD STOP.

---

# 🧱 FAZ 11A — RESIDUAL COLOR SWEEP

### DETERMINISTIC MAPPING TABLE

**Hex:**


| FROM                          | TO                                                             |
| ----------------------------- | -------------------------------------------------------------- |
| `#ffffff` / `#fff`            | `var(--text-primary)`                                          |
| `#000000` / `#000`            | `var(--surface-base)` veya `var(--overlay-dark-low)` (context) |
| `#ff6b35`, `#e8610a` (molten) | `var(--heat-molten)`                                           |
| `#0688ad` teal                | `var(--precision-ice)`                                         |
| `#007190`                     | `var(--precision-steel)`                                       |
| `#0f172a` slate-900           | `var(--surface-base)`                                          |
| `#141414`                     | `var(--surface-raised)`                                        |
| Başka brand-dışı hex          | **AMBIGUITY → FIX-07**                                         |


**rgba:**


| FROM                  | TO                                    |
| --------------------- | ------------------------------------- |
| `rgba(0,0,0,A)`       | `rgb(var(--surface-base-rgb) / A)`    |
| `rgba(255,255,255,A)` | `rgb(var(--text-primary-rgb) / A)`    |
| `rgba(232,97,10,A)`   | `rgb(var(--heat-molten-rgb) / A)`     |
| `rgba(6,136,173,A)`   | `rgb(var(--precision-ice-rgb) / A)`   |
| `rgba(0,113,144,A)`   | `rgb(var(--precision-steel-rgb) / A)` |


**hsl:**


| FROM                  | TO                                                                   |
| --------------------- | -------------------------------------------------------------------- |
| `hsl(var(--forge-*))` | v2.0 semantic (`--heat-ember`, `--surface-base`, `--surface-raised`) |
| `hsl(180 100% 50%)`   | `var(--precision-teal)` veya `var(--precision-ice)`                  |
| Başka hsl             | **AMBIGUITY → FIX-07**                                               |


**Tailwind presets (FIX-03):**

- `text-white` → `text-[var(--text-primary)]`
- `text-black` → `text-[var(--text-inverse)]`
- `bg-black` → `bg-[var(--surface-base)]`
- `bg-white` → `bg-[var(--text-primary)]` (nadir; şüpheliyse AMBIGUITY)
- `border-white` → `border-[rgb(var(--text-primary-rgb)/0.16)]`
- `border-black` → `border-[var(--surface-base)]`

**İstisna (dokunma):** `/* DO NOT tokenize */` yorumu olan blok (ProjectShowcase.tsx v3.3 Faz 3 Batch 5 PRESERVE).

### BATCH STRATEJİSİ

P4 toplam dosya sayısına göre:

- **≤9 dosya** → 1 batch, file-by-file
- **10–18 dosya** → 3 batch × max 6 dosya (UI primitives → interactive → sections)
- **19+ dosya** → 5 batch × max 5 dosya:
  - B1: `src/components/ui/**` (non-shadcn)
  - B2: overlay/decoration (Floating*, Glow*, Elegant*, AmbientGlow*, HUD*, Spark*)
  - B3: header/footer/navigation
  - B4: section components (Hero*, FAQ*, Stats*, Quote*, Marquee*)
  - B5: page components (`src/pages/*.tsx` public routes)

**Global find-replace YASAK.** File-scoped AST/editör edit.

### BATCH SONRASI VALIDATION

```bash
tsc --noEmit
npx eslint src/ --ext .ts,.tsx 2>&1 | grep "no-restricted-syntax" | wc -l

```

- tsc: 0 error
- ESLint count: önceki batch'e göre **düşmüş** olmalı
- Dev server'da batch dosyalarını aç, görsel smoke (transparent render / renk kaybı / layout shift yok)

Regresyon → FIX-05 (batch revert) + BLOCKED_ON_USER.

### FINAL VALIDATION (11A kapanışı)

```bash
# Pass A
grep -rn -E "#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*[0-9]|hsla?\([^)]*[0-9]" src/ \
  --include="*.tsx" --include="*.ts" --exclude-dir=node_modules \
  | grep -v "src/index.css" | grep -v "src/styles/" \
  | grep -v "\.test\." | grep -v "\.stories\." \
  | grep -v "// OK:" | grep -v "var(--"

# Pass B
grep -rn -E "\b(text|bg|border|ring|fill|stroke)-(white|black)\b" src/ \
  --include="*.tsx" --include="*.ts" --exclude-dir=node_modules \
  | grep -v "\.test\." | grep -v "\.stories\."

# Pass C
grep -rn "rgba(var(--" src/ --include="*.tsx" --include="*.ts"

# ESLint
npx eslint src/ --ext .ts,.tsx

```

**Expected:** Üç grep boş, ESLint 0 error.

**Commit sırası (her batch ayrı):**

```
chore(v3): phase-11A batch-1 — ui primitive color migration
chore(v3): phase-11A batch-2 — overlay/decoration color migration
chore(v3): phase-11A batch-3 — nav/header/footer color migration
chore(v3): phase-11A batch-4 — section components color migration
chore(v3): phase-11A batch-5 — page components color migration

```

→ `PHASE 11A REPORT` → NEXT: `phase-11B`.

---

# 📦 FAZ 11B — BUNDLE FORENSICS

### 1. Clean build

```bash
rm -rf dist/
npm run build 2>&1 | tee docs/phase-11-build-after.log

```

### 2. Chunk inventory

```bash
ls -la dist/assets/ > docs/phase-11-bundle-after.txt
du -sh dist/assets/*.js | sort -rh > docs/phase-11-bundle-sizes-after.txt
diff docs/phase-11-bundle-sizes-before.txt docs/phase-11-bundle-sizes-after.txt || true

```

### 3. Filename-based chunk split

```bash
ls dist/assets/ | grep -iE "admin|musteri|xlsx" || echo "NO_SEPARATE_CHUNK"

```

### 4. Main chunk string scan

```bash
MAIN_CHUNK=$(ls dist/assets/index-*.js 2>/dev/null | head -1)

grep -oE "AdminDashboard|AdminSidebar|RFQManager|FinancialView|user_roles|admin_panel" "$MAIN_CHUNK" | sort -u
grep -oE "MusteriPaneli|MusteriSidebar|SiparislerimTab|customer_panel" "$MAIN_CHUNK" | sort -u
grep -oE "XLSX\.utils|xlsx-js-style|SheetJS" "$MAIN_CHUNK" | sort -u
grep -oE "user_roles|admin_logs" "$MAIN_CHUNK" | sort -u

```

### YORUMLAMA

- **Separate chunk YOK + main'de string VAR** → `BUNDLE_LEAK` → FIX-06
- **Separate chunk VAR + main'de string VAR + size delta < 50KB** → `MINIFIER_RESIDUAL` (OK, `// NOTE: minifier residual string, verified non-leak` ile raporla)
- **Separate chunk VAR + size delta > 50KB** → gerçek leak → FIX-06
- **Hiç bulunamadı** → CLEAN → PASS

### 5. Rapor: `docs/bundle-forensics-v3.md`

```markdown
# Bundle Forensics — Phase 11B
Date: <ISO>

## Chunk Inventory
| Chunk | Size (raw) | Purpose |
|---|---|---|

## Before/After Delta
<diff output>

## Leak Scan Results
- Admin strings in main: <list or "none">
- Customer strings in main: <list or "none">
- xlsx strings in main: <list or "none">
- Supabase admin-only: <list or "none">

## Verdict
- [ ] CLEAN
- [ ] MINIFIER_RESIDUAL
- [ ] LEAK_DETECTED (FIX-06 applied)

## Total bundle
- Total JS (raw): <KB>
- Largest chunk: <name, size>
- Red flags (>300 KB gzipped): <list or none>

```

Leak confirmed → FIX-06 × 2 retry → hâlâ leak ise HARD STOP.

**Commit:** `docs(v3): phase-11B bundle forensics report` → `PHASE 11B REPORT` → NEXT: `phase-11C`.

---

# 📱 FAZ 11C — RESPONSIVE QA

### MATRIX (6 sayfa × 3 viewport = 18)


| #   | Sayfa                   | Neden kritik                            |
| --- | ----------------------- | --------------------------------------- |
| 1   | `/`                     | Stacking scroll, dot nav, full pipeline |
| 2   | `/malzemeler`           | Footer "static" variant                 |
| 3   | `/malzemeler/aluminyum` | Detail, card grid                       |
| 4   | `/teklif-al`            | Wizard, footer YOK                      |
| 5   | `/blog`                 | Footer "reveal" variant                 |
| 6   | `/404`                  | Glitch effect, footer YOK               |


**Viewports:** 375×812, 768×1024, 1280×832.

### HER HÜCRE İÇİN

1. `navigate_to_sandbox` → route
2. Viewport ayarla
3. Top → bottom smooth scroll, her 500ms `take_screenshot`
4. `read_console_logs` → error/warning capture
5. Dot nav varsa her dot'a tıkla
6. Footer variant doğrulama

### CHECK-LIST (her hücre)

- [ ] Üst üste binme yok
- [ ] Footer variant doğru
- [ ] Scroll kesintisiz (Lenis aktif)
- [ ] Token renkleri tutarlı
- [ ] Console 0 error, 0 warning
- [ ] Dot nav doğru pozisyon, tıklanabilir
- [ ] Image/asset yüklü
- [ ] Mobile'da `document.documentElement.scrollWidth <= window.innerWidth`

Browser tool erişimi yoksa → `SKIPPED` + `BLOCKED_ON_USER`.

### Rapor: `docs/qa-responsive-v3.md`

```markdown
# Responsive QA — Phase 11C
Date: <ISO>

## Matrix
| Page | 375px | 768px | 1280px | Console | Notes |
|---|---|---|---|---|---|
| / | ✅ | ✅ | ✅ | 0 err | — |
| /malzemeler | | | | | |
| /malzemeler/aluminyum | | | | | |
| /teklif-al | | | | | footer absent ✓ |
| /blog | | | | | footer reveal ✓ |
| /404 | | | | | footer absent ✓ |

## Issues Detected
(none / list)

## Baseline Comparison
- [ ] Tolerance within limits
- [ ] Deltas accepted (color shifts from v2.0)

```

Console error ≥1 per page → `RESPONSIVE_REGRESSION` → HARD STOP.

**Commit:** `docs(v3): phase-11C responsive qa report` → `PHASE 11C REPORT` → NEXT: `phase-11D`.

---

# 📊 FAZ 11D — XLSX EXPORT VERIFICATION

### MODE SEÇİMİ

- Admin credential VAR + browser tool VAR → **E2E**
- Biri veya ikisi YOK → **STATIC_FALLBACK** (FIX-08)

### E2E MODE

1. `navigate_to_sandbox` → `/admin/login`
2. Credential ile login
3. `/admin` → FinancialView veya CustomersView
4. `list_network_requests` baseline
5. Export butonuna tıkla
6. `list_network_requests` delta
7. Delta'da `xlsx-*.js` / `xlsx.min-*.js` async fetch var mı?
8. Toast/download başarılı mı?
9. Console error kontrolü
10. Logout

### STATIC_FALLBACK (FIX-08)

```bash
# 1. Dynamic import kanıtı
grep -rn "import(['\"]xlsx" src/ --include="*.tsx" --include="*.ts"

# 2. Statik import sızıntı kontrolü (OLMAMALI)
grep -rn "^import.*from ['\"]xlsx['\"]" src/ --include="*.tsx" --include="*.ts"

# 3. Build chunk varlığı
ls dist/assets/ | grep -i xlsx

# 4. Export lazy wrapper
grep -rn "await import" src/lib/ src/components/admin/ 2>/dev/null | grep xlsx

```

Kriter:

- (1) ≥1 match ✓
- (2) 0 match ✓
- (3) ≥1 chunk ✓
- (4) ≥1 match ✓

Dördü PASS → `e2e: STATIC_FALLBACK` + faz PASS. Biri FAIL → `E2E_BLOCKED` + HARD STOP.

### Rapor: `docs/xlsx-verification-v3.md`

```markdown
# Excel Export Verification — Phase 11D
Date: <ISO>
Mode: E2E | STATIC_FALLBACK

## If E2E
- Login: admin credential
- Triggered view: FinancialView | CustomersView
- Network delta: Before <n>, After <n+k>
- xlsx chunk fetched: ✓/✗
- Toast/download: success | fail
- Console errors: <list or none>

## If STATIC_FALLBACK
- Dynamic import: <match list>
- Static import check: <clean or leak>
- Build chunk: <filename>
- Lazy wrapper: <match list>

## Verdict
CLEAN | LEAK_DETECTED | BLOCKED_NEEDS_USER

```

**Commit:** `docs(v3): phase-11D xlsx export verification` → `PHASE 11D REPORT` → NEXT: `phase-11E`.

---

# 📚 FAZ 11E — CONSOLIDATION & DOCS

### 1. `docs/v3-changelog.md` güncelle

```markdown
## Phase 11 — Post-v3.3 Hardening

### 11A — Residual Color Sweep
- <N> dosyada hex/rgb/hsl literal migrate.
- <M> dosyada Tailwind preset → semantic token.
- Pass C ihlalleri: 0.
- ESLint no-restricted-syntax: 0.

### 11B — Bundle Forensics
- Main chunk delta: <Δ KB>
- Admin/customer/xlsx leak: <clean | detected+fix>
- Largest chunk: <name, size>

### 11C — Responsive QA
- 6 × 3 = 18 snapshot.
- Console error total: <N>
- Regresyon: <none | list>

### 11D — Excel Export Verification
- Mode: <E2E | STATIC_FALLBACK>
- Verdict: <CLEAN | LEAK_DETECTED>

```

### 2. `plan.md2` güncelle

- Faz 7 (Performans): `✅ Tam ölçüldü (phase-11B)`
- Faz 10 (Final QA): `✅ Kısmi (phase-11C)`

### 3. `README.md` patch

"Design System v2.0" altına:

> Migration status: 100% — no residual literals (verified `phase-11A`).

### 4. FINAL VALIDATION (aggregate)

```bash
tsc --noEmit
npx eslint src/ --ext .ts,.tsx

grep -rn -E "#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*[0-9]|hsla?\([^)]*[0-9]" src/ \
  --include="*.tsx" --include="*.ts" \
  | grep -v "src/index.css" | grep -v "src/styles/" \
  | grep -v "\.test\." | grep -v "\.stories\." \
  | grep -v "// OK:" | grep -v "var(--"

grep -rn -E "\b(text|bg|border|ring|fill|stroke)-(white|black)\b" src/ \
  --include="*.tsx" --include="*.ts" \
  | grep -v "\.test\." | grep -v "\.stories\."

grep -rn "rgba(var(--" src/ --include="*.tsx" --include="*.ts"

npm run build

ls docs/bundle-forensics-v3.md docs/qa-responsive-v3.md docs/xlsx-verification-v3.md docs/v3-changelog.md

```

Hepsi PASS → `GO for production deploy`.

**Commit:** `docs(v3): phase-11E consolidation + changelog` → `PHASE 11E REPORT`.

---

## 🛠️ AUTO-FIX PROTOCOL


| ID         | Durum                     | Aksiyon                                                                                                                                                                 |
| ---------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **FIX-01** | MISSING_TOKEN             | `:root` bloğuna solid + `-rgb` variant ekle, RETRY                                                                                                                      |
| **FIX-02** | INVALID_RGBA_TOKEN_SYNTAX | `rgba(var(--x), A)` → `rgb(var(--x-rgb) / A)`. `--x-rgb` yoksa FIX-01                                                                                                   |
| **FIX-03** | TAILWIND_LITERAL          | Preset class → arbitrary token (üst mapping)                                                                                                                            |
| **FIX-04** | HARDCODED_LITERAL         | Deterministic Mapping Table'a bak; mapping yok → FIX-07                                                                                                                 |
| **FIX-05** | BATCH_REVERT              | Batch commit'ini revert, önceki batch'ler korunur, HARD STOP                                                                                                            |
| **FIX-06** | BUNDLE_LEAK_INVESTIGATION | Filename-based check → separate chunk varlığı. Yoksa `App.tsx` / route config'te `lazy()` import doğrula, eager ise `lazy()`'e çevir. **package.json'a dokunma.** RETRY |
| **FIX-07** | AMBIGUITY_HALT            | Fazı durdur, AMBIGUITY raporu, kullanıcı kararı                                                                                                                         |
| **FIX-08** | E2E_STATIC_FALLBACK       | STATIC mode'a geç: 4 grep kriteri                                                                                                                                       |


Listede olmayan fix uygulanamaz → `UNKNOWN` + HARD STOP.

---

## 📊 PHASE REPORT FORMAT (ZORUNLU)

```
================================================
PHASE 11<X> REPORT — <faz adı>
================================================

STATUS: PASS | FAIL | HARD_STOP | BLOCKED_ON_USER
ATTEMPT: 1 | 2

VALIDATION CHECKS:
- tsc --noEmit: PASS | FAIL | N/A
- eslint: PASS | FAIL | N/A
- grep guard-N: PASS | FAIL
- build: PASS | FAIL | N/A
- visual smoke: PASS | FAIL | SKIPPED
- e2e: PASS | FAIL | STATIC_FALLBACK

ERRORS (if any):
  TYPE: TS_COMPILE | CSS_TOKEN | COLOR_MIGRATION | BUNDLE_LEAK |
        RESPONSIVE_REGRESSION | E2E_BLOCKED | TAILWIND_LITERAL |
        AMBIGUITY | UNKNOWN
  FILE: <path>:<line>
  CAUSE: <1-line>
  ROOT CAUSE: <1-line>

FIXES APPLIED (if retry):
  - <fix ID>

ARTIFACTS CREATED:
  - <path> (size)

CHANGES:
  - <file>: <what>

COMMIT: <SHA>
NEXT ACTION: CONTINUE phase-11<X+1> | STOP | AWAIT_USER
================================================

```

---

## ✅ POST-EXECUTION GATE

**Zorunlu artifact'lar:**

- `docs/phase-11-residual-audit.md`
- `docs/phase-11-bundle-before.txt` + `-sizes-before.txt`
- `docs/phase-11-bundle-after.txt` + `-sizes-after.txt`
- `docs/bundle-forensics-v3.md`
- `docs/qa-responsive-v3.md`
- `docs/xlsx-verification-v3.md`
- `docs/v3-changelog.md` (Phase 11 bölümü)
- `docs/baseline/phase-11-before/` + `after/` (varsa)

**Zorunlu commit'ler:**

- 11A batch commit'leri (1–5)
- `docs(v3): phase-11B bundle forensics report`
- `docs(v3): phase-11C responsive qa report`
- `docs(v3): phase-11D xlsx export verification`
- `docs(v3): phase-11E consolidation + changelog`

**Zorunlu test sonuçları:**

- tsc: 0 error
- eslint: 0 error
- grep Pass A/B/C: tümü boş
- npm run build: success
- responsive aggregated console error: 0
- bundle: LEAK yok veya MINIFIER_RESIDUAL (verified)
- xlsx: E2E PASS veya STATIC_FALLBACK CLEAN

---

## 🟢 GO / 🔴 NO-GO

### GO (hepsi zorunlu)

- [ ] P1–P7 PASS
- [ ] 11A–11E sıralı tamamlandı
- [ ] Post-execution gate artifact'ları mevcut
- [ ] 7 final validation komutu PASS
- [ ] Responsive baseline comparison tutarlı (varsa)
- [ ] Bundle: LEAK_DETECTED değil
- [ ] xlsx: PASS veya STATIC_FALLBACK CLEAN

### NO-GO (biri bile → HARD STOP)

- tsc error
- ESLint `no-restricted-syntax` error
- Pass A/B/C grep dolu
- Build fail
- BUNDLE_LEAK confirmed
- RESPONSIVE_REGRESSION (onaysız)
- E2E_BLOCKED + fallback fail
- Locked zone ihlali
- `package.json` müdahalesi
- Yeni npm dependency

---

## 📦 MEMORY UPDATES (11E SONRASI, KOD DIŞI)

11E bitince kullanıcıya **ayrı listede** raporla (kendin çalıştırma):

- `mem://design/forge-steel-palette` → "100% migrated (v3.4 phase-11A)"
- `mem://architecture/stacking-scroll-system` → 11C matrix sonuçları
- `mem://infrastructure/performance-baseline` → bundle-forensics-v3.md ref
- `mem://infrastructure/xlsx-export-lazy-pattern` → STATIC_FALLBACK/E2E kanıtı

---

## ⚡ EXECUTION DIRECTIVE

PRE-FLIGHT (P1–P7) çalıştır ve `PRE-FLIGHT 11 REPORT` üret. Hepsi PASS değilse HARD STOP. Sonra sırayla: 11A → 11B → 11C → 11D → 11E.

- 11A: residual audit'e göre batch sayısını seç (≤9 / 10–18 / 19+). Her batch sonrası `tsc --noEmit` + dev görsel smoke. Her batch kendi commit'inde.
- 11B: clean build → before/after diff → main chunk string scan → separate chunk varlığıyla leak vs. minifier residual ayırt et.
- 11C: 6 × 3 = 18 matrix. Tool yoksa SKIPPED + BLOCKED_ON_USER.
- 11D: credential varsa E2E, yoksa FIX-08 STATIC_FALLBACK (4 grep kriteri).
- 11E: docs konsolide et, final 7 validation komutu.

Her faz sonunda `PHASE REPORT FORMAT` doldur. Fix sadece FIX-01…08 içinden. Max 2 retry, üçüncüde HARD STOP. `package.json`'a dokunma, yeni dependency ekleme. Belirsizlik → AMBIGUITY + FIX-07 + HARD STOP. Memory updates 11E sonrası liste olarak raporla. Sonda Post-Execution Gate → GO/NO-GO kararı.

**BAŞLA.**