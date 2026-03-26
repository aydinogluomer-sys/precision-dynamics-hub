import { Volume2, VolumeX } from "lucide-react";
import { useState, useEffect } from "react";

export const SoundToggle = () => {
  const [enabled, setEnabled] = useState(() => {
    return localStorage.getItem("mas_sound") === "1";
  });

  useEffect(() => {
    localStorage.setItem("mas_sound", enabled ? "1" : "0");
  }, [enabled]);

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
      aria-label={enabled ? "Sesi kapat" : "Sesi aç"}
    >
      {enabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
    </button>
  );
};
