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
});
