import { readFile } from "fs/promises";
import { sep } from "path";
import { capitalWebPageTask } from "../task/computer/capitalWebPageTask";
import { centralfieldWebPageTask } from "../task/computer/centralfieldWebPageTask";
import { formatDate } from "./formatDate";
import { isFileExists } from "./isFileExists";
import { jumboWebPageTask } from "../task/computer/jumboWebPageTask";
import { scorptecWebPageTask } from "../task/computer/scorptecWebPageTask";
import { writeJson } from "./writeJson";
import { WebPageTask } from "../types";

const webPageTasks = [capitalWebPageTask, centralfieldWebPageTask, jumboWebPageTask, scorptecWebPageTask];

const getPaginationContent = async (
  dateString: string | number,
  product: string | number | undefined,
  company: string | number | undefined,
  name: string | number | undefined,
  i: string | number | undefined,
  j: number,
  task: WebPageTask,
  urlString: string
) => {
  let content: Record<string, unknown>[];
  if (product && company && name && typeof i === "number") {
    const fileName = `${dateString}_${i + 1}_${j + 1}.json`;
    const filePath = [process.env.DIRECTORY_PATH, product, company, name, fileName].join(sep);
    if (isFileExists(filePath)) {
      console.log(filePath);
      content = JSON.parse(await readFile(filePath, "utf8"));
    } else {
      content = await task.getContent(urlString);
      writeJson(content, filePath);
    }
  } else {
    content = await task.getContent(urlString);
  }
  return content;
};

export const getWebPageContent = async (inputs: [string, ...(string | number | undefined)[]]) => {
  const content: Record<string, unknown>[] = [];
  const [urlString, inputDateString, product, company, name, i] = inputs;
  const dateString = inputDateString ?? formatDate(new Date());
  for (const task of webPageTasks) {
    if (task.isResponsibleFor(urlString)) {
      let count = 0;
      const urlStrings = await task.getPaginationUrlStrings(urlString);
      console.log(urlStrings);
      for (var j = 0; j < urlStrings.length; j++) {
        content.push(...(await getPaginationContent(dateString, product, company, name, i, j, task, urlStrings[j])));
        count = count + 1;
        if (process.env.LIMIT && count === parseInt(process.env.LIMIT)) {
          break;
        }
      }
      break;
    }
  }
  return content;
};
