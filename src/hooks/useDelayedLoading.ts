import { useState, useEffect } from 'react';

interface UseDelayedLoadingOptions {
  delay?: number;
  immediate?: boolean;
}

export function useDelayedLoading(options: UseDelayedLoadingOptions = {}) {
  const { delay = 1000, immediate = true } = options;
  const [isLoading, setIsLoading] = useState(immediate);

  useEffect(() => {
    if (immediate) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [delay, immediate]);

  const startLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, delay);
  };

  return {
    isLoading,
    startLoading
  };
}

// Hook specifically for components with delay
export function useComponentDelay(delay: number = 1000) {
  return useDelayedLoading({ delay, immediate: true });
}
