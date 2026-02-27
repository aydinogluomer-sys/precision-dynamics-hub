import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Loader2,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle,
  Shield,
  ChevronLeft,
  AtSign,
  User,
  Building2,
  Phone,
  MapPin,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FloatingPaths from "@/components/FloatingPaths";

const GoogleIcon = (props: React.ComponentProps<"svg">) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const LinkedInIcon = (props: React.ComponentProps<"svg">) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0A66C2" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const benefits = [
  "Teklif taleplerinizi anlık takip edin",
  "Sipariş durumunuzu görüntüleyin",
  "Geçmiş projelerinize erişin",
  "Mühendislerimizle doğrudan iletişim kurun",
];

const SocialButtons = ({
  socialLoading,
  onSocial,
}: {
  socialLoading: string | null;
  onSocial: (p: "google" | "linkedin_oidc") => void;
}) => (
  <div className="grid grid-cols-2 gap-3">
    <Button
      variant="outline"
      className="h-12 gap-2.5 font-medium text-sm"
      onClick={() => onSocial("google")}
      disabled={!!socialLoading}
    >
      {socialLoading === "google" ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <GoogleIcon className="w-5 h-5" />
      )}
      Google
    </Button>
    <Button
      variant="outline"
      className="h-12 gap-2.5 font-medium text-sm"
      onClick={() => onSocial("linkedin_oidc")}
      disabled={!!socialLoading}
    >
      {socialLoading === "linkedin_oidc" ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <LinkedInIcon className="w-5 h-5" />
      )}
      LinkedIn
    </Button>
  </div>
);

const AuthSeparator = () => (
  <div className="relative my-6">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-border" />
    </div>
    <div className="relative flex justify-center">
      <span className="bg-background px-4 text-[11px] text-muted-foreground uppercase tracking-[0.2em]">
        veya e-posta ile
      </span>
    </div>
  </div>
);

