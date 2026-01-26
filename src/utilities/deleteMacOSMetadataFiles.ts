import { isMacOSMetadataFile } from "./isMacOSMetadataFile";
import { listDirectoryPath } from "./listDirectoryPath";

export const deleteMacOSMetadataFiles = async (directoryPath: string) => {
  const filePaths = listDirectoryPath(directoryPath, false);
  const macOSMetadataFiles = filePaths.filter(isMacOSMetadataFile);
  await (await import("trash")).default(macOSMetadataFiles);
};
