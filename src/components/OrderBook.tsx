import React from "react";
import OrderRow from "./OrderRow";

type Level = { price: string; amount: string; total: number };

export default function OrderBook({ bids, asks, spread, connectionState }: { bids: Level[]; asks: Level[]; spread: number | null; connectionState: string }) {
  const maxBidTotal = bids.length ? Math.max(...bids.map((b) => b.total)) : 0;
  const maxAskTotal = asks.length ? Math.max(...asks.map((a) => a.total)) : 0;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-gray-300">Order Book</div>
        <div className="text-sm">
          <span className="mr-4">Spread: <strong>{spread ?? "-"}</strong></span>
          <span className="text-xs px-2 py-1 rounded bg-gray-800">{connectionState}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border border-gray-800 rounded p-2">
          <div className="text-xs text-gray-400 mb-2 flex justify-between">
            <div className="w-1/3 text-right">Price</div>
            <div className="w-1/3 text-center">Amount</div>
            <div className="w-1/3">Total</div>
          </div>
          <div className="space-y-0.5">
            {bids.map((b) => <OrderRow key={b.price} price={b.price} amount={b.amount} total={b.total} side="bid" maxTotal={maxBidTotal} />)}
          </div>
        </div>

        <div className="border border-gray-800 rounded p-2">
          <div className="text-xs text-gray-400 mb-2 flex justify-between">
            <div className="w-1/3 text-right">Price</div>
            <div className="w-1/3 text-center">Amount</div>
            <div className="w-1/3">Total</div>
          </div>
          <div className="space-y-0.5">
            {asks.map((a) => <OrderRow key={a.price} price={a.price} amount={a.amount} total={a.total} side="ask" maxTotal={maxAskTotal} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
