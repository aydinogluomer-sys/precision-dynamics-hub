import { useState, Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, Environment } from "@react-three/drei";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Cog, ChevronLeft, Rocket, CheckCircle2, Zap, Clock,
  Layers, Droplets, Paintbrush, Package, HardHat, ArrowRight, Lightbulb,
  Upload, ClipboardCheck, Eye, Send,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ── 3D Parça ──
const ComplexPart = () => (
  <group>
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[2.4, 0.3, 1.6]} />
      <meshStandardMaterial color="hsl(210,8%,60%)" metalness={0.75} roughness={0.25} />
    </mesh>
    <mesh position={[-0.9, 0.6, 0]}>
      <boxGeometry args={[0.25, 0.9, 1.6]} />
      <meshStandardMaterial color="hsl(210,8%,60%)" metalness={0.75} roughness={0.25} />
    </mesh>
    <mesh position={[0.9, 0.6, 0]}>
      <boxGeometry args={[0.25, 0.9, 1.6]} />
      <meshStandardMaterial color="hsl(210,8%,60%)" metalness={0.75} roughness={0.25} />
    </mesh>
    <mesh position={[0, 1.05, 0]}>
      <boxGeometry args={[2.05, 0.2, 0.8]} />
      <meshStandardMaterial color="hsl(210,8%,60%)" metalness={0.75} roughness={0.25} />
    </mesh>
    {[[-0.6, -0.15, -0.5], [0.6, -0.15, -0.5], [-0.6, -0.15, 0.5], [0.6, -0.15, 0.5]].map((pos, i) => (
      <mesh key={i} position={pos as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.12, 0.03, 16, 32]} />
        <meshStandardMaterial color="hsl(210,10%,40%)" metalness={0.8} roughness={0.2} />
      </mesh>
    ))}
    {[-0.3, 0.3].map((x, i) => (
      <mesh key={`rib-${i}`} position={[x, 0.35, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.08, 0.5, 0.6]} />
        <meshStandardMaterial color="hsl(210,8%,60%)" metalness={0.7} roughness={0.3} />
      </mesh>
    ))}
    <mesh position={[0, 1.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.2, 0.05, 16, 32]} />
      <meshStandardMaterial color="hsl(210,10%,35%)" metalness={0.85} roughness={0.15} />
    </mesh>
  </group>
);

// ── Yüzey İşlemi Seçenekleri ──
const surfaceFinishes = [
  { id: "machined", label: "İşlenmiş Yüzey", icon: Layers, desc: "Ra 3.2μm", priceAdd: 0 },
  { id: "bead", label: "Kumlama", icon: Droplets, desc: "Mat yüzey", priceAdd: 3 },
  { id: "anodized", label: "Anodizasyon", icon: Paintbrush, desc: "Tip II/III", priceAdd: 8 },
  { id: "powder", label: "Toz Boya", icon: Package, desc: "Dayanıklı", priceAdd: 6 },
];

// ── Malzeme Seçenekleri ve Birim Fiyatları ──
const materials = [
  { id: "al6061", label: "Alüminyum 6061-T6", unitPrice: 42 },
  { id: "al7075", label: "Alüminyum 7075-T6", unitPrice: 56 },
  { id: "ss304", label: "Paslanmaz Çelik 304", unitPrice: 68 },
  { id: "ss316", label: "Paslanmaz Çelik 316L", unitPrice: 78 },
  { id: "steel", label: "Çelik 1045", unitPrice: 38 },
  { id: "brass", label: "Pirinç C360", unitPrice: 52 },
  { id: "titanium", label: "Titanyum Grade 5", unitPrice: 120 },
];

// ── Hizmet Seçenekleri ──
const services = [
  { id: "cnc-mill", label: "CNC Frezeleme (3 & 5 Eksen)" },
  { id: "cnc-turn", label: "CNC Tornalama" },
  { id: "edm", label: "Tel Erozyon (EDM)" },
  { id: "grinding", label: "Taşlama" },
];

