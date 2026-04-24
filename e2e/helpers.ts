import { Page, expect } from "@playwright/test";

/**
 * Slow-scrolls in viewport-sized steps so GSAP/Lenis-pinned sections
 * (FinalCTA stacking pin) release before reaching the reveal-footer.
 */
export async function fullScrollToBottom(page: Page) {
  await page.evaluate(async () => {
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const step = Math.max(200, Math.floor(window.innerHeight * 0.85));
    let last = -1;
    let same = 0;
    while (same < 4) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const next = Math.min(max, window.scrollY + step);
      window.scrollTo({ top: next, behavior: "auto" });
      await wait(180);
      if (window.scrollY === last) same += 1;
      else same = 0;
      last = window.scrollY;
      if (window.scrollY >= max) break;
    }
  });
}

/**
 * Guarantees the footer copyright span is reachable past FinalCTA's sticky pin
 * by scrolling the element into view (works around stacking-scroll on mobile).
 */
export async function revealFooterCopyright(page: Page) {
  await fullScrollToBottom(page);
  const copyright = page.locator("footer >> text=/©\\s*\\d{4}\\s+MAS\\s+TECHNIC/");
  await copyright.scrollIntoViewIfNeeded();
  await expect(copyright).toBeVisible();
  return copyright;
}

export async function gotoAndSettle(page: Page, path: string) {
  await page.goto(path, { waitUntil: "networkidle" });
  // Allow lazy-loaded sections + ResizeObserver-driven --footer-height to settle.
  await page.waitForTimeout(600);
}