'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MetricsSuspense, ChartSuspense, TableSuspense } from './SuspenseWrapper';
import { ErrorBoundary } from './ErrorBoundary';
import MetricsDisplay from './MetricsDisplay';
import TrendChart from './TrendChart';
import TopPerformersTable from './TopPerformersTable';

// Datos de ejemplo
const mockData = {
  summary: {
    total_revenue: 3993567.25,
    total_orders: 20762,
    total_customers: 14707,
    revenue_growth: 12.5,
    orders_growth: 8.3,
    customers_growth: 15.2,
    average_order_value: 197.25,
    conversion_rate: 3.8
  },
  trend_data: [
    { date: "2024-01-01", revenue: 2100000, orders: 10500, customers: 7800, average_order_value: 200.00, conversion_rate: 3.5 },
    { date: "2024-01-08", revenue: 2150000, orders: 10800, customers: 8000, average_order_value: 199.07, conversion_rate: 3.6 },
    { date: "2024-01-15", revenue: 2200000, orders: 11000, customers: 8200, average_order_value: 200.00, conversion_rate: 3.7 }
  ],
  top_performers: [
    { store_id: "ST001", store_name: "Downtown Flagship", location: "New York, NY", revenue: 456789.25, orders: 2345, customers: 1890, revenue_growth: 18.5, orders_growth: 12.3, customers_growth: 22.1, average_order_value: 194.75, conversion_rate: 4.2, rank: 1 },
    { store_id: "ST002", store_name: "Westside Plaza", location: "Los Angeles, CA", revenue: 389456.80, orders: 1987, customers: 1456, revenue_growth: 15.2, orders_growth: 9.8, customers_growth: 18.7, average_order_value: 196.00, conversion_rate: 3.9, rank: 2 }
  ]
};

export default function SuspenseDemo() {
  const [showDemo, setShowDemo] = useState(false);

  const resetDemo = () => {
    setShowDemo(false);
    setTimeout(() => setShowDemo(true), 100);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              🎭 Demostración de Suspense & Skeleton Components
            </h1>
            <p className="text-gray-600 mb-6">
              Observa cómo se cargan los componentes con diferentes delays
            </p>
            <div className="space-x-4">
              <Button onClick={() => setShowDemo(true)}>
                {showDemo ? 'Reiniciar Demo' : 'Iniciar Demo'}
              </Button>
              <Button variant="outline" onClick={resetDemo}>
                Reset Demo
              </Button>
            </div>
          </div>

          {showDemo && (
            <>
              {/* Métricas - 500ms */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-center">
                  📊 Métricas (500ms delay)
                </h2>
                <MetricsSuspense delay={500}>
                  <MetricsDisplay summary={mockData.summary} />
                </MetricsSuspense>
              </div>

              {/* Gráfico y Tabla - 1000ms y 1500ms */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-center">
                    📈 Gráfico (1000ms delay)
                  </h2>
                  <Card>
                    <ChartSuspense title="Tendencias de Rendimiento" delay={1000}>
                      <TrendChart data={mockData.trend_data} />
                    </ChartSuspense>
                  </Card>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4 text-center">
                    📋 Tabla (1500ms delay)
                  </h2>
                  <Card>
                    <TableSuspense title="Tiendas con Mejor Rendimiento" delay={1500}>
                      <TopPerformersTable data={mockData.top_performers} />
                    </TableSuspense>
                  </Card>
                </div>
              </div>

              {/* Información sobre los delays */}
              <div className="mt-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">ℹ️ Información sobre los Delays</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-semibold text-blue-800">Métricas</h3>
                        <p className="text-blue-600">500ms delay</p>
                        <p className="text-sm text-blue-500">Carga más rápida</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h3 className="font-semibold text-green-800">Gráfico</h3>
                        <p className="text-green-600">1000ms delay</p>
                        <p className="text-sm text-green-500">Carga intermedia</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h3 className="font-semibold text-purple-800">Tabla</h3>
                        <p className="text-purple-600">1500ms delay</p>
                        <p className="text-sm text-purple-500">Carga más lenta</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
