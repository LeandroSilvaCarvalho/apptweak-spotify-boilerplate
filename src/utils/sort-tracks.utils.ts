import { PlaylistTrack } from "../types/playlist";

export type SortKey = string | undefined;
export type SortOrder = "asc" | "desc" | undefined;
export const sortTracks = (key: SortKey, sortOrder: SortOrder, playlistTracks: PlaylistTrack[]) => {
  const sorted = [...playlistTracks].sort((a, b) => {
    let aVal: any, bVal: any;

    switch (key) {
      case "title":
        aVal = a.track.name.toLowerCase();
        bVal = b.track.name.toLowerCase();
        break;
      case "album":
        aVal = a.track.album.name.toLowerCase();
        bVal = b.track.album.name.toLowerCase();
        break;
      case "releaseDate":
        aVal = new Date(a.track.album.release_date).getTime();
        bVal = new Date(b.track.album.release_date).getTime();
        break;
      case "duration":
        aVal = a.track.duration_ms;
        bVal = b.track.duration_ms;
        break;
      default:
        return 0;
    }

    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
  return sorted;
};
