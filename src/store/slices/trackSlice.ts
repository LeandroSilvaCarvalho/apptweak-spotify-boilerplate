import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Track, TrackState } from '../../types/track';

const initialState: TrackState = {
  tracks: [],
  loading: false,
  error: null,
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    fetchTracksStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTracksSuccess: (state, action: PayloadAction<Track[]>) => {
      state.loading = false;
      state.tracks = action.payload;
    },
    fetchTracksFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addTrack: (state, action: PayloadAction<Track>) => {
      state.tracks.push(action.payload);
    },
    removeTrack: (state, action: PayloadAction<string>) => {
      state.tracks = state.tracks.filter(track => track.id !== action.payload);
    },
  },
});

export const {
  fetchTracksStart,
  fetchTracksSuccess,
  fetchTracksFailure,
  addTrack,
  removeTrack,
} = trackSlice.actions;

export default trackSlice.reducer; 