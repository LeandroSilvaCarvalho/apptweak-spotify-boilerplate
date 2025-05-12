import { call, put, select, takeEvery } from "@redux-saga/core/effects";
import axios from "axios";
import { selectAccessToken, selectUser } from "../auth/selectors";
import {
  createPlaylist,
  createPlaylistFailed,
  createPlaylistSuccess,
  getPlaylists,
  getPlaylistsFailed,
  getPlaylistsSuccess,
  setSelectedPlaylist
} from "./slice";
import { User } from "../auth/slice";

function* getPlaylistsSaga() {
  const accessToken: string = yield select(selectAccessToken);
  if (!accessToken) {
    yield put(getPlaylistsFailed({ message: "No access token" }));
    return;
  }

  try {
    const request = () =>
      axios.get("https://api.spotify.com/v1/me/playlists", {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
    const { data } = yield call(request);

    yield put(getPlaylistsSuccess(data.items));
  } catch (error: any) {
    yield put(getPlaylistsFailed({ message: error.message }));
  }
}

function* createPlaylistsSaga(action: ReturnType<typeof createPlaylist>) {
  const accessToken: string = yield select(selectAccessToken);
  if (!accessToken) {
    yield put(createPlaylistFailed({ message: "No access token" }));
    return;
  }

  const user: User = yield select(selectUser);

  if (!user) {
    yield put(createPlaylistFailed({ message: "No user" }));
    return;
  }

  try {
    const request = () =>
      axios.post(
        "https://api.spotify.com/v1/users/" + user.userId + "/playlists",
        {
          name: action.payload.name,
          description: action.payload.description
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` }
        }
      );
    const { data } = yield call(request);

    yield put(createPlaylistSuccess(data));
    yield put(setSelectedPlaylist(data));
  } catch (error: any) {
    yield put(createPlaylistFailed({ message: error.message }));
  }
}

export default function* playlistsSaga() {
  yield takeEvery(getPlaylists.type, getPlaylistsSaga);
  yield takeEvery(createPlaylist.type, createPlaylistsSaga);
}
