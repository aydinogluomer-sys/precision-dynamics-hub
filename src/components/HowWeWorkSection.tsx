import { Upload, MessageSquare, Settings, Truck, ArrowRight } from "lucide-react";

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

const HowWeWorkSection = () => {
  return (
    <section className="section-industrial bg-card border-y border-border">
      <div className="container-industrial">
        {/* Section Header */}
        <div className="text-center mb-16">
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
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative group">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-border z-0">
                  <ArrowRight className="absolute right-0 -top-2 w-4 h-4 text-muted-foreground" />
                </div>
              )}
              
              <div className="card-industrial h-full relative z-10 bg-background">
                {/* Step Number */}
                <div className="text-technical text-5xl font-bold text-muted/50 mb-4">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <step.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                
                {/* Content */}
                <h3 className="heading-industrial text-lg mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
