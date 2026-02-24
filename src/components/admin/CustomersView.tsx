import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Users, Plus, X } from "lucide-react";
import { toast } from "sonner";

interface Customer {
  id: number;
  name: string | null;
  company: string | null;
  city: string | null;
  phone: string | null;
  email: string | null;
  balance: number | null;
  last_order: string | null;
}

const CustomersView = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", city: "", phone: "", email: "" });

  const fetchData = async () => {
    const { data } = await supabase.from("customers").select("*").order("created_at", { ascending: false });
    if (data) setCustomers(data as Customer[]);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const addCustomer = async () => {
    // Client-side validation matching DB constraints
    if (form.name && form.name.length > 200) { toast.error("Ad en fazla 200 karakter olabilir"); return; }
    if (form.company && form.company.length > 200) { toast.error("Firma adı en fazla 200 karakter olabilir"); return; }
    if (form.city && form.city.length > 100) { toast.error("Şehir en fazla 100 karakter olabilir"); return; }
    if (form.phone && form.phone.length > 30) { toast.error("Telefon en fazla 30 karakter olabilir"); return; }
    if (form.email && form.email.length > 255) { toast.error("E-posta en fazla 255 karakter olabilir"); return; }
    if (form.email && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(form.email)) {
      toast.error("Geçerli bir e-posta adresi girin"); return;
    }
    const { error } = await supabase.from("customers").insert(form);
    if (error) { toast.error("Eklenemedi"); return; }
    toast.success("Müşteri eklendi");
    setShowAdd(false);
    setForm({ name: "", company: "", city: "", phone: "", email: "" });
    fetchData();
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-[#0AA2CD]" /></div>;

  return (
    <div className="space-y-4 animate-[fadeInUp_0.4s_ease-out]">
      <div className="flex items-center justify-between">
        <span className="text-xs dark:text-slate-400 text-slate-500">{customers.length} iş ortağı</span>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0AA2CD] text-white rounded-lg text-xs font-bold">
          <Plus className="w-3.5 h-3.5" /> Yeni Ekle
        </button>
      </div>

      {customers.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <Users className="w-12 h-12 mx-auto mb-3" />
          <p className="font-medium">Henüz müşteri kaydı yok</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {customers.map((c) => (
            <div key={c.id} className="dark:bg-[#1E293B] bg-white rounded-xl dark:border-[#334155] border-slate-200 border p-5 hover:shadow-xl hover:border-[#0AA2CD]/30 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#0AA2CD]/20 flex items-center justify-center text-[#0AA2CD] font-black text-sm">
                  {(c.name || "?").charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold dark:text-white text-slate-800 text-sm">{c.name || "—"}</h3>
                  <p className="text-xs dark:text-slate-400 text-slate-500">{c.company || "—"}</p>
                </div>
              </div>
              <div className="space-y-2 text-xs">
                {c.city && <p className="dark:text-slate-400 text-slate-500">📍 {c.city}</p>}
                {c.phone && <p className="dark:text-slate-400 text-slate-500">☎ {c.phone}</p>}
                {c.email && <p className="dark:text-slate-400 text-slate-500">✉ {c.email}</p>}
                {c.balance !== null && (
                  <p className="dark:text-white text-slate-800 font-bold">Bakiye: ₺{Number(c.balance).toLocaleString("tr-TR")}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
          <div className="dark:bg-[#1E293B] bg-white rounded-xl dark:border-[#334155] border-slate-200 border w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black dark:text-white text-slate-800">Yeni İş Ortağı</h3>
              <button onClick={() => setShowAdd(false)} className="dark:text-slate-400 text-slate-500 hover:text-[#0AA2CD]"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              {[
                { key: "name", label: "Ad Soyad", ph: "Ahmet Yılmaz" },
                { key: "company", label: "Firma", ph: "Yılmaz Makina" },
                { key: "city", label: "Şehir", ph: "İstanbul" },
                { key: "phone", label: "Telefon", ph: "+90 5XX XXX XX XX" },
                { key: "email", label: "E-posta", ph: "info@firma.com" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{f.label}</label>
                  <input
                    value={(form as Record<string, string>)[f.key]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg dark:bg-[#0F172A] bg-slate-50 dark:border-[#334155] border-slate-200 border dark:text-white text-slate-800 focus:outline-none focus:border-[#0AA2CD]"
                    placeholder={f.ph}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowAdd(false)} className="flex-1 py-2 dark:bg-slate-700 bg-slate-200 dark:text-slate-300 text-slate-600 rounded-lg text-xs font-bold">İptal</button>
              <button onClick={addCustomer} className="flex-1 py-2 bg-[#0AA2CD] text-white rounded-lg text-xs font-bold">Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersView;
