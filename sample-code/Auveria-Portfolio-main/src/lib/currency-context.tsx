"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Currency {
  country: string;
  code: string;
  symbol: string;
  flag: string;
  rate: number;
}

export const currencies: Currency[] = [
  { country: "United Kingdom", code: "GBP", symbol: "£", flag: "🇬🇧", rate: 0.79 },
  { country: "United States", code: "USD", symbol: "$", flag: "🇺🇸", rate: 1.0 },
  { country: "European Union", code: "EUR", symbol: "€", flag: "🇪🇺", rate: 0.92 },
  { country: "Australia", code: "AUD", symbol: "$", flag: "🇦🇺", rate: 1.52 },
  { country: "Canada", code: "CAD", symbol: "$", flag: "🇨🇦", rate: 1.35 },
  { country: "Japan", code: "JPY", symbol: "¥", flag: "🇯🇵", rate: 150.0 },
  { country: "Switzerland", code: "CHF", symbol: "CHF", flag: "🇨🇭", rate: 0.88 },
  { country: "Norway", code: "NOK", symbol: "kr", flag: "🇳🇴", rate: 10.5 },
  { country: "Sweden", code: "SEK", symbol: "kr", flag: "🇸🇪", rate: 10.4 },
  { country: "Denmark", code: "DKK", symbol: "kr.", flag: "🇩🇰", rate: 6.9 },
  { country: "New Zealand", code: "NZD", symbol: "$", flag: "🇳🇿", rate: 1.63 },
  { country: "South Korea", code: "KRW", symbol: "₩", flag: "🇰🇷", rate: 1330.0 },
  { country: "United Arab Emirates", code: "AED", symbol: "د.إ", flag: "🇦🇪", rate: 3.67 },
  { country: "Saudi Arabia", code: "SAR", symbol: "ر.س", flag: "🇸🇦", rate: 3.75 },
  { country: "Poland", code: "PLN", symbol: "zł", flag: "🇵🇱", rate: 4.0 },
  { country: "Czechia", code: "CZK", symbol: "Kč", flag: "🇨🇿", rate: 23.5 },
  { country: "Israel", code: "ILS", symbol: "₪", flag: "🇮🇱", rate: 3.6 },
  { country: "Malaysia", code: "MYR", symbol: "RM", flag: "🇲🇾", rate: 4.7 },
  { country: "Kazakhstan", code: "KZT", symbol: "₸", flag: "🇰🇿", rate: 450.0 },
];

// Fallback rates for countries the user listed but weren't in my mapping
const countryMap: Record<string, Partial<Currency>> = {
  "Åland Islands": { code: "EUR", symbol: "€", flag: "🇦🇽", rate: 0.92 },
  "Austria": { code: "EUR", symbol: "€", flag: "🇦🇹", rate: 0.92 },
  "Belgium": { code: "EUR", symbol: "€", flag: "🇧🇪", rate: 0.92 },
  "Bosnia & Herzegovina": { code: "BAM", symbol: "KM", flag: "🇧🇦", rate: 1.8 },
  "Bulgaria": { code: "EUR", symbol: "€", flag: "🇧🇬", rate: 0.92 },
  "Croatia": { code: "EUR", symbol: "€", flag: "🇭🇷", rate: 0.92 },
  "Cyprus": { code: "EUR", symbol: "€", flag: "🇨🇾", rate: 0.92 },
  "Estonia": { code: "EUR", symbol: "€", flag: "🇪🇪", rate: 0.92 },
  "Finland": { code: "EUR", symbol: "€", flag: "🇫🇮", rate: 0.92 },
  "France": { code: "EUR", symbol: "€", flag: "🇫🇷", rate: 0.92 },
  "Georgia": { code: "GEL", symbol: "₾", flag: "🇬🇪", rate: 2.65 },
  "Germany": { code: "EUR", symbol: "€", flag: "🇩🇪", rate: 0.92 },
  "Greece": { code: "EUR", symbol: "€", flag: "🇬🇷", rate: 0.92 },
  "Iceland": { code: "ISK", symbol: "kr", flag: "🇮🇸", rate: 137.0 },
  "Ireland": { code: "EUR", symbol: "€", flag: "🇮🇪", rate: 0.92 },
  "Isle of Man": { code: "GBP", symbol: "£", flag: "🇮🇲", rate: 0.79 },
  "Italy": { code: "EUR", symbol: "€", flag: "🇮🇹", rate: 0.92 },
  "Jersey": { code: "GBP", symbol: "£", flag: "🇯🇪", rate: 0.79 },
  "Latvia": { code: "EUR", symbol: "€", flag: "🇱🇻", rate: 0.92 },
  "Liechtenstein": { code: "CHF", symbol: "CHF", flag: "🇱🇮", rate: 0.88 },
  "Lithuania": { code: "EUR", symbol: "€", flag: "🇱🇹", rate: 0.92 },
  "Luxembourg": { code: "EUR", symbol: "€", flag: "🇱🇺", rate: 0.92 },
  "Malta": { code: "EUR", symbol: "€", flag: "🇲🇹", rate: 0.92 },
  "Monaco": { code: "EUR", symbol: "€", flag: "🇲🇨", rate: 0.92 },
  "Netherlands": { code: "EUR", symbol: "€", flag: "🇳🇱", rate: 0.92 },
  "Portugal": { code: "EUR", symbol: "€", flag: "🇵🇹", rate: 0.92 },
  "Romania": { code: "RON", symbol: "Lei", flag: "🇷🇴", rate: 4.6 },
  "Slovakia": { code: "EUR", symbol: "€", flag: "🇸🇰", rate: 0.92 },
  "Slovenia": { code: "EUR", symbol: "€", flag: "🇸🇮", rate: 0.92 },
  "Spain": { code: "EUR", symbol: "€", flag: "🇪🇸", rate: 0.92 },
  "Türkiye": { code: "TRY", symbol: "₺", flag: "🇹🇷", rate: 31.0 },
};

export const allCurrencies: Currency[] = [
  ...currencies,
  ...Object.entries(countryMap).map(([country, data]) => ({
    country,
    code: data.code!,
    symbol: data.symbol!,
    flag: data.flag!,
    rate: data.rate!,
  })),
].sort((a, b) => a.country.localeCompare(b.country));

interface CurrencyContextType {
  selectedCurrency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (basePrice: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(allCurrencies.find(c => c.code === "GBP") || allCurrencies[0]);

  const formatPrice = (basePrice: number) => {
    const converted = basePrice * selectedCurrency.rate;
    // Format based on currency
    if (selectedCurrency.code === "JPY" || selectedCurrency.code === "KRW") {
      return `${selectedCurrency.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${selectedCurrency.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, setCurrency: setSelectedCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
