import { Target, RefreshCw, Clock, Wrench } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Hassasiyet & Tolerans Disiplini",
    description: "±0.01mm hassasiyetle çalışan CNC tezgahlarımız ve CMM ölçüm sistemimiz ile tolerans garantisi sağlıyoruz.",
    metric: "±0.01mm",
    metricLabel: "Tolerans",
  },
  {
    icon: RefreshCw,
    title: "Proses Kontrollü Üretim",
    description: "Her üretim adımı izlenir, kaydedilir ve raporlanır. Tekrarlanabilir kalite için sistematik yaklaşım.",
    metric: "100%",
    metricLabel: "İzlenebilirlik",
  },
  {
    icon: Clock,
    title: "Zamanında Teslimat",
    description: "Söz verilen tarihte teslimat. Proje planınızı aksatmayacak güvenilir lojistik süreçleri.",
    metric: "98%",
    metricLabel: "Zamanında Teslimat",
  },
  {
    icon: Wrench,
    title: "Mühendislik Desteği",
    description: "DFM analizi, malzeme seçimi ve tasarım optimizasyonu konularında uzman mühendislik desteği.",
    metric: "24h",
    metricLabel: "Yanıt Süresi",
  },
];

const WhyUsSection = () => {
  return (
    <section id="neden-biz" className="section-industrial bg-background">
      <div className="container-industrial">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-px bg-border" />
            <span className="text-technical text-muted-foreground uppercase tracking-widest text-sm">
              Avantajlar
            </span>
            <div className="w-8 h-px bg-border" />
          </div>
          <h2 className="heading-industrial text-3xl md:text-4xl mb-4">Neden Mas Technic?</h2>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="card-industrial group relative overflow-hidden"
            >
              {/* Background Number */}
              <div className="absolute top-4 right-4 text-technical text-7xl font-bold text-muted/20">
                {String(index + 1).padStart(2, "0")}
              </div>
              
              {/* Icon */}
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors relative z-10">
                <value.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              
              {/* Content */}
              <h3 className="heading-industrial text-lg mb-3 relative z-10">{value.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 relative z-10">
                {value.description}
              </p>
              
              {/* Metric */}
              <div className="pt-4 border-t border-border relative z-10">
                <div className="text-technical text-2xl font-bold text-primary">{value.metric}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{value.metricLabel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
