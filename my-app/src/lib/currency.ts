import type { CurrencyInfo } from '../services/exchange';

export function getCurrencySymbol(
  currencies: CurrencyInfo[] | undefined,
  code: string,
  fallback = ''
) {
  if (!currencies) return fallback;
  const found = currencies.find((c) => c.name === code);
  return found?.symbol ?? fallback;
}
