import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { Menu as MenuIcon, Close as CloseIcon, ArrowForward, LightMode, DarkMode, Translate } from '@mui/icons-material';

import { useLocale, useTheme } from '../../hooks/usePreferences';
import { useAuth } from '../../app/providers/authContext';
import { Brand } from '../../components/navigation/Brand';
import { getPublicNavigation } from '../../app/config/publicNavigation';
import { tokens } from '../../theme';

export function PublicNavbar() {
  const { t, locale, setLocale } = useLocale();
  const { preference, resolved, setPreference } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery('(max-width: 899px)');
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = getPublicNavigation(t);

  const toggleLanguage = () => {
    setLocale(locale === 'en-IN' ? 'hi-IN' : 'en-IN');
  };

  const toggleTheme = () => {
    setPreference(resolved === 'dark' ? 'light' : 'dark');
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        top: 0,
        zIndex: 1100,
        backgroundColor: 'transparent',
        boxShadow: 'none',
        pt: { xs: 1.5, md: 2.5 },
        pb: 1.5,
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        {/* Brand logo to the left of the pill */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Brand />
        </Box>

        {/* Desktop: Floating Glass Pill containing links, preferences & Coral CTA */}
        {!isMobile ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { md: 2.5, lg: 3 },
              backgroundColor: 'var(--glass-surface)',
              backdropFilter: 'blur(20px) saturate(140%)',
              WebkitBackdropFilter: 'blur(20px) saturate(140%)',
              border: '1px solid var(--glass-border)',
              borderRadius: tokens.radius.pill,
              boxShadow: '0 8px 32px 0 rgba(17, 24, 39, 0.08)',
              py: 0.8,
              px: { md: 2, lg: 3 },
              transition: 'background-color 200ms ease, border-color 200ms ease',
            }}
          >
            {/* Nav links */}
            <Box component="nav" sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  style={({ isActive }) => ({
                    color: isActive ? 'var(--accent-text)' : 'var(--text-secondary)',
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '0.9375rem',
                    textDecoration: 'none',
                    padding: '6px 10px',
                    borderRadius: '999px',
                    transition: 'color 180ms ease',
                  })}
                >
                  {item.label}
                </NavLink>
              ))}
            </Box>

            {/* Separator */}
            <Box
              sx={{
                width: '1px',
                height: '22px',
                backgroundColor: 'var(--border-subtle)',
              }}
            />

            {/* Language switch button */}
            <Button
              size="small"
              onClick={toggleLanguage}
              aria-label={`Switch language. Current: ${locale === 'en-IN' ? 'English' : 'हिन्दी'}`}
              sx={{
                minWidth: 'auto',
                px: 1.5,
                py: 0.5,
                fontSize: '0.8125rem',
                color: 'var(--text-primary)',
                borderRadius: tokens.radius.pill,
                backgroundColor: 'rgba(17, 24, 39, 0.04)',
                '&:hover': {
                  backgroundColor: 'rgba(17, 24, 39, 0.08)',
                },
              }}
              startIcon={<Translate sx={{ fontSize: '1rem !important' }} />}
            >
              {locale === 'en-IN' ? 'हिन्दी' : 'EN'}
            </Button>

            {/* Theme toggle */}
            <IconButton
              size="small"
              onClick={toggleTheme}
              aria-label={resolved === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              sx={{
                color: 'var(--text-primary)',
                backgroundColor: 'rgba(17, 24, 39, 0.04)',
                '&:hover': {
                  backgroundColor: 'rgba(17, 24, 39, 0.08)',
                },
              }}
            >
              {resolved === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
            </IconButton>

            {/* Solid coral pill CTA on the right */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(user ? '/intelligence' : '/intelligence')}
              endIcon={
                <Box
                  component="span"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.24)',
                    ml: 0.5,
                  }}
                >
                  <ArrowForward sx={{ fontSize: 13, color: '#FFFFFF' }} />
                </Box>
              }
              sx={{
                backgroundColor: 'var(--accent-fill)',
                color: '#FFFFFF',
                borderRadius: tokens.radius.pill,
                px: 2.5,
                py: 1,
                fontSize: '0.9375rem',
                fontWeight: 600,
                boxShadow: '0 4px 14px rgba(201, 55, 42, 0.35)',
                '&:hover': {
                  backgroundColor: 'var(--accent-hover)',
                  boxShadow: '0 6px 20px rgba(201, 55, 42, 0.45)',
                },
              }}
            >
              {user ? t('account.workspace') : t('hero.cta') || 'Open workspace'}
            </Button>
          </Box>
        ) : (
          /* Mobile navigation button */
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              size="small"
              onClick={toggleLanguage}
              aria-label="Toggle language"
              sx={{
                minWidth: 'auto',
                px: 1.2,
                py: 0.4,
                fontSize: '0.8125rem',
                color: 'var(--text-primary)',
                borderRadius: tokens.radius.pill,
                backgroundColor: 'var(--glass-surface)',
                border: '1px solid var(--glass-border)',
              }}
            >
              {locale === 'en-IN' ? 'हिन्दी' : 'EN'}
            </Button>
            <IconButton
              size="small"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              sx={{
                color: 'var(--text-primary)',
                backgroundColor: 'var(--glass-surface)',
                border: '1px solid var(--glass-border)',
              }}
            >
              {resolved === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
            </IconButton>
            <IconButton
              aria-label={t('navigation.openProduct') || 'Open navigation menu'}
              onClick={() => setMobileOpen(true)}
              sx={{
                color: 'var(--text-primary)',
                backgroundColor: 'var(--glass-surface)',
                border: '1px solid var(--glass-border)',
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* Mobile Drawer (under 900px) */}
      <Drawer
        anchor="top"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: 'var(--glass-surface)',
            backdropFilter: 'blur(24px) saturate(160%)',
            WebkitBackdropFilter: 'blur(24px) saturate(160%)',
            borderBottom: '1px solid var(--glass-border)',
            borderRadius: '0 0 24px 24px',
            px: 3,
            py: 3,
            boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Brand />
          <IconButton
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            sx={{ color: 'var(--text-primary)' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ pt: 1, pb: 2 }}>
          {navItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                sx={{
                  borderRadius: tokens.radius.pill,
                  my: 0.5,
                  py: 1.2,
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    fontSize: '1.0625rem',
                    color: 'var(--text-primary)',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            component={Link}
            to="/intelligence"
            onClick={() => setMobileOpen(false)}
            sx={{
              backgroundColor: 'var(--accent-fill)',
              color: '#FFFFFF',
              borderRadius: tokens.radius.pill,
              py: 1.4,
              fontSize: '1rem',
              fontWeight: 600,
              boxShadow: '0 4px 14px rgba(201, 55, 42, 0.35)',
            }}
          >
            {t('hero.cta') || 'Open the workspace'}
          </Button>

          {!user && (
            <Button
              variant="outlined"
              fullWidth
              component={Link}
              to="/auth/signin"
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: tokens.radius.pill,
                py: 1.2,
                borderColor: 'var(--glass-border)',
                color: 'var(--text-primary)',
              }}
            >
              {t('common.signIn')}
            </Button>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
}
