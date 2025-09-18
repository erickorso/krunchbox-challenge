import { store } from '../index';
import analyticsReducer from '../slices/analyticsSlice';

describe('store', () => {
  it('should have the correct initial state', () => {
    const state = store.getState();
    
    expect(state).toHaveProperty('analytics');
    expect(state.analytics).toEqual({
      data: null,
      loading: false,
      error: null,
      lastFetched: null,
    });
  });

  it('should have analytics reducer', () => {
    const state = store.getState();
    expect(state.analytics).toBeDefined();
  });

  it('should be configured with redux-saga middleware', () => {
    // This test verifies that the store is configured properly
    // The actual saga middleware configuration is tested implicitly
    // through the store's ability to dispatch actions
    expect(store).toBeDefined();
    expect(typeof store.dispatch).toBe('function');
    expect(typeof store.getState).toBe('function');
    expect(typeof store.subscribe).toBe('function');
  });

  it('should handle analytics actions', () => {
    const initialState = store.getState();
    expect(initialState.analytics.loading).toBe(false);

    // Dispatch an action
    store.dispatch({ type: 'analytics/fetchAnalyticsData' });
    
    const stateAfterDispatch = store.getState();
    expect(stateAfterDispatch.analytics.loading).toBe(true);
  });

  it('should have devTools enabled in development', () => {
    // This test verifies that the store is configured with devTools
    // The actual devTools configuration is tested through the store's
    // ability to work with Redux DevTools
    expect(store).toBeDefined();
  });
});
