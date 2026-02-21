import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, Environment } from "@react-three/drei";
import * as THREE from "three";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Cog, User, ChevronLeft, Rocket, CheckCircle2, Upload, FileText, Zap, Clock,
  Layers, Droplets, Paintbrush, Package, HardHat, ArrowRight, Info, Lightbulb,
  LayoutDashboard, FileStack, ShoppingCart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// ── Color constants (blue & orange accents) ──
const BLUE = "#2563eb";
const BLUE_LIGHT = "#dbeafe";
const BLUE_DARK = "#1e3a5f";
const ORANGE = "#ea580c";
const ORANGE_LIGHT = "#fff7ed";

// ── Complex 3D Part ──
const ComplexPart = () => (
  <group>
    {/* Main bracket body */}
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[2.4, 0.3, 1.6]} />
      <meshStandardMaterial color="#94a3b8" metalness={0.75} roughness={0.25} />
    </mesh>
    {/* Left vertical wall */}
    <mesh position={[-0.9, 0.6, 0]}>
      <boxGeometry args={[0.25, 0.9, 1.6]} />
      <meshStandardMaterial color="#94a3b8" metalness={0.75} roughness={0.25} />
    </mesh>
    {/* Right vertical wall */}
    <mesh position={[0.9, 0.6, 0]}>
      <boxGeometry args={[0.25, 0.9, 1.6]} />
      <meshStandardMaterial color="#94a3b8" metalness={0.75} roughness={0.25} />
    </mesh>
    {/* Top crossbar */}
    <mesh position={[0, 1.05, 0]}>
      <boxGeometry args={[2.05, 0.2, 0.8]} />
      <meshStandardMaterial color="#94a3b8" metalness={0.75} roughness={0.25} />
    </mesh>
    {/* Mounting holes */}
    {[[-0.6, -0.15, -0.5], [0.6, -0.15, -0.5], [-0.6, -0.15, 0.5], [0.6, -0.15, 0.5]].map((pos, i) => (
      <mesh key={i} position={pos as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.12, 0.03, 16, 32]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
      </mesh>
    ))}
    {/* Reinforcement ribs */}
    {[-0.3, 0.3].map((x, i) => (
      <mesh key={`rib-${i}`} position={[x, 0.35, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.08, 0.5, 0.6]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} />
      </mesh>
    ))}
    {/* Center bore */}
    <mesh position={[0, 1.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.2, 0.05, 16, 32]} />
      <meshStandardMaterial color="#475569" metalness={0.85} roughness={0.15} />
    </mesh>
  </group>
);

// ── Surface finish options ──
const surfaceFinishes = [
  { id: "machined", label: "As-Machined", icon: Layers, desc: "Ra 3.2μm" },
  { id: "bead", label: "Bead Blast", icon: Droplets, desc: "Matte finish" },
  { id: "anodized", label: "Anodized", icon: Paintbrush, desc: "Type II/III" },
  { id: "powder", label: "Powder Coat", icon: Package, desc: "Durable coat" },
];

