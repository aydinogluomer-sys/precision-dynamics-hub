import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TextReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";
import LogoLoop from "./LogoLoop";
import { useIsMobile } from "@/hooks/use-mobile";

const testimonials = [
  {
    quote: "Mas Technic ile 5 yıldır çalışıyoruz. Havacılık parçalarımızda hiç kalite sorunu yaşamadık. Tolerans disiplinleri ve zamanında teslimatları ile güvenilir bir iş ortağı.",
    author: "Mehmet Yılmaz",
    title: "Satınalma Müdürü",
    company: "TAI - Türk Havacılık ve Uzay Sanayii",
    initials: "MY",
  },
  {
    quote: "Prototip süreçlerimizde hız ve kalite dengesini mükemmel sağlıyorlar. DFM analizleri sayesinde tasarımlarımızı optimize ettik ve maliyetlerimizi düşürdük.",
    author: "Ayşe Kaya",
    title: "Ar-Ge Mühendisi",
    company: "Ford Otosan",
    initials: "AK",
  },
  {
    quote: "Medikal implant üretiminde güvenilirlik kritik. Mas Technic'in ISO 13485 uyumlu süreçleri ve izlenebilirlik sistemi tam aradığımız standartları karşılıyor.",
    author: "Dr. Can Öztürk",
    title: "Üretim Direktörü",
    company: "Medtronic Türkiye",
    initials: "CÖ",
  },
];

const clients = [
  "Emir Alüminyum", "Mert Teknik", "BDM", "Akbaşlar",
  "EMOR", "Batı Isıl İşlem", "Yaka Döküm", "Değer Galvano",
  "Çağdaş Teknik", "C.T.M", "Ege Teknik", "Maktest",
  "Eksen Hassas Döküm", "Era Metalurji", "Xtremex Kimya", "DPM Boya",
  "Ahmet Tezcan", "Ali Galip", "Mikrosan Makina", "Dösan Isıl İşlem",
  "Asil Oltulu", "Akon Hidrolik", "ENTEA", "Amade Metal", "De-Taş",
];

const stats = [
  { value: "1000+", label: "Tamamlanan Proje" },
  { value: "15+", label: "YILLIK UZMANLIK" },
  { value: "24/7", label: "Kesintisiz Üretim" },
  { value: "%100", label: "Zamanında Teslimat" },
];

