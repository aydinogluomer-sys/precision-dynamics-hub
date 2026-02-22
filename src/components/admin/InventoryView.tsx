import { useState } from "react";
import { Package, AlertTriangle, Plus, Minus, Scissors, Wrench } from "lucide-react";

const toolInventory = [
  { id: "TK-001", name: "Ø12 Parmak Freze (HSS)", category: "Freze", stock: 8, minStock: 5, unitCost: 180, supplier: "Dormer Pramet" },
  { id: "TK-002", name: "Ø6 Karbür Parmak Freze", category: "Freze", stock: 3, minStock: 5, unitCost: 420, supplier: "Sandvik" },
  { id: "TK-003", name: "CNMG 120408 Insert", category: "Kesici Uç", stock: 24, minStock: 10, unitCost: 85, supplier: "Iscar" },
  { id: "TK-004", name: "WNMG 080408 Insert", category: "Kesici Uç", stock: 2, minStock: 8, unitCost: 72, supplier: "Kennametal" },
  { id: "TK-005", name: "Ø8.5 HSS Matkap", category: "Matkap", stock: 12, minStock: 6, unitCost: 45, supplier: "Gühring" },
  { id: "TK-006", name: "M10x1.5 Kılavuz", category: "Kılavuz", stock: 4, minStock: 4, unitCost: 95, supplier: "Emuge" },
  { id: "TK-007", name: "Ø16 Karbür Matkap", category: "Matkap", stock: 1, minStock: 3, unitCost: 650, supplier: "Sandvik" },
];

const rawMaterials = [
  { id: "HM-001", name: "Alüminyum 6061-T6", spec: "Ø80 × 300mm", stock: 45, unit: "adet", unitCost: 320, wasteRate: 22 },
  { id: "HM-002", name: "Çelik 1040 (C45)", spec: "Ø60 × 200mm", stock: 120, unit: "adet", unitCost: 180, wasteRate: 28 },
  { id: "HM-003", name: "AISI 316L", spec: "150×150×50mm", stock: 8, unit: "adet", unitCost: 890, wasteRate: 35 },
  { id: "HM-004", name: "POM-C (Delrin)", spec: "Ø100 × 500mm", stock: 15, unit: "adet", unitCost: 210, wasteRate: 15 },
  { id: "HM-005", name: "7075-T6 Alüminyum", spec: "200×100×30mm", stock: 22, unit: "adet", unitCost: 540, wasteRate: 40 },
];

