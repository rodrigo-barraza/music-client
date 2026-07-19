/**
 * Format a track duration in whole seconds as m:ss (e.g. 225 → "3:45").
 *
 * Intentionally local: the utilities-library formatters render different
 * strings (formatDuration(ms) → "3m 45s"; formatMediaTimestamp → "1:01:40"
 * for durations >= 1h instead of "61:40"), so swapping would change output.
 */
export function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
