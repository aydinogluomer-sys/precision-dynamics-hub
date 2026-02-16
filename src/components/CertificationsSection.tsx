import { ShieldCheck } from "lucide-react";
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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const CertificationsSection = () => {
  return (
    <section className="py-16 bg-foreground text-background border-y border-border">
      <div className="container-industrial">
        <motion.div
          className="flex flex-col items-center mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span className="text-technical text-primary uppercase tracking-widest text-xs">
              Sertifikalar & Kalite Güvencesi
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-8">
            Uluslararası standartlarda sertifikalı üretim
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.name}
              variants={itemVariants}
              className="flex flex-col items-center text-center p-8 border border-muted-foreground/20 bg-muted-foreground/5 hover:border-primary hover:bg-primary/20 transition-all duration-300 group"
            >
              <ShieldCheck className="w-10 h-10 text-muted-foreground/40 group-hover:text-primary transition-colors duration-300 mb-4" />
              <div className="font-semibold text-sm mb-1">{cert.name}</div>
              <div className="text-xs text-muted-foreground">{cert.description}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
