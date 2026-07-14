import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useSeats, getSectionMargin, getMarginColor } from '../lib/hooks';
import type { Seat } from '../lib/hooks';

interface SectionData {
  id: string;
  label: string;
  path: string;
}

const STADIUM_SECTIONS: SectionData[] = [
  { id: 'Floor A', label: 'FLOOR A', path: 'M 340,310 L 410,310 L 410,360 L 340,360 Z' },
  { id: 'Floor B', label: 'FLOOR B', path: 'M 430,310 L 500,310 L 500,360 L 430,360 Z' },
  { id: 'Section 101', label: '101', path: 'M 230,240 L 320,250 L 320,300 L 230,290 Z' },
  { id: 'Section 102', label: '102', path: 'M 320,230 L 420,225 L 420,295 L 320,300 Z' },
  { id: 'Section 103', label: '103', path: 'M 420,225 L 520,230 L 520,295 L 420,295 Z' },
  { id: 'Section 104', label: '104', path: 'M 520,240 L 610,250 L 610,300 L 520,295 Z' },
  { id: 'Section 201', label: '201', path: 'M 180,175 L 290,180 L 290,230 L 180,220 Z' },
  { id: 'Section 202', label: '202', path: 'M 290,165 L 420,160 L 420,225 L 290,230 Z' },
  { id: 'Section 203', label: '203', path: 'M 420,160 L 550,165 L 550,225 L 420,225 Z' },
  { id: 'Section 204', label: '204', path: 'M 550,175 L 660,180 L 660,230 L 550,225 Z' },
  { id: 'Section 301', label: '301', path: 'M 130,110 L 270,115 L 270,165 L 130,155 Z' },
  { id: 'Section 302', label: '302', path: 'M 270,100 L 420,95 L 420,160 L 270,165 Z' },
  { id: 'Section 303', label: '303', path: 'M 420,95 L 570,100 L 570,160 L 420,160 Z' },
  { id: 'Section 304', label: '304', path: 'M 570,110 L 710,115 L 710,165 L 570,160 Z' },
  { id: 'Section 105', label: '105', path: 'M 230,380 L 320,390 L 320,430 L 230,420 Z' },
  { id: 'Section 106', label: '106', path: 'M 320,390 L 420,395 L 420,435 L 320,430 Z' },
  { id: 'Section 107', label: '107', path: 'M 420,395 L 520,390 L 520,430 L 420,435 Z' },
  { id: 'Section 108', label: '108', path: 'M 520,380 L 610,370 L 610,410 L 520,430 Z' },
];

interface TooltipData {
  section: string;
  seats: Seat[];
  margin: number;
  x: number;
  y: number;
}

