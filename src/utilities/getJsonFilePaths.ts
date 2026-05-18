import { readdirSync } from "fs";
import { sep } from "path";

/*
 * Example:
 *
 * [
 *   '/Users/wanlok/Files/Projects/responses/computer/capital/cpu/20260208.json',
 *   '/Users/wanlok/Files/Projects/responses/computer/centralfield/cpu/20260515.json',
 *   '/Users/wanlok/Files/Projects/responses/computer/jumbo/cpu/20260515.json'
 * ]
 *
 */
export const getJsonFilePaths = (categoryPath: string, product: string) => {
  return readdirSync(categoryPath, { withFileTypes: true })
    .filter((path) => path.isDirectory())
    .map(({ name }) => {
      const filePath = [categoryPath, name, product].join(sep);
      const files = readdirSync(filePath)
        .filter((fileName) => fileName.endsWith(".json"))
        .sort();
      const fileName = files.length > 0 ? files[files.length - 1] : null;
      return fileName ? [filePath, fileName].join(sep) : null;
    });
};
