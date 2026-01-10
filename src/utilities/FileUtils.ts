import * as fs from "fs";
import * as path from "path";

const isDirectoryPath = (directoryPath?: string): boolean => {
  if (!directoryPath || directoryPath.length === 0) {
    return false;
  }
  return fs.statSync(directoryPath).isDirectory();
};

const listDirectoryPath = (directoryPath: string, listDirectory: boolean) => {
  let filePaths: string[] = [];
  fs.readdirSync(directoryPath).forEach((file) => {
    const filePath = path.join(directoryPath, file);
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

const isMacOSMetadataFile = (filePath: string): boolean => {
  const fileName = filePath.substring(filePath.lastIndexOf(path.sep) + 1);
  return fileName === ".DS_Store" || fileName.startsWith("._");
};

const listMacOSMetadataFiles = (directoryPath: string) => {
  const filePaths = FileUtils.listDirectoryPath(directoryPath, false);
  let count = 0;
  for (const filePath of filePaths) {
    if (isMacOSMetadataFile(filePath)) {
      count = count + 1;
      console.log(filePath);
    }
  }
  console.log("COUNT: " + count);
};

const deleteMacOSMetadataFiles = async (directoryPath: string) => {
  const filePaths = FileUtils.listDirectoryPath(directoryPath, false);
  const macOSMetadataFiles = filePaths.filter(isMacOSMetadataFile);
  await (await import("trash")).default(macOSMetadataFiles);
};

export const FileUtils = {
  isDirectoryPath,
  listDirectoryPath,
  listMacOSMetadataFiles,
  deleteMacOSMetadataFiles
};
