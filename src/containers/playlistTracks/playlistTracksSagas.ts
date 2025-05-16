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
  reorderTracks,
  getPlaylistTracksStale
} from "./slice";
import { User } from "../auth/slice";
import { PlaylistTrack } from "../../types/playlist";
import { selectPlaylistTracksLastFetched } from "./selectors";
import { PLAYLIST_URL } from "../playlists/playlistsSagas";

const STALE_TIME = 1000 * 60 * 1; // 1 minute

function isDataStale(lastFetched: number): boolean {
  const now = new Date().getTime();
  return now - lastFetched > STALE_TIME;
}

function* getPlaylistTracksSaga(action: ReturnType<typeof getPlaylistTracks>) {
  const playlistId = action.payload;
  const accessToken: string = yield select(selectAccessToken);
  if (!accessToken) {
    yield put(getPlaylistTracksFailed({ playlistId, message: "No access token" }));
    return;
  }

  const lastFetched: number = yield select(selectPlaylistTracksLastFetched(playlistId));
  if (!isDataStale(lastFetched)) {
    yield put(getPlaylistTracksStale(playlistId));
    return;
  }

  try {
    const request = () =>
      axios.get(`${PLAYLIST_URL}/${playlistId}/tracks`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

    const { data } = yield call(request);
    yield put(
      getPlaylistTracksSuccess({
        playlistId,
        tracks: data.items,
        lastFetched: new Date().getTime()
      })
    );
  } catch (error: any) {
    yield put(getPlaylistTracksFailed({ playlistId, message: error.message }));
  }
}

function* addTracksToPlaylistSaga(action: ReturnType<typeof addTracksToPlaylist>) {
  const { playlistId, track } = action.payload;
  const accessToken: string = yield select(selectAccessToken);
  if (!accessToken) {
    yield put(addTracksToPlaylistFailed({ playlistId, message: "No access token" }));
    return;
  }

  try {
    const request = () =>
      axios.post(
        `${PLAYLIST_URL}/${playlistId}/tracks`,
        {
          uris: [track.uri]
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
      track
    };

    if (status === 201) {
      yield put(
        addTracksToPlaylistSuccess({
          playlistId,
          playlistTrack,
          lastFetched: new Date().getTime()
        })
      );
    }
  } catch (error: any) {
    yield put(addTracksToPlaylistFailed({ playlistId, message: error.message }));
  }
}

function* removeTrackFromPlaylistSaga(action: ReturnType<typeof removeTrackFromPlaylist>) {
  const { playlistId, track } = action.payload;
  const accessToken: string = yield select(selectAccessToken);
  if (!accessToken) {
    yield put(removeTrackFromPlaylistFailed({ playlistId, message: "No access token" }));
    return;
  }

  try {
    const request = () =>
      axios.delete(`${PLAYLIST_URL}/${playlistId}/tracks`, {
        data: {
          tracks: [{ uri: track.uri }]
        },
        headers: { Authorization: `Bearer ${accessToken}` }
      });

    const { status } = yield call(request);

    if (status === 200) {
      yield put(removeTrackFromPlaylistSuccess({ playlistId, trackId: track.id }));
    }
  } catch (error: any) {
    yield put(removeTrackFromPlaylistFailed({ playlistId, message: error.message }));
  }
}

function* reorderTracksSaga(action: ReturnType<typeof reorderTracks>) {
  const { playlistId, rangeStart, insertBefore } = action.payload;
  const accessToken: string = yield select(selectAccessToken);
  if (!accessToken) {
    yield put(reorderTracksFailed({ playlistId, message: "No access token" }));
    return;
  }

  try {
    const request = () =>
      axios.put(
        `${PLAYLIST_URL}/${playlistId}/tracks`,
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
      yield put(reorderTracksSuccess({ playlistId, rangeStart, insertBefore }));
    }
  } catch (error: any) {
    yield put(reorderTracksFailed({ playlistId, message: error.message }));
  }
}

export default function* playlistTracksSaga() {
  yield takeLatest(getPlaylistTracks.type, getPlaylistTracksSaga);
  yield takeEvery(addTracksToPlaylist.type, addTracksToPlaylistSaga);
  yield takeEvery(removeTrackFromPlaylist.type, removeTrackFromPlaylistSaga);
  yield takeEvery(reorderTracks.type, reorderTracksSaga);
}
