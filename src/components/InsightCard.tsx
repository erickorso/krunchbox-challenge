'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAnalyticsData, clearError } from '@/store/slices/analyticsSlice';
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
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando datos de análisis...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error al cargar los datos</h2>
          <p className="text-gray-600 mb-4">Ha ocurrido un error al cargar los datos de análisis.</p>
          <button 
            onClick={handleRetry} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 text-lg">No hay datos disponibles</p>
        </div>
      </div>
    );
  }

  console.log('InsightCard data:', data);
  console.log('Top performers:', data.top_performers);
  console.log('Top performers length:', data.top_performers?.length);
  console.log('Top performers type:', typeof data.top_performers);

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
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Tendencias de Rendimiento
            </h2>
            <TrendChart data={data.trend_data} />
          </div>

          {/* Top Performers Table */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Tiendas con Mejor Rendimiento
            </h2>
            <TopPerformersTable data={data.top_performers} />
          </div>
        </div>
      </div>
    </div>
  );
}
