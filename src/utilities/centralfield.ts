import { getPuppeteerResult } from "./getPuppeteerResult";
import { Task } from "./Task";

const getPageUrlStrings = async (inputs: string[]) => {
  const [urlString] = inputs;
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
  return await getPuppeteerResult<{ name: string; price: string }[]>({
    urlString,
    evaluate: () => {
      const getPrice = (element: Element) => {
        const priceElement = element.getElementsByClassName("S_price")[0];
        Array.from(priceElement.getElementsByClassName("ori_price")).forEach((element) => element.remove());
        return priceElement.textContent;
      };
      return Array.from(document.getElementsByClassName("card")).map((element) => ({
        name: element.getElementsByClassName("product_name")[0].textContent,
        price: getPrice(element)
      }));
    }
  });
};

export const centralfield: Task = {
  isResponsibleFor: (inputs: string[]): boolean => {
    const [urlString] = inputs;
    return urlString.startsWith("https://centralfield.com/product-category/");
  },
  getPageUrlStrings,
  getContent
};
