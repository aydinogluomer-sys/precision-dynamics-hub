import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Loader2,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle,
  Shield,
  ChevronLeft,
  AtSign,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FloatingPaths from "@/components/FloatingPaths";

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
    <div className="min-h-screen w-full flex">
      {/* Left Panel - Decorative with floating paths */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-industrial-dark overflow-hidden items-center justify-center">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />

        <motion.div
          className="relative z-10 max-w-md px-12"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">MT</span>
            </div>
            <div>
              <div className="text-white font-bold text-lg tracking-tight">MAS TECHNIC</div>
              <div className="text-white/40 text-[10px] uppercase tracking-[0.3em]">Precision Engineering</div>
            </div>
          </div>

          <div className="accent-line mb-8" />

          <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
            {isLogin ? "Hoş Geldiniz" : "Aramıza Katılın"}
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-10">
            MAS TECHNIC müşteri portalı ile üretim süreçlerinizi tek noktadan yönetin.
          </p>

          <div className="space-y-5 mb-10">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <CheckCircle size={16} className="text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-white/70">{benefit}</span>
              </motion.div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10 flex items-center gap-3">
            <Shield size={16} className="text-primary/60" />
            <span className="text-[11px] text-white/30 uppercase tracking-wider">
              256-bit SSL ile korunan güvenli bağlantı
            </span>
          </div>

          {/* Decorative quote */}
          <div className="mt-12 p-6 border border-white/10 bg-white/[0.02]">
            <p className="text-white/50 text-sm italic leading-relaxed">
              "MAS TECHNIC ile üretim süreçlerimizi çok daha verimli yönetiyoruz. Hassasiyet ve zamanında teslimat konusunda mükemmeller."
            </p>
            <p className="text-white/30 text-xs mt-3">— Müşteri Referansı</p>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-background relative">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.03]">
          <svg viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
            <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
            <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
          </svg>
        </div>

        <motion.div
          className="w-full max-w-md px-8 py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {/* Back to home */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ChevronLeft size={14} />
            Ana Sayfa
          </Link>

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">MT</span>
            </div>
            <div>
              <div className="font-bold text-sm tracking-tight">MAS TECHNIC</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest">
                Müşteri Portalı
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight mb-2">
              {isLogin ? "Giriş Yapın" : "Hesap Oluşturun"}
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
                <AtSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
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
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-12"
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

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 font-semibold uppercase tracking-wider text-sm"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  {isLogin ? "Giriş Yap" : "Hesap Oluştur"}
                  <ArrowRight size={16} className="ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Separator */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-xs text-muted-foreground uppercase tracking-wider">
                veya
              </span>
            </div>
          </div>

          {/* Toggle */}
          <div className="text-center">
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

          {/* Terms */}
          <p className="text-[11px] text-muted-foreground/60 text-center mt-8 leading-relaxed">
            Devam ederek{" "}
            <Link to="/gizlilik-politikasi" className="underline hover:text-primary">
              Gizlilik Politikası
            </Link>
            {"'nı ve "}
            <Link to="/kvkk" className="underline hover:text-primary">
              KVKK Aydınlatma Metni
            </Link>
            {"'ni kabul etmiş olursunuz."}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
