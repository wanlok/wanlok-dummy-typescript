import { join } from "path";
import { readdirSync } from "fs";
import { isDirectoryPath } from "./isDirectoryPath";

export const listDirectoryPath = (directoryPath: string, listDirectory: boolean) => {
  let filePaths: string[] = [];
  readdirSync(directoryPath).forEach((file) => {
    const filePath = join(directoryPath, file);
    const isDirectory = isDirectoryPath(filePath);
    if ((listDirectory && isDirectory) || !isDirectory) {
      filePaths.push(filePath);
    }
    if (isDirectory) {
      filePaths = filePaths.concat(listDirectoryPath(filePath, listDirectory));
    }
  });
  return filePaths;
};
