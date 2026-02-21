import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Mail, Lock, ArrowRight, Eye, EyeOff, CheckCircle, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
        setLoading(false);
        return;
      }
      toast.success("Giriş başarılı!");
      navigate("/");
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }
      toast.success("Kayıt başarılı! E-posta adresinizi doğrulayın.");
    }
    setLoading(false);
  };

  const benefits = [
    "Teklif taleplerinizi anlık takip edin",
    "Sipariş durumunuzu görüntüleyin",
    "Geçmiş projelerinize erişin",
    "Mühendislerimizle doğrudan iletişim kurun",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-industrial">
          <div className="grid lg:grid-cols-2 gap-0 max-w-5xl mx-auto border border-border overflow-hidden">
            {/* Left Panel - Info */}
            <div className="bg-industrial-dark text-primary-foreground p-10 lg:p-14 flex flex-col justify-center relative overflow-hidden">
              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }} />

              <motion.div
                className="relative z-10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="accent-line mb-6" />
                <h2 className="text-3xl font-bold tracking-tight mb-3">
                  {isLogin ? "Hoş Geldiniz" : "Aramıza Katılın"}
                </h2>
                <p className="text-white/70 text-sm leading-relaxed mb-8">
                  MAS TECHNIC müşteri portalı ile üretim süreçlerinizi tek noktadan yönetin.
                </p>

                <div className="space-y-4">
                  {benefits.map((benefit, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    >
                      <CheckCircle size={16} className="text-primary mt-0.5 shrink-0" />
                      <span className="text-sm text-white/80">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-white/10 flex items-center gap-3">
                  <Shield size={18} className="text-primary" />
                  <span className="text-xs text-white/50 uppercase tracking-wider">
                    256-bit SSL ile korunan güvenli bağlantı
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right Panel - Form */}
            <motion.div
              className="bg-card p-10 lg:p-14 flex flex-col justify-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Logo */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">MT</span>
                  </div>
                  <div>
                    <div className="font-bold text-sm tracking-tight">MAS TECHNIC</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Müşteri Portalı</div>
                  </div>
                </div>
                <h1 className="heading-industrial text-xl mb-1">
                  {isLogin ? "Müşteri Girişi" : "Yeni Hesap Oluşturun"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {isLogin
                    ? "Hesabınıza giriş yaparak projelerinizi takip edin"
                    : "Hızlı teklif ve proje takibi için hesap oluşturun"}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    E-posta
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-background border border-border pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="ornek@firma.com"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Şifre
                    </label>
                    {isLogin && (
                      <button type="button" className="text-xs text-primary hover:underline">
                        Şifremi Unuttum
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-background border border-border pl-10 pr-12 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="••••••••"
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-industrial-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      {isLogin ? "Giriş Yap" : "Hesap Oluştur"}
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-border text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {isLogin ? (
                    <>Hesabınız yok mu? <span className="font-semibold text-primary">Kayıt Olun</span></>
                  ) : (
                    <>Zaten hesabınız var mı? <span className="font-semibold text-primary">Giriş Yapın</span></>
                  )}
                </button>
              </div>

              {/* Back to home */}
              <div className="text-center mt-6">
                <Link to="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  ← Ana Sayfaya Dön
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
