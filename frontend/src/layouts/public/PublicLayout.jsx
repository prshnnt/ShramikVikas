import React, { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useLocale } from '../../hooks/usePreferences';
import { getPublicTitles } from '../../app/config/publicNavigation';
import { PublicNavbar } from './PublicNavbar';
import { PublicFooter } from './PublicFooter';
import { ErrorBoundary } from '../../components/ui/ErrorBoundary';
import { RouteErrorFallback } from '../../components/ui/RouteErrorFallback';

export function PublicLayout() {
  const { t } = useLocale();
  const { pathname } = useLocation();
  const main = useRef(null);
  const previous = useRef(pathname);

  useEffect(() => {
    const label = getPublicTitles(t)[pathname] ?? t('common.platform');
    document.title = `Shramik Vikas · ${label}`;
    if (previous.current !== pathname) {
      window.scrollTo({ top: 0 });
      main.current?.focus();
      previous.current = pathname;
    }
  }, [pathname, t]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflowX: 'hidden',
        background: 'var(--bg-canvas-gradient)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '1440px',
          height: '750px',
          background: 'var(--bg-glow)',
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      <a className="skip-link" href="#public-content">
        {t('common.skip')}
      </a>

      <PublicNavbar key={pathname} />

      <Box
        component="main"
        ref={main}
        id="public-content"
        tabIndex={-1}
        sx={{
          flex: 1,
          position: 'relative',
          zIndex: 1,
          outline: 'none',
        }}
      >
        <ErrorBoundary
          resetKeys={[pathname]}
          fallbackRender={(props) => <RouteErrorFallback {...props} />}
        >
          <Outlet />
        </ErrorBoundary>
      </Box>

      <PublicFooter />
    </Box>
  );
}
