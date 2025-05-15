import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { RequestStatus } from "../../types/requests";

const selectSelf = (state: RootState) => state.playlistTracks.byPlaylistId;

export const selectPlaylistTracks = (playlistId?: string) =>
  createSelector(selectSelf, (byPlaylistId) => byPlaylistId[playlistId ?? "-1"]?.items ?? []);

export const selectPlaylistTracksStatus = (playlistId?: string) =>
  createSelector(
    selectSelf,
    (byPlaylistId) => byPlaylistId[playlistId ?? "-1"]?.status ?? RequestStatus.IDLE
  );

export const selectPlaylistTracksLastFetched = (playlistId?: string) =>
  createSelector(selectSelf, (byPlaylistId) => byPlaylistId[playlistId ?? "-1"]?.lastFetched ?? 0);
