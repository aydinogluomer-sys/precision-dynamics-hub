import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLdSchema from "@/components/JsonLdSchema";
import { ChevronDown, Search, MessageCircleQuestion, Hash, BarChart3, ArrowRight, HelpCircle, Layers, Filter } from "lucide-react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { servicePages } from "@/data/servicePages";

/* ── Collect all FAQs from service pages and categorize ── */
interface CategorizedFaq {
  question: string;
  answer: string;
  category: string;
  source: string;
  sourceSlug: string;
  sourceCategory: string;
}

const generalFaqs: CategorizedFaq[] = [
  { question: "Minimum sipariş adedi nedir?", answer: "Minimum sipariş adedi bulunmamaktadır. Tek parça prototipten seri üretime kadar her ölçekte hizmet veriyoruz.", category: "Genel", source: "Genel", sourceSlug: "", sourceCategory: "" },
  { question: "Hangi dosya formatlarını kabul ediyorsunuz?", answer: "STEP, IGES, DXF, DWG, SOLIDWORKS (.sldprt, .sldasm), Autodesk Inventor (.ipt), PDF ve 2D teknik çizim formatlarını kabul ediyoruz.", category: "Genel", source: "Genel", sourceSlug: "", sourceCategory: "" },
  { question: "Teslim süresi ne kadardır?", answer: "Prototip üretimde 3-5 iş günü, küçük serilerde 1-2 hafta, seri üretimde proje bazlı planlama yapılır. Acil üretim seçeneğimiz de mevcuttur.", category: "Genel", source: "Genel", sourceSlug: "", sourceCategory: "" },
  { question: "Kalite belgeniz var mı?", answer: "ISO 9001:2015, AS9100D, IATF 16949 ve ISO 14001 belgelerine sahibiz. Havacılık, otomotiv ve medikal sektörlerine uygun üretim yapıyoruz.", category: "Kalite & Standartlar", source: "Genel", sourceSlug: "", sourceCategory: "" },
  { question: "Yüzey işleme hizmetiniz var mı?", answer: "Anodizasyon, kaplama, boyama, kumlama, parlatma ve ısıl işlem gibi yüzey işleme hizmetlerini de sunuyoruz veya koordine ediyoruz.", category: "Yüzey İşlemleri", source: "Genel", sourceSlug: "", sourceCategory: "" },
  { question: "Hangi sektörlere hizmet veriyorsunuz?", answer: "Havacılık & uzay, otomotiv, medikal, robotik, savunma sanayi, enerji ve genel endüstriyel üretim sektörlerine hizmet veriyoruz.", category: "Genel", source: "Genel", sourceSlug: "", sourceCategory: "" },
  { question: "Teklifinizi ne kadar sürede alırım?", answer: "Teknik çizimlerinizi gönderdikten sonra genellikle 24-48 saat içinde detaylı fiyat teklifimizi iletiyoruz.", category: "Genel", source: "Genel", sourceSlug: "", sourceCategory: "" },
  { question: "Hangi malzemelerle çalışıyorsunuz?", answer: "Alüminyum, çelik, paslanmaz çelik, pirinç, bakır, titanyum, plastik (Delrin, PEEK, Nylon) ve daha birçok malzeme ile çalışıyoruz.", category: "Malzeme", source: "Genel", sourceSlug: "", sourceCategory: "" },
  { question: "Ücretsiz DFM analizi yapıyor musunuz?", answer: "Evet, tüm projelerimiz için ücretsiz Design for Manufacturing (DFM) analizi sunuyoruz.", category: "Mühendislik", source: "Genel", sourceSlug: "", sourceCategory: "" },
  { question: "Sevkiyat nasıl yapılıyor?", answer: "Yurt içi ve yurt dışı sevkiyat seçeneklerimiz mevcuttur. Ürünleriniz özenle paketlenir ve anlaşmalı kargo firmalarıyla güvenli şekilde teslim edilir.", category: "Genel", source: "Genel", sourceSlug: "", sourceCategory: "" },
];

