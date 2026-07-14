import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Chip from '@mui/material/Chip';
import TuneIcon from '@mui/icons-material/Tune';
import InsightsIcon from '@mui/icons-material/Insights';
import theme from './theme';
import ScrapingCommandCenter from './components/ScrapingCommandCenter';
import StadiumHeatmap from './components/StadiumHeatmap';
import IntelligencePanel from './components/IntelligencePanel';

function App() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: 2,
            py: 1.5,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <IconButton
            onClick={() => setLeftOpen(true)}
            size="small"
            sx={{ mr: 2, bgcolor: 'background.paper', border: 1, borderColor: 'divider' }}
          >
            <TuneIcon fontSize="small" />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: 'error.main',
                boxShadow: '0 0 8px rgba(248, 113, 113, 0.6)',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0.3 },
                },
              }}
            />
            <Typography variant="h6" sx={{ fontSize: '0.95rem' }}>
              TicketTracer
            </Typography>
            <Chip
              label="LIVE"
              size="small"
              sx={{
                height: 20,
                fontSize: '0.6rem',
                fontWeight: 700,
                bgcolor: 'rgba(248, 113, 113, 0.1)',
                color: 'error.main',
                border: 1,
                borderColor: 'rgba(248, 113, 113, 0.3)',
              }}
            />
          </Box>

          <Box sx={{ flex: 1 }} />

          <IconButton
            onClick={() => setRightOpen(true)}
            size="small"
            sx={{ bgcolor: 'background.paper', border: 1, borderColor: 'divider' }}
          >
            <InsightsIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          <StadiumHeatmap />
        </Box>

        <Drawer
          anchor="left"
          open={leftOpen}
          onClose={() => setLeftOpen(false)}
          slotProps={{ paper: { sx: { width: 320, bgcolor: 'background.default' } } }}
        >
          <ScrapingCommandCenter onClose={() => setLeftOpen(false)} />
        </Drawer>

        <Drawer
          anchor="right"
          open={rightOpen}
          onClose={() => setRightOpen(false)}
          slotProps={{ paper: { sx: { width: 360, bgcolor: 'background.default' } } }}
        >
          <IntelligencePanel onClose={() => setRightOpen(false)} />
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}

export default App;
