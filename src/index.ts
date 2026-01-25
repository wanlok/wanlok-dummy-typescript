import { readFile } from "fs/promises";
import { centralfieldWebPageTask } from "./task/CentralfieldWebPageTask";
import { jumboWebPageTask } from "./task/JumboWebPageTask";
import { CurrencyUtils } from "./utilities/CurrencyUtils";
import { FileUtils } from "./utilities/FileUtils";

const webPageTasks = [centralfieldWebPageTask, jumboWebPageTask];

const executeWebPageTask = async (inputs: string[]) => {
  for (const task of webPageTasks) {
    if (task.isResponsibleFor(inputs)) {
      let count = 0;
      const content = [];
      const urlStrings = await task.getPaginationUrlStrings(inputs);
      console.log(urlStrings);
      for (const urlString of urlStrings) {
        content.push(...(await task.getContent(urlString)));
        if (count === 1) {
          break;
        }
        count = count + 1;
      }
      console.log(content);
    }
  }
};

const loadJsonAndExecuteWebPageTask = async (inputs: string[]) => {
  const [type, company, name] = inputs;
  const file = await readFile(`./src/data/${type}/${company}.json`, "utf8");
  const list: { name: string; url: string }[] = JSON.parse(file);
  const item = list.find((item) => item.name.toLowerCase() === name.toLocaleLowerCase());
  if (item) {
    await executeWebPageTask([item.url]);
  }
};

const main = async () => {
  const inputs = process.argv.slice(2);
  if (inputs.length > 0) {
    if (inputs[0] === "list") {
      const directoryPath = inputs[1];
      if (FileUtils.isDirectoryPath(directoryPath)) {
        FileUtils.listMacOSMetadataFiles(directoryPath);
      }
    } else if (inputs[0] === "delete") {
      const directoryPath = inputs[1];
      if (FileUtils.isDirectoryPath(directoryPath)) {
        await FileUtils.deleteMacOSMetadataFiles(directoryPath);
      }
    } else if (inputs[0] === "exchange-rate") {
      const from = inputs[1];
      const to = inputs[2];
      CurrencyUtils.printExchangeRates(from, to);
    } else {
      await loadJsonAndExecuteWebPageTask(inputs);
    }
  } else {
    await executeWebPageTask(inputs);
  }
};

main();
