import { call, put, select, takeEvery } from "@redux-saga/core/effects";
import axios from "axios";
import { selectAccessToken, selectUser } from "../auth/selectors";
import {
  createPlaylist,
  createPlaylistFailed,
  createPlaylistSuccess,
  deletePlaylist,
  deletePlaylistFailed,
  deletePlaylistSuccess,
  getPlaylists,
  getPlaylistsFailed,
  getPlaylistsSuccess,
  setSelectedPlaylist,
  updatePlaylist,
  updatePlaylistFailed,
  updatePlaylistSuccess
} from "./slice";
import { User } from "../auth/slice";
import { RootState } from "../../store/store";
import { Playlist } from "../../types/playlist";
import { getPlaylistTracks } from "../playlistTracks/slice";

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
    yield put(getPlaylistTracks(data.id));
  } catch (error: any) {
    yield put(createPlaylistFailed({ message: error.message }));
  }
}

function* updatePlaylistsSaga(action: ReturnType<typeof updatePlaylist>) {
  const { playlistId, name, description } = action.payload;
  const accessToken: string = yield select(selectAccessToken);
  if (!accessToken) {
    yield put(updatePlaylistFailed({ message: "No access token" }));
    return;
  }

  const user: User = yield select(selectUser);

  if (!user) {
    yield put(createPlaylistFailed({ message: "No user" }));
    return;
  }

  try {
    const body = {
      name,
      description
    };

    const request = () =>
      axios.put("https://api.spotify.com/v1/playlists/" + playlistId, body, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
    const { status } = yield call(request);

    if (status === 200) {
      yield put(updatePlaylistSuccess(action.payload));
      const playlist: Playlist = yield select((state: RootState) =>
        state.playlists.items.find((item) => item.id === playlistId)
      );
      yield put(setSelectedPlaylist(playlist));
    }
  } catch (error: any) {
    yield put(updatePlaylistFailed({ message: error.message }));
  }
}

function* deletePlaylistsSaga(action: ReturnType<typeof deletePlaylist>) {
  const { playlistId } = action.payload;
  const accessToken: string = yield select(selectAccessToken);
  if (!accessToken) {
    yield put(deletePlaylistFailed({ message: "No access token" }));
    return;
  }

  try {
    const request = () =>
      axios.delete(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
    const { status } = yield call(request);

    if (status === 200) {
      yield put(deletePlaylistSuccess(action.payload));
    }
  } catch (error: any) {
    yield put(deletePlaylistFailed({ message: error.message }));
  }
}

export default function* playlistsSaga() {
  yield takeEvery(getPlaylists.type, getPlaylistsSaga);
  yield takeEvery(createPlaylist.type, createPlaylistsSaga);
  yield takeEvery(updatePlaylist.type, updatePlaylistsSaga);
  yield takeEvery(deletePlaylist.type, deletePlaylistsSaga);
}
