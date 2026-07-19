"use client";

import type { Track } from "@/types";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Shuffle,
  Repeat,
} from "lucide-react";
import styles from "./PlayerBarComponent.module.css";
import { formatDuration } from "@/utils/format";

interface PlayerBarComponentProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onTogglePlayback: () => void;
}

export default function PlayerBarComponent({
  currentTrack,
  isPlaying,
  onTogglePlayback,
}: PlayerBarComponentProps) {
  if (!currentTrack) {
    return (
      <footer className={styles["player-bar-container"]}>
        <div className={styles["player-empty-state"]}>
          <span>🎵</span>
          <span>Select a track to start listening</span>
        </div>
      </footer>
    );
  }

  return (
    <footer
      className={styles["player-bar-container"]}
      role="region"
      aria-label="Audio player"
    >
      {/* ── Track Info ──────────────────────────────────── */}
      <div className={styles["track-info-section"]}>
        <div className={styles["album-art-placeholder"]}>🎵</div>
        <div className={styles["track-text-details"]}>
          <span className={styles["track-title-label"]}>
            {currentTrack.title}
          </span>
          <span className={styles["track-artist-label"]}>
            {currentTrack.artist}
          </span>
        </div>
      </div>

      {/* ── Playback Controls ──────────────────────────── */}
      <div className={styles["playback-controls-section"]}>
        <div className={styles["controls-button-layout-row"]}>
          <button
            className={styles["control-button"]}
            aria-label="Toggle shuffle"
          >
            <Shuffle size={16} />
          </button>
          <button
            className={styles["control-button"]}
            aria-label="Previous track"
          >
            <SkipBack size={18} />
          </button>
          <button
            className={`${styles["control-button"]} ${styles["play-pause-button"]}`}
            onClick={onTogglePlayback}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button
            className={styles["control-button"]}
            aria-label="Next track"
          >
            <SkipForward size={18} />
          </button>
          <button
            className={styles["control-button"]}
            aria-label="Toggle repeat"
          >
            <Repeat size={16} />
          </button>
        </div>

        <div className={styles["progress-track-container"]}>
          <span className={styles["time-label"]}>0:00</span>
          <div className={styles["progress-bar-track"]}>
            <div
              className={styles["progress-bar-fill"]}
              style={{ width: "0%" }}
            />
          </div>
          <span className={styles["time-label"]}>
            {formatDuration(currentTrack.durationSeconds)}
          </span>
        </div>
      </div>

      {/* ── Volume ─────────────────────────────────────── */}
      <div className={styles["volume-controls-section"]}>
        <button
          className={styles["control-button"]}
          aria-label="Adjust volume"
        >
          <Volume2 size={18} />
        </button>
        <div className={styles["volume-slider-track"]}>
          <div
            className={styles["volume-slider-fill"]}
            style={{ width: "70%" }}
          />
        </div>
      </div>
    </footer>
  );
}
