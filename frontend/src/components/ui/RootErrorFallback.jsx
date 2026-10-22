import React, { useState } from 'react';
import { AlertCircle, RotateCcw, Home, RefreshCw, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

export function RootErrorFallback({ error, errorInfo, resetErrorBoundary }) {
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const details = [
        `Error: ${error?.message || String(error)}`,
        `Stack: ${error?.stack || 'No JS stack available'}`,
        `Component Stack: ${errorInfo?.componentStack || 'No component stack available'}`,
        `URL: ${window.location.href}`,
        `User Agent: ${navigator.userAgent}`,
        `Timestamp: ${new Date().toISOString()}`,
      ].join('\n\n');

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(details);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = details;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (copyErr) {
      console.warn('Failed to copy error details to clipboard', copyErr);
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div
      role="alert"
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        boxSizing: 'border-box',
        background: 'var(--bg-canvas, #111113)',
        color: 'var(--text-primary, #F3F4F6)',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '580px',
          padding: '36px 32px',
          borderRadius: '24px',
          background: 'var(--glass-surface, rgba(28, 28, 32, 0.76))',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid var(--glass-border, rgba(255, 255, 255, 0.08))',
          boxShadow: 'var(--card-shadow, 0 20px 48px -12px rgba(0, 0, 0, 0.5))',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            margin: '0 auto 20px',
            borderRadius: '50%',
            background: 'rgba(201, 55, 42, 0.15)',
            border: '1px solid rgba(201, 55, 42, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary, #FF6B57)',
          }}
        >
          <AlertCircle size={32} strokeWidth={2.2} />
        </div>

        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            margin: '0 0 10px',
            color: 'var(--text-primary, #F3F4F6)',
            letterSpacing: '-0.02em',
          }}
        >
          Platform Error Encountered
        </h1>

        <p
          style={{
            fontSize: '0.9375rem',
            lineHeight: 1.6,
            color: 'var(--text-secondary, #A1A7B3)',
            margin: '0 0 24px',
          }}
        >
          An unexpected problem interrupted the interface. Your session data is preserved, and you can try recovering the view or reloading the platform.
        </p>

        {error?.message && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '12px',
              background: 'rgba(0, 0, 0, 0.25)',
              border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
              color: 'var(--primary, #FF6B57)',
              fontSize: '0.84rem',
              fontFamily: 'monospace',
              textAlign: 'left',
              wordBreak: 'break-word',
              margin: '0 0 24px',
            }}
          >
            {error.message}
          </div>
        )}

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center',
            marginBottom: '24px',
          }}
        >
          <button
            type="button"
            onClick={resetErrorBoundary}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '11px 20px',
              borderRadius: '12px',
              background: 'var(--primary, #FF6B57)',
              color: 'var(--primary-contrast, #111113)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'transform 0.15s ease, opacity 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.92')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <RotateCcw size={16} />
            Try Again
          </button>

          <button
            type="button"
            onClick={handleReload}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '11px 20px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.08)',
              color: 'var(--text-primary, #F3F4F6)',
              border: '1px solid var(--glass-border, rgba(255, 255, 255, 0.12))',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'background 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.14)')}
            onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
          >
            <RefreshCw size={16} />
            Reload Page
          </button>

          <button
            type="button"
            onClick={handleGoHome}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '11px 20px',
              borderRadius: '12px',
              background: 'transparent',
              color: 'var(--text-secondary, #A1A7B3)',
              border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '0.9rem',
              transition: 'color 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = 'var(--text-primary, #F3F4F6)')}
            onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-secondary, #A1A7B3)')}
          >
            <Home size={16} />
            Go Home
          </button>
        </div>

        {/* Collapsible Diagnostics */}
        <div style={{ borderTop: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))', paddingTop: '16px' }}>
          <button
            type="button"
            onClick={() => setShowDetails((prev) => !prev)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-meta, #9CA3AF)',
              fontSize: '0.8125rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {showDetails ? 'Hide Diagnostic Details' : 'Show Diagnostic Details'}
          </button>

          {showDetails && (
            <div style={{ marginTop: '14px', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
                <button
                  type="button"
                  onClick={handleCopy}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: copied ? 'rgba(21, 128, 61, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                    color: copied ? '#4ade80' : 'var(--text-secondary, #A1A7B3)',
                    border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                  }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied to Clipboard' : 'Copy Error Details'}
                </button>
              </div>

              <pre
                style={{
                  maxHeight: '180px',
                  overflowY: 'auto',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  color: 'var(--text-secondary, #A1A7B3)',
                  fontSize: '0.75rem',
                  lineHeight: 1.45,
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  fontFamily: 'Consolas, monospace',
                }}
              >
                {error?.stack || error?.message || String(error)}
                {errorInfo?.componentStack ? `\n\nComponent Hierarchy:${errorInfo.componentStack}` : ''}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
