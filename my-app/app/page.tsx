"use client";

import CurrencyConverter from "../components/CurrencyConverter";

export default function Home() {
  return (
    <div className="font-sans">
      <header className="bg-[#0E1342] text-white py-6 px-6">
        <h1 className="font-inter font-semibold text-[22px] leading-[20px] tracking-[0]">
          Currency exchange
        </h1>
      </header>

      <div className="relative">
        <div className="bg-[#1A8DFF] text-white pt-10 py-40 px-6 shadow-md z-10 relative">
          <p className="text-center text-lg sm:text-2xl">
            100 EUR to USD - Convert Euros to US Dollars
          </p>
        </div>

        <main className="-mt-36 relative z-20">
          <div className="mx-auto max-w-7xl px-4">
            <CurrencyConverter />
          </div>
        </main>
      </div>
    </div>
  );
}
