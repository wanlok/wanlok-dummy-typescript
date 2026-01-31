import { getPuppeteerResult } from "../../utilities/getPuppeteerResult";
import { ImageUrlNamePrice, WebPageTask } from "../../types";

const waitUntil = "domcontentloaded";

const getPaginationUrlStrings = async (urlString: string) => {
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
  return await getPuppeteerResult<ImageUrlNamePrice[]>({
    headless: false,
    waitUntil,
    urlString,
    evaluate: () => {
      return Array.from(document.querySelectorAll(".product-grid:not(.element-hidden)")).map((element) => ({
        image_url: element.getElementsByTagName("img")[0].src,
        name: element.getElementsByClassName("grid-product-title")[0].textContent.trim(),
        price: element.getElementsByClassName("grid-product-price")[0]?.textContent.trim()
      }));
    }
  });
};

export const scorptecWebPageTask: WebPageTask = {
  isResponsibleFor: (urlString) => urlString.startsWith("https://www.scorptec.com.au/product/"),
  getPaginationUrlStrings,
  getContent
};
