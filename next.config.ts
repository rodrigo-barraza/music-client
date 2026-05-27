// ============================================================
// Music Client — Next.js Configuration
// ============================================================
// Bootstraps secrets from Vault at startup
// and injects them into process.env for the app.
// ============================================================

import { createVaultClient } from "@rodrigo-barraza/utilities-library/node";
import type { NextConfig } from "next";

// ── Bootstrap secrets at build/dev time ────────────────────────
const vault = createVaultClient();

const secrets = vault.fetchSync();

// Inject into process.env so config.ts can read them
Object.assign(process.env, secrets);

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: [],
  turbopack: {},
  transpilePackages: [
    "@rodrigo-barraza/components-library",
    "@rodrigo-barraza/utilities-library",
  ],

  env: {

    // ── Sessions ──────────────────────────────────────────────
    SESSIONS_SERVICE_URL: secrets.SESSIONS_SERVICE_URL,
    SESSIONS_SERVICE_PUBLIC_URL: secrets.SESSIONS_SERVICE_PUBLIC_URL,
    MUSIC_CLIENT_PORT: secrets.MUSIC_CLIENT_PORT,
    MUSIC_SERVICE_URL: secrets.MUSIC_SERVICE_URL,
    MUSIC_SERVICE_PUBLIC_URL: secrets.MUSIC_SERVICE_PUBLIC_URL,

    // ── Auth ──────────────────────────────────────────────────
    AUTH_SECRET: secrets.AUTH_SECRET,
    AUTH_ENABLED: secrets.AUTH_ENABLED,
    GOOGLE_CLIENT_ID: secrets.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: secrets.GOOGLE_CLIENT_SECRET,

    // Explicit NEXT_PUBLIC_ variables for Turbopack client-side injection
    NEXT_PUBLIC_MUSIC_CLIENT_PORT: secrets.MUSIC_CLIENT_PORT,
    NEXT_PUBLIC_MUSIC_SERVICE_URL: secrets.MUSIC_SERVICE_URL,
    NEXT_PUBLIC_MUSIC_SERVICE_PUBLIC_URL: secrets.MUSIC_SERVICE_PUBLIC_URL,
    NEXT_PUBLIC_AUTH_ENABLED: secrets.AUTH_ENABLED,
  },

  // Allow MinIO images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.rod.dev",
      },
    ],
  },
};

export default nextConfig;
