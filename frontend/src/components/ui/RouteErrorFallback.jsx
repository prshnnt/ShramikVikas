import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AlertCircle, RotateCcw, LayoutDashboard, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { useLocale } from '../../hooks/usePreferences';

export function RouteErrorFallback({ error, errorInfo, resetErrorBoundary, title }) {
  const { t } = useLocale();
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const details = [
        `Route Error: ${error?.message || String(error)}`,
        `Stack: ${error?.stack || 'None'}`,
        `Component Stack: ${errorInfo?.componentStack || 'None'}`,
        `Location: ${window.location.pathname}`,
        `Timestamp: ${new Date().toISOString()}`,
      ].join('\n\n');

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(details);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard error
    }
  };

  const handleGoDashboard = () => {
    resetErrorBoundary();
    navigate('/intelligence');
  };

  return (
    <Box
      role="alert"
      sx={{
        my: 3,
        p: { xs: 3, sm: 4 },
        borderRadius: '20px',
        background: 'var(--glass-surface, rgba(28, 28, 32, 0.72))',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--border-subtle, rgba(201, 55, 42, 0.2))',
        boxShadow: 'var(--card-shadow, 0 8px 32px 0 rgba(0, 0, 0, 0.2))',
        maxWidth: '820px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: '12px',
            background: 'rgba(201, 55, 42, 0.12)',
            border: '1px solid rgba(201, 55, 42, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary, #FF6B57)',
            flexShrink: 0,
          }}
        >
          <AlertCircle size={24} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: 'var(--text-primary, #F3F4F6)',
              fontSize: '1.15rem',
              mb: 0.5,
            }}
          >
            {title || t('states.sectionError') || 'Section Temporarily Unavailable'}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'var(--text-secondary, #A1A7B3)',
              lineHeight: 1.6,
            }}
          >
            {t('states.sectionErrorDesc') || 'An error occurred while displaying this page. The navigation bar and other platform features remain fully functional.'}
          </Typography>
        </Box>
      </Box>

      {error?.message && (
        <Box
          sx={{
            p: 1.5,
            mb: 2.5,
            borderRadius: '10px',
            background: 'rgba(0, 0, 0, 0.25)',
            border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
            color: 'var(--primary, #FF6B57)',
            fontFamily: 'monospace',
            fontSize: '0.8125rem',
            wordBreak: 'break-word',
          }}
        >
          {error.message}
        </Box>
      )}

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center' }}>
        <button
          type="button"
          onClick={resetErrorBoundary}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 18px',
            borderRadius: '10px',
            background: 'var(--primary, #FF6B57)',
            color: 'var(--primary-contrast, #111113)',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.875rem',
          }}
        >
          <RotateCcw size={15} />
          {t('states.retry') || 'Retry View'}
        </button>

        <button
          type="button"
          onClick={handleGoDashboard}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 18px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.06)',
            color: 'var(--text-primary, #F3F4F6)',
            border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.12))',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '0.875rem',
          }}
        >
          <LayoutDashboard size={15} />
          {t('states.goDashboard') || 'Go to Overview'}
        </button>

        <button
          type="button"
          onClick={() => setShowDetails((p) => !p)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-meta, #9CA3AF)',
            cursor: 'pointer',
            fontSize: '0.8125rem',
            marginLeft: 'auto',
          }}
        >
          {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {showDetails ? (t('states.hideDetails') || 'Hide Details') : (t('states.details') || 'Details')}
        </button>
      </Box>

      {showDetails && (
        <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            <button
              type="button"
              onClick={handleCopy}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
                borderRadius: '6px',
                background: copied ? 'rgba(21, 128, 61, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                color: copied ? '#4ade80' : 'var(--text-secondary, #A1A7B3)',
                border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? (t('states.copied') || 'Copied') : (t('states.copy') || 'Copy')}
            </button>
          </Box>
          <pre
            style={{
              maxHeight: '140px',
              overflowY: 'auto',
              padding: '10px',
              borderRadius: '8px',
              background: 'rgba(0, 0, 0, 0.35)',
              color: 'var(--text-secondary, #A1A7B3)',
              fontSize: '0.75rem',
              lineHeight: 1.4,
              margin: 0,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              fontFamily: 'Consolas, monospace',
            }}
          >
            {error?.stack || error?.message || String(error)}
            {errorInfo?.componentStack ? `\n\nComponent Hierarchy:${errorInfo.componentStack}` : ''}
          </pre>
        </Box>
      )}
    </Box>
  );
}
