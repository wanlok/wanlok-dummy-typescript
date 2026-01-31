import { readFile } from "fs/promises";
import { sep } from "path";
import { capitalWebPageTask } from "../task/computer/capitalWebPageTask";
import { centralfieldWebPageTask } from "../task/computer/centralfieldWebPageTask";
import { formatDate } from "./formatDate";
import { isFileExists } from "./isFileExists";
import { jumboWebPageTask } from "../task/computer/jumboWebPageTask";
import { scorptecWebPageTask } from "../task/computer/scorptecWebPageTask";
import { writeJson } from "./writeJson";

const webPageTasks = [capitalWebPageTask, centralfieldWebPageTask, jumboWebPageTask, scorptecWebPageTask];

const limit = 99999;

export const getWebPageContent = async (inputs: [string, ...(string | undefined)[]]) => {
  const content: Record<string, unknown>[] = [];
  const [urlString, product, company, name, inputDateString] = inputs;
  const dateString = inputDateString ?? formatDate(new Date());
  for (const task of webPageTasks) {
    if (task.isResponsibleFor(urlString)) {
      let count = 0;
      const urlStrings = await task.getPaginationUrlStrings(urlString);
      console.log(urlStrings);
      for (var i = 0; i < urlStrings.length; i++) {
        const urlString = urlStrings[i];
        if (product && company && name) {
          const fileName = `${dateString}_${i + 1}.json`;
          const filePath = [process.env.DIRECTORY_PATH, product, company, name, fileName].join(sep);
          let pageContent;
          if (isFileExists(filePath)) {
            console.log(filePath);
            pageContent = JSON.parse(await readFile(filePath, "utf8"));
          } else {
            pageContent = await task.getContent(urlString);
            writeJson(pageContent, filePath);
          }
          content.push(...pageContent);
        } else {
          content.push(...(await task.getContent(urlString)));
        }
        count = count + 1;
        if (count === limit) {
          break;
        }
      }
      break;
    }
  }
  return content;
};
