import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Star, Quote, ArrowRight } from "lucide-react";
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
    rating: 5,
    highlight: "Tolerans Disiplini",
  },
  {
    quote: "Prototip süreçlerimizde hız ve kalite dengesini mükemmel sağlıyorlar. DFM analizleri sayesinde tasarımlarımızı optimize ettik ve maliyetlerimizi düşürdük.",
    author: "Ayşe Kaya",
    title: "Ar-Ge Mühendisi",
    company: "Ford Otosan",
    initials: "AK",
    rating: 5,
    highlight: "DFM Analizi",
  },
  {
    quote: "Medikal implant üretiminde güvenilirlik kritik. Mas Technic'in ISO 13485 uyumlu süreçleri ve izlenebilirlik sistemi tam aradığımız standartları karşılıyor.",
    author: "Dr. Can Öztürk",
    title: "Üretim Direktörü",
    company: "Medtronic Türkiye",
    initials: "CÖ",
    rating: 5,
    highlight: "ISO 13485 Uyum",
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
  { value: "1000+", label: "Tamamlanan Proje", icon: "📐" },
  { value: "15+", label: "Yıllık Uzmanlık", icon: "⚙️" },
  { value: "24/7", label: "Kesintisiz Üretim", icon: "🏭" },
  { value: "%100", label: "Zamanında Teslimat", icon: "✓" },
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
        className="text-lg md:text-xl font-bold tracking-wider select-none whitespace-nowrap"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
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
      className="relative overflow-hidden py-20 md:py-28 bg-section-warm dark:bg-section-dark"
    >
      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-primary/10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-primary/10 pointer-events-none" />

      <div className="container-industrial relative z-10">
        {/* Header */}
        <TextReveal className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-10 h-px bg-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.5em] text-primary font-mono">
              Güvenilir Partnerler
            </span>
            <div className="w-10 h-px bg-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
            Bizi Tercih Edenler
          </h2>
          <p className="text-sm md:text-base max-w-xl mx-auto leading-relaxed text-foreground/60">
            Türkiye'nin önde gelen sanayi kuruluşlarının hassas CNC üretim partneri olarak
            <span className="text-primary font-semibold"> 1000+ projeyi </span>
            başarıyla teslim ettik.
          </p>
        </TextReveal>

        {/* Stats Bar — moved above logos for impact */}
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
              className="relative text-center py-6 md:py-8 px-4 transition-all duration-300 bg-card/60 dark:bg-card/30 border border-border/40 group overflow-hidden"
              whileHover={{
                borderColor: "hsl(var(--primary) / 0.4)",
                y: -2,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Hover gradient top line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <div
                className="text-2xl md:text-3xl font-bold text-primary mb-1.5"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {stat.value}
              </div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] font-medium text-foreground/40">
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
              <div className="transition-all duration-300 cursor-default text-foreground/15 hover:text-primary hover:scale-110">
                {item.node}
              </div>
            )}
          />
        </div>
        <div className="w-full h-px mb-3 bg-border/20" />
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
              <div className="transition-all duration-300 cursor-default text-foreground/10 hover:text-primary hover:scale-110">
                {item.node}
              </div>
            )}
          />
        </div>

        {/* Testimonial Cards */}
        <div className="relative max-w-5xl mx-auto">
          {/* Animated brackets - desktop only */}
          {!isMobile && (
            <>
              <motion.div
                className="absolute -top-10 -left-14 text-[7rem] leading-none opacity-[0.06] pointer-events-none select-none text-primary"
                style={{ fontWeight: 200, x: bracketLeft }}
              >
                [
              </motion.div>
              <motion.div
                className="absolute -bottom-14 -right-14 text-[7rem] leading-none opacity-[0.06] pointer-events-none select-none text-primary"
                style={{ fontWeight: 200, x: bracketRight }}
              >
                ]
              </motion.div>
            </>
          )}

          <StaggerContainer className="grid md:grid-cols-3 gap-4 md:gap-5" staggerDelay={0.15}>
            {testimonials.map((t, i) => (
              <StaggerItem key={i}>
                <motion.div
                  className="relative p-6 md:p-8 transition-all duration-300 h-full group bg-card/90 dark:bg-card/50 border border-border/40 flex flex-col"
                  whileHover={{
                    y: -6,
                    borderColor: "hsl(var(--primary) / 0.5)",
                    boxShadow: "0 16px 48px hsl(var(--foreground) / 0.1)",
                  }}
                >
                  {/* Top accent line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  {/* Highlight badge */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] border border-primary/20 text-primary bg-primary/5 font-mono">
                      {t.highlight}
                    </span>
                  </div>

                  {/* Star rating */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <Star key={si} className="w-3.5 h-3.5 fill-accent-warm text-accent-warm" />
                    ))}
                  </div>

                  {/* Quote icon */}
                  <Quote className="w-6 h-6 text-primary/20 mb-3 rotate-180" />

                  {/* Quote text */}
                  <p className="text-xs md:text-sm leading-relaxed mb-6 text-foreground/70 flex-1">
                    {t.quote}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                    <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center text-xs font-bold bg-primary/10 border border-primary/25 text-primary">
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-foreground">{t.author}</div>
                      <div className="text-[11px] text-foreground/50">{t.title}</div>
                      <div className="text-[10px] mt-0.5 text-primary/70 font-mono">
                        {t.company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* CTA under testimonials */}
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <a
              href="/iletisim"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-300 group"
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

export default TestimonialsSection;
