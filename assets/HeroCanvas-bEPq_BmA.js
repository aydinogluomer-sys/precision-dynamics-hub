import{u as S,r as o,l as _,m as M,j as t,C as R}from"./vendor-fiber-B-_QXMQA.js";import{a3 as T,V as d}from"./vendor-three-C_x4mMja.js";import{ad as j}from"./index-Ds_bgTk9.js";import"./vendor-recharts-B9Su_GTM.js";import"./vendor-framer-DlYfju0N.js";import"./vendor-gsap-D7WUu43W.js";function H(n){return S(T,n)}const C=`
  uniform float uTime;
  uniform float uScrollY;
  uniform vec2 uMouse;
  uniform float uHover;
  varying vec2 vUv;
  varying vec3 vPos;

  // simplex 3d noise
  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x2_ = x_ * ns.x + ns.yyyy;
    vec4 y2_ = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x2_) - abs(y2_);
    vec4 b0 = vec4(x2_.xy, y2_.xy);
    vec4 b1 = vec4(x2_.zw, y2_.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vUv = uv;

    vec3 pos = position;

    // Liquid distortion near mouse
    float dist = distance(uv, uMouse);
    float wave = snoise(vec3(uv * 3.0, uTime * 0.4)) * 0.06 * uHover;
    float mousePush = smoothstep(0.5, 0.0, dist) * 0.12 * uHover;
    pos.z += wave + mousePush;

    // Scroll parallax
    pos.y += uScrollY * 0.15;

    vPos = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`,P=`
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uRGBShift;
  uniform float uHover;
  uniform vec2 uMouse;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    // Subtle organic warp
    float warp = sin(uv.y * 8.0 + uTime * 0.3) * 0.003 * uHover;
    uv.x += warp;

    // RGB shift (chromatic aberration) based on mouse speed
    float shift = uRGBShift * 0.008;
    float r = texture2D(uTexture, uv + vec2(shift, 0.0)).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - vec2(shift, 0.0)).b;

    vec4 color = vec4(r, g, b, 1.0);

    // Vignette
    float vig = 1.0 - smoothstep(0.4, 1.4, length(vUv - 0.5) * 1.6);
    color.rgb *= mix(0.7, 1.0, vig);

    // Brightness / contrast
    color.rgb = color.rgb * 0.85 + 0.02;

    color.a *= uOpacity;
    gl_FragColor = color;
  }
`,B=({src:n,scale:c,opacity:v=1})=>{const s=o.useRef(null),{viewport:e,size:p}=_(),i=H(n),a=i.image?i.image.width/i.image.height:16/9,y=e.width/e.height,h=o.useMemo(()=>c||(y>a?[e.width,e.width/a,1]:[e.height*a,e.height,1]),[e.width,e.height,a,y,c]),g=o.useMemo(()=>({uTexture:{value:i},uTime:{value:0},uMouse:{value:new d(.5,.5)},uHover:{value:0},uRGBShift:{value:0},uScrollY:{value:0},uOpacity:{value:v}}),[i]),l=o.useRef(new d(.5,.5)),m=o.useRef(0),f=o.useRef(!1),w=o.useCallback(u=>{if(u.uv){const x=u.uv.x-l.current.x,r=u.uv.y-l.current.y;m.current=Math.sqrt(x*x+r*r),l.current.set(u.uv.x,u.uv.y)}},[]);return M((u,x)=>{if(!s.current)return;const r=s.current.material;r.uniforms.uTime.value+=x,r.uniforms.uMouse.value.lerp(l.current,.08);const z=f.current?1:0;r.uniforms.uHover.value+=(z-r.uniforms.uHover.value)*.06,r.uniforms.uRGBShift.value+=(m.current*12-r.uniforms.uRGBShift.value)*.1,m.current*=.92;const b=window.scrollY/window.innerHeight;r.uniforms.uScrollY.value+=(b*.5-r.uniforms.uScrollY.value)*.05}),t.jsxs("mesh",{ref:s,scale:h,onPointerMove:w,onPointerEnter:()=>{f.current=!0},onPointerLeave:()=>{f.current=!1},children:[t.jsx("planeGeometry",{args:[1,1,64,64]}),t.jsx("shaderMaterial",{vertexShader:C,fragmentShader:P,uniforms:g,transparent:!0})]})},I=()=>{const[n,c]=o.useState(!1),v=o.useRef(null);return o.useEffect(()=>{const s=v.current;if(!s)return;const e=new IntersectionObserver(([p])=>c(p.isIntersecting),{rootMargin:"200px"});return e.observe(s),()=>e.disconnect()},[]),t.jsx("div",{ref:v,className:"absolute inset-0 z-0",style:{pointerEvents:"auto"},children:n?t.jsx(R,{dpr:[1,1.5],gl:{antialias:!1,alpha:!0,powerPreference:"high-performance"},camera:{position:[0,0,5],fov:50},style:{background:"transparent"},children:t.jsx(o.Suspense,{fallback:null,children:t.jsx(B,{src:j,opacity:.25})})}):null})};export{I as HeroCanvas};
