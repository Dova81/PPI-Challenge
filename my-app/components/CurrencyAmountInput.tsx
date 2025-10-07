"use client";

import React from "react";
import { sanitizeAmount } from "../lib/number";

type Props = {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  symbol?: string;
  min?: number;
  className?: string;
};

export default function CurrencyAmountInput({ label, value, onChange, symbol, min = 0, className = "" }: Props) {
  const isNegative = value < 0;

  const wrapperClass = `flex items-center rounded-md overflow-hidden ${isNegative ? "border border-red-500" : "border border-gray-200"}`;

  return (
    <div className={className}>
      {label && (
        <label className={`text-sm block font-semibold mb-1 ${isNegative ? "text-red-600" : "text-gray-600"}`}>{label}</label>
      )}
      <div className={wrapperClass}>
        <div className="px-3 text-gray-700 bg-gray-50">{symbol}</div>
        <input
          className="w-full px-3 py-2 bg-white text-black"
          value={value}
          onChange={(e) => onChange(sanitizeAmount(e.target.value, min))}
          type="number"
          min={min}
          aria-invalid={isNegative}
          aria-describedby={isNegative ? `${label ?? "amount"}-error` : undefined}
        />
      </div>

      {isNegative && (
        <p id={`${label ?? "amount"}-error`} role="alert" className="mt-1 text-sm text-red-600">
          El monto no puede ser negativo.
        </p>
      )}
    </div>
  );
}

// sanitizeAmount moved to lib/number.ts
