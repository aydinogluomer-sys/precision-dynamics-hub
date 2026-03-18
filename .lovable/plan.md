# Animation Roadmap — Final Implementation Plan

10 files (2 new, 8 edits). All changes use Framer Motion + existing patterns. All hooks called unconditionally at component top level.

---

## 1. HeroSection.tsx — Video BG + Layered Parallax + 3D Mouse Perspective

**Video background**: Replace `<img src={heroBg}>` with `<video>` using `cnc-factory-zoom.mp4`, `poster={heroBg}`, `muted autoPlay loop playsInline`. Keep eager loading via poster.

**Layered parallax**: Split existing single `bgY` into 3 layers with different speeds:

- Video layer (z-0): `useTransform(scrollY, [0,800], [0, 160])` — 0.2x
- Grid overlay (z-1): `useTransform(scrollY, [0,800], [0, 400])` — 0.5x  
- Content (z-10): existing position, no transform needed (moves with page = 1x)

**3D mouse perspective**: Add `mouseX`/`mouseY` as `useMotionValue(0)`, derive `rotateX`/`rotateY` via `useTransform` + `useSpring(stiffness:150, damping:20)`. Max ±3deg tilt. Apply to content wrapper `motion.div` with `transformPerspective: 1200`. `onMouseMove` normalizes cursor to [-0.5, 0.5]. `onMouseLeave` resets to 0. Mobile: no-op (mouse events don't fire).

---

## 2. HowWeWorkSection.tsx — Horizontal Scroll Timeline

**Hook-safe approach**: All hooks at top level. `isMobile` only changes output ranges.

```
sectionRef → useScroll({ target, offset: ["start start", "end end"] })
rawX = useTransform(scrollYProgress, [0,1], isMobile ? ["0%","0%"] : ["0%","-75%"])
x = useSpring(rawX, { stiffness: 200, damping: 40 })
progressWidth = useTransform(scrollYProgress, [0,1], ["0%","100%"])
```

**Layout**: Outer div `ref={sectionRef}` with `lg:h-[400vh] h-auto`. Inner sticky `lg:sticky lg:top-0 lg:h-screen`. Progress bar `hidden lg:block` width driven by `progressWidth`. Steps container `lg:flex-row flex-col` with `style={{ x }}`. Each step `lg:w-screen lg:shrink-0`.

**Mobile**: Steps stack vertically as current. Existing IO-based `activeStep` preserved. Progress bar hidden. No sticky, no horizontal motion.

Remove current `grid lg:grid-cols-2` split layout entirely.

---

## 3. CapabilitiesSection.tsx — Split Screen + MagneticButton

**Split screen**: Replace single-column table with `lg:grid-cols-2`. Left column: `lg:sticky lg:top-28 lg:h-[calc(100vh-7rem)]` with section header + large animated tolerance stat (±0.001mm with CountUp pattern from HeroSection). Right column: equipment rows scroll naturally with `whileInView` stagger (0.05s delay per row).

**MagneticButton CTA**: Import existing `MagneticButton` from `@/components/MagneticButton`. Wrap "Teknik Kapasiteyi İncele" link with it.

---

## 4. IndustryStackCard.tsx (NEW) + IndustriesSection.tsx

**IndustryStackCard.tsx**: New component receiving `industry`, `index`, `total`, `scrollYProgress`, `isMobile` props. Hooks at top level:

- `y = useTransform(scrollYProgress, [start, end], ["0%", "-100%"])`
- `scale = useTransform(scrollYProgress, [start, end], [1, 0.92])`
- `opacity = useTransform(scrollYProgress, [start, end], [1, 0])`
- 3D tilt: `rotateX`/`rotateY` via `useMotionValue` + `useSpring(stiffness:200, damping:20)`, ±8deg max on `onMouseMove`, reset on leave.
- Renders existing `IndustryCard` content (image/canvas toggle, details).

**IndustriesSection.tsx**: Desktop (lg+): Tall sticky container `h-[${total*100}vh]` with `useScroll`, renders `<IndustryStackCard>` components. Mobile: Keep current horizontal scroll layout unchanged.

---

## 5. ServicesSection.tsx — IO Active State + ClipPath Mask

**No useTransform per card**. Existing IO pattern already sets `activeIndex`. Add visual differentiation:

- Active card: `scale(1)`, `opacity: 1` via CSS transition `0.4s ease`
- Passive: `scale(0.95)`, `opacity: 0.7`

**ClipPath image reveal**: Wrap `BlurImage` in `motion.div` with `initial={{ clipPath: "inset(100% 0 0 0)" }}`, `whileInView={{ clipPath: "inset(0% 0 0 0)" }}`, `viewport={{ once: true }}`, `transition={{ duration: 0.6, ease: "easeOut" }}`. Alternate direction for even indices.

**Text stagger**: Title, description, link each get `whileInView` with incremental 0.1s delay.

---

## 6. MaterialsSection.tsx — 3D Flip Cards (Desktop)

**CSS-based 3D flip** on `DesktopMaterialCard` hover (better perf than Framer Motion for this):

- Card wrapper: `perspective: 1000px`
- Inner: `transform-style: preserve-3d`, `transition: transform 0.7s cubic-bezier(0.76,0,0.24,1)`
- Hover: `rotateY(180deg)`
- Front face: current content with `backface-visibility: hidden`
- Back face: specs table, `transform: rotateY(180deg)`, `backface-visibility: hidden`

Mobile cards unchanged (tap flip already works).

---

## 7. StatsSection.tsx — Stagger Reveal

Add `whileInView` with stagger delay `0.15 * index` to each `StatCard`. The existing CountUp IO logic is preserved — stagger only affects the card container entrance.

---

## 8. ParallaxSection.tsx — New Variants

Add to `TransitionVariant` type: `"wipe-mask" | "color-fade" | "depth-3d"`.

- **wipe-mask:** `clipPath` **from** `inset(0 0 100% 0)` **to** `inset(0 0 0% 0)` **on scroll**
- **color-fade**: Same as stack but faster opacity fade `[1, 0.8, 0]`
- **depth-3d**: Scale `[1, 0.8]` with `translateZ` feel via perspective origin shift

---

## 9. Index.tsx — Variant Assignments

Update `ParallaxSection` variant props:

- Hero → HowWeWork: keep `zoom-out-blur`
- HowWeWork → Certifications: `slide-up`
- Services: `wipe-mask`
- Industries → Materials: `color-fade`
- Capabilities: `depth-3d`

---

## File Summary


| #   | File                                     | Status  |
| --- | ---------------------------------------- | ------- |
| 1   | `src/components/HeroSection.tsx`         | Edit    |
| 2   | `src/components/HowWeWorkSection.tsx`    | Edit    |
| 3   | `src/components/CapabilitiesSection.tsx` | Edit    |
| 4   | `src/components/IndustryStackCard.tsx`   | **New** |
| 5   | `src/components/IndustriesSection.tsx`   | Edit    |
| 6   | `src/components/ServicesSection.tsx`     | Edit    |
| 7   | `src/components/MaterialsSection.tsx`    | Edit    |
| 8   | `src/components/StatsSection.tsx`        | Edit    |
| 9   | `src/components/ParallaxSection.tsx`     | Edit    |
| 10  | `src/pages/Index.tsx`                    | Edit    |
