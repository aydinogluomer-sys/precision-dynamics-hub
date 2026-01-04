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

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.title} className="card-industrial group">
              {/* Icon */}
              <div className="w-16 h-16 bg-muted flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <service.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              
              {/* Content */}
              <h3 className="heading-industrial text-xl mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              
              {/* Capabilities */}
              <div className="flex flex-wrap gap-2 mb-6">
                {service.capabilities.map((cap) => (
                  <span
                    key={cap}
                    className="text-technical text-xs px-2 py-1 bg-muted text-muted-foreground"
                  >
                    {cap}
                  </span>
                ))}
              </div>
              
              {/* Actions */}
              <div className="flex gap-4 pt-4 border-t border-border">
                <a
                  href={`#${service.title.toLowerCase().replace(/\s/g, "-")}`}
                  className="text-sm font-medium text-primary hover:text-accent flex items-center gap-1 transition-colors"
                >
                  İncele
                  <ArrowRight className="w-3 h-3" />
                </a>
                <a
                  href="#teklif"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                >
                  Teklif Al
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
