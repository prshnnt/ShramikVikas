import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useLocale } from '../../hooks/usePreferences';
import { getNavigation, getMissingPage } from '../../app/config/navigation';
import { DataProvider } from '../../features/real-intelligence/DataProvider';
import { useIntelligenceData } from '../../features/real-intelligence/dataContext';
import { WorkspaceSidebar } from './WorkspaceSidebar';
import { WorkspaceHeader } from './WorkspaceHeader';
import { WorkspaceBottomNav } from './WorkspaceBottomNav';
import { CommandPalette } from '../../components/navigation/CommandPalette';
import { WorkspaceDataBanner } from '../../components/workspace/WorkspaceDataBanner';
import { tokens } from '../../theme';

const RealIntelligencePage = lazy(() =>
  import('../../features/real-intelligence/RealIntelligencePage').then((module) => ({
    default: module.RealIntelligencePage,
  }))
);

export function AppShell() {
  return (
    <DataProvider>
      <WorkspaceShell />
    </DataProvider>
  );
}

function WorkspaceShell() {
  const { t } = useLocale();
  const { mode } = useIntelligenceData();
  const navigation = getNavigation(t);
  const missingPage = getMissingPage(t);
  const location = useLocation();
  const isDesktop = useMediaQuery('(min-width: 900px)');

  const [overlay, setOverlay] = useState(null);
  const [pinned, setPinned] = useState(() => {
    try {
      return localStorage.getItem('shramikvikas.sidebar.pinned') === 'true';
    } catch {
      return false;
    }
  });

  const heading = useRef(null);
  const previousPath = useRef(location.pathname);

  const togglePin = () => {
    setPinned((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('shramikvikas.sidebar.pinned', String(next));
      } catch {
        // Ignored
      }
      return next;
    });
  };

  const accountRoute =
    location.pathname === '/profile'
      ? 'profile'
      : location.pathname === '/settings'
      ? 'settings'
      : location.pathname === '/help'
      ? 'help'
      : null;

  const existingPage =
    navigation.find(
      (item) =>
        item.path === location.pathname.replace(/\/$/, '') ||
        (item.path === '/' && location.pathname === '/')
    ) ??
    (accountRoute
      ? {
          ...missingPage,
          label: t(`account.${accountRoute}`),
          title: t(`account.${accountRoute}`),
          description: t(`account.${accountRoute}Description`),
        }
      : missingPage);

  const routePath = location.pathname.replace(/\/$/, '') || '/';
  const isIntelligence = navigation.some((item) => item.path === routePath);
  const personalRoute =
    location.pathname === '/my-intelligence' || location.pathname === '/onboarding';

  const page = personalRoute
    ? {
        ...missingPage,
        label: t('personal.title'),
        title: t(location.pathname === '/onboarding' ? 'personal.onboard' : 'personal.title'),
        description: t('personal.intro'),
      }
    : mode === 'real' && isIntelligence
    ? {
        ...existingPage,
        title: routePath === '/forecast' ? t('forecast.shellTitle') : existingPage.title,
        description:
          routePath === '/early-warning' || routePath === '/scenarios'
            ? existingPage.description
            : t('real.bannerDetail'),
      }
    : existingPage;

  useEffect(() => {
    document.title = `${page.label} · Shramik Vikas`;
    if (previousPath.current !== location.pathname) {
      heading.current?.focus();
      window.scrollTo({ top: 0 });
      previousPath.current = location.pathname;
    }
  }, [location.pathname, page.label]);

  useEffect(() => {
    function onKey(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOverlay((current) => (current === 'search' ? null : 'search'));
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const contentMarginLeft = isDesktop ? (pinned ? '248px' : '72px') : 0;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-canvas-gradient)',
        backgroundAttachment: 'fixed',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <a className="skip-link" href="#main-content">
        {t('common.skip')}
      </a>

      {/* Desktop Glass Sidebar (collapsed 72px, expands on hover to 248px overlay, pinnable) */}
      {isDesktop && <WorkspaceSidebar pinned={pinned} onTogglePin={togglePin} />}

      {/* Main Container */}
      <Box
        sx={{
          flex: 1,
          ml: contentMarginLeft,
          transition: 'margin-left 180ms cubic-bezier(0.2, 0, 0, 1)',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          pb: { xs: 9, md: 4 }, // padding for mobile bottom nav
        }}
      >
        {/* Workspace Top Header */}
        <WorkspaceHeader page={page} onSearch={() => setOverlay('search')} />

        {/* Workspace Main Content */}
        <Box
          component="main"
          id="main-content"
          tabIndex={-1}
          sx={{
            flex: 1,
            px: { xs: 2, sm: 3, md: 4 },
            py: 3,
            maxWidth: '1440px',
            width: '100%',
            mx: 'auto',
            outline: 'none',
          }}
        >
          {/* Page Heading Banner */}
          <Box
            sx={{
              p: { xs: 2.5, sm: 3.5 },
              mb: 3,
              borderRadius: tokens.radius.card,
              backgroundColor: 'var(--glass-surface)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid var(--glass-border)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--accent-text)',
                display: 'block',
                mb: 0.8,
              }}
            >
              {t('navigation.workspaceEyebrow') || 'Labour Market Intelligence Layer'}
            </Typography>
            <Typography
              ref={heading}
              variant="h1"
              component="h1"
              tabIndex={-1}
              sx={{
                fontFamily: 'var(--font-display)',
                fontSize: { xs: '1.75rem', sm: '2.25rem' },
                fontWeight: 600,
                color: 'var(--text-primary)',
                mb: 1,
                outline: 'none',
              }}
            >
              {page.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'var(--text-secondary)',
                fontSize: { xs: '0.9375rem', sm: '1.0625rem' },
                lineHeight: 1.6,
                maxWidth: 820,
              }}
            >
              {page.description}
            </Typography>
          </Box>

          {/* Persistent Data Banner if intelligence view */}
          {isIntelligence && <WorkspaceDataBanner />}

          {/* Dynamic Page Views */}
          <Box key={location.pathname} sx={{ mt: 2 }}>
            {mode === 'real' && isIntelligence ? (
              <Suspense fallback={<p role="status">{t('real.loading')}</p>}>
                <RealIntelligencePage />
              </Suspense>
            ) : (
              <Outlet />
            )}
          </Box>
        </Box>

        {/* Workspace Footer */}
        <Box
          component="footer"
          sx={{
            py: 2,
            px: { xs: 2, sm: 3, md: 4 },
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.8125rem',
            color: 'var(--text-meta)',
            backgroundColor: 'transparent',
          }}
        >
          <span>{t(mode === 'real' ? 'real.footer' : 'navigation.workspaceFooter')}</span>
          <span>{t(mode === 'real' ? 'real.phase' : 'navigation.phase')}</span>
        </Box>
      </Box>

      {/* Mobile Glass Bottom Nav (< 900px) */}
      {!isDesktop && <WorkspaceBottomNav />}

      {/* Command Palette (Ctrl/Cmd+K) */}
      {overlay === 'search' && <CommandPalette onClose={() => setOverlay(null)} />}
    </Box>
  );
}
