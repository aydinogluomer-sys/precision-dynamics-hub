import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Mas Technic ile 5 yıldır çalışıyoruz. Havacılık parçalarımızda hiç kalite sorunu yaşamadık. Tolerans disiplinleri ve zamanında teslimatları ile güvenilir bir iş ortağı.",
    author: "Mehmet Yılmaz",
    title: "Satınalma Müdürü",
    company: "TAI - Türk Havacılık ve Uzay Sanayii",
  },
  {
    quote: "Prototip süreçlerimizde hız ve kalite dengesini mükemmel sağlıyorlar. DFM analizleri sayesinde tasarımlarımızı optimize ettik ve maliyetlerimizi düşürdük.",
    author: "Ayşe Kaya",
    title: "Ar-Ge Mühendisi",
    company: "Ford Otosan",
  },
  {
    quote: "Medikal implant üretiminde güvenilirlik kritik. Mas Technic'in ISO 13485 uyumlu süreçleri ve izlenebilirlik sistemi tam aradığımız standartları karşılıyor.",
    author: "Dr. Can Öztürk",
    title: "Üretim Direktörü",
    company: "Medtronic Türkiye",
  },
];

const clients = [
  "TAI", "Ford Otosan", "Arçelik", "Vestel", "Aselsan", "Roketsan", "MAN Türkiye", "Bosch"
];

const TestimonialsSection = () => {
  return (
    <section className="section-industrial bg-background">
      <div className="container-industrial">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-px bg-border" />
            <span className="text-technical text-muted-foreground uppercase tracking-widest text-sm">
              Referanslar
            </span>
            <div className="w-8 h-px bg-border" />
          </div>
          <h2 className="heading-industrial text-3xl md:text-4xl mb-4">Bizi Tercih Edenler</h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card-industrial">
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-primary/20 mb-4" />
              
              {/* Quote */}
              <p className="text-muted-foreground leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>
              
              {/* Author */}
              <div className="pt-4 border-t border-border">
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                <div className="text-technical text-sm text-primary mt-1">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Clients Band */}
        <div className="border-t border-b border-border py-8">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {clients.map((client) => (
              <div
                key={client}
                className="text-xl font-bold text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              >
                {client}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
