import { readFile } from "fs/promises";
import { capitalWebPageTask } from "../task/computer/CapitalWebPageTask";
import { centralfieldWebPageTask } from "../task/computer/CentralfieldWebPageTask";
import { jumboWebPageTask } from "../task/computer/JumboWebPageTask";
import { scorptecWebPageTask } from "../task/computer/ScorptecWebPageTask";

const webPageTasks = [capitalWebPageTask, centralfieldWebPageTask, jumboWebPageTask, scorptecWebPageTask];

export const getWebPageContent = async (inputs: string[]) => {
  const content = [];
  for (const task of webPageTasks) {
    if (task.isResponsibleFor(inputs)) {
      let count = 0;
      const urlStrings = await task.getPaginationUrlStrings(inputs);
      console.log(urlStrings);
      for (const urlString of urlStrings) {
        content.push(...(await task.getContent(urlString)));
        if (count === 1) {
          break;
        }
        count = count + 1;
      }
    }
  }
  return content;
};

export const loadJsonAndGetWebPageContent = async (inputs: string[]) => {
  const content = [];
  const [product, company, name] = inputs;
  const file = await readFile(`./src/data/${product}/${company}.json`, "utf8");
  const list: { name: string; urls: string[] }[] = JSON.parse(file);
  const item = list.find((item) => item.name.toLowerCase() === name.toLocaleLowerCase());
  if (item) {
    for (const url of item.urls) {
      content.push(...(await getWebPageContent([url])));
    }
  }
  return content;
};
