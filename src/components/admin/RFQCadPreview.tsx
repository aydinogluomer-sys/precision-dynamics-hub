import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Download, Box, FileText, Calendar, HardDrive } from "lucide-react";
import { toast } from "sonner";

interface RFQCadPreviewProps {
  filePath: string;
  rfqId: string;
  userId: string | null;
  onDownload: () => void;
}

interface FileMetadata {
  name: string;
  size: number;
  extension: string;
  uploadDate: string;
  signedUrl: string | null;
}

const STLModel = ({ url }: { url: string }) => {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    const loader = new STLLoader();
    loader.load(url, (geo) => {
      geo.computeVertexNormals();
      geo.center();
      setGeometry(geo);
    });
  }, [url]);

  if (!geometry) return null;

  const box = new THREE.Box3().setFromBufferAttribute(geometry.attributes.position as THREE.BufferAttribute);
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = 2 / maxDim;

  return (
    <Center>
      <mesh geometry={geometry} scale={[scale, scale, scale]}>
        <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.3} />
      </mesh>
    </Center>
  );
};

const OBJModel = ({ url }: { url: string }) => {
  const [object, setObject] = useState<THREE.Group | null>(null);

  useEffect(() => {
    const loader = new OBJLoader();
    loader.load(url, (obj) => {
      const box = new THREE.Box3().setFromObject(obj);
      const center = box.getCenter(new THREE.Vector3());
      obj.position.sub(center);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2 / maxDim;
      obj.scale.set(scale, scale, scale);
      obj.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
            color: "#94a3b8",
            metalness: 0.6,
            roughness: 0.3,
          });
        }
      });
      setObject(obj);
    });
  }, [url]);

  if (!object) return null;
  return <primitive object={object} />;
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const resolveStorageUrl = async (filePath: string, rfqId: string, userId: string | null) => {
  const rawPath = filePath.replace(/^\/+/, "").replace(/^cad-uploads\//, "").split("?")[0];
  const baseName = rawPath.split("/").pop() || rawPath;
  const cleanBaseName = baseName.replace(/^\d+_/, "");

  const trySign = async (path: string) => {
    const { data } = await supabase.storage.from("cad-uploads").createSignedUrl(path, 3600);
    return data?.signedUrl || null;
  };

  // 1) direct
  let url = await trySign(rawPath);
  if (url) return { url, path: rawPath };

  // 2) user/rfq folders
  const dirs = [
    userId ? `${userId}/${rfqId}` : null,
    `anonymous/${rfqId}`,
  ].filter(Boolean) as string[];

  for (const dir of dirs) {
    const { data: files } = await supabase.storage.from("cad-uploads").list(dir, { limit: 200 });
    const match = files?.find((f) => f.name === baseName || f.name.includes(cleanBaseName));
    if (match) {
      const fullPath = `${dir}/${match.name}`;
      url = await trySign(fullPath);
      if (url) return { url, path: fullPath };
    }
  }

  // 3) root
  const { data: rootFiles } = await supabase.storage.from("cad-uploads").list("", { limit: 200 });
  const rootMatch = rootFiles?.find((f) => f.name === baseName || f.name.includes(cleanBaseName));
  if (rootMatch) {
    url = await trySign(rootMatch.name);
    if (url) return { url, path: rootMatch.name };
  }

  return { url: null, path: rawPath };
};

const getFileMetadata = async (storagePath: string) => {
  // Try to get object metadata via list
  const dir = storagePath.includes("/") ? storagePath.substring(0, storagePath.lastIndexOf("/")) : "";
  const fileName = storagePath.split("/").pop() || storagePath;
  const { data } = await supabase.storage.from("cad-uploads").list(dir || "", { limit: 200 });
  const fileObj = data?.find((f) => f.name === fileName);
  return fileObj ? {
    size: (fileObj.metadata as any)?.size || (fileObj.metadata as any)?.contentLength || 0,
    created: fileObj.created_at || "",
  } : { size: 0, created: "" };
};

const PREVIEWABLE_EXTS = ["stl", "obj"];

const RFQCadPreview = ({ filePath, rfqId, userId, onDownload }: RFQCadPreviewProps) => {
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState<FileMetadata | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const baseName = filePath.split("/").pop() || filePath;
  const extension = baseName.split(".").pop()?.toLowerCase() || "";
  const canPreview = PREVIEWABLE_EXTS.includes(extension);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { url, path } = await resolveStorageUrl(filePath, rfqId, userId);
      const fileMeta = await getFileMetadata(path);
      if (!cancelled) {
        setMeta({
          name: baseName,
          size: fileMeta.size,
          extension: extension.toUpperCase(),
          uploadDate: fileMeta.created ? new Date(fileMeta.created).toLocaleDateString("tr-TR") : "-",
          signedUrl: url,
        });
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [filePath, rfqId, userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-6">
        <Loader2 className="w-5 h-5 animate-spin text-primary" />
      </div>
    );
  }

  if (!meta) return null;

  return (
    <div className="space-y-2">
      {/* Metadata Card */}
      <div className="rounded-lg dark:bg-[#0F172A] bg-slate-50 dark:border-[#334155] border-slate-200 border p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Box size={16} className="text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold dark:text-white text-slate-800 truncate">{meta.name}</p>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="inline-flex items-center gap-1 text-[10px] dark:text-slate-400 text-slate-500">
                  <FileText size={10} /> {meta.extension}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] dark:text-slate-400 text-slate-500">
                  <HardDrive size={10} /> {meta.size > 0 ? formatFileSize(meta.size) : "—"}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] dark:text-slate-400 text-slate-500">
                  <Calendar size={10} /> {meta.uploadDate}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onDownload}
            className="shrink-0 p-1.5 rounded-lg hover:bg-primary/10 text-primary transition-colors"
            title="İndir"
          >
            <Download size={16} />
          </button>
        </div>
      </div>

      {/* 3D Preview */}
      {canPreview && meta.signedUrl && (
        <div>
          {!showPreview ? (
            <button
              onClick={() => setShowPreview(true)}
              className="w-full py-2 text-xs font-bold text-primary bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <Box size={14} /> 3D Önizleme
            </button>
          ) : (
            <div className="relative rounded-lg overflow-hidden border dark:border-[#334155] border-slate-200 bg-gradient-to-b from-slate-900 to-slate-800" style={{ height: 220 }}>
              <Canvas camera={{ position: [3, 2, 3], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <directionalLight position={[-5, -3, -5]} intensity={0.3} />
                <Suspense fallback={null}>
                  {extension === "stl" && <STLModel url={meta.signedUrl} />}
                  {extension === "obj" && <OBJModel url={meta.signedUrl} />}
                </Suspense>
                <OrbitControls enableZoom enablePan={false} autoRotate autoRotateSpeed={2} />
                <gridHelper args={[10, 20, "#334155", "#1e293b"]} />
              </Canvas>
              <button
                onClick={() => setShowPreview(false)}
                className="absolute top-1.5 right-1.5 text-[10px] px-2 py-0.5 rounded bg-black/50 text-white/70 hover:text-white"
              >
                Kapat
              </button>
            </div>
          )}
        </div>
      )}

      {/* Non-previewable hint */}
      {!canPreview && (
        <p className="text-[10px] dark:text-slate-500 text-slate-400">
          STEP/IGES dosyaları için önizleme desteklenmiyor, dosyayı indirip yerel CAD yazılımında açabilirsiniz.
        </p>
      )}
    </div>
  );
};

export default RFQCadPreview;
