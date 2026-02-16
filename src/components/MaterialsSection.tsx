import { motion } from "framer-motion";
import { Check } from "lucide-react";

const materials = [
  {
    name: "Alüminyum",
    typeCode: "6061-T6 / 7075-T6 / 2024",
    color: "hsl(var(--primary))",
    specs: [
      { label: "SERTLIK", value: "95 HB" },
      { label: "YOĞUNLUK", value: "2.7 g/cm³" },
      { label: "ÇEKME", value: "310 MPa" },
    ],
  },
  {
    name: "Çelik",
    typeCode: "1045 / 4140 / A36",
    color: "#EA580C",
    specs: [
      { label: "SERTLIK", value: "201 HB" },
      { label: "YOĞUNLUK", value: "7.85 g/cm³" },
      { label: "ÇEKME", value: "585 MPa" },
    ],
  },
  {
    name: "Paslanmaz",
    typeCode: "304 / 316L / 17-4 PH",
    color: "#64748B",
    specs: [
      { label: "SERTLIK", value: "201 HB" },
      { label: "YOĞUNLUK", value: "8.0 g/cm³" },
      { label: "ÇEKME", value: "515 MPa" },
    ],
  },
  {
    name: "Pirinç",
    typeCode: "C360 / C260 / C280",
    color: "#D97706",
    specs: [
      { label: "SERTLIK", value: "78 HB" },
      { label: "YOĞUNLUK", value: "8.5 g/cm³" },
      { label: "ÇEKME", value: "338 MPa" },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const MaterialsSection = () => {
  return (
    <section
      id="malzemeler"
      className="section-industrial relative overflow-hidden"
      style={{ backgroundColor: "#020617" }}
    >
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(6, 136, 173, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 136, 173, 0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 30% 70%, rgba(6, 136, 173, 0.12) 0%, transparent 50%)",
        }}
      />

      <div className="container-industrial relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-xs font-semibold uppercase tracking-[0.4em] mb-3 block"
            style={{ color: "hsl(var(--primary))" }}
          >
            Malzeme
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Çalıştığımız Malzemeler
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
            50'den fazla malzeme ve alaşım seçeneği ile endüstriyel ihtiyaçlarınıza çözüm
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {materials.map((mat, i) => (
            <motion.div
              key={mat.name}
              variants={cardVariants}
              className="relative h-[420px] overflow-hidden cursor-pointer transition-all duration-500 group"
              style={{
                background: "rgba(15, 23, 42, 0.5)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              {/* Index */}
              <div
                className="absolute top-0 right-0 p-6 text-[10px]"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#1e293b",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-10 flex flex-col justify-end z-20">
                <div
                  className="w-12 h-1 mb-6 transition-all duration-300 group-hover:w-16"
                  style={{ background: mat.color }}
                />
                <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                  {mat.name}
                </h3>
                <div
                  className="text-[10px] tracking-[0.2em] mb-6"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "#64748b",
                  }}
                >
                  {mat.typeCode}
                </div>

                {/* Specs on hover */}
                <div
                  className="pt-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                  style={{ borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}
                >
                  {mat.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex justify-between mb-3"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "10px",
                      }}
                    >
                      <span style={{ color: "#64748b" }}>{spec.label}</span>
                      <span className="text-white">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom badges */}
        <div
          className="flex flex-wrap justify-center items-center gap-6 pt-8"
          style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
        >
          {["50+ Malzeme Seçeneği", "Sertifikalı Tedarikçiler", "Malzeme Test Raporları"].map(
            (badge, i) => (
              <span
                key={badge}
                className="inline-flex items-center gap-2 text-sm"
                style={{ color: "rgba(255, 255, 255, 0.85)" }}
              >
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                {badge}
                {i < 2 && (
                  <span className="ml-4" style={{ color: "rgba(255, 255, 255, 0.3)" }}>
                    ·
                  </span>
                )}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default MaterialsSection;
