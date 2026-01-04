import { useState, useEffect } from "react";
import { Upload, ArrowRight } from "lucide-react";

const headlines = [
  "Yüksek Hassasiyetli Üretim",
  "Profesyonel CNC Operasyonları",
  "Stabil Kalite & Güvenilir Teslimat",
];

const HeroSection = () => {
  const [currentHeadline, setCurrentHeadline] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-background pt-32 pb-20">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-lines opacity-40" />
      
      {/* Accent Line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />

      <div className="container-industrial relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Overline */}
            <div className="flex items-center gap-4">
              <div className="accent-line" />
              <span className="text-technical text-muted-foreground uppercase tracking-widest">
                CNC Hassas İşleme
              </span>
            </div>

            {/* Rotating Headline */}
            <div className="relative h-32 md:h-40 overflow-hidden">
              {headlines.map((headline, index) => (
                <h1
                  key={index}
                  className={`absolute inset-0 heading-industrial text-4xl md:text-5xl lg:text-6xl transition-all duration-500 ${
                    index === currentHeadline
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  {headline}
                </h1>
              ))}
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              CNC Freze, Torna ve Talaşlı İmalatta; ölçü hassasiyeti, yüksek doğruluk ve 
              proses kontrollü üretim anlayışıyla, stabil kalite ve zamanında teslimat 
              odaklı mühendislik çözümleri sunuyoruz.
            </p>

            {/* Slogan */}
            <p className="text-technical text-primary font-semibold tracking-wide">
              "Disiplinli Operasyon, Güvenilir Üretim."
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#teklif" className="btn-industrial-primary flex items-center justify-center gap-2">
                Teklif Al
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#kabiliyetler" className="btn-industrial-secondary flex items-center justify-center gap-2">
                Kabiliyetleri Gör
              </a>
            </div>
          </div>

          {/* Right Content - CAD Upload Teaser */}
          <div className="relative">
            {/* Technical Frame */}
            <div className="absolute -top-4 -left-4 w-20 h-20 border-l-2 border-t-2 border-primary" />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-r-2 border-b-2 border-primary" />
            
            <div className="bg-card border-2 border-border p-8 md:p-12">
              {/* Upload Zone */}
              <div className="border-2 border-dashed border-border hover:border-primary transition-colors p-12 text-center group cursor-pointer">
                <div className="w-20 h-20 mx-auto mb-6 bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Upload className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="heading-industrial text-xl mb-2">CAD Dosyası Sürükle & Bırak</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  STEP, IGES, DXF, DWG formatları desteklenir
                </p>
                <span className="text-technical text-xs text-primary">
                  veya dosya seçmek için tıklayın
                </span>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
                <div className="text-center">
                  <div className="text-technical text-2xl font-bold text-primary">±0.01</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">mm Tolerans</div>
                </div>
                <div className="text-center">
                  <div className="text-technical text-2xl font-bold text-primary">24h</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Teklif Süresi</div>
                </div>
                <div className="text-center">
                  <div className="text-technical text-2xl font-bold text-primary">50+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Malzeme</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
