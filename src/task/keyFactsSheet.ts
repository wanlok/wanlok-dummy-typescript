import { saveKeyFactsSheets } from "../utils/saveKeyFactsSheets";

export const keyFactsSheet = () => {
  (async () => {
    // await saveKeyFactsSheets(
    //   "https://lmg.athena.com.au/key-facts-sheet",
    //   "Select an Apollo rate",
    //   "/Users/wanlok/Files/Projects/a/kfs/lmg_kfs.csv",
    //   "/Users/wanlok/Files/Projects/a/kfs/lmg_kfs_200000_30",
    //   200000,
    //   30
    // );
    // await saveKeyFactsSheets(
    //   "https://mortgagechoice.athena.com.au/key-facts-sheet",
    //   "Select a Mortgage Choice Freedom rate",
    //   "/Users/wanlok/Files/Projects/a/kfs/mcf_kfs.csv",
    //   "/Users/wanlok/Files/Projects/a/kfs/mcf_kfs_200000_30",
    //   200000,
    //   30
    // );
    await saveKeyFactsSheets(
      "https://lmg.athena.com.au/key-facts-sheet",
      "Select an Apollo rate",
      "/Users/wanlok/Files/Projects/a/kfs/lmg_kfs.csv",
      "/Users/wanlok/Files/Projects/a/kfs/lmg_kfs_400000_30_json",
      "/Users/wanlok/Files/Projects/a/kfs/lmg_kfs_400000_30",
      400000,
      30
    );
    await saveKeyFactsSheets(
      "https://mortgagechoice.athena.com.au/key-facts-sheet",
      "Select a Mortgage Choice Freedom rate",
      "/Users/wanlok/Files/Projects/a/kfs/mcf_kfs.csv",
      "/Users/wanlok/Files/Projects/a/kfs/mcf_kfs_400000_30_json",
      "/Users/wanlok/Files/Projects/a/kfs/mcf_kfs_400000_30",
      400000,
      30
    );
  })().catch((err) => console.error(err));
};
