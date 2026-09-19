import { saveKeyFactsSheets } from "../utils/saveKeyFactsSheets";

export const keyFactsSheet = () => {
  (async () => {
    await saveKeyFactsSheets(
      "https://lmg.athena.com.au/key-facts-sheet",
      "Select an Apollo rate",
      "/Users/wanlok/Files/Projects/a/lmg_kfs.csv",
      "/Users/wanlok/Files/Projects/a/lmg_kfs_200000_30",
      200000,
      30
    );
    await saveKeyFactsSheets(
      "https://mortgagechoice.athena.com.au/key-facts-sheet",
      "Select a Mortgage Choice Freedom rate",
      "/Users/wanlok/Files/Projects/a/mcf_kfs.csv",
      "/Users/wanlok/Files/Projects/a/mcf_kfs_200000_30",
      200000,
      30
    );
  })().catch((err) => console.error(err));
};
