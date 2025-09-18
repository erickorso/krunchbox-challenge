import React from 'react';
import { render } from '@testing-library/react';
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
    
    // Check for skeleton loading elements instead of text
    const skeletonElements = document.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletonElements).toHaveLength(2);
  });

  it('renders with Redux provider', () => {
    const store = createTestStore();
    
    render(<InsightCard />, { wrapper: createWrapper(store) });
    
    // Check for skeleton loading elements instead of text
    const skeletonElements = document.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletonElements).toHaveLength(2);
  });
});