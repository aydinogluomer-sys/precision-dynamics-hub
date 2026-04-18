import { Linkedin, Instagram, Mail, MapPin, Phone } from "lucide-react";

/**
 * Footer marka bloğu — mobil (centered) ve desktop (sol-hizalı) varyantı tek prop'la döner.
 */
export const FooterBrand = ({ centered = false }: { centered?: boolean }) => {
  const justify = centered ? "justify-center" : "";
  return (
    <div className={centered ? "mb-8 text-center" : ""}>
      <div className={`flex items-center gap-3 mb-5 ${justify}`}>
        <div className="w-10 h-10 bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-lg">MT</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-base tracking-tight" style={{ color: "var(--text-primary)" }}>
            MAS TECHNIC
          </span>
          <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: "var(--text-technical)" }}>
            Precision CNC
          </span>
        </div>
      </div>
      <p className={`text-xs leading-relaxed mb-5 max-w-xs ${centered ? "mx-auto" : ""}`} style={{ color: "var(--text-secondary)" }}>
        CNC Freze, Torna ve Talaşlı İmalatta; ölçü hassasiyeti, yüksek doğruluk ve proses kontrollü üretim anlayışıyla hizmet veriyoruz.
      </p>
      <div className={`${centered ? "flex flex-col items-center" : "space-y-2.5"} gap-2.5 mb-5`}>
        {[
          { icon: Phone, text: "+90 (536) 564 51 94" },
          { icon: Mail, text: "info@mastechnic.com" },
          { icon: MapPin, text: "İzmir, Türkiye" },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2.5 text-xs" style={{ color: "var(--text-secondary)" }}>
            <Icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span>{text}</span>
          </div>
        ))}
      </div>
      <div className={`flex gap-2 ${justify}`}>
        {[
          { icon: Linkedin, label: "in" },
          { icon: null, label: "X" },
          { icon: Instagram, label: null },
        ].map((item, i) => (
          <a
            key={i}
            href="#"
            className="w-8 h-8 flex items-center justify-center text-xs font-semibold transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
            style={{ border: "1px solid var(--surface-border)", color: "var(--text-secondary)" }}
          >
            {item.label ? item.label : item.icon && <item.icon className="w-3.5 h-3.5" />}
          </a>
        ))}
      </div>
    </div>
  );
};
