/**
 * HeroCanvas.tsx — Full-screen R3F canvas behind hero content
 * IO lazy render: viewport dışındayken Canvas unmount.
 */
import { Suspense, useState, useEffect, useRef, Component, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { LiquidImage } from "./LiquidImage";
import heroBg from "@/assets/hero-cnc.jpg";

class WebGLErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

// Probe WebGL support once at module load — avoids mounting Canvas in headless envs
const webGLSupported = (() => {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl') || c.getContext('experimental-webgl'));
  } catch { return false; }
})();

export const HeroCanvas = () => {
  const [visible, setVisible] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 z-0" style={{ pointerEvents: "auto" }}>
      {visible && webGLSupported ? (
        <WebGLErrorBoundary>
        <Canvas
          dpr={[1, 1.5]}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
          }}
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <LiquidImage src={heroBg} opacity={0.25} />
          </Suspense>
        </Canvas>
        </WebGLErrorBoundary>
      ) : null}
    </div>
  );
};
