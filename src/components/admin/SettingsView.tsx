import { useState } from "react";

const tabs = ["Üretim Parametreleri", "İş Akışı", "Roller", "API"];

const SettingsView = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-4 animate-[fadeInUp_0.4s_ease-out]">
      <div className="flex gap-2 flex-wrap">
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => setActive(i)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              active === i ? "bg-[#0AA2CD] text-white" : "bg-[#1E293B] text-slate-400 hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-[#1E293B] rounded-xl border border-[#334155] p-6">
        {active === 0 && (
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Üretim Parametreleri</h3>
            {[
              { label: "CNC Saatlik Ücret (₺/saat)", value: "450" },
              { label: "İşçilik Ücreti (₺/saat)", value: "180" },
              { label: "Kar Marjı (%)", value: "25" },
              { label: "Fire Oranı (%)", value: "3" },
            ].map((p) => (
              <div key={p.label} className="flex items-center justify-between gap-4">
                <label className="text-sm text-slate-300">{p.label}</label>
                <input
                  defaultValue={p.value}
                  className="w-32 px-3 py-2 rounded-lg bg-[#0F172A] border border-[#334155] text-white text-right focus:outline-none focus:border-[#0AA2CD]"
                />
              </div>
            ))}
          </div>
        )}
        {active === 1 && (
          <div>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Üretim Aşamaları</h3>
            <div className="space-y-2">
              {["Hammadde", "Hazırlık", "İşleme", "Final", "Kalite Kontrol", "Tamamlandı"].map((s, i) => (
                <div key={s} className="flex items-center gap-3 bg-[#0F172A] rounded-lg p-3">
                  <span className="text-xs font-bold text-[#0AA2CD]">{i + 1}</span>
                  <span className="text-sm text-white">{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {active === 2 && (
          <div>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Rol Yönetimi</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-[#334155]">
                    <th className="text-left pb-3">Rol</th>
                    <th className="text-left pb-3">Dashboard</th>
                    <th className="text-left pb-3">RFQ</th>
                    <th className="text-left pb-3">Üretim</th>
                    <th className="text-left pb-3">CRM</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { role: "Yönetici", d: true, r: true, u: true, c: true },
                    { role: "Operatör", d: true, r: false, u: true, c: false },
                    { role: "Müşteri", d: false, r: true, u: false, c: false },
                    { role: "Tedarikçi", d: false, r: false, u: false, c: false },
                  ].map((r) => (
                    <tr key={r.role} className="border-b border-[#334155]/50">
                      <td className="py-3 font-bold text-white">{r.role}</td>
                      {[r.d, r.r, r.u, r.c].map((v, i) => (
                        <td key={i} className="py-3">
                          <span className={`text-xs px-2 py-0.5 rounded ${v ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                            {v ? "Erişim" : "Kısıtlı"}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {active === 3 && (
          <div>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">API & Nexus Çekirdeği</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-[#0F172A] rounded-lg p-3">
                <span className="text-sm text-slate-300">E-posta Bildirimleri</span>
                <div className="w-10 h-5 bg-[#0AA2CD] rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5" />
                </div>
              </div>
              <div className="flex items-center justify-between bg-[#0F172A] rounded-lg p-3">
                <span className="text-sm text-slate-300">Realtime Sync</span>
                <div className="w-10 h-5 bg-[#0AA2CD] rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5" />
                </div>
              </div>
              <div className="bg-[#0F172A] rounded-lg p-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">API Key</p>
                <code className="text-xs text-[#0AA2CD] bg-[#1E293B] px-3 py-1.5 rounded block">nxs_live_•••••••••••••••k4f2</code>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsView;
