import { ArrowRight } from "lucide-react";

const FinalCTASection = () => {
  return (
    <section
      id="iletisim"
      className="section-industrial text-center"
      style={{
        background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)",
        color: "white",
      }}
    >
      <div className="container-industrial">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight mb-3"
            style={{ letterSpacing: "-0.01em", lineHeight: 1.1 }}
          >
            Projenizi Hayata Geçirmeye Hazır mısınız?
          </h2>
          <p
            className="text-lg mb-10"
            style={{ color: "rgba(255, 255, 255, 0.85)", lineHeight: 1.6 }}
          >
            CAD dosyanızı gönderin, 24 saat içinde detaylı teknik analiz ve fiyat teklifi alın.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#teklif"
              className="px-10 py-4 font-semibold text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all"
              style={{
                background: "transparent",
                border: "2px solid white",
                color: "white",
              }}
            >
              Teklif Al
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#kabiliyetler"
              className="px-10 py-4 font-semibold text-sm uppercase tracking-wider inline-flex items-center justify-center transition-all hover:bg-black hover:text-white"
              style={{
                background: "white",
                color: "#000",
                border: "2px solid transparent",
              }}
            >
              Portföyümüz
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
