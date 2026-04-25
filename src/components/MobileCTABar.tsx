import { Link, useLocation } from "react-router-dom";

export const MobileCTABar = () => {
  const { pathname } = useLocation();
  if (pathname !== "/") return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[45] px-3 py-2.5 md:hidden"
      style={{
        background: "linear-gradient(to top, var(--bg-cinematic-deep), rgb(var(--bg-cinematic-deep-rgb) / 0.82))",
        borderTop: "1px solid var(--rule)",
        paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom))",
      }}
    >
      <Link
        to="/teklif-al"
        className="block w-full py-3.5 text-center font-mono text-xs font-semibold uppercase tracking-[0.14em]"
        style={{ background: "var(--action-primary)", color: "var(--action-primary-ink)" }}
      >
        48 saatte teklif al →
      </Link>
    </div>
  );
};
