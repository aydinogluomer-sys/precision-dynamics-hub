import { Check } from "lucide-react";
import { motion } from "framer-motion";

const certifications = [
  { name: "ISO 9001:2015", description: "Kalite Yönetim Sistemi" },
  { name: "AS9100D", description: "Havacılık Kalite Standardı" },
  { name: "ISO 14001", description: "Çevre Yönetim Sistemi" },
  { name: "IATF 16949", description: "Otomotiv Kalite Standardı" },
  { name: "CE", description: "Avrupa Uygunluk Belgesi" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] as const } },
};

const CertificationsSection = () => {
  return (
    <section
      id="sertifikalar"
      className="py-16"
      style={{ background: "#f8fafc", borderTop: "1px solid hsl(var(--border))" }}
    >
      <div className="container-industrial">
        <motion.div
          className="flex flex-col items-center mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="text-xs font-semibold uppercase tracking-[0.4em] mb-3 block"
            style={{ color: "hsl(var(--primary))" }}
          >
            Sertifikalar
          </span>
          <p className="text-sm text-muted-foreground">
            Uluslararası standartlarda sertifikalı üretim
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.name}
              variants={itemVariants}
              className="inline-flex items-center gap-3 px-6 py-4 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              style={{
                border: "1px solid hsl(var(--border))",
                minWidth: "220px",
              }}
            >
              <Check className="w-[18px] h-[18px] text-primary flex-shrink-0" strokeWidth={3} />
              <div>
                <span className="font-semibold text-sm block font-mono">{cert.name}</span>
                <span className="text-xs text-muted-foreground">{cert.description}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom border line aligned with last badge */}
        <div className="flex justify-center mt-8">
          <div className="w-full max-w-4xl h-px" style={{ background: "hsl(var(--border))" }} />
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
