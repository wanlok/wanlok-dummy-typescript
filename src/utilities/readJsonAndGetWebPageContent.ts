import "dotenv/config";
import { readFile } from "fs/promises";
import { sep } from "path";
import { formatDate } from "./formatDate";
import { getWebPageContent } from "./getWebPageContent";
import { isFileExists } from "./isFileExists";
import { writeJson } from "./writeJson";

export const readJsonAndGetWebPageContent = async (inputs: string[]) => {
  const content: Record<string, unknown>[] = [];
  const [product, company, name] = inputs;
  const dateString = formatDate(new Date());
  const filePath = [process.env.DIRECTORY_PATH, product, company, name, `${dateString}.json`].join(sep);
  if (isFileExists(filePath)) {
    content.push(...JSON.parse(await readFile(filePath, "utf8")));
  } else {
    const file = await readFile(`./src/data/${product}/${company}.json`, "utf8");
    const list: { name: string; urls: string[] }[] = JSON.parse(file);
    const item = list.find((item) => item.name.toLowerCase() === name.toLocaleLowerCase());
    if (item) {
      for (var i = 0; i < item.urls.length; i++) {
        content.push(...(await getWebPageContent([item.urls[i], dateString, product, company, name, i])));
      }
    }
    writeJson(content, filePath);
  }
  return content;
};
