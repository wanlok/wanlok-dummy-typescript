import { Dummy } from "./logic/Dummy";
import { FileUtils } from "./logic/FileUtils";

const main = async () => {
  // Dummy.download("https://www.google.com/search?q=1+AUD+to+HKD", "");
  const command = process.argv[2];
  const directoryPath = process.argv[3];
  if (command === "list") {
    if (FileUtils.isDirectoryPath(directoryPath)) {
      FileUtils.listMacOSMetadataFiles(directoryPath);
    }
  } else if (command === "delete") {
    if (FileUtils.isDirectoryPath(directoryPath)) {
      await FileUtils.deleteMacOSMetadataFiles(directoryPath);
    }
  }
};

main();
