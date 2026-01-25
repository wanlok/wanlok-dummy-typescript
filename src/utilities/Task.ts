export interface Task {
  isResponsibleFor(inputs: string[]): boolean;
  getPageUrlStrings(inputs: string[]): Promise<string[]>;
  getContent(urlString: string): Promise<Record<string, unknown>[]>;
}
