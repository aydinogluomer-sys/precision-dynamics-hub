import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPageBySlug, getPagesByCategory } from "@/data/servicePages";
import { ArrowRight, ChevronRight, CheckCircle2, Gauge, ArrowUpRight, Cpu, FlaskConical } from "lucide-react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import cncWorkshop from "@/assets/cnc-workshop.jpg";
import qualityControl from "@/assets/quality-control.jpg";
import heroCncFrezeleme from "@/assets/hero-cnc-frezeleme.jpg";
import heroCncTornalama from "@/assets/hero-cnc-tornalama.jpg";
import heroMikroIsleme from "@/assets/hero-mikro-isleme.jpg";
import heroDerinDelik from "@/assets/hero-derin-delik.jpg";
import heroEnjeksiyonKalibi from "@/assets/hero-enjeksiyon-kalibi.jpg";
import heroAnodizasyon from "@/assets/hero-anodizasyon.jpg";
import heroLazerKazima from "@/assets/hero-lazer-kazima.jpg";
import heroHavacilik from "@/assets/hero-havacilik.jpg";

const heroImageMap: Record<string, string> = {
  "hero-cnc-frezeleme": heroCncFrezeleme,
  "hero-cnc-tornalama": heroCncTornalama,
  "hero-mikro-isleme": heroMikroIsleme,
  "hero-derin-delik": heroDerinDelik,
  "hero-enjeksiyon-kalibi": heroEnjeksiyonKalibi,
  "hero-anodizasyon": heroAnodizasyon,
  "hero-lazer-kazima": heroLazerKazima,
  "hero-havacilik": heroHavacilik,
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4 },
});

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
  const categoryLabels: Record<string, string> = { hizmetler: "Hizmetler", kabiliyetler: "Kabiliyetler", endustriyel: "Endüstriyel" };
  const heroImage = page.heroImage && heroImageMap[page.heroImage]
    ? heroImageMap[page.heroImage]
    : page.category === "kabiliyetler" ? qualityControl : cncWorkshop;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-0">
          <div className="relative h-[320px] md:h-[400px] overflow-hidden">
            <motion.img
              src={heroImage}
              alt={page.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 container-industrial pb-8">
              <nav className="flex items-center gap-2 text-xs text-primary-foreground/70 mb-4">
                <Link to="/" className="hover:text-primary-foreground transition-colors">Ana Sayfa</Link>
                <ChevronRight size={12} />
                <span>{categoryLabels[page.category] || page.category}</span>
                <ChevronRight size={12} />
                <span className="text-primary-foreground font-medium">{page.title}</span>
              </nav>
              <motion.div {...fadeUp()}>
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
          <motion.p {...fadeUp(0.2)} className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-12 leading-relaxed">
            {page.description}
          </motion.p>

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Content */}
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                {page.content.map((p, i) => (
                  <motion.p key={i} {...fadeUp(0.3 + i * 0.1)}>{p}</motion.p>
                ))}
              </div>

              {/* Process Steps */}
              {page.processSteps && page.processSteps.length > 0 && (
                <motion.div {...fadeUp(0.5)}>
                  <h2 className="heading-industrial text-xl mb-6 flex items-center gap-3">
                    <div className="accent-line !w-8" /> Süreç Adımları
                  </h2>
                  <div className="flex flex-wrap gap-0">
                    {page.processSteps.map((step, i) => (
                      <div key={i} className="flex items-center">
                        <div className="flex items-center gap-2 bg-card border border-border px-4 py-3">
                          <span className="text-technical text-xs text-primary font-bold">{String(i + 1).padStart(2, "0")}</span>
                          <span className="text-sm font-medium">{step}</span>
                        </div>
                        {i < page.processSteps!.length - 1 && <ArrowRight size={16} className="text-primary mx-1 shrink-0" />}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Advantages */}
              {page.advantages && page.advantages.length > 0 && (
                <motion.div {...fadeUp(0.6)}>
                  <h2 className="heading-industrial text-xl mb-6 flex items-center gap-3">
                    <div className="accent-line !w-8" /> Avantajlarımız
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {page.advantages.map((adv, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3 bg-card border border-border p-4 hover:border-primary transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{adv}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Features */}
              {page.features && page.features.length > 0 && (
                <motion.div {...fadeUp(0.7)}>
                  <h2 className="heading-industrial text-xl mb-6 flex items-center gap-3">
                    <div className="accent-line !w-8" /> Öne Çıkan Özellikler
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {page.features.map((feature) => (
                      <motion.div
                        key={feature}
                        className="border border-border bg-card p-4 flex items-center gap-3 hover:border-primary transition-colors"
                        whileHover={{ y: -2 }}
                      >
                        <div className="w-2 h-2 bg-primary shrink-0" />
                        <span className="text-sm font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Machines Section */}
              {page.machines && page.machines.length > 0 && (
                <motion.div {...fadeUp(0.75)}>
                  <h2 className="heading-industrial text-xl mb-6 flex items-center gap-3">
                    <div className="accent-line !w-8" />
                    <Cpu size={20} className="text-primary" />
                    Makine Parkuru
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {page.machines.map((machine, i) => (
                      <motion.div
                        key={i}
                        className="border border-border bg-card p-5 hover:border-primary transition-all group"
                        whileHover={{ y: -4, boxShadow: "0 8px 24px hsl(var(--primary) / 0.1)" }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-primary/10 flex items-center justify-center">
                            <Cpu size={16} className="text-primary" />
                          </div>
                          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{machine.brand}</span>
                        </div>
                        <h4 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors">{machine.name}</h4>
                        <p className="text-technical text-xs text-muted-foreground">{machine.specs}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Materials Section */}
              {page.materials && page.materials.length > 0 && (
                <motion.div {...fadeUp(0.8)}>
                  <h2 className="heading-industrial text-xl mb-6 flex items-center gap-3">
                    <div className="accent-line !w-8" />
                    <FlaskConical size={20} className="text-primary" />
                    İşlenebilir Malzemeler
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {page.materials.map((mat, i) => (
                      <motion.div
                        key={i}
                        className="border border-border bg-card overflow-hidden hover:border-primary transition-all group"
                        whileHover={{ y: -4 }}
                      >
                        <div className="bg-primary/5 px-5 py-3 border-b border-border">
                          <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{mat.name}</h4>
                          <span className="text-technical text-xs text-primary">{mat.grade}</span>
                        </div>
                        <div className="px-5 py-3">
                          <p className="text-xs text-muted-foreground">{mat.properties}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* FAQ Section */}
              {page.faq && page.faq.length > 0 && (
                <motion.div {...fadeUp(0.85)}>
                  <h2 className="heading-industrial text-xl mb-6 flex items-center gap-3">
                    <div className="accent-line !w-8" /> Sıkça Sorulan Sorular
                  </h2>
                  <Accordion type="single" collapsible className="space-y-2">
                    {page.faq.map((item, i) => (
                      <AccordionItem key={i} value={`faq-${i}`} className="border border-border bg-card px-5">
                        <AccordionTrigger className="text-sm font-semibold text-left hover:text-primary transition-colors py-4">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground pb-4">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {page.technicalSpecs && page.technicalSpecs.length > 0 && (
                <motion.div className="border border-border bg-card sticky top-24" {...fadeUp(0.4)}>
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

              <motion.div className="border border-primary bg-card p-6" {...fadeUp(0.5)}>
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
            <motion.div className="mt-20 pt-12 border-t border-border" {...fadeUp(0.8)}>
              <h2 className="heading-industrial text-xl mb-8 flex items-center gap-3">
                <div className="accent-line !w-8" /> İlgili Sayfalar
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {relatedPages.slice(0, 8).map((rp) => (
                  <Link
                    key={rp.slug}
                    to={`/${rp.category}/${rp.slug}`}
                    className="border border-border bg-card p-5 hover:border-primary transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{rp.categoryLabel}</span>
                      <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{rp.title}</h3>
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{rp.description}</p>
                    {rp.technicalSpecs && rp.technicalSpecs.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-2">
                        {rp.technicalSpecs.slice(0, 2).map((spec, i) => (
                          <span key={i} className="text-technical text-[10px] text-primary bg-primary/10 px-2 py-0.5">{spec.value}</span>
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
