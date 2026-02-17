import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Tag, Eye, Search, TrendingUp, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { blogPosts, blogCategories } from "@/data/blogData";

type SortOption = "newest" | "oldest" | "popular";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const filtered = useMemo(() => {
    let posts = [...blogPosts];

    // Category filter
    if (activeCategory !== "Tümü") {
      posts = posts.filter((p) => p.category === activeCategory);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === "popular") {
      posts.sort((a, b) => b.views - a.views);
    } else if (sortBy === "oldest") {
      posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    // "newest" is default order

    return posts;
  }, [activeCategory, searchQuery, sortBy]);

  const popularPosts = useMemo(() => [...blogPosts].sort((a, b) => b.views - a.views).slice(0, 3), []);

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

        <div className="container-industrial">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Filters & Search Bar */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {/* Search */}
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Blog yazılarında ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-card border border-border pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                {/* Sort */}
                <div className="relative flex items-center gap-2">
                  <SlidersHorizontal size={14} className="text-muted-foreground" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="bg-card border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors appearance-none pr-8 cursor-pointer"
                  >
                    <option value="newest">En Yeni</option>
                    <option value="oldest">En Eski</option>
                    <option value="popular">En Popüler</option>
                  </select>
                </div>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-6">
                {blogCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-xs font-semibold uppercase tracking-wider px-4 py-2 border transition-colors ${
                      cat === activeCategory
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Post Count */}
              <p className="text-xs text-muted-foreground mb-6">
                {filtered.length} blog yazısı gösteriliyor
              </p>

              {/* Posts Grid */}
              {filtered.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <p className="text-lg mb-2">Sonuç bulunamadı</p>
                  <p className="text-sm">Farklı bir arama terimi veya kategori deneyin.</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-6">
                  {filtered.map((post, i) => (
                    <motion.article
                      key={post.slug}
                      className="group border border-border bg-card overflow-hidden hover:border-primary transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                    >
                      <Link to={`/blog/${post.slug}`}>
                        <div className="aspect-[16/10] overflow-hidden relative">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          {post.featured && (
                            <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1">
                              Öne Çıkan
                            </span>
                          )}
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-technical text-xs text-primary flex items-center gap-1">
                              <Tag size={12} /> {post.category}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock size={12} /> {post.readTime}
                            </span>
                          </div>
                          <h2 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h2>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                              Devamını Oku <ArrowRight size={12} />
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Eye size={12} /> {post.views.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Popular Posts */}
              <div className="border border-border bg-card">
                <div className="bg-primary p-4 flex items-center gap-2">
                  <TrendingUp size={18} className="text-primary-foreground" />
                  <h3 className="font-bold text-primary-foreground text-sm uppercase tracking-wider">En Popüler Yazılar</h3>
                </div>
                <div className="divide-y divide-border">
                  {popularPosts.map((post, i) => (
                    <Link
                      key={post.slug}
                      to={`/blog/${post.slug}`}
                      className="flex gap-3 p-4 hover:bg-muted/50 transition-colors group"
                    >
                      <span className="text-technical text-2xl font-bold text-primary/30">{String(i + 1).padStart(2, "0")}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <Eye size={10} /> {post.views.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-muted-foreground">{post.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter CTA */}
              <div className="border border-primary bg-card p-6">
                <h3 className="font-bold text-lg mb-2">Teknik bülten</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  CNC işleme ve üretim mühendisliği hakkında aylık teknik içerikler alın.
                </p>
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="w-full bg-background border border-border px-4 py-2.5 text-sm mb-3 focus:outline-none focus:border-primary transition-colors"
                />
                <button className="btn-industrial-primary w-full !py-2.5 text-xs">Abone Ol</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
