import { Plane, Car, Heart, Bot } from "lucide-react";

const industries = [
  {
    icon: Plane,
    name: "Havacılık & Uzay",
    description: "AS9100D sertifikalı havacılık parçaları",
  },
  {
    icon: Car,
    name: "Otomotiv",
    description: "IATF 16949 kalite standartlarında üretim",
  },
  {
    icon: Heart,
    name: "Tıbbi",
    description: "ISO 13485 uyumlu medikal bileşenler",
  },
  {
    icon: Bot,
    name: "Robotik",
    description: "Hassas hareket sistemleri ve aktüatörler",
  },
];

const IndustriesSection = () => {
  return (
    <section className="py-16 bg-foreground text-background">
      <div className="container-industrial">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {industries.map((industry) => (
            <div
              key={industry.name}
              className="text-center group"
            >
              <div className="w-20 h-20 mx-auto mb-4 border-2 border-muted-foreground/30 flex items-center justify-center group-hover:border-primary transition-colors">
                <industry.icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-semibold text-lg mb-1">{industry.name}</h3>
              <p className="text-sm text-muted-foreground">{industry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
