import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal as TextReveal } from "./ui/Reveal";
import { LogoLoop } from "./LogoLoop";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { TestimonialsColumn } from "./ui/testimonials-columns-1";

const testimonials = [
  {
    text: "5 yıldır çalışıyoruz. Havacılık parçalarımızda hiç kalite sorunu yaşamadık. Tolerans disiplinleri ve zamanında teslimatları ile güvenilir bir iş ortağı.",
    image: "",
    name: "Satınalma Müdürü",
    role: "Havacılık & Uzay Sektörü",
  },
  {
    text: "Prototip süreçlerimizde hız ve kalite dengesini mükemmel sağlıyorlar. DFM analizleri sayesinde tasarımlarımızı optimize ettik ve maliyetlerimizi düşürdük.",
    image: "",
    name: "Ar-Ge Mühendisi",
    role: "Otomotiv Sektörü",
  },
  {
    text: "Medikal implant üretiminde güvenilirlik kritik. ISO 13485 uyumlu süreçleri ve izlenebilirlik sistemi tam aradığımız standartları karşılıyor.",
    image: "",
    name: "Üretim Direktörü",
    role: "Medikal Cihaz Üreticisi",
  },
  {
    text: "Savunma sanayii projelerimizde hassasiyet ve gizlilik ön planda. Bu iki konuda da beklentilerimizi fazlasıyla karşılıyorlar.",
    image: "",
    name: "Proje Yöneticisi",
    role: "Savunma Sanayi",
  },
  {
    text: "Küçük partilerden seri üretime geçişte hiç aksama yaşamadık. Esnek üretim kapasiteleri ve hızlı iletişimleri çok değerli.",
    image: "",
    name: "Tedarik Zinciri Uzmanı",
    role: "Endüstriyel Üretim",
  },
  {
    text: "Alüminyum ve paslanmaz çelik işlemede üstün kalite sunuyorlar. Yüzey işlem seçenekleri de oldukça geniş ve profesyonel.",
    image: "",
    name: "Kalite Müdürü",
    role: "Beyaz Eşya Sektörü",
  },
  {
    text: "CNC torna ve frezeleme kapasiteleri Türkiye'nin en iyileri arasında. 24/7 üretim imkânı projelerin zamanında teslimini garantiliyor.",
    image: "",
    name: "Operasyon Müdürü",
    role: "Elektronik Sektörü",
  },
  {
    text: "Teknik ekipleri her zaman çözüm odaklı yaklaşıyor. Karmaşık geometrilerde bile mükemmel sonuçlar alıyoruz.",
    image: "",
    name: "Mühendislik Müdürü",
    role: "Havacılık & Uzay Sektörü",
  },
  {
    text: "Fiyat-performans dengesi mükemmel. Kaliteden ödün vermeden rekabetçi fiyatlar sunuyorlar. Uzun vadeli çözüm ortağımız.",
    image: "",
    name: "Genel Müdür",
    role: "İş Makineleri Sektörü",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const clients = [
  "Emir Alüminyum",
  "Mert Teknik",
  "BDM",
  "Akbaşlar",
  "EMOR",
  "Batı Isıl İşlem",
  "Yaka Döküm",
  "Değer Galvano",
  "Çağdaş Teknik",
  "C.T.M",
  "Ege Teknik",
  "Maktest",
  "Eksen Hassas Döküm",
  "Era Metalurji",
  "Xtremex Kimya",
  "DPM Boya",
  "Ahmet Tezcan",
  "Ali Galip",
  "Mikrosan Makina",
  "Dösan Isıl İşlem",
  "Asil Oltulu",
  "Akon Hidrolik",
  "ENTEA",
  "Amade Metal",
  "De-Taş",
];

const stats = [
  { value: "1000+", label: "Tamamlanan Proje" },
  { value: "15+", label: "Yıllık Uzmanlık" },
  { value: "24/7", label: "Kesintisiz Üretim" },
  { value: "%100", label: "Zamanında Teslimat" },
];

/* Word scatter component for heading */
const WordScatter = ({ text, prefersReduced }: { text: string; prefersReduced: boolean }) => {
  const words = text.split(" ");
  const rotations = useMemo(() => words.map(() => Math.random() * 16 - 8), [words.length]);

  return (
    <span className="inline-flex flex-wrap justify-center gap-x-[0.3em]">
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={prefersReduced ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 0, y: 20, rotate: rotations[i] }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

export const TestimonialsSection = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const logoItems = clients.map((name) => ({
    node: (
      <span
        className="text-lg md:text-xl font-bold tracking-wider select-none whitespace-nowrap"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        {name}
      </span>
    ),
    alt: name,
  }));

  return (
    <section
      ref={sectionRef}
      id="referanslar"
      className="relative py-24 md:py-32 lg:py-40 min-h-screen flex flex-col justify-center"
      style={{ backgroundColor: "rgba(240, 237, 232, 0.88)" }}
    >
      <style>{`
        .dark #referanslar { background-color: rgba(15,15,15,0.92) !important; }
        .dark .testimonial-stat-card { background-color: hsl(var(--card)) !important; border-color: hsl(var(--border)) !important; }
        .dark .testimonial-stat-value { color: hsl(var(--forge-teal)) !important; }
        .dark .testimonial-stat-label { color: hsl(var(--muted-foreground)) !important; }
        .dark .testimonial-heading { color: hsl(var(--foreground)) !important; }
        .dark .testimonial-subtext { color: hsl(var(--muted-foreground)) !important; }
        .dark .testimonial-accent-line { background-color: hsl(var(--forge-teal)) !important; }
        .dark .testimonial-accent-text { color: hsl(var(--forge-teal)) !important; }
        .dark .testimonial-logo-item { color: hsl(var(--muted-foreground) / 0.3) !important; }
        .dark .testimonial-corner { border-color: hsl(var(--border)) !important; }
      `}</style>

      {/* Decorative corner accents */}
      <div
        className="testimonial-corner absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 pointer-events-none"
        style={{ borderColor: "rgba(0,113,144,0.1)" }}
      />
      <div
        className="testimonial-corner absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 pointer-events-none"
        style={{ borderColor: "rgba(0,113,144,0.1)" }}
      />

      <div className="container-industrial relative z-10">
        {/* Header */}
        <TextReveal className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="testimonial-accent-line w-10 h-px" style={{ backgroundColor: "#007190" }} />
            <span
              className="testimonial-accent-text text-[10px] font-semibold uppercase tracking-[0.5em] font-mono"
              style={{ color: "#007190" }}
            >
              Güvenilir Partnerler
            </span>
            <div className="testimonial-accent-line w-10 h-px" style={{ backgroundColor: "#007190" }} />
          </div>
          <h2
            className="testimonial-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-5"
            style={{ color: "hsl(var(--forge-gunmetal))" }}
          >
            <WordScatter text="Bizi Tercih Edenler" prefersReduced={prefersReduced} />
          </h2>
          <p
            className="testimonial-subtext text-sm md:text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: "rgba(26,26,46,0.6)" }}
          >
            Türkiye'nin önde gelen sanayi kuruluşlarının hassas CNC üretim partneri olarak
            <span className="font-semibold" style={{ color: "hsl(var(--forge-molten))" }}>
              {" "}
              1000+ projeyi{" "}
            </span>
            başarıyla teslim ettik.
          </p>
        </TextReveal>

        {/* Stats Bar */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="testimonial-stat-card relative text-center py-6 md:py-8 px-4 group overflow-hidden border"
              style={{
                backgroundColor: "rgba(255,255,255,0.6)",
                borderColor: "rgba(0,113,144,0.15)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{ backgroundColor: "hsl(var(--forge-molten))" }}
              />
              <div
                className="testimonial-stat-value text-2xl md:text-3xl font-bold mb-1.5"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {stat.value}
              </div>
              <div
                className="testimonial-stat-label text-[10px] md:text-xs uppercase tracking-[0.15em] font-medium"
                style={{ color: "rgba(26,26,46,0.4)" }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Logo Marquee */}
        <div className="mb-3">
          <LogoLoop
            logos={logoItems}
            speed={70}
            direction="left"
            logoHeight={36}
            gap={isMobile ? 40 : 72}
            pauseOnHover
            fadeOut
            style={{ height: 44 }}
            renderItem={(item) => (
              <div
                className="testimonial-logo-item transition-all duration-300 cursor-default hover:scale-110"
                style={{ color: "rgba(22,32,56,0.15)" }}
              >
                {item.node}
              </div>
            )}
          />
        </div>
        <div className="w-full h-px mb-3" style={{ backgroundColor: "rgba(0,113,144,0.1)" }} />
        <div className="mb-16 md:mb-20">
          <LogoLoop
            logos={logoItems}
            speed={50}
            direction="right"
            logoHeight={36}
            gap={isMobile ? 40 : 72}
            pauseOnHover
            fadeOut
            style={{ height: 44 }}
            renderItem={(item) => (
              <div
                className="testimonial-logo-item transition-all duration-300 cursor-default hover:scale-110"
                style={{ color: "rgba(22,32,56,0.1)" }}
              >
                {item.node}
              </div>
            )}
          />
        </div>

        {/* Testimonial Columns — vertical infinite scroll */}
        <div className="relative max-w-5xl mx-auto">
          <motion.div
            className="flex justify-center gap-4 md:gap-6 max-h-[600px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <TestimonialsColumn testimonials={firstColumn} duration={15} className="hidden md:block" />
            <TestimonialsColumn testimonials={secondColumn} duration={19} />
            <TestimonialsColumn testimonials={thirdColumn} duration={17} className="hidden md:block" />
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <a
              href="/iletisim"
              className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all duration-300 group"
              style={{ color: "#007190" }}
            >
              Siz de partnerimiz olun
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
