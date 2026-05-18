/**
 * Awwwards Pattern Reference — Mas Technic
 * Kaynak: ref-fullstack (GSAP SOTD), ref-codrops (grid transforms)
 * Implement sonrası bu dosyayı sil, ROADMAP.md'de işaretle.
 */

// ── Pattern 1: Hero Fold-Away (ref-fullstack HeroSection) ──────────────────
// stickyRef: sticky 100vh panel
// scrollerRef: 450vh scroll container
//
// gsap.to(stickyRef.current, {
//   rotate: 3,
//   scale: 0.9,
//   transformOrigin: "50% 50%",
//   ease: "power2.in",
//   scrollTrigger: { trigger: scroller, start: "3% top", end: "28% top", scrub: 1.5 },
// });

// ── Pattern 2: Video Circle Expand (ref-fullstack VideoPinSection) ─────────
// containerRef: video section root div
//
// gsap.fromTo(el, { clipPath: "circle(0% at 50% 0%)" }, {
//   clipPath: "circle(150% at 50% 0%)",
//   duration: 1.6,
//   ease: "power3.out",
//   scrollTrigger: { trigger: el, start: "top 90%", once: true },
// });

// ── Pattern 3: Word Color Reveal (ref-fullstack MessageSection) ────────────
// manifestoRef: <p> element with plain text (no JSX children)
// Requires: SplitText registered via animation-manager
//
// const split = SplitText.create(el, { type: "words" });
// gsap.fromTo(split.words,
//   { color: "hsl(var(--forge-silver) / 0.2)" },
//   { color: "hsl(var(--foreground))", ease: "none", stagger: 1,
//     scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 30%", scrub: true } }
// );
// cleanup: ctx.revert(); split.revert();

// ── Pattern 4: Grid Item Scroll-Off (ref-codrops demo6) ───────────────────
// Apply to project/service card grids
//
// gsap.timeline()
//   .set(image, { transformOrigin: "0% 100%" })
//   .to(image, {
//     ease: "back.in(2)",
//     scaleX: 0, scaleY: 2.5, skewY: gsap.utils.random(-5, 5),
//     scrollTrigger: { trigger: item, start: "top 70%", end: "bottom top", scrub: 0.1 }
//   });

// ── Pattern 5: ClipPath Polygon Reveal (ref-fullstack BenefitSection) ─────
// Alternative to inset-based reveals — more editorial feel
//
// gsap.fromTo(el,
//   { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", opacity: 0 },
//   { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", opacity: 1,
//     duration: 0.8, ease: "circ.out",
//     scrollTrigger: { trigger: el, start: "top 60%", once: true } }
// );
