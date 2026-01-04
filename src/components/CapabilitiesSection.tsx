import { Monitor, Ruler, CheckCircle, TrendingUp } from "lucide-react";

const capabilities = [
  {
    icon: Monitor,
    title: "Makine Parkuru",
    items: [
      { label: "5 Eksen CNC Freze", value: "DMG MORI, Mazak" },
      { label: "CNC Torna", value: "Doosan, Haas" },
      { label: "EDM/Tel Erozyon", value: "Sodick, Makino" },
      { label: "Taşlama", value: "Studer, Kellenberger" },
    ],
  },
  {
    icon: Ruler,
    title: "Tolerans Aralıkları",
    items: [
      { label: "Standart Tolerans", value: "±0.05mm" },
      { label: "Hassas Tolerans", value: "±0.01mm" },
      { label: "Ultra Hassas", value: "±0.005mm" },
      { label: "Yüzey Kalitesi", value: "Ra 0.4 µm" },
    ],
  },
  {
    icon: CheckCircle,
    title: "CMM & Kalite Kontrol",
    items: [
      { label: "CMM Ölçüm", value: "Zeiss, Hexagon" },
      { label: "Optik Ölçüm", value: "Keyence, OGP" },
      { label: "Yüzey Pürüzlülük", value: "Mitutoyo" },
      { label: "Sertlik Testi", value: "Rockwell, Brinell" },
    ],
  },
  {
    icon: TrendingUp,
    title: "Üretim Kapasitesi",
    items: [
      { label: "Prototip", value: "1-10 adet" },
      { label: "Küçük Seri", value: "10-100 adet" },
      { label: "Orta Seri", value: "100-1000 adet" },
      { label: "Seri Üretim", value: "1000+ adet" },
    ],
  },
];

const CapabilitiesSection = () => {
  return (
    <section id="kabiliyetler" className="section-industrial bg-card border-y border-border">
      <div className="container-industrial">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-px bg-border" />
            <span className="text-technical text-muted-foreground uppercase tracking-widest text-sm">
              Teknik
            </span>
            <div className="w-8 h-px bg-border" />
          </div>
          <h2 className="heading-industrial text-3xl md:text-4xl mb-4">Kabiliyetlerimiz</h2>
        </div>

        {/* Capabilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((capability) => (
            <div key={capability.title} className="bg-background border border-border p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                <div className="w-10 h-10 bg-primary flex items-center justify-center">
                  <capability.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold">{capability.title}</h3>
              </div>
              
              {/* Items */}
              <div className="space-y-4">
                {capability.items.map((item) => (
                  <div key={item.label} className="flex justify-between items-start gap-2">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className="text-technical text-sm font-medium text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
