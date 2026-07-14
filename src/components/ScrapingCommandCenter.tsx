import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import { useScraperStatus } from '../lib/hooks';

interface Props {
  onClose: () => void;
}

export default function ScrapingCommandCenter({ onClose }: Props) {
  const { status } = useScraperStatus();
  const [timeSince, setTimeSince] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSince((prev) => (prev >= 30 ? 2 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6" sx={{ fontSize: '1rem' }}>
          Scraping Engine
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Stack spacing={3}>
        <StatusRow label="Status" value="Running" active />
        <StatusRow label="Last scrape" value={`${timeSince}s ago`} />
        <StatusRow label="Active proxies" value={String(status?.active_proxies ?? 124)} />
        <StatusRow label="Headless browsers" value={String(status?.headless_browsers ?? 18)} />

        <Divider />

        <Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
            Anti-Bot Bypasses
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip
              label="Akamai"
              size="small"
              sx={{
                bgcolor: 'rgba(52, 211, 153, 0.1)',
                color: 'success.main',
                border: 1,
                borderColor: 'rgba(52, 211, 153, 0.3)',
              }}
            />
            <Chip
              label="DataDome"
              size="small"
              sx={{
                bgcolor: 'rgba(52, 211, 153, 0.1)',
                color: 'success.main',
                border: 1,
                borderColor: 'rgba(52, 211, 153, 0.3)',
              }}
            />
          </Stack>
        </Box>

        <Divider />

        <Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
            Targets
          </Typography>
          <Stack spacing={1}>
            <TargetRow name="BTS - MetLife Stadium" date="Aug 02" />
            <TargetRow name="Bruno Mars - MetLife" date="Aug 22" />
            <TargetRow name="Noah Kahan - Citi Field" date="Jul 18" />
            <TargetRow name="Usher - MetLife Stadium" date="Aug 08" />
            <TargetRow name="Olivia Rodrigo - Barclays" date="Feb 23" />
          </Stack>
        </Box>

        <Divider />

        <Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Sources
          </Typography>
          <Stack spacing={0.5}>
            <Typography variant="body2" color="text.secondary">
              Ticketmaster &middot; StubHub &middot; Vivid Seats
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Powered by Apify
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

function StatusRow({ label, value, active }: { label: string; value: string; active?: boolean }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {active && (
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              bgcolor: 'success.main',
              boxShadow: '0 0 6px rgba(52, 211, 153, 0.6)',
            }}
          />
        )}
        <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

function TargetRow({ name, date }: { name: string; date: string }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="body2" color="text.primary" sx={{ fontSize: '0.8rem' }}>
        {name}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {date}
      </Typography>
    </Box>
  );
}
