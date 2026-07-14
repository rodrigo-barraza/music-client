// ============================================================
// Music Client — Runtime Configuration
// ============================================================
// Typed accessor layer over process.env. The Vault service is
// the single source of truth — next.config.ts hydrates
// process.env from the Vault before any module imports run.
//
// Browser requests must NEVER hit localhost or LAN IPs when loaded
// from a public domain — that triggers Chrome's Private Network
// Access (PNA) prompt. resolveClientServiceUrl handles that split.
// ============================================================

import {
  isProductionHostname,
  resolveClientServiceUrl,
} from "@rodrigo-barraza/utilities-library";

export const IS_PRODUCTION = isProductionHostname();
export const IS_LOCALHOST = !IS_PRODUCTION;

export const PROJECT_NAME = IS_PRODUCTION ? "music-client" : "music-client-dev";

export const MUSIC_CLIENT_PORT =
  process.env.NEXT_PUBLIC_MUSIC_CLIENT_PORT || process.env.MUSIC_CLIENT_PORT;

// ── Music Service URL ──────────────────────────────────────────
export const MUSIC_SERVICE_URL = resolveClientServiceUrl({
  internalUrl:
    process.env.NEXT_PUBLIC_MUSIC_SERVICE_URL || process.env.MUSIC_SERVICE_URL,
  publicUrl:
    process.env.NEXT_PUBLIC_MUSIC_SERVICE_PUBLIC_URL ||
    process.env.MUSIC_SERVICE_PUBLIC_URL,
});
