import { createAction, createSlice } from "@reduxjs/toolkit";
import { RequestStatus, RequestStatusType } from "../../types/requests";
import { Track } from "../../types/track";
import { PlaylistTrack } from "../../types/playlist";

const reorderTrackList = (list: PlaylistTrack[], rangeStart: number, insertBefore: number) => {
  if (rangeStart === insertBefore || rangeStart + 1 === insertBefore) {
    return list;
  }

  const item = list[rangeStart];
  const newList = [...list];
  newList.splice(rangeStart, 1);

  const adjustedIndex = rangeStart < insertBefore ? insertBefore - 1 : insertBefore;
  newList.splice(adjustedIndex, 0, item);

  return newList;
};

export interface PlaylistTracksState {
  byPlaylistId: Record<
    string,
    {
      items: PlaylistTrack[];
      status: RequestStatusType;
      addingStatus?: RequestStatusType;
      removingStatus?: RequestStatusType;
      reorderingStatus?: RequestStatusType;
      error?: string;
      lastFetched?: number;
    }
  >;
}

const initialState: PlaylistTracksState = {
  byPlaylistId: {}
};

export const getPlaylistTracks = createAction<string>("playlistTracks/getPlaylistTracks");
export const getPlaylistTracksSuccess = createAction<{
  playlistId: string;
  tracks: PlaylistTrack[];
  lastFetched: number;
}>("playlistTracks/getPlaylistTracksSuccess");
export const getPlaylistTracksFailed = createAction<{
  playlistId: string;
  message: string;
}>("playlistTracks/getPlaylistTracksFailed");

export const addTracksToPlaylist = createAction<{
  playlistId: string;
  track: Track;
}>("playlistTracks/addTracksToPlaylist");
export const addTracksToPlaylistSuccess = createAction<{
  playlistId: string;
  playlistTrack: PlaylistTrack;
  lastFetched: number;
}>("playlistTracks/addTracksToPlaylistSuccess");
export const addTracksToPlaylistFailed = createAction<{
  playlistId: string;
  message: string;
}>("playlistTracks/addTracksToPlaylistFailed");

export const removeTrackFromPlaylist = createAction<{
  playlistId: string;
  track: Track;
}>("playlistTracks/removeTrackFromPlaylist");
export const removeTrackFromPlaylistSuccess = createAction<{
  playlistId: string;
  trackId: string;
}>("playlistTracks/removeTrackFromPlaylistSuccess");
export const removeTrackFromPlaylistFailed = createAction<{
  playlistId: string;
  message: string;
}>("playlistTracks/removeTrackFromPlaylistFailed");

export const reorderTracks = createAction<{
  playlistId: string;
  rangeStart: number;
  insertBefore: number;
}>("playlistTracks/reorderTracks");
export const reorderTracksSuccess = createAction<{
  playlistId: string;
  rangeStart: number;
  insertBefore: number;
}>("playlistTracks/reorderTracksSuccess");
export const reorderTracksFailed = createAction<{
  playlistId: string;
  message: string;
}>("playlistTracks/reorderTracksFailed");

const playlistTracksSlice = createSlice({
  name: "playlistTracks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlaylistTracks, (state, action) => {
        const playlistId = action.payload;
        state.byPlaylistId[playlistId] = {
          ...(state.byPlaylistId[playlistId] || {
            items: []
          }),
          status: RequestStatus.PENDING
        };
      })
      .addCase(getPlaylistTracksSuccess, (state, action) => {
        const { playlistId, tracks, lastFetched } = action.payload;
        state.byPlaylistId[playlistId] = {
          ...(state.byPlaylistId[playlistId] || {}),
          items: tracks,
          status: RequestStatus.SUCCESS,
          lastFetched
        };
      })
      .addCase(getPlaylistTracksFailed, (state, action) => {
        const { playlistId, message } = action.payload;
        state.byPlaylistId[playlistId] = {
          ...(state.byPlaylistId[playlistId] || { items: [] }),
          status: RequestStatus.ERROR,
          error: message
        };
      })
      .addCase(addTracksToPlaylist, (state, action) => {
        const { playlistId } = action.payload;
        state.byPlaylistId[playlistId] = {
          ...(state.byPlaylistId[playlistId] || { items: [], status: RequestStatus.IDLE }),
          addingStatus: RequestStatus.PENDING
        };
      })
      .addCase(addTracksToPlaylistSuccess, (state, action) => {
        const { playlistId, playlistTrack, lastFetched } = action.payload;
        const entry = state.byPlaylistId[playlistId];
        if (entry) {
          entry.items.push(playlistTrack);
          entry.addingStatus = RequestStatus.SUCCESS;
          entry.lastFetched = lastFetched;
        }
      })
      .addCase(addTracksToPlaylistFailed, (state, action) => {
        const { playlistId, message } = action.payload;
        const entry = state.byPlaylistId[playlistId];
        if (entry) {
          entry.addingStatus = RequestStatus.ERROR;
          entry.error = message;
        }
      })
      .addCase(removeTrackFromPlaylist, (state, action) => {
        const { playlistId } = action.payload;
        const entry = state.byPlaylistId[playlistId];
        if (entry) {
          entry.removingStatus = RequestStatus.PENDING;
        }
      })
      .addCase(removeTrackFromPlaylistSuccess, (state, action) => {
        const { playlistId, trackId } = action.payload;
        const entry = state.byPlaylistId[playlistId];
        if (entry) {
          entry.items = entry.items.filter((item) => item.track.id !== trackId);
          entry.removingStatus = RequestStatus.SUCCESS;
        }
      })
      .addCase(removeTrackFromPlaylistFailed, (state, action) => {
        const { playlistId, message } = action.payload;
        const entry = state.byPlaylistId[playlistId];
        if (entry) {
          entry.removingStatus = RequestStatus.ERROR;
          entry.error = message;
        }
      })
      .addCase(reorderTracks, (state, action) => {
        const { playlistId } = action.payload;
        const entry = state.byPlaylistId[playlistId];
        if (entry) {
          entry.reorderingStatus = RequestStatus.PENDING;
        }
      })
      .addCase(reorderTracksSuccess, (state, action) => {
        const { playlistId } = action.payload;
        const entry = state.byPlaylistId[playlistId];
        if (entry) {
          entry.items = reorderTrackList(
            entry.items,
            action.payload.rangeStart,
            action.payload.insertBefore
          );
          entry.reorderingStatus = RequestStatus.SUCCESS;
        }
      })
      .addCase(reorderTracksFailed, (state, action) => {
        const { playlistId, message } = action.payload;
        const entry = state.byPlaylistId[playlistId];
        if (entry) {
          entry.reorderingStatus = RequestStatus.ERROR;
          entry.error = message;
        }
      });
  }
});

export default playlistTracksSlice.reducer;
