import { test, expect } from "@playwright/test";
import { gotoAndSettle, revealFooterCopyright } from "./helpers";

/**
 * FIX·A·05 / FIX·INDEX·MOBILE·01 regression
 * Verifies the reveal-footer's bottom-bar (copyright span) is reachable
 * past the FinalCTA sticky pin on every key route + viewport.
 */
const ROUTES = ["/", "/sss", "/iletisim", "/malzemeler"] as const;

for (const route of ROUTES) {
  test(`footer bottom-bar reachable on ${route}`, async ({ page }, testInfo) => {
    await gotoAndSettle(page, route);
    const copyright = await revealFooterCopyright(page);

    // Must sit inside the viewport's vertical bounds after scrollIntoView.
    const box = await copyright.boundingBox();
    expect(box, "copyright bounding box must exist").not.toBeNull();
    const vh = page.viewportSize()?.height ?? 0;
    expect(box!.y).toBeGreaterThanOrEqual(0);
    expect(box!.y).toBeLessThanOrEqual(vh);

    // Archive proof screenshot per route × viewport.
    const safe = route.replace(/\W+/g, "_") || "_root";
    await testInfo.attach(`footer-${testInfo.project.name}${safe}.png`, {
      body: await page.screenshot({ fullPage: false }),
      contentType: "image/png",
    });
  });
}