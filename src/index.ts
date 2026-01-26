import { currencyTask } from "./task/CurrencyTask";
import { deleteMacOSMetadataFiles } from "./utilities/deleteMacOSMetadataFiles";
import { getWebPageContent, loadJsonAndGetWebPageContent } from "./utilities/getWebPageContent";
import { isDirectoryPath } from "./utilities/isDirectoryPath";
import { listMacOSMetadataFiles } from "./utilities/listMacOSMetadataFiles";

const main = async () => {
  const inputs = process.argv.slice(2);
  if (inputs.length > 0) {
    if (inputs[0] === "list") {
      const directoryPath = inputs[1];
      if (isDirectoryPath(directoryPath)) {
        listMacOSMetadataFiles(directoryPath);
      }
    } else if (inputs[0] === "delete") {
      const directoryPath = inputs[1];
      if (isDirectoryPath(directoryPath)) {
        await deleteMacOSMetadataFiles(directoryPath);
      }
    } else if (inputs[0] === "fx") {
      currencyTask.getExchangeRates(inputs);
    } else {
      const content = await loadJsonAndGetWebPageContent(inputs);
      console.log(content);
    }
  } else {
    const content = await getWebPageContent(inputs);
    console.log(content);
  }
};

main();
