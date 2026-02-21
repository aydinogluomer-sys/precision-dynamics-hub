import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload, FileText, Settings, User, Send, ChevronLeft, ChevronRight,
  Check, X, Loader2, CloudUpload, Layers, Droplets, Paintbrush, Package,
  Clock, Zap, Phone, Building2, Mail, MessageSquare, AlertCircle,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ── Data ────────────────────────────────────────────────────
const steps = [
  { id: 1, title: "Dosya Yükle", icon: Upload },
  { id: 2, title: "Parça Bilgileri", icon: Settings },
  { id: 3, title: "İletişim", icon: User },
  { id: 4, title: "Önizleme & Gönder", icon: Send },
];

const services = [
  "CNC Freze", "CNC Torna", "Lazer Kesim", "Kalıp İmalatı", "Döküm", "Talaşlı İmalat",
];

const materials = [
  "Alüminyum 6061", "Alüminyum 7075", "Çelik 1045", "Paslanmaz Çelik 304",
  "Paslanmaz Çelik 316", "Titanyum Grade 5", "Pirinç", "Bakır",
  "Delrin (POM)", "ABS", "PEEK", "Diğer",
];

const finishes = [
  { label: "Ham (As-Machined)", icon: Layers, desc: "Ra 3.2μm" },
  { label: "Kumlama", icon: Droplets, desc: "Mat yüzey" },
  { label: "Eloksal", icon: Paintbrush, desc: "Tip II" },
  { label: "Boya Kaplama", icon: Package, desc: "Dayanıklılık" },
];

const deliveryOptions = [
  { value: "standard", label: "Standart", desc: "7-10 iş günü", icon: Clock },
  { value: "express", label: "Ekspres", desc: "3-5 iş günü", icon: Zap },
];

const acceptedFormats = [".STEP", ".STP", ".IGES", ".IGS", ".DWG", ".STL", ".PDF"];

