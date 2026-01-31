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
        const urlString = urlStrings[j];
        if (product && company && name && typeof i === "number") {
          const fileName = `${dateString}_${i + 1}_${j + 1}.json`;
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
        if (process.env.LIMIT && count === parseInt(process.env.LIMIT)) {
          break;
        }
      }
      break;
    }
  }
  return content;
};
