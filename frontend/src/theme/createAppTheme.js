import { createTheme } from '@mui/material/styles';
import { tokens } from './tokens';
import { fontStackFor } from '../app/i18n/config';

export function createAppTheme(mode = 'light', locale = 'en-IN') {
  const isDark = mode === 'dark';
  // Any non-English locale uses a script-specific font and taller line heights.
  const indic = locale !== 'en-IN';
  const t = isDark ? tokens.dark : tokens.light;

  const fontFamily = fontStackFor(locale);

  return createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: t.primary,
        hover: t.primaryHover,
        contrastText: t.primaryContrast,
      },
      secondary: {
        main: t.secondary,
        contrastText: t.secondaryContrast,
      },
      background: {
        default: t.bgCanvasSolid,
        paper: t.glassSurface,
      },
      text: {
        primary: t.textPrimary,
        secondary: t.textSecondary,
      },
      divider: t.borderSubtle,
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily,
      display: {
        fontFamily,
        fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', // 40px - 60px
        fontWeight: 600,
        lineHeight: indic ? 1.3 : 1.1,
        letterSpacing: indic ? 'normal' : '-0.02em',
      },
      h1: {
        fontFamily,
        fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
        fontWeight: 600,
        lineHeight: indic ? 1.3 : 1.15,
        letterSpacing: indic ? 'normal' : '-0.02em',
      },
      h2: {
        fontFamily,
        fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', // 36 - 40px
        fontWeight: 600,
        lineHeight: indic ? 1.35 : 1.25,
        letterSpacing: indic ? 'normal' : '-0.01em',
      },
      h3: {
        fontFamily,
        fontSize: '1.4rem', // 22 - 24px
        fontWeight: 600,
        lineHeight: indic ? 1.4 : 1.3,
      },
      body1: {
        fontFamily,
        fontSize: '1.0625rem', // 17px
        lineHeight: indic ? 1.8 : 1.6,
        fontWeight: 400,
      },
      body2: {
        fontFamily,
        fontSize: '0.9375rem', // 15px
        lineHeight: indic ? 1.75 : 1.55,
      },
      button: {
        fontFamily,
        fontWeight: 500,
        textTransform: 'none',
        letterSpacing: '0.01em',
      },
      caption: {
        fontFamily,
        fontSize: '0.8125rem',
        letterSpacing: '0.04em',
      },
      kpi: {
        fontFamily,
        fontSize: '2.25rem',
        fontWeight: 600,
        fontVariantNumeric: 'tabular-nums',
        lineHeight: 1.1,
      },
      labelUppercase: {
        fontFamily,
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            boxSizing: 'border-box',
          },
          body: {
            fontFamily,
            background: t.bgCanvas,
            color: t.textPrimary,
            minHeight: '100vh',
            transition: 'background-color 200ms ease, color 200ms ease',
          },
          ':focus-visible': {
            outline: `2px solid ${t.primary}`,
            outlineOffset: '2px',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            backgroundImage: 'none',
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: tokens.radius.pill,
            padding: '10px 24px',
            fontSize: '0.9375rem',
            fontWeight: 500,
            textTransform: 'none',
            transition: 'transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease',
            '&:hover': {
              transform: 'translateY(-2px)',
            },
            '@media (prefers-reduced-motion: reduce)': {
              transition: 'none !important',
              '&:hover': {
                transform: 'none !important',
              },
            },
          },
          containedPrimary: {
            backgroundColor: t.primary,
            color: t.primaryContrast,
            '&:hover': {
              backgroundColor: t.primaryHover,
              boxShadow: `0 6px 20px ${isDark ? 'rgba(255, 107, 87, 0.3)' : 'rgba(201, 55, 42, 0.28)'}`,
            },
          },
          containedSecondary: {
            backgroundColor: isDark ? '#27272A' : '#FFFFFF',
            color: isDark ? '#F4F4F5' : '#111827',
            border: `1px solid ${t.glassBorder}`,
            '&:hover': {
              backgroundColor: isDark ? '#3F3F46' : '#F9FAFB',
            },
          },
          outlined: {
            borderRadius: tokens.radius.pill,
            borderColor: t.glassBorder,
            color: t.textPrimary,
            '&:hover': {
              borderColor: t.primary,
              backgroundColor: isDark ? 'rgba(255, 107, 87, 0.08)' : 'rgba(201, 55, 42, 0.06)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: tokens.radius.card,
            backgroundColor: t.glassSurface,
            backdropFilter: 'blur(18px) saturate(140%)',
            WebkitBackdropFilter: 'blur(18px) saturate(140%)',
            border: `1px solid ${t.glassBorder}`,
            boxShadow: t.cardShadow,
            transition: 'transform 200ms ease, box-shadow 200ms ease',
            backgroundImage: 'none',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: tokens.radius.card,
            backgroundImage: 'none',
          },
          rounded: {
            borderRadius: tokens.radius.card,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: tokens.radius.pill,
            fontWeight: 500,
            fontSize: '0.8125rem',
          },
          filled: {
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(17, 24, 39, 0.06)',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: t.glassSurface,
            backdropFilter: 'blur(18px) saturate(140%)',
            WebkitBackdropFilter: 'blur(18px) saturate(140%)',
            borderRight: `1px solid ${t.glassBorder}`,
            backgroundImage: 'none',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: tokens.radius.input,
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.6)',
              '& fieldset': {
                borderColor: t.borderSubtle,
              },
              '&:hover fieldset': {
                borderColor: t.primary,
              },
              '&.Mui-focused fieldset': {
                borderColor: t.primary,
              },
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: tokens.radius.card,
            backgroundColor: t.glassSurface,
            backdropFilter: 'blur(20px) saturate(150%)',
            WebkitBackdropFilter: 'blur(20px) saturate(150%)',
            border: `1px solid ${t.glassBorder}`,
            boxShadow: t.cardShadowHover,
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            borderRadius: tokens.radius.card,
            border: `1px solid ${t.glassBorder}`,
            backgroundColor: t.glassSurface,
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            fontFamily,
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: `1px solid ${t.borderSubtle}`,
              fontWeight: 600,
            },
            '& .MuiDataGrid-cell': {
              borderBottom: `1px solid ${t.borderSubtle}`,
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(17, 24, 39, 0.02)',
            },
          },
        },
      },
    },
  });
}

export const lightTheme = createAppTheme('light', 'en-IN');
export const darkTheme = createAppTheme('dark', 'en-IN');
