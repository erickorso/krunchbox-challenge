'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendDataPoint } from '@/types/data';

// Dynamic import to avoid SSR issues
const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96">
      <div className="w-full space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  )
});

interface TrendChartProps {
  data: TrendDataPoint[];
}

export default function TrendChart({ data }: TrendChartProps) {
  const plotData = useMemo(() => {
    if (!data || data.length === 0) return [];

    const dates = data.map(d => d.date);
    const revenue = data.map(d => d.revenue);
    const orders = data.map(d => d.orders);
    const customers = data.map(d => d.customers);

    return [
      {
        x: dates,
        y: revenue,
        type: 'scatter' as const,
        mode: 'lines+markers' as const,
        name: 'Revenue',
        yaxis: 'y' as const,
        line: {
          color: '#3B82F6',
          width: 3
        },
        marker: {
          color: '#3B82F6',
          size: 6
        }
      },
      {
        x: dates,
        y: orders,
        type: 'scatter' as const,
        mode: 'lines+markers' as const,
        name: 'Orders',
        yaxis: 'y2' as const,
        line: {
          color: '#10B981',
          width: 3
        },
        marker: {
          color: '#10B981',
          size: 6
        }
      },
      {
        x: dates,
        y: customers,
        type: 'scatter' as const,
        mode: 'lines+markers' as const,
        name: 'Customers',
        yaxis: 'y3' as const,
        line: {
          color: '#8B5CF6',
          width: 3
        },
        marker: {
          color: '#8B5CF6',
          size: 6
        }
      }
    ];
  }, [data]);

  const layout = useMemo(() => ({
    title: {
      text: 'Performance Trends',
      font: { size: 18, color: '#374151' },
      x: 0.5, // Center the title
      xanchor: 'center' as const,
      y: 0.95,
      yanchor: 'top' as const
    },
    xaxis: {
      title: { text: 'Date' },
      showgrid: true,
      gridcolor: '#E5E7EB',
      tickformat: '%d/%m'
    },
    yaxis: {
      title: { 
        text: 'Revenue (USD)', 
        standoff: 20,
        font: { color: '#000000', size: 12 }
      },
      titlefont: { color: '#000000' },
      tickfont: { color: '#3B82F6' },
      showgrid: true,
      gridcolor: '#E5E7EB',
      tickformat: '$,.0f'
    },
    yaxis2: {
      title: { 
        text: 'Orders', 
        standoff: 20,
        font: { color: '#000000', size: 12 }
      },
      titlefont: { color: '#000000' },
      tickfont: { color: '#10B981' },
      anchor: 'x' as const,
      overlaying: 'y' as const,
      side: 'right' as const,
      position: 0.82,
      showgrid: false,
      tickformat: ',.0f'
    },
    yaxis3: {
      title: { 
        text: 'Customers', 
        standoff: 20,
        font: { color: '#000000', size: 12 }
      },
      titlefont: { color: '#000000' },
      tickfont: { color: '#8B5CF6' },
      anchor: 'free' as const,
      overlaying: 'y' as const,
      side: 'right' as const,
      position: 0.92,
      showgrid: false,
      tickformat: ',.0f'
    },
    legend: {
      x: 0,
      y: 1,
      bgcolor: 'rgba(255,255,255,0.8)',
      bordercolor: '#E5E7EB',
      borderwidth: 1
    },
    margin: { t: 100, r: 150, b: 80, l: 80 },
    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)',
    hovermode: 'x unified' as const
  }), []);

  const config = {
    displayModeBar: true,
    displaylogo: false,
    responsive: true
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 text-gray-500">
        <div className="text-center">
          <p>No trend data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-96">
      <Plot
        data={plotData}
        layout={layout}
        config={config}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}