const LeftPanel = ({ isLogin }: { isLogin: boolean }) => (
  <div className="hidden lg:flex lg:w-[45%] relative bg-industrial-dark overflow-hidden items-center justify-center">
    <FloatingPaths position={1} />
    <FloatingPaths position={-1} />
    <motion.div
      className="relative z-10 max-w-sm px-10 flex flex-col items-start"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-12">
        <div className="w-11 h-11 bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-base">MT</span>
        </div>
        <div>
          <div className="text-white font-bold text-base tracking-tight">MAS TECHNIC</div>
          <div className="text-white/40 text-[10px] uppercase tracking-[0.3em]">Precision Engineering</div>
        </div>
      </div>
      <div className="w-10 h-[2px] bg-primary mb-8" />
      <h2 className="text-2xl font-bold text-white tracking-tight mb-3">
        {isLogin ? "Hoş Geldiniz" : "Aramıza Katılın"}
      </h2>
      <p className="text-white/50 text-sm leading-relaxed mb-10">
        MAS TECHNIC müşteri portalı ile üretim süreçlerinizi tek noktadan yönetin.
      </p>
      <div className="space-y-4">
        {benefits.map((b, i) => (
          <motion.div
            key={i}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <CheckCircle size={15} className="text-primary mt-0.5 shrink-0" />
            <span className="text-[13px] text-white/65 leading-snug">{b}</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-14 pt-6 border-t border-white/10 flex items-center gap-3">
        <Shield size={14} className="text-primary/50" />
        <span className="text-[10px] text-white/25 uppercase tracking-wider">
          256-bit SSL ile korunan güvenli bağlantı
        </span>
      </div>
    </motion.div>
  </div>
);

/* ── Form field helper ── */
const FormField = ({
  label,
  icon: Icon,
  required = false,
  children,
}: {
  label: string;
  icon: React.ElementType;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div>
    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
      {label} {!required && <span className="normal-case tracking-normal font-normal">(opsiyonel)</span>}
    </label>
    <div className="relative">
      <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
      {children}
    </div>
  </div>
);

const HCAPTCHA_SITE_KEY = "95ae4f14-f512-4a34-ad44-8e04ce323240";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      toast.error("Lütfen CAPTCHA doğrulamasını tamamlayın.");
      return;
    }
    setLoading(true);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: { captchaToken },
      });
      setCaptchaToken(null);
      captchaRef.current?.resetCaptcha();
      if (error) {
        toast.error("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
        setLoading(false);
        return;
      }
      toast.success("Giriş başarılı!");
      navigate("/musteri-paneli");
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          captchaToken,
          emailRedirectTo: window.location.origin,
          data: { full_name: fullName },
        },
      });
      setCaptchaToken(null);
      captchaRef.current?.resetCaptcha();
      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }
      if (data.user) {
        await supabase.from("profiles").upsert({
          id: data.user.id,
          full_name: fullName,
          company,
          phone,
          city,
        });
      }
      toast.success("Kayıt başarılı! E-posta adresinizi doğrulayın.");
    }
    setLoading(false);
  };

  const handleSocialLogin = async (provider: "google" | "linkedin_oidc") => {
    setSocialLoading(provider);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/musteri-paneli` },
    });
    if (error) toast.error("Giriş başarısız: " + error.message);
    setSocialLoading(null);
  };

  return (
    <div className="min-h-screen w-full flex">
      <LeftPanel isLogin={isLogin} />

      <div className="w-full lg:w-[55%] flex items-center justify-center bg-background px-6 py-12">
        <motion.div
          className="w-full max-w-[420px]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ChevronLeft size={14} />
            Ana Sayfa
          </Link>

          <div className="lg:hidden flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">MT</span>
            </div>
            <div>
              <div className="font-bold text-sm tracking-tight">MAS TECHNIC</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Müşteri Portalı</div>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-[26px] font-bold tracking-tight mb-2">
              {isLogin ? "Giriş Yapın" : "Hesap Oluşturun"}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isLogin
                ? "Hesabınıza giriş yaparak projelerinizi takip edin."
                : "Bilgilerinizi doldurarak müşteri portalına erişim sağlayın."}
            </p>
          </div>

          <SocialButtons socialLoading={socialLoading} onSocial={handleSocialLogin} />
          <AuthSeparator />

          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? "login" : "signup"}
              onSubmit={handleSubmit}
              className="space-y-4"
              initial={{ opacity: 0, x: isLogin ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 10 : -10 }}
              transition={{ duration: 0.25 }}
            >
              {/* Registration-only fields */}
              {!isLogin && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <FormField label="Ad Soyad" icon={User} required>
                      <Input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="pl-10 h-11"
                        placeholder="Ahmet Yılmaz"
                        maxLength={100}
                      />
                    </FormField>
                    <FormField label="Firma" icon={Building2}>
                      <Input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="pl-10 h-11"
                        placeholder="Firma Adı"
                        maxLength={100}
                      />
                    </FormField>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <FormField label="Telefon" icon={Phone}>
                      <Input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10 h-11"
                        placeholder="05XX XXX XX XX"
                        maxLength={20}
                      />
                    </FormField>
                    <FormField label="Şehir" icon={MapPin}>
                      <Input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="pl-10 h-11"
                        placeholder="İstanbul"
                        maxLength={50}
                      />
                    </FormField>
                  </div>
                </>
              )}

              <FormField label="E-posta" icon={AtSign} required>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11"
                  placeholder="ornek@firma.com"
                />
              </FormField>

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
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-12 h-11"
                    placeholder="••••••••"
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-center">
                <HCaptcha
                  ref={captchaRef}
                  sitekey={HCAPTCHA_SITE_KEY}
                  onVerify={(token) => setCaptchaToken(token)}
                  onExpire={() => setCaptchaToken(null)}
                />
              </div>

              <Button
                type="submit"
                disabled={loading || !captchaToken}
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
            </motion.form>
          </AnimatePresence>

          <div className="text-center mt-6">
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

          <p className="text-[11px] text-muted-foreground/50 text-center mt-6 leading-relaxed">
            Devam ederek{" "}
            <Link to="/gizlilik-politikasi" className="underline hover:text-primary">Gizlilik Politikası</Link>
            {"'nı ve "}
            <Link to="/kvkk" className="underline hover:text-primary">KVKK Aydınlatma Metni</Link>
            {"'ni kabul etmiş olursunuz."}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
