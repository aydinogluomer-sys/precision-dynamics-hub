# MAS TECHNIC v3.4 — FOOTER REVEAL: FINAL REVIEW & EXECUTION CONTRACT

> **Statü:** PRODUCTION-GRADE · EVIDENCE-DRIVEN · DEPLOYMENT GATEKEEPER **Runner:** Lovable (Plan Mode → Execute Mode) **Strateji:** PROMPT 1 (Forensics) → kullanıcı root cause onayı → PROMPT 2 (Fix) **Dil:** Kod yorumları Türkçe, identifier'lar İngilizce

---

## 🔁 ENGINE

```
EXECUTE → VALIDATE → (FAIL → DIAGNOSE → PREDEFINED FIX → RETRY) × max 2 → HARD STOP

```

- Scope dışı dosyaya dokunma.
- Her adım sonunda rapor zorunlu — eksikse execution INVALID.
- `package.json`'a yeni bağımlılık = HARD STOP.
- Belirsizlik = AMBIGUITY raporu + HARD STOP.

---

## 🚫 LOCKED ZONES

- `src/pages/admin/**`, `src/pages/musteri-paneli/**`
- `src/integrations/supabase/**`, `src/hooks/useAuth*`
- `src/components/ui/*` (shadcn vendor)
- `package.json`
- `tailwind.config.ts` content paths, fontFamily, borderRadius.DEFAULT
- `vite.config.ts` build/define/resolve blokları
- `/malzemeler/aluminyum` — ISSUE-1 fix'i her adımda korunacak

---

## ══════════════════════════════════════════════

## PROMPT 1 — FORENSICS + RENDERING INTEGRITY

## ══════════════════════════════════════════════

> **HİÇBİR DOSYAYI DEĞİŞTİRME.** Bu prompt yalnızca okuma, ölçüm, analiz ve rapor üretir.

---

### F1 — Footer.tsx TAM OKUMA

Aşağıdakileri tespit et — her madde için **gerçek değeri** yaz, "unknown" kabul edilmez:

**Pozisyon & layout:**

1. `position` değeri — `fixed` / `sticky` / `relative` / `absolute`
2. `bottom` değeri (fixed ise) — sabit px mi, 0 mu?
3. `height` veya `min-height` kısıtı var mı? Değer nedir?
4. `max-height` kısıtı var mı? Değer nedir?
5. `overflow` değeri — `hidden` / `auto` / `visible` / `clip`
6. `overflow-y` ayrıca set edilmiş mi?

**Spacer mekanizması:** 7. Spacer DOM'da nasıl oluşturuluyor? (`useRef` + style.height? Tailwind class? CSS var?) 8. Spacer'a yazılan değer: `footer.offsetHeight` mu, `footer.scrollHeight` mu, başka bir değer mi? 9. Spacer'ın ölçüm zamanlaması: mount anında mı, scroll event'inde mi, observer callback'inde mi?

**Variant sistemi:** 10. Prop adı ve alabileceği tüm değerler (`reveal` / `static` / başka?) 11. Her variant'ta `position` değeri ne oluyor? 12. Her variant'ta `overflow` değeri ne oluyor?

**Reveal trigger:** 13. Trigger mekanizması: scroll position listener mı, IntersectionObserver mı, başka? 14. Eğer scroll position: hangi eşik? `document.scrollHeight - window.innerHeight` mi, sabit px mi, yüzde mi? 15. Eğer IntersectionObserver: hangi element observe ediliyor? Threshold değeri nedir? 16. **KRİTİK:** Trigger başlatılmadan önce spacer DOM'a eklenmiş mi? Sıralama nedir?

