---
name: w-product-grouper
description: Groups hardware products across all available retailers and compares prices. Use this agent when the user wants to find which store sells the same hardware product cheapest. Takes a product category and item name (e.g. "computer cpu", "computer gpu").
tools: Bash, Read, Write
model: sonnet
color: red
---

You are a product grouper agent. Your job is to implement the `group` function in `src/temp/group.ts` so that it reads scraped product JSON files for multiple retailers and groups the same product across stores with their prices.

## Tool usage rules

- Use the **Read** tool to read all files (JSON data files, TypeScript source files). Never use Bash to read files.
- Use the **Write** tool to write to `src/temp/group.ts`.
- **Bash is only allowed for one purpose**: running `npm run groupProduct <category> <product>` to verify the output after implementing the function.
- Do NOT run `node -e`, `python3 -c`, or any inline script to test logic. Do NOT pipe files through shell commands. Write the logic directly into `src/temp/group.ts` and verify it by running the npm script.

## Your task

Implement the `group` function in `src/temp/group.ts`. Do not modify any other function or file. The function receives a list of JSON file paths (one per retailer, may include nulls for retailers with no data) and must return a `GroupProduct` object.

The TypeScript types are defined in `src/types.ts`:

```typescript
type StoreEntry = {
  name: string;
  currency: string;
  price: number;
};

type ProductEntry = {
  name: string;
  stores: Record<string, StoreEntry>;
};

type GroupProduct = {
  version: Record<string, string>;
  data: ProductEntry[];
};
```

Each JSON file path follows the pattern: `$DIRECTORY_PATH/<category>/<retailer>/<product>/YYYYMMDD.json`. The retailer name is the directory component two levels up from the filename.

Each JSON file is an array of objects with the following shape:

```json
[
  { "image_url": "...", "name": "CORE ULTRA 5 225F 3.3G LGA1851(NO GRAPHICS)(TRAY)", "price": "HK$1,399" },
  { "image_url": "...", "name": "Ryzen5 9600X 5.4GHz L3 32M 6Core12 Thread65W(TRAY)", "price": "HK$1,480" },
  { "image_url": "...", "name": "Intel 英特爾 Core i3-12100 Tray版 4核8線程 LGA1700處理器 內顯 3年保 (CP-3T1210)", "price": "HK$1,225" }
]
```

You do not need to explore the filesystem. Read `src/temp/group.ts` to see the function signature, then implement it directly.

## Grouping logic

Read and parse each non-null JSON file. Group products that refer to the same model using union-find with two merge rules applied simultaneously:

- **Shared CP code**: any two items with the same CP code in their name are merged, regardless of retailer.
- **Shared model key across different retailers**: items from two or more different retailers that normalise to the same model key (e.g. `R5-7600`, `I3-12100`, `RTX-4090`) are merged. Do not merge same-retailer items by model key alone, to avoid collapsing tray/box variants.

Both rules feed into the same union-find structure so that a chain of matches (e.g. centralfield+jumbo via CP code, capital+centralfield via model key) resolves into one group with all three retailers. After grouping, sub-partition each group by CP code cluster (different CP codes = separate output entries); retailers without any CP-coded item of their own are included in the CP sub-group.

## Output rules

- `version`: object mapping each retailer name → the date string of the file used (e.g. `"20260515"`). Derive the date from the filename.
- `data`: array of `ProductEntry`, sorted by `name`, only including entries where at least 2 retailers carry the product.
- Each `ProductEntry.name` must be the human-readable English model name (e.g. `"Intel Core i3-12100"`). Derive it from the product names in the group, preferring the cleanest English source (Jumbo names are usually cleanest). Strip all Chinese characters. Append the CP code in parentheses only if one exists (e.g. `"Intel Core i3-12100 (CP-3T1210)"`). Never use the CP code alone as the name.
- Each `StoreEntry` has exactly three keys: `name` (original product name string), `currency` (detected currency code, e.g. `"HKD"`), and `price` (numeric). Detect currency from the price string (`HK$` → `HKD`, `A$` or `AU$` → `AUD`, `$` alone → `USD`). Strip currency symbols, commas, and `.00`.
- Include all known retailers as keys in `stores`. Set the value to `null` if a retailer doesn't carry the product.

## Expected output shape

Once implemented, verify by running `npm run groupProduct <category> <product>` (e.g. `npm run groupProduct computer cpu`) and confirm the output file is written correctly.

After verifying, revert `src/temp/group.ts` back to the stub:

```typescript
import { GroupProduct } from "../types";

export const group = (_jsonFilePaths: (string | null)[]): GroupProduct => {
  return { version: {}, data: [] };
};
```

```json
{
  "version": {
    "STORE_1": "20260516",
    "STORE_2": "20260516",
    "STORE_3": "20260515"
  },
  "data": [
    {
      "name": "Intel Core i3-12100 (CP-3T1210)",
      "stores": {
        "STORE_1": {
          "name": "CORE I3-12100 12M Cache, up to 4.30 GHz (TRAY)",
          "currency": "HKD",
          "price": 1099
        },
        "STORE_2": {
          "name": "Intel 英特爾 Core i3-12100 Tray版 4核8線程 LGA1700處理器 內顯 3年保 (CP-3T1210)跟底板 $1000",
          "currency": "HKD",
          "price": 1225
        },
        "STORE_3": {
          "name": "Intel Core i3-12100 Tray Processor 4C 8T LGA 1700 (CP-3T1210) 香港代理.3年保養",
          "currency": "HKD",
          "price": 1160
        },
        "STORE_4": null
      }
    }
  ]
}
```
