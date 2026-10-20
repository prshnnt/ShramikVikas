import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import { ArrowForward, Storage, CheckCircle, VerifiedUser, Place } from '@mui/icons-material';

import { useLocale } from '../../hooks/usePreferences';
import { tokens } from '../../theme';

export function HeroSection() {
  const { t } = useLocale();
  const navigate = useNavigate();

  // Floating decorative cards facts (real project data only)
  const floatingCards = [
    {
      id: 'card-1',
      side: 'left',
      outer: true,
      rotate: '-4deg',
      top: '12%',
      left: { xs: '-8px', sm: '2%', md: '3%', lg: '5%' },
      delay: '0s',
      icon: <Place sx={{ fontSize: 18, color: 'var(--accent-text)' }} />,
      text: t('hero.factRegions') || '37 regions in the labour snapshot',
    },
    {
      id: 'card-2',
      side: 'left',
      outer: false,
      rotate: '2deg',
      top: '56%',
      left: { xs: '0px', sm: '3%', md: '6%', lg: '8%' },
      delay: '1.5s',
      icon: <Storage sx={{ fontSize: 18, color: 'var(--status-undersupply-text)' }} />,
      text: t('hero.factRecords') || '1,341 labour records',
    },
    {
      id: 'card-3',
      side: 'right',
      outer: false,
      rotate: '-2.5deg',
      top: '18%',
      right: { xs: '0px', sm: '3%', md: '6%', lg: '8%' },
      delay: '3s',
      icon: <VerifiedUser sx={{ fontSize: 18, color: 'var(--accent-text)' }} />,
      text: t('hero.factSources') || '9 official sources, each checksummed',
    },
    {
      id: 'card-4',
      side: 'right',
      outer: true,
      rotate: '3.5deg',
      top: '60%',
      right: { xs: '-8px', sm: '2%', md: '3%', lg: '5%' },
      delay: '4.5s',
      icon: <CheckCircle sx={{ fontSize: 18, color: 'var(--status-balanced-text)' }} />,
      text: t('hero.factQuality') || '0 quality errors in the latest data report',
    },
  ];

  const trustedSources = ['PLFS', 'PMKVY', 'NCS', 'NIC'];

  return (
    <Box
      component="section"
      aria-labelledby="hero-display-heading"
      sx={{
        position: 'relative',
        pt: { xs: 4, sm: 6, md: 8 },
        pb: { xs: 8, sm: 10, md: 12 },
        px: { xs: 2, sm: 3, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Glowing coral-red light source behind the centre of the hero */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '320px', sm: '540px', md: '720px' },
          height: { xs: '320px', sm: '540px', md: '720px' },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201, 55, 42, 0.22) 0%, rgba(201, 55, 42, 0.08) 45%, rgba(238, 240, 243, 0) 72%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Four floating decorative cards (two on each side) */}
      {floatingCards.map((card) => (
        <Box
          key={card.id}
          aria-hidden="true"
          sx={{
            display: { xs: 'none', md: 'flex' },
            position: 'absolute',
            top: card.top,
            left: card.left,
            right: card.right,
            zIndex: 2,
            rotate: card.rotate,
            animation: 'floatDrift 6s ease-in-out infinite',
            animationDelay: card.delay,
            filter: card.outer ? 'blur(1px) opacity(0.72)' : 'none',
            opacity: card.outer ? 0.72 : 0.95,
            pointerEvents: 'none',
            maxWidth: '220px',
            backgroundColor: 'var(--glass-surface)',
            backdropFilter: 'blur(16px) saturate(140%)',
            WebkitBackdropFilter: 'blur(16px) saturate(140%)',
            border: '1px solid var(--glass-border)',
            borderRadius: tokens.radius.card,
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.07)',
            p: 2,
            alignItems: 'center',
            gap: 1.5,
            transition: 'opacity 200ms ease',
            '@media (prefers-reduced-motion: reduce)': {
              animation: 'none !important',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 34,
              height: 34,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.65)',
              border: '1px solid var(--border-subtle)',
              flexShrink: 0,
            }}
          >
            {card.icon}
          </Box>
          <Typography
            sx={{
              fontSize: '0.8125rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              lineHeight: 1.35,
            }}
          >
            {card.text}
          </Typography>
        </Box>
      ))}

      {/* Large rounded panel on a soft, blurred backdrop */}
      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          zIndex: 3,
          backgroundColor: 'var(--glass-surface)',
          backdropFilter: 'blur(20px) saturate(140%)',
          WebkitBackdropFilter: 'blur(20px) saturate(140%)',
          border: '1px solid var(--glass-border)',
          borderRadius: { xs: '20px', sm: '28px', md: '36px' },
          boxShadow: '0 12px 48px 0 rgba(17, 24, 39, 0.08)',
          px: { xs: 3, sm: 5, md: 7 },
          py: { xs: 5, sm: 6, md: 7 },
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Status pill at the top */}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1.2,
            px: 2.2,
            py: 0.7,
            mb: 3.5,
            borderRadius: tokens.radius.pill,
            backgroundColor: 'rgba(201, 55, 42, 0.08)',
            border: '1px solid rgba(201, 55, 42, 0.25)',
            boxShadow: '0 2px 10px rgba(201, 55, 42, 0.08)',
          }}
        >
          <Box
            component="span"
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: 'var(--accent-fill)',
              display: 'inline-block',
              boxShadow: '0 0 8px var(--accent-fill)',
            }}
          />
          <Typography
            sx={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--accent-text)',
              letterSpacing: '0.02em',
            }}
          >
            {t('hero.statusPill') || 'Official data · Updated on each release'}
          </Typography>
        </Box>

        {/* Two-line display headline */}
        <Typography
          id="hero-display-heading"
          variant="h1"
          component="h1"
          sx={{
            fontFamily: 'var(--font-display)',
            fontSize: { xs: '2.25rem', sm: '3rem', md: '3.75rem' },
            fontWeight: 600,
            lineHeight: 1.12,
            letterSpacing: '-0.025em',
            color: 'var(--text-primary)',
            maxWidth: '780px',
            mb: 2.5,
            textWrap: 'balance',
          }}
        >
          {t('hero.headline') || 'Plan training where the jobs are.'}
        </Typography>

        {/* Short grey lead paragraph */}
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', sm: '1.125rem' },
            lineHeight: 1.65,
            color: 'var(--text-secondary)',
            maxWidth: '680px',
            mb: 4.5,
          }}
        >
          {t('hero.lead') ||
            'Compare official vacancy, training and labour data for every state and union territory, and see where skill supply and demand do not match.'}
        </Typography>

        {/* Two pill buttons side by side */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center',
            width: { xs: '100%', sm: 'auto' },
            mb: 5,
          }}
        >
          {/* Coral pill primary button with white circular arrow chip */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/intelligence')}
            endIcon={
              <Box
                component="span"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.28)',
                  ml: 1,
                }}
              >
                <ArrowForward sx={{ fontSize: 15, color: '#FFFFFF' }} />
              </Box>
            }
            sx={{
              backgroundColor: 'var(--accent-fill)',
              color: '#FFFFFF',
              borderRadius: tokens.radius.pill,
              px: { xs: 3.5, sm: 4 },
              py: 1.4,
              fontSize: '1.0625rem',
              fontWeight: 600,
              boxShadow: '0 6px 20px rgba(201, 55, 42, 0.38)',
              width: { xs: '100%', sm: 'auto' },
              '&:hover': {
                backgroundColor: 'var(--accent-hover)',
                boxShadow: '0 8px 24px rgba(201, 55, 42, 0.48)',
              },
            }}
          >
            {t('hero.openWorkspace') || 'Open the workspace'}
          </Button>

          {/* White secondary button */}
          <Button
            variant="outlined"
            onClick={() => navigate('/how-it-works')}
            sx={{
              backgroundColor: 'var(--bg-surface-solid)',
              color: 'var(--text-primary)',
              borderColor: 'var(--glass-border)',
              borderRadius: tokens.radius.pill,
              px: { xs: 3.5, sm: 4 },
              py: 1.4,
              fontSize: '1.0625rem',
              fontWeight: 500,
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)',
              width: { xs: '100%', sm: 'auto' },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderColor: 'var(--accent-text)',
              },
            }}
          >
            {t('hero.howItWorks') || 'How it works'}
          </Button>
        </Box>

        {/* Trust row */}
        <Box
          sx={{
            pt: 4,
            borderTop: '1px solid var(--border-subtle)',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.8,
          }}
        >
          <Typography
            sx={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-meta)',
            }}
          >
            {t('hero.trustedSources') || 'TRUSTED SOURCES'}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: { xs: 2.5, sm: 4, md: 5 },
              flexWrap: 'wrap',
            }}
          >
            {trustedSources.map((source) => (
              <Typography
                key={source}
                sx={{
                  fontFamily: 'var(--font-display)',
                  fontSize: { xs: '1.0625rem', sm: '1.25rem' },
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  color: 'var(--text-secondary)',
                  opacity: 0.85,
                  userSelect: 'none',
                  transition: 'opacity 180ms ease, color 180ms ease',
                  '&:hover': {
                    opacity: 1,
                    color: 'var(--accent-text)',
                  },
                }}
              >
                {source}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
