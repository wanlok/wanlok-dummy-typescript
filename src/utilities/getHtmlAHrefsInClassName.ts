import { JSDOM } from "jsdom";
import { getAHrefs } from "./getHtmlAHrefsByClassName";

export const getHtmlAHrefsInClassName = (html: string, className: string): string[] => {
  const dom = new JSDOM(html);
  const containers = dom.window.document.getElementsByClassName(className);
  const hrefs = new Set<string>();
  Array.from(containers).forEach((container) => {
    const as = container.getElementsByTagName("a");
    getAHrefs(as).forEach((href) => hrefs.add(href));
  });
  return Array.from(hrefs);
};
