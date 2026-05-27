"use client";

import type { Album } from "@/types";
import { Play } from "lucide-react";
import styles from "./AlbumGridComponent.module.css";

interface AlbumGridComponentProps {
  albums: Album[];
}

export default function AlbumGridComponent({
  albums,
}: AlbumGridComponentProps) {
  return (
    <div className={styles["album-grid-container"]}>
      {albums.map((album) => (
        <div key={album._id} className={styles["album-card"]}>
          <div className={styles["album-art-wrapper"]}>
            💿
            <div className={styles["album-play-overlay"]}>
              <Play size={18} />
            </div>
          </div>
          <div className={styles["album-text-details"]}>
            <span className={styles["album-title-text"]}>{album.title}</span>
            <span className={styles["album-artist-text"]}>{album.artist}</span>
            <span className={styles["album-meta-text"]}>
              {album.year ? `${album.year} · ` : ""}
              {album.trackCount} track{album.trackCount !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
