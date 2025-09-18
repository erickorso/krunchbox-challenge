import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchAnalyticsDataSuccess,
  fetchAnalyticsDataFailure,
} from '../slices/analyticsSlice';
import { AnalyticsData } from '@/types/data';

// API function
async function fetchAnalyticsDataAPI(): Promise<AnalyticsData> {
  const response = await fetch('/api/data');
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

// Worker saga
function* fetchAnalyticsDataSaga() {
  try {
    const data: AnalyticsData = yield call(fetchAnalyticsDataAPI);
    yield put(fetchAnalyticsDataSuccess(data));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    yield put(fetchAnalyticsDataFailure(errorMessage));
  }
}

// Watcher saga
export function* watchFetchAnalyticsData() {
  yield takeEvery('analytics/fetchAnalyticsData', fetchAnalyticsDataSaga);
}
