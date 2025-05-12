import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

const selectSelf = (state: RootState) => state.playlistTracks;

export const selectPlaylistTracks = createSelector(selectSelf, (state) => state.items);
export const selectPlaylistTracksStatus = createSelector(selectSelf, (state) => state.status);
export const selectPlaylistTracksAddingStatus = createSelector(
  selectSelf,
  (state) => state.addingStatus
);
