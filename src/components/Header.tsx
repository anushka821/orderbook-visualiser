import React from "react";

export default function Header({ symbol = "BTC/USDT" }: { symbol?: string }) {
  return (
    <div className="p-4 border-b border-gray-800">
      <h1 className="text-2xl font-semibold">{symbol} — Real-Time Order Book</h1>
      <p className="text-sm text-gray-400">Live data from Binance public streams</p>
    </div>
  );
}
