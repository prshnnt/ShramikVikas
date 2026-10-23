import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import { Search, ArrowForward, Layers, Place, Work, Factory } from '@mui/icons-material';

import { useLocale } from '../../hooks/usePreferences';
import { getNavigation } from '../../app/config/navigation';
import { useIntelligenceData } from '../../features/real-intelligence/dataContext';
import { tokens } from '../../theme';

export function CommandPalette({ onClose }) {
  const { t } = useLocale();
  const navigate = useNavigate();
  const { mode, catalog } = useIntelligenceData();
  const navigation = getNavigation(t);

  // Build searchable options list
  const navOptions = navigation.map((item) => ({
    label: item.label,
    secondary: item.title,
    path: item.path,
    category: t('search.navigation') || 'Navigation',
    icon: <Layers sx={{ fontSize: 18, color: 'var(--accent-text)' }} />,
  }));

  const regionOptions = (catalog?.regions || []).map((reg) => ({
    label: reg.name,
    secondary: reg.state_type || 'Region',
    path: `/regions?region=${reg.region_id}`,
    category: t('common.regions') || 'Regions',
    icon: <Place sx={{ fontSize: 18, color: 'var(--status-undersupply-text)' }} />,
  }));

  const industryOptions = (catalog?.industries || []).slice(0, 40).map((ind) => ({
    label: ind.name,
    secondary: `NIC ${ind.nic_code}`,
    path: `/industries?industry=${ind.industry_id}`,
    category: t('common.industries') || 'Industries',
    icon: <Factory sx={{ fontSize: 18, color: 'var(--status-oversupply-text)' }} />,
  }));

  const options = [...navOptions, ...regionOptions, ...industryOptions];

  const handleSelect = (event, option) => {
    if (option?.path) {
      onClose();
      navigate(option.path);
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="command-palette-title"
      slotProps={{
        paper: {
          sx: {
            backgroundColor: 'var(--glass-surface)',
            backdropFilter: 'blur(24px) saturate(150%)',
            WebkitBackdropFilter: 'blur(24px) saturate(150%)',
            border: '1px solid var(--glass-border)',
            borderRadius: tokens.radius.card,
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden',
            p: 0,
          },
        }
      }}
    >
      <DialogContent sx={{ p: 2 }}>
        <Typography id="command-palette-title" className="sr-only">
          {t('search.title') || 'Command Palette'}
        </Typography>

        <Autocomplete
          autoHighlight
          openOnFocus
          options={options}
          groupBy={(option) => option.category}
          getOptionLabel={(option) => option.label || ''}
          onChange={handleSelect}
          renderInput={(params) => {
            const inputSlotProps = params.slotProps?.input;
            const legacyInputProps = params.InputProps;
            const existingStartAdornment =
              inputSlotProps?.startAdornment ?? legacyInputProps?.startAdornment;

            const startAdornment = (
              <>
                <InputAdornment position="start">
                  <Search sx={{ color: 'var(--accent-text)', fontSize: 22 }} />
                </InputAdornment>
                {existingStartAdornment}
              </>
            );

            return (
              <TextField
                {...params}
                autoFocus
                placeholder={t('search.placeholder') || 'Search pages, states, industries (Ctrl+K)...'}
                aria-label={t('search.pages') || 'Search command palette'}
                variant="outlined"
                slotProps={{
                  ...params.slotProps,
                  input: {
                    ...inputSlotProps,
                    startAdornment,
                  },
                }}
                {...(legacyInputProps
                  ? {
                      InputProps: {
                        ...legacyInputProps,
                        startAdornment,
                      },
                    }
                  : {})}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: tokens.radius.input,
                    backgroundColor: 'var(--bg-subtle)',
                    fontSize: '1.0625rem',
                    color: 'var(--text-primary)',
                    '& fieldset': {
                      borderColor: 'var(--border-subtle)',
                      transition: 'border-color 150ms ease',
                    },
                    '&:hover fieldset': {
                      borderColor: 'var(--accent-text)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'var(--focus-ring)',
                      borderWidth: '1.5px',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'var(--text-primary)',
                    '&::placeholder': {
                      color: 'var(--text-meta)',
                      opacity: 1,
                    },
                  },
                }}
              />
            );
          }}
          renderOption={(props, option) => {
            const { key, ...otherProps } = props;
            return (
              <Box
                component="li"
                key={key || option.path}
                {...otherProps}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 2,
                  py: 1.2,
                  borderRadius: '10px',
                  my: 0.3,
                  cursor: 'pointer',
                  '&:hover, &.Mui-focused': {
                    backgroundColor: 'var(--accent-subtle) !important',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  {option.icon}
                  <Box>
                    <Typography sx={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {option.label}
                    </Typography>
                    {option.secondary && (
                      <Typography sx={{ fontSize: '0.75rem', color: 'var(--text-meta)' }}>
                        {option.secondary}
                      </Typography>
                    )}
                  </Box>
                </Box>
                <ArrowForward sx={{ fontSize: 16, color: 'var(--text-meta)' }} />
              </Box>
            );
          }}
          sx={{
            '& .MuiAutocomplete-paper': {
              backgroundColor: 'transparent',
              boxShadow: 'none',
            },
            '& .MuiAutocomplete-groupLabel': {
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-meta)',
              backgroundColor: 'transparent',
              top: 0,
            },
          }}
        />

        {/* Footer shortcuts info */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pt: 2,
            mt: 2,
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '0.75rem',
            color: 'var(--text-meta)',
          }}
        >
          <Box sx={{ display: 'flex', gap: 2 }}>
            <span><kbd>↑</kbd> <kbd>↓</kbd> {t('search.move') || 'Navigate'}</span>
            <span><kbd>↵</kbd> {t('search.open') || 'Select'}</span>
            <span><kbd>esc</kbd> {t('search.close') || 'Close'}</span>
          </Box>
          <Chip
            size="small"
            label="Command Palette"
            sx={{ fontSize: '0.7rem', height: 20 }}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
