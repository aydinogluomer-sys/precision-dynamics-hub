import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPageBySlug, getPagesByCategory } from "@/data/servicePages";
import { ArrowRight, ChevronRight } from "lucide-react";

const ServiceDetail = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-industrial">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
            <ChevronRight size={12} />
            <span>{categoryLabels[page.category] || page.category}</span>
            <ChevronRight size={12} />
            <span className="text-foreground font-medium">{page.title}</span>
          </nav>

          <div className="max-w-4xl">
            {/* Category badge */}
            <span className="text-xs font-semibold uppercase tracking-[0.4em] mb-3 block text-primary">
              {page.categoryLabel}
            </span>

            <h1 className="heading-industrial text-3xl md:text-4xl mb-4">{page.title}</h1>
            <p className="subheading-industrial text-lg mb-12">{page.description}</p>

            {/* Content */}
            <div className="space-y-6 text-muted-foreground text-sm leading-relaxed mb-12">
              {page.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Features */}
            {page.features && page.features.length > 0 && (
              <div className="mb-16">
                <h2 className="text-lg font-bold mb-6">Öne Çıkan Özellikler</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {page.features.map((feature) => (
                    <div
                      key={feature}
                      className="border border-border bg-card p-5 flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-primary shrink-0" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-card border border-border p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="font-bold text-lg mb-1">Projeniz için teklif alın</h3>
                <p className="text-sm text-muted-foreground">
                  {page.title} hizmeti hakkında detaylı bilgi ve fiyat teklifi için bizimle iletişime geçin.
                </p>
              </div>
              <Link to="/iletisim" className="btn-industrial-primary whitespace-nowrap flex items-center gap-2">
                Teklif Al <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Related pages */}
          {relatedPages.length > 0 && (
            <div className="mt-20">
              <h2 className="text-lg font-bold mb-6">İlgili Sayfalar</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {relatedPages.slice(0, 8).map((rp) => (
                  <Link
                    key={rp.slug}
                    to={`/${rp.category}/${rp.slug}`}
                    className="border border-border bg-card p-5 hover:border-primary transition-colors group"
                  >
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {rp.categoryLabel}
                    </span>
                    <h3 className="font-bold text-sm mt-1 group-hover:text-primary transition-colors">
                      {rp.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{rp.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
