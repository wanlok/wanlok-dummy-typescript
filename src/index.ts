import { ExchangeRate } from "./logic/ExchangeRate";
import { FileUtils } from "./logic/FileUtils";

const main = async () => {
  const command = process.argv[2];
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
    if (from && to) {
      ExchangeRate.get(from, to);
    }
  }
};

main();
