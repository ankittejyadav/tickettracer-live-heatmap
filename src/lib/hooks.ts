import { useEffect, useState } from 'react';
import { supabase } from './supabase';

export interface Event {
  id: string;
  name: string;
  venue: string;
  event_date: string;
  status: string;
}

export interface Seat {
  id: string;
  event_id: string;
  section: string;
  row: string;
  seat_number: number;
  face_value: number;
  resale_value: number;
  resale_source: string;
  last_scraped_at: string;
}

export interface ScrapeLog {
  id: string;
  source: string;
  log_type: string;
  message: string;
  created_at: string;
}

export interface PriceHistoryPoint {
  id: string;
  seat_id: string;
  price: number;
  recorded_at: string;
}

export interface ScraperStatus {
  id: string;
  active_proxies: number;
  headless_browsers: number;
  akamai_status: string;
  datadome_status: string;
  last_success_at: string;
}

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });
      if (!error && data) setEvents(data);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  return { events, loading };
}

export function useSeats(eventId: string) {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSeats() {
      const { data, error } = await supabase
        .from('seats')
        .select('*')
        .eq('event_id', eventId);
      if (!error && data) setSeats(data);
      setLoading(false);
    }
    if (eventId) fetchSeats();
  }, [eventId]);

  return { seats, loading };
}

export function useScrapeLogs() {
  const [logs, setLogs] = useState<ScrapeLog[]>([]);

  useEffect(() => {
    async function fetchLogs() {
      const { data, error } = await supabase
        .from('scrape_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      if (!error && data) setLogs(data.reverse());
    }
    fetchLogs();
  }, []);

  return { logs };
}

export function usePriceHistory(seatId: string | null) {
  const [history, setHistory] = useState<PriceHistoryPoint[]>([]);

  useEffect(() => {
    async function fetchHistory() {
      if (!seatId) return;
      const { data, error } = await supabase
        .from('price_history')
        .select('*')
        .eq('seat_id', seatId)
        .order('recorded_at', { ascending: true });
      if (!error && data) setHistory(data);
    }
    fetchHistory();
  }, [seatId]);

  return { history };
}

export function useScraperStatus() {
  const [status, setStatus] = useState<ScraperStatus | null>(null);

  useEffect(() => {
    async function fetchStatus() {
      const { data, error } = await supabase
        .from('scraper_status')
        .select('*')
        .limit(1)
        .maybeSingle();
      if (!error && data) setStatus(data);
    }
    fetchStatus();
  }, []);

  return { status };
}

export function getSectionMargin(seats: Seat[], section: string): number {
  const sectionSeats = seats.filter((s) => s.section === section);
  if (sectionSeats.length === 0) return 0;
  const avgMargin =
    sectionSeats.reduce(
      (acc, s) => acc + ((s.resale_value - s.face_value) / s.face_value) * 100,
      0
    ) / sectionSeats.length;
  return avgMargin;
}

export function getMarginColor(margin: number): string {
  if (margin > 150) return '#f87171';
  if (margin > 40) return '#fbbf24';
  if (margin > 10) return '#fbbf24';
  return '#34d399';
}

export function getMarginGlow(margin: number): string {
  if (margin > 150) return '0 0 20px rgba(248, 113, 113, 0.6)';
  if (margin > 40) return '0 0 12px rgba(251, 191, 36, 0.3)';
  return 'none';
}
