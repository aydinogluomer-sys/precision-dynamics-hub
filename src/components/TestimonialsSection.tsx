import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TextReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";

const testimonials = [
  {
    quote: "Mas Technic ile 5 yıldır çalışıyoruz. Havacılık parçalarımızda hiç kalite sorunu yaşamadık. Tolerans disiplinleri ve zamanında teslimatları ile güvenilir bir iş ortağı.",
    author: "Mehmet Yılmaz",
    title: "Satınalma Müdürü",
    company: "TAI - Türk Havacılık ve Uzay Sanayii",
  },
  {
    quote: "Prototip süreçlerimizde hız ve kalite dengesini mükemmel sağlıyorlar. DFM analizleri sayesinde tasarımlarımızı optimize ettik ve maliyetlerimizi düşürdük.",
    author: "Ayşe Kaya",
    title: "Ar-Ge Mühendisi",
    company: "Ford Otosan",
  },
  {
    quote: "Medikal implant üretiminde güvenilirlik kritik. Mas Technic'in ISO 13485 uyumlu süreçleri ve izlenebilirlik sistemi tam aradığımız standartları karşılıyor.",
    author: "Dr. Can Öztürk",
    title: "Üretim Direktörü",
    company: "Medtronic Türkiye",
  },
];

const clients = [
  "TAI", "Ford Otosan", "Arçelik", "Vestel", "Aselsan", "Roketsan", "MAN Türkiye", "Bosch",
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bracketLeft = useTransform(scrollYProgress, [0, 0.5], [-60, 0]);
  const bracketRight = useTransform(scrollYProgress, [0, 0.5], [60, 0]);

  return (
    <section
      ref={sectionRef}
      id="referanslar"
      className="section-industrial relative overflow-hidden"
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
      <div className="container-industrial relative z-10">
        {/* Header */}
        <TextReveal className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.4em] mb-3 block text-primary">
            Referanslar
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ textShadow: "0 0 20px rgba(10, 230, 255, 0.4)" }}
          >
            Bizi Tercih Edenler
          </h2>
        </TextReveal>

        {/* Bracket Quote Container */}
        <div className="relative max-w-4xl mx-auto mb-16">
          {/* Animated brackets */}
          <motion.div
            className="absolute -top-16 -left-16 text-[10rem] leading-none opacity-15 pointer-events-none select-none"
            style={{ color: "hsl(var(--primary))", fontWeight: 200, x: bracketLeft }}
          >
            [
          </motion.div>
          <motion.div
            className="absolute -bottom-24 -right-16 text-[10rem] leading-none opacity-15 pointer-events-none select-none"
            style={{ color: "hsl(var(--primary))", fontWeight: 200, x: bracketRight }}
          >
            ]
          </motion.div>

          <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.15}>
            {testimonials.map((t, i) => (
              <StaggerItem key={i}>
                <motion.div
                  className="p-8 transition-all duration-300 h-full"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                  whileHover={{
                    y: -4,
                    borderColor: "rgba(6, 136, 173, 0.3)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                  }}
                >
                  <div
                    className="text-5xl leading-none mb-4 opacity-30"
                    style={{ color: "hsl(var(--primary))", fontFamily: "Georgia, serif" }}
                  >
                    "
                  </div>
                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: "rgba(255, 255, 255, 0.8)", fontStyle: "italic" }}
                  >
                    {t.quote}
                  </p>
                  <div className="pt-4" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
                    <div className="font-semibold text-white">{t.author}</div>
                    <div className="text-sm" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                      {t.title}
                    </div>
                    <div
                      className="text-sm mt-1 text-primary"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {t.company}
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Clients Band - marquee-like scroll */}
        <motion.div
          className="py-8"
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {clients.map((client, i) => (
              <motion.div
                key={client}
                className="text-xl font-bold transition-colors cursor-default"
                style={{ color: "rgba(255, 255, 255, 0.25)" }}
                whileHover={{ color: "rgba(6, 136, 173, 0.8)", scale: 1.1 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                {client}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
