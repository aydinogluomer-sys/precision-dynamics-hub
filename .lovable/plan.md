

# Awwwards UI/UX — Full Implementation Plan

All 4 sprints, 17 files (3 new, 14 edits). Everything reviewed and ready.

---

## Sprint 1: Hero & Micro-Interactions

### 1. `src/components/CursorFollower.tsx` (NEW)
- `useMotionValue` + `useSpring(stiffness:400, damping:30)` for smooth mouse follow
- 8px teal dot with `backdropFilter: "invert(0.8)"` (NOT `mix-blend-mode: difference`)
- Link/button hover: scale 3x via MutationObserver for dynamic elements
- `pointer: coarse` check returns `null` on mobile
- No text nodes inside motion components (stability standard)

### 2. `src/components/HeroSection.tsx` (EDIT — 3 changes)
**a) Headline character stagger (lines 148-163):**
- Replace CSS transition approach with `AnimatePresence mode="wait"`
- `headline.split(" ").slice(0, 2)` → split to chars, each as `motion.span`
- Entry: `y: "-100%"` → `0`, exit: `y: 0` → `"100%"`, stagger 0.02s
- Remaining words (3+) render as simple fade `motion.div`
- All text wrapped in `<span>` tags, spaces as `\u00A0`

**b) Stats CountUp (lines 312-334):**
- `±0.005` and `48h` stay static
- `50+` gets CountUp via `useInView({ triggerOnce: true, threshold: 0.3 })` + `requestAnimationFrame` (same pattern as StatsSection lines 18-38)

**c) Page load orchestration:**
- Accept `isFirstVisit?: boolean` prop
- When true: container gets `transition.delay: 0.3` (waits for header)
- When false: `initial={false}` — no animation delay

### 3. `src/components/Header.tsx` (EDIT — line 230, 302-312)
- Accept `isFirstVisit?: boolean` prop (default `false`)
- `motion.div` gets `initial={isFirstVisit ? { y: -70, opacity: 0 } : false}`
- Animate: `{ y: 0, opacity: 1 }` with duration 0.5

### 4. `src/pages/Index.tsx` (EDIT — lines 34-43)
- Add `isFirstVisit` state via `useState(() => !sessionStorage.getItem("mas_visited"))`
- `useEffect` sets `sessionStorage.setItem("mas_visited", "1")` on first visit
- Pass `isFirstVisit` prop to both `<Header>` and `<HeroSection>`

### 5. `src/App.tsx` (EDIT — line 97)
- Import `CursorFollower`
- Add `<CursorFollower />` inside `<QueryClientProvider>`, outside `<BrowserRouter>`

---

## Sprint 2: Scroll & Section Transitions

### 6. `src/components/ServicesSection.tsx` (EDIT)
- Add 2 more services: Lazer Kesim (`service-lazer.jpg`) + Kalıp (`service-kalip.jpg`) — imports already exist
- Convert 3-column grid → `overflow-x: auto`, `scroll-snap-type: x mandatory`
- Each card: `scroll-snap-align: start`, `min-w-[380px]`
- Desktop dot indicator: track active card via IntersectionObserver
- Hover pattern: outer `motion.div whileHover={{ scale: 1.05 }}`, inner `div.overflow-hidden` contains `BlurImage`

### 7. `src/components/CertificationsSection.tsx` (EDIT — full rewrite)
- Remove `min-h-screen`, set `py-6`
- Remove all Framer Motion — pure CSS marquee
- `@keyframes marquee { from { translateX(0) } to { translateX(-50%) } }` 30s linear infinite
- Content rendered 2x: `[...certs, ...certs].map(...)` with `·` separators
- JetBrains Mono, `text-2xl`, `opacity-40`, `uppercase`, `letter-spacing: 0.15em`
- Hover: `animation-play-state: paused`

