'use client';

import { Summary } from '@/types/data';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

  const getGrowthVariant = (value: number): "default" | "destructive" | "secondary" => {
    if (value > 0) return 'default';
    if (value < 0) return 'destructive';
    return 'secondary';
  };

  const getGrowthIcon = (value: number) => {
    if (value > 0) return '↗️';
    if (value < 0) return '↘️';
    return '→';
  };

  const metrics = [
    {
      title: 'Total Revenue',
      value: formatCurrency(summary.total_revenue),
      growth: summary.revenue_growth,
      icon: '💰',
      color: 'bg-blue-500'
    },
    {
      title: 'Total Orders',
      value: formatNumber(summary.total_orders),
      growth: summary.orders_growth,
      icon: '📦',
      color: 'bg-green-500'
    },
    {
      title: 'Total Customers',
      value: formatNumber(summary.total_customers),
      growth: summary.customers_growth,
      icon: '👥',
      color: 'bg-purple-500'
    },
    {
      title: 'Average Order Value',
      value: formatCurrency(summary.average_order_value),
      growth: 0, // AOV growth not provided in summary
      icon: '💳',
      color: 'bg-orange-500'
    },
    {
      title: 'Conversion Rate',
      value: `${summary.conversion_rate}%`,
      growth: 0, // Conversion rate growth not provided in summary
      icon: '📈',
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className={`w-12 h-12 ${metric.color} rounded-lg flex items-center justify-center text-white text-xl`}>
              {metric.icon}
            </div>
            {metric.growth !== 0 && (
              <Badge variant={getGrowthVariant(metric.growth)}>
                <span className="mr-1">{getGrowthIcon(metric.growth)}</span>
                {formatPercentage(metric.growth)}
              </Badge>
            )}
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium text-muted-foreground mb-1">
              {metric.title}
            </div>
            <div className="text-2xl font-bold">
              {metric.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
