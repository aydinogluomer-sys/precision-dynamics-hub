import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

const FinalCTASection = () => {
  return (
    <section id="iletisim" className="section-industrial bg-background">
      <div className="container-industrial">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA */}
          <div className="text-center mb-16">
            <h2 className="heading-industrial text-3xl md:text-4xl lg:text-5xl mb-6">
              Projenizi Hayata Geçirmeye Hazır mısınız?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              CAD dosyanızı gönderin, 24 saat içinde detaylı teknik analiz ve fiyat teklifi alın.
            </p>
            <a
              href="#teklif"
              className="btn-industrial-primary inline-flex items-center gap-2 text-lg px-12 py-5"
            >
              Teklif Al
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Telefon</h3>
                <a href="tel:+902121234567" className="text-muted-foreground hover:text-primary transition-colors">
                  +90 212 123 45 67
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">E-posta</h3>
                <a href="mailto:info@mastechnic.com" className="text-muted-foreground hover:text-primary transition-colors">
                  info@mastechnic.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Adres</h3>
                <p className="text-muted-foreground">
                  Organize Sanayi Bölgesi<br />
                  İstanbul, Türkiye
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
