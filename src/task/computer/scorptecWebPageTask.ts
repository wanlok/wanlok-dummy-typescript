import { getPuppeteerResult } from "../../utilities/getPuppeteerResult";
import { NamePrice, WebPageTask } from "../../types";

const waitUntil = "domcontentloaded";

const getPaginationUrlStrings = async (inputs: string[]) => {
  const [urlString] = inputs;
  console.log(urlString);
  return await getPuppeteerResult<string[]>({
    headless: false,
    waitUntil,
    urlString,
    evaluate: (urlString) => {
      return Array.from(document.getElementsByClassName("pagination-item")).map(
        (element) => `${urlString}?page=${element.textContent.trim()}`
      );
    }
  });
};

const getContent = async (urlString: string) => {
  console.log(urlString);
  return await getPuppeteerResult<NamePrice>({
    headless: false,
    waitUntil,
    urlString,
    evaluate: () => {
      return Array.from(document.querySelectorAll(".product-grid:not(.element-hidden)")).map((element) => ({
        name: element.getElementsByClassName("grid-product-title")[0].textContent.trim(),
        price: element.getElementsByClassName("grid-product-price")[0]?.textContent.trim()
      }));
    }
  });
};

export const scorptecWebPageTask: WebPageTask = {
  isResponsibleFor: (inputs: string[]): boolean => {
    const [urlString] = inputs;
    return urlString.startsWith("https://www.scorptec.com.au/product/");
  },
  getPaginationUrlStrings,
  getContent
};