**Observer:** 17. `ResizeObserver` var mı? 18. Varsa: neyi observe ediyor? (footer'ın kendisi mi, spacer mı, window mı?) 19. Callback ne zaman tetikleniyor: mount-only mu, her resize'da mı? 20. Callback'te hangi ölçüm alınıp nereye yazılıyor? 21. `document.fonts.ready` bekleniyor mu?

**Z-index:** 22. Footer'ın z-index değeri (sayısal veya CSS variable adı) 23. Stacking context oluşturuyor mu? (`transform`, `will-change`, `filter` var mı?)

---

### F2 — Z-INDEX AUDIT

`Index.tsx` ve ilgili section dosyalarını tara:

1. `SECTION_Z` map'i (veya equivalent) — tüm değerleri listele
2. `finalCta` (veya son sticky section) z-index değeri
3. Footer z-index değeri
4. İkisi arasındaki fark: Footer finalCta **üzerinde** mi **altında** mı?
5. Footer'ın parent elementi stacking context oluşturuyor mu?
  - `transform: translateY(...)` → **yeni stacking context açar**, z-index kardeşler arası çalışmaz
  - `will-change: transform` → aynı etki
  - Bu durum varsa z-index fix'i yetmez, stacking context fix'i de gerekir

---

### F3 — REVEAL TRIGGER: SIRALAMA ANALİZİ (KRİTİK)

Bu soruyu koda bakarak yanıtla:

```
Spacer DOM'a eklenip yüksekliği hesaplanıyor mu
    ↓ ÖNCE mi?
Trigger başlatılıyor mu
    ↓ SONRA mı?

```

**Eğer sıralama ters ise** (trigger önce, spacer sonra):

- `document.scrollHeight` trigger hesaplanırken spacer yüksekliğini içermez
- Sayfa "scroll edilemez" görünür veya reveal çok erken/geç tetiklenir
- `scrollHeight` fix'i tek başına yetersizdir, trigger sıralaması da düzeltilmeli

**Ayrıca tespit et:**

- Trigger, `window.innerHeight` kullanıyorsa iOS Safari'de `100vh ≠ window.innerHeight` problemi var mı?
- `100dvh` veya `svh/lvh` kullanımı var mı?

---

### F4 — FOOTER KULLANAN SAYFALAR

Her sayfa için `variant` prop'unu ve Footer'ın nasıl import edildiğini tespit et:


| Sayfa                    | Variant | Import tipi             | Layout wrapper var mı? |
| ------------------------ | ------- | ----------------------- | ---------------------- |
| `Index.tsx`              | ?       | Doğrudan / Layout / HOC | ?                      |
| `Malzemeler.tsx`         | ?       | ?                       | ?                      |
| `MalzemeKategori.tsx`    | ?       | ?                       | ?                      |
| `Blog.tsx`               | ?       | ?                       | ?                      |
| `Iletisim.tsx`           | ?       | ?                       | ?                      |
| `Hakkimizda.tsx`         | ?       | ?                       | ?                      |
| `KVKK.tsx`               | ?       | ?                       | ?                      |
| `GizlilikPolitikasi.tsx` | ?       | ?                       | ?                      |
| `CerezPolitikasi.tsx`    | ?       | ?                       | ?                      |
| `SSS.tsx`                | ?       | ?                       | ?                      |
| `ServiceDetail.tsx`      | ?       | ?                       | ?                      |
| `CategoryPage.tsx`       | ?       | ?                       | ?                      |


---

### F5 — BROWSER REPRO (Görsel Kanıt)

Dev server başlat. Her viewport için tam alt kısmı screenshot al.

**F5A —** `/` **(reveal variant):**

- 375×812 → `docs/footer-debug/home-375-bottom.png`
- 768×1024 → `docs/footer-debug/home-768-bottom.png`
- 1280×832 → `docs/footer-debug/home-1280-bottom.png`

**F5B —** `/iletisim` **(static bekleniyor):**

- 375×812 → `docs/footer-debug/iletisim-375-bottom.png`
- 768×1024 → `docs/footer-debug/iletisim-768-bottom.png`
- 1280×832 → `docs/footer-debug/iletisim-1280-bottom.png`

**F5C — Her screenshot için yanıtla:**

```
Kesik olan parça: alt bar / CTA card / link kolonları / hiçbiri
Tahmini kesiklik: ~__ px
Horizontal overflow: var / yok (scrollWidth vs innerWidth)
Console error: <liste veya "yok">
Static variant aynı sorunu gösteriyor: evet / hayır

```

Browser tool yoksa → `SKIPPED`, kullanıcıya bildir, forensics raporunu kısmi tamamla.

---

### F6 — RESIZEOBSERVER TIMING

Footer `ResizeObserver` callback'inin gerçek zamanlama davranışını koddan tespit et:

1. Callback yalnızca mount'ta mı tetikleniyor? (`[]` dependency veya tek seferlik setup)
2. Font yüklenmesi sonrası `updateSpacerHeight` çağrılıyor mu? (`document.fonts.ready.then(...)`)
3. Lazy load edilen image'ların yüklenmesi sonrası yeniden ölçüm var mı?

**Risk değerlendirmesi:**

- Mount-only + font/image sonrası güncelleme yok → **HIGH RISK**: footer 10-40px büyüyebilir, spacer güncellenmez, alt kısım scroll edilemez
- Mount + resize → **MEDIUM RISK**: ilk yükleme anındaki gecikmeli font/image büyümesi yakalanmaz
- Mount + resize + fonts.ready → **LOW RISK**: çoğu senaryoyu kapsar

---

### F7 — SCROLLHEIGHT vs OFFSETHEIGHT DELTA

Footer için browser console'da ölç ve raporla:

```javascript
const footer = document.querySelector('footer');
const data = {
  offsetHeight: footer.offsetHeight,
  scrollHeight: footer.scrollHeight,
  delta: footer.scrollHeight - footer.offsetHeight,
  windowInnerHeight: window.innerHeight,
  footerExceedsViewport: footer.scrollHeight > window.innerHeight,
  currentSpacerHeight: document.querySelector('[data-footer-spacer]')?.offsetHeight ?? 'spacer not found'
};
console.table(data);

```

Delta > 0 → RC-1 onaylanmış demektir. `footerExceedsViewport: true` → RC-7 değerlendirilmeli.

---

### F8 — CTA CARD OVERLAP TESTİ

Footer'ın CTA card bölümünü incele:

1. CTA card'ın `position` değeri nedir? (`absolute`, `relative`, `sticky`?)
2. CTA card'ın `bottom` veya `top` değeri nedir?
3. Link grid ile CTA card arasında `padding-top` veya `margin-top` rezervi var mı?
4. 375px viewport'ta CTA card link kolonlarının üstüne biniyor mu? (F5 screenshot'larıyla karşılaştır)

