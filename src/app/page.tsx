"use client";

import type { Track, Album } from "@/types";
import { useState, useEffect, useCallback } from "react";
import NavigationBarComponent from "@/components/NavigationBarComponent/NavigationBarComponent";
import PlayerBarComponent from "@/components/PlayerBarComponent/PlayerBarComponent";
import TrackListComponent from "@/components/TrackListComponent/TrackListComponent";
import AlbumGridComponent from "@/components/AlbumGridComponent/AlbumGridComponent";
import * as MusicService from "@/services/MusicService";
import styles from "./page.module.css";

export default function HomePage() {
  const [recentTracks, setRecentTracks] = useState<Track[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const loadHome = useCallback(async () => {
    setIsLoading(true);
    try {
      const [tracksResponse, albumsResponse] = await Promise.all([
        MusicService.browseTracks({ sort: "ADDED_DESC", limit: 20 }).catch(
          () => ({ items: [], total: 0, limit: 20, offset: 0 }),
        ),
        MusicService.getAlbums({ limit: 12 }).catch(() => ({
          items: [],
          total: 0,
          limit: 12,
          offset: 0,
        })),
      ]);

      setRecentTracks(tracksResponse.items || []);
      setAlbums(albumsResponse.items || []);
    } catch (error: unknown) {
      console.error("Failed to load home", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHome();
  }, [loadHome]);

  const handleTrackSelect = useCallback((track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  }, []);

  const handleTogglePlayback = useCallback(() => {
    setIsPlaying((previous) => !previous);
  }, []);

  return (
    <div className={styles["music-application-layout"]}>
      <NavigationBarComponent />

      <main className={styles["main-content-area"]}>
        {/* ── Recently Added ──────────────────────────────── */}
        <section className={styles["content-section"]}>
          <h2 className={styles["section-heading"]}>Recently Added</h2>
          {isLoading ? (
            <div className={styles["loading-skeleton"]}>
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className={styles["skeleton-card"]} />
              ))}
            </div>
          ) : recentTracks.length > 0 ? (
            <TrackListComponent
              tracks={recentTracks}
              onTrackSelect={handleTrackSelect}
              currentTrackId={currentTrack?._id}
              isPlaying={isPlaying}
            />
          ) : (
            <div className={styles["empty-state-message"]}>
              <span className={styles["empty-state-icon"]}>🎵</span>
              <p>No tracks found. Run a library scan to index your music.</p>
            </div>
          )}
        </section>

        {/* ── Albums ──────────────────────────────────────── */}
        {albums.length > 0 && (
          <section className={styles["content-section"]}>
            <h2 className={styles["section-heading"]}>Albums</h2>
            <AlbumGridComponent albums={albums} />
          </section>
        )}
      </main>

      <PlayerBarComponent
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onTogglePlayback={handleTogglePlayback}
      />
    </div>
  );
}
