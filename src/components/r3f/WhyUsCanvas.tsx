/**
 * WhyUsCanvas.tsx — R3F canvas for WhyUsSection background.
 * IO lazy mount (unmounts when off-screen), WebGL capability probe, error boundary.
 */
import { useState, useEffect, useRef, Component, type ReactNode, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { IndustrialFogBg } from "./IndustrialFogBg";

class WebGLErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

const webGLSupported = (() => {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl") || c.getContext("experimental-webgl"));
  } catch { return false; }
})();

export const WhyUsCanvas = ({ intensity = 0.85 }: { intensity?: number }) => {
  const [visible, setVisible] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {visible && webGLSupported ? (
        <WebGLErrorBoundary>
          <Canvas
            dpr={[1, 1.5]}
            gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
            camera={{ position: [0, 0, 5], fov: 50 }}
            style={{ background: "transparent" }}
          >
            <Suspense fallback={null}>
              <IndustrialFogBg intensity={intensity} />
            </Suspense>
          </Canvas>
        </WebGLErrorBoundary>
      ) : null}
    </div>
  );
};
