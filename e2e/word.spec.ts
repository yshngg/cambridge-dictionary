import { test, expect } from "@playwright/test";
import { readFileSync, writeFileSync } from "fs";

let content = readFileSync("e2e/words.txt", { encoding: "utf-8" });
let wordlist = content.split("\n");
for (let word of wordlist) {
  word = word.trim();
  if (word.length == 0) continue;
  test(`test ${word}`, async ({ page }) => {
    await page.goto(
      "https://dictionary.cambridge.org/dictionary/english-chinese-simplified/",
    );
    await page.getByRole("button", { name: "I Accept" }).click();
    await page.getByRole("textbox", { name: "Search" }).click();
    await page.getByRole("textbox", { name: "Search" }).fill(word);
    await page.getByRole("button", { name: "Search", exact: true }).click();
    await expect(page.locator("#page-content")).toContainText(word);
  });
}
