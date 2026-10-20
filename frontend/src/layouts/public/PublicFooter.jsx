import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useLocale } from '../../hooks/usePreferences';
import { Brand } from '../../components/navigation/Brand';
import { socialLinks } from '../../app/config/social';
import { tokens } from '../../theme';

export function PublicFooter() {
  const { t } = useLocale();

  const platformLinks = [
    { key: 'common.intelligenceNav', path: '/intelligence' },
    { key: 'common.skills', path: '/skills' },
    { key: 'common.occupations', path: '/occupations' },
    { key: 'common.regions', path: '/regions' },
    { key: 'common.industries', path: '/industries' },
    { key: 'common.forecast', path: '/forecast' },
  ];

  const resourceLinks = [
    { key: 'common.how', path: '/how-it-works' },
    { key: 'common.docs', path: '/documentation' },
    { key: 'footer.evidence', path: '/#evidence' },
  ];

  const productLinks = [
    { key: 'common.about', path: '/about' },
    { key: 'common.contact', path: '/contact' },
    { key: 'common.privacy', path: '/privacy' },
    { key: 'common.terms', path: '/terms' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        pb: 6,
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          maxWidth: '1280px',
          margin: '0 auto',
          backgroundColor: 'var(--glass-surface)',
          backdropFilter: 'blur(20px) saturate(140%)',
          WebkitBackdropFilter: 'blur(20px) saturate(140%)',
          border: '1px solid var(--glass-border)',
          borderRadius: tokens.radius.card,
          p: { xs: 3, sm: 5, md: 6 },
          boxShadow: 'var(--glass-shadow)',
        }}
      >
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Brand & Description */}
          <Grid item xs={12} md={4}>
            <Brand full />
            <Typography
              variant="body2"
              sx={{
                mt: 2.5,
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                maxWidth: 340,
              }}
            >
              {t('footer.description')}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                display: 'inline-block',
                mt: 2,
                px: 1.5,
                py: 0.5,
                borderRadius: tokens.radius.pill,
                backgroundColor: 'rgba(201, 55, 42, 0.08)',
                color: 'var(--accent-text)',
                fontWeight: 500,
              }}
            >
              {t('footer.productNote')}
            </Typography>
          </Grid>

          {/* Platform Links */}
          <Grid item xs={6} sm={4} md={2.5}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: 'var(--text-primary)',
                mb: 2,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                fontSize: '0.8125rem',
              }}
            >
              {t('footer.platform')}
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {platformLinks.map(({ key, path }) => (
                <Box component="li" key={path} sx={{ mb: 1.2 }}>
                  <Link
                    to={path}
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.9375rem',
                      textDecoration: 'none',
                      transition: 'color 180ms ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-text)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {t(key)}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Resources Links */}
          <Grid item xs={6} sm={4} md={2.5}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: 'var(--text-primary)',
                mb: 2,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                fontSize: '0.8125rem',
              }}
            >
              {t('footer.resources')}
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {resourceLinks.map(({ key, path }) => (
                <Box component="li" key={path} sx={{ mb: 1.2 }}>
                  <Link
                    to={path}
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.9375rem',
                      textDecoration: 'none',
                      transition: 'color 180ms ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-text)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {t(key)}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Product & Connect Links */}
          <Grid item xs={12} sm={4} md={3}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: 'var(--text-primary)',
                mb: 2,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                fontSize: '0.8125rem',
              }}
            >
              {t('common.product')}
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mb: 3 }}>
              {productLinks.map(({ key, path }) => (
                <Box component="li" key={path} sx={{ mb: 1.2 }}>
                  <Link
                    to={path}
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.9375rem',
                      textDecoration: 'none',
                      transition: 'color 180ms ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-text)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {t(key)}
                  </Link>
                </Box>
              ))}
            </Box>

            {/* Social links if configured */}
            {socialLinks.length > 0 && (
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                {socialLinks.map(({ platform, href, icon }) => (
                  <Box
                    component="a"
                    key={platform}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('footer.external', { platform })}
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(17, 24, 39, 0.05)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-subtle)',
                      transition: 'all 180ms ease',
                      '&:hover': {
                        backgroundColor: 'var(--accent-fill)',
                        color: '#FFFFFF',
                        borderColor: 'var(--accent-fill)',
                      },
                    }}
                  >
                    <img
                      src={icon}
                      alt={platform}
                      style={{ width: 18, height: 18, filter: 'currentColor' }}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Grid>
        </Grid>

        {/* Bottom divider and copyright */}
        <Box
          sx={{
            mt: { xs: 4, md: 5 },
            pt: 3,
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
          }}
        >
          <Typography variant="caption" sx={{ color: 'var(--text-meta)' }}>
            © 2026 Shramik Vikas · Official Labour Market Intelligence for India
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link
              to="/privacy"
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.8125rem',
                textDecoration: 'none',
              }}
            >
              {t('common.privacy')}
            </Link>
            <Link
              to="/terms"
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.8125rem',
                textDecoration: 'none',
              }}
            >
              {t('common.terms')}
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