// Map categoryLabel to FAQ category
const labelToCategoryMap: Record<string, string> = {
  "Talaşlı İmalat": "Talaşlı İmalat",
  "Ön Üretim": "Kalıp & Ön Üretim",
  "Yüzey İşlemleri": "Yüzey İşlemleri",
  "İşaretleme & Tanımlama": "İşaretleme & Tanımlama",
  "Montaj & Birleştirme": "Montaj & Birleştirme",
  "Üretim Altyapısı": "Üretim Altyapısı",
  "Kalite & Standartlar": "Kalite & Standartlar",
  "Mühendislik Desteği": "Mühendislik",
  "Prototipten Seri Üretime": "Üretim Ölçeklendirme",
  "Süreç & Operasyon": "Süreç & Operasyon",
  "Yüksek Teknoloji": "Endüstriyel Sektörler",
  "Seri Üretim": "Endüstriyel Sektörler",
  "Endüstriyel Sistemler": "Endüstriyel Sektörler",
  "Üretim Çözümleri": "Endüstriyel Sektörler",
  "Enerji & Altyapı": "Endüstriyel Sektörler",
};

// Build service FAQs
const serviceFaqs: CategorizedFaq[] = servicePages.flatMap((page) =>
  (page.faq || []).map((f) => ({
    question: f.question,
    answer: f.answer,
    category: labelToCategoryMap[page.categoryLabel] || page.categoryLabel,
    source: page.title,
    sourceSlug: page.slug,
    sourceCategory: page.category,
  }))
);

