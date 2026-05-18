import { GroupProduct } from "../types";

export const group = (_jsonFilePaths: (string | null)[]): GroupProduct => {
  return { version: {}, data: [] };
};
