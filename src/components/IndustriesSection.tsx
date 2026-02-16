import { Plane, Car, Heart, Bot, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const industries = [
  {
    icon: Plane,
    name: "Havacılık & Uzay",
    description: "AS9100D sertifikalı havacılık parçaları",
    highlight: "±0.005mm tolerans",
  },
  {
    icon: Car,
    name: "Otomotiv",
    description: "IATF 16949 kalite standartlarında üretim",
    highlight: "Seri üretim kapasitesi",
  },
  {
    icon: Heart,
    name: "Tıbbi",
    description: "ISO 13485 uyumlu medikal bileşenler",
    highlight: "Biyouyumlu malzemeler",
  },
  {
    icon: Bot,
    name: "Robotik",
    description: "Hassas hareket sistemleri ve aktüatörler",
    highlight: "Yüksek tekrarlanabilirlik",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const IndustriesSection = () => {
  return (
    <section id="endustriler" className="section-industrial bg-muted border-y border-border">
      <div className="container-industrial">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-px bg-border" />
            <span className="text-technical text-muted-foreground uppercase tracking-widest text-sm">
              Sektörler
            </span>
            <div className="w-8 h-px bg-border" />
          </div>
          <h2 className="heading-industrial text-3xl md:text-4xl mb-4">Hizmet Verdiğimiz Endüstriler</h2>
          <p className="subheading-industrial text-lg max-w-2xl mx-auto">
            Kritik sektörlerde güvenilir üretim ortağınız
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {industries.map((industry) => (
            <motion.div
              key={industry.name}
              variants={cardVariants}
              className="group bg-background border border-border overflow-hidden hover:border-primary hover:-translate-y-1 transition-all duration-300 hover:shadow-lg"
            >
              {/* Top accent line */}
              <div className="h-1 w-full bg-primary" />

              <div className="p-8">
                <div className="w-[72px] h-[72px] bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <industry.icon className="w-9 h-9 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>

                <h3 className="font-semibold text-lg mb-2">{industry.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{industry.description}</p>

                <div className="pt-4 border-t border-border">
                  <a
                    href="#teklif"
                    className="text-sm font-semibold text-primary hover:text-accent flex items-center gap-1.5 transition-colors"
                  >
                    Detaylı Bilgi
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Bottom highlight band */}
              <div className="bg-primary/5 px-8 py-3 border-t border-border">
                <span className="text-technical text-xs text-primary font-semibold">
                  {industry.highlight}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesSection;
