import { useState, useEffect, useCallback } from 'react';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseAsyncDataOptions {
  immediate?: boolean;
  retryCount?: number;
  retryDelay?: number;
}

export function useAsyncData<T>(
  asyncFunction: () => Promise<T>,
  options: UseAsyncDataOptions = {}
) {
  const {
    immediate = true,
    retryCount = 3,
    retryDelay = 1000
  } = options;

  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null
  });

  const [retryAttempts, setRetryAttempts] = useState(0);

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await asyncFunction();
      setState({
        data: result,
        loading: false,
        error: null
      });
      setRetryAttempts(0);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      
      if (retryAttempts < retryCount) {
        setRetryAttempts(prev => prev + 1);
        setTimeout(() => {
          execute();
        }, retryDelay * Math.pow(2, retryAttempts)); // Exponential backoff
      } else {
        setState({
          data: null,
          loading: false,
          error: errorMessage
        });
      }
    }
  }, [asyncFunction, retryAttempts, retryCount, retryDelay]);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null
    });
    setRetryAttempts(0);
  }, []);

  const retry = useCallback(() => {
    setRetryAttempts(0);
    execute();
  }, [execute]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return {
    ...state,
    execute,
    reset,
    retry,
    isRetrying: retryAttempts > 0
  };
}

// Hook especializado para datos de analytics
export function useAnalyticsData() {
  const fetchAnalyticsData = async () => {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  };

  return useAsyncData(fetchAnalyticsData, {
    immediate: true,
    retryCount: 3,
    retryDelay: 1000
  });
}
