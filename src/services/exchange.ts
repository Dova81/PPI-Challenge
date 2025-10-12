export type RatesResponse = {
  base: string;
  date: string;
  rates: Record<string, number>;
};

export async function fetchRates(base = 'EUR'): Promise<RatesResponse> {
  const url = `https://api.vatcomply.com/rates?base=${encodeURIComponent(base)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch rates: ${res.status}`);
  const data = await res.json();
  return {
    base: data.base || base,
    date: data.date || new Date().toISOString(),
    rates: data.rates || {},
  };
}

export type CurrencyInfo = { name: string; symbol?: string };

export async function fetchCurrencies(): Promise<CurrencyInfo[]> {
  const res = await fetch(`https://api.vatcomply.com/currencies`);
  if (!res.ok) throw new Error(`Failed to fetch currencies: ${res.status}`);
  const data = await res.json();
  return Object.values(data) || [];
}
