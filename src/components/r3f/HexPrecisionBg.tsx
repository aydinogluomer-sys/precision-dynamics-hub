/**
 * HexPrecisionBg.tsx — Raw WebGL hexagonal grid background.
 * forge-teal grid lines on transparent bg, slow drift animation.
 * IO-based pause: stops rAF when not in viewport.
 */
import { useRef, useEffect } from "react";

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform float uOpacity;

float hexDist(vec2 p) {
  p = abs(p);
  // hexagonal SDF — returns 0 at center, 1 at edge of unit hex
  return max(p.x * 0.866025 + p.y * 0.5, p.y);
}

vec2 hexCoord(vec2 p, float scale) {
  p *= scale;
  // Axial hex grid mapping
  float q = p.x * 1.1547;
  float r = p.y + p.x * 0.5773;
  vec2 pi = floor(vec2(q, r));
  vec2 pf = fract(vec2(q, r)) - 0.5;
  return vec2(hexDist(pf), fract(dot(pi, vec2(7.23, 13.47))));
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  uv.y = 1.0 - uv.y;

  // Slow drift
  vec2 st = uv;
  st.x += uTime * 0.025;
  st.y += uTime * 0.012;

  // Hex grid at two scales for depth
  vec2 h1 = hexCoord(st, 9.0);
  vec2 h2 = hexCoord(st * 1.0 + vec2(0.5), 4.5);

  // Grid edge glow — thin crisp line at hex border
  float edge1 = smoothstep(0.47, 0.485, h1.x) * smoothstep(0.50, 0.485, h1.x);
  float edge2 = smoothstep(0.47, 0.485, h2.x) * smoothstep(0.50, 0.485, h2.x) * 0.4;
  float edge = clamp(edge1 + edge2, 0.0, 1.0);

  // Pulse: slow brightness variation per hex cell
  float pulse = sin(h1.y * 6.28318 + uTime * 0.4) * 0.5 + 0.5;
  edge *= 0.7 + pulse * 0.3;

  // forge-teal: #0a7e8c → vec3(0.039, 0.494, 0.549)
  vec3 col = vec3(0.039, 0.494, 0.549);

  gl_FragColor = vec4(col, edge * uOpacity);
}
`;

interface HexPrecisionBgProps {
  opacity?: number;
  className?: string;
}

export const HexPrecisionBg = ({ opacity = 0.12, className = "" }: HexPrecisionBgProps) => {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);
  const animIdRef    = useRef(0);
  const glRef        = useRef<WebGLRenderingContext | null>(null);
  const uRef         = useRef<Record<string, WebGLUniformLocation | null>>({});
  const opacityRef   = useRef(opacity);
  opacityRef.current = opacity;

  // IO pause
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext("webgl2") as WebGLRenderingContext | null) ||
      canvas.getContext("webgl");
    if (!gl) return;
    glRef.current = gl;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    uRef.current = {
      uTime:       gl.getUniformLocation(prog, "uTime"),
      uResolution: gl.getUniformLocation(prog, "uResolution"),
      uOpacity:    gl.getUniformLocation(prog, "uOpacity"),
    };

    const resize = () => {
      const dpr  = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const frame = (ts: number) => {
      animIdRef.current = requestAnimationFrame(frame);
      if (!isVisibleRef.current) return;
      const u = uRef.current;
      gl.uniform1f(u.uTime,       ts * 0.001);
      gl.uniform2f(u.uResolution, canvas.width, canvas.height);
      gl.uniform1f(u.uOpacity,    opacityRef.current);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    animIdRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animIdRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none ${className}`}
      style={{ width: "100%", height: "100%" }}
    >
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
};
