export type Side = "bids" | "asks";
export type PriceLevel = { price: string; amount: string };

export function applyDeltasToMap(map: Map<string, number>, deltas: PriceLevel[]) {
  for (const { price, amount } of deltas) {
    const a = Number(amount);
    if (a === 0) map.delete(price);
    else map.set(price, a);
  }
}

export function mapToSortedArray(map: Map<string, number>, side: Side, limit = 50) {
  const arr = Array.from(map.entries()).map(([price, amount]) => ({
    price,
    amount,
    priceNum: Number(price),
    amountNum: Number(amount)
  }));

  arr.sort((x, y) => (side === "bids" ? y.priceNum - x.priceNum : x.priceNum - y.priceNum));

  const slice = arr.slice(0, limit);
  let cumulative = 0;
  return slice.map((r) => {
    cumulative += r.amountNum;
    return { price: r.price, amount: String(r.amountNum), total: cumulative };
  });
}
