import { all } from "@redux-saga/core/effects";

import authSaga from "../containers/auth/authSagas";
import playlistsSaga from "../containers/playlists/playlistsSagas";
import playlistTracksSaga from "../containers/playlistTracks/playlistTracksSagas";
import searchSaga from "../containers/search/searchSagas";

export default function* rootSaga() {
  yield all([authSaga(), playlistsSaga(), playlistTracksSaga(), searchSaga()]);
}
