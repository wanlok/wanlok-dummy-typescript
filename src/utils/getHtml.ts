import { chromium } from "playwright";

const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const headers = {
  "User-Agent": userAgent,
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9"
};

const getHtmlWithBrowser = async (urlString: string): Promise<string | null> => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ userAgent });
    const response = await page.goto(urlString, { waitUntil: "load" });
    if (!response || !response.ok()) {
      return null;
    }
    await page.waitForTimeout(10000);
    return await page.content();
  } finally {
    await browser.close();
  }
};

const getHtmlWithFetch = async (urlString: string): Promise<string | null> => {
  const response = await fetch(urlString, { headers });
  if (!response.ok) {
    return null;
  }
  return await response.text();
};

export const getHtml = async (urlString: string, isBrowserUsed = false): Promise<string | null> => {
  return isBrowserUsed ? await getHtmlWithBrowser(urlString) : await getHtmlWithFetch(urlString);
};
