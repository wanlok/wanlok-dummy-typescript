import { writeFile } from "node:fs/promises";
import { JSDOM } from "jsdom";
import { getHtml } from "../utils/getHtml";

const dummy = (html: string) => {
  const dom = new JSDOM(html);
  const elements = dom.window.document.getElementsByClassName("");
  return Array.from(elements).map((el) => ({
    text: el.textContent?.trim(),
    html: el.outerHTML
  }));
};

export const htmlDummy = () => {
  getHtml("")
    .then(async (html: string | null) => {
      if (html === null) {
        return;
      }
      await writeFile("C:\\Files\\output.html", html, "utf-8");
      const a = dummy(html);
      console.log(a);
    })
    .catch((err) => console.error(err));
};