// Combine and deduplicate by question text
const allFaqsRaw = [...generalFaqs, ...serviceFaqs];
const seen = new Set<string>();
const allFaqs = allFaqsRaw.filter((f) => {
  const key = f.question.toLowerCase().trim();
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

// Get unique categories preserving order
const faqCategories = ["Tümü", ...Array.from(new Set(allFaqs.map((f) => f.category)))];

/* ── Animation helpers ── */
const smoothEase: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const SSS = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let faqs = [...allFaqs];
    if (activeCategory !== "Tümü") {
      faqs = faqs.filter((f) => f.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      faqs = faqs.filter(
        (f) =>
          f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q)
      );
    }
    return faqs;
  }, [activeCategory, searchQuery]);

  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {};
    allFaqs.forEach((f) => {
      stats[f.category] = (stats[f.category] || 0) + 1;
    });
    return stats;
  }, []);

  const jsonLdFaqs = useMemo(() => filtered.map((f) => ({ question: f.question, answer: f.answer })), [filtered]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <JsonLdSchema type="faqPage" faq={jsonLdFaqs} />

      <main className="pt-24 pb-16">
        {/* ═══ HERO ═══ */}
        <section className="container-industrial py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: smoothEase }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="accent-line" />
              <span className="text-technical text-muted-foreground uppercase tracking-widest text-sm">SSS</span>
            </div>
            <h1 className="heading-industrial text-3xl md:text-5xl mb-4">Sıkça Sorulan Sorular</h1>
            <p className="subheading-industrial text-lg max-w-2xl">
              CNC işleme, kalıp üretimi, yüzey işlemleri ve üretim süreçleri hakkında merak ettiğiniz tüm soruların yanıtları.
            </p>
          </motion.div>
        </section>

        <div className="container-industrial">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* ═══ MAIN CONTENT ═══ */}
            <div className="lg:col-span-3">
              {/* Search & Filter */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Sorularda ara..."
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setOpenIndex(null); }}
                    className="w-full bg-card border border-border pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Filter size={14} />
                  <span>{filtered.length} soru gösteriliyor</span>
                </div>
              </motion.div>

              {/* Category Tabs */}
              <motion.div
                className="flex flex-wrap gap-2 mb-8"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                {faqCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                    className={`text-xs font-semibold uppercase tracking-wider px-4 py-2 border transition-all duration-200 ${
                      cat === activeCategory
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary"
                    }`}
                  >
                    {cat}
                    {cat !== "Tümü" && categoryStats[cat] && (
                      <span className="ml-1.5 opacity-60">({categoryStats[cat]})</span>
                    )}
                  </button>
                ))}
              </motion.div>

              {/* FAQ List */}
              {filtered.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <HelpCircle size={40} className="mx-auto mb-4 opacity-30" />
                  <p className="text-lg mb-2">Sonuç bulunamadı</p>
                  <p className="text-sm">Farklı bir arama terimi veya kategori deneyin.</p>
                </div>
              ) : (
                <motion.div
                  className="space-y-2"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  key={activeCategory + searchQuery}
                >
                  {filtered.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                      <motion.div
                        key={faq.question}
                        variants={staggerItem}
                        className={`border bg-card transition-all duration-300 ${
                          isOpen ? "border-primary shadow-lg" : "border-border hover:border-primary/40"
                        }`}
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : index)}
                          className="w-full flex items-start justify-between p-5 text-left group"
                        >
                          <div className="flex items-start gap-3 flex-1">
                            <div className={`w-8 h-8 shrink-0 flex items-center justify-center transition-colors duration-300 ${
                              isOpen ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                            }`}>
                              <MessageCircleQuestion size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className={`font-semibold text-sm block transition-colors ${isOpen ? "text-primary" : "group-hover:text-primary"}`}>
                                {faq.question}
                              </span>
                              <div className="flex items-center gap-2 mt-1.5">
                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5">
                                  {faq.category}
                                </span>
                                {faq.source !== "Genel" && (
                                  <span className="text-[10px] text-muted-foreground">
                                    {faq.source}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 mt-1 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: smoothEase }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-5 border-t border-border pt-4 ml-11">
                                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                                {faq.sourceSlug && (
                                  <Link
                                    to={`/${faq.sourceCategory}/${faq.sourceSlug}`}
                                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary mt-3 hover:gap-2 transition-all"
                                  >
                                    {faq.source} sayfasına git <ArrowRight size={12} />
                                  </Link>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </div>

            {/* ═══ SIDEBAR ═══ */}
            <div className="space-y-6">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Stats */}
                <motion.div
                  className="border border-border bg-card p-5"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <h3 className="font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                    <BarChart3 size={16} className="text-primary" /> SSS İstatistikleri
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-muted/50">
                      <span className="text-technical text-2xl font-bold text-primary">{allFaqs.length}</span>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Toplam Soru</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50">
                      <span className="text-technical text-2xl font-bold text-primary">{faqCategories.length - 1}</span>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Kategori</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50">
                      <span className="text-technical text-2xl font-bold text-primary">{servicePages.filter(p => p.faq && p.faq.length > 0).length}</span>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Kaynak Sayfa</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50">
                      <span className="text-technical text-2xl font-bold text-primary">{generalFaqs.length}</span>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Genel Soru</p>
                    </div>
                  </div>
                </motion.div>

                {/* Category Tags */}
                <motion.div
                  className="border border-border bg-card p-5"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h3 className="font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Hash size={16} className="text-primary" /> Kategoriler
                  </h3>
                  <div className="space-y-1.5">
                    {Object.entries(categoryStats)
                      .sort(([, a], [, b]) => b - a)
                      .map(([cat, count]) => (
                        <button
                          key={cat}
                          onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                          className={`w-full flex items-center justify-between text-xs px-3 py-2 border transition-all ${
                            activeCategory === cat
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary"
                          }`}
                        >
                          <span>{cat}</span>
                          <span className="text-technical font-bold">{count}</span>
                        </button>
                      ))}
                  </div>
                </motion.div>

                {/* Popular Questions */}
                <motion.div
                  className="border border-border bg-card"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="bg-primary p-4 flex items-center gap-2">
                    <Layers size={18} className="text-primary-foreground" />
                    <h3 className="font-bold text-primary-foreground text-sm uppercase tracking-wider">Popüler Sorular</h3>
                  </div>
                  <div className="divide-y divide-border">
                    {allFaqs.slice(0, 5).map((faq, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setActiveCategory("Tümü");
                          setSearchQuery("");
                          setOpenIndex(i);
                          window.scrollTo({ top: 400, behavior: "smooth" });
                        }}
                        className="w-full flex gap-3 p-4 hover:bg-muted/50 transition-colors text-left group"
                      >
                        <span className="text-technical text-2xl font-bold text-primary/30">{String(i + 1).padStart(2, "0")}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold line-clamp-2 group-hover:text-primary transition-colors">{faq.question}</p>
                          <span className="text-[10px] text-muted-foreground mt-1 block">{faq.category}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                  className="border-2 border-primary bg-card p-6 relative overflow-hidden group"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/10 rounded-full group-hover:scale-150 transition-transform duration-700" />
                  <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-2">Sorunuzu bulamadınız mı?</h3>
                    <p className="text-xs text-muted-foreground mb-4">
                      Teknik ekibimize doğrudan ulaşarak özel sorularınızın yanıtlarını alabilirsiniz.
                    </p>
                    <Link to="/iletisim" className="btn-industrial-primary w-full flex items-center justify-center gap-2 text-center text-xs !py-2.5 group/btn">
                      İletişime Geç <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SSS;
