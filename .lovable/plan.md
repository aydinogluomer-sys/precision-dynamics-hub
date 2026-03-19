

# Animation Audit Report

## Methodology
Code analysis of all 15+ animated sections on the landing page, cross-referenced with console error logs, session replay data, and browser screenshots.

---

## BROKEN / PROBLEMATIC Animations

### 1. Hero Headline Character Stagger — BROKEN (Word-wrap issue)
- **File:** `HeroSection.tsx`, `HeadlineStagger` component
- **Problem:** The headline "Profesyonel CNC" renders as "PROFESYONEL C" on line 1 and "NC" on line 2 (confirmed in browser screenshot). The character-by-character `<motion.span>` elements each have `display: inline-block`, causing individual characters to wrap mid-word when the container is narrow.
- **Root Cause:** Each character is an independent `inline-block` element. When the container can't fit all characters on one line, the browser wraps at any character boundary rather than at word boundaries.
- **Fix:** Add `white-space: nowrap` to the outer `<span>` wrapping each word, or group characters by word into non-breaking `<span>` containers.

### 2. IndustryStackCard 3D Models — BROKEN (forwardRef + WebGL crash)
- **File:** `IndustryModels.tsx`, `IndustryStackCard.tsx`
- **Console Errors:**
  - `"Function components cannot be given refs"` for `IndustryCanvas` and `PistonModel`
  - `"THREE.WebGLRenderer: Context Lost"` — WebGL context crashes
- **Problem:** The 3D model components are not wrapped with `React.forwardRef()`, causing ref-passing failures. Additionally, rendering 13 industry cards each potentially spawning a WebGL canvas causes GPU context exhaustion.
- **Fix:** Wrap model components with `forwardRef`. Consider lazy-loading canvases only for the active card, or limit concurrent WebGL contexts.

### 3. HowWeWorkSection Horizontal Scroll — PARTIALLY BROKEN
- **File:** `HowWeWorkSection.tsx`
- **Problem:** The `x` transform goes from `"60%"` to `"0%"`, but 60% is the percentage of the **element's own width** (4 cards at ~280px each = ~1120px). Starting at 60% means an initial offset of ~670px, making the first 1-2 cards fully off-screen to the right. As user scrolls, cards slide left. However, the `scrollYProgress` maps `[0, 0.8]` to this range, meaning the animation completes at 80% scroll — the remaining 20% of 300vh (60vh = ~460px of scrolling) does nothing, which feels like a "dead zone."
- **Additionally:** No mobile fallback exists. On mobile, the `min-w-[280px]` cards overflow horizontally with no scroll mechanism.
- **Fix:** Adjust the x range to properly accommodate the strip width relative to viewport. Add a mobile layout (vertical stack or horizontal scroll).

---

## WORKING Animations (Verified)

| # | Section | Animation Type | Status |
|---|---------|---------------|--------|
| 1 | **Hero** parallax layers | 3-layer parallax (video 0.2x, grid 0.5x, overlay) | OK |
| 2 | **Hero** 3D mouse perspective | ±3° rotateX/Y with spring | OK |
| 3 | **Hero** CAD Drop Zone | Scanning line, pulsing upload icon, dashed border | OK |
| 4 | **Hero** CountUp stats | IntersectionObserver + requestAnimationFrame | OK |
| 5 | **NexusPromoSection** | TextReveal, stagger container/items | OK |
| 6 | **CertificationsSection** | CSS `@keyframes marquee` infinite scroll | OK |
| 7 | **VideoScrollSection** | Scroll-driven zoom (1x→2.5x), exit overlay fade | OK |
| 8 | **ServicesSection** | Scroll-reveal cards (code analysis confirms) | OK |
| 9 | **MaterialsSection** | Tab switch animation | OK |
| 10 | **WhyUsSection** | `clipPath` reveal + image scale (0.85→1) | OK |
| 11 | **CapabilitiesSection** | Split-screen parallax, tolerance CountUp | OK |
| 12 | **StatsSection** | Per-card CountUp with IntersectionObserver | OK |
| 13 | **TestimonialsSection** | 3-column infinite vertical scroll (15s/19s/17s) | OK |
| 14 | **FAQBlogSection** | Accordion AnimatePresence expand/collapse | OK |
| 15 | **FinalCTASection** | Clip-path sweep on hover (enter/leave) | OK |
| 16 | **LogoLoop** | CSS marquee brand logos | OK |

---

## DEAD CODE (Not broken, but unused)
- **`StickyIntroReveal.tsx`** — Fully implemented scroll-reveal component (300vh, text reveal, badge, CTA). Not imported or rendered anywhere in `Index.tsx`. Can be safely deleted or re-integrated.

---

## Summary of Required Fixes

1. **Hero HeadlineStagger** — Wrap characters per-word in `nowrap` containers to prevent mid-word line breaks
2. **IndustryModels** — Add `forwardRef` to `IndustryCanvas` and child model components; limit concurrent WebGL contexts
3. **HowWeWorkSection** — Fix x-range calculation, eliminate dead scroll zone, add mobile responsive layout
4. **Cleanup** — Remove or re-use `StickyIntroReveal.tsx`

