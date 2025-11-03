import React from "react";
import Header from "../components/Header";
import OrderBook from "../components/OrderBook";
import RecentTrades from "../components/RecentTrades";
import useBinanceSocket from "../hooks/useBinanceSocket";

export default function Home() {
  const symbol = "btcusdt";
  const { bids, asks, trades, spread, connectionState } = useBinanceSocket(symbol, 100);

  return (
    <div className="min-h-screen">
      <Header symbol="BTC / USDT" />
      <main className="max-w-6xl mx-auto p-4 grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-gray-850 rounded border border-gray-800">
          <OrderBook bids={bids} asks={asks} spread={spread} connectionState={connectionState} />
        </div>

        <div className="col-span-1 bg-gray-850 rounded border border-gray-800">
          <RecentTrades trades={trades} />
        </div>
      </main>
    </div>
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-500 text-white text-3xl font-bold">
      Tailwind is Working! 🎉
    </div>
  );

}


