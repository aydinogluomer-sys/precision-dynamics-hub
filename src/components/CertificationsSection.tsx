import { ShieldCheck } from "lucide-react";

const certifications = [
  { name: "ISO 9001:2015", description: "Kalite Yönetim Sistemi" },
  { name: "AS9100D", description: "Havacılık Kalite Standardı" },
  { name: "ISO 14001", description: "Çevre Yönetim Sistemi" },
  { name: "IATF 16949", description: "Otomotiv Kalite Standardı" },
  { name: "CE", description: "Avrupa Uygunluk Belgesi" },
];

const CertificationsSection = () => {
  return (
    <section className="py-16 bg-foreground text-background border-y border-border">
      <div className="container-industrial">
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span className="text-technical text-primary uppercase tracking-widest text-xs">
              Sertifikalar & Kalite Güvencesi
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="flex flex-col items-center text-center p-6 border border-muted-foreground/20 bg-muted-foreground/5 hover:border-primary hover:bg-primary/10 transition-all duration-300 group"
            >
              <div className="w-14 h-14 border-2 border-muted-foreground/30 flex items-center justify-center mb-4 group-hover:border-primary transition-colors">
                <span className="text-technical text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors">
                  {cert.name.length <= 4 ? cert.name : cert.name.slice(0, 3)}
                </span>
              </div>
              <div className="font-semibold text-sm mb-1">{cert.name}</div>
              <div className="text-xs text-muted-foreground">{cert.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
