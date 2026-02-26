import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, FolderOpen, Upload, FileCode, FileText, Download } from "lucide-react";
import { toast } from "sonner";

interface CustomerFile {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string | null;
  version: number | null;
  notes: string | null;
  created_at: string;
}

const fileIcon = (type: string | null) => {
  switch (type) {
    case "cad": case "step": case "stp": case "iges": return FileCode;
    default: return FileText;
  }
};

const TeknikArsivTab = () => {
  const [files, setFiles] = useState<CustomerFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchFiles = async () => {
    const { data } = await supabase
      .from("customer_files")
      .select("id, file_name, file_url, file_type, version, notes, created_at")
      .order("created_at", { ascending: false });
    setFiles((data as CustomerFile[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchFiles(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { toast.error("Oturum bulunamadı."); setUploading(false); return; }

    const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
    const path = `${session.user.id}/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage.from("customer-files").upload(path, file);
    if (uploadError) { toast.error("Dosya yüklenemedi: " + uploadError.message); setUploading(false); return; }

    const { data: urlData } = supabase.storage.from("customer-files").getPublicUrl(path);

    const fileType = ["step", "stp", "iges", "igs"].includes(ext) ? "cad" :
                     ["pdf"].includes(ext) ? "pdf" : "other";

    const { error: dbError } = await supabase.from("customer_files").insert({
      user_id: session.user.id,
      file_name: file.name,
      file_url: urlData.publicUrl,
      file_type: fileType,
    });

    if (dbError) { toast.error("Dosya kaydedilemedi."); } else {
      toast.success("Dosya yüklendi!");
      fetchFiles();
    }
    setUploading(false);
    e.target.value = "";
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" size={24} /></div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">Teknik Dosyalarım</h3>
        <label>
          <Input type="file" className="hidden" accept=".step,.stp,.iges,.igs,.pdf,.dxf,.dwg,.png,.jpg" onChange={handleUpload} />
          <Button size="sm" variant="outline" className="gap-2 text-xs cursor-pointer" asChild disabled={uploading}>
            <span>
              {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
              Dosya Yükle
            </span>
          </Button>
        </label>
      </div>

      {files.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <FolderOpen size={40} className="mb-3 opacity-30" />
          <p className="text-sm font-medium">Henüz dosya yüklenmemiş.</p>
          <p className="text-xs mt-1">Teknik çizimlerinizi ve CAD dosyalarınızı buradan yönetin.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {files.map((f) => {
            const Icon = fileIcon(f.file_type);
            return (
              <div key={f.id} className="flex items-center gap-4 p-3 border border-border bg-background hover:border-primary/20 transition-colors">
                <Icon size={20} className="text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{f.file_name}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {new Date(f.created_at).toLocaleDateString("tr-TR")}
                    {f.version && f.version > 1 && ` · v${f.version}`}
                  </p>
                </div>
                <Badge variant="outline" className="text-[10px] uppercase">{f.file_type || "dosya"}</Badge>
                <a href={f.file_url} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0"><Download size={14} /></Button>
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TeknikArsivTab;
