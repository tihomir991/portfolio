import { useState, useEffect, useMemo } from "react";

/**
 * Standard React hook for async data fetching without React 19 use() hook
 * This uses traditional useState and useEffect patterns
 */

export interface AsyncDataResult<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

/**
 * Creates a promise that resolves after a delay
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Simulates fetching GitHub repositories (for projects section)
 */
async function fetchGitHubRepos(): Promise<Array<{ name: string; description: string; stars: number; url: string }>> {
  await delay(1000); // Simulate network delay

  // Simulate API response
  return [
    {
      name: "portfolio-website",
      description: "Modern React portfolio with TypeScript and Vite",
      stars: 42,
      url: "https://github.com/user/portfolio-website",
    },
    {
      name: "task-management-app",
      description: "Full-stack task manager with React and Node.js",
      stars: 28,
      url: "https://github.com/user/task-management-app",
    },
    {
      name: "weather-dashboard",
      description: "Real-time weather dashboard with charts",
      stars: 35,
      url: "https://github.com/user/weather-dashboard",
    },
  ];
}

/**
 * Standard React hook for GitHub repos using useState and useEffect
 */
export function useGitHubRepos(): AsyncDataResult<Array<{ name: string; description: string; stars: number; url: string }>> {
  const [data, setData] = useState<Array<{ name: string; description: string; stars: number; url: string }> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGitHubRepos()
      .then((repos) => {
        setData(repos);
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err : new Error("Failed to fetch repositories"));
        setData(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { data, error, isLoading };
}

/**
 * Generic hook for any async operation using standard React patterns
 */
export function useAsyncOperation<T>(asyncFn: () => Promise<T>): AsyncDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    asyncFn()
      .then((result) => {
        setData(result);
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err : new Error("Async operation failed"));
        setData(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [asyncFn]);

  return { data, error, isLoading };
}

/**
 * Hook for simulating real-time data updates (like live coding stats)
 */
export function useLiveStats(): AsyncDataResult<{
  linesOfCode: number;
  projectsCompleted: number;
  coffeeCupsConsumed: number;
  lastUpdated: string;
}> {
  const generateStats = useMemo(
    () => async () => {
      await delay(500);
      return {
        linesOfCode: Math.floor(Math.random() * 10000) + 50000,
        projectsCompleted: Math.floor(Math.random() * 10) + 25,
        coffeeCupsConsumed: Math.floor(Math.random() * 100) + 500,
        lastUpdated: new Date().toISOString(),
      };
    },
    []
  );

  return useAsyncOperation(generateStats);
}
