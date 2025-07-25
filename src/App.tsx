import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { memo, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import ErrorBoundary from './components/global/ErrorBoundary';
import { TooltipProvider } from './components/ui/tooltip';
import { performanceMonitor } from './lib/performance';
import AppRoutes from './routes';
import { ThemeProvider } from './themes/ThemeProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: unknown) => {
        if (typeof error === 'object' && error !== null && 'status' in error) {
          const status = (error as { status?: number }).status;
          if (typeof status === 'number' && status >= 400 && status < 500) return false;
        }
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
    mutations: {
      retry: 1,
    },
  },
});

const App: React.FC = memo(() => {
  useEffect(() => {
    performanceMonitor.recordMetric('app_initialized', performance.now(), 'timing');
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
});

export default App;