// ── Helpers ─────────────────────────────────────────────────
interface FormData {
  files: File[];
  service: string;
  material: string;
  finish: string;
  quantity: number;
  delivery: string;
  notes: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

const initialForm: FormData = {
  files: [],
  service: "",
  material: "",
  finish: "",
  quantity: 1,
  delivery: "standard",
  notes: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

// ── Component ───────────────────────────────────────────────
const TeklifAl = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const updateField = (name: keyof FormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  // ── File handling ──
  const handleFiles = useCallback((incoming: File[]) => {
    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...incoming],
    }));
    if (errors.files) setErrors((p) => ({ ...p, files: "" }));
  }, [errors.files]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(Array.from(e.dataTransfer.files));
  };

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(Array.from(e.target.files));
    e.target.value = "";
  };

  const removeFile = (index: number) =>
    setFormData((prev) => ({ ...prev, files: prev.files.filter((_, i) => i !== index) }));

  // ── Validation ──
  const validate = (step: number): boolean => {
    const errs: Record<string, string> = {};
    if (step === 1 && formData.files.length === 0) errs.files = "En az bir dosya yükleyin";
    if (step === 2) {
      if (!formData.service) errs.service = "Hizmet seçin";
      if (!formData.material) errs.material = "Malzeme seçin";
      if (formData.quantity < 1) errs.quantity = "Geçerli adet girin";
    }
    if (step === 3) {
      if (!formData.firstName.trim()) errs.firstName = "Ad gerekli";
      if (!formData.lastName.trim()) errs.lastName = "Soyad gerekli";
      if (!formData.email.trim()) errs.email = "E-posta gerekli";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Geçerli e-posta girin";
      if (!formData.phone.trim()) errs.phone = "Telefon gerekli";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => validate(currentStep) && setCurrentStep((s) => Math.min(s + 1, 4));
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 1));

  // ── Submit ──
  const handleSubmit = async () => {
    if (!validate(3)) return;
    setIsSubmitting(true);

    const rfqId = `RFQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const uploadedPaths: string[] = [];

    try {
      for (const file of formData.files) {
        const ext = file.name.split(".").pop();
        const fileName = `${rfqId}/${Math.random().toString(36).substring(2)}.${ext}`;
        const { data, error } = await supabase.storage.from("rfq-files").upload(fileName, file);
        if (!error && data) uploadedPaths.push(data.path);
      }

      const { error } = await supabase.from("rfqs").insert({
        id: rfqId,
        customer: `${formData.firstName} ${formData.lastName}`,
        company: formData.company || null,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        material: formData.material,
        quantity: formData.quantity,
        date: new Date().toISOString().split("T")[0],
        status: "Yeni",
        files: uploadedPaths.length > 0 ? uploadedPaths : formData.files.map((f) => f.name),
        notes: [formData.notes, formData.finish && `Yüzey: ${formData.finish}`, formData.delivery && `Teslimat: ${formData.delivery}`, formData.message && `Mesaj: ${formData.message}`].filter(Boolean).join("\n"),
      });

      if (error) throw error;
      setIsSubmitted(true);
      toast.success("Teklif talebiniz başarıyla gönderildi!");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Bilinmeyen hata";
      toast.error("Gönderim hatası: " + message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success screen ──
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <motion.div
            className="container-industrial max-w-xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-20 h-20 bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-primary" />
            </div>
            <h1 className="heading-industrial text-3xl mb-3">Teklif Talebiniz Alındı!</h1>
            <p className="text-muted-foreground mb-8">
              Mühendis ekibimiz dosyalarınızı inceleyecek ve 24 saat içinde size dönüş yapacaktır.
            </p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => navigate("/")} className="btn-industrial-secondary text-xs">
                Ana Sayfa
              </button>
              <button onClick={() => { setIsSubmitted(false); setCurrentStep(1); setFormData(initialForm); }} className="btn-industrial-primary text-xs">
                Yeni Teklif Al
              </button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  // ── Step content renderers ──
  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="heading-industrial text-xl mb-1">Dosya Yükleme</h2>
        <p className="text-sm text-muted-foreground">CAD dosyalarınızı sürükleyip bırakın veya seçin.</p>
      </div>

      {/* Dropzone */}
      <div
        className={`border-2 border-dashed p-10 text-center transition-all duration-200 cursor-pointer ${
          isDragging ? "border-primary bg-primary/5" : errors.files ? "border-destructive" : "border-border hover:border-primary/50"
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <CloudUpload size={40} className="mx-auto text-muted-foreground mb-4" />
        <p className="font-semibold text-sm mb-1">CAD Dosyası Sürükle & Bırak</p>
        <p className="text-xs text-muted-foreground mb-4">veya tıklayarak dosya seçin</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {acceptedFormats.map((fmt) => (
            <span key={fmt} className="text-[10px] font-mono bg-muted text-muted-foreground px-2 py-1">{fmt}</span>
          ))}
        </div>
        <input
          id="file-input"
          type="file"
          multiple
          accept=".step,.stp,.iges,.igs,.dwg,.stl,.pdf"
          onChange={onFileInput}
          className="hidden"
        />
      </div>
      {errors.files && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle size={12} />{errors.files}</p>}

      {/* File list */}
      {formData.files.length > 0 && (
        <div className="border border-border divide-y divide-border">
          <div className="px-4 py-2 bg-muted text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Yüklenen Dosyalar ({formData.files.length})
          </div>
          {formData.files.map((file, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-primary" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="heading-industrial text-xl mb-1">Parça Bilgileri</h2>
        <p className="text-sm text-muted-foreground">Üretim detaylarını belirtin.</p>
      </div>

      {/* Service & Material */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Hizmet Türü *</label>
          <select
            value={formData.service}
            onChange={(e) => updateField("service", e.target.value)}
            className={`w-full bg-background border ${errors.service ? "border-destructive" : "border-border"} px-3 py-3 text-sm focus:outline-none focus:border-primary transition-colors`}
          >
            <option value="">Seçin...</option>
            {services.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.service && <p className="text-xs text-destructive mt-1">{errors.service}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Malzeme *</label>
          <select
            value={formData.material}
            onChange={(e) => updateField("material", e.target.value)}
            className={`w-full bg-background border ${errors.material ? "border-destructive" : "border-border"} px-3 py-3 text-sm focus:outline-none focus:border-primary transition-colors`}
          >
            <option value="">Seçin...</option>
            {materials.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          {errors.material && <p className="text-xs text-destructive mt-1">{errors.material}</p>}
        </div>
      </div>

      {/* Surface Finish */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Yüzey İşlemi</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {finishes.map((f) => {
            const Icon = f.icon;
            const isActive = formData.finish === f.label;
            return (
              <button
                key={f.label}
                type="button"
                onClick={() => updateField("finish", isActive ? "" : f.label)}
                className={`border p-4 text-center transition-all duration-200 ${
                  isActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                }`}
              >
                <Icon size={20} className={`mx-auto mb-2 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                <p className="text-xs font-semibold">{f.label}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{f.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity & Delivery */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Adet *</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              value={formData.quantity}
              onChange={(e) => updateField("quantity", parseInt(e.target.value) || 1)}
              className={`w-full bg-background border ${errors.quantity ? "border-destructive" : "border-border"} px-3 py-3 text-sm focus:outline-none focus:border-primary transition-colors`}
            />
            <span className="text-xs font-mono text-muted-foreground uppercase shrink-0">Adet</span>
          </div>
          {errors.quantity && <p className="text-xs text-destructive mt-1">{errors.quantity}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Teslimat Önceliği</label>
          <div className="grid grid-cols-2 gap-2">
            {deliveryOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = formData.delivery === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateField("delivery", opt.value)}
                  className={`border p-3 text-center transition-all ${
                    isActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                  }`}
                >
                  <Icon size={16} className={`mx-auto mb-1 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                  <p className="text-xs font-semibold">{opt.label}</p>
                  <p className="text-[10px] text-muted-foreground">{opt.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Ek Notlar</label>
        <textarea
          value={formData.notes}
          onChange={(e) => updateField("notes", e.target.value)}
          rows={3}
          className="w-full bg-background border border-border px-3 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
          placeholder="Tolerans, özel gereksinim vb."
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="heading-industrial text-xl mb-1">İletişim Bilgileri</h2>
        <p className="text-sm text-muted-foreground">Teklif göndermemiz için bilgilerinizi girin.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {([
          { name: "firstName" as const, label: "Ad *", icon: User, placeholder: "Adınız" },
          { name: "lastName" as const, label: "Soyad *", icon: User, placeholder: "Soyadınız" },
          { name: "email" as const, label: "E-posta *", icon: Mail, placeholder: "ornek@firma.com", type: "email" },
          { name: "phone" as const, label: "Telefon *", icon: Phone, placeholder: "+90 5XX XXX XX XX", type: "tel" },
        ]).map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.name}>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{field.label}</label>
              <div className="relative">
                <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={field.type || "text"}
                  value={formData[field.name]}
                  onChange={(e) => updateField(field.name, e.target.value)}
                  className={`w-full bg-background border ${errors[field.name] ? "border-destructive" : "border-border"} pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors`}
                  placeholder={field.placeholder}
                />
              </div>
              {errors[field.name] && <p className="text-xs text-destructive mt-1">{errors[field.name]}</p>}
            </div>
          );
        })}
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Firma</label>
        <div className="relative">
          <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={formData.company}
            onChange={(e) => updateField("company", e.target.value)}
            className="w-full bg-background border border-border pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
            placeholder="Firma adı (opsiyonel)"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Mesaj</label>
        <div className="relative">
          <MessageSquare size={16} className="absolute left-3 top-3 text-muted-foreground" />
          <textarea
            value={formData.message}
            onChange={(e) => updateField("message", e.target.value)}
            rows={3}
            className="w-full bg-background border border-border pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
            placeholder="Ek mesajınız (opsiyonel)"
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="heading-industrial text-xl mb-1">Önizleme & Gönder</h2>
        <p className="text-sm text-muted-foreground">Bilgilerinizi kontrol edin ve gönderin.</p>
      </div>

      <div className="border border-border divide-y divide-border">
        {/* Files */}
        <div className="p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Dosyalar</h3>
          <div className="space-y-2">
            {formData.files.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <FileText size={14} className="text-primary" />
                <span>{f.name}</span>
                <span className="text-xs text-muted-foreground">({(f.size / 1024 / 1024).toFixed(2)} MB)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Specs */}
        <div className="p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Üretim Detayları</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              ["Hizmet", formData.service],
              ["Malzeme", formData.material],
              ["Yüzey İşlemi", formData.finish || "Belirtilmedi"],
              ["Adet", `${formData.quantity} adet`],
              ["Teslimat", formData.delivery === "express" ? "Ekspres (3-5 gün)" : "Standart (7-10 gün)"],
            ].map(([label, value]) => (
              <div key={label}>
                <span className="text-muted-foreground text-xs">{label}</span>
                <p className="font-medium">{value}</p>
              </div>
            ))}
          </div>
          {formData.notes && (
            <div className="mt-3 pt-3 border-t border-border">
              <span className="text-muted-foreground text-xs">Notlar</span>
              <p className="text-sm mt-1">{formData.notes}</p>
            </div>
          )}
        </div>

        {/* Contact */}
        <div className="p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">İletişim</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              ["Ad Soyad", `${formData.firstName} ${formData.lastName}`],
              ["E-posta", formData.email],
              ["Telefon", formData.phone],
              ["Firma", formData.company || "—"],
            ].map(([label, value]) => (
              <div key={label}>
                <span className="text-muted-foreground text-xs">{label}</span>
                <p className="font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const stepRenderers = [renderStep1, renderStep2, renderStep3, renderStep4];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="bg-industrial-dark text-primary-foreground py-16 mb-0">
          <div className="container-industrial text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="accent-line mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Teklif Al</h1>
              <p className="text-white/70 max-w-lg mx-auto text-sm">
                CAD dosyanızı yükleyin, 24 saat içinde detaylı fiyat teklifi alın.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Wizard */}
        <div className="container-industrial max-w-4xl mx-auto -mt-6">
          {/* Progress */}
          <div className="bg-card border border-border p-4 mb-0">
            <div className="flex items-center justify-between">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const isActive = currentStep >= step.id;
                const isCurrent = currentStep === step.id;
                return (
                  <div key={step.id} className="flex items-center gap-2 flex-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-9 h-9 flex items-center justify-center text-xs font-bold transition-all ${
                        isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}>
                        {currentStep > step.id ? <Check size={14} /> : <Icon size={14} />}
                      </div>
                      <div className="hidden sm:block">
                        <p className={`text-xs font-semibold ${isCurrent ? "text-foreground" : "text-muted-foreground"}`}>
                          {step.title}
                        </p>
                      </div>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`flex-1 h-px mx-2 ${currentStep > step.id ? "bg-primary" : "bg-border"}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="bg-card border border-t-0 border-border p-6 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {stepRenderers[currentStep - 1]()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              {currentStep > 1 ? (
                <button onClick={prev} className="btn-industrial-secondary text-xs flex items-center gap-2 py-3 px-6">
                  <ChevronLeft size={14} /> Geri
                </button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <button onClick={next} className="btn-industrial-primary text-xs flex items-center gap-2 py-3 px-6">
                  İleri <ChevronRight size={14} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="btn-industrial-primary text-xs flex items-center gap-2 py-3 px-8 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                  {isSubmitting ? "Gönderiliyor..." : "Teklif Talebini Gönder"}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeklifAl;
