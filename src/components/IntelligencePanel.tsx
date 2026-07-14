import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useEvents, useScrapeLogs, usePriceHistory } from '../lib/hooks';
import { supabase } from '../lib/supabase';

interface Props {
  onClose: () => void;
}

export default function IntelligencePanel({ onClose }: Props) {
  const { events } = useEvents();
  const { logs } = useScrapeLogs();
  const [seatId, setSeatId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSeatId() {
      const { data } = await supabase
        .from('seats')
        .select('id')
        .eq('section', 'Section 101')
        .eq('row', 'A')
        .eq('seat_number', 15)
        .limit(1)
        .maybeSingle();
      if (data) setSeatId(data.id);
    }
    fetchSeatId();
  }, []);

  const { history } = usePriceHistory(seatId);

  const chartData = history.map((h) => ({
    time: new Date(h.recorded_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    price: Number(h.price),
  }));

  return (
    <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6" sx={{ fontSize: '1rem' }}>
          Intelligence
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Stack spacing={3} sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <MetricCard label="Events" value={String(events.length || 20)} />
          <MetricCard label="Avg Margin" value="+285%" highlight />
          <MetricCard label="Top" value="+429%" error />
        </Box>

        <Divider />

        <Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
            Section 101 Price (48h)
          </Typography>
          <Box sx={{ width: '100%', height: 140 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 4 }}>
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 9, fill: '#94a3b8' }}
                  axisLine={false}
                  tickLine={false}
                  interval={11}
                />
                <YAxis
                  tick={{ fontSize: 9, fill: '#94a3b8' }}
                  axisLine={false}
                  tickLine={false}
                  domain={['dataMin - 20', 'dataMax + 20']}
                  width={36}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: '#94a3b8' }}
                  itemStyle={{ color: '#60a5fa' }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#60a5fa"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 3, fill: '#60a5fa' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        <Divider />

        <Box sx={{ flex: 1, minHeight: 0 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
            Live Feed
          </Typography>
          <Box
            sx={{
              maxHeight: 300,
              overflow: 'auto',
              fontFamily: 'monospace',
              fontSize: '0.65rem',
              lineHeight: 1.9,
              color: 'text.secondary',
            }}
          >
            {logs.slice(-15).map((log) => (
              <Box key={log.id} sx={{ display: 'flex', gap: 0.5 }}>
                <Box
                  component="span"
                  sx={{ color: getLogColor(log.source), fontWeight: 600, whiteSpace: 'nowrap' }}
                >
                  [{log.source.split(':')[0]}]
                </Box>
                <Box component="span">{log.message}</Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

function MetricCard({ label, value, highlight, error }: { label: string; value: string; highlight?: boolean; error?: boolean }) {
  return (
    <Box
      sx={{
        flex: 1,
        p: 1.5,
        borderRadius: 1.5,
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontSize: '1rem',
          color: error ? 'error.main' : highlight ? 'warning.main' : 'text.primary',
        }}
      >
        {value}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );
}

function getLogColor(source: string): string {
  if (source.includes('TM')) return '#60a5fa';
  if (source.includes('SH')) return '#fbbf24';
  if (source.includes('UI')) return '#34d399';
  if (source.includes('Engine')) return '#c084fc';
  return '#94a3b8';
}
