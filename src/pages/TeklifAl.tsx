import { useState, Suspense, useRef, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Center, Environment, Grid, GizmoHelper, GizmoViewport } from "@react-three/drei";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Cog, ChevronLeft, ChevronRight, Rocket, CheckCircle2, Zap, Clock,
  Layers, Droplets, Paintbrush, Package, HardHat, ArrowRight,
  Upload, Eye, Send, Shield, Gauge, FileCheck, Edit3, FileUp,
  ClipboardList, AlertCircle, MessageCircle, HelpCircle,
  RotateCcw, Grid3x3, Scissors, TriangleRight, Palette, Ruler,
  Maximize, Loader2, Box, X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { materialsData, materialCategories } from "@/data/materialsData";

// ── 3D Model Components ──

interface Dimensions { x: number; y: number; z: number }

const COLOR_PRESETS = [
  { label: "Çelik", color: "#94a3b8" },
  { label: "Altın", color: "#d4a574" },
  { label: "Mavi", color: "#3b82f6" },
  { label: "Yeşil", color: "#22c55e" },
  { label: "Kırmızı", color: "#ef4444" },
  { label: "Siyah", color: "#1e293b" },
];

// Placeholder 3D part shown before file upload
const PlaceholderModel = () => (
  <group>
    <mesh position={[0, 0, 0]}>
      <cylinderGeometry args={[1.5, 1.5, 0.4, 64]} />
      <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
    </mesh>
    <mesh position={[0, 1.5, 0]}>
      <cylinderGeometry args={[0.5, 0.5, 2.6, 32]} />
      <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.35} />
    </mesh>
    <mesh position={[0, 3, 0]}>
      <cylinderGeometry args={[0.7, 0.7, 0.3, 32]} />
      <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
    </mesh>
    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      return (
        <mesh key={i} position={[Math.cos(rad) * 1.1, 0.21, Math.sin(rad) * 1.1]}>
          <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
        </mesh>
      );
    })}
  </group>
);

// STL Model
const STLModel = ({ url, color, wireframe, onDimensions }: { url: string; color: string; wireframe: boolean; onDimensions: (d: Dimensions) => void }) => {
  const geometry = useLoader(STLLoader, url);
  const { camera } = useThree();

  useEffect(() => {
    if (!geometry) return;
    geometry.center();
    geometry.computeBoundingBox();
    const size = new THREE.Vector3();
    geometry.boundingBox!.getSize(size);
    onDimensions({ x: +size.x.toFixed(2), y: +size.y.toFixed(2), z: +size.z.toFixed(2) });
    const maxDim = Math.max(size.x, size.y, size.z);
    const dist = maxDim * 2;
    camera.position.set(dist * 0.6, dist * 0.5, dist * 0.8);
    (camera as THREE.PerspectiveCamera).near = 0.01;
    (camera as THREE.PerspectiveCamera).far = maxDim * 20;
    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);
  }, [geometry, camera, onDimensions]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.35} side={THREE.DoubleSide} wireframe={wireframe} />
    </mesh>
  );
};

// STEP Model (uses pre-parsed geometry)
const STEPModel = ({ geometry, color, wireframe, onDimensions }: { geometry: THREE.BufferGeometry; color: string; wireframe: boolean; onDimensions: (d: Dimensions) => void }) => {
  const { camera } = useThree();

  useEffect(() => {
    if (!geometry) return;
    geometry.center();
    geometry.computeBoundingBox();
    const size = new THREE.Vector3();
    geometry.boundingBox!.getSize(size);
    onDimensions({ x: +size.x.toFixed(2), y: +size.y.toFixed(2), z: +size.z.toFixed(2) });
    const maxDim = Math.max(size.x, size.y, size.z);
    const dist = maxDim * 2;
    camera.position.set(dist * 0.6, dist * 0.5, dist * 0.8);
    (camera as THREE.PerspectiveCamera).near = 0.01;
    (camera as THREE.PerspectiveCamera).far = maxDim * 20;
    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);
  }, [geometry, camera, onDimensions]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.35} side={THREE.DoubleSide} wireframe={wireframe} />
    </mesh>
  );
};