### 8. `src/components/WhyUsSection.tsx` (EDIT — lines 112-140)
- Add `useRef`, `useScroll`, `useTransform` from framer-motion
- Main image: `clipPath = useTransform(scrollYProgress, [0,1], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"])`
- Small overlapping image: `scale = useTransform(scrollYProgress, [0,1], [0.85, 1])`
- Section gets `ref={sectionRef}`, offset `["start end", "center center"]`
- BlurImage already integrated — just wrap in `motion.div` with style props

---

## Sprint 3: Typography & Details

### 9. `src/components/SectionHeader.tsx` (NEW)
- Props: `tag`, `title`, `description?`, `align?` ("center" | "left"), `titleClassName?`
- Pattern: `w-8 h-px bg-primary` line + tag in mono uppercase + title + optional description

### 10. `src/components/HowWeWorkSection.tsx` (EDIT — lines 109-121)
- Replace heading block with `<SectionHeader tag="Metodoloji" title="Hassas Üretim İş Akışımız" description="Teknik veriden son kalite onayına kadar uçtan uca endüstriyel sürecimiz" />`

### 11. `src/components/StatsSection.tsx` (EDIT — lines 92-96)
- Replace `TextReveal` heading with `<SectionHeader tag="Rakamlar" title="Rakamlarla Mas Technic" align="center" titleClassName="text-3xl md:text-4xl font-bold text-white" />`

### 12. `src/components/FAQBlogSection.tsx` (EDIT — 3 changes)
**a) SSS heading (lines 73-81):** Replace with `<SectionHeader tag="SSS" title="Sıkça Sorulan Sorular" />`
**b) Blog heading (lines 119-127):** Replace with `<SectionHeader tag="Blog" title="Teknik İçerikler" />`
**c) Accordion animation (lines 97-101):**
- Wrap in `<AnimatePresence>` + `<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden" }}>`
- ChevronDown: `<motion.span animate={{ rotate: openIndex === index ? 180 : 0 }}>`

### 13. `src/components/FinalCTASection.tsx` (EDIT — line 89)
- "Kritik" kelimesine gradient span:
```
Bir Sonraki{" "}
<span style={{ background: "linear-gradient(90deg, hsl(var(--forge-molten)), hsl(var(--forge-amber)))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Kritik</span>
{" "}Projenize
```

---

## Sprint 4: Performance & Polish

### 14. BlurImage — Already Done ✅
`BlurImage.tsx` created and integrated in previous message.

### 15. `src/components/Footer.tsx` (EDIT — line 96)
- Add `sticky bottom-0 z-0` to `<footer>` className

### 16. `src/pages/Index.tsx` (EDIT — additional)
- FinalCTASection's `ParallaxSection` wrapper (line 126): add `className="relative z-10"`
- Entire `<main>` tag: add `relative z-10` to ensure content layers above footer

---

## File Summary

| # | File | Status | Changes |
|---|------|--------|---------|
| 1 | `CursorFollower.tsx` | NEW | Mouse follower component |
| 2 | `SectionHeader.tsx` | NEW | Reusable section heading |
| 3 | `HeroSection.tsx` | EDIT | Char stagger + CountUp + isFirstVisit |
| 4 | `Header.tsx` | EDIT | isFirstVisit slide-down |
| 5 | `Index.tsx` | EDIT | Orchestration state + footer z-index |
| 6 | `App.tsx` | EDIT | Add CursorFollower |
| 7 | `ServicesSection.tsx` | EDIT | Horizontal scroll + 2 new cards |
| 8 | `CertificationsSection.tsx` | EDIT | CSS marquee |
| 9 | `WhyUsSection.tsx` | EDIT | Scroll clipPath reveal |
| 10 | `HowWeWorkSection.tsx` | EDIT | SectionHeader |
| 11 | `StatsSection.tsx` | EDIT | SectionHeader |
| 12 | `FAQBlogSection.tsx` | EDIT | SectionHeader + accordion anim |
| 13 | `FinalCTASection.tsx` | EDIT | Gradient text |
| 14 | `Footer.tsx` | EDIT | Sticky z-0 |

BlurImage + MaterialsSection + IndustriesSection already done in previous message.

