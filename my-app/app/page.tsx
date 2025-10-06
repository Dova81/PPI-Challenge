"use client";

import Image from "next/image";
import CurrencyConverter from "../components/CurrencyConverter";

export default function Home() {
  return (
    <div className="font-sans">
      <header className="bg-[#0E1342] text-white py-6 px-6">
      <h1 className="font-inter font-semibold text-[22px] leading-[20px] tracking-[0]">
          Currency exchange
        </h1>
      </header>
      <header className="bg-[#1A8DFF] text-white py-12 px-6 rounded-b-lg shadow-md">
        <p className="text-center mt-6 text-lg sm:text-2xl font-bold">
          100 EUR to USD - Convert Euros to US Dollars
        </p>
      </header>

      <main className="-mt-8">
        <div className="mx-auto max-w-4xl">
          <CurrencyConverter />
        </div>
      </main>

    </div>
  );
}
