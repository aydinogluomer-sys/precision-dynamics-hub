import { ArrowRight } from "lucide-react";

const materials = [
  {
    name: "Alüminyum",
    grades: ["6061-T6", "7075-T6", "2024"],
    color: "bg-slate-200",
  },
  {
    name: "Çelik",
    grades: ["1045", "4140", "A36"],
    color: "bg-slate-400",
  },
  {
    name: "Paslanmaz",
    grades: ["304", "316L", "17-4 PH"],
    color: "bg-slate-300",
  },
  {
    name: "Pirinç",
    grades: ["C360", "C260", "C280"],
    color: "bg-amber-200",
  },
  {
    name: "Plastik",
    grades: ["Delrin", "PEEK", "Nylon"],
    color: "bg-gray-100",
  },
];

const MaterialsSection = () => {
  return (
    <section id="malzemeler" className="section-industrial bg-card border-y border-border">
      <div className="container-industrial">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-px bg-border" />
            <span className="text-technical text-muted-foreground uppercase tracking-widest text-sm">
              Malzeme
            </span>
            <div className="w-8 h-px bg-border" />
          </div>
          <h2 className="heading-industrial text-3xl md:text-4xl mb-4">Çalıştığımız Malzemeler</h2>
          <p className="subheading-industrial text-lg max-w-2xl mx-auto">
            50'den fazla malzeme arasından seçim yapın
          </p>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {materials.map((material) => (
            <div
              key={material.name}
              className="bg-background border border-border p-6 hover:border-primary transition-colors group cursor-pointer"
            >
              {/* Material Swatch */}
              <div className={`w-full h-16 ${material.color} mb-4 border border-border`} />
              
              {/* Material Name */}
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {material.name}
              </h3>
              
              {/* Grades */}
              <div className="flex flex-wrap gap-1">
                {material.grades.map((grade) => (
                  <span key={grade} className="text-technical text-xs text-muted-foreground">
                    {grade}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#tum-malzemeler"
            className="btn-industrial-secondary inline-flex items-center gap-2"
          >
            Tüm Malzemeler
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default MaterialsSection;
