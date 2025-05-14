import { PlaylistedTrack, Playlist as SpotifyPlaylist } from "@spotify/web-api-ts-sdk";
import { Track } from "./track";

export interface Playlist extends SpotifyPlaylist {}

export interface PlaylistTrack extends PlaylistedTrack {
  track: Track;
}
