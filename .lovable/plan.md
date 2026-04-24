# MAS TECHNIC — SERVICES SPEC LEDGER: CLAUDE DESIGN HANDOFF

> **Runner:** Lovable **Kaynak:** Claude Design handoff — `review/Services Alternatif Layout.html` **Hedef dosya:** `src/components/ServicesSection.tsx` **Strateji:** `ServicesDualColumn` arşivlenir (silinmez), yanına `ServicesLedger` eklenir. Desktop'ta Ledger, mobile'da mevcut `ServicesMobileList` korunur. **Dil:** Kod yorumları Türkçe, identifier'lar İngilizce

---

## 🚫 LOCKED

- `src/pages/admin/**`, `src/pages/musteri-paneli/**`
- `src/integrations/supabase/**`, `src/hooks/useAuth*`
- `src/components/ui/*` (shadcn vendor)
- `package.json` — yeni dependency YOK
- `ServicesMobileList` — dokunma
- `ServicesDualColumn` — SİLME, `// archived` yorumuyla bırak

---

## 📐 TASARIM REFERANSI (HTML prototype'tan)

### Grid yapısı (desktop)

```
grid-template-columns: 72px 1fr 2.1fr 1fr 200px

```

Sütunlar (soldan):

1. **idx** — `01` `02` … IBM Plex Mono, 12px, `--text-inverse-muted`
2. **name** — Hizmet adı (22px, 600, `--text-inverse`) + slug (Mono 10px, `--text-inverse-muted`)
3. **desc** — Açıklama, 14px, `--text-inverse-secondary`, max 48ch
4. **specs** — 3 teknik satır: `k` (Mono 10px uppercase muted) + `v` (Mono 11px, `--text-inverse`, 500)
5. **action** — Link, Mono 11px, `letter-spacing: 0.25em`, uppercase, `--text-inverse`

### Header row

```css
background: var(--bg-light-workshop, #f0ede8)
border-bottom: 1px solid var(--text-inverse, #1a1814)
font: IBM Plex Mono 10px, tracking 0.3em, uppercase, --text-inverse-muted

```

### Ledger çerçevesi

```css
border-top: 1px solid var(--text-inverse, #1a1814)
border-bottom: 1px solid var(--text-inverse, #1a1814)

```

### Row hover

```
tüm hücreler background → var(--surface-hover-light, rgba(26,24,20,0.06))
name h3 color → var(--heat-molten)
action a: color + border-color → var(--heat-molten), gap 8px → 18px
  gap transition: 180ms cubic-bezier(.16,1,.3,1)
  color/border transition: 120ms ease

```

### Section header (iki kolon)

```
Sol: eyebrow "Kabiliyetler" + H2 "Üretim hizmetleri."
  H2: 64px clamp, weight 700, letter-spacing -0.025em, line-height 0.95
Sağ: p (açıklama, max 44ch) + "Tüm kabiliyetler →" link
  Link: Mono, precision-blue, underline border-bottom

```

### Bottom CTA

```
layout: 1fr auto, gap 40px
padding: 40px 32px
border: 1px solid var(--surface-border-hover-light, rgba(26,24,20,0.18))
background: var(--bg-light-workshop, #f0ede8)
Sol kenar bar: position absolute, left 0, w 3px, bg var(--heat-molten) — ::before değil, div

H3: 22px, 600, --text-inverse
P: 14px, --text-inverse-secondary

btn-primary: bg heat-molten, color text-primary, border 2px heat-molten
  hover: bg heat-char, border-color heat-char
btn-secondary: transparent, border 2px text-inverse, color text-inverse
  hover: bg text-inverse, color bg-light-workshop

Her btn: Mono 11px, 600, tracking 0.25em, uppercase, padding 16px 28px
btn-primary sonuna "→" ekle (Space Grotesk, letter-spacing: 0)

```

---

## 🗂️ VERİ GÜNCELLEMESİ

`services` array'ine `slug` ve `specs` alanları ekle. Mevcut alanlar değişmez.

