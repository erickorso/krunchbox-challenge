import React from 'react';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../hooks';
import analyticsReducer from '../slices/analyticsSlice';

// Create a test store
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      analytics: analyticsReducer,
    },
    preloadedState: initialState,
  });
};

// Test wrapper component
const createWrapper = (store: any) => {
  return ({ children }: { children: React.ReactNode }) => {
    return React.createElement(Provider, { store }, children);
  };
};

describe('Redux hooks', () => {
  describe('useAppSelector', () => {
    it('should return the correct state', () => {
      const testState = {
        analytics: {
          data: null,
          loading: true,
          error: null,
          lastFetched: null,
        },
      };
      
      const store = createTestStore(testState);
      const wrapper = createWrapper(store);
      
      const { result } = renderHook(() => useAppSelector((state) => state.analytics), {
        wrapper,
      });
      
      expect(result.current).toEqual(testState.analytics);
    });

    it('should return updated state when store changes', () => {
      const store = createTestStore();
      const wrapper = createWrapper(store);
      
      const { result, rerender } = renderHook(() => useAppSelector((state) => state.analytics), {
        wrapper,
      });
      
      expect(result.current.loading).toBe(false);
      
      // Dispatch an action to change the state
      store.dispatch({ type: 'analytics/fetchAnalyticsData' });
      
      // Rerender to get updated state
      rerender();
      
      expect(result.current.loading).toBe(true);
    });

    it('should work with different selectors', () => {
      const testState = {
        analytics: {
          data: { summary: { total_revenue: 1000 } },
          loading: false,
          error: 'Test error',
          lastFetched: '2024-01-01T00:00:00Z',
        },
      };
      
      const store = createTestStore(testState);
      const wrapper = createWrapper(store);
      
      const { result: loadingResult } = renderHook(
        () => useAppSelector((state) => state.analytics.loading),
        { wrapper }
      );
      
      const { result: errorResult } = renderHook(
        () => useAppSelector((state) => state.analytics.error),
        { wrapper }
      );
      
      const { result: dataResult } = renderHook(
        () => useAppSelector((state) => state.analytics.data),
        { wrapper }
      );
      
      expect(loadingResult.current).toBe(false);
      expect(errorResult.current).toBe('Test error');
      expect(dataResult.current).toEqual({ summary: { total_revenue: 1000 } });
    });
  });

  describe('useAppDispatch', () => {
    it('should return a dispatch function', () => {
      const store = createTestStore();
      const wrapper = createWrapper(store);
      
      const { result } = renderHook(() => useAppDispatch(), { wrapper });
      
      expect(typeof result.current).toBe('function');
    });

    it('should dispatch actions correctly', () => {
      const store = createTestStore();
      const wrapper = createWrapper(store);
      
      const { result } = renderHook(() => useAppDispatch(), { wrapper });
      
      const dispatch = result.current;
      const action = { type: 'analytics/fetchAnalyticsData' };
      
      // Spy on store.dispatch
      const dispatchSpy = jest.spyOn(store, 'dispatch');
      
      dispatch(action);
      
      expect(dispatchSpy).toHaveBeenCalledWith(action);
      
      dispatchSpy.mockRestore();
    });

    it('should maintain dispatch function reference', () => {
      const store = createTestStore();
      const wrapper = createWrapper(store);
      
      const { result, rerender } = renderHook(() => useAppDispatch(), { wrapper });
      
      const firstDispatch = result.current;
      
      rerender();
      
      const secondDispatch = result.current;
      
      // The dispatch function should be the same reference
      expect(firstDispatch).toBe(secondDispatch);
    });
  });
});
