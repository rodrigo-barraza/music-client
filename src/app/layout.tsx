import "./globals.css";
import {
  ThemeProvider,
  ComponentsProvider,
  generateThemeInitScript,
} from "@rodrigo-barraza/components-library";
import AuthProvider from "@/providers/AuthProvider";
import SessionTrackerComponent from "@/components/SessionTrackerComponent";

const AUTH_ENABLED = process.env.AUTH_ENABLED === "true";

export const metadata = {
  title: "Music — Personal Audio Library",
  description:
    "Stream your personal music collection. Browse albums, artists, and playlists with a premium listening experience.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <template
          dangerouslySetInnerHTML={{
            __html: `<script>${generateThemeInitScript("music:theme")}</script>`,
          }}
          suppressHydrationWarning
        />
      </head>
      <body>
        <ThemeProvider storageKey="music:theme">
          <ComponentsProvider>
            <AuthProvider authEnabled={AUTH_ENABLED}>
              <SessionTrackerComponent authEnabled={AUTH_ENABLED} />
              {children}
            </AuthProvider>
          </ComponentsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
