import { getPuppeteerResult } from "../utilities/getPuppeteerResult";
import { NamePrice, WebPageTask } from "./WebPageTask";

const getPaginationUrlStrings = async (inputs: string[]) => {
  const [urlString] = inputs;
  console.log(urlString);
  return await getPuppeteerResult<string[]>({
    urlString,
    evaluate: (urlString) => {
      const elements = document.getElementsByClassName("collection__products-count");
      if (elements.length === 0) {
        return [];
      }
      const s = elements[0].textContent.split(" ");
      const numberOfPages = Math.ceil(parseInt(s[5]) / parseInt(s[3]));
      return Array.from({ length: numberOfPages }, (_, i) => `${urlString}?page=${i + 1}`);
    }
  });
};

const getContent = async (urlString: string) => {
  console.log(urlString);
  return await getPuppeteerResult<NamePrice>({
    urlString,
    evaluate: () => {
      return Array.from(document.getElementsByClassName("product-item")).map((element) => ({
        name: element.getElementsByClassName("product-item__title")[0].textContent,
        price: element.getElementsByClassName("price")[0].textContent
      }));
    }
  });
};

export const jumboComputerWebPageTask: WebPageTask = {
  isResponsibleFor: (inputs: string[]): boolean => {
    const [urlString] = inputs;
    return urlString.startsWith("https://www.jumbo-computer.com/collections/");
  },
  getPaginationUrlStrings,
  getContent
};
