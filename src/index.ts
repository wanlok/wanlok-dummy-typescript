import { currencyTask } from "./task/CurrencyTask";
import { deleteMacOSMetadataFiles } from "./utilities/deleteMacOSMetadataFiles";
import { readJsonAndGetWebPageContent } from "./utilities/readJsonAndGetWebPageContent";
import { getWebPageContent } from "./utilities/getWebPageContent";
import { listMacOSMetadataFiles } from "./utilities/listMacOSMetadataFiles";
import { writeFile } from "node:fs/promises";
import { JSDOM } from "jsdom";

async function getHtml(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9"
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return await response.text();
}

const dummy = (html: string) => {
  const dom = new JSDOM(html);
  const elements = dom.window.document.getElementsByClassName("");
  return Array.from(elements).map((el) => ({
    text: el.textContent?.trim(),
    html: el.outerHTML
  }));
};

const main = async () => {
  const inputs = process.argv.slice(2);
  // if (inputs.length > 1) {
  //   if (inputs[0] === "list") {
  //     listMacOSMetadataFiles(inputs);
  //   } else if (inputs[0] === "delete") {
  //     await deleteMacOSMetadataFiles(inputs);
  //   } else if (inputs[0] === "fx") {
  //     currencyTask.getExchangeRates(inputs);
  //   } else {
  //     await readJsonAndGetWebPageContent(inputs);
  //   }
  // } else if (inputs.length > 0) {
  //   const content = await getWebPageContent(inputs as [string]);
  //   console.log(content);
  // }
  // Usage
  getHtml("")
    .then(async (html: string) => {
      await writeFile("C:\\Files\\output.html", html, "utf-8");
      const a = dummy(html);
      console.log(a);
    })
    .catch((err) => console.error(err));
};

main();
