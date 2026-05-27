"use client";

import type { Track } from "@/types";
import styles from "./TrackListComponent.module.css";

interface TrackListComponentProps {
  tracks: Track[];
  onTrackSelect: (track: Track) => void;
  currentTrackId?: string;
  isPlaying?: boolean;
}

function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function TrackListComponent({
  tracks,
  onTrackSelect,
  currentTrackId,
  isPlaying = false,
}: TrackListComponentProps) {
  return (
    <div className={styles["track-list-container"]} role="list">
      <div className={styles["track-list-header-row"]}>
        <span className={styles["header-cell"]}>#</span>
        <span className={styles["header-cell"]}>Title</span>
        <span className={styles["header-cell"]}>Album</span>
        <span
          className={`${styles["header-cell"]} ${styles["header-cell-end"]}`}
        >
          Duration
        </span>
      </div>

      {tracks.map((track, index) => {
        const isCurrentTrack = track._id === currentTrackId;
        const isCurrentlyPlaying = isCurrentTrack && isPlaying;

        return (
          <div
            key={track._id}
            className={`${styles["track-row"]} ${isCurrentTrack ? styles["track-row-active"] : ""}`}
            role="listitem"
            onClick={() => onTrackSelect(track)}
          >
            <span className={styles["track-number-cell"]}>
              {isCurrentlyPlaying ? (
                <span className={styles["playing-indicator"]}>
                  <span className={styles["playing-bar"]} />
                  <span className={styles["playing-bar"]} />
                  <span className={styles["playing-bar"]} />
                </span>
              ) : (
                index + 1
              )}
            </span>

            <div className={styles["track-title-cell"]}>
              <span
                className={`${styles["track-title-text"]} ${isCurrentTrack ? styles["track-title-text-playing"] : ""}`}
              >
                {track.title}
              </span>
              <span className={styles["track-artist-text"]}>
                {track.artist}
              </span>
            </div>

            <span className={styles["track-album-cell"]}>{track.album}</span>

            <span className={styles["track-duration-cell"]}>
              {formatDuration(track.durationSeconds)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
