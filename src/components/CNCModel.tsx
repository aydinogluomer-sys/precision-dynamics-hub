import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, Suspense } from "react";
import * as THREE from "three";

// Procedural CNC gear/part geometry
const CNCGear = () => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x = Math.sin(Date.now() * 0.0005) * 0.1;
    }
  });

  const tealColor = new THREE.Color("#0688AD");
  const darkColor = new THREE.Color("#1e293b");
  const metalColor = new THREE.Color("#94a3b8");

  return (
    <group ref={meshRef}>
      {/* Main gear body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.8, 1.8, 0.5, 32]} />
        <meshStandardMaterial color={metalColor} metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Inner ring */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1.2, 0.12, 16, 32]} />
        <meshStandardMaterial color={tealColor} metalness={0.9} roughness={0.15} emissive={tealColor} emissiveIntensity={0.3} />
      </mesh>

      {/* Center hole */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.7, 24]} />
        <meshStandardMaterial color={darkColor} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Gear teeth */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 1.95, 0, Math.sin(angle) * 1.95]}
            rotation={[0, -angle, 0]}
          >
            <boxGeometry args={[0.35, 0.5, 0.25]} />
            <meshStandardMaterial color={metalColor} metalness={0.85} roughness={0.2} />
          </mesh>
        );
      })}

      {/* Precision holes on surface */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh
            key={`hole-${i}`}
            position={[Math.cos(angle) * 0.9, 0.26, Math.sin(angle) * 0.9]}
          >
            <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
            <meshStandardMaterial color={darkColor} metalness={0.95} roughness={0.05} />
          </mesh>
        );
      })}

      {/* Second smaller gear offset */}
      <group position={[2.8, 0, 0.5]} rotation={[0, 0.3, 0]}>
        <mesh>
          <cylinderGeometry args={[1, 1, 0.4, 24]} />
          <meshStandardMaterial color={metalColor} metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh>
          <torusGeometry args={[0.65, 0.08, 12, 24]} />
          <meshStandardMaterial color={tealColor} metalness={0.9} roughness={0.15} emissive={tealColor} emissiveIntensity={0.2} />
        </mesh>
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 1.1, 0, Math.sin(angle) * 1.1]}
              rotation={[0, -angle, 0]}
            >
              <boxGeometry args={[0.25, 0.4, 0.18]} />
              <meshStandardMaterial color={metalColor} metalness={0.85} roughness={0.2} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};

export const CNCModel = () => (
  <div className="w-full h-full">
    <Canvas
      camera={{ position: [0, 3, 6], fov: 40 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-3, 2, -3]} intensity={0.4} color="#0688AD" />
        <pointLight position={[0, -2, 3]} intensity={0.5} color="#0688AD" />
        <CNCGear />
      </Suspense>
    </Canvas>
  </div>
);
