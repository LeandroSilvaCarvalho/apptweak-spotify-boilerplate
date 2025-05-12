import { combineReducers } from "redux";

import authentication from "../containers/auth/slice";
import playlists from "../containers/playlists/slice";
import playlistTracks from "../containers/playlistTracks/slice";
import searchTracks from "../containers/search/slice";
import theme from "../containers/theme/slice";

const rootReducer = combineReducers({
  authentication,
  playlists,
  playlistTracks,
  searchTracks,
  theme
});

export default rootReducer;
