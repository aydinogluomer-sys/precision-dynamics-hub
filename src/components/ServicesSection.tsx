import { Cog, CircleDot, Layers, Zap, Box, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Cog,
    title: "CNC Freze",
    description: "3, 4 ve 5 eksenli CNC freze işleme ile karmaşık geometrilerde yüksek hassasiyetli üretim.",
    capabilities: ["5 Eksen İşleme", "Yüzey Kalitesi Ra 0.8", "Max 2000x1000mm"],
  },
  {
    icon: CircleDot,
    title: "CNC Torna",
    description: "Hassas torna işleme ile silindirik parçalarda mikron seviyesinde tolerans kontrolü.",
    capabilities: ["CNC Otomat", "Çift Kafa İşleme", "Ø500mm Kapasite"],
  },
  {
    icon: Layers,
    title: "Talaşlı İmalat",
    description: "Geleneksel ve CNC destekli talaşlı imalat operasyonları ile çeşitli metal işleme çözümleri.",
    capabilities: ["Taşlama", "Honlama", "Broşlama"],
  },
  {
    icon: Zap,
    title: "Lazer Kesim",
    description: "Fiber lazer teknolojisi ile hızlı ve hassas sac metal kesim operasyonları.",
    capabilities: ["6kW Fiber Lazer", "25mm Çelik", "Otomatik Yükleme"],
  },
  {
    icon: Box,
    title: "Kalıp & Döküm",
    description: "Enjeksiyon kalıpları, basınçlı döküm kalıpları ve prototip kalıp imalatı.",
    capabilities: ["Enjeksiyon Kalıp", "Alüminyum Döküm", "Prototip"],
  },
];

const ServicesSection = () => {
  return (
    <section id="hizmetler" className="section-industrial bg-background">
      <div className="container-industrial">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-px bg-border" />
            <span className="text-technical text-muted-foreground uppercase tracking-widest text-sm">
              Çözümler
            </span>
            <div className="w-8 h-px bg-border" />
          </div>
          <h2 className="heading-industrial text-3xl md:text-4xl mb-4">Hizmetlerimiz</h2>
          <p className="subheading-industrial text-lg max-w-2xl mx-auto">
            Kapsamlı CNC Üretim Çözümleri
          </p>
        </div>

        {/* Top row: 3 cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {services.slice(0, 3).map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>

        {/* Bottom row: 2 cards centered */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.slice(3).map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service }: { service: typeof services[number] }) => (
  <div className="group relative border border-border bg-card p-0 overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg">
    {/* Accent top bar */}
    <div className="h-1 w-0 bg-primary group-hover:w-full transition-all duration-500" />

    <div className="p-8">
      {/* Icon + Title row */}
      <div className="flex items-start gap-5 mb-5">
        <div className="w-14 h-14 shrink-0 bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
          <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
        </div>
        <div>
          <h3 className="heading-industrial text-xl mb-1">{service.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>

      {/* Capabilities */}
      <div className="flex flex-wrap gap-2 mb-6 pl-[76px]">
        {service.capabilities.map((cap) => (
          <span
            key={cap}
            className="text-technical text-xs px-3 py-1.5 bg-muted text-muted-foreground border border-border"
          >
            {cap}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-6 pt-5 border-t border-border pl-[76px]">
        <a
          href={`#${service.title.toLowerCase().replace(/\s/g, "-")}`}
          className="text-sm font-semibold text-primary hover:text-accent flex items-center gap-1.5 transition-colors"
        >
          İncele
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
        <a
          href="#teklif"
          className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
        >
          Teklif Al
        </a>
      </div>
    </div>
  </div>
);

export default ServicesSection;
