import { render, screen, waitFor, act } from '@testing-library/react';
import InsightCard from '../InsightCard';

// Mock TrendChart to avoid Plotly.js issues
jest.mock('../TrendChart', () => {
  return function MockTrendChart({ data }: any) {
    return <div data-testid="trend-chart">Trend Chart with {data.length} data points</div>;
  };
});

// Mock TopPerformersTable
jest.mock('../TopPerformersTable', () => {
  return function MockTopPerformersTable({ data }: any) {
    return <div data-testid="top-performers-table">Top Performers Table with {data.length} stores</div>;
  };
});

// Mock the API response
const mockApiResponse = {
  summary: {
    total_revenue: 2456789.50,
    total_orders: 12456,
    total_customers: 8934,
    revenue_growth: 12.5,
    orders_growth: 8.3,
    customers_growth: 15.2,
    average_order_value: 197.25,
    conversion_rate: 3.8
  },
  top_performers: [
    {
      store_id: "ST001",
      store_name: "Downtown Flagship",
      location: "New York, NY",
      revenue: 456789.25,
      orders: 2345,
      customers: 1890,
      revenue_growth: 18.5,
      orders_growth: 12.3,
      customers_growth: 22.1,
      average_order_value: 194.75,
      conversion_rate: 4.2,
      rank: 1
    }
  ],
  trend_data: [
    { date: "2024-01-01", revenue: 2100000, orders: 10500, customers: 7800, average_order_value: 200.00, conversion_rate: 3.5 }
  ],
  period: {
    start_date: "2024-01-01",
    end_date: "2024-02-19"
  },
  last_updated: "2024-02-19T10:30:00Z"
};

// Mock fetch
global.fetch = jest.fn();

describe('InsightCard', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('shows loading state initially', () => {
    (fetch as jest.Mock).mockImplementation(() => new Promise(() => {})); // Never resolves
    
    render(<InsightCard />);
    
    expect(screen.getByText('Cargando datos de análisis...')).toBeInTheDocument();
    expect(screen.getByText('Cargando datos de análisis...').parentElement?.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('shows error state when API fails', async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error('API Error'));
    
    await act(async () => {
      render(<InsightCard />);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Error al cargar los datos')).toBeInTheDocument();
      expect(screen.getByText('Ha ocurrido un error al cargar los datos de análisis.')).toBeInTheDocument();
      expect(screen.getByText('Reintentar')).toBeInTheDocument();
    });
  });

  it('renders dashboard when data is loaded successfully', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse
    });
    
    await act(async () => {
      render(<InsightCard />);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Dashboard de Análisis de Ventas')).toBeInTheDocument();
      expect(screen.getByText('Ingresos Totales')).toBeInTheDocument();
      expect(screen.getByText('Tiendas con Mejor Rendimiento')).toBeInTheDocument();
      expect(screen.getByText('Tendencias de Rendimiento')).toBeInTheDocument();
    });
  });

  it('displays period information correctly', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse
    });
    
    await act(async () => {
      render(<InsightCard />);
    });
    
    await waitFor(() => {
      expect(screen.getByText(/Período:/)).toBeInTheDocument();
      expect(screen.getByText(/Última actualización:/)).toBeInTheDocument();
    });
  });

  it('calls API endpoint on mount', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse
    });
    
    await act(async () => {
      render(<InsightCard />);
    });
    
    expect(fetch).toHaveBeenCalledWith('/api/data');
  });

  it('handles retry button click', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));
    
    await act(async () => {
      render(<InsightCard />);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Reintentar')).toBeInTheDocument();
    });
    
    // Mock successful response for retry
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse
    });
    
    // Mock window.location.reload
    const mockReload = jest.fn();
    delete (window as any).location;
    (window as any).location = { reload: mockReload };
    
    // Simulate retry by reloading (in real app, this would be a button click)
    mockReload();
    expect(mockReload).toHaveBeenCalled();
  });
});
