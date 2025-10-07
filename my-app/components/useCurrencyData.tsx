"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCurrencies, fetchRates, RatesResponse, type CurrencyInfo } from "../lib/exchange";

export default function useCurrencyData(base = "EUR") {
  const queryClient = useQueryClient();

  const currenciesQuery = useQuery<CurrencyInfo[], Error>({
    queryKey: ["currencies"],
    queryFn: fetchCurrencies,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const ratesQuery = useQuery<RatesResponse, Error>({
    queryKey: ["rates", base],
    queryFn: () => fetchRates(base),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const loading = currenciesQuery.isLoading || ratesQuery.isLoading;
  const error = (currenciesQuery.error && currenciesQuery.error.message) || (ratesQuery.error && ratesQuery.error.message) || null;

  const fetchRatesFn = async (b?: string) => {
    const bb = b || base;
    const data = await fetchRates(bb);
    queryClient.setQueryData(["rates", bb], data);
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
