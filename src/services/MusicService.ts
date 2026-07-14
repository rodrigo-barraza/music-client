// ============================================================
// Music Service — API Client
// ============================================================

import { createApiClient } from "@rodrigo-barraza/utilities-library";
import type {
  Track,
  Album,
  Artist,
  Playlist,
  PaginatedResponse,
} from "@/types";
import { MUSIC_SERVICE_URL } from "@/config";

const api = createApiClient(MUSIC_SERVICE_URL ?? "");

// ── Library ──────────────────────────────────────────────────

export async function browseTracks(parameters?: {
  sort?: string;
  search?: string;
  artist?: string;
  album?: string;
  genre?: string;
  limit?: number;
  offset?: number;
}): Promise<PaginatedResponse<Track>> {
  const searchParams = new URLSearchParams();
  if (parameters?.sort) searchParams.set("sort", parameters.sort);
  if (parameters?.search) searchParams.set("search", parameters.search);
  if (parameters?.artist) searchParams.set("artist", parameters.artist);
  if (parameters?.album) searchParams.set("album", parameters.album);
  if (parameters?.genre) searchParams.set("genre", parameters.genre);
  if (parameters?.limit) searchParams.set("limit", parameters.limit.toString());
  if (parameters?.offset) searchParams.set("offset", parameters.offset.toString());

  const query = searchParams.toString();
  return api.get(`/library/tracks${query ? `?${query}` : ""}`);
}

export async function getTrack(trackId: string): Promise<Track> {
  return api.get(`/library/tracks/${trackId}`);
}

export async function getAlbums(parameters?: {
  search?: string;
  artist?: string;
  limit?: number;
  offset?: number;
}): Promise<PaginatedResponse<Album>> {
  const searchParams = new URLSearchParams();
  if (parameters?.search) searchParams.set("search", parameters.search);
  if (parameters?.artist) searchParams.set("artist", parameters.artist);
  if (parameters?.limit) searchParams.set("limit", parameters.limit.toString());
  if (parameters?.offset) searchParams.set("offset", parameters.offset.toString());

  const query = searchParams.toString();
  return api.get(`/library/albums${query ? `?${query}` : ""}`);
}

export async function getAlbumTracks(
  albumTitle: string,
  albumArtist: string,
): Promise<{ items: Track[] }> {
  return api.get(
    `/library/albums/${encodeURIComponent(albumTitle)}/${encodeURIComponent(albumArtist)}`,
  );
}

export async function getArtists(parameters?: {
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<PaginatedResponse<Artist>> {
  const searchParams = new URLSearchParams();
  if (parameters?.search) searchParams.set("search", parameters.search);
  if (parameters?.limit) searchParams.set("limit", parameters.limit.toString());
  if (parameters?.offset) searchParams.set("offset", parameters.offset.toString());

  const query = searchParams.toString();
  return api.get(`/library/artists${query ? `?${query}` : ""}`);
}

export async function getGenres(): Promise<{ items: string[] }> {
  return api.get("/library/genres");
}

export async function getLibraryStats(): Promise<{
  trackCount: number;
  albumCount: number;
  artistCount: number;
  totalDurationSeconds: number;
}> {
  return api.get("/library/stats");
}

// ── Streaming ────────────────────────────────────────────────
// Hand-rolled URL builder: consumed directly by <audio src>, so it
// must stay a plain URL string — not a JSON API call.

export function getStreamUrl(trackId: string): string {
  return `${MUSIC_SERVICE_URL}/media/stream/${trackId}`;
}

// ── Playlists ────────────────────────────────────────────────

export async function getPlaylists(): Promise<{ items: Playlist[] }> {
  return api.get("/playlists");
}

export async function getPlaylist(playlistId: string): Promise<Playlist> {
  return api.get(`/playlists/${playlistId}`);
}

export async function createPlaylist(
  name: string,
  description?: string,
): Promise<Playlist> {
  return api.post("/playlists", { name, description });
}

export async function addTrackToPlaylist(
  playlistId: string,
  trackId: string,
): Promise<void> {
  await api.post(`/playlists/${playlistId}/tracks`, { trackId });
}

export async function removeTrackFromPlaylist(
  playlistId: string,
  trackId: string,
): Promise<void> {
  await api.delete(`/playlists/${playlistId}/tracks/${trackId}`);
}

// ── Favorites ────────────────────────────────────────────────

export async function getFavorites(
  limit: number = 50,
): Promise<{ items: Track[]; total: number }> {
  return api.get(`/favorites?limit=${limit}`);
}

export async function addFavorite(trackId: string): Promise<void> {
  await api.post("/favorites", { trackId });
}

export async function removeFavorite(trackId: string): Promise<void> {
  await api.delete(`/favorites/${trackId}`);
}

export async function isFavorite(
  trackId: string,
): Promise<{ isFavorite: boolean }> {
  return api.get(`/favorites/${trackId}`);
}
