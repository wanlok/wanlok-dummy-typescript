import { getPuppeteerResult } from "../../utilities/getPuppeteerResult";
import { ImageUrlNamePrice, WebPageTask } from "../../types";

const getPaginationUrlStrings = async (urlString: string) => {
  console.log(urlString);
  return await getPuppeteerResult<string[]>({
    urlString,
    evaluate: (urlString) => {
      const elements = document.getElementsByClassName("collection__products-count");
      if (elements.length === 0) {
        return [];
      }
      const [, , , count, , total] = elements[0].textContent.split(" ");
      const length = Math.ceil(parseInt(total) / parseInt(count));
      return Array.from({ length }, (_, i) => `${urlString}?page=${i + 1}`);
    }
  });
};

const getContent = async (urlString: string) => {
  console.log(urlString);
  return await getPuppeteerResult<ImageUrlNamePrice[]>({
    urlString,
    evaluate: () => {
      return Array.from(document.getElementsByClassName("product-item")).map((element) => ({
        image_url: element.getElementsByTagName("img")[0].src,
        name: element.getElementsByClassName("product-item__title")[0].textContent,
        price: element.getElementsByClassName("price")[0].textContent
      }));
    }
  });
};

export const jumboWebPageTask: WebPageTask = {
  isResponsibleFor: (urlString) => urlString.startsWith("https://www.jumbo-computer.com/collections/"),
  getPaginationUrlStrings,
  getContent
};
