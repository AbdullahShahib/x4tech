import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#040408',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          fontFamily: 'DM Sans, sans-serif',
          color: '#E8E8F0'
        }}>
          <div style={{
            maxWidth: '500px',
            textAlign: 'center',
            padding: '3rem',
            background: '#08080F',
            border: '1px solid #1A1A2E',
            borderRadius: '8px'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'rgba(255,0,60,0.1)',
              border: '1px solid rgba(255,0,60,0.3)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <AlertTriangle size={28} color="#ff6b8a" />
            </div>

            <h1 style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '1.8rem',
              letterSpacing: '0.05em',
              marginBottom: '0.5rem'
            }}>
              Oops, Something Went Wrong
            </h1>

            <p style={{
              color: '#6B6B8A',
              fontSize: '0.95rem',
              marginBottom: '1.5rem',
              lineHeight: 1.6
            }}>
              We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
            </p>

            <button
              onClick={() => window.location.href = '/'}
              style={{
                background: '#0066FF',
                color: '#fff',
                border: '1px solid #0066FF',
                padding: '0.7rem 2rem',
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(0, 102, 255, 0.9)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#0066FF';
              }}
            >
              Go Home
            </button>

            {process.env.NODE_ENV === 'development' && (
              <div style={{
                marginTop: '2rem',
                padding: '1rem',
                background: 'rgba(255,0,60,0.05)',
                border: '1px solid rgba(255,0,60,0.2)',
                borderRadius: '4px',
                textAlign: 'left',
                fontSize: '0.75rem',
                color: '#ff6b8a',
                fontFamily: 'monospace',
                maxHeight: '200px',
                overflowY: 'auto'
              }}>
                <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Error Details (Dev Only):</p>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {this.state.error?.toString()}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
