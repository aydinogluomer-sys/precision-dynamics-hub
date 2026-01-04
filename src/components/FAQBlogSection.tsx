import { ChevronDown, ArrowRight } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Minimum sipariş adedi nedir?",
    answer: "Minimum sipariş adedi bulunmamaktadır. Tek parça prototipten seri üretime kadar her ölçekte hizmet veriyoruz.",
  },
  {
    question: "Hangi dosya formatlarını kabul ediyorsunuz?",
    answer: "STEP, IGES, DXF, DWG, SOLIDWORKS (.sldprt, .sldasm), Autodesk Inventor (.ipt), PDF ve 2D teknik çizim formatlarını kabul ediyoruz.",
  },
  {
    question: "Teslim süresi ne kadardır?",
    answer: "Prototip üretimde 3-5 iş günü, küçük serilerde 1-2 hafta, seri üretimde proje bazlı planlama yapılır. Acil üretim seçeneğimiz de mevcuttur.",
  },
  {
    question: "Kalite belgeniz var mı?",
    answer: "ISO 9001:2015, AS9100D, IATF 16949 ve ISO 14001 belgelerine sahibiz. Havacılık, otomotiv ve medikal sektörlerine uygun üretim yapıyoruz.",
  },
  {
    question: "Yüzey işleme hizmetiniz var mı?",
    answer: "Anodizasyon, kaplama, boyama, kumlama, parlatma ve ısıl işlem gibi yüzey işleme hizmetlerini de sunuyoruz veya koordine ediyoruz.",
  },
];

const blogPosts = [
  {
    title: "5 Eksen CNC İşleme Avantajları",
    excerpt: "Karmaşık geometrilerde tek seferde işleme imkanı ve yüzey kalitesi artışı...",
    date: "15 Ocak 2024",
    category: "Teknik",
  },
  {
    title: "Havacılık Parçalarında Malzeme Seçimi",
    excerpt: "Alüminyum 7075 vs Titanyum: Mukavemet, ağırlık ve maliyet karşılaştırması...",
    date: "8 Ocak 2024",
    category: "Malzeme",
  },
  {
    title: "DFM: Tasarımdan Üretime Geçiş",
    excerpt: "Design for Manufacturing prensipleri ile maliyetleri düşürün ve kaliteyi artırın...",
    date: "2 Ocak 2024",
    category: "Mühendislik",
  },
];

const FAQBlogSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="sss" className="section-industrial bg-card border-y border-border">
      <div className="container-industrial">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* FAQ Column */}
          <div>
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="accent-line" />
                <span className="text-technical text-muted-foreground uppercase tracking-widest text-sm">
                  SSS
                </span>
              </div>
              <h2 className="heading-industrial text-2xl md:text-3xl">Sıkça Sorulan Sorular</h2>
            </div>

            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-border bg-background">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openIndex === index && (
                    <div className="px-4 pb-4 text-muted-foreground text-sm leading-relaxed border-t border-border pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Blog Column */}
          <div>
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="accent-line" />
                <span className="text-technical text-muted-foreground uppercase tracking-widest text-sm">
                  Blog
                </span>
              </div>
              <h2 className="heading-industrial text-2xl md:text-3xl">Teknik İçerikler</h2>
            </div>

            <div className="space-y-4">
              {blogPosts.map((post, index) => (
                <a
                  key={index}
                  href="#"
                  className="block border border-border bg-background p-4 hover:border-primary transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-technical text-xs text-primary">{post.category}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                  <div className="flex items-center gap-1 mt-3 text-sm text-primary">
                    Devamını Oku
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </a>
              ))}
            </div>

            <a
              href="#blog"
              className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Tüm Yazılar
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQBlogSection;
