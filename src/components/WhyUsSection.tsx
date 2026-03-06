import { Target, RefreshCw, Clock, Wrench, ShieldCheck, Headphones, FileSearch, Truck, Building2 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Target,
    title: "Hassasiyet & Tolerans Disiplini",
    subtitle: "±0.01mm",
    description: "±0.01mm hassasiyetle çalışan CNC tezgahlarımız ve CMM ölçüm sistemimiz ile tolerans garantisi sağlıyoruz.",
  },
  {
    icon: RefreshCw,
    title: "Proses Kontrollü Üretim",
    subtitle: "100% İzlenebilirlik",
    description: "Her üretim adımı izlenir, kaydedilir ve raporlanır. Tekrarlanabilir kalite için sistematik yaklaşım.",
  },
  {
    icon: Clock,
    title: "Zamanında Teslimat",
    subtitle: "98% Oran",
    description: "Söz verilen tarihte teslimat. Proje planınızı aksatmayacak güvenilir lojistik süreçleri.",
  },
  {
    icon: Wrench,
    title: "Mühendislik Desteği",
    subtitle: "24h Yanıt",
    description: "DFM analizi, malzeme seçimi ve tasarım optimizasyonu konularında uzman mühendislik desteği.",
  },
];

const badges = [
  { label: "Tekrarlanabilir Kalite Garantisi", icon: ShieldCheck },
  { label: "24 Saat Teknik Destek", icon: Headphones },
  { label: "Ücretsiz DFM Analizi", icon: FileSearch },
  { label: "Zamanında Teslimat Garantisi", icon: Truck },
];

