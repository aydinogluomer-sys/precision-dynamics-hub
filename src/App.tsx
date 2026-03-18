import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ScrollToTop from "@/components/ScrollToTop";

// Eager load: Index (landing page)
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load: all other pages
const SSS = lazy(() => import("./pages/SSS"));
const GizlilikPolitikasi = lazy(() => import("./pages/GizlilikPolitikasi"));
const KVKK = lazy(() => import("./pages/KVKK"));
const CerezPolitikasi = lazy(() => import("./pages/CerezPolitikasi"));
const Hakkimizda = lazy(() => import("./pages/Hakkimizda"));
const Iletisim = lazy(() => import("./pages/Iletisim"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Malzemeler = lazy(() => import("./pages/Malzemeler"));
const MalzemeKategori = lazy(() => import("./pages/MalzemeKategori"));
const TeklifAl = lazy(() => import("./pages/TeklifAl"));

const MusteriPaneli = lazy(() => import("./pages/MusteriPaneli"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
import ProtectedRoute from "./components/ProtectedRoute";
import CustomerProtectedRoute from "./components/CustomerProtectedRoute";

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

const queryClient = new QueryClient();

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: "easeIn" as const } },
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes location={location}>
        <Route path="/" element={<Index />} />
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
        <Route path="/musteri-paneli" element={<CustomerProtectedRoute><MusteriPaneli /></CustomerProtectedRoute>} />
        <Route path="/teklif-al" element={<TeklifAl />} />
        <Route path="/cad-dashboard" element={<Navigate to="/teklif-al" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

import ChatBot from "@/components/ChatBot";
import CursorFollower from "@/components/CursorFollower";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CursorFollower />
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AnimatedRoutes />
        <ChatBot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
