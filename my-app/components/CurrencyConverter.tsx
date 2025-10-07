"use client";

import React, { useMemo, useState } from "react";
import useCurrencyData from "./useCurrencyData";
import CurrencySelect from "./CurrencySelect";
import SwitchButton from "./SwitchButton";
import CurrencyAmountInput from "./CurrencyAmountInput";
import { getCurrencySymbol } from "../lib/currency";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(1);
  const [from, setFrom] = useState<string>("EUR");
  const [to, setTo] = useState<string>("USD");
  const { currencies, rates, loading, error } = useCurrencyData(from);

  const [localCurrencies] = useState(() => [
    { code: "EUR", label: "Euro", symbol: "€" },
    { code: "USD", label: "Dollar", symbol: "$" },
  ]);

  const effectiveCurrencies = currencies.length ? currencies : localCurrencies;

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
  const updatedDisplay = rates
    ? new Intl.DateTimeFormat(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      }).format(new Date(rates.date))
    : null;
  return (
    <div className="px-4 py-10">
      <div className="bg-white rounded-xl shadow-xl p-8">
  <div className="grid grid-cols-1 sm:grid-cols-[3fr_3fr_1fr_3fr] gap-4 items-center">
          <CurrencyAmountInput
            label="Amount"
            value={amount}
            onChange={(v) => setAmount(v)}
            symbol={getCurrencySymbol(currencies, from, from)}
          />

          <CurrencySelect
            label="From"
            value={from}
            options={currencies}
            onChange={(v) => setFrom(v)}
          />

          <div className="flex justify-start sm:justify-center">
            <SwitchButton
              onClick={() => {
                const f = from;
                setFrom(to);
                setTo(f);
              }}
            />
          </div>

          <CurrencySelect
            label="To"
            value={to}
            options={currencies}
            onChange={(v) => setTo(v)}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div>
            {loading && <div className="text-sm text-gray-500">Loading rates…</div>}
            {error && <div className="text-sm text-red-600">{error}</div>}

            {!loading && !error && (
              <>
                <div className="text-lg sm:text-xl font-semibold text-black mb-1">
                  {amount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {from} =
                </div>
                <div className="text-2xl sm:text-3xl font-semibold text-black mb-2">
                  {getCurrencySymbol(effectiveCurrencies, to, '')} {converted ?? "—"} {to}
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
            <div className="mt-15 bg-blue-50 text-[#0b2f5a] p-4 rounded-lg shadow-sm">
              We use the mid-market rate for our Converter. This is for informational purposes only. You won’t
              receive this rate when sending money.
            </div>

            <div className="text-xs text-gray-500 mt-3">
              {rates && (
                <span>
                  Last updated: {updatedDisplay} 
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
