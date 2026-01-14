import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto(
    "https://dictionary.cambridge.org/dictionary/english-chinese-simplified/",
  );
  await page.getByRole("button", { name: "I Accept" }).click();
  await page.getByRole("textbox", { name: "Search" }).click();
  await page.getByRole("textbox", { name: "Search" }).fill("example");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await expect(page.locator("#page-content")).toContainText("example");
});
