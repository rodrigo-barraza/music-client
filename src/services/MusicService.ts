// ============================================================
// Music Service — API Client
// ============================================================

import type {
  Track,
  Album,
  Artist,
  Playlist,
  PaginatedResponse,
} from "@/types";
import { MUSIC_SERVICE_URL } from "@/config";

async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${MUSIC_SERVICE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// ── Library ──────────────────────────────────────────────────

export async function browseTracks(params?: {
  sort?: string;
  search?: string;
  artist?: string;
  album?: string;
  genre?: string;
  limit?: number;
  offset?: number;
}): Promise<PaginatedResponse<Track>> {
  const searchParams = new URLSearchParams();
  if (params?.sort) searchParams.set("sort", params.sort);
  if (params?.search) searchParams.set("search", params.search);
  if (params?.artist) searchParams.set("artist", params.artist);
  if (params?.album) searchParams.set("album", params.album);
  if (params?.genre) searchParams.set("genre", params.genre);
  if (params?.limit) searchParams.set("limit", params.limit.toString());
  if (params?.offset) searchParams.set("offset", params.offset.toString());

  const query = searchParams.toString();
  return apiRequest(`/library/tracks${query ? `?${query}` : ""}`);
}

export async function getTrack(trackId: string): Promise<Track> {
  return apiRequest(`/library/tracks/${trackId}`);
}

export async function getAlbums(params?: {
  search?: string;
  artist?: string;
  limit?: number;
  offset?: number;
}): Promise<PaginatedResponse<Album>> {
  const searchParams = new URLSearchParams();
  if (params?.search) searchParams.set("search", params.search);
  if (params?.artist) searchParams.set("artist", params.artist);
  if (params?.limit) searchParams.set("limit", params.limit.toString());
  if (params?.offset) searchParams.set("offset", params.offset.toString());

  const query = searchParams.toString();
  return apiRequest(`/library/albums${query ? `?${query}` : ""}`);
}

export async function getAlbumTracks(
  albumTitle: string,
  albumArtist: string,
): Promise<{ items: Track[] }> {
  return apiRequest(
    `/library/albums/${encodeURIComponent(albumTitle)}/${encodeURIComponent(albumArtist)}`,
  );
}

export async function getArtists(params?: {
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<PaginatedResponse<Artist>> {
  const searchParams = new URLSearchParams();
  if (params?.search) searchParams.set("search", params.search);
  if (params?.limit) searchParams.set("limit", params.limit.toString());
  if (params?.offset) searchParams.set("offset", params.offset.toString());

  const query = searchParams.toString();
  return apiRequest(`/library/artists${query ? `?${query}` : ""}`);
}

export async function getGenres(): Promise<{ items: string[] }> {
  return apiRequest("/library/genres");
}

export async function getLibraryStats(): Promise<{
  trackCount: number;
  albumCount: number;
  artistCount: number;
  totalDurationSeconds: number;
}> {
  return apiRequest("/library/stats");
}

// ── Streaming ────────────────────────────────────────────────

export function getStreamUrl(trackId: string): string {
  return `${MUSIC_SERVICE_URL}/media/stream/${trackId}`;
}

// ── Playlists ────────────────────────────────────────────────

export async function getPlaylists(): Promise<{ items: Playlist[] }> {
  return apiRequest("/playlists");
}

export async function getPlaylist(playlistId: string): Promise<Playlist> {
  return apiRequest(`/playlists/${playlistId}`);
}

export async function createPlaylist(
  name: string,
  description?: string,
): Promise<Playlist> {
  return apiRequest("/playlists", {
    method: "POST",
    body: JSON.stringify({ name, description }),
  });
}

export async function addTrackToPlaylist(
  playlistId: string,
  trackId: string,
): Promise<void> {
  await apiRequest(`/playlists/${playlistId}/tracks`, {
    method: "POST",
    body: JSON.stringify({ trackId }),
  });
}

export async function removeTrackFromPlaylist(
  playlistId: string,
  trackId: string,
): Promise<void> {
  await apiRequest(`/playlists/${playlistId}/tracks/${trackId}`, {
    method: "DELETE",
  });
}

// ── Favorites ────────────────────────────────────────────────

export async function getFavorites(
  limit: number = 50,
): Promise<{ items: Track[]; total: number }> {
  return apiRequest(`/favorites?limit=${limit}`);
}

export async function addFavorite(trackId: string): Promise<void> {
  await apiRequest("/favorites", {
    method: "POST",
    body: JSON.stringify({ trackId }),
  });
}

export async function removeFavorite(trackId: string): Promise<void> {
  await apiRequest(`/favorites/${trackId}`, { method: "DELETE" });
}

export async function isFavorite(
  trackId: string,
): Promise<{ isFavorite: boolean }> {
  return apiRequest(`/favorites/${trackId}`);
}