---

### F9 — STACKING CONTEXT AUDIT (DERİN)

Her sticky/fixed section için kontrol et:

```bash
grep -rn "transform\|will-change\|filter\|isolation\|contain" \
  src/components/ src/pages/Index.tsx \
  --include="*.tsx" --include="*.css" \
  | grep -v "node_modules" | grep -v ".test."

```

**Neden kritik:** `transform: translateY(...)` uygulanan her element yeni bir stacking context oluşturur. Bu bağlamda z-index sadece kardeş elementler arasında çalışır. Footer'ın parent'ı `transform` kullanıyorsa z-index: 30 bile footer'ı finalCta'nın altında bırakabilir.

---

### F10 — ISSUE-1 REGRESYON GUARD (FORENSICS SNAP)

Fix başlamadan önce mevcut durumu kayıt altına al:

```bash
grep -n "aluminyum\|ISSUE-1\|MalzemeKategori\|kategori-slug" \
  src/pages/MalzemeKategori.tsx \
  src/components/Footer.tsx 2>/dev/null

```

Bu çıktıyı `docs/footer-debug/issue1-snapshot-before.txt` olarak kaydet.

---

### FORENSICS RAPORU (F8 — ZORUNLU)

```
================================================
FORENSICS REPORT — Footer Reveal
================================================
Tarih: <ISO>

F1 — Footer.tsx:
  position: <değer>
  bottom (fixed ise): <değer>
  height/min-height: <değer veya "yok">
  max-height: <değer veya "yok">
  overflow / overflow-y: <değer>
  spacer DOM yöntemi: <useRef+style | class | cssVar>
  spacer ölçüm değeri: <offsetHeight | scrollHeight | diğer>
  spacer zamanlaması: <mount | scroll | observer-callback>
  variant sistemi: <prop adı> → <değer listesi>
  her variant'ta position: <reveal=fixed, static=relative, vb.>
  reveal trigger: <scroll-listener | IntersectionObserver | diğer>
  trigger threshold: <değer>
  trigger ↔ spacer sıralaması: <spacer-önce | trigger-önce | eşzamanlı>
  ResizeObserver: <yok | mount-only | mount+resize>
  fonts.ready bekleniyor: <evet | hayır>
  footer z-index: <değer>
  stacking context oluşturuyor mu: <evet (neden) | hayır>

F2 — Z-index audit:
  SECTION_Z tam listesi: <...>
  finalCta z-index: <değer>
  footer z-index: <değer>
  footer finalCta üzerinde: <evet | hayır>
  parent stacking context riski: <var (element, neden) | yok>

F3 — Trigger sıralaması:
  Spacer önce mi trigger önce mi: <spacer-önce | trigger-önce>
  iOS Safari dvh uyumu: <var | yok>
  Trigger fix gerekli mi: <evet | hayır>

F4 — Sayfa variant tablosu: [doldurulmuş tablo]

F5 — Browser repro:
  home-375: <kesik parça>, ~<Npx>
  home-768: <kesik parça>, ~<Npx>
  home-1280: <kesik parça>, ~<Npx>
  iletisim-375: <kesik parça veya "yok">
  Static variant sorunu: <evet | hayır>
  Screenshots: docs/footer-debug/*.png

F6 — ResizeObserver timing:
  Davranış: <mount-only | mount+resize | mount+resize+fonts>
  Risk seviyesi: <HIGH | MEDIUM | LOW>

F7 — scrollHeight delta:
  offsetHeight: <px>
  scrollHeight: <px>
  delta: <px>
  footerExceedsViewport: <true | false>
  currentSpacerHeight: <px veya "not found">
  RC-1 onaylandı: <evet | hayır>
  RC-7 değerlendirilmeli: <evet | hayır>

F8 — CTA card:
  position: <değer>
  link grid reserve: <var (değer) | yok>
  overlap tespit edildi: <evet | hayır>

F9 — Stacking context:
  transform/will-change kullanan elementler: <liste veya "yok">
  z-index fix yeterli mi: <evet | hayır (stacking context fix de gerekli)>

F10 — ISSUE-1 snapshot:
  docs/footer-debug/issue1-snapshot-before.txt: SAVED

ROOT CAUSES (forensics kanıtına göre seç):
  [ ] RC-1: offsetHeight → scrollHeight geçişi gerekli (delta: <Npx>)
  [ ] RC-2: Trigger spacer'dan önce başlatılıyor (trigger-önce tespit edildi)
  [ ] RC-3: ResizeObserver mount-only, dinamik içerik sonrası güncellemiyor
  [ ] RC-4: Footer z-index finalCta altında (footer=<N>, finalCta=<M>)
  [ ] RC-5: CTA card link kolonlarına biniyor (overlap tespit edildi)
  [ ] RC-6: Kolon grid 622–768px aralığında yanlış kırılıyor (F5 screenshot kanıtı)
  [ ] RC-7: Footer fixed + scrollHeight > vh → alt içerik scroll edilemiyor

SCREENSHOTS:
  docs/footer-debug/home-375-bottom.png
  docs/footer-debug/home-768-bottom.png
  docs/footer-debug/home-1280-bottom.png
  docs/footer-debug/iletisim-375-bottom.png
  docs/footer-debug/iletisim-768-bottom.png
  docs/footer-debug/iletisim-1280-bottom.png
  docs/footer-debug/issue1-snapshot-before.txt

NEXT: AWAIT_USER — root cause'ları onayla, sonra PROMPT 2
================================================

```

