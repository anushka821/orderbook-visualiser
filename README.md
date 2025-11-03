# Real-Time Order Book Visualizer

Local:
1. `npm install`
2. `npm run dev`
3. Open http://localhost:3000

This app fetches an initial depth snapshot from Binance REST, then subscribes to `depth` and `aggTrade` websockets to keep the UI live.
