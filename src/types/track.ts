export interface Artist {
  id: string;
  name: string;
}

export interface Album {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  release_date: string;
}

export interface Track {
  id: string;
  name: string;
  artists: Artist[];
  album: Album;
}

export interface TrackState {
  tracks: Track[];
  loading: boolean;
  error: string | null;
} 