import { statSync } from "fs";

export const isDirectoryPath = (directoryPath?: string): boolean => {
  if (!directoryPath || directoryPath.length === 0) {
    return false;
  }
  return statSync(directoryPath).isDirectory();
};
