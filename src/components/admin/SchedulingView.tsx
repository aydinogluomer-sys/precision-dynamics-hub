const machines = ["CNC-01", "CNC-02", "CNC-03", "Lazer-01", "Abkant-01", "CMM-01"];
const days = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"];

const jobs: Record<string, Record<string, { id: string; name: string; hours: number; progress: number } | null>> = {
  "CNC-01": { Pazartesi: { id: "PO-9928", name: "Dişli Mili", hours: 4, progress: 75 }, Salı: { id: "PO-9928", name: "Dişli Mili", hours: 4, progress: 75 }, Çarşamba: null, Perşembe: { id: "PO-9932", name: "Flanş", hours: 3, progress: 10 }, Cuma: null },
  "CNC-02": { Pazartesi: null, Salı: { id: "PO-9931", name: "Bağlantı Plakası", hours: 6, progress: 40 }, Çarşamba: { id: "PO-9931", name: "Bağlantı Plakası", hours: 6, progress: 40 }, Perşembe: null, Cuma: null },
  "CNC-03": { Pazartesi: null, Salı: null, Çarşamba: null, Perşembe: null, Cuma: null },
  "Lazer-01": { Pazartesi: { id: "PO-9930", name: "Panel Kesim", hours: 2, progress: 90 }, Salı: null, Çarşamba: null, Perşembe: null, Cuma: { id: "PO-9935", name: "Lazer Parça", hours: 3, progress: 0 } },
  "Abkant-01": { Pazartesi: null, Salı: null, Çarşamba: null, Perşembe: null, Cuma: null },
  "CMM-01": { Pazartesi: null, Salı: null, Çarşamba: { id: "QC-101", name: "CMM Ölçüm", hours: 1, progress: 50 }, Perşembe: null, Cuma: null },
};

const SchedulingView = () => {
  return (
    <div className="space-y-4 animate-[fadeInUp_0.4s_ease-out]">
      <div className="bg-[#1E293B] rounded-xl border border-[#334155] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#334155]">
                <th className="text-left p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest w-28">Makine</th>
                {days.map((d) => (
                  <th key={d} className="text-center p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {machines.map((m) => (
                <tr key={m} className="border-b border-[#334155]/50">
                  <td className="p-4 font-bold text-white text-xs">{m}</td>
                  {days.map((d) => {
                    const job = jobs[m]?.[d];
                    return (
                      <td key={d} className="p-2">
                        {job ? (
                          <div className="bg-[#0AA2CD]/10 border border-[#0AA2CD]/20 rounded-lg p-2 text-center hover:bg-[#0AA2CD]/20 transition-colors cursor-pointer">
                            <p className="text-[10px] font-black text-[#0AA2CD]">{job.id}</p>
                            <p className="text-[9px] text-slate-300">{job.name}</p>
                            <p className="text-[9px] text-slate-500">{job.hours} saat</p>
                            <div className="w-full h-1 bg-[#0F172A] rounded-full mt-1 overflow-hidden">
                              <div className="h-full bg-[#0AA2CD] rounded-full" style={{ width: `${job.progress}%` }} />
                            </div>
                          </div>
                        ) : (
                          <div className="h-16 rounded-lg border border-dashed border-[#334155] flex items-center justify-center">
                            <span className="text-[9px] text-slate-600">Boş</span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cost calculator */}
      <div className="bg-[#1E293B] rounded-xl border border-[#334155] p-5 max-w-sm">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Üretim Süresi Hesaplayıcı</h3>
        <div className="flex items-center gap-3">
          <input
            type="number"
            defaultValue="3.2"
            className="w-24 px-3 py-2 rounded-lg bg-[#0F172A] border border-[#334155] text-white focus:outline-none focus:border-[#0AA2CD] text-sm"
          />
          <span className="text-xs text-slate-400">saat × 450₺/saat =</span>
          <span className="text-sm font-black text-[#0AA2CD]">1,440₺</span>
        </div>
      </div>
    </div>
  );
};

export default SchedulingView;
