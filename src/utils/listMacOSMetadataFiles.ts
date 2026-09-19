import { isDirectoryPath } from "./isDirectoryPath";
import { isMacOSMetadataFile } from "./isMacOSMetadataFile";
import { listDirectoryPath } from "./listDirectoryPath";

export const listMacOSMetadataFiles = (inputs: string[]) => {
  const [, directoryPath] = inputs;
  if (!isDirectoryPath(directoryPath)) {
    return;
  }
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
