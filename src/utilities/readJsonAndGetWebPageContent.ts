import { readFile } from "fs/promises";
import { formatDate } from "./formatDate";
import { getWebPageContent } from "./getWebPageContent";
import { isFileExists } from "./isFileExists";
import { writeJson } from "./writeJson";

const dummy = async (
  product: string,
  company: string,
  name: string,
  dateString: string,
  i: number,
  urlString: string
) => {
  let content: Record<string, unknown>[];
  const filePath = `C:\\Files\\Projects\\responses\\${product}\\${company}\\${name}\\${dateString}_${i + 1}.json`;
  console.log(filePath);
  if (isFileExists(filePath)) {
    content = JSON.parse(await readFile(filePath, "utf8"));
  } else {
    content = await getWebPageContent([urlString]);
    writeJson(content, filePath);
  }
  console.log(content);
  return content;
};

export const readJsonAndGetWebPageContent = async (inputs: string[]) => {
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
      for (var i = 0; i < item.urls.length; i++) {
        content.push(...(await dummy(product, company, name, dateString, i, item.urls[i])));
      }
    }
    writeJson(content, filePath);
    console.log(content);
  }
  return content;
};
