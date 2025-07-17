import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cssVars } from '../utils/cssVariables';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

// Themed error display component
const ThemedErrorDisplay: React.FC<{
  error?: Error;
  errorInfo?: ErrorInfo;
  onRetry: () => void;
}> = ({ error, errorInfo, onRetry }) => {
  // No need for theme object - using CSS variables directly

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundColor: cssVars.bgPrimary,
      }}
    >
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <div
            className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: cssVars.error }}
          >
            <AlertTriangle className="w-8 h-8" style={{ color: cssVars.inverse }} />
          </div>
          <CardTitle className="text-2xl" style={{ color: cssVars.headline }}>
            Oops! Something went wrong
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="mb-4" style={{ color: cssVars.paragraph }}>
              We're sorry, but something unexpected happened. Our team has been notified and is
              working on a fix.
            </p>

            {process.env.NODE_ENV === 'development' && error && (
              <details
                className="text-left p-4 rounded-lg mb-4"
                style={{ backgroundColor: cssVars.hover }}
              >
                <summary
                  className="cursor-pointer font-medium mb-2"
                  style={{ color: cssVars.headline }}
                >
                  Error Details (Development Mode)
                </summary>
                <div className="text-sm space-y-2" style={{ color: cssVars.paragraph }}>
                  <div>
                    <strong>Error:</strong> {error.message}
                  </div>
                  {error.stack && (
                    <div>
                      <strong>Stack Trace:</strong>
                      <pre
                        className="mt-2 p-2 rounded text-xs overflow-auto max-h-40"
                        style={{
                          backgroundColor: cssVars.surface,
                          color: cssVars.textTertiary,
                        }}
                      >
                        {error.stack}
                      </pre>
                    </div>
                  )}
                  {errorInfo && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre
                        className="mt-2 p-2 rounded text-xs overflow-auto max-h-40"
                        style={{
                          backgroundColor: cssVars.surface,
                          color: cssVars.muted,
                          border: `1px solid ${cssVars.borderPrimary}`,
                        }}
                      >
                        {errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={onRetry} className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = '/')}
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </div>

          <div className="text-center text-sm" style={{ color: cssVars.muted }}>
            <p>If this problem persists, please contact support with the error details above.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Log error to analytics or error reporting service
    try {
      this.logErrorToService(error, errorInfo);
    } catch (logError) {
      console.warn('Failed to log error to service:', logError);
    }

    this.setState({
      error,
      errorInfo,
    });
  }

  logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    // In production, you would send this to an error reporting service
    // like Sentry, LogRocket, or Bugsnag
    try {
      const errorData = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      };

      // Store error locally for debugging
      const existingErrors = JSON.parse(localStorage.getItem('app-errors') || '[]');
      existingErrors.push(errorData);

      // Keep only last 10 errors
      if (existingErrors.length > 10) {
        existingErrors.splice(0, existingErrors.length - 10);
      }

      localStorage.setItem('app-errors', JSON.stringify(existingErrors));
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }
  };

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ThemedErrorDisplay
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onRetry={this.handleRetry}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
