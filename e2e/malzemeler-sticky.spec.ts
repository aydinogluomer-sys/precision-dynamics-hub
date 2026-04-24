import { test, expect } from "@playwright/test";
import { gotoAndSettle, revealFooterCopyright } from "./helpers";

/**
 * FIX·MAL·01 — sticky filter bar must NOT overlap footer's link grid
 * at the bottom of /malzemeler on mobile + tablet viewports.
 */
test.describe("/malzemeler sticky filter bar release", () => {
  test("filter bar does not overlap footer link grid", async ({ page }, testInfo) => {
    await gotoAndSettle(page, "/malzemeler");
    await revealFooterCopyright(page);

    const stickyBar = page.locator('[data-sticky="materials-filter"], [data-testid="materials-filter-bar"]').first();
    const footer = page.locator("footer").first();
    await expect(footer).toBeVisible();

    if (await stickyBar.count()) {
      const barBox = await stickyBar.boundingBox();
      const footerBox = await footer.boundingBox();
      if (barBox && footerBox) {
        // Sticky bar must have released — its bottom should be above footer's top.
        expect(barBox.y + barBox.height).toBeLessThanOrEqual(footerBox.y + 1);
      }
    }

    await testInfo.attach(`malzemeler-${testInfo.project.name}.png`, {
      body: await page.screenshot({ fullPage: false }),
      contentType: "image/png",
    });
  });
});