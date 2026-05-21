# Dependency Policy — Mas Technic Precision Dynamics Hub

## Temel Kural

**Yeni npm paketi ekleme yasak.** Animasyon (GSAP, Framer Motion, Lenis), 3D (Three.js, R3F, Drei), UI (shadcn/Radix), backend (Supabase) zaten mevcut. İhtiyaç mevcutten karşılanamıyorsa sadece kullanıcı onayıyla eklenebilir.

## Onaylı Paketler (package.json, 2026-05-21)

### Runtime — Animasyon / Görsel
| Paket | Versiyon | Kullanım |
|-------|---------|---------|
| `gsap` | ^3.14.2 | ScrollTrigger, SplitText, timeline |
| `framer-motion` | ^12.34.0 | Component enter/exit, MotionValue |
| `lenis` | ^1.3.19 | Smooth scroll, GSAP ticker entegrasyonu |
| `three` | ^0.170.0 | WebGL 3D |
| `@react-three/fiber` | ^8.18.0 | R3F React bridge |
| `@react-three/drei` | ^9.122.0 | R3F helpers |

### Runtime — UI / Form
| Paket | Kullanım |
|-------|---------|
| `@radix-ui/*` (20+ paket) | shadcn/ui primitives |
| `react-hook-form` | Form management |
| `@hookform/resolvers` | Zod validation |
| `zod` | Schema validation |
| `embla-carousel-react` | Carousel |
| `cmdk` | Command palette |
| `sonner` | Toast notifications |
| `vaul` | Drawer |

### Runtime — Backend / Data
| Paket | Kullanım |
|-------|---------|
| `@supabase/supabase-js` | ^2.95.3 — auth, DB, storage, realtime |
| `@tanstack/react-query` | ^5.83.0 — server state |
| `react-router-dom` | ^6.30.1 — CSR routing |
| `date-fns` | Date formatting |
| `xlsx-js-style` | Excel export (admin) |

### DevDependencies — Test / Build
| Paket | Kullanım |
|-------|---------|
| `vite` + `@vitejs/plugin-react-swc` | Build |
| `typescript` | ^5.8.3 |
| `tailwindcss` | ^3.4.17 |
| `vitest` | Unit test runner |
| `@testing-library/react` | Component test |
| `puppeteer` | E2E / screenshot test |
| `eslint` + plugins | Linting |

## Yasak Paketler

| Paket | Neden |
|-------|-------|
| `next` / `remix` | SSR yok — CSR-only |
| `styled-components` / `emotion` | CSS-in-JS — Tailwind kullan |
| `redux` / `zustand` / `jotai` | Global store gereksiz |
| `axios` | Supabase client yeterli |
| `lodash` | Native JS / tree-shaking sorunlu |
| `moment` | `date-fns` var |
| `jquery` | Yasak |
| `gsap@2.x` | v3 kullan |

## Paket Güncelleme Kuralı

- **Patch** (0.0.x): otomatik güncel — CI'da `npm audit` çalışır
- **Minor** (0.x.0): test sonrası merge — breaking change riski az
- **Major** (x.0.0): kullanıcı onayı gerekli — özellikle GSAP, Three.js, Framer Motion