---

## ══════════════════════════════════════════════

## PROMPT 2 — FIX + RENDERING INTEGRITY

## ══════════════════════════════════════════════

> Forensics raporu + root cause onayı alındıktan sonra gönderilir. Yalnızca onaylanan RC'ler için ilgili fix uygulanır. Her fix atomik — ayrı commit.

---

### PRE-FIX — ISSUE-1 GUARD

```bash
grep -n "aluminyum\|ISSUE-1\|MalzemeKategori\|kategori-slug" \
  src/pages/MalzemeKategori.tsx src/components/Footer.tsx 2>/dev/null \
  > docs/footer-debug/issue1-snapshot-preflight.txt

diff docs/footer-debug/issue1-snapshot-before.txt \
     docs/footer-debug/issue1-snapshot-preflight.txt

```

Diff boş değilse → HARD STOP. ISSUE-1 fix'i zaten değişmiş demektir.

---

### FIX A — SPACER ÖLÇÜMÜ (RC-1 onaylandıysa)

**Dosya:** `Footer.tsx`

```tsx
// ÖNCE:
spacerRef.current.style.height = `${footerRef.current.offsetHeight}px`;
// Sorun: fixed element overflow'u offsetHeight'a yansımaz.
// offsetHeight = visible height (viewport ile sınırlı)
// scrollHeight = tüm içerik yüksekliği (taşanlar dahil)

// SONRA:
spacerRef.current.style.height = `${footerRef.current.scrollHeight}px`;

```

**Ek guard — RC-7 ile birlikte değerlendir:**

Eğer `footerExceedsViewport: true` ise iki seçenek var — forensics çıktısına göre **birini** seç:

**Seçenek A1 — Overflow guard (küçük taşmalarda, < 20% vh):**

```tsx
const isOverflowing = footerRef.current.scrollHeight > window.innerHeight;
if (isOverflowing) {
  footerRef.current.style.overflowY = 'auto';
  footerRef.current.style.maxHeight = '100dvh'; // dvh — iOS Safari uyumu
}

```

**Seçenek A2 — Graceful degrade (büyük taşmalarda, > 20% vh):**

```tsx
// Footer içeriği viewport'un %90'ından uzunsa reveal pattern'i kapat, static'e düş
const shouldDegrade = footerRef.current.scrollHeight > window.innerHeight * 0.9;
if (shouldDegrade) {
  setVariant('static'); // reveal → static override
}

```

> **A1 ve A2'yi aynı anda uygulama** — çakışır. Forensics F7 delta'sına göre seç.

**Commit:** `fix(v3): footer spacer offsetHeight → scrollHeight + overflow guard`

---

### FIX B — REVEAL TRIGGER SIRALAMASI (RC-2 onaylandıysa)

**Dosya:** `Footer.tsx` veya trigger'ın bulunduğu dosya.

**Sorun:** Trigger `document.scrollHeight` hesaplarken spacer henüz DOM'a eklenmemiş veya doğru yüksekliğe ayarlanmamış. Sonuç: sayfa kısa görünür, reveal çok erken tetiklenir veya hiç tetiklenmez.

```tsx
useEffect(() => {
  if (!spacerRef.current || !footerRef.current) return;

  // ADIM 1: Önce spacer'ı doğru yüksekliğe ayarla
  spacerRef.current.style.height = `${footerRef.current.scrollHeight}px`;

  // ADIM 2: DOM reflow'u bekle, sonra trigger'ı başlat
  // rAF garantisi: tarayıcı layout hesaplamayı bitirmiş olacak
  requestAnimationFrame(() => {
    const triggerPoint =
      document.documentElement.scrollHeight - window.innerHeight;
    initRevealTrigger(triggerPoint);
  });
}, []);

```

