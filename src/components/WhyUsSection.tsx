import { Target, RefreshCw, Clock, Wrench, ShieldCheck, FileSearch, Building2, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

const values = [
{
  icon: Target,
  title: "Dijital Şeffaflık",
  subtitle: "100%",
  description: "Üretim sürecinizi, size özel kontrol paneli üzerinden gerçek zamanlı olarak izleyin ve tüm aşamalara tam şeffaflıkla erişin."
},
{
  icon: RefreshCw,
  title: "RFQ Süreci",
  subtitle: "4 Adım",
  description: "CAD Yükleme, teknik özellik belirleme, önizleme ve teklif gönderme adımlarından oluşan 4 aşamalı hızlı RFQ sistemi."
},
{
  icon: Clock,
  title: "Anlık Model İzleme",
  subtitle: "3D",
  description: "Projelerinizi sistem üzerinden 3D ortamda görüntüleyin, teknik detayları analiz edin ve üretim öncesi doğrulama yapın."
},
{
  icon: Wrench,
  title: "Bütünsel Yönetim",
  subtitle: "360°",
  description: "Teklif aşamasından kalite raporlarına, cari takipten teslimat sürecine kadar tüm operasyonları tek platform üzerinden yönetin."
}];


const badges = [
{ label: "Proses Kontrollü Üretim", icon: ShieldCheck },
{ label: "Teknik Güvence Protokolü", icon: FileSearch },
{ label: "DFM Analizi Desteği", icon: Wrench },
{ label: "Zamanında Teslimat Garantisi", icon: Clock }];


const WhyUsSection = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);

  const card0Opacity = useTransform(scrollYProgress, [0.06, 0.14], [0, 1]);
  const card1Opacity = useTransform(scrollYProgress, [0.14, 0.22], [0, 1]);
  const card2Opacity = useTransform(scrollYProgress, [0.22, 0.30], [0, 1]);
  const card3Opacity = useTransform(scrollYProgress, [0.30, 0.38], [0, 1]);

  const cardAnimations = [
  { opacity: card0Opacity },
  { opacity: card1Opacity },
  { opacity: card2Opacity },
  { opacity: card3Opacity }];


  const badgesOpacity = useTransform(scrollYProgress, [0.40, 0.48], [0, 1]);

  if (isMobile) {
    return (
      <section id="neden-biz" className="py-16 px-4 bg-[#f0f4f8] dark:bg-[#0f1a2a]">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-xs font-semibold uppercase tracking-[0.4em] mb-3 block text-primary">Avantajlar</span>
            <h2 className="text-2xl font-bold mb-3 text-foreground">Neden Mas Technic?</h2>
            <p className="text-sm max-w-lg mx-auto text-foreground/80">Hassasiyet, güvenilirlik ve mühendislik mükemmelliği ile fark yaratıyoruz</p>
          </motion.div>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {values.map((value, i) =>
            <motion.div key={value.title} className="relative p-4 text-center overflow-hidden group bg-background border border-border" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 mb-3 flex items-center justify-center text-primary">
                    <value.icon className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-sm mb-1 text-foreground">{value.title}</h4>
                  <span className="text-xs font-semibold text-primary font-mono block mb-2">{value.subtitle}</span>
                  <p className="text-xs leading-relaxed text-foreground/80">{value.description}</p>
                </div>
              </motion.div>
            )}
          </div>
          <motion.div className="mt-6 p-4 flex items-center gap-4 bg-background border border-border" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Building2 className="w-8 h-8 text-primary flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-bold text-sm mb-0.5 text-foreground">Hakkımızda</h4>
              <p className="text-xs text-foreground/80">Hassas üretim, güvenilir süreçler ve mühendislik odaklı yaklaşımımızla en zorlu teknik spesifikasyonlara ve global üretim standartlarına endüstriyel çözümler sunuyoruz.</p>
            </div>
            <Link to="/hakkimizda" className="text-xs font-semibold text-primary hover:underline whitespace-nowrap">
              Daha Fazla →
            </Link>
          </motion.div>
          <motion.div className="flex flex-wrap justify-center items-center gap-3 pt-4 mt-4 border-t border-border" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            {badges.map((badge) =>
            <span key={badge.label} className="inline-flex items-center gap-1.5 text-xs text-foreground/80">
                <badge.icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />{badge.label}
              </span>
            )}
          </motion.div>
        </div>
      </section>);

  }

  return (
    <div ref={containerRef} className="relative" style={{ height: "250vh" }}>
      <section
        id="neden-biz"
        className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center bg-[#f0f4f8] dark:bg-[#0f1a2a]">
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
          <motion.div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6 md:mb-8" style={{ opacity: headerOpacity, y: headerY, backfaceVisibility: 'hidden', translateZ: 0 }}>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.4em] mb-2 block text-primary">Avantajlar</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">Neden Mas Technic?</h2>
              <p className="text-sm max-w-lg text-foreground/80">Mikron seviyesinde üretim hassasiyetini, uçtan uca dijital izlenebilirlik ve şeffaf süreç yönetimiyle müşterilerimize sunuyoruz</p>
            </div>
            <a href="#teklif" className="mt-3 md:mt-0 text-sm font-medium text-primary hover:text-accent flex items-center gap-1.5 transition-colors whitespace-nowrap">
              Kontrol Paneline Git <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {values.map((value, i) =>
            <WhyUsCard key={value.title} value={value} index={i} anim={cardAnimations[i]} />
            )}
          </div>
          <motion.div className="mt-4 p-4 flex items-center gap-4 bg-background border border-border" style={{ opacity: badgesOpacity, y: badgesY, backfaceVisibility: 'hidden', translateZ: 0 }}>
            <Building2 className="w-8 h-8 text-primary flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-bold text-sm mb-0.5 text-foreground">Hakkımızda</h4>
              <p className="text-xs text-foreground/80">Hassas üretim, güvenilir süreçler ve mühendislik odaklı yaklaşımımızla en zorlu teknik spesifikasyonlara ve global üretim standartlarına endüstriyel çözümler sunuyoruz.</p>
            </div>
            <Link to="/hakkimizda" className="text-xs font-semibold text-primary hover:underline whitespace-nowrap">
              Daha Fazla →
            </Link>
          </motion.div>
          <motion.div className="flex flex-wrap justify-center items-center gap-6 pt-4 mt-2 border-t border-border" style={{ opacity: badgesOpacity, y: badgesY, backfaceVisibility: 'hidden', translateZ: 0 }}>
            {badges.map((badge, i) =>
            <span key={badge.label} className="inline-flex items-center gap-2 text-sm text-foreground/80">
                <badge.icon className="w-4 h-4 text-primary flex-shrink-0" />{badge.label}
                {i < 3 && <span className="ml-4 text-border"></span>}
              </span>
            )}
          </motion.div>
        </div>
      </section>
    </div>);

};

interface CardProps {
  value: (typeof values)[number];
  index: number;
  anim: {opacity: any;y: any;};
}

const WhyUsCard = ({ value, index, anim }: CardProps) => {
  return (
    <motion.div
      className="relative p-6 text-center h-[300px] md:h-[320px] overflow-hidden group transition-colors bg-background border border-border hover:border-primary hover:-translate-y-1 hover:shadow-lg"
      style={{ opacity: anim.opacity, y: anim.y, backfaceVisibility: 'hidden', translateZ: 0 }}>
      
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-10 h-10 mb-3 flex items-center justify-center text-primary">
          <value.icon className="w-10 h-10" />
        </div>

        <h4 className="font-bold text-base mb-1 text-foreground">{value.title}</h4>
        <span className="text-sm font-semibold text-primary font-mono block mb-3">{value.subtitle}</span>

        <p className="text-xs leading-relaxed text-foreground/80">
          {value.description}
        </p>
      </div>
    </motion.div>);

};

export default WhyUsSection;