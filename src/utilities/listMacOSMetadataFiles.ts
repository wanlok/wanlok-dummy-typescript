import { isMacOSMetadataFile } from "./isMacOSMetadataFile";
import { listDirectoryPath } from "./listDirectoryPath";

export const listMacOSMetadataFiles = (directoryPath: string) => {
  const filePaths = listDirectoryPath(directoryPath, false);
  let count = 0;
  for (const filePath of filePaths) {
    if (isMacOSMetadataFile(filePath)) {
      count = count + 1;
      console.log(filePath);
    }
  }
  console.log("COUNT: " + count);
};
