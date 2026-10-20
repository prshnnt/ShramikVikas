import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
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
  PushPin,
  PushPinOutlined,
} from '@mui/icons-material';

import { useLocale } from '../../hooks/usePreferences';
import { Brand } from '../../components/navigation/Brand';
import { tokens } from '../../theme';

export function WorkspaceSidebar({ pinned, onTogglePin }) {
  const { t } = useLocale();
  const location = useLocation();
  const [hovered, setHovered] = useState(false);

  const isExpanded = pinned || hovered;

  const groups = [
    {
      heading: t('workspace.overviewGroup') || 'OVERVIEW',
      items: [
        { path: '/intelligence', label: t('common.overview') || 'Overview', icon: <DashboardOutlined /> },
      ],
    },
    {
      heading: t('workspace.dataGroup') || 'DATA',
      items: [
        { path: '/regions', label: t('common.regions') || 'Regions', icon: <PlaceOutlined /> },
        { path: '/skills', label: t('common.skills') || 'Skills', icon: <PsychologyOutlined /> },
        { path: '/occupations', label: t('common.occupations') || 'Occupations', icon: <Work /> },
        { path: '/industries', label: t('common.industries') || 'Industries', icon: <FactoryOutlined /> },
      ],
    },
    {
      heading: t('workspace.signalsGroup') || 'SIGNALS',
      items: [
        { path: '/demand', label: t('common.demand') || 'Demand', icon: <TrendingUp /> },
        { path: '/supply', label: t('common.supply') || 'Supply', icon: <SchoolOutlined /> },
        { path: '/skill-gaps', label: t('common.skillGaps') || 'Skill Gaps', icon: <CompareArrows /> },
        { path: '/early-warning', label: t('warning.nav') || 'Early Warning', icon: <WarningAmber /> },
      ],
    },
    {
      heading: t('workspace.planningGroup') || 'PLANNING',
      items: [
        { path: '/forecast', label: t('common.forecast') || 'Forecast', icon: <Timeline /> },
        { path: '/scenarios', label: t('scenario.nav') || 'Scenarios', icon: <Tune /> },
        { path: '/spatial', label: t('workspace.spatialTitle') || 'Spatial View', icon: <PublicOutlined /> },
        { path: '/reports', label: t('common.reports') || 'Reports', icon: <DescriptionOutlined /> },
      ],
    },
    {
      heading: t('workspace.accountGroup') || 'ACCOUNT',
      items: [
        { path: '/my-intelligence', label: t('personal.title') || 'My Intelligence', icon: <BookmarkBorder /> },
        { path: '/profile', label: t('account.profile') || 'Profile', icon: <PersonOutlined /> },
        { path: '/settings', label: t('account.settings') || 'Settings', icon: <SettingsOutlined /> },
        { path: '/help', label: t('account.help') || 'Help & Glossary', icon: <HelpOutlined /> },
      ],
    },
  ];

  return (
    <Drawer
      variant="permanent"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setHovered(false);
        }
      }}
      PaperProps={{
        sx: {
          width: isExpanded ? 248 : 72,
          transition: 'width 180ms cubic-bezier(0.2, 0, 0, 1), box-shadow 180ms ease',
          overflowX: 'hidden',
          backgroundColor: 'var(--glass-surface)',
          backdropFilter: 'blur(20px) saturate(140%)',
          WebkitBackdropFilter: 'blur(20px) saturate(140%)',
          borderRight: '1px solid var(--glass-border)',
          boxShadow: isExpanded && !pinned ? '8px 0 32px rgba(0, 0, 0, 0.12)' : 'none',
          zIndex: isExpanded && !pinned ? 1200 : 100,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          py: 2,
          px: 1.2,
        },
      }}
    >
      <Box sx={{ overflowY: 'auto', overflowX: 'hidden', flex: 1, pr: 0.5 }}>
        {/* Brand Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 48,
            px: 1,
            mb: 2,
            overflow: 'hidden',
          }}
        >
          <Brand />
        </Box>

        {/* Navigation Groups */}
        {groups.map((group, gIdx) => (
          <Box key={group.heading} sx={{ mb: 2 }}>
            {/* Group Heading (fades in on expand) */}
            <Typography
              variant="caption"
              sx={{
                px: 1.5,
                mb: 0.8,
                display: 'block',
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: 'var(--text-meta)',
                opacity: isExpanded ? 1 : 0,
                transition: 'opacity 180ms ease',
                whiteSpace: 'nowrap',
                height: isExpanded ? 'auto' : 0,
                overflow: 'hidden',
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
                  <ListItem key={item.path} disablePadding sx={{ mb: 0.6 }}>
                    <Tooltip
                      title={!isExpanded ? item.label : ''}
                      placement="right"
                      arrow
                    >
                      <ListItemButton
                        component={NavLink}
                        to={item.path}
                        aria-label={item.label}
                        sx={{
                          minHeight: 44,
                          borderRadius: tokens.radius.pill,
                          px: 1.6,
                          justifyContent: isExpanded ? 'initial' : 'center',
                          backgroundColor: isActive ? 'var(--accent-fill)' : 'transparent',
                          color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                          boxShadow: isActive ? '0 4px 14px rgba(201, 55, 42, 0.35)' : 'none',
                          transition: 'all 180ms ease',
                          '&:hover': {
                            backgroundColor: isActive
                              ? 'var(--accent-hover)'
                              : 'rgba(255, 255, 255, 0.12)',
                            color: isActive ? '#FFFFFF' : 'var(--text-primary)',
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: isExpanded ? 2 : 'auto',
                            justifyContent: 'center',
                            color: isActive ? '#FFFFFF' : 'inherit',
                            '& .MuiSvgIcon-root': {
                              fontSize: '1.25rem',
                            },
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{
                            fontSize: '0.875rem',
                            fontWeight: isActive ? 600 : 500,
                            whiteSpace: 'nowrap',
                            opacity: isExpanded ? 1 : 0,
                            transition: 'opacity 180ms ease',
                          }}
                          sx={{ m: 0 }}
                        />
                      </ListItemButton>
                    </Tooltip>
                  </ListItem>
                );
              })}
            </List>

            {gIdx < groups.length - 1 && (
              <Divider sx={{ my: 1.5, borderColor: 'var(--border-subtle)' }} />
            )}
          </Box>
        ))}
      </Box>

      {/* Pin button at the bottom */}
      <Box
        sx={{
          pt: 1.5,
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isExpanded ? 'space-between' : 'center',
          px: 1,
        }}
      >
        {isExpanded && (
          <Typography
            variant="caption"
            sx={{
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              fontWeight: 500,
            }}
          >
            {pinned ? t('workspace.pinned') || 'Pinned sidebar' : t('workspace.unpinned') || 'Auto-expand'}
          </Typography>
        )}
        <Tooltip
          title={pinned ? 'Unpin sidebar' : 'Pin sidebar expanded'}
          placement="right"
        >
          <IconButton
            size="small"
            onClick={onTogglePin}
            aria-label={pinned ? 'Unpin sidebar' : 'Pin sidebar expanded'}
            sx={{
              color: pinned ? 'var(--accent-text)' : 'var(--text-secondary)',
              backgroundColor: pinned ? 'rgba(201, 55, 42, 0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(201, 55, 42, 0.16)',
              },
            }}
          >
            {pinned ? <PushPin fontSize="small" /> : <PushPinOutlined fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>
    </Drawer>
  );
}
