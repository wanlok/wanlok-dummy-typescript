import * as fs from "fs";
import * as path from "path";

const listDirectoryPath = (directoryPath: string, listDirectory: boolean) => {
  let filePaths: string[] = [];
  fs.readdirSync(directoryPath).forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const isDirectory = fs.statSync(filePath).isDirectory();
    if ((listDirectory && isDirectory) || !isDirectory) {
      filePaths.push(filePath);
    }
    if (isDirectory) {
      filePaths = filePaths.concat(listDirectoryPath(filePath, listDirectory));
    }
  });
  return filePaths;
};

const listMacOSMetadataFiles = (directoryPath: string) => {
  const filePaths = FileUtils.listDirectoryPath(directoryPath, false);
  for (const filePath of filePaths) {
    const fileName = filePath.substring(filePath.lastIndexOf(path.sep) + 1);
    if (fileName === ".DS_Store" || fileName.startsWith("._")) {
      console.log(filePath);
    }
  }
};

export const FileUtils = {
  listDirectoryPath,
  listMacOSMetadataFiles
};
