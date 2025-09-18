'use client';

import { Summary } from '@/types/data';

interface MetricsDisplayProps {
  summary: Summary;
}

export default function MetricsDisplay({ summary }: MetricsDisplayProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const getGrowthColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getGrowthIcon = (value: number) => {
    if (value > 0) return '↗️';
    if (value < 0) return '↘️';
    return '→';
  };

  const metrics = [
    {
      title: 'Ingresos Totales',
      value: formatCurrency(summary.total_revenue),
      growth: summary.revenue_growth,
      icon: '💰',
      color: 'bg-blue-500'
    },
    {
      title: 'Total de Pedidos',
      value: formatNumber(summary.total_orders),
      growth: summary.orders_growth,
      icon: '📦',
      color: 'bg-green-500'
    },
    {
      title: 'Total de Clientes',
      value: formatNumber(summary.total_customers),
      growth: summary.customers_growth,
      icon: '👥',
      color: 'bg-purple-500'
    },
    {
      title: 'Valor Promedio del Pedido',
      value: formatCurrency(summary.average_order_value),
      growth: 0, // AOV growth not provided in summary
      icon: '💳',
      color: 'bg-orange-500'
    },
    {
      title: 'Tasa de Conversión',
      value: `${summary.conversion_rate}%`,
      growth: 0, // Conversion rate growth not provided in summary
      icon: '📈',
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${metric.color} rounded-lg flex items-center justify-center text-white text-xl`}>
              {metric.icon}
            </div>
            {metric.growth !== 0 && (
              <div className={`text-sm font-medium ${getGrowthColor(metric.growth)}`}>
                <span className="mr-1">{getGrowthIcon(metric.growth)}</span>
                {formatPercentage(metric.growth)}
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              {metric.title}
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {metric.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
