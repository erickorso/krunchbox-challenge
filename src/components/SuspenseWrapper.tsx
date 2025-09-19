'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface SuspenseWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  title?: string;
  className?: string;
  delay?: number;
}

// Skeleton personalizado para diferentes tipos de contenido
const ChartSkeleton = () => (
  <div className="w-full h-96 space-y-2">
    <Skeleton className="h-6 w-48" />
    <Skeleton className="h-4 w-32" />
    <Skeleton className="h-64 w-full" />
    <div className="flex space-x-2">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-14" />
    </div>
  </div>
);

const TableSkeleton = () => (
  <div className="w-full h-96 space-y-2">
    <Skeleton className="h-6 w-48" />
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-5/6" />
    <Skeleton className="h-4 w-2/3" />
    <Skeleton className="h-4 w-4/5" />
    <Skeleton className="h-4 w-3/5" />
    <Skeleton className="h-4 w-7/8" />
    <Skeleton className="h-4 w-1/2" />
  </div>
);

const MetricsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
    {Array.from({ length: 5 }).map((_, index) => (
      <Card key={index} className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <Skeleton className="h-6 w-16" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-24 mb-1" />
          <Skeleton className="h-8 w-20" />
        </CardContent>
      </Card>
    ))}
  </div>
);

const DefaultSkeleton = () => (
  <div className="flex items-center justify-center h-96">
    <div className="text-center space-y-4">
      <Skeleton className="h-12 w-12 rounded-full mx-auto" />
      <Skeleton className="h-6 w-48 mx-auto" />
      <Skeleton className="h-4 w-32 mx-auto" />
    </div>
  </div>
);

export const SuspenseWrapper: React.FC<SuspenseWrapperProps> = ({ 
  children, 
  fallback, 
  title,
  className = "",
  delay = 1000
}) => {
  const [showContent, setShowContent] = useState(false);
  const defaultFallback = fallback || <DefaultSkeleton />;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!showContent) {
    return (
      <div className={className}>
        {title && (
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
        )}
        {defaultFallback}
      </div>
    );
  }

  return (
    <div className={className}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <Suspense fallback={defaultFallback}>
        {children}
      </Suspense>
    </div>
  );
};

// Componentes especializados para diferentes tipos de contenido
export const ChartSuspense: React.FC<{ 
  children: React.ReactNode; 
  title?: string;
  delay?: number;
}> = ({ 
  children, 
  title,
  delay = 1000
}) => (
  <SuspenseWrapper fallback={<ChartSkeleton />} title={title} delay={delay}>
    {children}
  </SuspenseWrapper>
);

export const TableSuspense: React.FC<{ 
  children: React.ReactNode; 
  title?: string;
  delay?: number;
}> = ({ 
  children, 
  title,
  delay = 1000
}) => (
  <SuspenseWrapper fallback={<TableSkeleton />} title={title} delay={delay}>
    {children}
  </SuspenseWrapper>
);

export const MetricsSuspense: React.FC<{ 
  children: React.ReactNode;
  delay?: number;
}> = ({ children, delay = 1000 }) => (
  <SuspenseWrapper fallback={<MetricsSkeleton />} delay={delay}>
    {children}
  </SuspenseWrapper>
);

export default SuspenseWrapper;
