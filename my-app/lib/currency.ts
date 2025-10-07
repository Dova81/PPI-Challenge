import type { CurrencyInfo } from "./exchange";

export function getCurrencySymbol(currencies: CurrencyInfo[] | undefined, code: string, fallback = "") {
  if (!currencies) return fallback;
  const found = currencies.find((c) => c.code === code);
  return found?.symbol ?? fallback;
}

