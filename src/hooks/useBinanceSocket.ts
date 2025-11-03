import { useEffect, useRef, useState } from "react";
import type { PriceLevel } from "../lib/orderbook";

const BINANCE_BASE = "https://api.binance.com";
const WS_BASE = "wss://stream.binance.com:9443/ws";

export type UseBinanceResult = {
  bids: { price: string; amount: string; total: number }[];
  asks: { price: string; amount: string; total: number }[];
  spread: number | null;
  trades: {
    id: number;
    price: string;
    qty: string;
    time: number;
    isBuyerMaker: boolean;
  }[];
  connectionState: "idle" | "connecting" | "connected" | "error";
};

export default function useBinanceSocket(symbol = "btcusdt", depthLimit = 100) {
  const [bidsArr, setBidsArr] = useState<UseBinanceResult["bids"]>([]);
  const [asksArr, setAsksArr] = useState<UseBinanceResult["asks"]>([]);
  const [trades, setTrades] = useState<UseBinanceResult["trades"]>([]);
  const [state, setState] = useState<UseBinanceResult["connectionState"]>("idle");

  const bidsRef = useRef<Map<string, number>>(new Map());
  const asksRef = useRef<Map<string, number>>(new Map());
  const wsRef = useRef<WebSocket | null>(null);
  const lastUpdateIdRef = useRef<number | null>(null);

  function computeAndSetArrays() {
    const { mapToSortedArray } = require("../lib/orderbook");
    setBidsArr(mapToSortedArray(bidsRef.current, "bids", 25));
    setAsksArr(mapToSortedArray(asksRef.current, "asks", 25));
  }

  useEffect(() => {
    let mounted = true;
    setState("connecting");
    const lower = symbol.toLowerCase();

    async function init() {
      try {
        const snapshotResp = await fetch(`${BINANCE_BASE}/api/v3/depth?symbol=${symbol.toUpperCase()}&limit=${depthLimit}`);
        const snapshot = await snapshotResp.json();
        lastUpdateIdRef.current = snapshot.lastUpdateId;

        bidsRef.current.clear();
        asksRef.current.clear();
        snapshot.bids.forEach(([p, q]: [string, string]) => bidsRef.current.set(p, Number(q)));
        snapshot.asks.forEach(([p, q]: [string, string]) => asksRef.current.set(p, Number(q)));

        computeAndSetArrays();

        const depthStream = `${lower}@depth@100ms`;
        const aggTradeStream = `${lower}@aggTrade`;
        const ws = new WebSocket(`${WS_BASE}/${depthStream}/${aggTradeStream}`);
        wsRef.current = ws;

        ws.onopen = () => setState("connected");

        ws.onmessage = (ev) => {
          const data = JSON.parse(ev.data);

          if (data.e === "depthUpdate") {
            const U = data.U, u = data.u;
            const last = lastUpdateIdRef.current ?? 0;
            if (u <= last) return;
            if (U <= last + 1 && u >= last + 1) {
              for (const [price, qty] of data.b) {
                const amount = Number(qty);
                if (amount === 0) bidsRef.current.delete(price);
                else bidsRef.current.set(price, amount);
              }
              for (const [price, qty] of data.a) {
                const amount = Number(qty);
                if (amount === 0) asksRef.current.delete(price);
                else asksRef.current.set(price, amount);
              }
              lastUpdateIdRef.current = u;
              computeAndSetArrays();
            } else {
              // resync
              init();
            }
          }

          if (data.e === "aggTrade") {
            setTrades((prev) => {
              const newTrade = {
                id: data.a,
                price: data.p,
                qty: data.q,
                time: data.T,
                isBuyerMaker: data.m
              };
              return [newTrade, ...prev].slice(0, 50);
            });
          }
        };

        ws.onerror = () => setState("error");
        ws.onclose = () => {
          setState("idle");
          setTimeout(() => { if (mounted) init(); }, 2000);
        };
      } catch (err) {
        console.error(err);
        setState("error");
      }
    }

    init();

    return () => {
      mounted = false;
      if (wsRef.current) wsRef.current.close();
    };
  }, [symbol, depthLimit]);

  const spread = (() => {
    if (bidsArr.length && asksArr.length) {
      const highestBid = Number(bidsArr[0].price);
      const lowestAsk = Number(asksArr[0].price);
      return Number((lowestAsk - highestBid).toFixed(2));
    }
    return null;
  })();

  return { bids: bidsArr, asks: asksArr, trades, spread, connectionState: state };
}
