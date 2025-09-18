import { render, screen } from '@testing-library/react';
import TrendChart from '../TrendChart';
import { TrendDataPoint } from '@/types/data';

const mockTrendData: TrendDataPoint[] = [
  { date: "2024-01-01", revenue: 2100000, orders: 10500, customers: 7800, average_order_value: 200.00, conversion_rate: 3.5 },
  { date: "2024-01-08", revenue: 2150000, orders: 10800, customers: 8000, average_order_value: 199.07, conversion_rate: 3.6 },
  { date: "2024-01-15", revenue: 2200000, orders: 11000, customers: 8200, average_order_value: 200.00, conversion_rate: 3.7 }
];

// Mock next/dynamic
jest.mock('next/dynamic', () => () => {
  const MockPlot = ({ data, layout, config }: { 
    data: unknown; 
    layout: unknown; 
    config: unknown; 
  }) => (
    <div data-testid="plotly-chart">
      <div data-testid="chart-data" data-chart-data={JSON.stringify(data)} />
      <div data-testid="chart-layout" data-chart-layout={JSON.stringify(layout)} />
      <div data-testid="chart-config" data-chart-config={JSON.stringify(config)} />
    </div>
  );
  MockPlot.displayName = 'MockPlot';
  return MockPlot;
});

describe('TrendChart', () => {
  it('renders Plotly chart', () => {
    render(<TrendChart data={mockTrendData} />);
    
    expect(screen.getByTestId('plotly-chart')).toBeInTheDocument();
  });

  it('processes data correctly', () => {
    render(<TrendChart data={mockTrendData} />);
    
    const chartData = screen.getByTestId('chart-data');
    const data = JSON.parse(chartData.getAttribute('data-chart-data') || '[]');
    
    expect(data).toHaveLength(3); // revenue, orders, customers
    expect(data[0].name).toBe('Ingresos');
    expect(data[1].name).toBe('Pedidos');
    expect(data[2].name).toBe('Clientes');
  });

  it('extracts dates correctly', () => {
    render(<TrendChart data={mockTrendData} />);
    
    const chartData = screen.getByTestId('chart-data');
    const data = JSON.parse(chartData.getAttribute('data-chart-data') || '[]');
    
    expect(data[0].x).toEqual(['2024-01-01', '2024-01-08', '2024-01-15']);
    expect(data[1].x).toEqual(['2024-01-01', '2024-01-08', '2024-01-15']);
    expect(data[2].x).toEqual(['2024-01-01', '2024-01-08', '2024-01-15']);
  });

  it('extracts revenue data correctly', () => {
    render(<TrendChart data={mockTrendData} />);
    
    const chartData = screen.getByTestId('chart-data');
    const data = JSON.parse(chartData.getAttribute('data-chart-data') || '[]');
    
    expect(data[0].y).toEqual([2100000, 2150000, 2200000]);
  });

  it('extracts orders data correctly', () => {
    render(<TrendChart data={mockTrendData} />);
    
    const chartData = screen.getByTestId('chart-data');
    const data = JSON.parse(chartData.getAttribute('data-chart-data') || '[]');
    
    expect(data[1].y).toEqual([10500, 10800, 11000]);
  });

  it('extracts customers data correctly', () => {
    render(<TrendChart data={mockTrendData} />);
    
    const chartData = screen.getByTestId('chart-data');
    const data = JSON.parse(chartData.getAttribute('data-chart-data') || '[]');
    
    expect(data[2].y).toEqual([7800, 8000, 8200]);
  });

  it('sets correct chart types and modes', () => {
    render(<TrendChart data={mockTrendData} />);
    
    const chartData = screen.getByTestId('chart-data');
    const data = JSON.parse(chartData.getAttribute('data-chart-data') || '[]');
    
    data.forEach((series: { type: string; mode: string }) => {
      expect(series.type).toBe('scatter');
      expect(series.mode).toBe('lines+markers');
    });
  });

  it('applies correct colors', () => {
    render(<TrendChart data={mockTrendData} />);
    
    const chartData = screen.getByTestId('chart-data');
    const data = JSON.parse(chartData.getAttribute('data-chart-data') || '[]');
    
    expect(data[0].line.color).toBe('#3B82F6'); // Blue for revenue
    expect(data[1].line.color).toBe('#10B981'); // Green for orders
    expect(data[2].line.color).toBe('#8B5CF6'); // Purple for customers
  });

  it('configures layout correctly', () => {
    render(<TrendChart data={mockTrendData} />);
    
    const chartLayout = screen.getByTestId('chart-layout');
    const layout = JSON.parse(chartLayout.getAttribute('data-chart-layout') || '{}');
    
    expect(layout.title.text).toBe('Tendencias de Rendimiento');
    expect(layout.xaxis.title).toBe('Fecha');
    expect(layout.yaxis.title).toBe('Ingresos (USD)');
    expect(layout.yaxis2.title).toBe('Pedidos');
    expect(layout.yaxis3.title).toBe('Clientes');
  });

  it('handles empty data gracefully', () => {
    render(<TrendChart data={[]} />);
    
    expect(screen.getByTestId('plotly-chart')).toBeInTheDocument();
    
    const chartData = screen.getByTestId('chart-data');
    const data = JSON.parse(chartData.getAttribute('data-chart-data') || '[]');
    
    expect(data[0].x).toEqual([]);
    expect(data[0].y).toEqual([]);
  });

  it('applies correct styling', () => {
    render(<TrendChart data={mockTrendData} />);
    
    const chartContainer = screen.getByTestId('plotly-chart').parentElement;
    expect(chartContainer).toHaveClass('w-full', 'h-80');
  });
});
