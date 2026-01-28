export type ImageUrlNamePrice = { image_url: string; name: string; price: string };

export type NamePrice = { name: string; price: string }[];

export interface WebPageTask {
  isResponsibleFor(inputs: string[]): boolean;
  getPaginationUrlStrings(inputs: string[]): Promise<string[]>;
  getContent(urlString: string): Promise<Record<string, unknown>[]>;
}
