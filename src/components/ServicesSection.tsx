import { Cog, CircleDot, Layers, Zap, Box, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Cog,
    badge: "Stratejik",
    title: "CNC Freze",
    description:
      "3, 4 ve 5 eksenli CNC freze işleme ile karmaşık geometrilerde yüksek hassasiyetli üretim. Havacılık, enerji ve altyapı projelerinde eksiksiz tolerans.",
    capabilities: ["5 Eksen İşleme", "Yüzey Kalitesi Ra 0.8"],
  },
  {
    icon: CircleDot,
    badge: "Hassasiyet",
    title: "CNC Torna",
    description:
      "Yüksek hızlı CNC torna operasyonları ile mikron seviyesinde doğruluk sağlayan karmaşık bileşen üretimi.",
    capabilities: ["Çift Kafa İşleme", "Otomatik KK Entegrasyonu"],
  },
  {
    icon: Layers,
    badge: "Anahtar Teslim",
    title: "Talaşlı İmalat",
    description:
      "Geleneksel ve CNC destekli talaşlı imalat ile pnömatik ve hidrolik entegrasyonlar dahil tam hizmet montaj hatları.",
    capabilities: ["Modüler Sistemler", "Elektromekanik Test"],
  },
  {
    icon: Zap,
    badge: "İleri Teknoloji",
    title: "Lazer Kesim",
    description:
      "6kW fiber lazer teknolojisi ile 25mm çelik kapasitesinde hızlı ve hassas sac metal kesim operasyonları.",
    capabilities: ["Fiber Lazer 6kW", "Otomatik Yükleme"],
  },
  {
    icon: Box,
    badge: "Üretim",
    title: "Kalıp & Döküm",
    description:
      "Enjeksiyon kalıpları, basınçlı döküm kalıpları ve prototip kalıp imalatı ile endüstriyel çözümler.",
    capabilities: ["Enjeksiyon Kalıp", "Alüminyum Döküm"],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const ServicesSection = () => {
  return (
    <section id="hizmetler" className="section-industrial bg-background">
      <div className="container-industrial">
        {/* Section Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-border" />
              <span className="text-technical text-muted-foreground uppercase tracking-widest text-sm">
                Kabiliyetler
              </span>
            </div>
            <h2 className="heading-industrial text-3xl md:text-4xl mb-2">
              Mühendislik Hizmetlerimiz
            </h2>
          </div>
          <a
            href="#kabiliyetler"
            className="mt-4 md:mt-0 text-sm font-medium text-primary hover:text-accent flex items-center gap-1.5 transition-colors"
          >
            Tüm kabiliyetleri görüntüle
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Top row: 3 cards */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.slice(0, 3).map((s) => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </motion.div>

        {/* Bottom row: 2 cards */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.slice(3).map((s) => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </motion.div>

        {/* Bottom CTA Banner */}
        <motion.div
          className="border border-border bg-card p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h3 className="heading-industrial text-xl mb-1">
              Üretim hattınızı optimize etmeye hazır mısınız?
            </h3>
            <p className="text-muted-foreground text-sm">
              Kapsamlı teknik danışmanlık için baş mühendislerimizle görüşün.
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            <a href="#teklif" className="btn-industrial-primary whitespace-nowrap">
              Danışmanlık Al
            </a>
            <a
              href="#kabiliyetler"
              className="btn-industrial-secondary whitespace-nowrap"
            >
              Portföyümüz
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service }: { service: (typeof services)[number] }) => (
  <motion.div
    variants={cardVariants}
    className="group relative border border-border bg-card overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
  >
    {/* Accent bar */}
    <div className="h-1 w-full bg-primary" />

    <div className="p-8">
      {/* Badge */}
      <span className="text-technical text-[11px] font-semibold text-primary uppercase tracking-widest mb-5 block">
        {service.badge}
      </span>

      {/* Title */}
      <h3 className="heading-industrial text-xl mb-3">{service.title}</h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
        {service.description}
      </p>

      {/* Capabilities */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
        {service.capabilities.map((cap) => (
          <span key={cap} className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary inline-block shrink-0" />
            {cap}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="pt-5 border-t border-border">
        <a
          href="#teklif"
          className="text-sm font-semibold text-foreground hover:text-primary flex items-center gap-1.5 transition-colors"
        >
          Teknik Özellikler
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  </motion.div>
);

export default ServicesSection;
