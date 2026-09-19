import { sep } from "path";

export const isMacOSMetadataFile = (filePath: string): boolean => {
  const fileName = filePath.substring(filePath.lastIndexOf(sep) + 1);
  return fileName === ".DS_Store" || fileName.startsWith("._");
};
