import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import {
  DashboardOutlined,
  PlaceOutlined,
  PsychologyOutlined,
  Work,
  FactoryOutlined,
  TrendingUp,
  SchoolOutlined,
  CompareArrows,
  WarningAmber,
  Timeline,
  Tune,
  PublicOutlined,
  DescriptionOutlined,
  BookmarkBorder,
  PersonOutlined,
  SettingsOutlined,
  HelpOutlined,
} from '@mui/icons-material';

import { useLocale } from '../../hooks/usePreferences';
import { Brand } from '../../components/navigation/Brand';
import { tokens } from '../../theme';

// Fixed width. The sidebar is always expanded and always shows labels.
export const SIDEBAR_WIDTH = 248;

export function WorkspaceSidebar() {
  const { t } = useLocale();
  const location = useLocation();

  const groups = [
    {
      heading: t('workspace.overviewGroup'),
      items: [{ path: '/intelligence', label: t('common.overview'), icon: <DashboardOutlined /> }],
    },
    {
      heading: t('workspace.dataGroup'),
      items: [
        { path: '/regions', label: t('common.regions'), icon: <PlaceOutlined /> },
        { path: '/skills', label: t('common.skills'), icon: <PsychologyOutlined /> },
        { path: '/occupations', label: t('common.occupations'), icon: <Work /> },
        { path: '/industries', label: t('common.industries'), icon: <FactoryOutlined /> },
      ],
    },
    {
      heading: t('workspace.signalsGroup'),
      items: [
        { path: '/demand', label: t('common.demand'), icon: <TrendingUp /> },
        { path: '/supply', label: t('common.supply'), icon: <SchoolOutlined /> },
        { path: '/skill-gaps', label: t('common.skillGaps'), icon: <CompareArrows /> },
        { path: '/early-warning', label: t('warning.nav'), icon: <WarningAmber /> },
      ],
    },
    {
      heading: t('workspace.planningGroup'),
      items: [
        { path: '/forecast', label: t('common.forecast'), icon: <Timeline /> },
        { path: '/scenarios', label: t('scenario.nav'), icon: <Tune /> },
        { path: '/spatial', label: t('workspace.spatialTitle'), icon: <PublicOutlined /> },
        { path: '/reports', label: t('common.reports'), icon: <DescriptionOutlined /> },
      ],
    },
    {
      heading: t('workspace.accountGroup'),
      items: [
        { path: '/my-intelligence', label: t('personal.title'), icon: <BookmarkBorder /> },
        { path: '/profile', label: t('account.profile'), icon: <PersonOutlined /> },
        { path: '/settings', label: t('account.settings'), icon: <SettingsOutlined /> },
        { path: '/help', label: t('account.help'), icon: <HelpOutlined /> },
      ],
    },
  ];

  return (
    <Drawer
      variant="permanent"
      component="nav"
      aria-label={t('workspace.navLabel')}
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          boxSizing: 'border-box',
          overflowX: 'hidden',
          backgroundColor: 'var(--glass-surface)',
          backdropFilter: 'blur(20px) saturate(140%)',
          WebkitBackdropFilter: 'blur(20px) saturate(140%)',
          borderRight: '1px solid var(--glass-border)',
          px: 1.5,
          py: 2,
        },
      }}
    >
      <Box sx={{ px: 1, mb: 2.5, height: 48, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <Brand />
      </Box>

      <Box sx={{ overflowY: 'auto', flex: 1, pr: 0.5 }}>
        {groups.map((group) => (
          <Box key={group.heading} component="section" sx={{ mb: 2.5 }}>
            <Typography
              variant="caption"
              component="h2"
              sx={{
                display: 'block',
                px: 1.5,
                mb: 0.8,
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-meta)',
              }}
            >
              {group.heading}
            </Typography>

            <List disablePadding>
              {group.items.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  (item.path !== '/intelligence' && location.pathname.startsWith(item.path));

                return (
                  <ListItemButton
                    key={item.path}
                    component={NavLink}
                    to={item.path}
                    selected={isActive}
                    sx={{
                      minHeight: 44,
                      mb: 0.5,
                      borderRadius: tokens.radius.pill,
                      px: 1.6,
                      color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                      backgroundColor: isActive ? 'var(--accent-fill)' : 'transparent',
                      boxShadow: isActive ? '0 4px 14px rgba(201, 55, 42, 0.35)' : 'none',
                      transition: 'background-color 180ms ease, color 180ms ease',
                      '&.Mui-selected, &.Mui-selected:hover': {
                        backgroundColor: 'var(--accent-fill)',
                        color: '#FFFFFF',
                      },
                      '&:hover': {
                        backgroundColor: isActive ? 'var(--accent-hover)' : 'rgba(255, 255, 255, 0.12)',
                        color: isActive ? '#FFFFFF' : 'var(--text-primary)',
                      },
                      '&:focus-visible': { outline: '2px solid var(--focus-ring)', outlineOffset: 2 },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 0, mr: 1.6, justifyContent: 'center', color: 'inherit' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      slotProps={{ primary: { fontSize: '0.9375rem', fontWeight: isActive ? 600 : 500, noWrap: true } }}
                    />
                  </ListItemButton>
                );
              })}
            </List>
          </Box>
        ))}
      </Box>
    </Drawer>
  );
}
