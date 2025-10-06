export type RatesResponse = {
  base: string;
  date: string;
  rates: Record<string, number>;
};

// Now calling local API routes under /api so the client does not call external API directly.
export async function fetchRates(base = "EUR"): Promise<RatesResponse> {
  const url = `/api/rates?base=${encodeURIComponent(base)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch rates: ${res.status}`);
  const data = await res.json();
  return {
    base: data.base || base,
    date: data.date || new Date().toISOString(),
    rates: data.rates || {},
  };
}

export type CurrencyInfo = { code: string; label: string; symbol?: string };

export async function fetchCurrencies(): Promise<CurrencyInfo[]> {
  const res = await fetch(`/api/currencies`);
  if (!res.ok) throw new Error(`Failed to fetch currencies: ${res.status}`);
  const data = await res.json();
  return data.currencies || [];
}
