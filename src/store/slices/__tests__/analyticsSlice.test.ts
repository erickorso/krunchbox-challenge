import analyticsReducer, {
  fetchAnalyticsData,
  fetchAnalyticsDataSuccess,
  fetchAnalyticsDataFailure,
  clearError,
  resetAnalytics,
} from '../analyticsSlice';
import { AnalyticsData } from '@/types/data';

const mockAnalyticsData: AnalyticsData = {
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

describe('analyticsSlice', () => {
  const initialState = {
    data: null,
    loading: false,
    error: null,
    lastFetched: null,
  };

  it('should return the initial state', () => {
    expect(analyticsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchAnalyticsData', () => {
    const actual = analyticsReducer(initialState, fetchAnalyticsData());
    expect(actual.loading).toBe(true);
    expect(actual.error).toBe(null);
  });

  it('should handle fetchAnalyticsDataSuccess', () => {
    const actual = analyticsReducer(
      { ...initialState, loading: true },
      fetchAnalyticsDataSuccess(mockAnalyticsData)
    );
    expect(actual.loading).toBe(false);
    expect(actual.data).toEqual(mockAnalyticsData);
    expect(actual.error).toBe(null);
    expect(actual.lastFetched).toBeDefined();
  });

  it('should handle fetchAnalyticsDataFailure', () => {
    const errorMessage = 'Failed to fetch data';
    const actual = analyticsReducer(
      { ...initialState, loading: true },
      fetchAnalyticsDataFailure(errorMessage)
    );
    expect(actual.loading).toBe(false);
    expect(actual.error).toBe(errorMessage);
  });

  it('should handle clearError', () => {
    const stateWithError = {
      ...initialState,
      error: 'Some error message'
    };
    const actual = analyticsReducer(stateWithError, clearError());
    expect(actual.error).toBe(null);
  });

  it('should handle resetAnalytics', () => {
    const stateWithData = {
      data: mockAnalyticsData,
      loading: true,
      error: 'Some error',
      lastFetched: '2024-01-01T00:00:00Z'
    };
    const actual = analyticsReducer(stateWithData, resetAnalytics());
    expect(actual).toEqual(initialState);
  });

  it('should preserve other state when handling fetchAnalyticsData', () => {
    const stateWithData = {
      data: mockAnalyticsData,
      loading: false,
      error: null,
      lastFetched: '2024-01-01T00:00:00Z'
    };
    const actual = analyticsReducer(stateWithData, fetchAnalyticsData());
    expect(actual.data).toEqual(mockAnalyticsData);
    expect(actual.lastFetched).toBe('2024-01-01T00:00:00Z');
    expect(actual.loading).toBe(true);
  });

  it('should preserve other state when handling fetchAnalyticsDataSuccess', () => {
    const stateWithError = {
      data: null,
      loading: true,
      error: 'Previous error',
      lastFetched: null
    };
    const actual = analyticsReducer(stateWithError, fetchAnalyticsDataSuccess(mockAnalyticsData));
    expect(actual.data).toEqual(mockAnalyticsData);
    expect(actual.loading).toBe(false);
    expect(actual.error).toBe(null);
    expect(actual.lastFetched).toBeDefined();
  });

  it('should preserve other state when handling fetchAnalyticsDataFailure', () => {
    const stateWithData = {
      data: mockAnalyticsData,
      loading: true,
      error: null,
      lastFetched: '2024-01-01T00:00:00Z'
    };
    const errorMessage = 'Network error';
    const actual = analyticsReducer(stateWithData, fetchAnalyticsDataFailure(errorMessage));
    expect(actual.data).toEqual(mockAnalyticsData);
    expect(actual.lastFetched).toBe('2024-01-01T00:00:00Z');
    expect(actual.loading).toBe(false);
    expect(actual.error).toBe(errorMessage);
  });
});
