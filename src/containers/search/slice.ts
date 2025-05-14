import { createAction, createSlice } from "@reduxjs/toolkit";
import { ErrorPayload, RequestStatus } from "../../types/requests";
import { Track } from "../../types/track";

export interface SearchTrack {
  items: Track[];
}

export interface SearchState {
  query: string;
  items: SearchTrack;
  status: RequestStatus;
  error: string;
}

const initialState: SearchState = {
  query: "",
  items: { items: [] },
  status: RequestStatus.IDLE,
  error: ""
};

export const searchTracks = createAction<string>("search/searchTracks");
export const searchTracksSuccess = createAction<SearchTrack>("search/searchTracksSuccess");
export const searchTracksFailed = createAction<ErrorPayload>("search/searchTracksFailed");

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchTracks, (state) => {
        state.status = RequestStatus.PENDING;
      })
      .addCase(searchTracksSuccess, (state, action) => {
        state.status = RequestStatus.SUCCESS;
        state.items = action.payload;
      })
      .addCase(searchTracksFailed, (state, action) => {
        state.status = RequestStatus.ERROR;
        state.error = action.payload.message;
      });
  }
});

export default searchSlice.reducer;
