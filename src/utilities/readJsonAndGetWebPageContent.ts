import { readFile } from "fs/promises";
import { formatDate } from "./formatDate";
import { getWebPageContent } from "./getWebPageContent";
import { isFileExists } from "./isFileExists";
import { writeJson } from "./writeJson";

export const readJsonAndGetWebPageContent = async (inputs: string[]) => {
  console.log("getJsonAndWebPageContent");
  const [product, company, name] = inputs;
  const dateString = formatDate(new Date());
  const filePath = `C:\\Files\\Projects\\responses\\${product}\\${company}\\${name}\\${dateString}.json`;
  let content: Record<string, unknown>[];
  if (isFileExists(filePath)) {
    content = JSON.parse(await readFile(filePath, "utf8"));
    console.log(content);
  } else {
    content = [];
    const file = await readFile(`./src/data/${product}/${company}.json`, "utf8");
    const list: { name: string; urls: string[] }[] = JSON.parse(file);
    const item = list.find((item) => item.name.toLowerCase() === name.toLocaleLowerCase());
    if (item) {
      for (const url of item.urls) {
        content.push(...(await getWebPageContent([url])));
      }
    }
    writeJson(content, filePath);
    console.log(content);
  }
  return content;
};
