import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { Task } from "./Task";

puppeteer.use(StealthPlugin());

export const Dummy: Task = {
  download: async (urlString: string, directoryPath: string) => {
    const browser = await puppeteer.launch({
      headless: false, // Set to false for debugging, true for headless
      args: ["--disable-blink-features=AutomationControlled", "--start-maximized"],
      defaultViewport: null
    });
    const page = await browser.newPage();
    await page.goto(urlString, { waitUntil: "networkidle2" });

    // Try to extract the data-exchange-rate attribute
    const exchangeRate = await page.evaluate(() => {
      const el = document.querySelector("[data-exchange-rate]");
      return el ? el.getAttribute("data-exchange-rate") : null;
    });

    if (exchangeRate) {
      console.log("Exchange Rate:", exchangeRate);
    } else {
      console.log("data-exchange-rate not found");
    }

    // Optionally, you can still print the HTML for debugging
    // const html = await page.content();
    // console.log(html);

    await browser.close();
  }
};
