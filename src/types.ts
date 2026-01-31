export type ImageUrlNamePrice = { image_url: string; name: string; price: string };

export type NamePrice = { name: string; price: string }[];

export interface WebPageTask {
  isResponsibleFor(urlString: string): boolean;
  getPaginationUrlStrings(urlString: string): Promise<string[]>;
  getContent(urlString: string): Promise<Record<string, unknown>[]>;
}
