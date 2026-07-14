# TicketTracer Live Seating Heatmap

Real-time ticket arbitrage dashboard with interactive stadium visualization.

## Features

- Interactive SVG stadium heatmap showing resale margin by section
- Color-coded sections: green (fair value), yellow (moderate markup), red (high demand/scalper prices)
- Hover tooltips with face value, resale price, and margin percentage
- Toggleable side panels for scraping engine status and intelligence metrics
- 48-hour price history chart
- Live data feed from Apify scrapers

## Data Sources

- **Ticketmaster** (via Apify `parseforge/ticketmaster-scraper`)
- **StubHub** (via Apify `lulzasaur/stubhub-scraper`)

## Tech Stack

- React 19 + TypeScript
- Vite
- Material UI (dark theme)
- Supabase (database + RLS)
- Recharts (price history)
- Apify (data scraping)

## Setup

1. Clone the repo
2. `npm install`
3. Create `.env` with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your-url
   VITE_SUPABASE_ANON_KEY=your-key
   ```
4. `npm run dev`

## License

MIT
