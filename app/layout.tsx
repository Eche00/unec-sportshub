import type { Metadata } from "next";
import { DM_Sans, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./ScrollToTop";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ColorThemeProvider } from "@/components/providers/color-theme-provider";
import MobileOnlyGuard from "@/components/providers/mobile-only-guard";
import UserGuardProvider from "@/components/providers/UserGuardProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://unecsportshub.com"),

  title: {
    default: "UNEC Sports Hub | UNEC Sports Management",
    template: "%s | UNEC Sports Hub",
  },

  description:
    "UNEC Sports Hub is the official platform for managing sports tournaments, matches, teams, fixtures, standings, lineups, results, and live match events at UNEC.",

  applicationName: "UNEC Sports Hub",

  keywords: [
    "UNEC Sports Hub",
    "UNEC Sports",
    "UNEC",
    "University of Nigeria Enugu Campus",
    "UNEC Sports Management",
    "UNEC Tournaments",
    "UNEC Matches",
    "UNEC Football",
    "UNEC Basketball",
    "UNEC Sports Events",
    "UNEC Fixtures",
    "UNEC Standings",
    "UNEC Live Scores",
    "UNEC Teams",
    "UNEC Lineups",
    "University Sports",
    "Campus Sports",
    "Sports Tournament Management",
    "Match Management",
  ],

  authors: [
    {
      name: "UNEC Sports Hub",
    },
  ],

  creator: "UNEC Sports Hub",
  publisher: "UNEC Sports Hub",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "UNEC Sports Hub",
    description:
      "The platform for managing and following UNEC sports tournaments, matches, teams, fixtures, standings, lineups, and results.",

    url: "https://unecsportshub.com",
    siteName: "UNEC Sports Hub",

    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "UNEC Sports Hub",
      },
    ],

    locale: "en_NG",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "UNEC Sports Hub",
    description:
      "Follow UNEC tournaments, matches, teams, fixtures, standings, lineups, live scores, and results.",

    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  category: "Sports",
};
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem("color-theme");
                document.documentElement.dataset.colorTheme = savedTheme || "orange";
              } catch {
                document.documentElement.dataset.colorTheme = "orange";
              }
            `,
          }}
        />
      </head>

      <body className="min-h-full flex flex-col bg-[var(--background)]">
        <UserGuardProvider>
          <MobileOnlyGuard>
            <ThemeProvider>
              <ColorThemeProvider>
                <Toaster
                  position="top-right"
                  reverseOrder={false}
                  toastOptions={{
                    style: {
                      background: "var(--card)",
                      color: "var(--foreground)",
                      border: "1px solid var(--border)",
                      borderRadius: "12px",
                    },
                    success: {
                      iconTheme: {
                        primary: "var(--primary)",
                        secondary: "var(--card)",
                      },
                    },
                    error: {
                      iconTheme: {
                        primary: "#DC2626",
                        secondary: "var(--card)",
                      },
                    },
                  }}
                />

                <ScrollToTop />
                {children}
              </ColorThemeProvider>
            </ThemeProvider>
          </MobileOnlyGuard>
        </UserGuardProvider>
      </body>
    </html>
  );
}