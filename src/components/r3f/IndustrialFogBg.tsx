/**
 * IndustrialFogBg.tsx — R3F FBM domain warp fog shader
 * Industrial smoke/fog for dark section backgrounds.
 * Colors: forge-gunmetal base, forge-teal highlights, forge-molten accent.
 */
import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uIntensity;
  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i),              hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p, int oct) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 6; i++) {
      if (i >= oct) break;
      v += a * noise(p);
      p = p * 2.1 + vec2(1.3, 0.7);
      a *= 0.5;
    }
    return v;
  }

  // forge-gunmetal #2d333b → vec3(0.176, 0.200, 0.231)
  // forge-teal     #0a7e8c → vec3(0.039, 0.494, 0.549)
  // forge-molten   #e8610a → vec3(0.910, 0.380, 0.039)
  vec3 industrialPalette(float t) {
    vec3 base   = vec3(0.176, 0.200, 0.231);
    vec3 teal   = vec3(0.039, 0.494, 0.549);
    vec3 molten = vec3(0.910, 0.380, 0.039);
    vec3 col;
    if (t < 0.5) {
      col = mix(base, base * 0.6 + teal * 0.4, t * 2.0);
    } else {
      col = mix(base * 0.6 + teal * 0.4, base + molten * 0.1, (t - 0.5) * 2.0);
    }
    return col;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.055;

    // Domain warp (Inigo Quilez FBM pattern)
    vec2 q = vec2(
      fbm(uv * 2.0 + vec2(t * 0.15, t * 0.10), 5),
      fbm(uv * 2.0 + vec2(1.7, 9.2) + vec2(t * 0.12, -t * 0.08), 5)
    );
    vec2 r = vec2(
      fbm(uv * 1.8 + 3.5 * q + vec2(1.7, 9.2) + t * 0.09, 5),
      fbm(uv * 1.8 + 3.5 * q + vec2(8.3, 2.8) + t * 0.07, 5)
    );
    float f = fbm(uv * 1.5 + 3.0 * r, 5);
    f = smoothstep(0.0, 1.0, f);

    vec3 col = industrialPalette(f);

    // Vignette — darken edges
    vec2 vig = uv - 0.5;
    float vignette = 1.0 - dot(vig, vig) * 1.6;
    col *= clamp(vignette, 0.0, 1.0);

    // Film grain
    float grain = hash(uv + vec2(uTime * 0.007)) * 0.018 - 0.009;
    col += grain;

    // Alpha: semi-transparent fog overlay, keeps text readable
    float alpha = clamp(f * 0.40 + 0.12, 0.0, 0.50) * uIntensity;

    gl_FragColor = vec4(clamp(col, 0.0, 1.0), alpha);
  }
`;

export const IndustrialFogBg = ({ intensity = 1.0 }: { intensity?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime:       { value: 0 },
      uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
      uIntensity:  { value: intensity },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value      += delta;
    mat.uniforms.uIntensity.value  = intensity;
    mat.uniforms.uResolution.value.set(viewport.width, viewport.height);
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
};
