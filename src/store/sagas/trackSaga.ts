import { takeLatest, put, call } from 'redux-saga/effects';
import {
  fetchTracksStart,
  fetchTracksSuccess,
  fetchTracksFailure,
} from '../slices/trackSlice';
import { Track } from '../../types/track';

// Mock API call - replace with your actual API call
const fetchTracksAPI = async (): Promise<Track[]> => {
  // Replace this with your actual API call
  return [];
};

function* fetchTracksSaga(): Generator<any, void, Track[]> {
  try {
    yield put(fetchTracksStart());
    const tracks = yield call(fetchTracksAPI);
    yield put(fetchTracksSuccess(tracks));
  } catch (error) {
    yield put(fetchTracksFailure(error instanceof Error ? error.message : 'An error occurred'));
  }
}

export function* watchTrackSaga(): Generator<any, void, any> {
  yield takeLatest('tracks/fetchTracksStart', fetchTracksSaga);
} 