// ── Main Component ──
const TeklifAl = () => {
  const [currentStep] = useState(2);
  const [selectedFinish, setSelectedFinish] = useState("machined");
  const [delivery, setDelivery] = useState<"standard" | "express">("standard");
  const [quantity, setQuantity] = useState(25);
  const [service] = useState("CNC Milling (3 & 5 Axis)");
  const [material] = useState("Aluminum 6061-T6");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        service,
        material,
        notes: `Surface: ${selectedFinish}, Delivery: ${delivery}`,
        files: ["Aerospace_Bracket_v2.step"],
      });
      if (error) throw error;
      toast.success("Quote request submitted successfully! We'll respond within 24 hours.");
    } catch (err: unknown) {
      toast.error("Submission error: " + (err instanceof Error ? err.message : "Unknown"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPrice = delivery === "express" ? 1820 : 1420;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8fafc" }}>
      {/* ── NAVBAR ── */}
      <nav className="border-b" style={{ borderColor: "#e2e8f0", backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: BLUE_DARK }}>
              <Cog size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight" style={{ color: BLUE_DARK }}>PrecisionQuoting</span>
          </div>
          {/* Nav links */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm font-medium flex items-center gap-1.5" style={{ color: "#64748b" }}>
              <LayoutDashboard size={14} /> Dashboard
            </a>
            <a href="#" className="text-sm font-medium flex items-center gap-1.5" style={{ color: "#64748b" }}>
              <FileStack size={14} /> Recent Quotes
            </a>
            <a href="#" className="text-sm font-medium flex items-center gap-1.5" style={{ color: "#64748b" }}>
              <ShoppingCart size={14} /> Orders
            </a>
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg transition-colors"
              style={{ backgroundColor: BLUE }}
            >
              <User size={14} /> Profile
            </button>
          </div>
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page title + Step badge */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#0f172a" }}>
              Get a Precision Quote
            </h1>
            <p className="text-sm mt-1" style={{ color: "#94a3b8" }}>
              Industrial accuracy meeting high-speed production cycles.
            </p>
          </div>
          <div className="text-right">
            <Badge className="text-[10px] font-bold px-3 py-1 rounded-full" style={{ backgroundColor: BLUE_LIGHT, color: BLUE, border: "none" }}>
              STEP {currentStep} OF 3
            </Badge>
            <p className="text-xs font-semibold mt-1" style={{ color: "#64748b" }}>Manufacturing Details</p>
          </div>
        </div>

        {/* ── STEPPER ── */}
        <div className="flex items-center gap-0 mb-8">
          {[
            { num: "01", label: "UPLOAD", done: true },
            { num: "02", label: "SPECIFICATIONS", active: true },
            { num: "03", label: "REVIEW & SUBMIT", pending: true },
          ].map((s, i) => (
            <div key={i} className="flex items-center flex-1">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: s.done ? BLUE : s.active ? BLUE : "#e2e8f0",
                    color: s.done || s.active ? "#ffffff" : "#94a3b8",
                  }}
                >
                  {s.done ? <CheckCircle2 size={14} /> : s.num}
                </div>
                <span
                  className="text-xs font-bold tracking-wider"
                  style={{ color: s.active ? BLUE : s.done ? BLUE : "#94a3b8" }}
                >
                  {s.num}. {s.label}
                </span>
              </div>
              {i < 2 && (
                <div className="flex-1 h-0.5 mx-4 rounded-full" style={{ backgroundColor: s.done ? BLUE : "#e2e8f0" }} />
              )}
            </div>
          ))}
        </div>

        {/* ── TWO COLUMN LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          {/* ══ LEFT COLUMN ══ */}
          <div className="space-y-6">
            {/* File Upload Card */}
            <div className="bg-white border rounded-xl p-4 flex items-center justify-between" style={{ borderColor: "#e2e8f0" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#dcfce7" }}>
                  <CheckCircle2 size={18} style={{ color: "#16a34a" }} />
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "#0f172a" }}>Aerospace_Bracket_v2.step</p>
                  <p className="text-xs" style={{ color: "#94a3b8" }}>14.5 MB • STEP Format</p>
                </div>
              </div>
              <button className="px-4 py-2 text-xs font-semibold rounded-lg" style={{ backgroundColor: "#f1f5f9", color: "#64748b" }}>
                Change File
              </button>
            </div>

            {/* 3D CAD Viewer */}
            <div className="bg-white border rounded-xl overflow-hidden" style={{ borderColor: "#e2e8f0" }}>
              <div className="px-4 py-2.5 border-b flex items-center justify-between" style={{ borderColor: "#e2e8f0" }}>
                <span className="text-xs font-bold tracking-wider" style={{ color: "#64748b" }}>CAD PREVIEW</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: "#dcfce7", color: "#16a34a" }}>PARSED</span>
                </div>
              </div>
              <div className="h-[320px] relative" style={{ backgroundColor: "#f8fafc" }}>
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
                {/* Subtle grid overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
                  backgroundImage: "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }} />
              </div>
            </div>

            {/* Manufacturing Specifications */}
            <div className="bg-white border rounded-xl p-6" style={{ borderColor: "#e2e8f0" }}>
              <h2 className="text-base font-bold mb-5 flex items-center gap-2" style={{ color: "#0f172a" }}>
                <Cog size={16} style={{ color: BLUE }} /> Manufacturing Specifications
              </h2>

              {/* Service & Material selects */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest mb-1.5" style={{ color: "#94a3b8" }}>SERVICE</label>
                  <div className="border rounded-lg px-3 py-2.5 text-sm font-medium flex items-center justify-between" style={{ borderColor: "#e2e8f0", color: "#0f172a" }}>
                    {service}
                    <ChevronLeft size={14} className="rotate-[-90deg]" style={{ color: "#94a3b8" }} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-widest mb-1.5" style={{ color: "#94a3b8" }}>MATERIAL</label>
                  <div className="border rounded-lg px-3 py-2.5 text-sm font-medium flex items-center justify-between" style={{ borderColor: "#e2e8f0", color: "#0f172a" }}>
                    {material}
                    <ChevronLeft size={14} className="rotate-[-90deg]" style={{ color: "#94a3b8" }} />
                  </div>
                </div>
              </div>

              {/* Surface Finish */}
              <div className="mb-6">
                <label className="block text-[10px] font-bold tracking-widest mb-3" style={{ color: "#94a3b8" }}>SURFACE FINISH</label>
                <div className="grid grid-cols-4 gap-3">
                  {surfaceFinishes.map((f) => {
                    const Icon = f.icon;
                    const isActive = selectedFinish === f.id;
                    return (
                      <button
                        key={f.id}
                        onClick={() => setSelectedFinish(f.id)}
                        className="border-2 rounded-xl p-3.5 text-center transition-all duration-200"
                        style={{
                          borderColor: isActive ? BLUE : "#e2e8f0",
                          backgroundColor: isActive ? BLUE_LIGHT : "#ffffff",
                        }}
                      >
                        <Icon size={20} className="mx-auto mb-1.5" style={{ color: isActive ? BLUE : "#94a3b8" }} />
                        <p className="text-xs font-bold" style={{ color: isActive ? BLUE : "#0f172a" }}>{f.label}</p>
                        <p className="text-[10px]" style={{ color: "#94a3b8" }}>{f.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity & Delivery */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest mb-1.5" style={{ color: "#94a3b8" }}>QUANTITY</label>
                  <div className="flex items-center border rounded-lg overflow-hidden" style={{ borderColor: "#e2e8f0" }}>
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="flex-1 px-3 py-2.5 text-sm font-bold focus:outline-none"
                      style={{ color: "#0f172a" }}
                    />
                    <span className="px-3 text-[10px] font-bold tracking-widest" style={{ color: "#94a3b8", backgroundColor: "#f8fafc" }}>UNITS</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-widest mb-1.5" style={{ color: "#94a3b8" }}>DELIVERY VELOCITY</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setDelivery("standard")}
                      className="border-2 rounded-lg p-2.5 text-center transition-all"
                      style={{
                        borderColor: delivery === "standard" ? BLUE : "#e2e8f0",
                        backgroundColor: delivery === "standard" ? BLUE_LIGHT : "#ffffff",
                      }}
                    >
                      <Clock size={14} className="mx-auto mb-1" style={{ color: delivery === "standard" ? BLUE : "#94a3b8" }} />
                      <p className="text-[10px] font-bold" style={{ color: delivery === "standard" ? BLUE : "#0f172a" }}>Standard</p>
                      <p className="text-[9px]" style={{ color: "#94a3b8" }}>10-12 Days</p>
                    </button>
                    <button
                      onClick={() => setDelivery("express")}
                      className="border-2 rounded-lg p-2.5 text-center transition-all"
                      style={{
                        borderColor: delivery === "express" ? ORANGE : "#e2e8f0",
                        backgroundColor: delivery === "express" ? ORANGE_LIGHT : "#ffffff",
                      }}
                    >
                      <Zap size={14} className="mx-auto mb-1" style={{ color: delivery === "express" ? ORANGE : "#94a3b8" }} />
                      <p className="text-[10px] font-bold" style={{ color: delivery === "express" ? ORANGE : "#0f172a" }}>Express</p>
                      <p className="text-[9px]" style={{ color: "#94a3b8" }}>3-5 Days</p>
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "#f1f5f9" }}>
                <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg border" style={{ borderColor: "#e2e8f0", color: "#64748b" }}>
                  <ChevronLeft size={14} /> BACK
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-lg transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: ORANGE }}
                >
                  <Rocket size={16} />
                  {isSubmitting ? "SUBMITTING..." : "SUBMIT FOR MANUFACTURING"}
                </button>
              </div>
            </div>
          </div>

          {/* ══ RIGHT COLUMN ══ */}
          <div className="space-y-6">
            {/* Quote Summary Card */}
            <div className="bg-white border rounded-xl p-5" style={{ borderColor: "#e2e8f0" }}>
              <h3 className="text-[10px] font-bold tracking-[0.2em] mb-4" style={{ color: "#94a3b8" }}>QUOTE REAL-TIME SUMMARY</h3>

              <div className="space-y-3 mb-4">
                {[
                  ["Project Name", "AeroBracket V2"],
                  ["Process", "CNC Milling"],
                  ["Material", "AL 6061-T6"],
                  ["Order Quantity", `${quantity} Units`],
                ].map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: "#94a3b8" }}>{key}</span>
                    <span className="text-xs font-bold" style={{ color: "#0f172a" }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* Dashed separator */}
              <div className="border-t-2 border-dashed my-4" style={{ borderColor: "#e2e8f0" }} />

              {/* Total */}
              <div className="mb-3">
                <p className="text-[10px] font-bold tracking-[0.2em] mb-1" style={{ color: "#94a3b8" }}>TOTAL VALUATION</p>
                <p className="text-3xl font-bold" style={{ color: BLUE }}>
                  ${totalPrice.toLocaleString()}.00
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <CheckCircle2 size={12} style={{ color: "#16a34a" }} />
                  <span className="text-[10px] font-medium" style={{ color: "#16a34a" }}>
                    {delivery === "express" ? "Includes High-Speed Express Processing" : "Standard processing included"}
                  </span>
                </div>
              </div>

              {/* Speed Tip */}
              <div className="rounded-lg p-3 mt-4" style={{ backgroundColor: BLUE_LIGHT }}>
                <div className="flex items-start gap-2">
                  <Lightbulb size={14} className="mt-0.5 shrink-0" style={{ color: BLUE }} />
                  <p className="text-[11px] font-medium" style={{ color: BLUE }}>
                    <span className="font-bold">SPEED TIP:</span> Scale to 50 units for 15% batch efficiency savings.
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Assistance Card */}
            <div className="relative rounded-xl p-5 overflow-hidden" style={{ backgroundColor: BLUE_DARK }}>
              {/* Filigree icon */}
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <HardHat size={100} className="text-white" />
              </div>

              <h3 className="text-sm font-bold text-white mb-2">Technical Assistance</h3>
              <p className="text-xs leading-relaxed mb-4" style={{ color: "#94a3b8" }}>
                Our precision engineers are ready to review your design for manufacturability and optimize your production workflow.
              </p>
              <button
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg border transition-colors hover:bg-white/10"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "#ffffff" }}
              >
                <HardHat size={14} /> CONSULT ENGINEER
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeklifAl;
