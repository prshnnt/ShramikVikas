import React, { Component } from 'react';

/**
 * Universal React Error Boundary supporting:
 * - fallback element or fallbackRender function prop
 * - resetKeys array: auto-resets error state when keys change (e.g. route change)
 * - onError callback for remote monitoring / logging
 * - onReset callback for state cleanup
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    if (typeof this.props.onError === 'function') {
      try {
        this.props.onError(error, errorInfo);
      } catch (loggingError) {
        console.error('ErrorBoundary onError callback threw:', loggingError);
      }
    }
    console.error('Caught by ErrorBoundary:', error, errorInfo);
  }

  componentDidUpdate(prevProps) {
    const { resetKeys } = this.props;
    const { hasError } = this.state;

    if (hasError && Array.isArray(resetKeys) && Array.isArray(prevProps.resetKeys)) {
      const keysChanged =
        resetKeys.length !== prevProps.resetKeys.length ||
        resetKeys.some((key, idx) => key !== prevProps.resetKeys[idx]);
      if (keysChanged) {
        this.resetErrorBoundary();
      }
    }
  }

  resetErrorBoundary = () => {
    if (typeof this.props.onReset === 'function') {
      try {
        this.props.onReset();
      } catch (resetErr) {
        console.error('ErrorBoundary onReset callback threw:', resetErr);
      }
    }
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { fallback, fallbackRender, children } = this.props;

    if (hasError) {
      const fallbackProps = {
        error,
        errorInfo,
        resetErrorBoundary: this.resetErrorBoundary,
      };

      if (typeof fallbackRender === 'function') {
        return fallbackRender(fallbackProps);
      }

      if (React.isValidElement(fallback)) {
        return React.cloneElement(fallback, fallbackProps);
      }

      return (
        <div
          role="alert"
          style={{
            padding: '24px',
            margin: '16px auto',
            maxWidth: '640px',
            borderRadius: '16px',
            background: 'var(--glass-surface, rgba(255, 255, 255, 0.72))',
            border: '1px solid var(--border-subtle, rgba(201, 55, 42, 0.25))',
            color: 'var(--text-primary, #111827)',
            backdropFilter: 'blur(16px)',
            boxShadow: 'var(--card-shadow, 0 8px 32px 0 rgba(17, 24, 39, 0.08))',
          }}
        >
          <h3 style={{ color: 'var(--primary, #C9372A)', margin: '0 0 8px 0', fontSize: '1.25rem' }}>
            Something went wrong
          </h3>
          <p style={{ color: 'var(--text-secondary, #5B6270)', fontSize: '0.875rem', margin: '0 0 16px 0' }}>
            {error?.message || 'An unexpected error occurred in this view.'}
          </p>
          <button
            type="button"
            onClick={this.resetErrorBoundary}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: 'var(--primary, #C9372A)',
              color: 'var(--primary-contrast, #ffffff)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.875rem',
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return children;
  }
}
