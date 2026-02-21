import { useState, Suspense, useRef } from "react";
import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, Environment } from "@react-three/drei";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Cog, ChevronLeft, ChevronRight, Rocket, CheckCircle2, Zap, Clock,
  Layers, Droplets, Paintbrush, Package, HardHat, ArrowRight,
  Upload, Eye, Send, Shield, Gauge, FileCheck, Edit3, FileUp,
  ClipboardList, AlertCircle, MessageCircle, HelpCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { materialsData, materialCategories } from "@/data/materialsData";

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
  { id: "machined", label: "İşlenmiş Yüzey", icon: Layers, desc: "Ra 3.2μm" },
  { id: "bead", label: "Kumlama", icon: Droplets, desc: "Mat yüzey" },
  { id: "anodized", label: "Anodizasyon", icon: Paintbrush, desc: "Tip II/III" },
  { id: "powder", label: "Toz Boya", icon: Package, desc: "Dayanıklı" },
];

// ── Malzeme kütüphanesinden gruplu seçenekler ──
const materialOptions = materialCategories.map((cat) => ({
  category: cat.name,
  items: materialsData
    .filter((m) => m.subcategory === cat.subcategoryKey)
    .map((m) => ({ id: m.id, label: m.name })),
}));

// ── Hizmet Seçenekleri ──
const services = [
  { id: "cnc-mill", label: "CNC Frezeleme (3 & 5 Eksen)" },
  { id: "cnc-turn", label: "CNC Tornalama" },
  { id: "edm", label: "Tel Erozyon (EDM)" },
  { id: "grinding", label: "Taşlama" },
];