const InventoryView = () => {
  const [tab, setTab] = useState<"tools" | "materials">("tools");

  const criticalTools = toolInventory.filter((t) => t.stock <= t.minStock);
  const totalToolValue = toolInventory.reduce((s, t) => s + t.stock * t.unitCost, 0);
  const totalMaterialValue = rawMaterials.reduce((s, m) => s + m.stock * m.unitCost, 0);
  const avgWaste = rawMaterials.reduce((s, m) => s + m.wasteRate, 0) / rawMaterials.length;

  return (
    <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Kritik Takım Stoku", value: `${criticalTools.length} kalem`, icon: AlertTriangle, color: criticalTools.length > 0 ? "text-red-400" : "text-emerald-400", bg: criticalTools.length > 0 ? "bg-red-400/10" : "bg-emerald-400/10" },
          { label: "Takım Envanter Değeri", value: `₺${totalToolValue.toLocaleString("tr-TR")}`, icon: Wrench, color: "text-[#0AA2CD]", bg: "bg-[#0AA2CD]/10" },
          { label: "Hammadde Değeri", value: `₺${totalMaterialValue.toLocaleString("tr-TR")}`, icon: Package, color: "text-amber-400", bg: "bg-amber-400/10" },
          { label: "Ort. Fire Oranı", value: `%${avgWaste.toFixed(1)}`, icon: Scissors, color: "text-orange-400", bg: "bg-orange-400/10" },
        ].map((m) => (
          <div key={m.label} className="dark:bg-[#1E293B] bg-white rounded-xl dark:border-[#334155] border-slate-200 border p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.label}</span>
              <div className={`w-8 h-8 rounded-lg ${m.bg} flex items-center justify-center`}>
                <m.icon className={`w-4 h-4 ${m.color}`} />
              </div>
            </div>
            <p className={`text-xl font-black ${m.color}`}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { id: "tools" as const, label: "Kesici Takımlar" },
          { id: "materials" as const, label: "Hammaddeler" },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${tab === t.id ? "bg-[#0AA2CD] text-white" : "dark:bg-[#1E293B] bg-slate-100 dark:text-slate-400 text-slate-600 hover:text-[#0AA2CD]"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "tools" ? (
        <div className="dark:bg-[#1E293B] bg-white rounded-xl dark:border-[#334155] border-slate-200 border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 dark:bg-[#1E293B] bg-white z-10">
                <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest dark:border-[#334155] border-slate-200 border-b">
                  <th className="text-left p-4">ID</th>
                  <th className="text-left p-4">Takım Adı</th>
                  <th className="text-left p-4 hidden md:table-cell">Kategori</th>
                  <th className="text-right p-4">Stok</th>
                  <th className="text-right p-4 hidden md:table-cell">Min.</th>
                  <th className="text-right p-4">Birim ₺</th>
                  <th className="text-left p-4 hidden lg:table-cell">Tedarikçi</th>
                  <th className="text-left p-4">Durum</th>
                </tr>
              </thead>
              <tbody>
                {toolInventory.map((t) => {
                  const critical = t.stock <= t.minStock;
                  return (
                    <tr key={t.id} className={`dark:border-[#334155]/50 border-slate-100 border-b dark:hover:bg-white/5 hover:bg-slate-50 transition-colors ${critical ? "dark:bg-red-500/5 bg-red-50" : ""}`}>
                      <td className="p-4 font-bold text-[#0AA2CD] text-xs">{t.id}</td>
                      <td className="p-4 dark:text-white text-slate-800 font-medium text-xs">{t.name}</td>
                      <td className="p-4 dark:text-slate-400 text-slate-500 hidden md:table-cell text-xs">{t.category}</td>
                      <td className={`p-4 text-right font-bold font-mono tabular-nums ${critical ? "text-red-400" : "dark:text-white text-slate-800"}`}>{t.stock}</td>
                      <td className="p-4 text-right dark:text-slate-500 text-slate-400 hidden md:table-cell font-mono tabular-nums">{t.minStock}</td>
                      <td className="p-4 text-right dark:text-slate-300 text-slate-600 font-mono tabular-nums">₺{t.unitCost}</td>
                      <td className="p-4 dark:text-slate-400 text-slate-500 hidden lg:table-cell text-xs">{t.supplier}</td>
                      <td className="p-4">
                        {critical ? (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-red-500/20 text-red-400 animate-pulse">Sipariş Ver</span>
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/20 text-emerald-400">Yeterli</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="dark:bg-[#1E293B] bg-white rounded-xl dark:border-[#334155] border-slate-200 border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 dark:bg-[#1E293B] bg-white z-10">
                <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest dark:border-[#334155] border-slate-200 border-b">
                  <th className="text-left p-4">ID</th>
                  <th className="text-left p-4">Malzeme</th>
                  <th className="text-left p-4 hidden md:table-cell">Ebat</th>
                  <th className="text-right p-4">Stok</th>
                  <th className="text-right p-4">Birim ₺</th>
                  <th className="text-right p-4">Fire %</th>
                  <th className="text-right p-4 hidden md:table-cell">Toplam ₺</th>
                </tr>
              </thead>
              <tbody>
                {rawMaterials.map((m) => (
                  <tr key={m.id} className="dark:border-[#334155]/50 border-slate-100 border-b dark:hover:bg-white/5 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-[#0AA2CD] text-xs">{m.id}</td>
                    <td className="p-4 dark:text-white text-slate-800 font-medium text-xs">{m.name}</td>
                    <td className="p-4 dark:text-slate-400 text-slate-500 hidden md:table-cell text-xs font-mono">{m.spec}</td>
                    <td className="p-4 text-right dark:text-white text-slate-800 font-bold font-mono tabular-nums">{m.stock}</td>
                    <td className="p-4 text-right dark:text-slate-300 text-slate-600 font-mono tabular-nums">₺{m.unitCost}</td>
                    <td className="p-4 text-right">
                      <span className={`text-xs font-bold font-mono tabular-nums ${m.wasteRate > 30 ? "text-red-400" : m.wasteRate > 20 ? "text-amber-400" : "text-emerald-400"}`}>%{m.wasteRate}</span>
                    </td>
                    <td className="p-4 text-right dark:text-white text-slate-800 font-bold font-mono tabular-nums hidden md:table-cell">₺{(m.stock * m.unitCost).toLocaleString("tr-TR")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryView;
