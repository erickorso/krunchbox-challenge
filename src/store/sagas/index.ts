import { all, fork } from 'redux-saga/effects';
import { watchFetchAnalyticsData } from './analyticsSaga';

export default function* rootSaga() {
  yield all([
    fork(watchFetchAnalyticsData),
  ]);
}
