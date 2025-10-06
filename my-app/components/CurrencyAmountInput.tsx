"use client";

import React from "react";

type Props = {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  symbol?: string;
  min?: number;
  className?: string;
};

export default function CurrencyAmountInput({ label, value, onChange, symbol, min = 0, className = "" }: Props) {
  return (
    <div className={className}>
      {label && <label className="text-sm text-gray-600 block mb-1">{label}</label>}
      <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
        <div className="px-3 text-gray-700 bg-gray-50">{symbol}</div>
        <input
          className="w-full px-3 py-2 bg-white"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          type="number"
          min={min}
        />
      </div>
    </div>
  );
}
