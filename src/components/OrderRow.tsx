import React from "react";
type Props = {
  price: string;
  amount: string;
  total: number;
  side: "bid" | "ask";
  maxTotal: number;
};

export default function OrderRow({ price, amount, total, side, maxTotal }: Props) {
  const pct = maxTotal > 0 ? Math.min(1, total / maxTotal) : 0.001;
  const bgClass = side === "bid" ? "bg-bid/20" : "bg-ask/20";
  return (
    <div className="relative flex items-center text-xs h-7">
      <div
        className={`absolute inset-y-0 ${side === "bid" ? "left-0" : "right-0"} ${bgClass}`}
        style={{
          width: `${pct * 100}%`,
          borderTopRightRadius: side === "bid" ? 0 : 8,
          borderBottomRightRadius: side === "bid" ? 0 : 8,
          borderTopLeftRadius: side === "bid" ? 8 : 0,
          borderBottomLeftRadius: side === "bid" ? 8 : 0
        }}
      />
      <div className="flex w-full px-2 z-10 justify-between">
        <div className={`w-1/3 ${side === "bid" ? "text-green-300" : "text-red-300"} text-right`}>{Number(price).toFixed(2)}</div>
        <div className="w-1/3 text-center">{Number(amount).toFixed(6)}</div>
        <div className="w-1/3 text-left">{Number(total).toFixed(6)}</div>
      </div>
    </div>
  );
}
