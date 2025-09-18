import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnalyticsData } from '@/types/data';

interface AnalyticsState {
  data: AnalyticsData | null;
  loading: boolean;
  error: string | null;
  lastFetched: string | null;
}

const initialState: AnalyticsState = {
  data: null,
  loading: true, // Start with loading true
  error: null,
  lastFetched: null,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    fetchAnalyticsData: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAnalyticsDataSuccess: (state, action: PayloadAction<AnalyticsData>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      state.lastFetched = new Date().toISOString();
    },
    fetchAnalyticsDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetAnalytics: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.lastFetched = null;
    },
  },
});

export const {
  fetchAnalyticsData,
  fetchAnalyticsDataSuccess,
  fetchAnalyticsDataFailure,
  clearError,
  resetAnalytics,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
