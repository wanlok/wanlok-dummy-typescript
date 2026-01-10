import { getJson } from "./APIUtils";

const getExchangeRate1 = async (from: string, to: string) => {
  let exchangeRate: number | null = null;
  const urlString = `https://api.exchangerate-api.com/v4/latest/${from}?to=${to}`;
  try {
    const json = (await getJson(urlString)) as {
      rates: { [key: string]: number | undefined };
    };
    const rate = json.rates[to];
    if (rate === undefined) {
      throw new Error(`Exchange rate from ${from} to ${to} not found`);
    }
    exchangeRate = rate;
  } catch (e) {
    // console.log(e);
  }
  return exchangeRate;
};

const getExchangeRate2 = async (from: string, to: string) => {
  let exchangeRate: number | null = null;
  const urlString = `https://hexarate.paikama.co/api/rates/${from}/${to}/latest`;
  try {
    const json = (await getJson(urlString)) as {
      data: {
        mid: number;
      };
    };
    exchangeRate = json.data.mid;
  } catch (e) {
    // console.log(e);
  }
  return exchangeRate;
};

const getExchangeRates = async (from: string, to: string) => {
  return await Promise.all([getExchangeRate1(from, to), getExchangeRate2(from, to)]);
};

export const CurrencyUtils = {
  getExchangeRates: async (from: string, to: string): Promise<(number | null)[]> => {
    return await getExchangeRates(from, to);
  },
  printExchangeRates: async (from: string, to: string) => {
    const exchangeRates = await getExchangeRates(from, to);
    for (const exchangeRate of exchangeRates) {
      console.log(exchangeRate);
    }
  }
};
