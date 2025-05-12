import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

const selectSelf = (state: RootState) => state.playlists;

export const selectPlaylists = createSelector(selectSelf, (state) => state.items);
export const selectPlaylistsStatus = createSelector(selectSelf, (state) => state.status);
export const selectSelectedPlaylist = createSelector(selectSelf, (state) => state.selectedPlaylist);
