import { combineReducers } from "redux";

import authentication from "../containers/auth/slice";
import playlists from "../containers/playlists/slice";
import playlistTracks from "../containers/playlistTracks/slice";
import searchTracks from "../containers/search/slice";

const rootReducer = combineReducers({
  authentication,
  playlists,
  playlistTracks,
  searchTracks
});

export default rootReducer;
