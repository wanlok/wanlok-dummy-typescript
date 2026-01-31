import { currencyTask } from "./task/currencyTask";
import { deleteMacOSMetadataFiles } from "./utilities/deleteMacOSMetadataFiles";
import { readJsonAndGetWebPageContent } from "./utilities/readJsonAndGetWebPageContent";
import { getWebPageContent } from "./utilities/getWebPageContent";
import { listMacOSMetadataFiles } from "./utilities/listMacOSMetadataFiles";

const main = async () => {
  const inputs = process.argv.slice(2);
  if (inputs.length > 1) {
    if (inputs[0] === "list") {
      listMacOSMetadataFiles(inputs);
    } else if (inputs[0] === "delete") {
      await deleteMacOSMetadataFiles(inputs);
    } else if (inputs[0] === "fx") {
      currencyTask.getExchangeRates(inputs);
    } else {
      await readJsonAndGetWebPageContent(inputs);
    }
  } else if (inputs.length > 0) {
    const content = await getWebPageContent(inputs as [string]);
    console.log(content);
  }
};

main();
