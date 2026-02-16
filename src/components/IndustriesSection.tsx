import { Plane, Car, Heart, Bot, ArrowRight } from "lucide-react";

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

const IndustriesSection = () => {
  return (
    <section className="section-industrial bg-muted border-y border-border">
      <div className="container-industrial">
        {/* Header */}
        <div className="text-center mb-16">
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry) => (
            <div
              key={industry.name}
              className="group bg-background border border-border p-8 hover:border-primary transition-all duration-300 hover:shadow-lg relative overflow-hidden"
            >
              {/* Accent line */}
              <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-500" />

              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <industry.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>

              <h3 className="font-semibold text-lg mb-2">{industry.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{industry.description}</p>

              {/* Highlight badge */}
              <span className="text-technical text-xs text-primary bg-primary/10 px-3 py-1.5 inline-block mb-5">
                {industry.highlight}
              </span>

              <div className="pt-4 border-t border-border">
                <a
                  href="#teklif"
                  className="text-sm font-medium text-primary hover:text-accent flex items-center gap-1.5 transition-colors"
                >
                  Detaylı Bilgi
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
