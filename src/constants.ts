// ============================================================
// Music Client — Constants
// ============================================================

export const SORT_OPTIONS = [
  { value: "ADDED_DESC", label: "Recently Added" },
  { value: "ADDED_ASC", label: "Oldest First" },
  { value: "TITLE_ASC", label: "Title A-Z" },
  { value: "TITLE_DESC", label: "Title Z-A" },
  { value: "ARTIST_ASC", label: "Artist A-Z" },
  { value: "ARTIST_DESC", label: "Artist Z-A" },
  { value: "ALBUM_ASC", label: "Album A-Z" },
  { value: "DURATION_DESC", label: "Longest" },
  { value: "DURATION_ASC", label: "Shortest" },
];

export const KEYBOARD_SHORTCUTS = {
  PLAY_PAUSE: " ",
  NEXT_TRACK: "ArrowRight",
  PREVIOUS_TRACK: "ArrowLeft",
  VOLUME_UP: "ArrowUp",
  VOLUME_DOWN: "ArrowDown",
  MUTE: "m",
  SHUFFLE: "s",
  REPEAT: "r",
};
