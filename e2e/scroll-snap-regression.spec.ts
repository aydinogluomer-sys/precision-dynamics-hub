import { test, expect } from "@playwright/test";
import { gotoAndSettle, fullScrollToBottom } from "./helpers";

/**
 * FIX·INDEX·MOBILE·01 — On mobile, native scroll-snap must not trap
 * the user at FinalCTA. After full scroll + scrollIntoView on the
 * footer copyright, the bottom-bar must be visible.
 */
const MOBILE_ROUTES = ["/", "/sss", "/iletisim"] as const;

test.describe("FinalCTA → footer bottom-bar reachability (mobile)", () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) > 768, "mobile-only regression");

  for (const route of MOBILE_ROUTES) {
    test(`mobile reaches footer bottom-bar on ${route}`, async ({ page }, testInfo) => {
      await gotoAndSettle(page, route);
      await fullScrollToBottom(page);

      // Target: copyright span inside footer bottom-bar.
      const copyright = page.locator("footer >> text=/©\\s*\\d{4}\\s+MAS\\s+TECHNIC/");
      await copyright.scrollIntoViewIfNeeded();
      await expect(copyright).toBeVisible();

      // Legal links rendered alongside copyright must also be reachable.
      const legal = page.locator("footer a", { hasText: /Gizlilik Politikası/ }).first();
      await legal.scrollIntoViewIfNeeded();
      await expect(legal).toBeVisible();

      const safe = route.replace(/\W+/g, "_") || "_root";
      await testInfo.attach(`snap-${testInfo.project.name}${safe}.png`, {
        body: await page.screenshot({ fullPage: false }),
        contentType: "image/png",
      });
    });
  }
});