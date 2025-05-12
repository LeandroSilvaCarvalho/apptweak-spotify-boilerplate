import { createAction, createSlice } from "@reduxjs/toolkit";
import { ErrorPayload, RequestStatus } from "../../types/requests";

export interface Playlist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  tracks: {
    href: string;
    total: number;
  };
}

export interface PlaylistsState {
  items: Playlist[];
  status: RequestStatus;
  error?: string;
  selectedPlaylist?: Playlist;
}

const initialState: PlaylistsState = {
  items: [],
  status: RequestStatus.IDLE
};

export const getPlaylists = createAction("playlists/getPlaylists");
export const getPlaylistsSuccess = createAction<Playlist[]>("playlists/getPlaylistsSuccess");
export const getPlaylistsFailed = createAction<ErrorPayload>("playlists/getPlaylistsFailed");
export const setSelectedPlaylist = createAction<Playlist | undefined>(
  "playlists/setSelectedPlaylist"
);

export const createPlaylist = createAction<{ name: string; description?: string }>(
  "playlists/createPlaylist"
);
export const createPlaylistSuccess = createAction<Playlist>("playlists/createPlaylistSuccess");
export const createPlaylistFailed = createAction<ErrorPayload>("playlists/createPlaylistFailed");

const playlistsSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlaylists, (state) => {
        state.status = RequestStatus.PENDING;
      })
      .addCase(getPlaylistsSuccess, (state, action) => {
        state.status = RequestStatus.SUCCESS;
        state.items = action.payload;
      })
      .addCase(getPlaylistsFailed, (state, action) => {
        state.status = RequestStatus.ERROR;
        state.error = action.payload.message;
      })

      .addCase(setSelectedPlaylist, (state, action) => {
        state.selectedPlaylist = action.payload;
      })
      .addCase(createPlaylist, (state) => {
        state.status = RequestStatus.PENDING;
      })
      .addCase(createPlaylistSuccess, (state, action) => {
        state.status = RequestStatus.SUCCESS;
        state.items.push(action.payload);
      })
      .addCase(createPlaylistFailed, (state, action) => {
        state.status = RequestStatus.ERROR;
        state.error = action.payload.message;
      });
  }
});

export default playlistsSlice.reducer;
