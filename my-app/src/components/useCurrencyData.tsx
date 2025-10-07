'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCurrencies, fetchRates, RatesResponse, type CurrencyInfo } from '../lib/exchange';

export default function useCurrencyData(base = 'EUR') {
  const queryClient = useQueryClient();

  const currenciesQuery = useQuery<CurrencyInfo[], Error>({
    queryKey: ['currencies'],
    queryFn: fetchCurrencies,
  });

  const ratesQuery = useQuery<RatesResponse, Error>({
    queryKey: ['rates', base],
    queryFn: () => fetchRates(base),
  });

  const loading = currenciesQuery.isLoading || ratesQuery.isLoading;
  const error =
    (currenciesQuery.error && currenciesQuery.error.message) ||
    (ratesQuery.error && ratesQuery.error.message) ||
    null;

  const fetchRatesFn = async (b?: string) => {
    const bb = b || base;
    const data = await fetchRates(bb);
    queryClient.setQueryData(['rates', bb], data);
    return data;
  };

  return {
    currencies: currenciesQuery.data || [],
    rates: ratesQuery.data || null,
    loading,
    error,
    fetchRates: fetchRatesFn,
    fetchCurrencies: currenciesQuery.refetch,
  } as const;
}
