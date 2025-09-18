import { render, screen } from '@testing-library/react';
import MetricsDisplay from '../MetricsDisplay';
import { Summary } from '@/types/data';

const mockSummary: Summary = {
  total_revenue: 2456789.50,
  total_orders: 12456,
  total_customers: 8934,
  revenue_growth: 12.5,
  orders_growth: 8.3,
  customers_growth: 15.2,
  average_order_value: 197.25,
  conversion_rate: 3.8
};

describe('MetricsDisplay', () => {
  it('renders all metric cards', () => {
    render(<MetricsDisplay summary={mockSummary} />);
    
    expect(screen.getByText('Ingresos Totales')).toBeInTheDocument();
    expect(screen.getByText('Total de Pedidos')).toBeInTheDocument();
    expect(screen.getByText('Total de Clientes')).toBeInTheDocument();
    expect(screen.getByText('Valor Promedio del Pedido')).toBeInTheDocument();
    expect(screen.getByText('Tasa de Conversión')).toBeInTheDocument();
  });

  it('formats currency values correctly', () => {
    render(<MetricsDisplay summary={mockSummary} />);
    
    expect(screen.getByText('$2,456,790')).toBeInTheDocument();
    expect(screen.getByText('$197')).toBeInTheDocument();
  });

  it('formats numbers correctly', () => {
    render(<MetricsDisplay summary={mockSummary} />);
    
    expect(screen.getByText('12,456')).toBeInTheDocument();
    expect(screen.getByText('8,934')).toBeInTheDocument();
  });

  it('displays growth percentages with correct formatting', () => {
    render(<MetricsDisplay summary={mockSummary} />);
    
    expect(screen.getByText('+12.5%')).toBeInTheDocument();
    expect(screen.getByText('+8.3%')).toBeInTheDocument();
    expect(screen.getByText('+15.2%')).toBeInTheDocument();
  });

  it('shows correct icons for each metric', () => {
    render(<MetricsDisplay summary={mockSummary} />);
    
    expect(screen.getByText('💰')).toBeInTheDocument();
    expect(screen.getByText('📦')).toBeInTheDocument();
    expect(screen.getByText('👥')).toBeInTheDocument();
    expect(screen.getByText('💳')).toBeInTheDocument();
    expect(screen.getByText('📈')).toBeInTheDocument();
  });

  it('applies correct growth colors', () => {
    render(<MetricsDisplay summary={mockSummary} />);
    
    const growthElements = screen.getAllByText(/\+12\.5%|\+8\.3%|\+15\.2%/);
    growthElements.forEach(element => {
      expect(element).toHaveClass('text-green-600');
    });
  });

  it('handles negative growth correctly', () => {
    const negativeSummary: Summary = {
      ...mockSummary,
      revenue_growth: -5.2,
      orders_growth: -2.1
    };
    
    render(<MetricsDisplay summary={negativeSummary} />);
    
    expect(screen.getByText('-5.2%')).toBeInTheDocument();
    expect(screen.getByText('-2.1%')).toBeInTheDocument();
  });

  it('handles zero growth correctly', () => {
    const zeroSummary: Summary = {
      ...mockSummary,
      revenue_growth: 0,
      orders_growth: 0
    };
    
    render(<MetricsDisplay summary={zeroSummary} />);
    
    expect(screen.getByText('+0.0%')).toBeInTheDocument();
  });

  it('handles very large numbers correctly', () => {
    const largeSummary: Summary = {
      ...mockSummary,
      total_revenue: 999999999.99,
      total_orders: 9999999,
      total_customers: 9999999
    };
    
    render(<MetricsDisplay summary={largeSummary} />);
    
    expect(screen.getByText('$1,000,000,000')).toBeInTheDocument();
    expect(screen.getByText('9,999,999')).toBeInTheDocument();
  });

  it('handles very small numbers correctly', () => {
    const smallSummary: Summary = {
      ...mockSummary,
      total_revenue: 0.01,
      total_orders: 1,
      total_customers: 1
    };
    
    render(<MetricsDisplay summary={smallSummary} />);
    
    expect(screen.getByText('$0')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    render(<MetricsDisplay summary={mockSummary} />);
    
    const metricCards = screen.getAllByText(/Ingresos Totales|Total de Pedidos|Total de Clientes|Valor Promedio del Pedido|Tasa de Conversión/);
    metricCards.forEach(card => {
      expect(card.closest('div')).toHaveClass('bg-white', 'rounded-lg', 'shadow-md');
    });
  });

  it('displays all required metrics', () => {
    render(<MetricsDisplay summary={mockSummary} />);
    
    const requiredMetrics = [
      'Ingresos Totales',
      'Total de Pedidos', 
      'Total de Clientes',
      'Valor Promedio del Pedido',
      'Tasa de Conversión'
    ];
    
    requiredMetrics.forEach(metric => {
      expect(screen.getByText(metric)).toBeInTheDocument();
    });
  });

  it('handles edge case with undefined values', () => {
    const edgeSummary: Summary = {
      total_revenue: 0,
      total_orders: 0,
      total_customers: 0,
      revenue_growth: 0,
      orders_growth: 0,
      customers_growth: 0,
      average_order_value: 0,
      conversion_rate: 0
    };
    
    render(<MetricsDisplay summary={edgeSummary} />);
    
    expect(screen.getByText('$0')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('0%')).toBeInTheDocument();
  });
});
