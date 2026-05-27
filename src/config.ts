// ============================================================
// Music Client — Runtime Configuration
// ============================================================
// Typed accessor layer over process.env. The Vault service is
// the single source of truth — next.config.ts hydrates
// process.env from the Vault before any module imports run.
//
// Browser requests must NEVER hit localhost or LAN IPs when loaded
// from a public domain — that triggers Chrome's Private Network
// Access (PNA) prompt.
// ============================================================

const IS_BROWSER = typeof window !== "undefined";

export const IS_PRODUCTION =
  IS_BROWSER && window.location.hostname.endsWith(".dev");
export const IS_LOCALHOST = !IS_PRODUCTION;

export const PROJECT_NAME = IS_PRODUCTION ? "music-client" : "music-client-dev";

export const MUSIC_CLIENT_PORT =
  process.env.NEXT_PUBLIC_MUSIC_CLIENT_PORT || process.env.MUSIC_CLIENT_PORT;

// ── Raw values from process.env ────────────────────────────────
const RAW_SERVICE_URL =
  process.env.NEXT_PUBLIC_MUSIC_SERVICE_URL || process.env.MUSIC_SERVICE_URL;

// ── Public URL from vault (browser production override) ────────
const PUBLIC_SERVICE_URL =
  process.env.NEXT_PUBLIC_MUSIC_SERVICE_PUBLIC_URL ||
  process.env.MUSIC_SERVICE_PUBLIC_URL;

// ── Music Service URL ──────────────────────────────────────────
function resolveServiceUrl() {
  if (!IS_BROWSER) return RAW_SERVICE_URL;
  if (IS_PRODUCTION && PUBLIC_SERVICE_URL) return PUBLIC_SERVICE_URL;
  return RAW_SERVICE_URL;
}

export const MUSIC_SERVICE_URL = resolveServiceUrl();
