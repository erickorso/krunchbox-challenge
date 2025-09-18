'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { TrendDataPoint } from '@/types/data';

// Dynamic import to avoid SSR issues
const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-80">Cargando gráfico...</div>
});

interface TrendChartProps {
  data: TrendDataPoint[];
}

export default function TrendChart({ data }: TrendChartProps) {
  const plotData = useMemo(() => {
    const dates = data.map(d => d.date);
    const revenue = data.map(d => d.revenue);
    const orders = data.map(d => d.orders);
    const customers = data.map(d => d.customers);

    return [
      {
        x: dates,
        y: revenue,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Ingresos',
        yaxis: 'y',
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
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Pedidos',
        yaxis: 'y2',
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
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Clientes',
        yaxis: 'y3',
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
      text: 'Tendencias de Rendimiento',
      font: { size: 16, color: '#374151' }
    },
    xaxis: {
      title: 'Fecha',
      showgrid: true,
      gridcolor: '#E5E7EB',
      tickformat: '%d/%m'
    },
    yaxis: {
      title: 'Ingresos (USD)',
      titlefont: { color: '#3B82F6' },
      tickfont: { color: '#3B82F6' },
      showgrid: true,
      gridcolor: '#E5E7EB',
      tickformat: '$,.0f'
    },
    yaxis2: {
      title: 'Pedidos',
      titlefont: { color: '#10B981' },
      tickfont: { color: '#10B981' },
      anchor: 'x',
      overlaying: 'y',
      side: 'right',
      showgrid: false,
      tickformat: ',.0f'
    },
    yaxis3: {
      title: 'Clientes',
      titlefont: { color: '#8B5CF6' },
      tickfont: { color: '#8B5CF6' },
      anchor: 'free',
      overlaying: 'y',
      side: 'right',
      position: 0.95,
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
    margin: { t: 50, r: 80, b: 50, l: 80 },
    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)',
    hovermode: 'x unified'
  }), []);

  const config = {
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d'],
    responsive: true
  };

  return (
    <div className="w-full h-80">
      <Plot
        data={plotData}
        layout={layout}
        config={config}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