```tsx
const services: Service[] = [
  {
    image: serviceFrze,
    title: "5 Eksen CNC Frezeleme",
    description: "Karmaşık geometrilerde üstün yüzey kalitesi; havacılık ve enerji standartlarında hassas imalat.",
    link: "/hizmetler/cnc-frezeleme",
    cta: "Frezeleme Detayları",
    slug: "/hizmetler/cnc-frezeleme",
    specs: [
      { k: "Tolerans", v: "±0.005 mm" },
      { k: "Eksen",    v: "5-axis" },
      { k: "Kapasite", v: "Ø800 mm" },
    ],
  },
  {
    image: serviceTorna,
    title: "CNC Torna İşleme",
    description: "Mikron düzeyinde tolerans sınırlarını yakalayan yüksek nitelikli silindirik parça işleme.",
    link: "/hizmetler/cnc-tornalama",
    cta: "Torna Detayları",
    slug: "/hizmetler/cnc-tornalama",
    specs: [
      { k: "Tolerans", v: "±0.01 mm" },
      { k: "Tip",      v: "Çift kafa" },
      { k: "Uzunluk",  v: "1600 mm" },
    ],
  },
  {
    image: serviceImalat,
    title: "Talaşlı İmalat",
    description: "Hidrolik ve pnömatik sistem entegrasyonlarıyla tam işlevsel modüller ve üretim hatları.",
    link: "/hizmetler/talasli-imalat",
    cta: "İmalat Detayları",
    slug: "/hizmetler/talasli-imalat",
    specs: [
      { k: "Proses",  v: "Hybrid" },
      { k: "Montaj",  v: "Dahil" },
      { k: "Batch",   v: "1–5000+" },
    ],
  },
  {
    image: serviceLazer,
    title: "Lazer Kesim",
    description: "Yüksek hassasiyetli lazer teknolojisi ile metal ve alaşım malzemelerde temiz ve hızlı kesim.",
    link: "/hizmetler/lazer-kazima",
    cta: "Lazer Kesim Detayları",
    slug: "/hizmetler/lazer-kazima",
    specs: [
      { k: "Güç",      v: "12 kW fiber" },
      { k: "Kalınlık", v: "0.5–25 mm" },
      { k: "Alan",     v: "3000×1500" },
    ],
  },
  {
    image: serviceKalip,
    title: "Kalıp & Döküm",
    description: "Enjeksiyon ve basınçlı döküm kalıplarında tasarımdan üretime mühendislik çözümleri.",
    link: "/hizmetler/enjeksiyon-kalibi",
    cta: "Kalıp Detayları",
    slug: "/hizmetler/enjeksiyon-kalibi",
    specs: [
      { k: "Tip",    v: "Enj. + basınç" },
      { k: "Sınıf", v: "H13 / 1.2738" },
      { k: "Teslim", v: "6–12 hf" },
    ],
  },
];

```

---

## 💻 TAM UYGULAMA

Aşağıdaki sırayla `src/components/ServicesSection.tsx` dosyasını güncelle.

### ADIM 1 — Tip tanımları (dosyanın en üstüne, import'lardan sonra)

```tsx
interface ServiceSpec { k: string; v: string; }

interface Service {
  image: string;
  title: string;
  description: string;
  link: string;
  cta: string;
  slug: string;
  specs: ServiceSpec[];
}

```

---

### ADIM 2 — `ServicesDualColumn`'u arşivle

`ServicesDualColumn` component'inin hemen üstüne şu yorumu ekle:

```tsx
// archived — dual-column variant (Spec Ledger layout devraldı, referans için tutuluyor)

```

Component koduna dokunma.

---

### ADIM 3 — `ServicesLedger` component'i

`ServicesDualColumn`'un kapanış parantezinin hemen altına ekle.

**ÖNEMLİ — hover mekanizması:** `display: contents` wrapper'ı grid layout için kullanılır. Event handler'lar (`onMouseEnter`/`onMouseLeave`) bu wrapper'a verilir — `contents` layout'u kaldırır ama event bubbling devam ettiğinden hover tüm hücrelere yayılır ve `hoveredIndex` state'i doğru tetiklenir. Her hücreye ayrı ayrı event bağlama, ayrı `onMouseEnter` prop'u YASAK.

