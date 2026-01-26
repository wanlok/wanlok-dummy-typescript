import { capitalWebPageTask } from "../task/computer/capitalWebPageTask";
import { centralfieldWebPageTask } from "../task/computer/centralfieldWebPageTask";
import { jumboWebPageTask } from "../task/computer/jumboWebPageTask";
import { scorptecWebPageTask } from "../task/computer/scorptecWebPageTask";

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
