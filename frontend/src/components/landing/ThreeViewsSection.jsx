import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import {
  TrendingUp,
  TrendingDown,
  CheckCircle,
  WarningAmber,
  ArrowForward,
  InfoOutlined,
  CalendarMonth,
  Layers,
} from '@mui/icons-material';

import { useLocale } from '../../hooks/usePreferences';
import { tokens } from '../../theme';

export function ThreeViewsSection() {
  const { t } = useLocale();
  const [activeTab, setActiveTab] = useState(0);

  const views = [
    {
      id: 'demand',
      title: t('common.demand') || 'Demand Intelligence',
      badge: 'NCS · Active Vacancies',
      provenance: 'NCS / MoLE · Feb 2025 Release',
      description:
        'Live and historical employer vacancies across states, union territories, and National Classification of Occupations (NCO).',
      indicatorDefinition: 'Official employer vacancy demand registered on National Career Service portal.',
      kpis: [
        { label: 'Active Vacancies', value: '1,341,200', note: 'All-India verified' },
        { label: 'Top Sector', value: 'Manufacturing', note: 'High hiring index' },
        { label: 'Observed States', value: '37 States & UTs', note: '100% coverage' },
      ],
      status: {
        type: 'undersupply',
        word: 'High Demand',
        icon: <TrendingUp sx={{ fontSize: 16 }} />,
        color: tokens.status.undersupply.color,
        bg: tokens.status.undersupply.surface,
      },
      link: '/demand',
    },
    {
      id: 'supply',
      title: t('common.supply') || 'Supply Intelligence',
      badge: 'PMKVY · Certified Talent',
      provenance: 'PMKVY / MSDE · Dec 2024 Release',
      description:
        'Certified candidates, accredited training centers, and skill councils output across NSQF qualification packs.',
      indicatorDefinition: 'Candidates certified under accredited government skilling programs.',
      kpis: [
        { label: 'Certified Candidates', value: '482,900', note: 'Annual certified' },
        { label: 'Active Centers', value: '14,250', note: 'Accredited PMKK' },
        { label: 'Job Roles Tracked', value: '348 Roles', note: 'Standard NSQF' },
      ],
      status: {
        type: 'balanced',
        word: 'Balanced Supply',
        icon: <CheckCircle sx={{ fontSize: 16 }} />,
        color: tokens.status.balanced.color,
        bg: tokens.status.balanced.surface,
      },
      link: '/supply',
    },
    {
      id: 'gaps',
      title: t('common.skillGaps') || 'Skill Gaps & Mismatch',
      badge: 'Indicative Pressure Matrix',
      provenance: 'PLFS / NCS Cross-Model · 2024–2025',
      description:
        'Ranked indicative pressure between training output and active vacancies, identifying critical shortages before they widen.',
      indicatorDefinition:
        'Indicative Pressure: normalized ratio of local certified supply to employer vacancy stock (not validated hard gaps).',
      kpis: [
        { label: 'Critical Pressure Trades', value: '18 Occupations', note: 'Shortage flags' },
        { label: 'Surplus Concentration', value: '12 Regions', note: 'Oversupply pressure' },
        { label: 'Mismatch Delta', value: '-28.4%', note: 'Indicative tension' },
      ],
      status: {
        type: 'oversupply',
        word: 'Indicative Tension',
        icon: <WarningAmber sx={{ fontSize: 16 }} />,
        color: tokens.status.oversupply.color,
        bg: tokens.status.oversupply.surface,
      },
      link: '/skill-gaps',
    },
  ];

  const currentView = views[activeTab];

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, sm: 3, md: 4 },
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 6 } }}>
          <Typography
            sx={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--accent-text)',
              mb: 1.5,
            }}
          >
            LABOUR MARKET INTELLIGENCE LENSES
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              mb: 2,
            }}
          >
            Three Unified Perspectives. One Ground Truth.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'var(--text-secondary)',
              maxWidth: 680,
              margin: '0 auto',
            }}
          >
            Every figure links directly to official datasets. Understand employer demand, institutional
            skilling supply, and the indicative pressure between them.
          </Typography>
        </Box>

        {/* View Switcher Tabs styled as floating glass pills */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
          <Tabs
            value={activeTab}
            onChange={(_, val) => setActiveTab(val)}
            centered
            sx={{
              backgroundColor: 'var(--glass-surface)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid var(--glass-border)',
              borderRadius: tokens.radius.pill,
              p: 0.6,
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              '& .MuiTabs-indicator': {
                display: 'none',
              },
            }}
          >
            {views.map((v, idx) => (
              <Tab
                key={v.id}
                label={v.title}
                sx={{
                  borderRadius: tokens.radius.pill,
                  px: { xs: 2, sm: 3.5 },
                  py: 1.2,
                  fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                  fontWeight: 600,
                  textTransform: 'none',
                  color: activeTab === idx ? '#FFFFFF !important' : 'var(--text-secondary)',
                  backgroundColor:
                    activeTab === idx ? 'var(--accent-fill) !important' : 'transparent',
                  transition: 'all 180ms ease',
                  '&:hover': {
                    color: activeTab === idx ? '#FFFFFF' : 'var(--text-primary)',
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Active View Card (frosted glass, 20px radius) */}
        <Card
          sx={{
            backgroundColor: 'var(--glass-surface)',
            backdropFilter: 'blur(20px) saturate(140%)',
            WebkitBackdropFilter: 'blur(20px) saturate(140%)',
            border: '1px solid var(--glass-border)',
            borderRadius: tokens.radius.card,
            boxShadow: '0 12px 40px rgba(17, 24, 39, 0.08)',
            p: { xs: 3, sm: 4, md: 5 },
          }}
        >
          <Grid container spacing={4} alignItems="center">
            {/* Left Content */}
            <Grid item xs={12} md={7}>
              {/* Badge & Status chip with Icon and Word */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, flexWrap: 'wrap' }}>
                <Chip
                  label={currentView.badge}
                  size="small"
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    backgroundColor: 'rgba(17, 24, 39, 0.06)',
                    color: 'var(--text-primary)',
                  }}
                />
                <Chip
                  icon={currentView.status.icon}
                  label={currentView.status.word}
                  size="small"
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    backgroundColor: currentView.status.bg,
                    color: currentView.status.color,
                    borderColor: currentView.status.color,
                    '& .MuiChip-icon': {
                      color: currentView.status.color,
                    },
                  }}
                />
                <Chip
                  label="Sample"
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: '0.7rem',
                    color: 'var(--text-meta)',
                    borderColor: 'var(--border-subtle)',
                  }}
                />
              </Box>

              <Typography
                variant="h3"
                sx={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  mb: 1.5,
                }}
              >
                {currentView.title}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  mb: 3,
                }}
              >
                {currentView.description}
              </Typography>

              {/* Indicator Definition Note (Mandatory Rule) */}
              <Box
                sx={{
                  p: 2,
                  mb: 3.5,
                  borderRadius: tokens.radius.input,
                  backgroundColor: 'rgba(17, 24, 39, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  gap: 1.5,
                  alignItems: 'flex-start',
                }}
              >
                <InfoOutlined
                  sx={{ fontSize: 18, color: 'var(--accent-text)', mt: '2px', flexShrink: 0 }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: 'var(--accent-text)',
                      mb: 0.3,
                    }}
                  >
                    Indicator Definition
                  </Typography>
                  <Typography sx={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                    {currentView.indicatorDefinition}
                  </Typography>
                </Box>
              </Box>

              {/* Source & Date Provenance tag */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: 'var(--text-meta)',
                  fontSize: '0.8125rem',
                  mb: 3,
                }}
              >
                <CalendarMonth sx={{ fontSize: 16 }} />
                <span>Source: {currentView.provenance}</span>
              </Box>

              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={currentView.link}
                endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                sx={{
                  borderRadius: tokens.radius.pill,
                  px: 3.5,
                  py: 1.2,
                  fontWeight: 600,
                  backgroundColor: 'var(--accent-fill)',
                  '&:hover': {
                    backgroundColor: 'var(--accent-hover)',
                  },
                }}
              >
                Explore {currentView.title}
              </Button>
            </Grid>

            {/* Right KPI Panel */}
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2.5,
                  p: { xs: 2.5, sm: 3 },
                  borderRadius: tokens.radius.input,
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  border: '1px solid var(--glass-border)',
                }}
              >
                {currentView.kpis.map((kpi, i) => (
                  <Box
                    key={i}
                    sx={{
                      p: 2,
                      borderRadius: '10px',
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '0.8125rem',
                        color: 'var(--text-secondary)',
                        fontWeight: 500,
                        mb: 0.5,
                      }}
                    >
                      {kpi.label}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: '1.5rem', sm: '1.75rem' },
                        fontWeight: 700,
                        fontVariantNumeric: 'tabular-nums',
                        color: 'var(--text-primary)',
                        lineHeight: 1.2,
                      }}
                    >
                      {kpi.value}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        color: 'var(--text-meta)',
                        mt: 0.3,
                      }}
                    >
                      {kpi.note}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
}
