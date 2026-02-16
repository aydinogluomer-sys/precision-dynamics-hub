import { Upload, MessageSquare, Settings, Truck } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Dosyanızı Yükleyin",
    description: "CAD dosyanızı yükleyin veya teknik çizimlerinizi gönderin. STEP, IGES, DXF formatları desteklenir.",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Teknik Analiz & Geri Bildirim",
    description: "Mühendislerimiz tasarımınızı inceler, imalat uygunluğunu değerlendirir ve size detaylı teklif sunar.",
  },
  {
    number: "03",
    icon: Settings,
    title: "Üretim & Kalite Kontrol",
    description: "Onaylanan tasarımlar hassas CNC tezgahlarımızda üretilir ve CMM ile kalite kontrolden geçer.",
  },
  {
    number: "04",
    icon: Truck,
    title: "Sevkiyat & Teslimat",
    description: "Güvenli paketleme ile parçalarınız zamanında ve hasarsız şekilde adresinize teslim edilir.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const HowWeWorkSection = () => {
  return (
    <section className="section-industrial bg-card border-y border-border">
      <div className="container-industrial">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-px bg-border" />
            <span className="text-technical text-muted-foreground uppercase tracking-widest text-sm">
              Süreç
            </span>
            <div className="w-8 h-px bg-border" />
          </div>
          <h2 className="heading-industrial text-3xl md:text-4xl mb-4">Nasıl Çalışıyoruz?</h2>
          <p className="subheading-industrial text-lg max-w-2xl mx-auto">
            Tekliften Teslimata Sorunsuz Üretim Süreci
          </p>
        </motion.div>

        {/* Steps - Horizontal Timeline */}
        <div className="relative">
          {/* Connector line - desktop only */}
          <div className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px bg-border" />

          {/* Timeline dots - desktop only */}
          {steps.map((_, i) => (
            <div
              key={i}
              className="hidden lg:block absolute top-[48px] w-3 h-3 bg-primary"
              style={{ left: `calc(${12.5 + (i * 75) / 3}% - 6px)` }}
            />
          ))}

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={cardVariants}
                className="relative flex flex-col items-center text-center group hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
              >
                {/* Watermark number */}
                <span className="absolute top-0 right-4 text-7xl font-bold text-muted-foreground/5 select-none pointer-events-none text-technical">
                  {step.number}
                </span>

                {/* Icon box */}
                <div className="relative z-10 w-[104px] h-[104px] border-2 border-border bg-background flex items-center justify-center mb-8 group-hover:border-primary group-hover:bg-primary group-hover:shadow-lg transition-all duration-300">
                  <step.icon className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>

                {/* Step number badge */}
                <span className="text-technical text-xs font-bold text-primary bg-primary/10 px-3 py-1 mb-4">
                  ADIM {step.number}
                </span>

                {/* Content */}
                <h3 className="heading-industrial text-lg mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[260px]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
