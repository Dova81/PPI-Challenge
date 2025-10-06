"use client";

import React, { useEffect, useMemo, useState } from "react";
import { fetchRates, fetchCurrencies, RatesResponse } from "../lib/exchange";
import CurrencySelect from "./CurrencySelect";
import SwitchButton from "./SwitchButton";
import CurrencyAmountInput from "./CurrencyAmountInput";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(100);
  const [from, setFrom] = useState<string>("EUR");
  const [to, setTo] = useState<string>("USD");
  const [rates, setRates] = useState<RatesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currencies, setCurrencies] = useState<Array<{ code: string; label: string; symbol?: string }>>([
    { code: "EUR", label: "Euro", symbol: "€" },
    { code: "USD", label: "Dollar", symbol: "$" },
  ]);

  // load currencies and initial rates
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    Promise.all([fetchCurrencies(), fetchRates()])
      .then(([cu, r]) => {
        if (!mounted) return;
        if (Array.isArray(cu) && cu.length) setCurrencies(cu);
        setRates(r);
      })
      .catch((e) => {
        console.error(e);
        if (mounted) setError("Failed to load data");
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  const rate = useMemo(() => {
    if (!rates) return null;
    const base = rates.base;
    // rates.rates is mapping from code -> value relative to base
    if (from === base) {
      return rates.rates[to];
    }
    if (to === base) {
      return 1 / rates.rates[from];
    }
    // convert from->base->to
    return (1 / rates.rates[from]) * rates.rates[to];
  }, [rates, from, to]);

  const converted = rate ? +(amount * rate).toFixed(6) : null;
  return (
    <div className="px-4 py-10">
      <div className="bg-white rounded-xl shadow-xl p-8">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
          <CurrencyAmountInput
            label="Amount"
            value={amount}
            onChange={(v) => setAmount(v)}
            symbol={currencies.find((c) => c.code === from)?.symbol ?? from}
            className="sm:col-span-1"
          />

          <CurrencySelect
            label="From"
            value={from}
            options={currencies}
            onChange={(v) => setFrom(v)}
            className="sm:col-span-1"
          />

          <SwitchButton
            onClick={() => {
              const f = from;
              setFrom(to);
              setTo(f);
            }}
          />

          <CurrencySelect
            label="To"
            value={to}
            options={currencies}
            onChange={(v) => setTo(v)}
            className="sm:col-span-1"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div>
            {loading && <div className="text-sm text-gray-500">Loading rates…</div>}
            {error && <div className="text-sm text-red-600">{error}</div>}

            {!loading && !error && (
              <>
                <div className="text-lg sm:text-xl font-extrabold mb-1">
                  {amount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {from} =
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
                  {currencies.find((c) => c.code === to)?.symbol ?? ''} {converted ?? "—"} {to}
                </div>
                <div className="text-sm text-gray-500">
                  {rates && (
                    <>1 {to} = {(rate ? (1 / rate).toFixed(6) : "—")} {from}</>
                  )}
                </div>
              </>
            )}
          </div>

          <div>
            <div className="bg-blue-50 text-[#0b2f5a] p-4 rounded-lg shadow-sm">
              We use the mid-market rate for our Converter. This is for informational purposes only. You won’t
              receive this rate when sending money.
            </div>

            <div className="text-xs text-gray-500 mt-3">
              {rates && <span>Last updated: {rates.date}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
