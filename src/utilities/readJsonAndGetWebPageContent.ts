import "dotenv/config";
import { readFile } from "fs/promises";
import { sep } from "path";
import { formatDate } from "./formatDate";
import { getWebPageContent } from "./getWebPageContent";
import { isFileExists } from "./isFileExists";
import { writeJson } from "./writeJson";

export const readJsonAndGetWebPageContent = async (inputs: string[]) => {
  const [product, company, name] = inputs;
  const dateString = formatDate(new Date());
  const filePath = [process.env.DIRECTORY_PATH, product, company, name, `${dateString}.json`].join(sep);
  let content: Record<string, unknown>[];
  if (isFileExists(filePath)) {
    content = JSON.parse(await readFile(filePath, "utf8"));
  } else {
    content = [];
    const file = await readFile(`./src/data/${product}/${company}.json`, "utf8");
    const list: { name: string; urls: string[] }[] = JSON.parse(file);
    const item = list.find((item) => item.name.toLowerCase() === name.toLocaleLowerCase());
    if (item) {
      for (const urlString of item.urls) {
        content = await getWebPageContent([urlString, product, company, name, dateString]);
      }
    }
    writeJson(content, filePath);
  }
  return content;
};
