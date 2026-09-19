import { writeFile } from "node:fs/promises";
import { chromium, Page } from "playwright";

type Row = {
  loanPurpose: string;
  product: string;
  rate: string;
};

const toCsv = (rows: Row[]): string => {
  const escape = (value: string): string => `"${value.replace(/"/g, '""')}"`;
  const header = ["loanPurpose", "product", "rate"];
  const lines = rows.map((row) => [row.loanPurpose, row.product, row.rate].map(escape).join(","));
  return [header.join(","), ...lines].join("\n");
};

const selectOption = async (page: Page, comboboxName: string, optionName: string): Promise<void> => {
  await page.getByRole("combobox", { name: comboboxName }).click();
  await page.getByRole("option", { name: optionName, exact: true }).click();
  await page.waitForTimeout(500);
};

const getOptionTexts = async (page: Page, comboboxName: string): Promise<string[]> => {
  await page.getByRole("combobox", { name: comboboxName }).click();
  const texts = await page
    .getByRole("listbox")
    .locator('[role="option"]:not([aria-disabled="true"])')
    .allTextContents();
  await page.keyboard.press("Escape");
  return texts;
};

export const keyFactsSheet = () => {
  (async () => {
    const browser = await chromium.launch();
    try {
      const page = await browser.newPage();
      await page.goto("https://lmg.athena.com.au/key-facts-sheet", { waitUntil: "load" });
      await page.waitForTimeout(5000);

      const rows: Row[] = [];

      const loanPurposeOptions = await getOptionTexts(page, "Loan purpose");
      for (const loanPurpose of loanPurposeOptions) {
        await selectOption(page, "Loan purpose", loanPurpose);

        const productOptions = await getOptionTexts(page, "Product");
        for (const product of productOptions) {
          await selectOption(page, "Product", product);

          const rates = await getOptionTexts(page, "Select an Apollo rate");
          for (const rate of rates) {
            rows.push({ loanPurpose, product, rate });
          }
        }
      }

      await writeFile("/Users/wanlok/Files/Projects/a/dummy.csv", toCsv(rows), "utf-8");
    } finally {
      await browser.close();
    }
  })().catch((err) => console.error(err));
};