// ── Ana Bileşen ──
const TeklifAl = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [selectedFinish, setSelectedFinish] = useState("machined");
  const [delivery, setDelivery] = useState<"standard" | "express">("standard");
  const [quantity, setQuantity] = useState(25);
  const [selectedService, setSelectedService] = useState("cnc-mill");
  const [selectedMaterial, setSelectedMaterial] = useState("al6061");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dinamik fiyat hesaplama
  const pricing = useMemo(() => {
    const mat = materials.find((m) => m.id === selectedMaterial)!;
    const finish = surfaceFinishes.find((f) => f.id === selectedFinish)!;
    const unitBase = mat.unitPrice + finish.priceAdd;
    const subtotal = unitBase * quantity;
    const expressMultiplier = delivery === "express" ? 1.3 : 1;
    const total = Math.round(subtotal * expressMultiplier);
    const perUnit = Math.round(unitBase * expressMultiplier * 100) / 100;
    return { unitBase, subtotal, total, perUnit, expressExtra: delivery === "express" ? Math.round(subtotal * 0.3) : 0 };
  }, [selectedMaterial, selectedFinish, quantity, delivery]);

  const currentService = services.find((s) => s.id === selectedService)!;
  const currentMaterial = materials.find((m) => m.id === selectedMaterial)!;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const rfqId = `RFQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    try {
      const { error } = await supabase.from("rfqs").insert({
        id: rfqId,
        customer: "AeroBracket V2",
        company: "Precision Client",
        email: "client@precision.com",
        quantity,
        date: new Date().toISOString().split("T")[0],
        status: "Yeni",
        service: currentService.label,
        material: currentMaterial.label,
        notes: `Yüzey: ${selectedFinish}, Teslimat: ${delivery}, Toplam: ₺${pricing.total}`,
        files: ["Aerospace_Bracket_v2.step"],
      });
      if (error) throw error;
      toast.success("Teklif talebiniz başarıyla gönderildi! 24 saat içinde dönüş yapacağız.");
    } catch (err: unknown) {
      toast.error("Gönderim hatası: " + (err instanceof Error ? err.message : "Bilinmeyen hata"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: "01", label: "DOSYA YÜKLE", icon: Upload, done: currentStep > 1, active: currentStep === 1 },
    { num: "02", label: "ÖZELLİKLER", icon: Cog, done: currentStep > 2, active: currentStep === 2 },
    { num: "03", label: "İNCELE", icon: Eye, done: currentStep > 3, active: currentStep === 3 },
    { num: "04", label: "GÖNDER", icon: Send, done: false, active: currentStep === 4 },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Ana içerik - header yüksekliği kadar padding-top */}
      <div className="container-industrial pt-24 pb-16">
        {/* Başlık + Adım rozeti */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="heading-industrial text-3xl md:text-4xl">
              Hassas Fiyat Teklifi Alın
            </h1>
            <p className="subheading-industrial text-sm mt-1">
              Endüstriyel hassasiyet, yüksek hızlı üretim döngüleriyle buluşuyor.
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <Badge className="text-[10px] font-bold px-3 py-1 bg-industrial-accent-light text-primary border-none">
              ADIM {currentStep} / 4
            </Badge>
            <p className="text-xs font-semibold mt-1 text-muted-foreground">Üretim Detayları</p>
          </div>
        </div>

        {/* ── 4 ADIMLI STEPPER ── */}
        <div className="flex items-center gap-0 mb-8">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="flex items-center flex-1">
                <button
                  onClick={() => setCurrentStep(i + 1)}
                  className="flex items-center gap-2 group"
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center text-xs font-bold transition-colors ${
                      s.done
                        ? "bg-primary text-primary-foreground"
                        : s.active
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s.done ? <CheckCircle2 size={14} /> : <Icon size={14} />}
                  </div>
                  <span
                    className={`text-xs font-bold tracking-wider hidden md:inline ${
                      s.active || s.done ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {s.num}. {s.label}
                  </span>
                </button>
                {i < 3 && (
                  <div className={`flex-1 h-0.5 mx-3 ${s.done ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* ── İKİ KOLON DÜZENİ ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          {/* ══ SOL KOLON ══ */}
          <div className="space-y-6">
            {/* Dosya Kartı */}
            <div className="card-industrial p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-green-100 text-green-600">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold">Aerospace_Bracket_v2.step</p>
                  <p className="text-xs text-muted-foreground">14.5 MB • STEP Format</p>
                </div>
              </div>
              <button className="px-4 py-2 text-xs font-semibold bg-muted text-muted-foreground hover:bg-border transition-colors">
                Dosya Değiştir
              </button>
            </div>

            {/* 3D CAD Görüntüleyici */}
            <div className="card-industrial overflow-hidden">
              <div className="px-4 py-2.5 border-b border-border flex items-center justify-between">
                <span className="text-xs font-bold tracking-wider text-muted-foreground">CAD ÖNİZLEME</span>
                <span className="text-[10px] px-2 py-0.5 font-semibold bg-green-100 text-green-600">HAZIR</span>
              </div>
              <div className="h-[320px] relative bg-muted">
                <Canvas camera={{ position: [4, 3, 4], fov: 40 }} gl={{ antialias: true }}>
                  <Suspense fallback={null}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
                    <directionalLight position={[-3, 2, -3]} intensity={0.3} />
                    <Center>
                      <ComplexPart />
                    </Center>
                    <OrbitControls makeDefault enablePan enableZoom minDistance={2} maxDistance={15} />
                    <Environment preset="studio" />
                  </Suspense>
                </Canvas>
                <div className="absolute inset-0 pointer-events-none opacity-[0.04] grid-lines" />
              </div>
            </div>

            {/* Üretim Spesifikasyonları */}
            <div className="card-industrial p-6">
              <h2 className="text-base font-bold mb-5 flex items-center gap-2">
                <Cog size={16} className="text-primary" /> Üretim Spesifikasyonları
              </h2>

              {/* Hizmet & Malzeme */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest mb-1.5 text-muted-foreground">HİZMET</label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full border border-border bg-background px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-widest mb-1.5 text-muted-foreground">MALZEME</label>
                  <select
                    value={selectedMaterial}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                    className="w-full border border-border bg-background px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {materials.map((m) => (
                      <option key={m.id} value={m.id}>{m.label} — ₺{m.unitPrice}/adet</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Yüzey İşlemi */}
              <div className="mb-6">
                <label className="block text-[10px] font-bold tracking-widest mb-3 text-muted-foreground">YÜZEY İŞLEMİ</label>
                <div className="grid grid-cols-4 gap-3">
                  {surfaceFinishes.map((f) => {
                    const Icon = f.icon;
                    const isActive = selectedFinish === f.id;
                    return (
                      <button
                        key={f.id}
                        onClick={() => setSelectedFinish(f.id)}
                        className={`border-2 p-3.5 text-center transition-all duration-200 ${
                          isActive
                            ? "border-primary bg-industrial-accent-light"
                            : "border-border bg-background hover:border-muted-foreground"
                        }`}
                      >
                        <Icon size={20} className={`mx-auto mb-1.5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                        <p className={`text-xs font-bold ${isActive ? "text-primary" : "text-foreground"}`}>{f.label}</p>
                        <p className="text-[10px] text-muted-foreground">{f.desc}</p>
                        {f.priceAdd > 0 && (
                          <p className={`text-[9px] mt-1 font-semibold ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                            +₺{f.priceAdd}/adet
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Miktar & Teslimat */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest mb-1.5 text-muted-foreground">MİKTAR</label>
                  <div className="flex items-center border border-border overflow-hidden">
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="flex-1 px-3 py-2.5 text-sm font-bold focus:outline-none bg-background text-foreground"
                    />
                    <span className="px-3 text-[10px] font-bold tracking-widest text-muted-foreground bg-muted">ADET</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-widest mb-1.5 text-muted-foreground">TESLİMAT HIZI</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setDelivery("standard")}
                      className={`border-2 p-2.5 text-center transition-all ${
                        delivery === "standard"
                          ? "border-primary bg-industrial-accent-light"
                          : "border-border bg-background"
                      }`}
                    >
                      <Clock size={14} className={`mx-auto mb-1 ${delivery === "standard" ? "text-primary" : "text-muted-foreground"}`} />
                      <p className={`text-[10px] font-bold ${delivery === "standard" ? "text-primary" : "text-foreground"}`}>Standart</p>
                      <p className="text-[9px] text-muted-foreground">10-12 Gün</p>
                    </button>
                    <button
                      onClick={() => setDelivery("express")}
                      className={`border-2 p-2.5 text-center transition-all ${
                        delivery === "express"
                          ? "border-destructive bg-red-50"
                          : "border-border bg-background"
                      }`}
                    >
                      <Zap size={14} className={`mx-auto mb-1 ${delivery === "express" ? "text-destructive" : "text-muted-foreground"}`} />
                      <p className={`text-[10px] font-bold ${delivery === "express" ? "text-destructive" : "text-foreground"}`}>Ekspres</p>
                      <p className="text-[9px] text-muted-foreground">3-5 Gün (+%30)</p>
                    </button>
                  </div>
                </div>
              </div>

              {/* Alt Navigasyon */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <button
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold border border-border text-muted-foreground hover:bg-muted transition-colors"
                >
                  <ChevronLeft size={14} /> GERİ
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="btn-industrial-primary flex items-center gap-2 disabled:opacity-50"
                >
                  <Rocket size={16} />
                  {isSubmitting ? "GÖNDERİLİYOR..." : "ÜRETİME GÖNDER"}
                </button>
              </div>
            </div>
          </div>

          {/* ══ SAĞ KOLON ══ */}
          <div className="space-y-6">
            {/* Teklif Özeti Kartı */}
            <div className="card-industrial p-5">
              <h3 className="text-[10px] font-bold tracking-[0.2em] mb-4 text-muted-foreground">
                CANLI TEKLİF ÖZETİ
              </h3>

              <div className="space-y-3 mb-4">
                {[
                  ["Proje Adı", "AeroBracket V2"],
                  ["Hizmet", currentService.label],
                  ["Malzeme", currentMaterial.label],
                  ["Yüzey İşlemi", surfaceFinishes.find((f) => f.id === selectedFinish)!.label],
                  ["Sipariş Adedi", `${quantity} Adet`],
                  ["Birim Fiyat", `₺${pricing.perUnit}`],
                ].map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{key}</span>
                    <span className="text-xs font-bold">{value}</span>
                  </div>
                ))}
              </div>

              {delivery === "express" && (
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-destructive">Ekspres Ek Ücreti (+%30)</span>
                  <span className="text-xs font-bold text-destructive">+₺{pricing.expressExtra}</span>
                </div>
              )}

              {/* Kesik çizgi ayraç */}
              <div className="border-t-2 border-dashed border-border my-4" />

              {/* Toplam */}
              <div className="mb-3">
                <p className="text-[10px] font-bold tracking-[0.2em] mb-1 text-muted-foreground">TOPLAM FİYAT</p>
                <p className="text-3xl font-bold text-primary">
                  ₺{pricing.total.toLocaleString("tr-TR")}
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <CheckCircle2 size={12} className="text-green-600" />
                  <span className="text-[10px] font-medium text-green-600">
                    {delivery === "express"
                      ? "Yüksek hızlı ekspres işleme dahil"
                      : "Standart üretim süreci dahil"}
                  </span>
                </div>
              </div>

              {/* Hız İpucu */}
              <div className="p-3 mt-4 bg-industrial-accent-light">
                <div className="flex items-start gap-2">
                  <Lightbulb size={14} className="mt-0.5 shrink-0 text-primary" />
                  <p className="text-[11px] font-medium text-primary">
                    <span className="font-bold">HIZ İPUCU:</span> 50 adede çıkarak %15 toplu üretim tasarrufu elde edin.
                  </p>
                </div>
              </div>
            </div>

            {/* Teknik Destek Kartı */}
            <div className="relative p-5 overflow-hidden bg-industrial-dark">
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <HardHat size={100} className="text-white" />
              </div>

              <h3 className="text-sm font-bold text-white mb-2">Teknik Destek</h3>
              <p className="text-xs leading-relaxed mb-4 text-industrial-steel">
                Hassas mühendislerimiz, tasarımınızı üretilebilirlik açısından incelemeye
                ve üretim sürecinizi optimize etmeye hazır.
              </p>
              <button className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold border border-white/20 text-white hover:bg-white/10 transition-colors">
                <HardHat size={14} /> MÜHENDİSE DANIŞIN
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TeklifAl;