const TestimonialsSection = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bracketLeft = useTransform(scrollYProgress, [0, 0.5], [-60, 0]);
  const bracketRight = useTransform(scrollYProgress, [0, 0.5], [60, 0]);

  const logoItems = clients.map((name) => ({
    node: (
      <span
        className="text-xl md:text-2xl font-bold tracking-wider select-none whitespace-nowrap"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          color: "inherit",
        }}
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
      className="relative overflow-hidden py-16 md:py-24"
      style={{ backgroundColor: "#0F172A" }}
    >
      {/* Blueprint grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(6, 136, 173, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 136, 173, 0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 30%, rgba(6, 136, 173, 0.12) 0%, transparent 60%)",
        }}
      />

      <div className="container-industrial relative z-10">
        {/* Header */}
        <TextReveal className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">
              Güvenilir Partnerler
            </span>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            style={{ textShadow: "0 0 30px rgba(10, 230, 255, 0.3)" }}
          >
            Bizi Tercih Edenler
          </h2>
          <p
            className="text-sm md:text-base max-w-lg mx-auto leading-relaxed"
            style={{ color: "rgba(255, 255, 255, 0.5)" }}
          >
            Türkiye'nin önde gelen sanayi kuruluşlarının hassas CNC üretim partneri.
          </p>
        </TextReveal>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mb-10 md:mb-14">
          <div className="flex-1 max-w-[120px] h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="w-1.5 h-1.5 rotate-45 bg-primary opacity-60" />
          <div className="flex-1 max-w-[120px] h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
        </div>

        {/* Logo Marquee - Row 1 */}
        <div className="mb-4">
          <LogoLoop
            logos={logoItems}
            speed={80}
            direction="left"
            logoHeight={40}
            gap={isMobile ? 48 : 80}
            pauseOnHover
            fadeOut
            fadeOutColor="#0F172A"
            style={{ height: 50 }}
            renderItem={(item) => (
              <div
                className="transition-all duration-300 cursor-default"
                style={{ color: "rgba(255, 255, 255, 0.2)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.color = "hsl(var(--primary))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.2)";
                }}
              >
                {item.node}
              </div>
            )}
          />
        </div>

        {/* Separator line */}
        <div className="w-full h-px mb-4" style={{ background: "rgba(255,255,255,0.06)" }} />

        {/* Logo Marquee - Row 2 (reverse) */}
        <div className="mb-14 md:mb-20">
          <LogoLoop
            logos={logoItems}
            speed={60}
            direction="right"
            logoHeight={40}
            gap={isMobile ? 48 : 80}
            pauseOnHover
            fadeOut
            fadeOutColor="#0F172A"
            style={{ height: 50 }}
            renderItem={(item) => (
              <div
                className="transition-all duration-300 cursor-default"
                style={{ color: "rgba(255, 255, 255, 0.12)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.color = "hsl(var(--primary))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.12)";
                }}
              >
                {item.node}
              </div>
            )}
          />
        </div>

        {/* Testimonial Cards */}
        <div className="relative max-w-5xl mx-auto mb-16 md:mb-20">
          {/* Animated brackets - desktop only */}
          {!isMobile && (
            <>
              <motion.div
                className="absolute -top-12 -left-12 text-[8rem] leading-none opacity-10 pointer-events-none select-none"
                style={{ color: "hsl(var(--primary))", fontWeight: 200, x: bracketLeft }}
              >
                [
              </motion.div>
              <motion.div
                className="absolute -bottom-16 -right-12 text-[8rem] leading-none opacity-10 pointer-events-none select-none"
                style={{ color: "hsl(var(--primary))", fontWeight: 200, x: bracketRight }}
              >
                ]
              </motion.div>
            </>
          )}

          <StaggerContainer className="grid md:grid-cols-3 gap-4 md:gap-6" staggerDelay={0.15}>
            {testimonials.map((t, i) => (
              <StaggerItem key={i}>
                <motion.div
                  className="relative p-6 md:p-8 transition-all duration-300 h-full group"
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                  whileHover={{
                    y: -4,
                    borderColor: "rgba(6, 136, 173, 0.4)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.4), 0 0 20px rgba(6, 136, 173, 0.05)",
                    background: "rgba(255, 255, 255, 0.05)",
                  }}
                >
                  {/* Top accent line on hover */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)" }}
                  />

                  {/* Quote mark */}
                  <div
                    className="text-4xl md:text-5xl leading-none mb-3 opacity-20 text-center md:text-left"
                    style={{ color: "hsl(var(--primary))", fontFamily: "Georgia, serif" }}
                  >
                    "
                  </div>

                  {/* Quote text */}
                  <p
                    className="text-xs md:text-sm leading-relaxed mb-6 text-center md:text-left"
                    style={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    {t.quote}
                  </p>

                  {/* Author */}
                  <div
                    className="flex items-center gap-3 pt-4 flex-col md:flex-row text-center md:text-left"
                    style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}
                  >
                    <div
                      className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-xs font-bold"
                      style={{
                        background: "rgba(6, 136, 173, 0.15)",
                        border: "1px solid rgba(6, 136, 173, 0.3)",
                        color: "hsl(var(--primary))",
                      }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-white">{t.author}</div>
                      <div className="text-xs" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                        {t.title}
                      </div>
                      <div
                        className="text-xs mt-0.5 text-primary"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {t.company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Stats Bar */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center py-5 md:py-6 px-4 transition-all duration-300"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
              whileHover={{
                borderColor: "rgba(6, 136, 173, 0.3)",
                background: "rgba(255, 255, 255, 0.05)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div
                className="text-2xl md:text-3xl font-bold text-primary mb-1"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {stat.value}
              </div>
              <div
                className="text-[10px] md:text-xs uppercase tracking-[0.15em] font-medium"
                style={{ color: "rgba(255, 255, 255, 0.4)" }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
