"use client";

import React from "react";
import { controlBase, inputBase, controlPadding, focusRing } from "../lib/styles";

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
      {label && <label className="text-sm text-gray-600 block mb-1 font-semibold">{label}</label>}
      <div className="relative">
        <select
          className={`${inputBase} ${controlBase} ${controlPadding} min-h-[44px] pr-10 appearance-none ${focusRing}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((o) => (
            <option key={o.code} value={o.code}>
              {o.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
            <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