const WhyUsSection = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.08], [40, 0]);

  const card0Opacity = useTransform(scrollYProgress, [0.08, 0.18], [0, 1]);
  const card0Y = useTransform(scrollYProgress, [0.08, 0.18], [60, 0]);
  const card0Detail = useTransform(scrollYProgress, [0.16, 0.22], [0, 1]);

  const card1Opacity = useTransform(scrollYProgress, [0.20, 0.30], [0, 1]);
  const card1Y = useTransform(scrollYProgress, [0.20, 0.30], [60, 0]);
  const card1Detail = useTransform(scrollYProgress, [0.28, 0.34], [0, 1]);

  const card2Opacity = useTransform(scrollYProgress, [0.32, 0.42], [0, 1]);
  const card2Y = useTransform(scrollYProgress, [0.32, 0.42], [60, 0]);
  const card2Detail = useTransform(scrollYProgress, [0.40, 0.46], [0, 1]);

  const card3Opacity = useTransform(scrollYProgress, [0.44, 0.54], [0, 1]);
  const card3Y = useTransform(scrollYProgress, [0.44, 0.54], [60, 0]);
  const card3Detail = useTransform(scrollYProgress, [0.52, 0.58], [0, 1]);

  const cardAnimations = [
    { opacity: card0Opacity, y: card0Y, detail: card0Detail },
    { opacity: card1Opacity, y: card1Y, detail: card1Detail },
    { opacity: card2Opacity, y: card2Y, detail: card2Detail },
    { opacity: card3Opacity, y: card3Y, detail: card3Detail },
  ];

  const badgesOpacity = useTransform(scrollYProgress, [0.60, 0.70], [0, 1]);
  const badgesY = useTransform(scrollYProgress, [0.60, 0.70], [30, 0]);

  if (isMobile) {
    return (
      <section id="neden-biz" className="py-16 px-4 bg-[#0d1f2d] dark:bg-secondary">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-xs font-semibold uppercase tracking-[0.4em] mb-3 block text-primary">Avantajlar</span>
            <h2 className="text-2xl font-bold mb-3 text-white">Neden Mas Technic?</h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>Hassasiyet, güvenilirlik ve mühendislik mükemmelliği ile fark yaratıyoruz</p>
          </motion.div>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {values.map((value, i) => (
              <motion.div key={value.title} className="relative p-4 text-center overflow-hidden group" style={{ background: "rgba(15, 23, 42, 0.5)", border: "1px solid rgba(255,255,255,0.08)" }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 mb-3 flex items-center justify-center text-primary">
                    <value.icon className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-sm mb-1 text-white">{value.title}</h4>
                  <span className="text-xs font-semibold text-primary font-mono block mb-2">{value.subtitle}</span>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div className="mt-6 p-4 flex items-center gap-4" style={{ background: "rgba(15, 23, 42, 0.5)", border: "1px solid rgba(255,255,255,0.08)" }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Building2 className="w-8 h-8 text-primary flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-bold text-sm mb-0.5 text-white">Hakkımızda</h4>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>Hassasiyet, güvenilirlik ve mühendislik mükemmelliği ile endüstriye hizmet veriyoruz.</p>
            </div>
            <Link to="/hakkimizda" className="text-xs font-semibold text-primary hover:underline whitespace-nowrap">
              Daha Fazla →
            </Link>
          </motion.div>
          <motion.div className="flex flex-wrap justify-center items-center gap-3 pt-4 mt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            {badges.map((badge) => (
              <span key={badge.label} className="inline-flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                <badge.icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />{badge.label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
      <section
        id="neden-biz"
        className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center bg-[#0d1f2d] dark:bg-secondary"
      >
        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
          <motion.div className="text-center mb-6 md:mb-8" style={{ opacity: headerOpacity, y: headerY }}>
            <span className="text-xs font-semibold uppercase tracking-[0.4em] mb-2 block text-primary">Avantajlar</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Neden Mas Technic?</h2>
            <p className="text-sm max-w-lg mx-auto text-muted-foreground">Hassasiyet, güvenilirlik ve mühendislik mükemmelliği ile fark yaratıyoruz</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {values.map((value, i) => (
              <WhyUsCard key={value.title} value={value} index={i} anim={cardAnimations[i]} />
            ))}
          </div>
          <motion.div className="mt-4 p-4 bg-background border border-border flex items-center gap-4" style={{ opacity: badgesOpacity, y: badgesY }}>
            <Building2 className="w-8 h-8 text-primary flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-bold text-sm mb-0.5">Hakkımızda</h4>
              <p className="text-xs text-muted-foreground">Hassasiyet, güvenilirlik ve mühendislik mükemmelliği ile endüstriye hizmet veriyoruz.</p>
            </div>
            <Link to="/hakkimizda" className="text-xs font-semibold text-primary hover:underline whitespace-nowrap">
              Daha Fazla →
            </Link>
          </motion.div>
          <motion.div className="flex flex-wrap justify-center items-center gap-6 pt-4 mt-2 border-t border-border" style={{ opacity: badgesOpacity, y: badgesY }}>
            {badges.map((badge, i) => (
              <span key={badge.label} className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <badge.icon className="w-4 h-4 text-primary flex-shrink-0" />{badge.label}
                {i < 3 && <span className="ml-4 text-border">·</span>}
              </span>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

interface CardProps {
  value: (typeof values)[number];
  index: number;
  anim: { opacity: any; y: any; detail: any };
}

const WhyUsCard = ({ value, index, anim }: CardProps) => {
  return (
    <motion.div
      className="relative bg-background border border-border p-6 text-center h-[300px] md:h-[320px] overflow-hidden group hover:border-primary transition-colors"
      style={{ opacity: anim.opacity, y: anim.y }}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex flex-col items-center justify-center h-full">
        <motion.div
          className="w-10 h-10 mb-3 flex items-center justify-center text-primary"
          style={{ opacity: anim.detail }}
        >
          <value.icon className="w-10 h-10" />
        </motion.div>

        <h4 className="font-bold text-base mb-1">{value.title}</h4>
        <span className="text-sm font-semibold text-primary font-mono block mb-3">{value.subtitle}</span>

        <motion.p
          className="text-xs text-muted-foreground leading-relaxed"
          style={{ opacity: anim.detail }}
        >
          {value.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default WhyUsSection;
