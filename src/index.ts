import { centralfieldWebPageTask } from "./task/CentralfieldWebPageTask";
import { jumboComputerWebPageTask } from "./task/JumboComputerWebPageTask";
import { CurrencyUtils } from "./utilities/CurrencyUtils";
import { FileUtils } from "./utilities/FileUtils";

const webPageTasks = [centralfieldWebPageTask, jumboComputerWebPageTask];

const executeWebPageTask = async (inputs: string[]) => {
  for (const task of webPageTasks) {
    if (task.isResponsibleFor(inputs)) {
      let count = 0;
      const content = [];
      const urlStrings = await task.getPaginationUrlStrings(inputs);
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

const main = async () => {
  const inputs = process.argv.slice(2);
  const [command] = inputs;
  if (command === "list") {
    const directoryPath = process.argv[3];
    if (FileUtils.isDirectoryPath(directoryPath)) {
      FileUtils.listMacOSMetadataFiles(directoryPath);
    }
  } else if (command === "delete") {
    const directoryPath = process.argv[3];
    if (FileUtils.isDirectoryPath(directoryPath)) {
      await FileUtils.deleteMacOSMetadataFiles(directoryPath);
    }
  } else if (command === "exchange-rate") {
    const from = process.argv[3];
    const to = process.argv[4];
    CurrencyUtils.printExchangeRates(from, to);
  } else {
    await executeWebPageTask(inputs);
  }
};

main();
