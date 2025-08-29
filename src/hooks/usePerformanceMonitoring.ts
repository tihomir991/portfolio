import { useEffect, useCallback, useRef } from "react";

interface PerformanceMetrics {
  renderTime: number;
  componentName: string;
  timestamp: number;
}

interface UsePerformanceMonitoringOptions {
  enabled?: boolean;
  threshold?: number; // milliseconds
  onSlowRender?: (metrics: PerformanceMetrics) => void;
}

/**
 * Custom hook for monitoring React component performance
 * Helps identify slow renders and performance bottlenecks
 */
export const usePerformanceMonitoring = (componentName: string, options: UsePerformanceMonitoringOptions = {}) => {
  const {
    enabled = import.meta.env.DEV,
    threshold = 16, // 16ms = 60fps
    onSlowRender,
  } = options;

  const renderStartTime = useRef<number>(0);
  const mountTime = useRef<number>(0);

  // Track component mount time
  useEffect(() => {
    if (!enabled) return;

    mountTime.current = performance.now();

    return () => {
      const unmountTime = performance.now();
      const totalLifetime = unmountTime - mountTime.current;

      if (import.meta.env.DEV) {
        console.log(`${componentName} lifetime: ${totalLifetime.toFixed(2)}ms`);
      }
    };
  }, [componentName, enabled]);

  // Track render performance
  const measureRenderStart = useCallback(() => {
    if (!enabled) return;
    renderStartTime.current = performance.now();
  }, [enabled]);

  const measureRenderEnd = useCallback(() => {
    if (!enabled) return;

    const renderEndTime = performance.now();
    const renderTime = renderEndTime - renderStartTime.current;

    const metrics: PerformanceMetrics = {
      renderTime,
      componentName,
      timestamp: renderEndTime,
    };

    if (renderTime > threshold) {
      console.warn(`Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms (threshold: ${threshold}ms)`);
      onSlowRender?.(metrics);
    }

    if (import.meta.env.DEV) {
      console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
    }
  }, [enabled, threshold, componentName, onSlowRender]);

  // Measure initial render
  useEffect(() => {
    measureRenderStart();
    measureRenderEnd();
  });

  return {
    measureRenderStart,
    measureRenderEnd,
  };
};
