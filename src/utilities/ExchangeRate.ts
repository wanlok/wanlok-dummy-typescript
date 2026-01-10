const getJson = async (urlString: string) => {
  const response = await fetch(urlString);
  if (!response.ok) {
    throw new Error(JSON.stringify(response));
  }
  return await response.json();
};

const getExchangeRate1 = async (from: string, to: string) => {
  let exchangeRate: number | null = null;
  const urlString = `https://api.exchangerate-api.com/v4/latest/${from}?to=${to}`;
  try {
    const json = (await getJson(urlString)) as {
      rates: { [key: string]: number | undefined };
    };
    const rate = json.rates[to];
    if (rate !== undefined) {
      exchangeRate = rate;
    }
  } catch (e) {
    console.log(e);
  }
  return exchangeRate;
};

export const ExchangeRate = {
  get: async (from: string, to: string) => {
    console.log(await getExchangeRate1(from, to));
  }
};
