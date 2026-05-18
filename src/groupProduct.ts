import "dotenv/config";
import { sep } from "path";
import { getJsonFilePaths } from "./utilities/getJsonFilePaths";
import { group } from "./temp/group";
import { writeJson } from "./utilities/writeJson";

const groupProduct = async () => {
  const [category, product] = process.argv.slice(2);
  const categoryPath = [process.env.DIRECTORY_PATH, category].join(sep);
  const jsonFilePaths = getJsonFilePaths(categoryPath, product);
  const content = group(jsonFilePaths);
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const filePath = [categoryPath, `${product}_${today}.json`].join(sep);
  await writeJson(content, filePath);
};

groupProduct();