**iOS Safari notu:** `window.innerHeight` yerine `visualViewport?.height ?? window.innerHeight` kullan — iOS soft keyboard açıkken innerHeight değişir.

**Commit:** `fix(v3): footer reveal trigger ordering — spacer before trigger init`

---

### FIX C — RESIZEOBSERVER + FONT TIMING (RC-3 onaylandıysa)

**Dosya:** `Footer.tsx`

**Sorun:** Mount anında footer'ın gerçek yüksekliği belli değildir. Web fontları ortalama 100–400ms gecikmeli yüklenir, bu sürede footer 10–40px büyüyebilir. Mount-only observer bu değişimi yakalamaz.

```tsx
useEffect(() => {
  if (!footerRef.current || !spacerRef.current) return;

  const updateSpacerHeight = () => {
    if (!footerRef.current || !spacerRef.current) return;
    // scrollHeight: taşan içerik dahil tam yükseklik
    spacerRef.current.style.height = `${footerRef.current.scrollHeight}px`;
  };

  // İlk ölçüm (sistem fontuyla — geçici)
  updateSpacerHeight();

  // Her resize'da güncelle (orientation change, zoom, font değişimi dahil)
  const observer = new ResizeObserver(updateSpacerHeight);
  observer.observe(footerRef.current);

  // Web fontları yüklenince yeniden ölç (kritik — font swap sonrası layout kayması)
  document.fonts.ready.then(updateSpacerHeight);

  return () => {
    observer.disconnect();
  };
}, []); // footer DOM'u değişmediği sürece tek mount yeterli

```

**Commit:** `fix(v3): footer ResizeObserver — mount+resize+fonts.ready`

---

### FIX D — Z-INDEX + STACKING CONTEXT (RC-4 onaylandıysa)

**Dosya:** `src/lib/tokens.ts` (SECTION_Z) veya `Footer.tsx`

**Sorun A — Sıradan z-index:**

```tsx
// SECTION_Z'de:
export const SECTION_Z = {
  // mevcut değerler korunacak
  footer: 30, // finalCta (24) üzerinde
} as const;

```

