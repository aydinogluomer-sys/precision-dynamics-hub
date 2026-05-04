import { Suspense, lazy, useMemo, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { useSoundEngine } from "@/hooks/use-sound";
import { useAmbientGlow } from "@/hooks/useAmbientGlow";

import { Index } from "./pages/Index";
import { NotFound } from "./pages/NotFound";

const SSS = lazy(() => import("./pages/SSS").then((m) => ({ default: m.SSS })));
const GizlilikPolitikasi = lazy(() =>
  import("./pages/GizlilikPolitikasi").then((m) => ({ default: m.GizlilikPolitikasi })),
);
const KVKK = lazy(() => import("./pages/KVKK").then((m) => ({ default: m.KVKK })));
const CerezPolitikasi = lazy(() => import("./pages/CerezPolitikasi").then((m) => ({ default: m.CerezPolitikasi })));
const Hakkimizda = lazy(() => import("./pages/Hakkimizda").then((m) => ({ default: m.Hakkimizda })));
const Iletisim = lazy(() => import("./pages/Iletisim").then((m) => ({ default: m.Iletisim })));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail").then((m) => ({ default: m.ServiceDetail })));
const Blog = lazy(() => import("./pages/Blog").then((m) => ({ default: m.Blog })));
const BlogDetail = lazy(() => import("./pages/BlogDetail").then((m) => ({ default: m.BlogDetail })));
const AdminLogin = lazy(() => import("./pages/AdminLogin").then((m) => ({ default: m.AdminLogin })));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard").then((m) => ({ default: m.AdminDashboard })));
const Login = lazy(() => import("./pages/Login").then((m) => ({ default: m.Login })));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword").then((m) => ({ default: m.ForgotPassword })));
const ResetPassword = lazy(() => import("./pages/ResetPassword").then((m) => ({ default: m.ResetPassword })));
const Malzemeler = lazy(() => import("./pages/Malzemeler").then((m) => ({ default: m.Malzemeler })));
const MalzemeKategori = lazy(() => import("./pages/MalzemeKategori").then((m) => ({ default: m.MalzemeKategori })));
const TeklifAl = lazy(() => import("./pages/TeklifAl").then((m) => ({ default: m.TeklifAl })));
const MusteriPaneli = lazy(() => import("./pages/MusteriPaneli").then((m) => ({ default: m.MusteriPaneli })));
const CategoryPage = lazy(() => import("./pages/CategoryPage").then((m) => ({ default: m.CategoryPage })));
const TestHowWeWork = lazy(() => import("./pages/TestHowWeWork").then((m) => ({ default: m.TestHowWeWork })));

import { ProtectedRoute } from "./components/ProtectedRoute";
import { CustomerProtectedRoute } from "./components/CustomerProtectedRoute";

const ChatBot = lazy(() => import("@/components/ChatBot").then((m) => ({ default: m.ChatBot })));
const CustomCursor = lazy(() =>
  import("@/components/ui/CustomCursor").then((m) => ({ default: m.CustomCursor })),
);
const GrainOverlay = lazy(() =>
  import("@/components/ui/GrainOverlay").then((m) => ({ default: m.GrainOverlay })),
);
const BrutalCrosshairCursor = lazy(() =>
  import("@/components/ui/BrutalCrosshairCursor").then((m) => ({ default: m.BrutalCrosshairCursor })),
);

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

const queryClient = new QueryClient();

// Page transition handled by PageTransition component

const AnimatedRoutes = () => {
  const location = useLocation();

  const isPanel = useMemo(() => {
    return location.pathname.startsWith("/admin") || location.pathname.startsWith("/musteri-paneli");
  }, [location.pathname]);

  const panelRoutes = (
    <Suspense fallback={<PageLoader />}>
      <Routes location={location}>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/musteri-paneli"
          element={
            <CustomerProtectedRoute>
              <MusteriPaneli />
            </CustomerProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );

  const publicRoutes = (
    <PageTransition>
      <Suspense fallback={<PageLoader />}>
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/test" element={<TestHowWeWork />} />
          <Route path="/sss" element={<SSS />} />
          <Route path="/gizlilik-politikasi" element={<GizlilikPolitikasi />} />
          <Route path="/kvkk" element={<KVKK />} />
          <Route path="/cerez-politikasi" element={<CerezPolitikasi />} />
          <Route path="/hakkimizda" element={<Hakkimizda />} />
          <Route path="/iletisim" element={<Iletisim />} />
          <Route path="/malzemeler" element={<Malzemeler />} />
          <Route path="/malzemeler/:slug" element={<MalzemeKategori />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/hizmetler/kategori/:slug" element={<CategoryPage />} />
          <Route path="/kabiliyetler/kategori/:slug" element={<CategoryPage />} />
          <Route path="/endustriyel/kategori/:slug" element={<CategoryPage />} />
          <Route path="/hizmetler/:slug" element={<ServiceDetail />} />
          <Route path="/kabiliyetler/:slug" element={<ServiceDetail />} />
          <Route path="/endustriyel/:slug" element={<ServiceDetail />} />
          <Route path="/giris" element={<Login />} />
          <Route path="/sifremi-unuttum" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/teklif-al" element={<TeklifAl />} />
          <Route path="/cad-dashboard" element={<Navigate to="/teklif-al" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </PageTransition>
  );

  return isPanel ? panelRoutes : publicRoutes;
};

const AppContent = () => {
  const location = useLocation();
  useAmbientGlow();

  // Konami Code easter egg
  useEffect(() => {
    const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    let idx = 0;
    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[idx]) {
        idx++;
        if (idx === KONAMI.length) {
          document.body.style.transition = "filter 0.3s";
          document.body.style.filter = "hue-rotate(45deg)";
          setTimeout(() => {
            document.body.style.filter = "hue-rotate(0deg)";
            setTimeout(() => { document.body.style.filter = ""; }, 500);
          }, 2000);
          idx = 0;
        }
      } else {
        idx = 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const isPanel = useMemo(() => {
    return location.pathname.startsWith("/admin") || location.pathname.startsWith("/musteri-paneli");
  }, [location.pathname]);

  const isLanding = location.pathname === "/";

  const content = (
    <>
      <ScrollToTop />
      {!isPanel && (
        <Suspense fallback={null}>
          <GrainOverlay />
        </Suspense>
      )}
      {isLanding && (
        <Suspense fallback={null}>
          <BrutalCrosshairCursor />
        </Suspense>
      )}
      <AnimatedRoutes />
      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
    </>
  );

  return isPanel ? content : <SmoothScrollProvider>{content}</SmoothScrollProvider>;
};

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CursorMount />
        <ScrollProgress />
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

/** Mount default CustomCursor on every route EXCEPT landing (which uses brutal crosshair). */
const CursorMount = () => {
  const location = useLocation();
  if (location.pathname === "/") return null;
  return (
    <Suspense fallback={null}>
      <CustomCursor />
    </Suspense>
  );
};
