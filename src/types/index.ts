// ============================================================
// Music Client — Types
// ============================================================

export interface Track {
  _id: string;
  title: string;
  artist: string;
  albumArtist: string;
  album: string;
  genre: string;
  year: number | null;
  trackNumber: number | null;
  discNumber: number | null;
  durationSeconds: number;
  filePath: string;
  fileSize: number;
  format: string;
  bitrate: number | null;
  sampleRate: number | null;
  channels: number | null;
  coverArtPath: string | null;
  addedAt: string;
  modifiedAt: string;
}

export interface Album {
  _id: string;
  title: string;
  artist: string;
  year: number | null;
  genre: string;
  trackCount: number;
  coverArtPath: string | null;
  addedAt: string;
}

export interface Artist {
  _id: string;
  name: string;
  albumCount: number;
  trackCount: number;
  addedAt: string;
}

export interface Playlist {
  _id: string;
  name: string;
  description: string;
  trackIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
}
