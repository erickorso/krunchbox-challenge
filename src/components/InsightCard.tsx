'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAnalyticsData, clearError } from '@/store/slices/analyticsSlice';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorBoundary } from './ErrorBoundary';
import { MetricsSuspense, ChartSuspense, TableSuspense } from './SuspenseWrapper';
import MetricsDisplay from './MetricsDisplay';
import TopPerformersTable from './TopPerformersTable';
import TrendChart from './TrendChart';

export default function InsightCard() {
  const dispatch = useAppDispatch();
  const { data, loading: isLoading, error } = useAppSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchAnalyticsData());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(clearError());
    dispatch(fetchAnalyticsData());
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <Skeleton className="h-12 w-12 rounded-full mx-auto mb-4" />
              <Skeleton className="h-6 w-48 mx-auto" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Error al cargar los datos</h2>
              <Alert className="mb-4">
                <AlertDescription>
                  Ha ocurrido un error al cargar los datos de análisis.
                </AlertDescription>
              </Alert>
              <Button onClick={handleRetry} className="w-full">
                Reintentar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-600 text-lg">No hay datos disponibles</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }


  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Image 
                src="/Krunchbox-logo.svg" 
                alt="Krunchbox Logo" 
                width={48}
                height={48}
                className="mr-4"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Dashboard de Análisis de Ventas
                </h1>
                <p className="text-sm text-gray-500">
                  Powered by Krunchbox 2.0
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <p className="text-gray-600">
                <span className="font-medium">Período:</span> {new Date(data.period.start_date).toLocaleDateString()} - {new Date(data.period.end_date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Última actualización:</span> {new Date(data.last_updated).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Metrics Overview with Suspense - 500ms delay */}
          <div className="mb-8">
            <MetricsSuspense delay={500}>
              <MetricsDisplay summary={data.summary} />
            </MetricsSuspense>
          </div>

          {/* Charts and Tables Grid with Suspense */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Trend Chart with Suspense - 1000ms delay */}
            <Card>
              <ChartSuspense title="Tendencias de Rendimiento" delay={1000}>
                <TrendChart data={data.trend_data} />
              </ChartSuspense>
            </Card>

            {/* Top Performers Table with Suspense - 1500ms delay */}
            <Card>
              <TableSuspense title="Tiendas con Mejor Rendimiento" delay={1500}>
                <TopPerformersTable data={data.top_performers} />
              </TableSuspense>
            </Card>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
