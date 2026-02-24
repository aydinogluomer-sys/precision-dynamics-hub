import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";

/* ──────────────── AEROSPACE: Turbine ──────────────── */
const TurbineModel = () => {
  const group = useRef<THREE.Group>(null);
  const teal = useMemo(() => new THREE.Color("#0688AD"), []);
  const metal = useMemo(() => new THREE.Color("#94a3b8"), []);
  const dark = useMemo(() => new THREE.Color("#1e293b"), []);

  useFrame((_, d) => {
    if (group.current) {
      group.current.rotation.z += d * 1.2;
      group.current.rotation.x = Math.sin(Date.now() * 0.0004) * 0.15;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <cylinderGeometry args={[0.35, 0.35, 0.4, 24]} />
        <meshStandardMaterial color={dark} metalness={0.95} roughness={0.1} />
      </mesh>
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.9, 0, Math.sin(a) * 0.9]} rotation={[0, -a + 0.3, Math.PI / 2]}>
            <boxGeometry args={[0.08, 0.9, 0.35]} />
            <meshStandardMaterial color={metal} metalness={0.85} roughness={0.15} />
          </mesh>
        );
      })}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.45, 0.06, 12, 48]} />
        <meshStandardMaterial color={teal} metalness={0.9} roughness={0.1} emissive={teal} emissiveIntensity={0.25} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.55, 0.04, 12, 32]} />
        <meshStandardMaterial color={teal} metalness={0.9} roughness={0.1} emissive={teal} emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
};

/* ──────────────── AUTOMOTIVE: Piston ──────────────── */
const PistonModel = () => {
  const group = useRef<THREE.Group>(null);
  const teal = useMemo(() => new THREE.Color("#0688AD"), []);
  const metal = useMemo(() => new THREE.Color("#94a3b8"), []);
  const dark = useMemo(() => new THREE.Color("#334155"), []);

  useFrame(() => {
    if (group.current) {
      const t = Date.now() * 0.002;
      group.current.rotation.y = Math.sin(t) * 0.3;
      group.current.children[0].position.y = Math.sin(t * 2) * 0.25 + 0.3;
    }
  });

  return (
    <group ref={group}>
      <group position={[0, 0.3, 0]}>
        <mesh>
          <cylinderGeometry args={[0.7, 0.7, 0.5, 32]} />
          <meshStandardMaterial color={metal} metalness={0.9} roughness={0.15} />
        </mesh>
        {[0.18, 0.0, -0.18].map((y, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <torusGeometry args={[0.72, 0.025, 8, 32]} />
            <meshStandardMaterial color={dark} metalness={0.95} roughness={0.05} />
          </mesh>
        ))}
      </group>
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[0.12, 1.0, 0.08]} />
        <meshStandardMaterial color={metal} metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.2, 0.06, 12, 24]} />
        <meshStandardMaterial color={teal} metalness={0.9} roughness={0.1} emissive={teal} emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 1.6, 32, 1, true]} />
        <meshStandardMaterial color={dark} metalness={0.7} roughness={0.3} transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

/* ──────────────── MEDICAL: Implant ──────────────── */
const ImplantModel = () => {
  const group = useRef<THREE.Group>(null);
  const teal = useMemo(() => new THREE.Color("#0688AD"), []);
  const white = useMemo(() => new THREE.Color("#e2e8f0"), []);

  useFrame((_, d) => {
    if (group.current) {
      group.current.rotation.y += d * 0.5;
      group.current.rotation.x = Math.sin(Date.now() * 0.0006) * 0.2;
    }
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial color={white} metalness={0.95} roughness={0.05} />
      </mesh>
      <mesh position={[0, 0.2, 0]} rotation={[0, 0, 0.15]}>
        <cylinderGeometry args={[0.15, 0.2, 0.6, 16]} />
        <meshStandardMaterial color={white} metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.22, 0.08, 1.4, 16]} />
        <meshStandardMaterial color={white} metalness={0.9} roughness={0.1} />
      </mesh>
      {[-0.1, -0.5, -0.9].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <torusGeometry args={[0.22 - i * 0.04, 0.015, 8, 24]} />
          <meshStandardMaterial color={teal} metalness={0.9} roughness={0.1} emissive={teal} emissiveIntensity={0.35} />
        </mesh>
      ))}
    </group>
  );
};

/* ──────────────── ROBOTICS: Joint ──────────────── */
const RoboticJointModel = () => {
  const group = useRef<THREE.Group>(null);
  const armRef = useRef<THREE.Group>(null);
  const teal = useMemo(() => new THREE.Color("#0688AD"), []);
  const metal = useMemo(() => new THREE.Color("#94a3b8"), []);
  const dark = useMemo(() => new THREE.Color("#1e293b"), []);

  useFrame(() => {
    if (group.current) group.current.rotation.y += 0.003;
    if (armRef.current) armRef.current.rotation.z = Math.sin(Date.now() * 0.0015) * 0.5;
  });

  return (
    <group ref={group}>
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.6, 0.7, 0.3, 24]} />
        <meshStandardMaterial color={dark} metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[0, -0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.25, 0.25, 0.35, 24]} />
        <meshStandardMaterial color={teal} metalness={0.9} roughness={0.1} emissive={teal} emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[0.18, 0.7, 0.15]} />
        <meshStandardMaterial color={metal} metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.35, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.18, 0.3, 24]} />
        <meshStandardMaterial color={teal} metalness={0.9} roughness={0.1} emissive={teal} emissiveIntensity={0.25} />
      </mesh>
      <group ref={armRef} position={[0, 0.35, 0]}>
        <mesh position={[0.35, 0.15, 0]}>
          <boxGeometry args={[0.6, 0.12, 0.12]} />
          <meshStandardMaterial color={metal} metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[0.65, 0.15, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color={teal} metalness={0.9} roughness={0.1} emissive={teal} emissiveIntensity={0.5} />
        </mesh>
      </group>
    </group>
  );
};

/* ──────────────── Model switcher inside a single Canvas ──────────────── */
export type IndustryType = "aerospace" | "automotive" | "medical" | "robotics";

const modelMap: Record<IndustryType, React.FC> = {
  aerospace: TurbineModel,
  automotive: PistonModel,
  medical: ImplantModel,
  robotics: RoboticJointModel,
};

const cameraMap: Record<IndustryType, [number, number, number]> = {
  aerospace: [0, 2, 4],
  automotive: [2, 1.5, 3],
  medical: [0, 1, 3.5],
  robotics: [2, 1.5, 3.5],
};

/** Camera mover — smoothly transitions camera when model type changes */
const CameraController = ({ target }: { target: [number, number, number] }) => {
  const vec = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ camera }) => {
    vec.set(...target);
    camera.position.lerp(vec, 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
};

/**
 * A single persistent Canvas that renders whichever model is active.
 * Only ONE WebGL context is created for the entire Industries section.
 */
const IndustryCanvas = ({ type }: { type: IndustryType }) => {
  const ModelComponent = modelMap[type];
  const cam = cameraMap[type];

  return (
    <div className="w-full h-full" style={{ minHeight: "192px" }}>
      <Canvas
        camera={{ position: cam, fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power", failIfMajorPerformanceCaveat: false }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
        frameloop="always"
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[4, 4, 4]} intensity={1.2} />
          <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#0688AD" />
          <pointLight position={[0, -1, 3]} intensity={0.5} color="#0688AD" />
          <CameraController target={cam} />
          <ModelComponent />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default IndustryCanvas;
