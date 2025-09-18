import { runSaga } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchAnalyticsDataSaga, watchFetchAnalyticsData, fetchAnalyticsDataAPI } from '../analyticsSaga';
import {
  fetchAnalyticsDataSuccess,
  fetchAnalyticsDataFailure,
} from '../../slices/analyticsSlice';
import { AnalyticsData } from '@/types/data';

// Mock the API function
jest.mock('../analyticsSaga', () => {
  const originalModule = jest.requireActual('../analyticsSaga');
  return {
    ...originalModule,
    fetchAnalyticsDataAPI: jest.fn(),
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
    it('should fetch analytics data successfully', async () => {
      const mockFetchAnalyticsDataAPI = fetchAnalyticsDataAPI as jest.MockedFunction<typeof fetchAnalyticsDataAPI>;
      mockFetchAnalyticsDataAPI.mockResolvedValue(mockAnalyticsData);

      const dispatched: any[] = [];

      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        fetchAnalyticsDataSaga
      ).toPromise();

      expect(mockFetchAnalyticsDataAPI).toHaveBeenCalledTimes(1);
      expect(dispatched).toHaveLength(1);
      expect(dispatched[0]).toEqual(fetchAnalyticsDataSuccess(mockAnalyticsData));
    });

    it('should handle fetch analytics data failure', async () => {
      const mockFetchAnalyticsDataAPI = fetchAnalyticsDataAPI as jest.MockedFunction<typeof fetchAnalyticsDataAPI>;
      const errorMessage = 'Network error';
      mockFetchAnalyticsDataAPI.mockRejectedValue(new Error(errorMessage));

      const dispatched: any[] = [];

      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        fetchAnalyticsDataSaga
      ).toPromise();

      expect(mockFetchAnalyticsDataAPI).toHaveBeenCalledTimes(1);
      expect(dispatched).toHaveLength(1);
      expect(dispatched[0]).toEqual(fetchAnalyticsDataFailure(errorMessage));
    });

    it('should handle unknown error', async () => {
      const mockFetchAnalyticsDataAPI = fetchAnalyticsDataAPI as jest.MockedFunction<typeof fetchAnalyticsDataAPI>;
      mockFetchAnalyticsDataAPI.mockRejectedValue('Unknown error');

      const dispatched: any[] = [];

      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
        },
        fetchAnalyticsDataSaga
      ).toPromise();

      expect(mockFetchAnalyticsDataAPI).toHaveBeenCalledTimes(1);
      expect(dispatched).toHaveLength(1);
      expect(dispatched[0]).toEqual(fetchAnalyticsDataFailure('An unknown error occurred'));
    });
  });

  describe('watchFetchAnalyticsData', () => {
    it('should take every fetchAnalyticsData action', () => {
      const generator = watchFetchAnalyticsData();
      
      expect(generator.next().value).toEqual(
        takeEvery('analytics/fetchAnalyticsData', fetchAnalyticsDataSaga)
      );
    });
  });
});
