'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAnalyticsData, clearError } from '@/store/slices/analyticsSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard de Análisis de Ventas
          </h1>
          <p className="text-gray-600">
            Período: {new Date(data.period.start_date).toLocaleDateString()} - {new Date(data.period.end_date).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500">
            Última actualización: {new Date(data.last_updated).toLocaleString()}
          </p>
        </div>

        {/* Metrics Overview */}
        <div className="mb-8">
          <MetricsDisplay summary={data.summary} />
        </div>

        {/* Charts and Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Tendencias de Rendimiento</CardTitle>
            </CardHeader>
            <CardContent>
              <TrendChart data={data.trend_data} />
            </CardContent>
          </Card>

          {/* Top Performers Table */}
          <Card>
            <CardHeader>
              <CardTitle>Tiendas con Mejor Rendimiento</CardTitle>
            </CardHeader>
            <CardContent>
              <TopPerformersTable data={data.top_performers} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
