export interface Task {
  download(urlString: string, directoryPath: string): Promise<void>;
}
