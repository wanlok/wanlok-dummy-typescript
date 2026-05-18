export type ImageUrlNamePrice = { image_url: string; name: string; price: string };

export interface WebPageTask {
  isResponsibleFor(urlString: string): boolean;
  getPaginationUrlStrings(urlString: string): Promise<string[]>;
  getContent(urlString: string): Promise<Record<string, unknown>[]>;
}

export type StoreEntry = {
  name: string;
  currency: string;
  price: number;
};

export type ProductEntry = {
  name: string;
  stores: Record<string, StoreEntry | null>;
};

export type GroupProduct = {
  version: Record<string, string>;
  data: ProductEntry[];
};
