## Hero Section — Complete Redesign (Awwwards-Level + Industrial Refinements)

### CRITICAL RULES

- DO NOT touch any files under `/admin/*` or `/musteri-paneli/*`

- Only `lenis` is permitted as new npm package — no other external packages

- Keep IBM Plex Mono font, border-radius locked at `0rem`

- SVG fills require hardcoded hex values (no CSS variables in fill attributes)

---

### 1. REMOVE CTA Button

In `HeroSection.tsx`:

- Delete the entire `MagneticButton` block with `ArrowDown` icon (the "Hızlı Teklif Al" button)

- Clean up unused imports `MagneticButton`, `ArrowDown` from lucide-react)

---

### 2. SUBTITLE — Staggered Drop with Inertia Bounce

Replace the current single `<p>` subtitle with 3 separate motion divs. Each line drops from above with physics-based bounce effect:

**Text lines:**

- Line 1: "CNC Freze, Torna ve Talaşlı İmalatta; ölçü hassasiyeti,"

- Line 2: "yüksek doğruluk ve proses kontrollü üretim anlayışıyla,"

- Line 3: "stabil kalite ve zamanında teslimat odaklı mühendislik çözümleri sunuyoruz."

**Animation specs (Framer Motion):**

- Initial: `{ y: -80, opacity: 0, filter: "blur(10px)" }`

- Animate: `{ y: 0, opacity: 1, filter: "blur(0px)" }`

- Transition: 

```js

  { 

    duration: 1,

    ease: [0.175, 0.885, 0.32, 1.275], // Custom cubic-bezier with overshoot bounce

    opacity: { duration: 0.6 },

    filter: { duration: 0.8 }

  }

```

- Stagger: 0.3s delay between each line

- Trigger: After headline animation completes

**Effect rationale:** Text doesn't just fall — it lands with weight and settles, conveying industrial stability and corporate solidity.

---

### 3. HEADLINE TYPOGRAPHY — Magnetic Kerning Animation

In `HeadlineStagger.tsx`:

**Base typography:**

- Font size: `clamp(3.5rem, 9vw, 9rem)`

- Final letter-spacing: `-0.05em`

- Text-shadow: `0 4px 30px rgba(6, 136, 173, 0.15)`

**Text-stroke contrast effect:**

- First word of each headline: outline only

```css

  -webkit-text-stroke: 2px #0688AD;

  color: transparent;

```

- Remaining words: solid fill `color: #0688AD`

**NEW — Magnetic Kerning Animation:**

Letters start spread apart and "magnetically" compress together:

- Initial: `{ letterSpacing: "0.2em", opacity: 0 }`

- Animate: `{ letterSpacing: "-0.05em", opacity: 1 }`

- Transition: `{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }`

**Implementation approach:**

Wrap each headline in a motion.div that animates `letterSpacing` property. This creates the effect of metal being pressed/machined into precision — reinforcing Mas Technic's "hassasiyet" (precision) brand message subconsciously.

---

### 4. HORIZONTAL SLIDE — Fix Timing & Full-Screen Lock

**Problem:** Section slides diagonally before fully visible.

**Solution in `HeroSection.tsx`:**

- Increase scroller container height: `500vh → 650vh`

- Restructure scroll phases:

  - **Phase 1 (Mask reveal):** 0% → 45% scroll

  - **Phase 2 (PAUSE — section fullscreen):** 45% → 60% scroll — NO animation, section locked

  - **Phase 3 (Horizontal slide):** 60% → 88% scroll

  - **Phase 4 (Lava effect + heat distortion):** 88% → 100% scroll

- Update GSAP ScrollTrigger:

```js

  scrub: 0.6,

  ease: "power2.inOut",

  pin: true

```

---

### 5. LAVA POUR EFFECT — With Heat Distortion

Add a new `LavaOverlay` component inside `HeroSection.tsx`:

**A) Lava Flow Visual:**

- SVG/CSS-based lava flow pouring from top downward

- Organic liquid shape using animated `clipPath`

- Multi-layer gradient with noise texture:

```css

  background: 

    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='[http://www.w3.org/2000/svg'%3E%3Cfilter](http://www.w3.org/2000/svg'%3E%3Cfilter) id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E"),

    linear-gradient(to bottom, #ff6a00 0%, #ee0979 40%, #e25822 70%, #b8451a 100%);

  background-blend-mode: overlay;

```

**B) NEW — Heat Distortion Effect:**

