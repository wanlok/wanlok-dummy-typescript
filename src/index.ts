import { currencyTask } from "./task/currencyTask";
import { deleteMacOSMetadataFiles } from "./utilities/deleteMacOSMetadataFiles";
import { getWebPageContent, loadJsonAndGetWebPageContent } from "./utilities/getWebPageContent";
import { listMacOSMetadataFiles } from "./utilities/listMacOSMetadataFiles";

const main = async () => {
  const inputs = process.argv.slice(2);
  if (inputs.length > 0) {
    if (inputs[0] === "list") {
      listMacOSMetadataFiles(inputs);
    } else if (inputs[0] === "delete") {
      await deleteMacOSMetadataFiles(inputs);
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
