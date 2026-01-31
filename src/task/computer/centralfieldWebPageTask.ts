import { getPuppeteerResult } from "../../utilities/getPuppeteerResult";
import { ImageUrlNamePrice, WebPageTask } from "../../types";

const getPaginationUrlStrings = async (urlString: string) => {
  console.log(urlString);
  return await getPuppeteerResult<string[]>({
    urlString,
    evaluate: (urlString) => {
      return Array.from([
        ...document.getElementsByClassName("pageSelected"),
        ...document.getElementsByClassName("pages")
      ]).map((element) => `${urlString}${element.getAttribute("href")}`);
    }
  });
};

const getContent = async (urlString: string) => {
  console.log(urlString);
  return await getPuppeteerResult<ImageUrlNamePrice[]>({
    urlString,
    evaluate: () => {
      return Array.from(document.getElementsByClassName("grid-item")).map((element) => {
        let price = null;
        const priceElements = element.getElementsByClassName("S_price");
        if (priceElements && priceElements.length > 0) {
          const priceElement = priceElements[0];
          Array.from(priceElement.getElementsByClassName("ori_price")).forEach((element) => element.remove());
          price = priceElement.textContent;
        }
        return {
          image_url: element.getElementsByTagName("img")[0].src,
          name: element.getElementsByClassName("product_name")[0].textContent,
          price
        };
      });
    }
  });
};

export const centralfieldWebPageTask: WebPageTask = {
  isResponsibleFor: (urlString) => urlString.startsWith("https://centralfield.com/product-category/"),
  getPaginationUrlStrings,
  getContent
};
