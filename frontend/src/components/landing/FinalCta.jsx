import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ArrowForward, VerifiedUser, ShieldOutlined, LockOutlined, AutoAwesome } from '@mui/icons-material';

import { useLocale } from '../../hooks/usePreferences';
import { tokens } from '../../theme';

export function FinalCta() {
  const { t } = useLocale();

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
        {/* Trust Line */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 2, sm: 4, md: 6 },
            flexWrap: 'wrap',
            mb: 8,
            py: 3,
            px: 4,
            backgroundColor: 'var(--glass-surface)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid var(--glass-border)',
            borderRadius: tokens.radius.pill,
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <VerifiedUser sx={{ fontSize: 18, color: 'var(--status-balanced-text)' }} />
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
              100% Official Microdata
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ShieldOutlined sx={{ fontSize: 18, color: 'var(--accent-text)' }} />
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
              Cryptographically Checksummed
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LockOutlined sx={{ fontSize: 18, color: 'var(--status-undersupply-text)' }} />
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
              Zero Client Testimonials or Invented Numbers
            </Typography>
          </Box>
        </Box>

        {/* Closing Call to Action Card */}
        <Box
          sx={{
            position: 'relative',
            p: { xs: 5, sm: 7, md: 8 },
            backgroundColor: 'var(--glass-surface)',
            backdropFilter: 'blur(24px) saturate(140%)',
            WebkitBackdropFilter: 'blur(24px) saturate(140%)',
            border: '1px solid var(--glass-border)',
            borderRadius: tokens.radius.card,
            boxShadow: '0 16px 48px 0 rgba(17, 24, 39, 0.08)',
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Subtle coral glow inside the card */}
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              top: '-30%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: '80%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(201, 55, 42, 0.15) 0%, rgba(201, 55, 42, 0) 70%)',
              filter: 'blur(35px)',
              pointerEvents: 'none',
            }}
          />

          <Typography
            sx={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--accent-text)',
              mb: 2,
              position: 'relative',
            }}
          >
            {t('cta.eyebrow') || 'START EXPLORING'}
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontFamily: 'var(--font-display)',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 600,
              color: 'var(--text-primary)',
              maxWidth: 720,
              margin: '0 auto',
              mb: 2.5,
              position: 'relative',
            }}
          >
            {t('cta.title') || 'Plan training where the jobs are.'}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'var(--text-secondary)',
              maxWidth: 600,
              margin: '0 auto',
              mb: 4.5,
              lineHeight: 1.7,
              position: 'relative',
            }}
          >
            {t('cta.note') ||
              'Access state-wise vacancy comparisons, qualification benchmarks, and early shortage signals.'}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/intelligence"
              endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
              sx={{
                borderRadius: tokens.radius.pill,
                px: 4,
                py: 1.5,
                fontSize: '1.0625rem',
                fontWeight: 600,
                backgroundColor: 'var(--accent-fill)',
                boxShadow: '0 6px 20px rgba(201, 55, 42, 0.38)',
                '&:hover': {
                  backgroundColor: 'var(--accent-hover)',
                  boxShadow: '0 8px 24px rgba(201, 55, 42, 0.48)',
                },
              }}
            >
              {t('hero.openWorkspace') || 'Open the workspace'}
            </Button>

            <Button
              variant="outlined"
              component={Link}
              to="/how-it-works"
              sx={{
                borderRadius: tokens.radius.pill,
                px: 3.5,
                py: 1.5,
                fontSize: '1.0625rem',
                fontWeight: 500,
                color: 'var(--text-primary)',
                borderColor: 'var(--glass-border)',
                backgroundColor: 'var(--bg-surface-solid)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                },
              }}
            >
              {t('hero.howItWorks') || 'How it works'}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
