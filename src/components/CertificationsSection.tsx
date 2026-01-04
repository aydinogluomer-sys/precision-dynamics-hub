const certifications = [
  { name: "ISO 9001:2015", description: "Kalite Yönetim Sistemi" },
  { name: "AS9100D", description: "Havacılık Kalite Standardı" },
  { name: "ISO 14001", description: "Çevre Yönetim Sistemi" },
  { name: "IATF 16949", description: "Otomotiv Kalite Standardı" },
  { name: "CE", description: "Avrupa Uygunluk Belgesi" },
];

const CertificationsSection = () => {
  return (
    <section className="py-12 bg-muted border-y border-border">
      <div className="container-industrial">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {certifications.map((cert) => (
            <div key={cert.name} className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-background border border-border flex items-center justify-center group-hover:border-primary transition-colors">
                <span className="text-technical text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors">
                  {cert.name.slice(0, 3)}
                </span>
              </div>
              <div>
                <div className="font-semibold text-sm">{cert.name}</div>
                <div className="text-xs text-muted-foreground">{cert.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
