import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { useLocale } from '../../hooks/usePreferences';
import { tokens } from '../../theme';

export function ProcessSection() {
  const { t } = useLocale();
  const steps = [
    {
      num: '01',
      title: t('process.collect') || 'Ingestion & Checksum',
      desc: t('process.collectDescription') || 'Raw administrative and survey microdata ingested from official MoSPI, MSDE, and MoLE releases with cryptographic checksums.',
    },
    {
      num: '02',
      title: t('process.validate') || 'Normalization & Mapping',
      desc: t('process.validateDescription') || 'Trades harmonized to National Classification of Occupations (NCO 2015) and National Industrial Classification (NIC 2008).',
    },
    {
      num: '03',
      title: t('process.analyse') || 'Indicative Pressure Modeling',
      desc: t('process.analyseDescription') || 'Normalized matching between regional training output and active vacancy demand identifies tension and shortage risks.',
    },
    {
      num: '04',
      title: t('process.understand') || 'Public Attribution & Audit',
      desc: t('process.understandDescription') || 'Every single figure links back to its exact publication table, reference date, and uncertainty boundaries.',
    },
  ];

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
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
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
            {t('process.eyebrow') || 'METHODOLOGY & DATA RULES'}
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
            {t('process.title') || 'How Each Number is Built'}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'var(--text-secondary)',
              maxWidth: 620,
              margin: '0 auto',
            }}
          >
            {t('process.note') || 'No fabricated statistics, no hidden projections. A reproducible 4-step pipeline ensuring complete data provenance.'}
          </Typography>
        </Box>

        {/* 4 Process Cards in Grid */}
        <Grid container spacing={3}>
          {steps.map((step) => (
            <Grid item xs={12} sm={6} md={3} key={step.num}>
              <Card
                sx={{
                  height: '100%',
                  p: 3.5,
                  backgroundColor: 'var(--glass-surface)',
                  backdropFilter: 'blur(16px) saturate(140%)',
                  WebkitBackdropFilter: 'blur(16px) saturate(140%)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: tokens.radius.card,
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 200ms ease, box-shadow 200ms ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 36px rgba(201, 55, 42, 0.12)',
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-display)',
                    color: 'var(--accent-text)',
                    mb: 2,
                  }}
                >
                  {step.num}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: '1.1875rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    mb: 1.5,
                    lineHeight: 1.3,
                  }}
                >
                  {step.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    flexGrow: 1,
                  }}
                >
                  {step.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