// OBJ Model
const OBJModel = ({ url, color, wireframe, onDimensions }: { url: string; color: string; wireframe: boolean; onDimensions: (d: Dimensions) => void }) => {
  const obj = useLoader(OBJLoader, url);
  const { camera } = useThree();

  useEffect(() => {
    if (!obj) return;
    const box = new THREE.Box3().setFromObject(obj);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);
    obj.position.sub(center);
    onDimensions({ x: +size.x.toFixed(2), y: +size.y.toFixed(2), z: +size.z.toFixed(2) });
    const maxDim = Math.max(size.x, size.y, size.z);
    const dist = maxDim * 2;
    camera.position.set(dist * 0.6, dist * 0.5, dist * 0.8);
    camera.lookAt(0, 0, 0);
  }, [obj, camera, onDimensions]);

  useEffect(() => {
    obj.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
          color, metalness: 0.6, roughness: 0.35, side: THREE.DoubleSide, wireframe,
        });
      }
    });
  }, [obj, wireframe, color]);

  return <primitive object={obj} />;
};

const CameraReset = ({ trigger }: { trigger: number }) => {
  const { camera } = useThree();
  useEffect(() => {
    if (trigger > 0) {
      camera.position.set(4, 3, 5);
      camera.lookAt(0, 0, 0);
    }
  }, [trigger, camera]);
  return null;
};

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  // CAD Viewer state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"stl" | "obj" | "step" | null>(null);
  const [stepGeometry, setStepGeometry] = useState<THREE.BufferGeometry | null>(null);
  const [stepLoading, setStepLoading] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [modelColor, setModelColor] = useState("#94a3b8");
  const [showColors, setShowColors] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const currentService = services.find((s) => s.id === selectedService)!;
  const materialLabel =
    selectedMaterial === "other"
      ? customMaterial || "Belirtilmedi"
      : materialsData.find((m) => m.id === selectedMaterial)?.name ?? selectedMaterial;

  const [isDragging, setIsDragging] = useState(false);

  // Pick up file from Hero section drop zone
  useEffect(() => {
    const heroFile = (window as any).__heroUploadFile as File | undefined;
    if (heroFile) {
      delete (window as any).__heroUploadFile;
      processFile(heroFile);
    }
  }, []);

  const processFile = async (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    
    const validExts = ["stl", "obj", "step", "stp", "iges", "igs", "3mf"];
    if (!ext || !validExts.includes(ext)) {
      toast.error("Desteklenmeyen dosya formatı.");
      return;
    }

    setUploadedFile(file);
    setStepGeometry(null);
    setDimensions(null);

    if (ext === "step" || ext === "stp") {
      setFileType("step");
      setFileUrl(null);
      setStepLoading(true);
      try {
        const occtimportjs = (await import("occt-import-js")).default;
        const occt = await occtimportjs();
        const buffer = await file.arrayBuffer();
        const fileBuffer = new Uint8Array(buffer);
        const result = occt.ReadStepFile(fileBuffer, null);

        const geo = new THREE.BufferGeometry();
        const vertices: number[] = [];
        const indices: number[] = [];

        for (const mesh of result.meshes) {
          const offset = vertices.length / 3;
          for (let i = 0; i < mesh.attributes.position.array.length; i++) {
            vertices.push(mesh.attributes.position.array[i]);
          }
          if (mesh.index) {
            for (let i = 0; i < mesh.index.array.length; i++) {
              indices.push(mesh.index.array[i] + offset);
            }
          }
        }

        geo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
        if (indices.length > 0) geo.setIndex(indices);
        geo.computeVertexNormals();
        setStepGeometry(geo);
        toast.success(`"${file.name}" STEP dosyası başarıyla yüklendi.`);
      } catch (err) {
        console.error("STEP file parsing error:", err);
        toast.error("STEP dosyası işlenirken hata oluştu.");
      } finally {
        setStepLoading(false);
      }
    } else if (ext === "stl") {
      setFileType("stl");
      setFileUrl(URL.createObjectURL(file));
      toast.success(`"${file.name}" dosyası yüklendi.`);
    } else if (ext === "obj") {
      setFileType("obj");
      setFileUrl(URL.createObjectURL(file));
      toast.success(`"${file.name}" dosyası yüklendi.`);
    } else {
      setFileType(null);
      setFileUrl(null);
      toast.success(`"${file.name}" dosyası yüklendi.`);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processFile(file);
    e.target.value = "";
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDimensions = useCallback((d: Dimensions) => {
    setDimensions(d);
  }, []);

  const toggleFullscreen = () => {
    if (!canvasContainerRef.current) return;
    if (!document.fullscreenElement) {
      canvasContainerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const hasModel = !!(fileUrl || stepGeometry);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const rfqId = `RFQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    try {
      // Get current user info
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      let profileData: { full_name?: string; company?: string; phone?: string } = {};
      if (user) {
        const { data: profile } = await supabase.from("profiles").select("full_name, company, phone").eq("id", user.id).single();
        if (profile) profileData = profile;
      }

      const { error } = await supabase.from("rfqs").insert({
        id: rfqId,
        customer: profileData.full_name || null,
        company: profileData.company || null,
        email: user?.email || null,
        phone: profileData.phone || null,
        user_id: user?.id || null,
        quantity,
        date: new Date().toISOString().split("T")[0],
        status: "Yeni",
        service: currentService.label,
        material: materialLabel,
        notes: `Yüzey: ${selectedFinish}, Teslimat: ${delivery}`,
        files: uploadedFile ? [uploadedFile.name] : [],
      });
      if (error) throw error;
      toast.success(
        "Teklif talebiniz başarıyla gönderildi! 48 saat içinde dönüş yapacağız.",
        {
          duration: 8000,
          action: user ? {
            label: "Panelime Git",
            onClick: () => window.location.href = "/musteri-paneli",
          } : undefined,
        }
      );
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
    { num: "01", label: "CAD YÜKLE", icon: Upload, done: currentStep > 1, active: currentStep === 1 },
    { num: "02", label: "ÖZELLİKLER", icon: Cog, done: currentStep > 2, active: currentStep === 2 },
    { num: "03", label: "İNCELE", icon: Eye, done: currentStep > 3, active: currentStep === 3 },
    { num: "04", label: "GÖNDER", icon: Send, done: false, active: currentStep === 4 },
  ];

  // ── Adım 1: Gelişmiş CAD Yükleme ──
  const renderStep1 = () => (
    <div className="space-y-4">
      {/* File upload area */}
      <div className="card-industrial p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold flex items-center gap-2">
            <Upload size={16} className="text-primary" /> CAD Dosyası Yükleme
          </h2>
          {uploadedFile && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/5 border border-primary/20">
                <CheckCircle2 size={14} className="text-primary" />
                <span className="text-xs font-bold truncate max-w-[200px]">{uploadedFile.name}</span>
                <span className="text-[10px] text-muted-foreground">
                  {(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB
                </span>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 text-xs font-semibold bg-muted text-muted-foreground hover:bg-border transition-colors"
              >
                Değiştir
              </button>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".step,.stp,.iges,.igs,.stl,.obj,.3mf,.x_t,.x_b"
          className="hidden"
          onChange={handleFileUpload}
        />

        {!uploadedFile ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`w-full min-h-[280px] border-2 border-dashed ${isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"} flex flex-col items-center justify-center gap-5 transition-colors group cursor-pointer`}
          >
            <div className="w-20 h-20 flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
              <FileUp size={36} />
            </div>
            <div className="text-center">
              <p className="text-base font-bold">CAD dosyanızı buraya sürükleyin veya tıklayın</p>
              <p className="text-xs text-muted-foreground mt-2">STEP, STP, STL, OBJ, IGES, 3MF • Maks. 100 MB</p>
            </div>
            <div className="flex items-center gap-4 mt-2">
              {["STEP", "STL", "OBJ", "IGES", "3MF"].map((fmt) => (
                <span key={fmt} className="text-[10px] font-bold tracking-widest text-muted-foreground bg-muted px-2.5 py-1">
                  {fmt}
                </span>
              ))}
            </div>
          </div>
        ) : (
          /* 3D Viewer */
          <div className="border border-border overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center gap-1 p-2 bg-card border-b border-border flex-wrap">
              <button
                onClick={() => setResetTrigger((t) => t + 1)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                title="Kamerayı Sıfırla"
              >
                <RotateCcw size={14} /> Sıfırla
              </button>
              <div className="w-px h-5 bg-border" />
              <button
                onClick={() => setShowGrid((g) => !g)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
                  showGrid ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Grid3x3 size={14} /> Grid
              </button>
              <div className="w-px h-5 bg-border" />
              <button
                onClick={() => setWireframe((w) => !w)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
                  wireframe ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <TriangleRight size={14} /> Wireframe
              </button>
              <div className="w-px h-5 bg-border" />

              {/* Color picker */}
              <div className="relative">
                <button
                  onClick={() => setShowColors((c) => !c)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
                    showColors ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Palette size={14} />
                  <span className="w-3 h-3 border border-border" style={{ backgroundColor: modelColor }} />
                </button>
                {showColors && (
                  <div className="absolute top-full left-0 mt-1 z-20 bg-card border border-border p-2 flex gap-1.5 shadow-lg">
                    {COLOR_PRESETS.map((c) => (
                      <button
                        key={c.color}
                        onClick={() => { setModelColor(c.color); setShowColors(false); }}
                        className={`w-6 h-6 border-2 transition-all ${
                          modelColor === c.color ? "border-primary scale-110" : "border-border hover:border-primary/50"
                        }`}
                        style={{ backgroundColor: c.color }}
                        title={c.label}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Fullscreen */}
              <div className="ml-auto">
                <button
                  onClick={toggleFullscreen}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Maximize size={14} /> Tam Ekran
                </button>
              </div>

              {/* Dimensions */}
              {dimensions && (
                <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground ml-2">
                  <span className="text-primary font-semibold">X</span>{dimensions.x}
                  <span className="text-primary font-semibold">Y</span>{dimensions.y}
                  <span className="text-primary font-semibold">Z</span>{dimensions.z} mm
                </div>
              )}
            </div>

            {/* 3D Canvas */}
            <div ref={canvasContainerRef} className="relative h-[420px] bg-muted/10">
              {stepLoading && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/80">
                  <Loader2 size={24} className="animate-spin text-primary mb-2" />
                  <p className="text-xs text-muted-foreground">STEP dosyası işleniyor...</p>
                </div>
              )}

              <Canvas
                camera={{ position: [4, 3, 5], fov: 45 }}
                gl={{ antialias: true, alpha: true, localClippingEnabled: true }}
                style={{ background: "transparent" }}
              >
                <Suspense fallback={null}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[5, 8, 5]} intensity={1} castShadow />
                  <directionalLight position={[-3, 2, -3]} intensity={0.3} />

                  <Center>
                    {fileUrl && fileType === "stl" && (
                      <STLModel url={fileUrl} color={modelColor} wireframe={wireframe} onDimensions={handleDimensions} />
                    )}
                    {fileUrl && fileType === "obj" && (
                      <OBJModel url={fileUrl} color={modelColor} wireframe={wireframe} onDimensions={handleDimensions} />
                    )}
                    {stepGeometry && fileType === "step" && (
                      <STEPModel geometry={stepGeometry} color={modelColor} wireframe={wireframe} onDimensions={handleDimensions} />
                    )}
                    {!hasModel && <PlaceholderModel />}
                  </Center>

                  <axesHelper args={[3]} />

                  {showGrid && (
                    <Grid
                      args={[100, 100]}
                      cellSize={1}
                      cellThickness={0.5}
                      cellColor="#94a3b8"
                      sectionSize={5}
                      sectionThickness={1}
                      sectionColor="#64748b"
                      fadeDistance={30}
                      fadeStrength={1}
                      followCamera={false}
                      position={[0, -0.01, 0]}
                    />
                  )}

                  <OrbitControls makeDefault enableDamping dampingFactor={0.1} minDistance={0.5} maxDistance={100} />

                  <GizmoHelper alignment="top-right" margin={[70, 70]}>
                    <GizmoViewport axisColors={["#ef4444", "#22c55e", "#3b82f6"]} labelColor="white" />
                  </GizmoHelper>

                  <CameraReset trigger={resetTrigger} />
                </Suspense>
              </Canvas>
            </div>

            {/* Dimensions card below canvas */}
            {dimensions && (
              <div className="p-3 bg-card border-t border-border">
                <div className="grid grid-cols-3 gap-2">
                  {(["x", "y", "z"] as const).map((axis) => (
                    <div key={axis} className="text-center p-2 bg-muted/50">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">{axis} Ekseni</p>
                      <p className="text-sm font-bold font-mono text-foreground">{dimensions[axis]} <span className="text-muted-foreground font-normal text-[10px]">mm</span></p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // ── Adım 2: Üretim Spesifikasyonları ──
  const renderStep2 = () => (
    <div className="space-y-6">
      {uploadedFile && (
        <div className="card-industrial p-3 flex items-center gap-3">
          <CheckCircle2 size={16} className="text-primary shrink-0" />
          <p className="text-xs font-bold truncate">{uploadedFile.name}</p>
          <p className="text-[10px] text-muted-foreground shrink-0">{(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB</p>
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
          <div className="p-4 bg-muted/50 border border-border">
            <p className="text-[10px] font-bold tracking-widest text-muted-foreground mb-2">DOSYA</p>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-primary" />
              <span className="text-sm font-bold">{uploadedFile?.name ?? "Yüklenmedi"}</span>
              {uploadedFile && <span className="text-xs text-muted-foreground">({(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB)</span>}
            </div>
          </div>

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

          {dimensions && (
            <div className="p-4 bg-muted/50 border border-border">
              <p className="text-[10px] font-bold tracking-widest text-muted-foreground mb-3">PARÇA BOYUTLARI</p>
              <div className="grid grid-cols-3 gap-2">
                {(["x", "y", "z"] as const).map((axis) => (
                  <div key={axis} className="text-center p-2 bg-background">
                    <p className="text-[10px] font-semibold text-primary">{axis.toUpperCase()}</p>
                    <p className="text-sm font-bold font-mono">{dimensions[axis]} mm</p>
                  </div>
                ))}
              </div>
            </div>
          )}

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

  // ── Right panel content based on step ──
  const renderRightPanel = () => {
    if (currentStep === 1) {
      return (
        <>
          {/* Part info & 3D settings for step 1 */}
          <div className="card-industrial overflow-hidden">
            <Tabs defaultValue="info" className="flex flex-col">
              <TabsList className="w-full justify-start rounded-none border-b border-border bg-muted/30 px-2 h-auto py-0">
                <TabsTrigger value="info" className="text-xs data-[state=active]:bg-card data-[state=active]:shadow-none py-3 px-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                  Parça Bilgileri
                </TabsTrigger>
                <TabsTrigger value="settings" className="text-xs data-[state=active]:bg-card data-[state=active]:shadow-none py-3 px-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                  3D Ayarları
                </TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="p-5 m-0 space-y-4">
                {uploadedFile ? (
                  <>
                    <div>
                      <p className="text-[10px] font-bold tracking-widest text-muted-foreground mb-2">DOSYA BİLGİSİ</p>
                      <div className="space-y-2">
                        {[
                          ["Dosya Adı", uploadedFile.name],
                          ["Boyut", `${(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB`],
                          ["Format", fileType?.toUpperCase() ?? uploadedFile.name.split(".").pop()?.toUpperCase() ?? "-"],
                        ].map(([k, v]) => (
                          <div key={k} className="flex justify-between py-1.5 border-b border-border">
                            <span className="text-xs text-muted-foreground">{k}</span>
                            <span className="text-xs font-semibold">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {dimensions && (
                      <div>
                        <p className="text-[10px] font-bold tracking-widest text-muted-foreground mb-2">BOYUTLAR</p>
                        <div className="grid grid-cols-3 gap-2">
                          {(["x", "y", "z"] as const).map((axis) => (
                            <div key={axis} className="text-center p-2 bg-muted/50">
                              <p className="text-[10px] font-semibold text-primary">{axis.toUpperCase()}</p>
                              <p className="text-sm font-bold font-mono">{dimensions[axis]}</p>
                              <p className="text-[9px] text-muted-foreground">mm</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Badge className="text-[10px] bg-primary/20 text-primary border-primary/30">CAD</Badge>
                      <Badge variant="secondary" className="text-[10px]">3D MODEL</Badge>
                      {fileType && <Badge variant="outline" className="text-[10px]">{fileType.toUpperCase()}</Badge>}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Box size={32} className="mx-auto text-muted-foreground/30 mb-3" />
                    <p className="text-xs text-muted-foreground">Dosya yükledikten sonra parça bilgileri burada görünecek.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="settings" className="p-5 m-0 space-y-5">
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-muted-foreground mb-3">GÖRÜNÜM AYARLARI</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">Grid Göster</span>
                      <Switch checked={showGrid} onCheckedChange={setShowGrid} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">Wireframe</span>
                      <Switch checked={wireframe} onCheckedChange={setWireframe} />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold tracking-widest text-muted-foreground mb-3">MODEL RENGİ</p>
                  <div className="flex gap-2 flex-wrap">
                    {COLOR_PRESETS.map((c) => (
                      <button
                        key={c.color}
                        onClick={() => setModelColor(c.color)}
                        className={`w-8 h-8 border-2 transition-all ${
                          modelColor === c.color ? "border-primary scale-110" : "border-border hover:border-primary/50"
                        }`}
                        style={{ backgroundColor: c.color }}
                        title={c.label}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold tracking-widest text-muted-foreground mb-3">DESTEKLENEN FORMATLAR</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["STEP", "STP", "STL", "OBJ", "IGES", "3MF"].map((fmt) => (
                      <span key={fmt} className="text-[10px] font-bold tracking-wider text-muted-foreground bg-muted px-2 py-1">{fmt}</span>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </>
      );
    }

    // Steps 2-4: Quote summary + quality cards
    return (
      <>
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
              {delivery === "express" ? "Yüksek hızlı ekspres işleme dahil" : "Standart üretim süreci dahil"}
            </span>
          </div>
        </div>

        {/* Teknik Destek */}
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

        {/* Kalite Güvence */}
        <div className="card-industrial p-5">
          <h3 className="text-[10px] font-bold tracking-[0.2em] mb-4 text-muted-foreground">KALİTE GÜVENCESİ</h3>
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

        {/* Teslimat */}
        <div className="card-industrial p-5">
          <h3 className="text-[10px] font-bold tracking-[0.2em] mb-4 text-muted-foreground">TESLİMAT BİLGİSİ</h3>
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
      </>
    );
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
            {renderRightPanel()}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TeklifAl;
