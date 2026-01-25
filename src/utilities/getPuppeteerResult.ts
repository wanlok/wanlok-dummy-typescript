import puppeteer, { EvaluateFunc, PuppeteerLifeCycleEvent } from "puppeteer";

export const getPuppeteerResult = async <T>({
  headless = true,
  waitUntil = "networkidle2",
  urlString,
  evaluate
}: {
  headless?: boolean;
  waitUntil?: PuppeteerLifeCycleEvent | PuppeteerLifeCycleEvent[] | undefined;
  urlString: string;
  evaluate: EvaluateFunc<[string]>;
}): Promise<T> => {
  const browser = await puppeteer.launch({ headless });
  const [page] = await browser.pages();
  await page.goto(urlString, { waitUntil });
  const result = await page.evaluate(evaluate, urlString);
  await browser.close();
  return result as T;
};
