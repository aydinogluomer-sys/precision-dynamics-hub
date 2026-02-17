import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<"loading" | "authenticated" | "unauthenticated">("loading");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setState(session ? "authenticated" : "unauthenticated");
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setState(session ? "authenticated" : "unauthenticated");
    });

    return () => subscription.unsubscribe();
  }, []);

  if (state === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (state === "unauthenticated") {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
