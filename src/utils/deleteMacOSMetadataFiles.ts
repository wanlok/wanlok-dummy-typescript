import { isDirectoryPath } from "./isDirectoryPath";
import { isMacOSMetadataFile } from "./isMacOSMetadataFile";
import { listDirectoryPath } from "./listDirectoryPath";

export const deleteMacOSMetadataFiles = async (inputs: string[]) => {
  const [, directoryPath] = inputs;
  if (!isDirectoryPath(directoryPath)) {
    return;
  }
  const filePaths = listDirectoryPath(directoryPath, false);
  const macOSMetadataFiles = filePaths.filter(isMacOSMetadataFile);
  await (await import("trash")).default(macOSMetadataFiles);
};
