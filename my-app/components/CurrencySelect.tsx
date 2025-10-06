"use client";

import React from "react";

type Option = { code: string; label: string; symbol?: string };

type Props = {
  label?: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
};

export default function CurrencySelect({ label, value, options, onChange, className = "" }: Props) {
  return (
    <div className={className}>
      {label && <label className="text-sm text-gray-600 block mb-1">{label}</label>}
      <select
        className="w-full border border-gray-200 rounded-md px-3 py-2 bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.code} value={o.code}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
