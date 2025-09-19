'use client';

import React, { lazy } from 'react';
import { ChartSuspense, TableSuspense } from './SuspenseWrapper';
import { TrendDataPoint, TopPerformer } from '@/types/data';

// Lazy loading de componentes pesados
const LazyTrendChart = lazy(() => import('./TrendChart'));
const LazyTopPerformersTable = lazy(() => import('./TopPerformersTable'));

interface LazyTrendChartProps {
  data: TrendDataPoint[];
}

interface LazyTopPerformersTableProps {
  data: TopPerformer[];
}

export const LazyTrendChartWrapper: React.FC<LazyTrendChartProps> = (props) => (
  <ChartSuspense title="Tendencias de Rendimiento">
    <LazyTrendChart {...props} />
  </ChartSuspense>
);

export const LazyTopPerformersTableWrapper: React.FC<LazyTopPerformersTableProps> = (props) => (
  <TableSuspense title="Tiendas con Mejor Rendimiento">
    <LazyTopPerformersTable {...props} />
  </TableSuspense>
);

// Componente que simula carga asíncrona
export const AsyncDataComponent: React.FC<{ 
  children: React.ReactNode; 
  delay?: number;
  title?: string;
}> = ({ children, delay = 1000, title }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!isLoaded) {
    return (
      <div className="w-full">
        {title && (
          <div className="mb-4">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-48"></div>
          </div>
        )}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