```tsx
/* ── Desktop: Spec Ledger Layout (Claude Design v2.0) ── */
const ServicesLedger = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div>

      {/* ── Section başlık: sol eyebrow+H2 / sağ açıklama+link ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
          alignItems: "end",
          marginBottom: "56px",
          paddingBottom: "28px",
          borderBottom: "1px solid var(--surface-border-light, rgba(26,24,20,0.10))",
        }}
      >
        {/* Sol */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.5em",
              color: "var(--heat-molten)",
              textTransform: "uppercase" as const,
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                width: "32px",
                height: "1px",
                background: "var(--heat-molten)",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            Kabiliyetler
          </div>
          <h2
            style={{
              fontWeight: 700,
              fontSize: "clamp(40px, 5vw, 64px)",
              lineHeight: 0.95,
              letterSpacing: "-0.025em",
              margin: 0,
              color: "var(--text-inverse, #1a1814)",
            }}
          >
            Üretim hizmetleri.
          </h2>
        </div>

        {/* Sağ */}
        <div style={{ paddingBottom: "4px" }}>
          <p
            style={{
              margin: "0 0 16px",
              fontSize: "16px",
              lineHeight: 1.6,
              color: "var(--text-inverse-secondary, rgba(26,24,20,0.65))",
              maxWidth: "44ch",
            }}
          >
            Tasarımdan seri üretime: 5 çekirdek kabiliyet, beş ayrı hassasiyet
            sınıfı, tek bir mühendislik disiplini.
          </p>
          <Link
            to="/hizmetler/cnc-frezeleme"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.25em",
              textTransform: "uppercase" as const,
              color: "var(--precision-blue, #1a4d8f)",
              textDecoration: "none",
              borderBottom: "1px solid var(--precision-blue, #1a4d8f)",
              paddingBottom: "4px",
              fontWeight: 600,
            }}
          >
            Tüm kabiliyetler →
          </Link>
        </div>
      </div>

      {/* ── Ledger tablosu ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "72px 1fr 2.1fr 1fr 200px",
          borderTop: "1px solid var(--text-inverse, #1a1814)",
          borderBottom: "1px solid var(--text-inverse, #1a1814)",
        }}
      >

        {/* Header row */}
        {["—", "Hizmet", "Kapsam", "Spec", "Detay"].map((col) => (
          <div
            key={col}
            style={{
              padding: "14px 20px",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase" as const,
              color: "var(--text-inverse-muted, rgba(26,24,20,0.40))",
              borderBottom: "1px solid var(--text-inverse, #1a1814)",
              background: "var(--bg-light-workshop, #f0ede8)",
            }}
          >
            {col}
          </div>
        ))}

        {/* Service rows
            display:contents wrapper → grid cells'e katılır, layout'u bozmaz.
            onMouseEnter/Leave wrapper'a bağlı — event bubbling ile tüm hücreler tepki verir.
            Her hücreye ayrı event handler VERME. */}
        {services.map((s, i) => {
          const isHovered = hoveredIndex === i;
          const isLast = i === services.length - 1;

          const sharedCell: React.CSSProperties = {
            borderBottom: isLast
              ? "none"
              : "1px solid var(--surface-border-light, rgba(26,24,20,0.10))",
            background: isHovered
              ? "var(--surface-hover-light, rgba(26,24,20,0.06))"
              : "transparent",
            transition: "background 120ms ease",
          };

          return (
            // display:contents → grid layout için hücreleri doğrudan grid child'ı yapar.
            // Event handler buraya — hover tüm hücrelere yayılır, ayrıca bağlamaya gerek yok.
            <div
              key={s.title}
              style={{ display: "contents", cursor: "pointer" }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >

              {/* idx */}
              <div
                style={{
                  ...sharedCell,
                  padding: "26px 20px 18px",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  color: "var(--text-inverse-muted, rgba(26,24,20,0.40))",
                  alignSelf: "start",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* name + slug */}
              <div style={{ ...sharedCell, padding: "22px 20px" }}>
                <h3
                  style={{
                    margin: "0 0 6px",
                    fontSize: "22px",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.15,
                    color: isHovered
                      ? "var(--heat-molten)"
                      : "var(--text-inverse, #1a1814)",
                    transition: "color 120ms ease",
                  }}
                >
                  {s.title}
                </h3>
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    color: "var(--text-inverse-muted, rgba(26,24,20,0.40))",
                    textTransform: "uppercase" as const,
                  }}
                >
                  {s.slug}
                </div>
              </div>

              {/* desc */}
              <div
                style={{
                  ...sharedCell,
                  padding: "26px 20px 22px",
                  fontSize: "14px",
                  lineHeight: 1.55,
                  color: "var(--text-inverse-secondary, rgba(26,24,20,0.65))",
                  maxWidth: "48ch",
                }}
              >
                {s.description}
              </div>

              {/* specs — 3 satır k/v */}
              <div
                style={{
                  ...sharedCell,
                  padding: "22px 20px",
                  display: "flex",
                  flexDirection: "column" as const,
                  gap: "6px",
                }}
              >
                {s.specs.map((spec) => (
                  <div
                    key={spec.k}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      gap: "12px",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "11px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase" as const,
                        color: "var(--text-inverse-muted, rgba(26,24,20,0.40))",
                        alignSelf: "center",
                      }}
                    >
                      {spec.k}
                    </span>
                    <span
                      style={{
                        fontWeight: 500,
                        color: "var(--text-inverse, #1a1814)",
                      }}
                    >
                      {spec.v}
                    </span>
                  </div>
                ))}
              </div>

              {/* action */}
              <div style={{ ...sharedCell, padding: "24px 20px 22px" }}>
                <Link
                  to={s.link}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    // gap transition: hover'da genişler — cubic-bezier(.16,1,.3,1)
                    gap: isHovered ? "18px" : "8px",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "11px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase" as const,
                    color: isHovered
                      ? "var(--heat-molten)"
                      : "var(--text-inverse, #1a1814)",
                    textDecoration: "none",
                    fontWeight: 600,
                    paddingBottom: "10px",
                    borderBottom: `1px solid ${
                      isHovered
                        ? "var(--heat-molten)"
                        : "var(--text-inverse, #1a1814)"
                    }`,
                    transition:
                      "color 120ms ease, border-color 120ms ease, gap 180ms cubic-bezier(.16,1,.3,1)",
                  }}
                >
                  {s.cta}
                  {/* "→" Space Grotesk — Mono'da ok glyph hatalı render edebilir */}
                  <span
                    style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: 0 }}
                  >
                    →
                  </span>
                </Link>
              </div>

            </div>
          );
        })}
      </div>

      {/* ── Bottom CTA ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "40px",
          alignItems: "center",
          marginTop: "48px",
          padding: "40px 32px",
          border: "1px solid var(--surface-border-hover-light, rgba(26,24,20,0.18))",
          background: "var(--bg-light-workshop, #f0ede8)",
          position: "relative" as const,
        }}
      >
        {/* Sol Heat bar — ::before yerine absolute div (React'ta pseudo element yok) */}
        <div
          style={{
            position: "absolute" as const,
            left: 0,
            top: 0,
            bottom: 0,
            width: "3px",
            background: "var(--heat-molten)",
          }}
        />

        <div>
          <h3
            style={{
              fontSize: "22px",
              margin: "0 0 6px",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--text-inverse, #1a1814)",
            }}
          >
            Üretim hattınızı optimize etmeye hazır mısınız?
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              lineHeight: 1.55,
              color: "var(--text-inverse-secondary, rgba(26,24,20,0.65))",
              maxWidth: "60ch",
            }}
          >
            Kapsamlı teknik danışmanlık için baş mühendislerimizle görüşün.
            48 saat içinde yanıt garantili.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <Link
            to="/teklif-al"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase" as const,
              padding: "16px 28px",
              textDecoration: "none",
              background: "var(--heat-molten)",
              color: "var(--text-primary, #f0efed)",
              border: "2px solid var(--heat-molten)",
              whiteSpace: "nowrap" as const,
              transition: "background 120ms ease, border-color 120ms ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "var(--heat-char, #b8451a)";
              el.style.borderColor = "var(--heat-char, #b8451a)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "var(--heat-molten)";
              el.style.borderColor = "var(--heat-molten)";
            }}
          >
            Danışmanlık Al
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: 0 }}>
              →
            </span>
          </Link>

          <Link
            to="/iletisim"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase" as const,
              padding: "16px 28px",
              textDecoration: "none",
              background: "transparent",
              color: "var(--text-inverse, #1a1814)",
              border: "2px solid var(--text-inverse, #1a1814)",
              whiteSpace: "nowrap" as const,
              transition: "background 120ms ease, color 120ms ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "var(--text-inverse, #1a1814)";
              el.style.color = "var(--bg-light-workshop, #f0ede8)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "transparent";
              el.style.color = "var(--text-inverse, #1a1814)";
            }}
          >
            Bize Ulaşın
          </Link>
        </div>
      </div>

    </div>
  );
};

```

