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
        name: 'Ingresos',
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
        name: 'Pedidos',
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
        name: 'Clientes',
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
      text: 'Tendencias de Rendimiento',
      font: { size: 16, color: '#374151' },
      x: 0.1, // Mover el título hacia la derecha
      xanchor: 'left' as const
    },
    xaxis: {
      title: { text: 'Fecha' },
      showgrid: true,
      gridcolor: '#E5E7EB',
      tickformat: '%d/%m'
    },
    yaxis: {
      title: { 
        text: 'Ingresos (USD)', 
        standoff: 5,
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
        text: 'Pedidos', 
        standoff: 5,
        font: { color: '#000000', size: 12 }
      },
      titlefont: { color: '#000000' },
      tickfont: { color: '#10B981' },
      anchor: 'x' as const,
      overlaying: 'y' as const,
      side: 'right' as const,
      showgrid: false,
      tickformat: ',.0f'
    },
    yaxis3: {
      title: { 
        text: 'Clientes', 
        standoff: 5,
        font: { color: '#000000', size: 12 }
      },
      titlefont: { color: '#000000' },
      tickfont: { color: '#8B5CF6' },
      anchor: 'free' as const,
      overlaying: 'y' as const,
      side: 'right' as const,
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
    margin: { t: 80, r: 120, b: 50, l: 50 },
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
          <p>No hay datos de tendencias disponibles</p>
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