import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPageBySlug, getPagesByCategory } from "@/data/servicePages";
import { ArrowRight, ChevronRight, CheckCircle2, Gauge, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import cncWorkshop from "@/assets/cnc-workshop.jpg";
import qualityControl from "@/assets/quality-control.jpg";

const ServiceDetail = () => {
  const { slug } = useParams<{ category: string; slug: string }>();
  const page = slug ? getPageBySlug(slug) : undefined;

  if (!page) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container-industrial text-center py-20">
            <h1 className="heading-industrial text-3xl mb-4">Sayfa Bulunamadı</h1>
            <p className="text-muted-foreground mb-8">Aradığınız sayfa mevcut değil.</p>
            <Link to="/" className="btn-industrial-primary">Ana Sayfaya Dön</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedPages = getPagesByCategory(page.category).filter((p) => p.slug !== page.slug);

  const categoryLabels: Record<string, string> = {
    hizmetler: "Hizmetler",
    kabiliyetler: "Kabiliyetler",
    endustriyel: "Endüstriyel",
  };

  // Pick a contextual hero image
  const heroImage = page.category === "kabiliyetler" ? qualityControl : cncWorkshop;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-0">
          <div className="relative h-[320px] md:h-[400px] overflow-hidden">
            <img
              src={heroImage}
              alt={page.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 container-industrial pb-8">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-xs text-primary-foreground/70 mb-4">
                <Link to="/" className="hover:text-primary-foreground transition-colors">Ana Sayfa</Link>
                <ChevronRight size={12} />
                <span>{categoryLabels[page.category] || page.category}</span>
                <ChevronRight size={12} />
                <span className="text-primary-foreground font-medium">{page.title}</span>
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.4em] mb-2 block text-primary">
                  {page.categoryLabel}
                </span>
                <h1 className="heading-industrial text-3xl md:text-5xl text-primary-foreground">{page.title}</h1>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="container-industrial py-12 md:py-16">
          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {page.description}
          </motion.p>

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main Content - Left 2 cols */}
            <div className="lg:col-span-2 space-y-10">
              {/* Content paragraphs */}
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                {page.content.map((paragraph, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Process Steps */}
              {page.processSteps && page.processSteps.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <h2 className="heading-industrial text-xl mb-6 flex items-center gap-3">
                    <div className="accent-line !w-8" />
                    Süreç Adımları
                  </h2>
                  <div className="flex flex-wrap gap-0">
                    {page.processSteps.map((step, i) => (
                      <div key={i} className="flex items-center">
                        <div className="flex items-center gap-2 bg-card border border-border px-4 py-3">
                          <span className="text-technical text-xs text-primary font-bold">{String(i + 1).padStart(2, "0")}</span>
                          <span className="text-sm font-medium">{step}</span>
                        </div>
                        {i < page.processSteps!.length - 1 && (
                          <ArrowRight size={16} className="text-primary mx-1 shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Advantages */}
              {page.advantages && page.advantages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  <h2 className="heading-industrial text-xl mb-6 flex items-center gap-3">
                    <div className="accent-line !w-8" />
                    Avantajlarımız
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {page.advantages.map((adv, i) => (
                      <div key={i} className="flex items-start gap-3 bg-card border border-border p-4">
                        <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{adv}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Features */}
              {page.features && page.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                >
                  <h2 className="heading-industrial text-xl mb-6 flex items-center gap-3">
                    <div className="accent-line !w-8" />
                    Öne Çıkan Özellikler
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {page.features.map((feature) => (
                      <div
                        key={feature}
                        className="border border-border bg-card p-4 flex items-center gap-3 hover:border-primary transition-colors"
                      >
                        <div className="w-2 h-2 bg-primary shrink-0" />
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar - Right 1 col */}
            <div className="space-y-6">
              {/* Technical Specs Card */}
              {page.technicalSpecs && page.technicalSpecs.length > 0 && (
                <motion.div
                  className="border border-border bg-card sticky top-24"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <div className="bg-primary p-4 flex items-center gap-3">
                    <Gauge size={20} className="text-primary-foreground" />
                    <h3 className="font-bold text-primary-foreground text-sm uppercase tracking-wider">Teknik Özellikler</h3>
                  </div>
                  <div className="divide-y divide-border">
                    {page.technicalSpecs.map((spec, i) => (
                      <div key={i} className="flex justify-between items-center px-4 py-3">
                        <span className="text-xs text-muted-foreground">{spec.label}</span>
                        <span className="text-technical text-xs font-bold text-foreground">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* CTA Card */}
              <motion.div
                className="border border-primary bg-card p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <h3 className="font-bold text-lg mb-2">Projeniz için teklif alın</h3>
                <p className="text-sm text-muted-foreground mb-5">
                  {page.title} hizmeti hakkında detaylı bilgi ve fiyat teklifi için bizimle iletişime geçin.
                </p>
                <Link to="/iletisim" className="btn-industrial-primary w-full flex items-center justify-center gap-2 text-center">
                  Teklif Al <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Related pages */}
          {relatedPages.length > 0 && (
            <motion.div
              className="mt-20 pt-12 border-t border-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <h2 className="heading-industrial text-xl mb-8 flex items-center gap-3">
                <div className="accent-line !w-8" />
                İlgili Sayfalar
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {relatedPages.slice(0, 8).map((rp) => (
                  <Link
                    key={rp.slug}
                    to={`/${rp.category}/${rp.slug}`}
                    className="border border-border bg-card p-5 hover:border-primary transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        {rp.categoryLabel}
                      </span>
                      <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="font-bold text-sm group-hover:text-primary transition-colors">
                      {rp.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{rp.description}</p>
                    {rp.technicalSpecs && rp.technicalSpecs.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-2">
                        {rp.technicalSpecs.slice(0, 2).map((spec, i) => (
                          <span key={i} className="text-technical text-[10px] text-primary bg-primary/10 px-2 py-0.5">
                            {spec.value}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
