/**
 * HeroCanvas.tsx — Full-screen R3F canvas behind hero content
 * Fixed, inset-0, z-0 — all HTML content sits on top.
 */
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { LiquidImage } from "./LiquidImage";
import heroBg from "@/assets/hero-cnc.jpg";

export const HeroCanvas = () => {
  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: "auto" }}>
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
    </div>
  );
};