export default function StadiumHeatmap() {
  const { seats } = useSeats('e0000001-0000-0000-0000-000000000001');
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  function handleHover(section: SectionData, event: React.MouseEvent) {
    const sectionSeats = seats.filter((s) => s.section === section.id);
    const margin = getSectionMargin(seats, section.id);
    const rect = (event.currentTarget as SVGElement).closest('svg')?.getBoundingClientRect();
    if (rect) {
      setTooltip({
        section: section.id,
        seats: sectionSeats,
        margin,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        p: 3,
      }}
    >
      <Box sx={{ mb: 2, textAlign: 'center' }}>
        <Typography variant="h4" color="text.primary" sx={{ mb: 0.5 }}>
          MetLife Stadium
        </Typography>
        <Typography variant="body2" color="text.secondary">
          BTS WORLD TOUR 'ARIRANG' &middot; Aug 02, 2026 &middot; East Rutherford, NJ
        </Typography>
      </Box>

      <Box
        sx={{
          position: 'relative',
          flex: 1,
          width: '100%',
          maxWidth: 900,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg viewBox="60 50 720 440" style={{ width: '100%', height: '100%', maxHeight: '100%' }}>
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="stageGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(96, 165, 250, 0.15)" />
              <stop offset="100%" stopColor="rgba(96, 165, 250, 0)" />
            </radialGradient>
          </defs>

          <ellipse cx="420" cy="340" rx="70" ry="30" fill="url(#stageGlow)" />
          <ellipse cx="420" cy="340" rx="50" ry="20" fill="none" stroke="rgba(96, 165, 250, 0.4)" strokeWidth="1.5" strokeDasharray="4 2" />
          <text x="420" y="345" textAnchor="middle" fill="rgba(96, 165, 250, 0.7)" fontSize="11" fontFamily="Roboto" fontWeight="500">STAGE</text>

          {STADIUM_SECTIONS.map((section) => {
            const margin = getSectionMargin(seats, section.id);
            const color = getMarginColor(margin);
            const hasData = seats.some((s) => s.section === section.id);
            const center = getPathCenter(section.path);

            return (
              <g key={section.id}>
                <path
                  d={section.path}
                  fill={hasData ? color : 'rgba(148, 163, 184, 0.06)'}
                  fillOpacity={hasData ? 0.6 : 0.4}
                  stroke={hasData ? color : 'rgba(148, 163, 184, 0.2)'}
                  strokeWidth={hasData ? 1.5 : 1}
                  rx="4"
                  style={{
                    cursor: hasData ? 'pointer' : 'default',
                    transition: 'all 0.3s ease',
                    filter: margin > 200 ? 'url(#glow)' : 'none',
                  }}
                  onMouseEnter={(e) => hasData && handleHover(section, e)}
                  onMouseLeave={() => setTooltip(null)}
                />
                <text
                  x={center.x}
                  y={center.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={hasData ? 'rgba(255,255,255,0.9)' : 'rgba(148,163,184,0.4)'}
                  fontSize="10"
                  fontFamily="Roboto"
                  fontWeight="500"
                  style={{ pointerEvents: 'none' }}
                >
                  {section.label}
                </text>
              </g>
            );
          })}
        </svg>

        {tooltip && tooltip.seats.length > 0 && (
          <Paper
            elevation={12}
            sx={{
              position: 'absolute',
              left: Math.min(tooltip.x + 16, 600),
              top: tooltip.y - 8,
              p: 2,
              minWidth: 220,
              bgcolor: 'background.paper',
              border: 1,
              borderColor: 'divider',
              borderRadius: 2,
              zIndex: 10,
              pointerEvents: 'none',
            }}
          >
            <Typography variant="subtitle2" color="primary.main" sx={{ mb: 1 }}>
              {tooltip.section}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                Face Value:{' '}
                <Box component="span" sx={{ color: 'text.primary', fontWeight: 600 }}>
                  ${tooltip.seats[0]?.face_value.toFixed(0)}
                </Box>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Resale:{' '}
                <Box component="span" sx={{ color: 'warning.main', fontWeight: 600 }}>
                  ${tooltip.seats[0]?.resale_value.toFixed(0)}
                </Box>
                {' '}
                <Box component="span" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                  ({tooltip.seats[0]?.resale_source})
                </Box>
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: tooltip.margin > 150 ? 'error.main' : tooltip.margin > 50 ? 'warning.main' : 'success.main',
                  fontWeight: 700,
                  mt: 0.5,
                }}
              >
                +{Math.round(tooltip.margin)}% margin
              </Typography>
            </Box>
          </Paper>
        )}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 2 }}>
        <LegendItem color="#34d399" label="Fair value" />
        <LegendItem color="#fbbf24" label="Moderate markup" />
        <LegendItem color="#f87171" label="High demand" />
      </Box>
    </Box>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
      <Box sx={{ width: 12, height: 12, borderRadius: 0.5, bgcolor: color, opacity: 0.7 }} />
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );
}

function getPathCenter(path: string): { x: number; y: number } {
  const coords = path.match(/[\\d.]+/g)?.map(Number) || [];
  let sumX = 0;
  let sumY = 0;
  let count = 0;
  for (let i = 0; i < coords.length; i += 2) {
    sumX += coords[i];
    sumY += coords[i + 1];
    count++;
  }
  return { x: sumX / count, y: sumY / count };
}
