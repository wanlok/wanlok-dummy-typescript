import { writeFile } from "node:fs/promises";

export const writeJson = async (content: Record<string, unknown>[], filePath: string) => {
  try {
    const jsonString = JSON.stringify(content, null, 2);
    await writeFile(filePath, jsonString, "utf8");
  } catch (error) {
    console.log(error);
  }
};
