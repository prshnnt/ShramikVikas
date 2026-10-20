import React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import {
  TrendingDown,
  TrendingUp,
  CheckCircle,
  RemoveCircleOutlined,
  Timeline,
  Tune,
  InfoOutlined,
  Block,
} from '@mui/icons-material';

import { useLocale } from '../../hooks/usePreferences';
import { getIntelligenceKinds } from '../../app/config/intelligence';
import { tokens } from '../../theme';

export function StatusBadge({ kind = 'observed', label: customLabel, reason }) {
  const { t } = useLocale();
  const intelligenceKinds = getIntelligenceKinds(t);

  // Configuration mapping status kind to icon, colors and labels
  const config = {
    undersupply: {
      label: t('status.undersupply') || 'Undersupply',
      icon: <TrendingDown sx={{ fontSize: 13 }} />,
      color: tokens.status.undersupply.color,
      bg: tokens.status.undersupply.surface,
      border: tokens.status.undersupply.border,
      description: 'Regional certified training output is below observed employer vacancies.',
    },
    oversupply: {
      label: t('status.oversupply') || 'Oversupply',
      icon: <TrendingUp sx={{ fontSize: 13 }} />,
      color: tokens.status.oversupply.color,
      bg: tokens.status.oversupply.surface,
      border: tokens.status.oversupply.border,
      description: 'Regional certified training output exceeds current employer vacancies.',
    },
    balanced: {
      label: t('status.balanced') || 'Balanced',
      icon: <CheckCircle sx={{ fontSize: 13 }} />,
      color: tokens.status.balanced.color,
      bg: tokens.status.balanced.surface,
      border: tokens.status.balanced.border,
      description: 'Supply and demand are within healthy matching tolerances.',
    },
    'low-base': {
      label: t('status.lowBase') || 'Low base',
      icon: <RemoveCircleOutlined sx={{ fontSize: 13 }} />,
      color: tokens.status.lowBase.color,
      bg: tokens.status.lowBase.surface,
      border: tokens.status.lowBase.border,
      description: 'Observation base is too low to establish a statistically reliable trend.',
    },
    lowBase: {
      label: t('status.lowBase') || 'Low base',
      icon: <RemoveCircleOutlined sx={{ fontSize: 13 }} />,
      color: tokens.status.lowBase.color,
      bg: tokens.status.lowBase.surface,
      border: tokens.status.lowBase.border,
      description: 'Observation base is too low to establish a statistically reliable trend.',
    },
    unavailable: {
      label: t('status.notPublished') || 'Not published',
      icon: <Block sx={{ fontSize: 13 }} />,
      color: tokens.status.unavailable.color,
      bg: 'transparent',
      border: '1px dashed #64748B',
      description: reason || t('real.unavailableDetail') || 'Not in public sources. Awaiting official data release.',
    },
    observed: {
      label: intelligenceKinds.observed?.label || 'Observed',
      icon: <CheckCircle sx={{ fontSize: 13 }} />,
      color: '#15803D',
      bg: 'rgba(21, 128, 61, 0.1)',
      border: 'rgba(21, 128, 61, 0.25)',
      description: intelligenceKinds.observed?.description || 'Published administrative or survey observation.',
    },
    derived: {
      label: intelligenceKinds.derived?.label || 'Derived',
      icon: <TrendingUp sx={{ fontSize: 13 }} />,
      color: '#0F766E',
      bg: 'rgba(15, 118, 110, 0.1)',
      border: 'rgba(15, 118, 110, 0.25)',
      description: intelligenceKinds.derived?.description || 'Calculated from two or more official series.',
    },
    forecast: {
      label: intelligenceKinds.forecast?.label || 'Indicative Forecast',
      icon: <Timeline sx={{ fontSize: 13 }} />,
      color: '#7C3AED',
      bg: 'rgba(124, 58, 237, 0.1)',
      border: 'rgba(124, 58, 237, 0.25)',
      description: intelligenceKinds.forecast?.description || 'Projections with uncertainty bands, labelled Indicative.',
    },
    scenario: {
      label: intelligenceKinds.scenario?.label || 'Scenario',
      icon: <Tune sx={{ fontSize: 13 }} />,
      color: '#B45309',
      bg: 'rgba(180, 83, 9, 0.1)',
      border: 'rgba(180, 83, 9, 0.25)',
      description: intelligenceKinds.scenario?.description || 'What-if policy comparison simulation.',
    },
    sample: {
      label: intelligenceKinds.sample?.label || 'Sample',
      icon: <InfoOutlined sx={{ fontSize: 13 }} />,
      color: '#64748B',
      bg: 'rgba(100, 116, 139, 0.1)',
      border: 'rgba(100, 116, 139, 0.25)',
      description: intelligenceKinds.sample?.description || 'Demonstration data for interface evaluation.',
    },
  };

  const status = config[kind] || config.observed;
  const displayLabel = customLabel || status.label;

  return (
    <Tooltip title={status.description} arrow>
      <Box
        component="span"
        className={`status-badge status-${kind}`}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.6,
          px: 1.2,
          py: 0.35,
          borderRadius: tokens.radius.pill,
          fontSize: '0.75rem',
          fontWeight: 600,
          color: status.color,
          backgroundColor: status.bg,
          border: status.border.includes('dashed') ? status.border : `1px solid ${status.border}`,
          whiteSpace: 'nowrap',
          userSelect: 'none',
          lineHeight: 1.2,
        }}
      >
        <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
          {status.icon}
        </Box>
        <span>{displayLabel}</span>
      </Box>
    </Tooltip>
  );
}