**Sorun B — Stacking context çakışması (F9'da transform tespit edildiyse):**

Eğer footer'ın parent elementi `transform: translateY(...)` kullanıyorsa z-index kardeşler arası çalışmaz. Bu durumda:

```tsx
// Footer wrapper'ına isolation ekle:
<div style={{ isolation: 'isolate', zIndex: SECTION_Z.footer }}>
  <footer ...>

```

veya parent transform'u kaldır, yerine margin/padding kullan.

> **Hangisini uygulayacağını F9 çıktısı belirler.** Transform yoksa Sorun A yeterli.

**Commit:** `fix(v3): footer z-index + stacking context audit`

---

### FIX E — CTA CARD OVERLAP (RC-5 onaylandıysa)

**Dosya:** `Footer.tsx`

**Sorun:** CTA card `absolute` veya negatif `top/bottom` ile konumlandırılmış, link grid'in başlangıcı CTA yüksekliğini hesaba katmıyor.

```tsx
// CTA card'a ref ekle
const ctaRef = useRef<HTMLDivElement>(null);

// Link grid container'ına CTA yüksekliğini reserve et
useEffect(() => {
  if (!ctaRef.current) return;
  // Gerçek yüksekliği + gap ölç, CSS variable olarak set et
  const ctaHeight = ctaRef.current.offsetHeight;
  document.documentElement.style.setProperty(
    '--footer-cta-height',
    `${ctaHeight + 24}px` // 24px = tasarım gap'i
  );
}, []);

// JSX'te:
<div ref={ctaRef}>{/* CTA card */}</div>
<div
  className="grid ..."
  style={{ paddingTop: 'var(--footer-cta-height, 120px)' }}
>
  {/* link kolonları */}
</div>

```

**Commit:** `fix(v3): footer CTA card reserve area — --footer-cta-height`

---

### FIX F — RESPONSIVE GRID (RC-6 onaylandıysa)

**Dosya:** `Footer.tsx`

**Koşul:** Yalnızca F5 screenshot'larında 622–768px aralığında kolon kırılması görüldüyse uygula.

```tsx
// ÖNCE:
<div className="grid grid-cols-1 md:grid-cols-4 gap-8">

// SONRA — 640px eşiğinde 2 kolon (Tailwind sm = 640px):
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

```

**Static variant smoke test:** Fix sonrası `/iletisim` ve `/malzemeler`'de grid bozulması yok, static variant'ta görsel regression yok.

**Commit:** `fix(v3): footer grid sm:grid-cols-2 breakpoint`

---

## RENDERING & LAYOUT INTEGRITY ANALYSIS

> Bu bölüm fix'lerin render tarafı etkilerini kapsar. Her fix uygulandıktan sonra gözlemlenmesi gereken davranışları tanımlar.

### scrollHeight Doğruluğu

`scrollHeight` değeri tarayıcı layout hesabından gelir ve şu durumlarda **güvenilmez** olabilir:

- Ölçüm anında element henüz paint edilmemiş (ilk render, SSR hydration anı)
- Parent'ın `overflow: hidden` tanımlı olması — alt elementlerin taşmasını `scrollHeight`'a yansıtmaz
- `display: none` olan child'lar yüksekliğe katkıda bulunmaz

**Guard:** `scrollHeight` ölçümünü her zaman `requestAnimationFrame` içinde veya `MutationObserver` + `ResizeObserver` ile doğrula.

### ResizeObserver + Reflow Riski

`ResizeObserver` callback'te yüksek frekanslı DOM yazma işlemi yapılırsa layout thrashing oluşur:

```tsx
// KÖTÜ — her callback'te okuma+yazma:
observer = new ResizeObserver(() => {
  const h = footer.scrollHeight; // okuma → layout flush
  spacer.style.height = h + 'px'; // yazma → reflow tetikler → callback tekrar çalışır
});

// İYİ — yazma'yı rAF'a taşı:
observer = new ResizeObserver(() => {
  requestAnimationFrame(() => {
    spacer.style.height = `${footer.scrollHeight}px`;
  });
});

```

### Sticky + Overflow Etkileşimi

CSS kuralı: `overflow: hidden/auto/scroll` olan bir element `position: sticky` child'larını keser. Footer'ın parent'ı veya scroll container'ı `overflow` kısıtı taşıyorsa sticky/fixed reveal çalışmaz.

**Tespit:**

```javascript
let el = footer.parentElement;
while (el) {
  const style = getComputedStyle(el);
  if (['hidden','auto','scroll','clip'].includes(style.overflow) ||
      ['hidden','auto','scroll','clip'].includes(style.overflowY)) {
    console.warn('Overflow kısıtı:', el, style.overflow, style.overflowY);
  }
  el = el.parentElement;
}

```

### Mobile Viewport Edge Cases


| Senaryo                  | Risk                                                   | Önlem                                  |
| ------------------------ | ------------------------------------------------------ | -------------------------------------- |
| iOS Safari soft keyboard | `window.innerHeight` küçülür, reveal yanlış tetiklenir | `visualViewport.height` kullan         |
| iOS Safari tab bar       | `100vh` görünür alanı aşar                             | `100dvh` kullan                        |
| Android Chrome URL bar   | Scroll sırasında viewport yüksekliği değişir           | `dvh` ve `visualViewport` resize event |
| Yatay ekran (landscape)  | Footer yüksekliği viewport'u aşabilir                  | RC-7 threshold'unu 0.9→0.7'ye çek      |


---

## QA MATRİSİ — GENİŞLETİLMİŞ

**4 sayfa × 3 viewport = 12 zorunlu kontrol**

Her hücre için **beklenen davranış** ve **hata sinyalleri** tanımlıdır.

---

### `/` — REVEAL VARIANT

**375×812**

```
Beklenen:
  - Scroll bottom'a ulaşınca footer tamamen reveal olmuş
  - Alt bar (telif + sosyal ikonlar) görünür, kesik yok
  - CTA card link kolonlarının üstüne binmiyor
  - Horizontal scrollbar yok
  - Console: 0 error, 0 warning

Hata sinyalleri:
  - Footer son ~40-80px görünmüyor → RC-1 fix eksik veya yetersiz
  - CTA card link text'ini kapatıyor → RC-5 fix eksik
  - Footer reveal hiç tetiklenmiyor → RC-2 (trigger sıralaması) düzelmemiş
  - Yatay scroll → kolon grid taşıyor, RC-6 yetersiz

```

**768×1024**

```
Beklenen:
  - Kolon grid sm:grid-cols-2 veya lg:grid-cols-4 doğru kırılıyor
  - CTA card konumlanması masaüstü görünümüne geçiş sırasında bozulmuyor
  - Footer z-index: sticky section'lar altında değil

Hata sinyalleri:
  - Kolonlar tek kolon'a düşüyor (md breakpoint tanımsız) → tailwind config kontrolü
  - Footer sticky section'ın üstünde görünmüyor → RC-4 fix eksik

```

**1280×832**

```
Beklenen:
  - 4 kolon grid tam görünür
  - CTA card geniş layout'ta taşmıyor
  - Reveal animasyonu smooth

Hata sinyalleri:
  - Geniş viewportta footer yüksekliği artıyor, spacer buna ayak uydurmuyorsa alt boşluk kalır

```

---

### `/malzemeler` — STATIC VARIANT

**375 / 768 / 1280**

```
Beklenen:
  - Footer position: relative/static (fixed değil)
  - Spacer yok (static variant'ta gerekmez)
  - Tüm link kolonları ve alt bar görünür
  - Reveal animasyonu YOK (static variant)

Hata sinyalleri:
  - Footer'ın altında boş alan var → static variant yanlışlıkla spacer oluşturuyor
  - Footer'da reveal animasyonu var → variant override bozulmuş

```

---

### `/iletisim` — STATIC VARIANT

**375 / 768 / 1280**

```
Beklenen: /malzemeler ile aynı
Ek kontrol:
  - Form footer'dan önce tam görünür (footer form'un üstüne binmiyor)

Hata sinyalleri:
  - /malzemeler'de sorun yok ama /iletisim'de var → sayfa-specific layout wrapper sorunu

```

---

### `/malzemeler/aluminyum` — ISSUE-1 REGRESYON

**375 / 768 / 1280**

```
Beklenen:
  - ISSUE-1 snapshot diff temiz (issue1-snapshot-before.txt ile eşleşiyor)
  - Footer davranışı bu fix öncesiyle identik
  - Kategori sayfası layout bozulmamış

Hata sinyalleri:
  - Diff boş değil → HARD STOP, rollback
  - Layout shift var → Footer.tsx değişikliği bu sayfayı etkiliyor

```

---

## REGRESYON RİSK ANALİZİ

### Kırılabilecekler


| Risk                                              | Neden                                                        | Önlem                                                 |
| ------------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------- |
| Static variant'ta spacer oluşması                 | `scrollHeight` fix'i variant kontrolü yapmıyorsa             | Fix'e `if (variant !== 'reveal') return` guard'ı ekle |
| Trigger yanlış tetiklenmesi                       | rAF'tan önce kullanıcı hızlı scroll ederse                   | Trigger'a debounce (16ms) ekle                        |
| iOS keyboard açılınca layout bozulması            | `window.innerHeight` değişir                                 | `visualViewport` kullan                               |
| ResizeObserver callback döngüsü                   | spacer büyümesi footer'ı büyütür, observer tekrar tetiklenir | Önceki değeri karşılaştır, değişmemişse yazma         |
| Font değişiminde CTA reserve alanı güncellenmiyor | `--footer-cta-height` yalnızca mount'ta hesaplanıyor         | `ctaRef` üzerine de `ResizeObserver` ekle             |


### Kapsanmayanlar (Bilinen Eksikler)

- Server-side rendering (SSR) senaryosu: `window` tanımsız → `getCSSVar` SSR guard var ama footer DOM ölçümlerinde guard yok. SSR varsa `typeof window !== 'undefined'` kontrolü gerekir.
- Print view: Footer fixed ise print'te çakışabilir. `@media print { footer { position: static; } }` gerekebilir.
- Zoom > 200%: `scrollHeight` zoom'a göre ölçülür ama `window.innerHeight` değişmez. Bu kenar case QA'ya dahil edilmedi.

---

## CHANGELOG — KOD DÜZEYİ ÖZET

### Footer.tsx


| Bölüm                   | Değişiklik                                                                 | RC   |
| ----------------------- | -------------------------------------------------------------------------- | ---- |
| Spacer hook             | `offsetHeight` → `scrollHeight`                                            | RC-1 |
| Spacer hook             | `overflowY: auto` + `maxHeight: 100dvh` guard veya variant degrade         | RC-7 |
| useEffect setup         | `initRevealTrigger()` → `requestAnimationFrame(() => initRevealTrigger())` | RC-2 |
| ResizeObserver          | `disconnect` + `document.fonts.ready.then(update)` eklendi                 | RC-3 |
| ResizeObserver callback | `requestAnimationFrame` wrapper — layout thrashing önlemi                  | RC-3 |
| z-index                 | `SECTION_Z.footer` değeri 30'a yükseltildi                                 | RC-4 |
| Stacking context        | `isolation: isolate` wrapper (eğer F9'da transform tespit edildiyse)       | RC-4 |
| CTA card                | `ctaRef` + `--footer-cta-height` CSS variable                              | RC-5 |
| Link grid               | `sm:grid-cols-2` ara breakpoint                                            | RC-6 |


### tokens.ts (`src/lib/tokens.ts`)

```ts
// SECTION_Z değişikliği:
footer: 30, // önceki değer → 30 (finalCta=24 üzerinde)

```

---

## MEMORY UPDATE KARARI

**Durum: CONDITIONAL**

Memory update yalnızca şu koşulların tamamı sağlandıktan sonra yapılır:

1. QA matrisinin 12 hücresi PASS aldı
2. ISSUE-1 regresyon diff temiz
3. `tsc --noEmit` 0 error
4. Static variant smoke test PASS
5. Console 0 error (tüm sayfalar)

**Koşul sağlanmadan memory update = HARD STOP.**

```
mem://design/footer-reveal-pattern güncelle (QA PASS sonrası):
- Spacer: scrollHeight kullan, offsetHeight değil
- Guard: footerExceedsViewport → overflowY:auto+maxHeight:100dvh VEYA variant degrade
- ResizeObserver: mount + her resize + document.fonts.ready.then()
- Observer callback: rAF wrapper — layout thrashing önlemi
- Trigger sıralaması: spacer → rAF → initRevealTrigger()
- iOS: visualViewport.height, 100dvh
- Z-index: footer=30, finalCta=24
- Stacking context: isolation:isolate (transform varsa)
- CTA reserve: --footer-cta-height CSS variable
- Grid: sm:grid-cols-2 (640px eşiği)
- ISSUE-1: /malzemeler/aluminyum korundu, diff temiz

```

---

## FİX RAPORU (ZORUNLU FORMAT)

```
================================================
FIX REPORT — Footer Reveal
================================================
Tarih: <ISO>

STATUS: PASS | FAIL | PARTIAL

ROOT CAUSES addressed:
  RC-1 (spacer offsetHeight→scrollHeight): FIXED | SKIPPED
  RC-2 (trigger sıralaması): FIXED | SKIPPED
  RC-3 (ResizeObserver+fonts.ready): FIXED | SKIPPED
  RC-4 (z-index+stacking context): FIXED | SKIPPED
  RC-5 (CTA overlap+reserve): FIXED | SKIPPED
  RC-6 (grid breakpoint): FIXED | SKIPPED
  RC-7 (fixed overflow guard): FIXED | SKIPPED

ISSUE-1 regresyon:
  snapshot diff: TEMIZ | FARKLI (HARD STOP)

RENDERING INTEGRITY:
  scrollHeight güvenilirliği: PASS | RISK (neden: ...)
  ResizeObserver thrashing önlemi: PASS | EKSIK
  sticky+overflow çakışması: YOK | VAR (element: ...)
  iOS viewport uyumu: PASS | EKSIK

QA MATRIX:
  / 375: PASS | FAIL (neden: ...)
  / 768: PASS | FAIL
  / 1280: PASS | FAIL
  /malzemeler 375: PASS | FAIL
  /malzemeler 768: PASS | FAIL
  /malzemeler 1280: PASS | FAIL
  /iletisim 375: PASS | FAIL
  /iletisim 768: PASS | FAIL
  /iletisim 1280: PASS | FAIL
  /malzemeler/aluminyum 375: PASS | FAIL
  /malzemeler/aluminyum 768: PASS | FAIL
  /malzemeler/aluminyum 1280: PASS | FAIL

CHANGES:
  Footer.tsx:
    - spacer: offsetHeight → scrollHeight
    - ResizeObserver: mount+resize+fonts.ready, rAF wrapper
    - trigger: rAF sıralaması düzeltildi
    - CTA: --footer-cta-height CSS variable
    - grid: sm:grid-cols-2
    [RC-7 seçilen fix: overflow-guard | variant-degrade]
  tokens.ts:
    - SECTION_Z.footer: <önceki> → 30
  <diğer dosya>: <ne değişti>

MEMORY UPDATE: CONDITIONAL — QA PASS sonrası uygulanacak

COMMITS:
  fix(v3): footer spacer offsetHeight→scrollHeight + ResizeObserver rAF
  fix(v3): footer reveal trigger ordering — rAF after spacer
  fix(v3): footer z-index + stacking context isolation
  fix(v3): footer CTA reserve area + --footer-cta-height
  fix(v3): footer responsive grid sm:grid-cols-2
  docs(v3): footer-reveal-pattern memory update [QA PASS sonrası]
================================================

```

---

## 🔴 HARD STOP TETİKLEYİCİLER

- ISSUE-1 snapshot diff boş değil
- `tsc --noEmit` error
- Fix A1 ve A2 aynı anda uygulandı
- Static variant'ta regression (reveal animasyonu çıktı veya spacer oluştu)
- ResizeObserver callback'te layout thrashing oluştu (sonsuz döngü)
- `package.json`'a müdahale
- Locked zone ihlali
- Memory update QA PASS öncesi yapıldı

---

## 🟢 FINAL VERDICT

**Deploy readiness:** QA matrisinin 12/12 PASS + ISSUE-1 temiz + tsc 0 error koşuluna bağlı.

**Blocking issues (şu an):** Forensics tamamlanmadan belirlenemez. Root cause sayısı ve türü fix süresini ve deployment riskini doğrudan etkiler.

**Required next action:** PROMPT 1'i çalıştır, F8 forensics raporunu al, root cause'ları onayla, sonra PROMPT 2.

**BAŞLA — PROMPT 1.**