import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
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

const selectOption = async (page: Page, title: string, option: string): Promise<void> => {
  await page.getByRole("combobox", { name: title }).click();
  await page.getByRole("option", { name: option, exact: true }).click();
  await page.waitForTimeout(500);
};

const getOptionTexts = async (page: Page, title: string): Promise<string[]> => {
  await page.getByRole("combobox", { name: title }).click();
  const texts = await page
    .getByRole("listbox")
    .locator('[role="option"]:not([aria-disabled="true"])')
    .allTextContents();
  await page.keyboard.press("Escape");
  return texts;
};

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const randomDelayBetweenGenerations = async (): Promise<void> => {
  await sleep(2000 + Math.random() * 2000);
};

export const saveKeyFactsSheets = async (
  url: string,
  rateTitle: string,
  csvFilePath: string,
  screenshotDirectoryPath: string,
  amount: number,
  term: number
): Promise<void> => {
  await mkdir(screenshotDirectoryPath, { recursive: true });

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "load" });
    await page.waitForTimeout(5000);

    await page.getByRole("textbox", { name: "Loan amount" }).fill(String(amount));
    await page.getByRole("spinbutton", { name: "Loan term" }).fill(String(term));
    await page.keyboard.press("Tab");
    await page.waitForTimeout(500);

    const rows: Row[] = [];

    const loanPurposeOptions = await getOptionTexts(page, "Loan purpose");
    for (const loanPurpose of loanPurposeOptions) {
      await selectOption(page, "Loan purpose", loanPurpose);

      const productOptions = await getOptionTexts(page, "Product");
      for (const product of productOptions) {
        await selectOption(page, "Product", product);

        const rates = await getOptionTexts(page, rateTitle);
        for (const rate of rates) {
          const row = { loanPurpose, product, rate };
          console.log(rows.length + 1, row);
          rows.push(row);

          await selectOption(page, rateTitle, rate);

          const [popup] = await Promise.all([
            page.waitForEvent("popup"),
            page.getByRole("button", { name: "Generate Key Facts Sheet" }).click()
          ]);
          await popup.waitForLoadState("load");
          await popup.screenshot({ path: path.join(screenshotDirectoryPath, `${rows.length}.png`), fullPage: true });
          await popup.close();

          await randomDelayBetweenGenerations();
        }
      }
    }

    await writeFile(csvFilePath, toCsv(rows), "utf-8");
  } finally {
    await browser.close();
  }
};
