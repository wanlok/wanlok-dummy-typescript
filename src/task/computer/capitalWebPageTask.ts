import { getPuppeteerResult } from "../../utilities/getPuppeteerResult";
import { NamePrice, WebPageTask } from "../../types";

const getPaginationUrlStrings = async (inputs: string[]) => {
  const [urlString] = inputs;
  console.log(urlString);
  return await getPuppeteerResult<string[]>({
    urlString,
    evaluate: (urlString) => {
      const elements = document.querySelectorAll<HTMLAnchorElement>("a[data-ci-pagination-page]");
      if (elements.length === 0) {
        return [];
      }
      const length = parseInt(elements[elements.length - 1].getAttribute("data-ci-pagination-page") ?? "0");
      return Array.from({ length }, (_, i) => `${urlString}?page=${i + 1}`);
    }
  });
};

const getContent = async (urlString: string) => {
  console.log(urlString);
  return await getPuppeteerResult<NamePrice>({
    urlString,
    evaluate: () => {
      return Array.from(document.getElementsByClassName("product-card")).map((element) => ({
        name: element.getElementsByClassName("product-title")[0].textContent,
        price: element.getElementsByClassName("product-price")[0].textContent
      }));
    }
  });
};

export const capitalWebPageTask: WebPageTask = {
  isResponsibleFor: (inputs: string[]): boolean => {
    const [urlString] = inputs;
    return urlString.startsWith("https://www.cap.com.hk/products/category/");
  },
  getPaginationUrlStrings,
  getContent
};
