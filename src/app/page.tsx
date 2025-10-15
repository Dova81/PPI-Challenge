'use client';

import CurrencyConverter from '../components/currencyConverter/CurrencyConverter';
import Banner from '../components/banner/Banner';
import Header from '../components/header/Header';

export default function Home() {
    return (
        <div className="font-sans">
            <Header />
            <Banner />
            <main className="-mt-36 relative z-20">
                <div className="mx-auto max-w-7xl px-4">
                    <CurrencyConverter />
                </div>
            </main>
        </div>
    );
}
