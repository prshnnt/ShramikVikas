import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import {
  DashboardOutlined,
  PlaceOutlined,
  TrendingUp,
  CompareArrows,
  MoreHoriz,
  Close,
  SchoolOutlined,
  PsychologyOutlined,
  Work,
  FactoryOutlined,
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
import { tokens } from '../../theme';

export function WorkspaceBottomNav() {
  const { t } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();
  const [moreOpen, setMoreOpen] = useState(false);

  const mainItems = [
    { path: '/intelligence', label: t('common.overview') || 'Overview', icon: <DashboardOutlined /> },
    { path: '/regions', label: t('common.regions') || 'Regions', icon: <PlaceOutlined /> },
    { path: '/demand', label: t('common.demand') || 'Demand', icon: <TrendingUp /> },
    { path: '/skill-gaps', label: t('common.skillGaps') || 'Skill Gaps', icon: <CompareArrows /> },
  ];

  const secondaryGroups = [
    {
      title: 'Data & Signals',
      items: [
        { path: '/skills', label: t('common.skills') || 'Skills', icon: <PsychologyOutlined /> },
        { path: '/occupations', label: t('common.occupations') || 'Occupations', icon: <Work /> },
        { path: '/industries', label: t('common.industries') || 'Industries', icon: <FactoryOutlined /> },
        { path: '/supply', label: t('common.supply') || 'Supply', icon: <SchoolOutlined /> },
        { path: '/early-warning', label: t('warning.nav') || 'Early Warning', icon: <WarningAmber /> },
      ],
    },
    {
      title: 'Planning & Export',
      items: [
        { path: '/forecast', label: t('common.forecast') || 'Forecast', icon: <Timeline /> },
        { path: '/scenarios', label: t('scenario.nav') || 'Scenarios', icon: <Tune /> },
        { path: '/spatial', label: t('workspace.spatialTitle') || 'Spatial', icon: <PublicOutlined /> },
        { path: '/reports', label: t('common.reports') || 'Reports', icon: <DescriptionOutlined /> },
      ],
    },
    {
      title: 'Personal & Help',
      items: [
        { path: '/my-intelligence', label: t('personal.title') || 'My Intelligence', icon: <BookmarkBorder /> },
        { path: '/profile', label: t('account.profile') || 'Profile', icon: <PersonOutlined /> },
        { path: '/settings', label: t('account.settings') || 'Settings', icon: <SettingsOutlined /> },
        { path: '/help', label: t('account.help') || 'Help & Glossary', icon: <HelpOutlined /> },
      ],
    },
  ];

  const currentPath = location.pathname;
  const isMain = mainItems.some((item) => item.path === currentPath);

  return (
    <>
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          backgroundColor: 'var(--glass-surface)',
          backdropFilter: 'blur(20px) saturate(140%)',
          WebkitBackdropFilter: 'blur(20px) saturate(140%)',
          borderTop: '1px solid var(--glass-border)',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.08)',
        }}
      >
        <BottomNavigation
          showLabels
          value={isMain ? currentPath : 'more'}
          onChange={(_, newValue) => {
            if (newValue === 'more') {
              setMoreOpen(true);
            } else {
              navigate(newValue);
            }
          }}
          sx={{
            backgroundColor: 'transparent',
            height: 64,
            '& .MuiBottomNavigationAction-root': {
              minWidth: 'auto',
              padding: '6px 0',
              color: 'var(--text-secondary)',
              '&.Mui-selected': {
                color: 'var(--accent-text)',
                fontWeight: 600,
              },
            },
          }}
        >
          {mainItems.map((item) => (
            <BottomNavigationAction
              key={item.path}
              value={item.path}
              label={item.label}
              icon={item.icon}
            />
          ))}
          <BottomNavigationAction
            value="more"
            label={t('common.more') || 'More'}
            icon={<MoreHoriz />}
          />
        </BottomNavigation>
      </Box>

      {/* "More" Sheet for mobile */}
      <Drawer
        anchor="bottom"
        open={moreOpen}
        onClose={() => setMoreOpen(false)}
        slotProps={{ paper: {
          sx: {
            backgroundColor: 'var(--glass-surface)',
            backdropFilter: 'blur(24px) saturate(160%)',
            WebkitBackdropFilter: 'blur(24px) saturate(160%)',
            borderTop: '1px solid var(--glass-border)',
            borderRadius: '24px 24px 0 0',
            maxHeight: '80vh',
            px: 3,
            py: 3,
          },
        } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h3" sx={{ fontSize: '1.25rem', fontWeight: 600 }}>
            {t('navigation.explore') || 'All Workspace Sections'}
          </Typography>
          <IconButton onClick={() => setMoreOpen(false)} aria-label="Close sheet">
            <Close />
          </IconButton>
        </Box>

        <Box sx={{ overflowY: 'auto' }}>
          {secondaryGroups.map((group) => (
            <Box key={group.title} sx={{ mb: 3 }}>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-meta)',
                  mb: 1,
                }}
              >
                {group.title}
              </Typography>
              <List disablePadding>
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                      <ListItemButton
                        component={Link}
                        to={item.path}
                        onClick={() => setMoreOpen(false)}
                        sx={{
                          borderRadius: tokens.radius.pill,
                          py: 1,
                          backgroundColor: isActive ? 'var(--accent-fill)' : 'transparent',
                          color: isActive ? '#FFFFFF' : 'var(--text-primary)',
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color: isActive ? '#FFFFFF' : 'var(--accent-text)',
                            minWidth: 40,
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.label}
                          slotProps={{
                            primary: {
                              fontSize: '0.9375rem',
                              fontWeight: isActive ? 600 : 500,
                            },
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
              <Divider sx={{ mt: 2, borderColor: 'var(--border-subtle)' }} />
            </Box>
          ))}
        </Box>
      </Drawer>
    </>
  );
}
