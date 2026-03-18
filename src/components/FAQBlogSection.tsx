import { ChevronDown, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import blog5eksen from "@/assets/blog-5eksen.jpg";
import blogMalzeme from "@/assets/blog-malzeme.jpg";
import blogDfm from "@/assets/blog-dfm.jpg";

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
  {
    question: "Hangi sektörlere hizmet veriyorsunuz?",
    answer: "Havacılık & uzay, otomotiv, medikal, robotik, savunma sanayi, enerji ve genel endüstriyel üretim sektörlerine hizmet veriyoruz. Her sektöre özel kalite standartlarına uygun üretim yapabiliyoruz.",
  },
  {
    question: "Teklifinizi ne kadar sürede alırım?",
    answer: "Teknik çizimlerinizi gönderdikten sonra genellikle 24-48 saat içinde detaylı fiyat teklifimizi iletiyoruz. Acil talepler için aynı gün teklif seçeneğimiz de mevcuttur.",
  },
];

const blogPosts = [
  {
    title: "5 Eksen CNC İşleme Avantajları",
    excerpt: "Karmaşık geometrilerde tek seferde işleme imkanı ve yüzey kalitesi artışı...",
    date: "15 Ocak 2024",
    category: "Teknik",
    image: blog5eksen,
  },
  {
    title: "Havacılık Parçalarında Malzeme Seçimi",
    excerpt: "Alüminyum 7075 vs Titanyum: Mukavemet, ağırlık ve maliyet karşılaştırması...",
    date: "8 Ocak 2024",
    category: "Malzeme",
    image: blogMalzeme,
  },
  {
    title: "DFM: Tasarımdan Üretime Geçiş",
    excerpt: "Design for Manufacturing prensipleri ile maliyetleri düşürün ve kaliteyi artırın...",
    date: "2 Ocak 2024",
    category: "Mühendislik",
    image: blogDfm,
  },
];

const FAQBlogSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="sss" className="section-industrial min-h-screen flex flex-col justify-center border-y border-border" style={{ backgroundColor: "hsl(var(--forge-mist))" }}>
      <style>{`.dark #sss { background-color: hsl(var(--forge-mist)) !important; }`}</style>
      <div className="container-industrial">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* FAQ Column */}
          <div>
            <div className="mb-8">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                <div className="accent-line" />
                <span className="text-technical text-muted-foreground uppercase tracking-widest text-sm">
                  SSS
                </span>
              </div>
              <h2 className="heading-industrial text-2xl md:text-3xl text-foreground text-center md:text-left">Sıkça Sorulan Sorular</h2>
            </div>

            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-border bg-background">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-center md:text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium pr-4 text-center md:text-left w-full">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openIndex === index && (
                    <div className="px-4 pb-4 text-muted-foreground text-sm leading-relaxed border-t border-border pt-4 text-center md:text-left">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center md:text-left mt-6">
              <Link
                to="/sss"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors"
              >
                Tüm Sorular
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Blog Column */}
          <div>
            <div className="mb-8">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                <div className="accent-line" />
                <span className="text-technical text-muted-foreground uppercase tracking-widest text-sm">
                  Blog
                </span>
              </div>
              <h2 className="heading-industrial text-2xl md:text-3xl text-foreground text-center md:text-left">Teknik İçerikler</h2>
            </div>

            <div className="space-y-4">
              {blogPosts.map((post, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex flex-col md:flex-row gap-4 border border-border bg-background p-3 hover:border-primary transition-colors group overflow-hidden"
                >
                  <div className="w-full md:w-28 h-40 md:h-24 flex-shrink-0 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-1.5">
                      <span className="text-technical text-xs text-primary">{post.category}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                    </div>
                    <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors line-clamp-1">
                      {post.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-center md:justify-start gap-1 mt-2 text-xs text-primary">
                      Devamını Oku
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="text-center md:text-left mt-6">
              <a
                href="#blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors"
              >
                Tüm Yazılar
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQBlogSection;
