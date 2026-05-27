# Music Client

Personal music streaming frontend — browse albums, artists, and playlists with a premium listening experience.

## Architecture

Next.js 16 App Router frontend featuring:
- **Sidebar navigation** — Home, Search, Library, Favorites, Playlists, Albums
- **Persistent player bar** — playback controls, progress, volume
- **Track list** — sortable, searchable, with animated playing indicator
- **Album grid** — responsive cards with hover play overlay
- **Google SSO** — via NextAuth v5
- **Vault integration** — secrets from centralized vault service

## Development

```bash
npm install
npm run dev     # Dev server on port 3013
npm run build   # Production build
npm test        # Run tests
npm run deploy  # Build & deploy to NAS
```

## Configuration

All configuration comes from the Vault service. Key variables:
- `MUSIC_CLIENT_PORT` — Client port (default: 3013)
- `MUSIC_SERVICE_URL` — Backend API URL
- `MUSIC_SERVICE_PUBLIC_URL` — Public-facing API URL for PNA compliance
- `AUTH_SECRET` — NextAuth secret
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — Google SSO credentials
