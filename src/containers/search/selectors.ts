import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

const selectSelf = (state: RootState) => state.searchTracks;

export const selectSearchTracks = createSelector(selectSelf, (state) => state.items);
export const selectSearchTracksStatus = createSelector(selectSelf, (state) => state.status);
export const selectSearchTracksError = createSelector(selectSelf, (state) => state.error);