// ── Ana Bileşen ──
const TeklifAl = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFinish, setSelectedFinish] = useState("machined");
  const [delivery, setDelivery] = useState<"standard" | "express">("standard");
  const [quantity, setQuantity] = useState(25);
  const [selectedService, setSelectedService] = useState("cnc-mill");
  const [selectedMaterial, setSelectedMaterial] = useState("al-6061-t6");
  const [customMaterial, setCustomMaterial] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentService = services.find((s) => s.id === selectedService)!;
  const materialLabel =
    selectedMaterial === "other"
      ? customMaterial || "Belirtilmedi"
      : materialsData.find((m) => m.id === selectedMaterial)?.name ?? selectedMaterial;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setUploadedFile({ name: file.name, size: `${sizeMB} MB` });
      toast.success(`"${file.name}" dosyası yüklendi.`);
    }
  };

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
        material: materialLabel,
        notes: `Yüzey: ${selectedFinish}, Teslimat: ${delivery}`,
        files: uploadedFile ? [uploadedFile.name] : [],
      });
      if (error) throw error;
      toast.success("Teklif talebiniz başarıyla gönderildi! 24 saat içinde dönüş yapacağız.");
    } catch (err: unknown) {
      toast.error("Gönderim hatası: " + (err instanceof Error ? err.message : "Bilinmeyen hata"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    if (currentStep === 1 && !uploadedFile) return false;
    return true;
  };

  const handleNext = () => {
    if (!canProceed()) {
      toast.error("Lütfen devam etmeden önce dosya yükleyiniz.");
      return;
    }
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const steps = [
    { num: "01", label: "DOSYA YÜKLE", icon: Upload, done: currentStep > 1, active: currentStep === 1 },
    { num: "02", label: "ÖZELLİKLER", icon: Cog, done: currentStep > 2, active: currentStep === 2 },
    { num: "03", label: "İNCELE", icon: Eye, done: currentStep > 3, active: currentStep === 3 },
    { num: "04", label: "GÖNDER", icon: Send, done: false, active: currentStep === 4 },
  ];

  // ── Adım 1: Dosya Yükleme ──
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="card-industrial p-6">
        <h2 className="text-base font-bold mb-3 flex items-center gap-2">
          <Upload size={16} className="text-primary" /> CAD Dosyası Yükleme
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          Üretilecek parçanın 3D modelini yükleyin. STEP, STP, IGES, STL, OBJ ve 3MF formatları desteklenir.
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept=".step,.stp,.iges,.igs,.stl,.obj,.3mf,.x_t,.x_b"
          className="hidden"
          onChange={handleFileChange}
        />

        {uploadedFile ? (
          <div>
            {/* Yüklenen Dosya Kartı */}
            <div className="p-4 flex items-center justify-between border border-primary/30 bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold">{uploadedFile.name}</p>
                  <p className="text-xs text-muted-foreground">{uploadedFile.size} • STEP Format</p>
                </div>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 text-xs font-semibold bg-muted text-muted-foreground hover:bg-border transition-colors"
              >
                Dosyayı Değiştir
              </button>
            </div>

            {/* 3D CAD Viewer */}
            <div className="card-industrial overflow-hidden mt-4">
              <div className="px-4 py-2.5 border-b border-border flex items-center justify-between">
                <span className="text-xs font-bold tracking-wider text-muted-foreground">CAD ÖNİZLEME</span>
                <span className="text-[10px] px-2 py-0.5 font-semibold bg-primary/10 text-primary">HAZIR</span>
              </div>
              <div className="h-[380px] relative bg-muted">
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
              </div>
            </div>
          </div>
        ) : (
          /* Dosya yükleme alanı - büyük */
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full min-h-[340px] border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-5 transition-colors group"
          >
            <div className="w-20 h-20 flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
              <FileUp size={36} />
            </div>
            <div className="text-center">
              <p className="text-base font-bold">CAD dosyanızı buraya sürükleyin veya tıklayın</p>
              <p className="text-xs text-muted-foreground mt-2">STEP, STP, IGES, STL, OBJ, 3MF • Maks. 100 MB</p>
            </div>
            <div className="flex items-center gap-4 mt-2">
              {["STEP", "STL", "OBJ", "IGES", "3MF"].map((fmt) => (
                <span key={fmt} className="text-[10px] font-bold tracking-widest text-muted-foreground bg-muted px-2.5 py-1">
                  {fmt}
                </span>
              ))}
            </div>
          </button>
        )}
      </div>
    </div>
  );

  // ── Adım 2: Üretim Spesifikasyonları ──
  const renderStep2 = () => (
    <div className="space-y-6">
      {/* Dosya Kartı (mini) */}
      {uploadedFile && (
        <div className="card-industrial p-3 flex items-center gap-3">
          <CheckCircle2 size={16} className="text-primary shrink-0" />
          <p className="text-xs font-bold truncate">{uploadedFile.name}</p>
          <p className="text-[10px] text-muted-foreground shrink-0">{uploadedFile.size}</p>
        </div>
      )}

      <div className="card-industrial p-6">
        <h2 className="text-base font-bold mb-5 flex items-center gap-2">
          <Cog size={16} className="text-primary" /> Üretim Spesifikasyonları
        </h2>

        {/* Hizmet & Malzeme */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
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
              {materialOptions.map((group) => (
                <optgroup key={group.category} label={group.category}>
                  {group.items.map((m) => (
                    <option key={m.id} value={m.id}>{m.label}</option>
                  ))}
                </optgroup>
              ))}
              <optgroup label="─────────">
                <option value="other">Diğer (Manuel Giriş)</option>
              </optgroup>
            </select>
            {selectedMaterial === "other" && (
              <div className="mt-2 flex items-center gap-2">
                <Edit3 size={14} className="text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Malzeme adını yazınız..."
                  value={customMaterial}
                  onChange={(e) => setCustomMaterial(e.target.value)}
                  className="w-full border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            )}
          </div>
        </div>

        {/* Yüzey İşlemi */}
        <div className="mb-6">
          <label className="block text-[10px] font-bold tracking-widest mb-3 text-muted-foreground">YÜZEY İŞLEMİ</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
                </button>
              );
            })}
          </div>
        </div>

        {/* Miktar & Teslimat */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    ? "border-destructive bg-destructive/10"
                    : "border-border bg-background"
                }`}
              >
                <Zap size={14} className={`mx-auto mb-1 ${delivery === "express" ? "text-destructive" : "text-muted-foreground"}`} />
                <p className={`text-[10px] font-bold ${delivery === "express" ? "text-destructive" : "text-foreground"}`}>Ekspres</p>
                <p className="text-[9px] text-muted-foreground">3-5 Gün</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── Adım 3: İnceleme ──
  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="card-industrial p-6">
        <h2 className="text-base font-bold mb-5 flex items-center gap-2">
          <ClipboardList size={16} className="text-primary" /> Sipariş Özeti
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Lütfen aşağıdaki bilgileri kontrol edin. Bir sorun yoksa "İleri" ile gönderim adımına geçebilirsiniz.
        </p>

        <div className="space-y-4">
          {/* Dosya bilgisi */}
          <div className="p-4 bg-muted/50 border border-border">
            <p className="text-[10px] font-bold tracking-widest text-muted-foreground mb-2">DOSYA</p>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-primary" />
              <span className="text-sm font-bold">{uploadedFile?.name ?? "Yüklenmedi"}</span>
              {uploadedFile && <span className="text-xs text-muted-foreground">({uploadedFile.size})</span>}
            </div>
          </div>

          {/* Spesifikasyon özeti */}
          <div className="p-4 bg-muted/50 border border-border">
            <p className="text-[10px] font-bold tracking-widest text-muted-foreground mb-3">ÜRETİM DETAYLARI</p>
            <div className="space-y-2.5">
              {[
                ["Hizmet", currentService.label],
                ["Malzeme", materialLabel],
                ["Yüzey İşlemi", surfaceFinishes.find((f) => f.id === selectedFinish)!.label],
                ["Miktar", `${quantity} Adet`],
                ["Teslimat", delivery === "express" ? "Ekspres (3-5 Gün)" : "Standart (10-12 Gün)"],
              ].map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{key}</span>
                  <span className="text-xs font-bold">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Uyarı */}
          <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/20">
            <AlertCircle size={16} className="text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              Teklif talebiniz gönderildikten sonra mühendislerimiz dosyanızı inceleyecek ve 
              24 saat içinde size detaylı fiyat ve süre bilgisi ile dönüş yapacaktır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // ── Adım 4: Gönderim ──
  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="card-industrial p-6 text-center">
        <div className="w-16 h-16 mx-auto flex items-center justify-center bg-primary/10 mb-4">
          <Rocket size={28} className="text-primary" />
        </div>
        <h2 className="text-lg font-bold mb-2">Teklif Talebinizi Gönderin</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
          Tüm bilgileriniz hazır. "Üretime Gönder" butonuna tıklayarak teklif talebinizi ekibimize iletebilirsiniz.
        </p>

        {/* Mini özet */}
        <div className="text-left max-w-sm mx-auto space-y-2 mb-6 p-4 bg-muted/50 border border-border">
          {[
            ["Dosya", uploadedFile?.name ?? "-"],
            ["Hizmet", currentService.label],
            ["Malzeme", materialLabel],
            ["Miktar", `${quantity} Adet`],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between text-xs">
              <span className="text-muted-foreground">{k}</span>
              <span className="font-bold">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

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
                  onClick={() => {
                    // Sadece tamamlanmış veya aktif adımlara git
                    if (i + 1 <= currentStep) setCurrentStep(i + 1);
                  }}
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
            {renderCurrentStep()}

            {/* Alt Navigasyon */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <button
                onClick={handleBack}
                disabled={currentStep <= 1}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold border border-border text-muted-foreground hover:bg-muted transition-colors disabled:opacity-40"
              >
                <ChevronLeft size={14} /> GERİ
              </button>
              {currentStep < 4 ? (
                <button
                  onClick={handleNext}
                  className="btn-industrial-primary flex items-center gap-2"
                >
                  İLERİ <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="btn-industrial-primary flex items-center gap-2 disabled:opacity-50"
                >
                  <Rocket size={16} />
                  {isSubmitting ? "GÖNDERİLİYOR..." : "ÜRETİME GÖNDER"}
                </button>
              )}
            </div>

            {/* Yönlendirme Linkleri */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                to="/iletisim"
                className="card-industrial p-4 flex items-center gap-3 hover:border-primary/40 transition-colors group"
              >
                <div className="w-9 h-9 flex items-center justify-center bg-primary/10 text-primary shrink-0 group-hover:bg-primary/20 transition-colors">
                  <MessageCircle size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold group-hover:text-primary transition-colors">İletişime Geçin</p>
                  <p className="text-[10px] text-muted-foreground">Sorularınız için bize ulaşın</p>
                </div>
                <ArrowRight size={14} className="ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
              <Link
                to="/sss"
                className="card-industrial p-4 flex items-center gap-3 hover:border-primary/40 transition-colors group"
              >
                <div className="w-9 h-9 flex items-center justify-center bg-primary/10 text-primary shrink-0 group-hover:bg-primary/20 transition-colors">
                  <HelpCircle size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold group-hover:text-primary transition-colors">Sık Sorulan Sorular</p>
                  <p className="text-[10px] text-muted-foreground">Üretim süreciyle ilgili SSS</p>
                </div>
                <ArrowRight size={14} className="ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
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
                  ["Dosya", uploadedFile?.name ?? "Yüklenmedi"],
                  ["Hizmet", currentService.label],
                  ["Malzeme", materialLabel],
                  ["Yüzey İşlemi", surfaceFinishes.find((f) => f.id === selectedFinish)!.label],
                  ["Sipariş Adedi", `${quantity} Adet`],
                  ["Teslimat", delivery === "express" ? "Ekspres (3-5 Gün)" : "Standart (10-12 Gün)"],
                ].map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{key}</span>
                    <span className="text-xs font-bold">{value}</span>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-dashed border-border my-4" />

              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-primary" />
                <span className="text-[10px] font-medium text-primary">
                  {delivery === "express"
                    ? "Yüksek hızlı ekspres işleme dahil"
                    : "Standart üretim süreci dahil"}
                </span>
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

            {/* Kalite Güvence Kartı */}
            <div className="card-industrial p-5">
              <h3 className="text-[10px] font-bold tracking-[0.2em] mb-4 text-muted-foreground">
                KALİTE GÜVENCESİ
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Shield, title: "ISO 9001:2015", desc: "Sertifikalı kalite yönetim sistemi" },
                  { icon: Gauge, title: "CMM Ölçüm", desc: "±0.005 mm hassasiyetinde 3D koordinat ölçümü" },
                  { icon: FileCheck, title: "Malzeme Sertifikası", desc: "Her sipariş için malzeme test raporu" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-primary/10 shrink-0">
                      <item.icon size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">{item.title}</p>
                      <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Teslimat Bilgisi Kartı */}
            <div className="card-industrial p-5">
              <h3 className="text-[10px] font-bold tracking-[0.2em] mb-4 text-muted-foreground">
                TESLİMAT BİLGİSİ
              </h3>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prototip (1-10 adet)</span>
                  <span className="font-bold">5-7 İş Günü</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Küçük Seri (10-100 adet)</span>
                  <span className="font-bold">10-14 İş Günü</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Seri Üretim (100+ adet)</span>
                  <span className="font-bold">14-21 İş Günü</span>
                </div>
                <div className="border-t border-border pt-2.5 mt-2.5">
                  <div className="flex items-center gap-1.5">
                    <Zap size={12} className="text-destructive" />
                    <span className="text-[10px] font-semibold text-destructive">Ekspres üretim ile süreleri %50'ye kadar kısaltın</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TeklifAl;
