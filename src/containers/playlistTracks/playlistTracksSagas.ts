import { call, put, select, takeEvery, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";
import { selectAccessToken, selectUser } from "../auth/selectors";
import {
  addTracksToPlaylist,
  addTracksToPlaylistFailed,
  addTracksToPlaylistSuccess,
  getPlaylistTracks,
  getPlaylistTracksFailed,
  getPlaylistTracksSuccess,
  removeTrackFromPlaylist,
  removeTrackFromPlaylistFailed,
  removeTrackFromPlaylistSuccess,
  reorderTracksFailed,
  reorderTracksSuccess,
  reorderTracks
} from "./slice";
import { User } from "../auth/slice";
import { PlaylistTrack } from "../../types/playlist";

function* getPlaylistTracksSaga(action: ReturnType<typeof getPlaylistTracks>) {
  const accessToken: string = yield select(selectAccessToken);
  if (!accessToken) {
    yield put(getPlaylistTracksFailed({ message: "No access token" }));
    return;
  }

  try {
    const request = () =>
      axios.get(`https://api.spotify.com/v1/playlists/${action.payload}/tracks`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
    const { data } = yield call(request);
    yield put(getPlaylistTracksSuccess(data.items));
  } catch (error: any) {
    yield put(getPlaylistTracksFailed({ message: error.message }));
  }
}

function* addTracksToPlaylistSaga(action: ReturnType<typeof addTracksToPlaylist>) {
  const accessToken: string = yield select(selectAccessToken);
  if (!accessToken) {
    yield put(addTracksToPlaylistFailed({ message: "No access token" }));
    return;
  }

  try {
    const request = () =>
      axios.post(
        `https://api.spotify.com/v1/playlists/${action.payload.playlistId}/tracks`,
        {
          uris: [action.payload.track.uri]
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` }
        }
      );

    const { status } = yield call(request);
    const user: User = yield select(selectUser);

    const playlistTrack: PlaylistTrack = {
      added_at: new Date().toISOString(),
      added_by: {
        id: user.userId,
        external_urls: user.externalUrls,
        href: user.href,
        type: user.type,
        uri: user.uri
      },
      is_local: false,
      primary_color: "",
      track: action.payload.track
    };
    if (status === 201) {
      yield put(addTracksToPlaylistSuccess(playlistTrack));
    }
  } catch (error: any) {
    yield put(addTracksToPlaylistFailed({ message: error.message }));
  }
}

function* remoreTrackFromPlaylistSaga(action: ReturnType<typeof addTracksToPlaylist>) {
  const accessToken: string = yield select(selectAccessToken);
  if (!accessToken) {
    yield put(removeTrackFromPlaylistFailed({ message: "No access token" }));
    return;
  }

  try {
    const request = () =>
      axios.delete(`https://api.spotify.com/v1/playlists/${action.payload.playlistId}/tracks`, {
        data: {
          tracks: [
            {
              uri: action.payload.track.uri
            }
          ]
        },
        headers: { Authorization: `Bearer ${accessToken}` }
      });

    const { status } = yield call(request);

    if (status === 200) {
      yield put(removeTrackFromPlaylistSuccess(action.payload.track));
    }
  } catch (error: any) {
    yield put(removeTrackFromPlaylistFailed({ message: error.message }));
  }
}

function* reorderTracksSaga(action: ReturnType<typeof reorderTracks>) {
  const accessToken: string = yield select(selectAccessToken);
  if (!accessToken) {
    yield put(reorderTracksFailed({ message: "No access token" }));
    return;
  }

  let rangeStart = action.payload.rangeStart;
  let insertBefore = action.payload.insertBefore;

  try {
    const request = () =>
      axios.put(
        `https://api.spotify.com/v1/playlists/${action.payload.playlistId}/tracks`,
        {
          range_start: rangeStart,
          insert_before: insertBefore,
          range_length: 1
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` }
        }
      );

    const { status } = yield call(request);

    if (status === 200) {
      yield put(reorderTracksSuccess());
    }
  } catch (error: any) {
    yield put(reorderTracksFailed({ message: error.message }));
  }
}

export default function* playlistTracksSaga() {
  yield takeLatest(getPlaylistTracks.type, getPlaylistTracksSaga);
  yield takeEvery(addTracksToPlaylist.type, addTracksToPlaylistSaga);
  yield takeEvery(removeTrackFromPlaylist.type, remoreTrackFromPlaylistSaga);
  yield takeEvery(reorderTracks.type, reorderTracksSaga);
}
