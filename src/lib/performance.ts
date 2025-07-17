// Performance monitoring and optimization utilities

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  type: 'timing' | 'counter' | 'gauge';
  tags?: Record<string, string>;
}

interface PerformanceData {
  metrics: PerformanceMetric[];
  pageLoadTime?: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  cumulativeLayoutShift?: number;
  firstInputDelay?: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeWebVitals();
    this.initializeCustomMetrics();
  }

  // Initialize Web Vitals monitoring
  private initializeWebVitals() {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          this.recordMetric('LCP', lastEntry.startTime, 'timing', {
            element: lastEntry.element?.tagName || 'unknown',
          });
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (error) {
        console.warn('LCP observer not supported:', error);
      }

      // First Input Delay (FID)
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            this.recordMetric('FID', entry.processingStart - entry.startTime, 'timing');
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      } catch (error) {
        console.warn('FID observer not supported:', error);
      }

      // Cumulative Layout Shift (CLS)
      try {
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          this.recordMetric('CLS', clsValue, 'gauge');
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch (error) {
        console.warn('CLS observer not supported:', error);
      }
    }
  }

  // Initialize custom application metrics
  private initializeCustomMetrics() {
    // Page load time
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      this.recordMetric('page_load_time', loadTime, 'timing');
    });

    // Navigation timing
    if (performance.getEntriesByType) {
      const navigationEntries = performance.getEntriesByType(
        'navigation',
      ) as PerformanceNavigationTiming[];
      if (navigationEntries.length > 0) {
        const nav = navigationEntries[0];
        this.recordMetric('dns_lookup', nav.domainLookupEnd - nav.domainLookupStart, 'timing');
        this.recordMetric('tcp_connect', nav.connectEnd - nav.connectStart, 'timing');
        this.recordMetric('request_response', nav.responseEnd - nav.requestStart, 'timing');
        this.recordMetric('dom_processing', nav.domComplete - nav.domLoading, 'timing');
      }
    }
  }

  // Record a custom metric
  recordMetric(
    name: string,
    value: number,
    type: PerformanceMetric['type'],
    tags?: Record<string, string>,
  ) {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
      type,
      tags,
    };

    this.metrics.push(metric);

    // Keep only last 100 metrics to prevent memory leaks
    if (this.metrics.length > 100) {
      this.metrics.splice(0, this.metrics.length - 100);
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance metric: ${name} = ${value}ms`, tags);
    }
  }

  // Start timing a custom operation
  startTiming(name: string): () => void {
    const startTime = performance.now();
    return () => {
      const endTime = performance.now();
      this.recordMetric(name, endTime - startTime, 'timing');
    };
  }

  // Increment a counter
  incrementCounter(name: string, tags?: Record<string, string>) {
    const existing = this.metrics.find((m) => m.name === name && m.type === 'counter');
    if (existing) {
      existing.value += 1;
      existing.timestamp = Date.now();
    } else {
      this.recordMetric(name, 1, 'counter', tags);
    }
  }

  // Get all metrics
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  // Get metrics by name
  getMetricsByName(name: string): PerformanceMetric[] {
    return this.metrics.filter((m) => m.name === name);
  }

  // Get performance summary
  getPerformanceSummary(): PerformanceData {
    const summary: PerformanceData = {
      metrics: this.getMetrics(),
    };

    // Add specific metric values
    const lcpMetrics = this.getMetricsByName('LCP');
    if (lcpMetrics.length > 0) {
      summary.largestContentfulPaint = lcpMetrics[lcpMetrics.length - 1].value;
    }

    const fidMetrics = this.getMetricsByName('FID');
    if (fidMetrics.length > 0) {
      summary.firstInputDelay = fidMetrics[fidMetrics.length - 1].value;
    }

    const clsMetrics = this.getMetricsByName('CLS');
    if (clsMetrics.length > 0) {
      summary.cumulativeLayoutShift = clsMetrics[clsMetrics.length - 1].value;
    }

    const pageLoadMetrics = this.getMetricsByName('page_load_time');
    if (pageLoadMetrics.length > 0) {
      summary.pageLoadTime = pageLoadMetrics[pageLoadMetrics.length - 1].value;
    }

    return summary;
  }

  // Export metrics for analysis
  exportMetrics(): string {
    return JSON.stringify(this.getPerformanceSummary(), null, 2);
  }

  // Clean up observers
  cleanup() {
    this.observers.forEach((observer) => {
      try {
        observer.disconnect();
      } catch (error) {
        console.warn('Error disconnecting performance observer:', error);
      }
    });
    this.observers = [];
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// Utility functions for common performance measurements
export const measureAnalysisTime = () => {
  return performanceMonitor.startTiming('analysis_duration');
};

export const measureRenderTime = (componentName: string) => {
  return performanceMonitor.startTiming(`render_${componentName}`);
};

export const trackUserAction = (action: string, details?: Record<string, string>) => {
  performanceMonitor.incrementCounter(`user_action_${action}`, details);
};

export const trackError = (errorType: string, details?: Record<string, string>) => {
  performanceMonitor.incrementCounter(`error_${errorType}`, details);
};

// React hook for performance monitoring
export const usePerformanceMonitoring = () => {
  const startTiming = (name: string) => performanceMonitor.startTiming(name);
  const recordMetric = (name: string, value: number, type: PerformanceMetric['type']) =>
    performanceMonitor.recordMetric(name, value, type);
  const incrementCounter = (name: string) => performanceMonitor.incrementCounter(name);

  return {
    startTiming,
    recordMetric,
    incrementCounter,
    getMetrics: () => performanceMonitor.getMetrics(),
    getSummary: () => performanceMonitor.getPerformanceSummary(),
  };
};

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    performanceMonitor.cleanup();
  });
}
