import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import {
  Search,
  LightMode,
  DarkMode,
  Translate,
  PersonOutlined,
  SettingsOutlined,
  HelpOutlined,
  BookmarkBorder,
  Logout,
  FilterAltOutlined,
} from '@mui/icons-material';

import { useLocale, useTheme } from '../../hooks/usePreferences';
import { useAuth } from '../../app/providers/authContext';
import { useIntelligenceData } from '../../features/real-intelligence/dataContext';
import { tokens } from '../../theme';

export function WorkspaceHeader({ page, onSearch }) {
  const { t, locale, setLocale } = useLocale();
  const { resolved, setPreference } = useTheme();
  const { user, signOut } = useAuth();
  const { mode } = useIntelligenceData();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const toggleLanguage = () => {
    setLocale(locale === 'en-IN' ? 'hi-IN' : 'en-IN');
  };

  const toggleTheme = () => {
    setPreference(resolved === 'dark' ? 'light' : 'dark');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    try {
      await signOut();
    } catch {
      // Ignored
    }
  };

  const initials = user?.name
    ? user.name
        .split(/\s+/)
        .slice(0, 2)
        .map((p) => p[0])
        .join('')
        .toUpperCase()
    : 'SV';

  return (
    <Box
      component="header"
      sx={{
        height: 64,
        px: { xs: 2, sm: 3, md: 4 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'var(--glass-surface)',
        backdropFilter: 'blur(18px) saturate(140%)',
        WebkitBackdropFilter: 'blur(18px) saturate(140%)',
        borderBottom: '1px solid var(--glass-border)',
        position: 'sticky',
        top: 0,
        zIndex: 90,
      }}
    >
      {/* Left: Quick search button */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          onClick={onSearch}
          aria-label={t('search.title') || 'Search intelligence'}
          startIcon={<Search sx={{ fontSize: 18, color: 'var(--accent-text)' }} />}
          endIcon={
            <Box
              component="span"
              sx={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                px: 0.8,
                py: 0.2,
                borderRadius: '4px',
                backgroundColor: 'rgba(17, 24, 39, 0.08)',
                color: 'var(--text-meta)',
                ml: 1,
              }}
            >
              Ctrl K
            </Box>
          }
          sx={{
            borderRadius: tokens.radius.pill,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-secondary)',
            px: 2,
            py: 0.6,
            fontSize: '0.875rem',
            fontWeight: 500,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--accent-text)',
            },
          }}
        >
          {t('search.workspace') || 'Search pages, states, industries...'}
        </Button>

        {/* Real data badge */}
        <Chip
          label="Official Data"
          size="small"
          sx={{
            display: { xs: 'none', sm: 'inline-flex' },
            fontSize: '0.75rem',
            fontWeight: 600,
            backgroundColor: 'rgba(15, 118, 110, 0.1)',
            color: 'var(--status-undersupply-text)',
          }}
        />
      </Box>

      {/* Right: Preferences & Account */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* Language switcher */}
        <Button
          size="small"
          onClick={toggleLanguage}
          aria-label={`Switch language. Current: ${locale === 'en-IN' ? 'English' : 'हिन्दी'}`}
          startIcon={<Translate sx={{ fontSize: '1rem !important' }} />}
          sx={{
            borderRadius: tokens.radius.pill,
            color: 'var(--text-primary)',
            fontSize: '0.8125rem',
            px: 1.5,
            py: 0.5,
          }}
        >
          {locale === 'en-IN' ? 'हिन्दी' : 'English'}
        </Button>

        {/* Theme toggle */}
        <Tooltip title={resolved === 'dark' ? 'Light mode' : 'Dark mode'}>
          <IconButton
            size="small"
            onClick={toggleTheme}
            aria-label={resolved === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            sx={{
              color: 'var(--text-primary)',
              p: 0.8,
            }}
          >
            {resolved === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
          </IconButton>
        </Tooltip>

        {/* User Account Menu */}
        {user ? (
          <>
            <Tooltip title={user.name}>
              <IconButton
                onClick={handleMenuOpen}
                aria-label={t('account.openMenu') || 'Open account menu'}
                aria-controls={openMenu ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? 'true' : undefined}
                sx={{ ml: 0.5 }}
              >
                <Avatar
                  sx={{
                    width: 34,
                    height: 34,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    backgroundColor: 'var(--accent-fill)',
                    color: '#FFFFFF',
                  }}
                >
                  {initials}
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              id="account-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  width: 240,
                  backgroundColor: 'var(--glass-surface)',
                  backdropFilter: 'blur(20px) saturate(140%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(140%)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: tokens.radius.card,
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
                  mt: 1,
                  p: 1,
                },
              }}
            >
              <Box sx={{ px: 2, py: 1.2 }}>
                <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                  {user.name}
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', color: 'var(--text-meta)' }}>
                  {user.email}
                </Typography>
              </Box>
              <Divider sx={{ my: 1, borderColor: 'var(--border-subtle)' }} />

              <MenuItem
                component={Link}
                to="/my-intelligence"
                onClick={handleMenuClose}
                sx={{ borderRadius: '8px', gap: 1.5, fontSize: '0.875rem' }}
              >
                <BookmarkBorder fontSize="small" sx={{ color: 'var(--accent-text)' }} />
                {t('personal.title') || 'My Intelligence'}
              </MenuItem>
              <MenuItem
                component={Link}
                to="/profile"
                onClick={handleMenuClose}
                sx={{ borderRadius: '8px', gap: 1.5, fontSize: '0.875rem' }}
              >
                <PersonOutline fontSize="small" sx={{ color: 'var(--accent-text)' }} />
                {t('account.profile') || 'Profile'}
              </MenuItem>
              <MenuItem
                component={Link}
                to="/settings"
                onClick={handleMenuClose}
                sx={{ borderRadius: '8px', gap: 1.5, fontSize: '0.875rem' }}
              >
                <SettingsOutlined fontSize="small" sx={{ color: 'var(--accent-text)' }} />
                {t('account.settings') || 'Settings'}
              </MenuItem>
              <MenuItem
                component={Link}
                to="/help"
                onClick={handleMenuClose}
                sx={{ borderRadius: '8px', gap: 1.5, fontSize: '0.875rem' }}
              >
                <HelpOutline fontSize="small" sx={{ color: 'var(--accent-text)' }} />
                {t('account.help') || 'Help & Glossary'}
              </MenuItem>

              <Divider sx={{ my: 1, borderColor: 'var(--border-subtle)' }} />
              <MenuItem
                onClick={handleLogout}
                sx={{ borderRadius: '8px', gap: 1.5, fontSize: '0.875rem', color: 'var(--accent-text)' }}
              >
                <Logout fontSize="small" />
                {t('account.signOut') || 'Sign out'}
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/auth/signin"
            sx={{
              borderRadius: tokens.radius.pill,
              px: 2.2,
              py: 0.6,
              fontSize: '0.875rem',
              fontWeight: 600,
              backgroundColor: 'var(--accent-fill)',
            }}
          >
            {t('common.signIn') || 'Sign In'}
          </Button>
        )}
      </Box>
    </Box>
  );
}
