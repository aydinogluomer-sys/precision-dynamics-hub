/**
 * MotionGradientBg.tsx — WebGL shader-based animated gradient background
 * Modes: Flow (0), Pulse (1), Vortex (2), Aurora (3)
 * Blue-black color ramp with temperature slider support.
 */
import { useRef, useEffect, useCallback } from "react";

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_mode;
uniform float u_temp;

#define PI 3.14159265
#define TAU 6.28318530

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
    mix(hash(i + vec2(0,0)), hash(i + vec2(1,0)), u.x),
    mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
    u.y
  );
}

float fbm(vec2 p, int oct) {
  float v = 0.0, a = 0.5;
  for(int i = 0; i < 8; i++) {
    if(i >= oct) break;
    v += a * noise(p);
    p = p * 2.1 + vec2(1.3, 0.7);
    a *= 0.5;
  }
  return v;
}

vec3 blueBlack(float t) {
  vec3 black     = vec3(0.0,  0.0,  0.02);
  vec3 deepBlue  = vec3(0.03, 0.08, 0.25);
  vec3 midBlue   = vec3(0.06, 0.18, 0.55);
  vec3 brightBlue= vec3(0.15, 0.45, 0.95);
  vec3 iceBlue   = vec3(0.55, 0.80, 1.0);

  vec3 neutral;
  if(t < 0.25) neutral = mix(black, deepBlue, t * 4.0);
  else if(t < 0.5) neutral = mix(deepBlue, midBlue, (t - 0.25) * 4.0);
  else if(t < 0.75) neutral = mix(midBlue, brightBlue, (t - 0.5) * 4.0);
  else neutral = mix(brightBlue, iceBlue, (t - 0.75) * 4.0);

  vec3 cBlack = vec3(0.02, 0.0, 0.08);
  vec3 cDeep  = vec3(0.07, 0.02, 0.30);
  vec3 cMid   = vec3(0.12, 0.05, 0.60);
  vec3 cBright= vec3(0.25, 0.15, 0.90);
  vec3 cIce   = vec3(0.50, 0.50, 1.0);

  vec3 cold;
  if(t < 0.25) cold = mix(cBlack, cDeep, t * 4.0);
  else if(t < 0.5) cold = mix(cDeep, cMid, (t - 0.25) * 4.0);
  else if(t < 0.75) cold = mix(cMid, cBright, (t - 0.5) * 4.0);
  else cold = mix(cBright, cIce, (t - 0.75) * 4.0);

  vec3 wBlack  = vec3(0.0, 0.01, 0.04);
  vec3 wDeep   = vec3(0.02, 0.10, 0.28);
  vec3 wMid    = vec3(0.05, 0.30, 0.65);
  vec3 wBright = vec3(0.30, 0.65, 0.98);
  vec3 wIce    = vec3(0.82, 0.94, 1.0);

  vec3 warm;
  if(t < 0.25) warm = mix(wBlack, wDeep, t * 4.0);
  else if(t < 0.5) warm = mix(wDeep, wMid, (t - 0.25) * 4.0);
  else if(t < 0.75) warm = mix(wMid, wBright, (t - 0.5) * 4.0);
  else warm = mix(wBright, wIce, (t - 0.75) * 4.0);

  vec3 col;
  if(u_temp <= 0.5) {
    col = mix(cold, neutral, u_temp * 2.0);
  } else {
    col = mix(neutral, warm, (u_temp - 0.5) * 2.0);
  }
  return col;
}

vec3 modeFlow(vec2 uv, float t, vec2 mouse) {
  vec2 p = uv - 0.5;
  p += (mouse - 0.5) * 0.3;
  vec2 q = vec2(
    fbm(uv * 2.5 + vec2(t * 0.12, t * 0.08), 6),
    fbm(uv * 2.5 + vec2(1.7, 9.2) + vec2(t * 0.09, -t * 0.11), 6)
  );
  vec2 r = vec2(
    fbm(uv * 2.0 + 4.0 * q + vec2(1.7, 9.2) + t * 0.07, 6),
    fbm(uv * 2.0 + 4.0 * q + vec2(8.3, 2.8) + t * 0.06, 6)
  );
  float f = fbm(uv * 1.8 + 4.0 * r, 6);
  f = smoothstep(0.0, 1.0, f);
  float mouseInfluence = 1.0 - smoothstep(0.0, 0.5, length(uv - mouse));
  f = mix(f, f * 1.4, mouseInfluence * 0.5);
  return blueBlack(clamp(f, 0.0, 1.0));
}

vec3 modePulse(vec2 uv, float t, vec2 mouse) {
  vec2 p = uv - mouse;
  float d = length(p);
  float rings = 0.0;
  for(int i = 0; i < 5; i++) {
    float fi = float(i);
    float r = 0.15 + fi * 0.12;
    float speed = 0.4 + fi * 0.1;
    float phase = mod(t * speed + fi * 0.4, 1.2) / 1.2;
    float ring = exp(-pow((d - r * phase) * 18.0, 2.0));
    ring *= (1.0 - phase);
    rings += ring * (0.5 + fi * 0.1);
  }
  float base = fbm(uv * 3.0 + t * 0.05, 5) * 0.35;
  float core = exp(-d * d * 5.0) * 0.5;
  float v = clamp(base + rings * 0.7 + core, 0.0, 1.0);
  return blueBlack(v);
}

