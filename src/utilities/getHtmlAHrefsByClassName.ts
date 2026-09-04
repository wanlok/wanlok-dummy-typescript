import { JSDOM } from "jsdom";

export const getAHrefs = (as: HTMLCollectionOf<Element>) => {
  const hrefs = new Set<string>();
  Array.from(as).forEach((a: Element) => {
    const href = a.getAttribute("href");
    if (href) {
      hrefs.add(href);
    }
  });
  return Array.from(hrefs);
};

export const getHtmlAHrefsByClassName = (html: string, className: string): string[] => {
  const dom = new JSDOM(html);
  const as = dom.window.document.getElementsByClassName(className);
  return getAHrefs(as);
};
