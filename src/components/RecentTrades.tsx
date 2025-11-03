import React, { useEffect, useState } from "react";

export default function RecentTrades({ trades }: { trades: { id: number; price: string; qty: string; time: number; isBuyerMaker: boolean }[] }) {
  const [flashIds, setFlashIds] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (trades.length) {
      const id = trades[0].id;
      setFlashIds((prev) => ({ ...prev, [id]: true }));
      const t = setTimeout(() => {
        setFlashIds((prev) => {
          const copy = { ...prev }; delete copy[id]; return copy;
        });
      }, 400);
      return () => clearTimeout(t);
    }
  }, [trades]);

  return (
    <div className="p-4">
      <h3 className="text-sm text-gray-300 mb-2">Recent Trades</h3>
      <div className="space-y-1 max-h-80 overflow-auto">
        {trades.map((tr) => {
          const isBuy = !tr.isBuyerMaker;
          const flash = flashIds[tr.id];
          return (
            <div key={tr.id} className={`flex justify-between text-xs px-2 py-1 rounded ${flash ? (isBuy ? "bg-green-800" : "bg-red-800") : "bg-transparent"}`}>
              <div>{Number(tr.price).toFixed(2)}</div>
              <div className="text-gray-400">{Number(tr.qty).toFixed(6)}</div>
              <div className="text-gray-500">{new Date(tr.time).toLocaleTimeString()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
