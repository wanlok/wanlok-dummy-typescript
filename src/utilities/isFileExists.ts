import { existsSync } from "fs";

export const isFileExists = (filePath: string) => {
  return existsSync(filePath);
};
