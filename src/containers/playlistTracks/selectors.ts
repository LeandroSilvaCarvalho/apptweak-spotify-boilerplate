import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { RequestStatus } from "../../types/requests";

const selectSelf = (state: RootState) => state.playlistTracks.byPlaylistId;

export const selectPlaylistTracks = (playlistId?: string) =>
  createSelector(selectSelf, (byPlaylistId) =>
    playlistId ? byPlaylistId[playlistId]?.items ?? [] : []
  );

export const selectPlaylistTracksStatus = (playlistId?: string) =>
  createSelector(selectSelf, (byPlaylistId) =>
    playlistId ? byPlaylistId[playlistId]?.status ?? RequestStatus.IDLE : RequestStatus.IDLE
  );

export const selectPlaylistTracksLastFetched = (playlistId?: string) =>
  createSelector(selectSelf, (byPlaylistId) =>
    playlistId ? byPlaylistId[playlistId]?.lastFetched ?? 0 : 0
  );
