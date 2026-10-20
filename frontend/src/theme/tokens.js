/**
 * ShramikVikas Glass & Coral Design Tokens
 * Conforms to Master Specification:
 * - Light theme: gradient #EEF0F3 to #E4E7EC, radial glow rgba(201, 55, 42, 0.18), glass surface rgba(255, 255, 255, 0.72), border rgba(255, 255, 255, 0.75)
 * - Dark theme: #111113, glass surface rgba(28, 28, 32, 0.72), border rgba(255, 255, 255, 0.08), glow rgba(255, 107, 87, 0.16)
 * - Accent: #C9372A (light), #FF6B57 (dark), hover #A92B20
 * - Status: undersupply #0F766E, oversupply #B45309, balanced #15803D, low base #64748B, unavailable dashed outline
 * - Chart series: #C9372A, #0F766E, #F59E0B, #7C3AED, #64748B
 */

export const tokens = {
  light: {
    bgCanvas: 'linear-gradient(180deg, #EEF0F3 0%, #E4E7EC 100%)',
    bgCanvasSolid: '#EEF0F3',
    bgGlow: 'radial-gradient(circle at 50% 35%, rgba(201, 55, 42, 0.18) 0%, rgba(238, 240, 243, 0) 70%)',
    glassSurface: 'rgba(255, 255, 255, 0.72)',
    glassSurfaceHover: 'rgba(255, 255, 255, 0.88)',
    glassBorder: 'rgba(255, 255, 255, 0.75)',
    borderSubtle: 'rgba(17, 24, 39, 0.08)',
    textPrimary: '#111827',
    textSecondary: '#5B6270',
    textMeta: '#6B7280',
    primary: '#C9372A',
    primaryHover: '#A92B20',
    primaryContrast: '#FFFFFF',
    secondary: '#111827',
    secondaryHover: '#1F2937',
    secondaryContrast: '#FFFFFF',
    cardShadow: '0 8px 32px 0 rgba(17, 24, 39, 0.06)',
    cardShadowHover: '0 12px 40px 0 rgba(201, 55, 42, 0.12)',
  },
  dark: {
    bgCanvas: '#111113',
    bgCanvasSolid: '#111113',
    bgGlow: 'radial-gradient(circle at 50% 35%, rgba(255, 107, 87, 0.16) 0%, rgba(17, 17, 19, 0) 70%)',
    glassSurface: 'rgba(28, 28, 32, 0.72)',
    glassSurfaceHover: 'rgba(38, 38, 44, 0.84)',
    glassBorder: 'rgba(255, 255, 255, 0.08)',
    borderSubtle: 'rgba(255, 255, 255, 0.08)',
    textPrimary: '#F3F4F6',
    textSecondary: '#A1A7B3',
    textMeta: '#9CA3AF',
    primary: '#FF6B57',
    primaryHover: '#E05A47',
    primaryContrast: '#111113',
    secondary: '#1F2937',
    secondaryHover: '#374151',
    secondaryContrast: '#F3F4F6',
    cardShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
    cardShadowHover: '0 12px 40px 0 rgba(255, 107, 87, 0.18)',
  },
  status: {
    undersupply: {
      color: '#0F766E',
      surface: 'rgba(15, 118, 110, 0.12)',
      border: 'rgba(15, 118, 110, 0.3)',
      key: 'undersupply',
    },
    oversupply: {
      color: '#B45309',
      surface: 'rgba(180, 83, 9, 0.12)',
      border: 'rgba(180, 83, 9, 0.3)',
      key: 'oversupply',
    },
    balanced: {
      color: '#15803D',
      surface: 'rgba(21, 128, 61, 0.12)',
      border: 'rgba(21, 128, 61, 0.3)',
      key: 'balanced',
    },
    lowBase: {
      color: '#64748B',
      surface: 'rgba(100, 116, 139, 0.12)',
      border: 'rgba(100, 116, 139, 0.3)',
      key: 'lowBase',
    },
    unavailable: {
      color: '#64748B',
      surface: 'transparent',
      border: '1px dashed #64748B',
      key: 'unavailable',
    },
  },
  chart: {
    series: ['#C9372A', '#0F766E', '#F59E0B', '#7C3AED', '#64748B'],
    other: '#64748B',
  },
  radius: {
    pill: '999px',
    card: '20px',
    input: '12px',
    small: '8px',
  },
  glassStyle: {
    backdropFilter: 'blur(18px) saturate(140%)',
    WebkitBackdropFilter: 'blur(18px) saturate(140%)',
  },
};

/**
 * Format number with Indian grouping (1,00,000)
 */
export function formatIndianNumber(value, locale = 'en-IN') {
  if (value === null || value === undefined || isNaN(value)) {
    return '—';
  }
  return new Intl.NumberFormat('en-IN').format(value);
}
