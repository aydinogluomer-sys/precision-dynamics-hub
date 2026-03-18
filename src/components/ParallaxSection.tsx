import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const PRECISION_STATS = [
  { value: "±0.002mm", label: "Pozisyon Hassasiyeti" },
  { value: "Ra 0.4μm", label: "Yüzey Pürüzlülüğü" },
  { value: "5 Eksen", label: "Eşzamanlı İşleme" },
];

const TIMELINE_STEPS = [
  { title: "Teklif", desc: "RFQ analizi ve DFM incelemesi" },
  { title: "Malzeme", desc: "Sertifikalı hammadde tedariği" },
  { title: "Üretim", desc: "CNC işleme ve proses kontrol" },
  { title: "Kalite", desc: "CMM ölçüm ve raporlama" },
  { title: "Teslim", desc: "Paketleme ve lojistik" },
];

const TESTIMONIALS = [
  {
    quote: "0.002mm hassasiyet, 3 gün erken teslim — beklentilerin ötesinde.",
    name: "Bilal Ahmed",
    role: "Havacılık Mühendisi",
  },
  {
    quote: "5 eksen frezeleme kapasiteleri, titanyum parçalarımız için ideal çözüm oldu.",
    name: "Ayşe Korkmaz",
    role: "Medikal Cihaz Ar-Ge Müdürü",
  },
  {
    quote: "Proses kontrol ve raporlama düzeyleri AS9100D standardının üzerinde.",
    name: "Mehmet Yıldız",
    role: "Kalite Güvence Direktörü",
  },
  {
    quote: "Seri üretimde 10.000+ parça, sıfır NCR — güvenilir bir partner.",
    name: "Thomas Braun",
    role: "Tedarik Zinciri Müdürü",
  },
  {
    quote: "İnconel 718 işleme konusunda Türkiye'deki en yetkin atölye.",
    name: "Elif Demir",
    role: "Enerji Sektörü Proje Yöneticisi",
  },
  {
    quote: "DFM önerileriyle maliyetimizi %18 düşürdüler, kaliteden ödün vermeden.",
    name: "Kerem Aktaş",
    role: "Savunma Sanayi Mühendisi",
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

const PrecisionSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="py-20 md:py-28">
      <div className="container-industrial">
        <motion.p
          className="text-xs uppercase tracking-[0.3em] font-mono mb-8 text-center"
          style={{ color: "hsl(var(--forge-gold))" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Hassasiyet Metrikleri
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {PRECISION_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center p-8 rounded-lg"
              style={{
                backgroundColor: "hsl(var(--forge-surface-alt))",
                border: "1px solid hsl(var(--forge-gold) / 0.12)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontWeight: 700,
                  color: "hsl(var(--forge-gold))",
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-[11px] uppercase mt-3"
                style={{
                  letterSpacing: "0.08em",
                  color: "hsl(var(--forge-muted-steel))",
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TimelineSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="py-20 md:py-28">
      <div className="container-industrial">
        <motion.p
          className="text-xs uppercase tracking-[0.3em] font-mono mb-12 text-center"
          style={{ color: "hsl(var(--forge-gold))" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Üretim Süreci
        </motion.p>
        <div className="relative max-w-3xl mx-auto">
          {/* Connecting line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
            style={{ backgroundColor: "hsl(var(--forge-gold) / 0.15)" }}
          />
          {TIMELINE_STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              className="relative flex items-start gap-6 mb-8 last:mb-0 md:even:flex-row-reverse md:even:text-right"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.2, duration: 0.5, ease: "easeOut" }}
            >
              {/* Dot */}
              <motion.div
                className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: "hsl(var(--forge-gold) / 0.12)",
                  border: "2px solid hsl(var(--forge-gold) / 0.3)",
                }}
                animate={
                  inView
                    ? { scale: 1.05, backgroundColor: "hsl(45 97% 56% / 0.18)" }
                    : {}
                }
                transition={{ delay: i * 0.2 + 0.3, duration: 0.4 }}
              >
                <span
                  className="text-sm font-bold"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "hsl(var(--forge-gold))",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.div>
              {/* Content */}
              <div className="pt-2">
                <h3
                  className="text-lg font-bold text-white mb-1"
                  style={{ fontFamily: "'Exo 2', sans-serif" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "hsl(var(--forge-muted-steel))" }}
                >
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TestimonialsGrid = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const col1 = TESTIMONIALS.filter((_, i) => i % 2 === 0);
  const col2 = TESTIMONIALS.filter((_, i) => i % 2 === 1);

  return (
    <div ref={ref} className="py-20 md:py-28">
      <div className="container-industrial">
        <motion.p
          className="text-xs uppercase tracking-[0.3em] font-mono mb-12 text-center"
          style={{ color: "hsl(var(--forge-gold))" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Müşteri Görüşleri
        </motion.p>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[col1, col2].map((col, ci) => (
            <div key={ci} className="flex flex-col gap-6">
              {col.map((t, ti) => (
                <motion.div
                  key={t.name}
                  className="p-6 rounded-lg"
                  style={{
                    backgroundColor: "hsl(var(--forge-surface-alt))",
                    border: "1px solid hsl(var(--forge-gold) / 0.12)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: ci * 0.1 + ti * 0.12,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                >
                  <p
                    className="text-sm leading-relaxed mb-4 italic"
                    style={{ color: "rgba(255,255,255,0.75)" }}
                  >
                    "{t.quote}"
                  </p>
                  <div>
                    <span
                      className="text-sm font-semibold text-white"
                      style={{ fontFamily: "'Exo 2', sans-serif" }}
                    >
                      {t.name}
                    </span>
                    <span
                      className="text-xs ml-2"
                      style={{ color: "hsl(var(--forge-muted-steel))" }}
                    >
                      — {t.role}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

const ParallaxSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: "hsl(var(--forge-bg))" }}
    >
      {/* Subtle parallax bg shift */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: bgY,
          background:
            "radial-gradient(ellipse at 50% 0%, hsl(var(--forge-gold) / 0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10">
        <PrecisionSection />
        <TimelineSection />
        <TestimonialsGrid />
      </div>
    </section>
  );
};

export default ParallaxSection;
