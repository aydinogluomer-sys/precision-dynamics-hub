import { motion } from "framer-motion";

const certifications = [
  "ISO 9001:2015",
  "AS9100D",
  "IATF 16949",
  "ISO 13485",
  "NIST 800-171",
];

const CertificationsSection = () => {
  return (
    <section id="sertifikalar" className="py-10 md:py-14 border-y border-border" style={{ backgroundColor: "#3d5a5b" }}>
      <style>{`.dark #sertifikalar { background-color: hsl(var(--moody-teal)) !important; }`}</style>
      <div className="container-industrial">
        <motion.div
          className="flex flex-wrap justify-center items-center gap-6 md:gap-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {certifications.map((cert, i) => (
            <motion.span
              key={cert}
              className="text-sm md:text-base font-semibold tracking-wide transition-colors duration-300 cursor-default font-mono"
              style={{ color: "#ffffff" }}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * i, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {cert}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
