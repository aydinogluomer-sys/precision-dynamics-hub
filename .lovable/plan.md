
## Uygulanmamış / Eksik Kalan Fazlar — Envanter

`.lovable/plan.md` ve `docs/changelog/` taranarak, planlanmış ama henüz uygulanmamış işler aşağıda listelenmiştir. (Read-only modda olduğum için sadece envanter çıkarıyorum; uygulama onayınızdan sonra default mode'da yapılacak.)

### 1. Playwright E2E — Kurulum Tamam, Çalıştırma/Doğrulama Eksik
**Status**: Kod yazıldı (`e2e/*.spec.ts`, `playwright.config.ts`, `.github/workflows/playwright.yml`), ama:
- Browser binary (`npx playwright install chromium`) lokalde kurulmadı
- `npm run test:e2e` bir kez bile yeşil geçtiği doğrulanmadı
- CI workflow gerçek bir push/PR'da koşmadı → ilk run'da kırılma riski
- Failure halinde `playwright-report/` artifact'ı incelenmedi

### 2. Phase 11A/B/C/D — Bilinen Açık Issue'lar
`docs/qa-responsive-v3.md` ve `docs/phase-11C-qa-and-issue2.md`'den:
- **ISSUE-1 (HIGH)**: `/malzemeler/:slug` (örn. `/malzemeler/aluminyum`) kategori sayfalarında footer reveal CTA kartı hero text + footer link kolonlarını örtüyor. 375/768/1280 hepsinde reproduce ediliyor. Düzeltilmedi.
- **ISSUE-2 (LOW)**: `TestimonialsSection` ve `CNCScrollStory` için `forwardRef` warning'leri (PageTransition `motion.div` ref propagation). Dev-only ama hâlâ açık.

### 3. Footer Smoke-Test — Manuel Kanıt Tamam, Otomatik Sürüm Eksik
- `docs/footer-debug/issue1-snapshot-before.txt` ve `docs/known-issues/footer-reveal-bug.md` kapatılmadı
- `/mnt/documents/footer-smoke-test/REPORT.md` üretildi ama proje repo'sunda referans yok (`docs/v3-changelog.md` linklemiyor)

### 4. Phase 12 (Planlanan Ama Başlamayan)
`.lovable/plan.md` içinde refere edilen ama dosyası açılmayan:
- **Token System Collapse (Prompt #2)**: `mem://design/unified-color-system-v2` üç-eksenli token sistemi — kod tabanında hâlâ residual hardcoded color literals var (Phase 11A bunu kısmen temizlemişti)
- **Bundle leak follow-up**: `docs/phase-11B-bundle-leak-scan.md` bulgularına göre xlsx static fallback uygulandı (11D), ama `docs/phase-11D-xlsx-static-fallback.md`'de "follow-up: dynamic import retry on next major" notu var → açık

### 5. Tooling / DX
- **`bun.lockb` + `bun.lock` + `package-lock.json`** üçü birden mevcut — lockfile çakışması, CI'da non-deterministic install riski
- **ESLint guardrail** (Phase 11'de eklendi) — yeni `e2e/` klasörü için lint scope'una dahil edilmedi

---

## Önerilen Sıra (P0 → P2)

| # | İş | Öncelik | Tahmini scope |
|---|---|---|---|
| 1 | Playwright lokal smoke run + CI ilk yeşil | **P0** | 1 session |
| 2 | ISSUE-1: `/malzemeler/:slug` footer overlap fix | **P0** | 1 session |
| 3 | Lockfile çakışmasını çöz (bun vs npm seç) | **P1** | 30 dk |
| 4 | ISSUE-2: forwardRef warning (PageTransition refactor) | **P1** | 1 session |
| 5 | Token System Collapse (Phase 12) | **P2** | 2-3 session |
| 6 | xlsx dynamic import retry | **P2** | 1 session |

---

## Bu Plan Onaylanırsa Ne Yapılacak

Onaylarsanız şu **tek bir** atomik iş paketini default mode'da uygularım:

**Paket: P0 bloğu (1 + 2)**
- `npx playwright install chromium` çalıştır, `npm run test:e2e` ilk yeşili al, fail varsa selector/timeout patch'le
- `/malzemeler/:slug` (MalzemeKategori.tsx) min-height + footer spacer ResizeObserver hesabını fix et, 375/768/1280 manuel screenshot kanıtı ekle
- `REPORT.md` ve `docs/qa-responsive-v3.md`'yi güncelle (ISSUE-1 → CLOSED)

P1/P2 işleri ayrı session'larda — daha temiz changelog ve daha küçük blast radius için.

Farklı bir paket (sadece Playwright run, sadece ISSUE-1, ya da tüm P0+P1) isterseniz söyleyin.
