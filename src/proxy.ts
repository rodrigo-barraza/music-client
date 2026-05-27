// ============================================================
// Auth Proxy — Next.js 16 session keep-alive
// ============================================================
// In Next.js 16, middleware.ts was renamed to proxy.ts.
// This keeps the session alive by refreshing the expiry on each request.
// ============================================================

export { auth as proxy } from "@/auth";
