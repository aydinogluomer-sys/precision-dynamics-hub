import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import serviceFrze from "@/assets/service-cnc-freze.jpg";
import serviceTorna from "@/assets/service-cnc-torna.jpg";
import serviceImalat from "@/assets/service-imalat.jpg";
import serviceLazer from "@/assets/service-lazer.jpg";
import serviceKalip from "@/assets/service-kalip.jpg";
import { TextReveal, StaggerContainer, StaggerItem, SlideIn } from "./ScrollReveal";

const services = [
  {
    image: serviceFrze,
    badge: "Stratejik",
    title: "CNC Freze",
    description:
      "3,4 ve 5 eksenli CNC işleme teknolojimizle karmaşık formlarda üstün yüzey kalitesi; enerji ve havacılık standartlarında hatasız imalat ve teknik raporlama.",
    capabilities: ["5 Eksen İşleme", "Yüzey Kalitesi Ra 0.8"],
  },
  {
    image: serviceTorna,
    badge: "Hassasiyet",
    title: "CNC Torna",
    description:
      "İleri teknoloji CNC torna sistemleri ile mikron düzeyinde tolerans sınırlarını yakalayan yüksek nitelikli parça işleme.",
    capabilities: ["Çift Kafa İşleme", "Otomatik KK Entegrasyonu"],
  },
  {
    image: serviceLazer,
    badge: "İleri Teknoloji",
    title: "Lazer Kesim",
    description:
      "Optimize edilmiş lazer kesim operasyonları ile endüstriyel tasarımlarınızda boyutsal doğruluk ve hızlı prototipleme desteği.",
    capabilities: ["Fiber Lazer 6kW", "Otomatik Yükleme"],
  },
  {
    image: serviceKalip,
    badge: "Üretim",
    title: "Kalıp & Döküm",
    description:
      "Enjeksiyon, basınçlı döküm ve prototip kalıp mühendisliği ile endüstriyel standartlarda yüksek ömürlü ve hassas seri üretim çözümleri.",
    capabilities: ["Enjeksiyon Kalıp", "Alüminyum Döküm"],
  },
  {
    image: serviceImalat,
    badge: "Anahtar Teslim",
    title: "Talaşlı İmalat",
    description:
      "Talaşlı imalat kabiliyetlerimizi hidrolik ve pnömatik sistem entegrasyonlarıyla birleştirerek tam işlevsel modüller ve üretim hatları geliştiriyoruz.",
    capabilities: ["Modüler Sistemler", "Elektromekanik Test"],
  },
];

const ServicesSection = () => {
  return (
    <section id="hizmetler" className="section-industrial bg-background">
      <div className="container-industrial">
        {/* Section Header */}
        <div className="flex flex-col items-center md:items-start md:flex-row md:items-end md:justify-between mb-14">
          <div className="text-center md:text-left">
            <SlideIn direction="left">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                <div className="w-8 h-px bg-border" />
                <span className="text-technical text-muted-foreground uppercase tracking-widest text-sm">
                  Kabiliyetler
                </span>
              </div>
            </SlideIn>
            <TextReveal delay={0.1}>
              <h2 className="heading-industrial text-3xl md:text-4xl mb-2">
                Mühendislik Hizmetlerimiz
              </h2>
            </TextReveal>
            <p className="text-sm text-muted-foreground max-w-lg">
              Tasarımdan seri üretime, her adımda mühendislik odaklı çözümler
            </p>
          </div>
          <a
            href="#kabiliyetler"
            className="mt-4 md:mt-0 text-sm font-medium text-primary hover:text-accent flex items-center gap-1.5 transition-colors"
          >
            Tüm Kabiliyetleri Görüntüle
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile layout: 2-col grid, last item spans 2 */}
        <StaggerContainer className="grid grid-cols-2 gap-4 mb-12 lg:hidden">
          {services.map((s, i) => (
            <StaggerItem key={s.title} className={i === services.length - 1 ? "col-span-2" : ""}>
              <ServiceCard service={s} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Desktop layout: 3+2 */}
        <div className="hidden lg:block">
          <StaggerContainer className="grid lg:grid-cols-3 gap-6 mb-6">
            {services.slice(0, 3).map((s) => (
              <StaggerItem key={s.title}>
                <ServiceCard service={s} />
              </StaggerItem>
            ))}
          </StaggerContainer>
          <StaggerContainer className="grid lg:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {services.slice(3).map((s) => (
              <StaggerItem key={s.title}>
                <ServiceCard service={s} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

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
            <a href="/teklif-al" className="btn-industrial-primary whitespace-nowrap">
              Danışmanlık Al
            </a>
            <a href="/iletisim" className="btn-industrial-secondary whitespace-nowrap">
              Bize Ulaşın
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service }: { service: (typeof services)[number] }) => (
  <motion.div
    className="group relative border border-border bg-card overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-xl h-full"
    whileHover={{ y: -6, scale: 1.01 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    {/* Service Image with parallax zoom */}
    <div className="relative h-48 overflow-hidden">
      <motion.img
        src={service.image}
        alt={service.title}
        className="w-full h-full object-cover"
        loading="lazy"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
      <span className="absolute top-4 left-4 text-technical text-[11px] font-semibold text-primary-foreground bg-primary px-3 py-1 uppercase tracking-widest">
        {service.badge}
      </span>
    </div>

    <div className="p-8">
      <h3 className="heading-industrial text-xl mb-3">{service.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6">{service.description}</p>

      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
        {service.capabilities.map((cap) => (
          <span key={cap} className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary inline-block shrink-0" />
            {cap}
          </span>
        ))}
      </div>

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
