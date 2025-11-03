# Real-Time Order Book Visualizer

A **real-time order book visualizer** built with **Next.js**, **Tailwind CSS**, and **Binance WebSocket API**.  
It displays live updates of BTC/USDT market data — including **buy/sell orders**, **recent trades**, and **spread**.

---

## Live Demo

🔗 **[View Live on Vercel](https://orderbook-visualiser-eight.vercel.app/)**

---

## Installation and Setup

Follow these steps to run the project locally:

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/orderbook-visualizer.git

# 2. Move into the project directory
cd orderbook-visualizer

# 3. Install dependencies
npm install

# 4. Run the development server
npm run dev
```
Once the server starts, open:
http://localhost:3000
in your browser.

---

## Tech Stack

* **Next.js** – React framework for building optimized, production-ready web apps
* **Tailwind CSS** – Utility-first CSS framework for fast, responsive styling
* **Binance WebSocket API** – For fetching live BTC/USDT order book and trade data
* **Vercel** – For seamless hosting and automatic deployment

---

## Design Choices and Trade-offs

* Used **WebSockets** for real-time data streaming to ensure minimal latency.
* Chose **Zustand** for lightweight and scalable state management.
* Implemented a **responsive dark theme** using Tailwind for a professional trading dashboard look.
* Prioritized performance by limiting visible data to a few rows to avoid unnecessary re-renders.

---

## Features

*  Real-time BTC/USDT **Order Book** display
*  Live **Recent Trades** feed
*  Instant updates using WebSocket streams
*  Clean and responsive **dark UI**
*  Deployed with **Vercel** for live demo and CI/CD integration

---