vec3 modeVortex(vec2 uv, float t, vec2 mouse) {
  vec2 p = uv - mouse;
  float d = length(p);
  float angle = atan(p.y, p.x);
  float spin = angle + d * 8.0 - t * 1.5;
  float v1 = sin(spin * 2.0) * 0.5 + 0.5;
  float v2 = cos(spin * 3.0 + d * 5.0) * 0.5 + 0.5;
  float swirl = fbm(vec2(cos(spin + t * 0.2), sin(spin + t * 0.15)) * 2.0 + d * 3.0, 5);
  float falloff = 1.0 - smoothstep(0.0, 0.65, d);
  float outer = fbm(uv * 2.0 - t * 0.04, 4) * 0.3;
  float v = mix(outer, (v1 * 0.3 + v2 * 0.3 + swirl * 0.4) * falloff + outer, falloff);
  v = clamp(v * 1.1, 0.0, 1.0);
  return blueBlack(v);
}

vec3 modeAurora(vec2 uv, float t, vec2 mouse) {
  float bands = 0.0;
  for(int i = 0; i < 6; i++) {
    float fi = float(i);
    float yOff = 0.3 + fi * 0.08;
    float wave = sin(uv.x * (3.0 + fi * 1.5) + t * (0.3 + fi * 0.1) + fi) * 0.06;
    wave += sin(uv.x * (6.0 + fi) - t * 0.2) * 0.03;
    float mouseWave = sin(uv.x * 4.0 + mouse.x * TAU) * (mouse.y - 0.5) * 0.1;
    float band = exp(-pow((uv.y - yOff - wave - mouseWave) * (10.0 + fi * 3.0), 2.0));
    float brightness = fbm(vec2(uv.x * 2.0 + fi * 3.3, t * 0.15 + fi), 4);
    bands += band * brightness * (0.8 - fi * 0.08);
  }
  float base = fbm(uv * 1.5 + t * 0.03, 4) * 0.15;
  float v = clamp(bands * 0.9 + base, 0.0, 1.0);
  vec3 col = blueBlack(v);
  float tint = fbm(uv * 3.0 + t * 0.08, 3);
  col = mix(col, col * vec3(0.4, 0.8, 1.2), tint * v * 0.3);
  return col;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  uv.y = 1.0 - uv.y;

  float m = u_mode;
  int m0 = int(floor(m));
  int m1 = int(ceil(m));
  float mb = fract(m);

  vec3 col0, col1;

  if(m0 == 0) col0 = modeFlow(uv, u_time, u_mouse);
  else if(m0 == 1) col0 = modePulse(uv, u_time, u_mouse);
  else if(m0 == 2) col0 = modeVortex(uv, u_time, u_mouse);
  else col0 = modeAurora(uv, u_time, u_mouse);

  if(m1 == 0) col1 = modeFlow(uv, u_time, u_mouse);
  else if(m1 == 1) col1 = modePulse(uv, u_time, u_mouse);
  else if(m1 == 2) col1 = modeVortex(uv, u_time, u_mouse);
  else col1 = modeAurora(uv, u_time, u_mouse);

  vec3 col = mix(col0, col1, smoothstep(0.0, 1.0, mb));

  vec2 vp = uv - 0.5;
  float vign = 1.0 - dot(vp, vp) * 1.4;
  col *= clamp(vign, 0.0, 1.0);

  float grain = hash(uv + vec2(u_time * 0.01)) * 0.025 - 0.012;
  col += grain;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

interface MotionGradientBgProps {
  mode?: number;
  temperature?: number;
  className?: string;
}

export const MotionGradientBg = ({
  mode = 0,
  temperature = 0.5,
  className = "",
}: MotionGradientBgProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const uniformsRef = useRef<Record<string, WebGLUniformLocation | null>>({});
  const stateRef = useRef({
    mouseX: 0.5,
    mouseY: 0.5,
    targetMX: 0.5,
    targetMY: 0.5,
    currentMode: 0,
    currentTemp: 0.5,
    animId: 0,
  });

  const initGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext("webgl2") as WebGLRenderingContext | null) ||
      canvas.getContext("webgl");
    if (!gl) return;
    glRef.current = gl;

    const compileShader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    programRef.current = prog;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    uniformsRef.current = {
      uTime: gl.getUniformLocation(prog, "u_time"),
      uRes: gl.getUniformLocation(prog, "u_res"),
      uMouse: gl.getUniformLocation(prog, "u_mouse"),
      uMode: gl.getUniformLocation(prog, "u_mode"),
      uTemp: gl.getUniformLocation(prog, "u_temp"),
    };
  }, []);

  useEffect(() => {
    initGL();

    const canvas = canvasRef.current;
    const gl = glRef.current;
    if (!canvas || !gl) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      stateRef.current.targetMX = (e.clientX - rect.left) / rect.width;
      stateRef.current.targetMY =
        1.0 - (e.clientY - rect.top) / rect.height;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);

    const frame = (ts: number) => {
      const st = stateRef.current;
      const t = ts * 0.001;

      st.mouseX += (st.targetMX - st.mouseX) * 0.04;
      st.mouseY += (st.targetMY - st.mouseY) * 0.04;

      const u = uniformsRef.current;
      gl.uniform1f(u.uTime, t);
      gl.uniform2f(u.uRes, canvas.width, canvas.height);
      gl.uniform2f(u.uMouse, st.mouseX, st.mouseY);
      gl.uniform1f(u.uMode, st.currentMode);
      gl.uniform1f(u.uTemp, st.currentTemp);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      st.animId = requestAnimationFrame(frame);
    };

    stateRef.current.animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(stateRef.current.animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [initGL]);

  // Update mode/temp from props
  useEffect(() => {
    const st = stateRef.current;
    const tick = () => {
      if (Math.abs(st.currentMode - mode) > 0.005) {
        st.currentMode += (mode - st.currentMode) * 0.05;
      } else {
        st.currentMode = mode;
      }
      st.currentTemp += (temperature - st.currentTemp) * 0.06;
      requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [mode, temperature]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
};
