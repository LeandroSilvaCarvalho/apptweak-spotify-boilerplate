import { createAction, createSlice } from "@reduxjs/toolkit";
import { ErrorPayload, RequestStatus } from "../../types/requests";
import { PlaylistedTrack, Track } from "@spotify/web-api-ts-sdk";

//export interface PlaylistTrack {
//  track: {
//    id: string;
//    name: string;
//    artists: { name: string }[];
//    album: { name: string; release_date: string; images: { url: string }[] };
//    duration_ms: number;
//  };
//}

export interface PlaylistTrack extends PlaylistedTrack {
  track: Track;
}

export interface PlaylistTracksState {
  items: PlaylistTrack[];
  status: RequestStatus;
  addingStatus?: RequestStatus;
  removingStatus?: RequestStatus;
  reorderingStatus?: RequestStatus;
  error?: string;
}

const initialState: PlaylistTracksState = {
  items: [],
  status: RequestStatus.IDLE
};

export const getPlaylistTracks = createAction<string>("playlistTracks/getPlaylistTracks");
export const getPlaylistTracksSuccess = createAction<PlaylistTrack[]>(
  "playlistTracks/getPlaylistTracksSuccess"
);
export const getPlaylistTracksFailed = createAction<ErrorPayload>(
  "playlistTracks/getPlaylistTracksFailed"
);

export const addTracksToPlaylist = createAction<{ playlistId: string; track: Track }>(
  "playlistTracks/addTracksToPlaylist"
);
export const addTracksToPlaylistSuccess = createAction<PlaylistTrack>(
  "playlistTracks/addTracksToPlaylistSuccess"
);
export const addTracksToPlaylistFailed = createAction<ErrorPayload>(
  "playlistTracks/addTracksToPlaylistFailed"
);

export const removeTrackFromPlaylist = createAction<{ playlistId: string; track: Track }>(
  "playlistTracks/removeTrackFromPlaylist"
);
export const removeTrackFromPlaylistSuccess = createAction<Track>(
  "playlistTracks/removeTrackFromPlaylistSuccess"
);
export const removeTrackFromPlaylistFailed = createAction<ErrorPayload>(
  "playlistTracks/removeTrackFromPlaylistFailed"
);
export const reorderTracks = createAction<{
  playlistId: string;
  rangeStart: number;
  insertBefore: number;
}>("playlistTracks/reorderTrack");

export const reorderTracksSuccess = createAction("playlistTracks/reoorderTracksSuccess");
export const reorderTracksFailed = createAction<ErrorPayload>("playlistTracks/reorderTracksFailed");

const playlistTracksSlice = createSlice({
  name: "playlistTracks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlaylistTracks, (state) => {
        state.status = RequestStatus.PENDING;
      })
      .addCase(getPlaylistTracksSuccess, (state, action) => {
        state.status = RequestStatus.SUCCESS;
        state.items = action.payload;
      })
      .addCase(getPlaylistTracksFailed, (state, action) => {
        state.status = RequestStatus.ERROR;
        state.error = action.payload.message;
      })
      .addCase(addTracksToPlaylist, (state) => {
        state.addingStatus = RequestStatus.PENDING;
      })
      .addCase(addTracksToPlaylistSuccess, (state, action) => {
        state.addingStatus = RequestStatus.SUCCESS;
        state.items.push(action.payload);
      })
      .addCase(addTracksToPlaylistFailed, (state, action) => {
        state.addingStatus = RequestStatus.ERROR;
        state.error = action.payload.message;
      })
      .addCase(removeTrackFromPlaylist, (state) => {
        state.removingStatus = RequestStatus.PENDING;
      })
      .addCase(removeTrackFromPlaylistSuccess, (state, action) => {
        state.removingStatus = RequestStatus.SUCCESS;
        state.items = state.items.filter((item) => item.track.id !== action.payload.id);
      })
      .addCase(removeTrackFromPlaylistFailed, (state, action) => {
        state.removingStatus = RequestStatus.ERROR;
        state.error = action.payload.message;
      })
      .addCase(reorderTracks, (state) => {
        state.reorderingStatus = RequestStatus.PENDING;
      })
      .addCase(reorderTracksSuccess, (state) => {
        state.reorderingStatus = RequestStatus.SUCCESS;
      })
      .addCase(reorderTracksFailed, (state, action) => {
        state.reorderingStatus = RequestStatus.ERROR;
        state.error = action.payload.message;
      });
  }
});

export default playlistTracksSlice.reducer;
