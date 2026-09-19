import { JSDOM } from "jsdom";

export const getAHrefs = (as: HTMLCollectionOf<Element>, substring?: string) => {
  const hrefs = new Set<string>();
  Array.from(as).forEach((a: Element) => {
    const href = a.getAttribute("href");
    if (href && (!substring || href.includes(substring))) {
      hrefs.add(href);
    }
  });
  return Array.from(hrefs);
};

export const getHtmlAHrefsByClassName = (html: string, className: string, substring?: string): string[] => {
  const dom = new JSDOM(html);
  const as = dom.window.document.getElementsByClassName(className);
  return getAHrefs(as, substring);
};