When lava pours (88%–100% scroll), apply heat shimmer to background content:

Create an SVG filter in `index.css`:

```css

.heat-distortion-filter {

  filter: url(#heat-distortion);

}

/* Add this SVG to HeroSection.tsx as a hidden element */

<svg style={{ position: 'absolute', width: 0, height: 0 }}>

  <defs>

    <filter id="heat-distortion">

      <feTurbulence 

        type="fractalNoise" 

        baseFrequency="0.015" 

        numOctaves="2" 

        result="noise"

      />

      <feDisplacementMap 

        in="SourceGraphic" 

        in2="noise" 

        scale="3" 

        xChannelSelector="R" 

        yChannelSelector="G"

      />

    </filter>

  </defs>

</svg>

```

GSAP animates the `scale` attribute from `0` to `3` during 88%–100% scroll, creating progressive heat shimmer.

Also apply subtle blur to text behind lava:

```js

// During lava phase

[gsap.to](http://gsap.to)('.hero-content-behind-lava', {

  filter: 'blur(1.5px)',

  scrollTrigger: { start: '88%', end: '100%', scrub: true }

});

```

**C) Background Color Transition:**

QuickQuote panel background morphs from `forge-mist` to ember gradient:

```js

[gsap.to](http://gsap.to)('.quick-quote-panel', {

  background: 'linear-gradient(135deg, #ff4500 0%, #e25822 50%, #b8451a 100%)',

  scrollTrigger: { start: '90%', end: '100%', scrub: true }

});

```

**D) Lava Structure:**

```jsx

<div className="lava-overlay absolute inset-0 pointer-events-none z-50 overflow-hidden">

  {/* Hidden SVG filter */}

  <svg style={{ position: 'absolute', width: 0, height: 0 }}>

    <defs>

      <filter id="heat-distortion">

        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" result="noise"/>

        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G"/>

      </filter>

    </defs>

  </svg>

  

  {/* Lava flow element */}

  <div 

    className="lava-flow absolute top-0 left-0 right-0 h-full"

    style={{

      background: `

        url("data:image/svg+xml,...noise-svg..."),

        linear-gradient(to bottom, #ff6a00, #ee0979 50%, #e25822)

      `,

      backgroundBlendMode: 'overlay',

      clipPath: 'polygon(15% 0%, 85% 0%, 95% 100%, 5% 100%)',

      transform: 'scaleY(0)',

      transformOrigin: 'top'

    }}

  />

</div>

```

---

### 6. CSS VARIABLES — Add to `index.css`

```css

:root {

  /* Lava/Forge colors */

  --forge-lava: #ff6a00;

  --forge-magma: #e25822;

  --forge-ember: #ee0979;

  --forge-coal: #b8451a;

  

  /* Heat distortion */

  --heat-blur-max: 1.5px;

  --heat-displacement-max: 3;

}

```

---

### FILES TO MODIFY

1. `src/components/HeroSection.tsx` — CTA removal, subtitle animation, scroll phases, lava overlay with heat distortion, hidden SVG filter

2. `src/components/HeadlineStagger.tsx` — Typography upgrade with text-stroke AND magnetic kerning animation

3. `src/index.css` — Lava color variables, heat distortion filter class

---

### ANIMATION SUMMARY TABLE

| Element | Effect | Timing | Easing |

|---------|--------|--------|--------|

| Headline letters | Kerning 0.2em → -0.05em | 1.2s | [0.22, 1, 0.36, 1] |

| Headline stroke | Outline → Fill contrast | Instant | — |

| Subtitle lines | Drop + bounce | 1s each, 0.3s stagger | [0.175, 0.885, 0.32, 1.275] |

| Horizontal slide | Left → Right | 60%–88% scroll | power2.inOut |

| Lava pour | scaleY 0 → 1 | 88%–100% scroll | power2.out |

| Heat distortion | scale 0 → 3 | 88%–100% scroll | linear |

| BG color shift | forge-mist → ember | 90%–100% scroll | linear |

---

### EXPECTED RESULT

- No CTA button in hero

- Subtitle drops with satisfying "thud" bounce — conveys weight and stability

- Headlines magnetically compress — mimics precision machining

- Horizontal slide has proper pause, no diagonal glitch

- Lava pours with granular texture, background shimmers with heat distortion

- Section "heats up" with warm ember tones at scroll end

This creates a cohesive industrial narrative: precision (kerning) → stability (bounce) → transformation (lava) → energy (heat).