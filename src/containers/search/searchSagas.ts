import { call, put, select, takeEvery } from "@redux-saga/core/effects";
import axios from "axios";
import { selectAccessToken } from "../auth/selectors";
import { searchTracks, searchTracksFailed, searchTracksSuccess } from "./slice";

function* getSearchSaga(action: ReturnType<typeof searchTracks>) {
  const accessToken: string = yield select(selectAccessToken);
  try {
    const request = () =>
      axios.get(`https://api.spotify.com/v1/search?q=${action.payload}&type=track&limit=10`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
    const { data } = yield call(request);

    yield put(searchTracksSuccess(data.tracks));
  } catch (error: any) {
    yield put(searchTracksFailed({ message: error.message }));
  }
}

export default function* searchSaga() {
  yield takeEvery(searchTracks.type, getSearchSaga);
}
