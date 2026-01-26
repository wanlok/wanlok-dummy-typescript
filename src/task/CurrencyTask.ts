import { getJson } from "../utilities/getJson";

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
    console.log(e);
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
    console.log(e);
  }
  return exchangeRate;
};

export const currencyTask = {
  getExchangeRates: async (inputs: string[]) => {
    const [, from, to] = inputs.map((input) => input.toUpperCase());
    const exchangeRates = await Promise.all([getExchangeRate1(from, to), getExchangeRate2(from, to)]);
    for (const exchangeRate of exchangeRates) {
      console.log(exchangeRate);
    }
  }
};
