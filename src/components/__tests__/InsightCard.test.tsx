import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import InsightCard from '../InsightCard';
import analyticsReducer from '@/store/slices/analyticsSlice';

// Mock TrendChart to avoid Plotly.js issues
jest.mock('../TrendChart', () => {
  const MockTrendChart = ({ data }: { data: unknown[] }) => {
    return <div data-testid="trend-chart">Trend Chart with {data.length} data points</div>;
  };
  MockTrendChart.displayName = 'MockTrendChart';
  return MockTrendChart;
});

// Mock TopPerformersTable
jest.mock('../TopPerformersTable', () => {
  const MockTopPerformersTable = ({ data }: { data: unknown[] }) => {
    return <div data-testid="top-performers-table">Top Performers Table with {data.length} stores</div>;
  };
  MockTopPerformersTable.displayName = 'MockTopPerformersTable';
  return MockTopPerformersTable;
});

// Create test store
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      analytics: analyticsReducer,
    },
    preloadedState: initialState,
  });
};

// Test wrapper component
const createWrapper = (store: ReturnType<typeof createTestStore>) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
  Wrapper.displayName = 'Wrapper';
  return Wrapper;
};

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

describe('InsightCard', () => {
  it('shows loading state initially', () => {
    const store = createTestStore({
      analytics: {
        data: null,
        loading: true,
        error: null,
        lastFetched: null,
      },
    });
    
    render(<InsightCard />, { wrapper: createWrapper(store) });
    
    expect(screen.getByText('Cargando datos de análisis...')).toBeInTheDocument();
    expect(screen.getByText('Cargando datos de análisis...').parentElement?.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('shows error state when API fails', async () => {
    const store = createTestStore({
      analytics: {
        data: null,
        loading: false,
        error: 'API Error',
        lastFetched: null,
      },
    });
    
    render(<InsightCard />, { wrapper: createWrapper(store) });
    
    // Wait for the error state to appear after useEffect runs
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(screen.getByText('Error al cargar los datos')).toBeInTheDocument();
    expect(screen.getByText('Ha ocurrido un error al cargar los datos de análisis.')).toBeInTheDocument();
    expect(screen.getByText('Reintentar')).toBeInTheDocument();
  });

  it('renders dashboard when data is loaded successfully', async () => {
    const store = createTestStore({
      analytics: {
        data: mockApiResponse,
        loading: false,
        error: null,
        lastFetched: '2024-01-01T00:00:00Z',
      },
    });
    
    render(<InsightCard />, { wrapper: createWrapper(store) });
    
    // Wait for the dashboard to appear after useEffect runs
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(screen.getByText('Dashboard de Análisis de Ventas')).toBeInTheDocument();
    expect(screen.getByText('Ingresos Totales')).toBeInTheDocument();
    expect(screen.getByText('Tiendas con Mejor Rendimiento')).toBeInTheDocument();
    expect(screen.getByText('Tendencias de Rendimiento')).toBeInTheDocument();
  });

  it('displays period information correctly', async () => {
    const store = createTestStore({
      analytics: {
        data: mockApiResponse,
        loading: false,
        error: null,
        lastFetched: '2024-01-01T00:00:00Z',
      },
    });
    
    render(<InsightCard />, { wrapper: createWrapper(store) });
    
    // Wait for the dashboard to appear after useEffect runs
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(screen.getByText(/Período:/)).toBeInTheDocument();
    expect(screen.getByText(/Última actualización:/)).toBeInTheDocument();
  });

  it('shows no data message when data is null', async () => {
    const store = createTestStore({
      analytics: {
        data: null,
        loading: false,
        error: null,
        lastFetched: null,
      },
    });
    
    render(<InsightCard />, { wrapper: createWrapper(store) });
    
    // Wait for the no data state to appear after useEffect runs
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(screen.getByText('No hay datos disponibles')).toBeInTheDocument();
  });

  it('handles retry button click', async () => {
    const store = createTestStore({
      analytics: {
        data: null,
        loading: false,
        error: 'API Error',
        lastFetched: null,
      },
    });
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    
    render(<InsightCard />, { wrapper: createWrapper(store) });
    
    // Wait for the error state to appear after useEffect runs
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(screen.getByText('Reintentar')).toBeInTheDocument();
    
    // Click retry button
    const retryButton = screen.getByText('Reintentar');
    retryButton.click();
    
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'analytics/clearError' });
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'analytics/fetchAnalyticsData' });
    
    dispatchSpy.mockRestore();
  });
});