---

### ADIM 4 — `ServicesSection` export'unu güncelle

Mevcut `ServicesSection` export fonksiyonunu aşağıdakiyle değiştir.

**Değişiklikler:**

- `isMobile` ise: `SectionHeader` + `ServicesMobileList` + mobile bottom CTA (mevcut stil)
- Değilse: `<ServicesLedger />` (kendi başlığı + CTA'sı içinde)
- Section background: `var(--bg-light-concrete, #e8e4de)`
- Inline `<style>` override (`.dark #hizmetler`) kaldırılır — artık gerekli değil
- GSAP entrance pattern, `prefersReduced` guard, `sectionRef` korunur

```tsx
export const ServicesSection = () => {
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Bölüm girişi — GSAP fade+slide, reduced-motion'da atlanır
  useEffect(() => {
    if (prefersReduced) return;
    const el = sectionRef.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: 40 });
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
      },
    });

    return () => { trigger.kill(); };
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      id="hizmetler"
      className="section-industrial py-24 md:py-32 lg:py-40 flex flex-col justify-center"
      style={{ backgroundColor: "var(--bg-light-concrete, #e8e4de)" }}
    >
      <div className="container-industrial">
        {isMobile ? (
          <>
            {/* Mobile: mevcut header + liste korunuyor */}
            <SectionHeader
              tag="Kabiliyetler"
              title="Üretim Hizmetlerimiz"
              description="Tasarımdan seri üretime kadar her adımda mühendislik odaklı çözümler sunuyoruz"
              sectionNumber={1}
            />
            <div className="mt-8">
              <ServicesMobileList />
            </div>
            {/* Mobile bottom CTA — dikey stack, mevcut stil */}
            <div
              className="mt-8 p-8 flex flex-col gap-4"
              style={{
                border: "1px solid var(--surface-border-hover-light, rgba(26,24,20,0.18))",
                background: "var(--bg-light-workshop, #f0ede8)",
                position: "relative",
              }}
            >
              {/* Sol Heat bar */}
              <div
                style={{
                  position: "absolute",
                  left: 0, top: 0, bottom: 0,
                  width: "3px",
                  background: "var(--heat-molten)",
                }}
              />
              <div>
                <h3
                  className="heading-industrial text-xl mb-1"
                  style={{ color: "var(--text-inverse, #1a1814)" }}
                >
                  Üretim hattınızı optimize etmeye hazır mısınız?
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-inverse-secondary, rgba(26,24,20,0.65))" }}
                >
                  Kapsamlı teknik danışmanlık için baş mühendislerimizle görüşün.
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  to="/teklif-al"
                  className="flex-1 py-3 text-center font-semibold uppercase tracking-wider text-xs font-mono"
                  style={{
                    background: "var(--heat-molten)",
                    color: "var(--text-primary, #f0efed)",
                    border: "2px solid var(--heat-molten)",
                  }}
                >
                  Danışmanlık Al
                </Link>
                <Link
                  to="/iletisim"
                  className="flex-1 py-3 text-center font-semibold uppercase tracking-wider text-xs font-mono"
                  style={{
                    background: "transparent",
                    color: "var(--text-inverse, #1a1814)",
                    border: "2px solid var(--text-inverse, #1a1814)",
                  }}
                >
                  Bize Ulaşın
                </Link>
              </div>
            </div>
          </>
        ) : (
          /* Desktop: Spec Ledger (kendi başlığı + CTA'sı dahil) */
          <ServicesLedger />
        )}
      </div>
    </section>
  );
};

```

---

## ✅ DOĞRULAMA

```bash
tsc --noEmit

```

Beklenen: 0 error.

**Görsel smoke test:**

- **Desktop (1280px):**
  - 5 sütunlu ledger görünür: `72px 1fr 2.1fr 1fr 200px`
  - Header row workshop background, koyu border-bottom
  - Row hover: background tonu değişir, isim heat-molten, action ok genişler
  - Bottom CTA'da sol 3px turuncu bar görünür
  - `border-radius: 0` — hiçbir yerde köşe yuvarlama yok
- **Mobile (375px):**
  - `ServicesMobileList` + `SectionHeader` mevcut görünümde
  - Dikey CTA stack görünür
- **TypeScript:**
  - `Service` ve `ServiceSpec` interface'leri `services` array'ini tip-safe yapıyor
  - `display: contents` wrapper'da event handler var, hücrelerde yok — lint warning yok

**Commit:**

```
feat(v3): ServicesSection — Spec Ledger layout (Claude Design handoff)

``````

---

## P1 — Playwright e2e Setup (Deferred to New Session)

**Status:** TODO — yeni session'da uygulanacak (scope büyük: ~300MB browser binaries + config + test suite + CI).

**Scope:**

1. **Install:** `@playwright/test` devDependency + `npx playwright install --with-deps chromium webkit`
2. **Config:** `playwright.config.ts` root'ta — projects: `mobile-375` (Pixel 5), `tablet-768` (iPad mini), `desktop-1280`. baseURL: `http://localhost:8080`. `webServer` ile `npm run dev` otomatik başlat.
3. **Test klasörü:** `e2e/` — read-only migration klasörüne dokunma.
4. **Regression testleri:**
   - `e2e/footer-reveal.spec.ts` → FIX·A·05: `/`, `/iletisim`, `/hakkimizda`, `/sss`, `/blog` rotalarında footer bottom-bar `© 2026` text reachable (scrollIntoView).
   - `e2e/malzemeler-sticky.spec.ts` → FIX·MAL·01: 375/768'de filter bar footer link grid ile overlap yok (boundingBox karşılaştırma).
   - `e2e/homepage-mobile-snap.spec.ts` → FIX·INDEX·MOBILE·01: 375px'de FinalCTA → reveal footer ulaşılabilir (footer copyright span görünür, `scrollIntoView({block:'end'})`).
5. **Scripts:** `package.json`'a `"test:e2e": "playwright test"`, `"test:e2e:ui": "playwright test --ui"`.
6. **CI (opsiyonel):** `.github/workflows/e2e.yml` — PR'da headless run.
7. **Snapshot baseline:** `e2e/__screenshots__/` — visual regression için 6 route × 3 viewport.

**Manual screenshot suite ile ilişki:**
`/mnt/documents/footer-smoke-test/` mevcut manual proof paketi referans olarak korunacak; Playwright bunun otomatik karşılığı olacak. REPORT.md'ye "automated regression: see e2e/" notu eklenecek.

**Why deferred:**
- Browser binaries ~300MB → install süresi uzun
- CI workflow + secrets ayrı bir scope
- Kullanıcı notu: "ayrı session daha temiz olur"

**Acceptance:**
- `npm run test:e2e` lokal yeşil
- 3 spec dosyası, 6 route × 3 viewport coverage
- README'ye e2e bölümü eklenmiş
