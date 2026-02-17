import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { motion } from "framer-motion";
import blog5eksen from "@/assets/blog-5eksen.jpg";
import blogMalzeme from "@/assets/blog-malzeme.jpg";
import blogDfm from "@/assets/blog-dfm.jpg";
import cncWorkshop from "@/assets/cnc-workshop.jpg";
import qualityControl from "@/assets/quality-control.jpg";
import serviceCncFreze from "@/assets/service-cnc-freze.jpg";

const blogPosts = [
  {
    slug: "5-eksen-cnc-isleme-avantajlari",
    title: "5 Eksen CNC İşleme Avantajları",
    excerpt:
      "Karmaşık geometrilerde tek seferde işleme imkanı sunan 5 eksenli CNC teknolojisi, yüzey kalitesini artırırken setup süresini kısaltıyor. Bu yazıda 5 eksen işlemenin avantajlarını detaylıca inceliyoruz.",
    date: "15 Ocak 2024",
    readTime: "8 dk okuma",
    category: "Teknik",
    image: blog5eksen,
    featured: true,
  },
  {
    slug: "havacilik-parcalarinda-malzeme-secimi",
    title: "Havacılık Parçalarında Malzeme Seçimi",
    excerpt:
      "Alüminyum 7075 vs Titanyum: Mukavemet, ağırlık ve maliyet karşılaştırması. Havacılık uygulamalarında doğru malzeme seçimi nasıl yapılır?",
    date: "8 Ocak 2024",
    readTime: "6 dk okuma",
    category: "Malzeme",
    image: blogMalzeme,
    featured: true,
  },
  {
    slug: "dfm-tasarimdan-uretime-gecis",
    title: "DFM: Tasarımdan Üretime Geçiş",
    excerpt:
      "Design for Manufacturing prensipleri ile maliyetleri düşürün ve kaliteyi artırın. DFM sürecinin aşamalarını adım adım anlatıyoruz.",
    date: "2 Ocak 2024",
    readTime: "10 dk okuma",
    category: "Mühendislik",
    image: blogDfm,
    featured: false,
  },
  {
    slug: "cnc-torna-frezeleme-farki",
    title: "CNC Torna vs Frezeleme: Hangisini Seçmeli?",
    excerpt:
      "Parça geometrisine göre doğru işleme yöntemini seçmek maliyet ve kalite açısından kritik önem taşır. İki yöntemin avantaj ve dezavantajlarını karşılaştırıyoruz.",
    date: "25 Aralık 2023",
    readTime: "7 dk okuma",
    category: "Teknik",
    image: serviceCncFreze,
    featured: false,
  },
  {
    slug: "kalite-kontrol-cmm-olcum",
    title: "Kalite Kontrol: CMM Ölçüm Süreçleri",
    excerpt:
      "Koordinat ölçüm makineleri (CMM) ile hassas boyutsal doğrulama süreçleri. FAIR raporu, PPAP ve SPC uygulamalarını inceliyoruz.",
    date: "18 Aralık 2023",
    readTime: "9 dk okuma",
    category: "Kalite",
    image: qualityControl,
    featured: false,
  },
  {
    slug: "endustriyel-yuzey-islemleri-rehberi",
    title: "Endüstriyel Yüzey İşlemleri Rehberi",
    excerpt:
      "Anodizasyon, pasivasyon, kaplama ve boyama: Hangi yüzey işlemi ne zaman tercih edilmeli? Kapsamlı yüzey işlemleri rehberimiz.",
    date: "10 Aralık 2023",
    readTime: "12 dk okuma",
    category: "Rehber",
    image: cncWorkshop,
    featured: false,
  },
];

const categories = ["Tümü", "Teknik", "Malzeme", "Mühendislik", "Kalite", "Rehber"];

const Blog = () => {
  const featured = blogPosts.filter((p) => p.featured);
  const regular = blogPosts.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="container-industrial py-12 md:py-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="accent-line" />
            <span className="text-technical text-muted-foreground uppercase tracking-widest text-sm">Blog</span>
          </div>
          <h1 className="heading-industrial text-3xl md:text-5xl mb-4">Teknik İçerikler & Mühendislik Yazıları</h1>
          <p className="subheading-industrial text-lg max-w-2xl">
            CNC işleme, malzeme bilimi, kalite kontrol ve üretim mühendisliği hakkında teknik içeriklerimizi keşfedin.
          </p>
        </section>

        {/* Categories */}
        <section className="container-industrial pb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`text-xs font-semibold uppercase tracking-wider px-4 py-2 border transition-colors ${
                  cat === "Tümü"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Posts */}
        <section className="container-industrial pb-12">
          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((post, i) => (
              <motion.article
                key={post.slug}
                className="group border border-border bg-card overflow-hidden hover:border-primary transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-technical text-xs text-primary flex items-center gap-1">
                      <Tag size={12} />
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <h2 className="heading-industrial text-xl mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Devamını Oku <ArrowRight size={14} />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Regular Posts */}
        <section className="container-industrial pb-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regular.map((post, i) => (
              <motion.article
                key={post.slug}
                className="group border border-border bg-card overflow-hidden hover:border-primary transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-technical text-xs text-primary">{post.category}</span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                      Oku <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-card border-y border-border">
          <div className="container-industrial py-16 text-center">
            <h2 className="heading-industrial text-2xl mb-3">Teknik bültenimize abone olun</h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
              CNC işleme, malzeme bilimi ve üretim mühendisliği hakkında aylık teknik içerikler alın.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <button className="btn-industrial-primary !py-3 !px-6">Abone Ol</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
