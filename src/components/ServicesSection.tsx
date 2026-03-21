import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import serviceFrze from "@/assets/service-cnc-freze.jpg";
import serviceTorna from "@/assets/service-cnc-torna.jpg";
import serviceImalat from "@/assets/service-imalat.jpg";
import serviceLazer from "@/assets/service-lazer.jpg";
import serviceKalip from "@/assets/service-kalip.jpg";
import { BlurImage } from "./BlurImage";

const services = [
  {
    image: serviceFrze,
    title: "5 Eksen CNC Frezeleme",
    description:
      "Karmaşık geometrilerde üstün yüzey kalitesi; havacılık ve enerji standartlarında hassas imalat.",
    link: "/hizmetler/cnc-frezeleme",
    cta: "Frezeleme Detayları",
  },
  {
    image: serviceTorna,
    title: "CNC Torna İşleme",
    description:
      "Mikron düzeyinde tolerans sınırlarını yakalayan yüksek nitelikli silindirik parça işleme.",
    link: "/hizmetler/cnc-tornalama",
    cta: "Torna Detayları",
  },
  {
    image: serviceImalat,
    title: "Talaşlı İmalat",
    description:
      "Hidrolik ve pnömatik sistem entegrasyonlarıyla tam işlevsel modüller ve üretim hatları.",
    link: "/hizmetler/talasli-imalat",
    cta: "İmalat Detayları",
  },
  {
    image: serviceLazer,
    title: "Lazer Kesim",
    description:
      "Yüksek hassasiyetli lazer teknolojisi ile metal ve alaşım malzemelerde temiz ve hızlı kesim.",
    link: "/hizmetler/lazer-kazima",
    cta: "Lazer Kesim Detayları",
  },
  {
    image: serviceKalip,
    title: "Kalıp & Döküm",
    description:
      "Enjeksiyon ve basınçlı döküm kalıplarında tasarımdan üretime mühendislik çözümleri.",
    link: "/hizmetler/enjeksiyon-kalibi",
    cta: "Kalıp Detayları",
  },
];

const ServicesSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReduced = usePRM();

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { root: container, threshold: 0.6 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const skewInitial = prefersReduced ? { opacity: 1, skewY: 0, y: 0 } : { opacity: 0, skewY: 4, y: 40 };
  const skewAnimate = { opacity: 1, skewY: 0, y: 0 };

  return (
    <motion.section
      id="hizmetler"
      className="section-industrial min-h-screen flex flex-col justify-center"
      style={{ backgroundColor: "hsl(var(--forge-concrete))" }}
      initial={skewInitial}
      whileInView={skewAnimate}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      <style>{`.dark #hizmetler { background-color: hsl(var(--forge-concrete)) !important; }`}</style>
      <div className="container-industrial">
        {/* Section Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary font-mono">
                {"Kabiliyetler"}
              </span>
            </div>
            <h2 className="heading-industrial text-4xl md:text-5xl mb-3 tracking-tighter">
              {"Üretim Hizmetlerimiz"}
            </h2>
            <p className="text-sm text-foreground/60 max-w-lg">
              {"Tasarımdan seri üretime kadar her adımda mühendislik odaklı çözümler sunuyoruz"}
            </p>
          </div>
          <Link
            to="/hizmetler/cnc-frezeleme"
            className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1.5 transition-colors whitespace-nowrap"
          >
            {"Tüm Hizmetler"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Horizontal Scroll Gallery */}
        <div className="relative mb-12">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {services.map((s, i) => (
              <div
                key={s.title}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="min-w-[340px] md:min-w-[380px] snap-start flex-shrink-0 service-card"
                data-index={i}
                style={{
                  transform: activeIndex === i ? "scale(1)" : "scale(0.95)",
                  opacity: activeIndex === i ? 1 : 0.7,
                  transition: "transform 0.4s ease, opacity 0.4s ease",
                }}
              >
                <ServiceCard service={s} index={i} />
              </div>
            ))}
          </div>

          {/* Dot Indicator */}
          <div className="hidden md:flex justify-center gap-2 mt-6">
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  cardRefs.current[i]?.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "start",
                  });
                }}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    i === activeIndex
                      ? "hsl(var(--primary))"
                      : "hsl(var(--border))",
                  transform: i === activeIndex ? "scale(1.5)" : "scale(1)",
                }}
                aria-label={`Hizmet ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="border border-border bg-card p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h3 className="heading-industrial text-xl mb-1">
              {"Üretim hattınızı optimize etmeye hazır mısınız?"}
            </h3>
            <p className="text-foreground/60 text-sm">
              {"Kapsamlı teknik danışmanlık için baş mühendislerimizle görüşün."}
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            <Link
              to="/teklif-al"
              className="whitespace-nowrap px-8 py-4 font-semibold uppercase tracking-wider text-sm border-2 transition-all duration-200"
              style={{
                backgroundColor: "hsl(var(--forge-molten))",
                borderColor: "hsl(var(--forge-molten))",
                color: "#ffffff",
              }}
            >
              {"Danışmanlık Al"}
            </Link>
            <Link
              to="/iletisim"
              className="btn-industrial-secondary whitespace-nowrap"
            >
              {"Bize Ulaşın"}
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

const ServiceCard = ({ service, index }: { service: (typeof services)[number]; index: number }) => {
  const prefersReduced = usePrefersReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const clipFrom = prefersReduced ? "inset(0)" : (index % 2 === 0 ? "inset(100% 0 0 0)" : "inset(0 100% 0 0)");
  const clipTo = "inset(0)";

  return (
    <motion.div
      className="group relative border border-border bg-card overflow-hidden hover:border-primary transition-all duration-300 h-full"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image with clipPath mask reveal */}
      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }}>
        <motion.div
          className="relative h-64 md:h-72 overflow-hidden"
          initial={{ clipPath: clipFrom }}
          whileInView={{ clipPath: clipTo }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <BlurImage
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          {/* Ghost machine-loop video on hover — lazy loaded */}
          {isHovered && (
            <video
              src="/machine-loop.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover hidden md:block transition-opacity duration-500"
              style={{ opacity: 0.12, mixBlendMode: "lighten" }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
        </motion.div>
      </motion.div>

      {/* Content with text stagger */}
      <div className="p-6">
        <motion.h3
          className="heading-industrial text-lg mb-3"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          animate={{ y: isHovered ? -4 : 0 }}
        >
          {service.title}
        </motion.h3>
        <motion.p
          className="text-foreground/60 text-sm leading-relaxed mb-6"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {service.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to={service.link}
            className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1.5 transition-colors"
          >
            {service.cta}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Molten glow border on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          boxShadow: isHovered
            ? "inset 0 0 0 1px hsl(var(--forge-molten) / 0.4), 0 0 20px hsl(var(--forge-molten) / 0.1)"
            : "inset 0 0 0 0px transparent, 0 0 0px transparent",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default ServicesSection;
