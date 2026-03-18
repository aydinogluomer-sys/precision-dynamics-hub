import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import serviceFrze from "@/assets/service-cnc-freze.jpg";
import serviceTorna from "@/assets/service-cnc-torna.jpg";
import serviceImalat from "@/assets/service-imalat.jpg";
import serviceLazer from "@/assets/service-lazer.jpg";
import serviceKalip from "@/assets/service-kalip.jpg";
import { TextReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";
import { BlurImage } from "./BlurImage";

const services = [
  {
    image: serviceFrze,
    title: "5 Eksen CNC Frezeleme",
    description: "Karmaşık geometrilerde üstün yüzey kalitesi; havacılık ve enerji standartlarında hassas imalat.",
    link: "/hizmetler/cnc-frezeleme",
  },
  {
    image: serviceTorna,
    title: "CNC Torna İşleme",
    description: "Mikron düzeyinde tolerans sınırlarını yakalayan yüksek nitelikli silindirik parça işleme.",
    link: "/hizmetler/cnc-tornalama",
  },
  {
    image: serviceImalat,
    title: "Talaşlı İmalat",
    description: "Hidrolik ve pnömatik sistem entegrasyonlarıyla tam işlevsel modüller ve üretim hatları.",
    link: "/hizmetler/talasli-imalat",
  },
];

const ServicesSection = () => {
  return (
    <section id="hizmetler" className="section-industrial min-h-screen flex flex-col justify-center" style={{ backgroundColor: "hsl(var(--forge-concrete))" }}>
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
                Kabiliyetler
              </span>
            </div>
            <h2 className="heading-industrial text-3xl md:text-4xl mb-2">
              Üretim Hizmetlerimiz
            </h2>
            <p className="text-sm text-foreground/60 max-w-lg">
              Tasarımdan seri üretime kadar her adımda mühendislik odaklı çözümler sunuyoruz
            </p>
          </div>
          <Link
            to="/hizmetler/cnc-frezeleme"
            className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1.5 transition-colors whitespace-nowrap"
          >
            Tüm Hizmetler <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Service Cards - 3 columns */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 mb-12">
          {services.map((s) => (
            <StaggerItem key={s.title}>
              <ServiceCard service={s} />
            </StaggerItem>
          ))}
        </StaggerContainer>

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
              Üretim hattınızı optimize etmeye hazır mısınız?
            </h3>
            <p className="text-foreground/60 text-sm">
              Kapsamlı teknik danışmanlık için baş mühendislerimizle görüşün.
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            <Link to="/teklif-al" className="whitespace-nowrap px-8 py-4 font-semibold uppercase tracking-wider text-sm border-2 transition-all duration-200" style={{ backgroundColor: "hsl(var(--forge-molten))", borderColor: "hsl(var(--forge-molten))", color: "#ffffff" }}>
              Danışmanlık Al
            </Link>
            <Link to="/iletisim" className="btn-industrial-secondary whitespace-nowrap">
              Bize Ulaşın
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service }: { service: (typeof services)[number] }) => (
  <motion.div
    className="group relative border border-border bg-card overflow-hidden hover:border-primary transition-all duration-300 h-full"
    whileHover={{ y: -4 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    {/* Image */}
    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }}>
      <div className="relative h-52 overflow-hidden">
        <BlurImage
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
      </div>
    </motion.div>

    {/* Content */}
    <div className="p-6">
      <h3 className="heading-industrial text-lg mb-3">{service.title}</h3>
      <p className="text-foreground/60 text-sm leading-relaxed mb-6">{service.description}</p>

      <Link
        to={service.link}
        className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1.5 transition-colors"
      >
        Teknik Detaylar
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  </motion.div>
);

export default ServicesSection;
