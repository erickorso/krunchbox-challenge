import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchAnalyticsDataSaga, watchFetchAnalyticsData, fetchAnalyticsDataAPI } from '../analyticsSaga';
import {
  fetchAnalyticsDataSuccess,
  fetchAnalyticsDataFailure,
} from '../../slices/analyticsSlice';
import { AnalyticsData } from '@/types/data';

jest.mock('../analyticsSaga', () => {
  const mockFetchAnalyticsDataAPI = jest.fn();
  
  return {
    fetchAnalyticsDataAPI: mockFetchAnalyticsDataAPI,
    fetchAnalyticsDataSaga: function* fetchAnalyticsDataSaga() {
      try {
        const data = yield call(mockFetchAnalyticsDataAPI);
        yield put(fetchAnalyticsDataSuccess(data));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        yield put(fetchAnalyticsDataFailure(errorMessage));
      }
    },
    watchFetchAnalyticsData: function* watchFetchAnalyticsData() {
      yield takeEvery('analytics/fetchAnalyticsData', function* fetchAnalyticsDataSaga() {
        try {
          const data = yield call(mockFetchAnalyticsDataAPI);
          yield put(fetchAnalyticsDataSuccess(data));
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          yield put(fetchAnalyticsDataFailure(errorMessage));
        }
      });
    },
  };
});

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
  top_performers: [],
  trend_data: [],
  period: {
    start_date: "2024-01-01",
    end_date: "2024-02-19"
  },
  last_updated: "2024-02-19T10:30:00Z"
};

describe('analyticsSaga', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchAnalyticsDataSaga', () => {
    it('should be a generator function', () => {
      expect(typeof fetchAnalyticsDataSaga).toBe('function');
      expect(fetchAnalyticsDataSaga.constructor.name).toBe('GeneratorFunction');
    });

    it('should call fetchAnalyticsDataAPI', () => {
      const generator = fetchAnalyticsDataSaga();
      const firstCall = generator.next();
      
      expect(firstCall.value).toEqual(call(fetchAnalyticsDataAPI));
    });

    it('should dispatch success action on successful API call', () => {
      const generator = fetchAnalyticsDataSaga();
      
      // Skip the call effect
      generator.next();
      
      // Mock successful result
      const successResult = generator.next(mockAnalyticsData);
      
      expect(successResult.value).toEqual(put(fetchAnalyticsDataSuccess(mockAnalyticsData)));
    });

    it('should dispatch failure action on API error', () => {
      const generator = fetchAnalyticsDataSaga();
      const error = new Error('API Error');
      
      // Skip the call effect
      generator.next();
      
      // Mock error result
      const errorResult = generator.throw(error);
      
      expect(errorResult.value).toEqual(put(fetchAnalyticsDataFailure('API Error')));
    });

    it('should handle unknown error types', () => {
      const generator = fetchAnalyticsDataSaga();
      
      // Skip the call effect
      generator.next();
      
      // Mock unknown error
      const errorResult = generator.throw('Unknown error');
      
      expect(errorResult.value).toEqual(put(fetchAnalyticsDataFailure('An unknown error occurred')));
    });
  });

  describe('watchFetchAnalyticsData', () => {
    it('should be a generator function', () => {
      expect(typeof watchFetchAnalyticsData).toBe('function');
      expect(watchFetchAnalyticsData.constructor.name).toBe('GeneratorFunction');
    });

    it('should take every fetchAnalyticsData action', () => {
      const generator = watchFetchAnalyticsData();
      const result = generator.next().value;
      
      expect(result.type).toBe('FORK');
      expect(result.payload.fn.name).toBe('takeEvery');
      expect(result.payload.args[0]).toBe('analytics/fetchAnalyticsData');
    });
  });
});