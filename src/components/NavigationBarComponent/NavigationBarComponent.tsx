"use client";

import { Home, Search, Library, Heart, ListMusic, Disc3 } from "lucide-react";
import styles from "./NavigationBarComponent.module.css";

export default function NavigationBarComponent() {
  return (
    <nav
      className={styles["navigation-sidebar"]}
      aria-label="Main navigation"
    >
      <div className={styles["brand-header"]}>
        <span className={styles["brand-icon"]}>🎵</span>
        <h1 className={styles["brand-title"]}>Music</h1>
      </div>

      <div className={styles["navigation-section"]}>
        <span className={styles["section-label"]}>Menu</span>
        <button
          className={`${styles["navigation-link"]} ${styles["navigation-link-active"]}`}
          aria-current="page"
        >
          <Home className={styles["navigation-link-icon"]} />
          Home
        </button>
        <button className={styles["navigation-link"]}>
          <Search className={styles["navigation-link-icon"]} />
          Search
        </button>
        <button className={styles["navigation-link"]}>
          <Library className={styles["navigation-link-icon"]} />
          Library
        </button>
      </div>

      <div className={styles["navigation-section"]}>
        <span className={styles["section-label"]}>Collection</span>
        <button className={styles["navigation-link"]}>
          <Heart className={styles["navigation-link-icon"]} />
          Favorites
        </button>
        <button className={styles["navigation-link"]}>
          <ListMusic className={styles["navigation-link-icon"]} />
          Playlists
        </button>
        <button className={styles["navigation-link"]}>
          <Disc3 className={styles["navigation-link-icon"]} />
          Albums
        </button>
      </div>

      <div className={styles["navigation-spacer"]} />
    </nav>
  );
}
