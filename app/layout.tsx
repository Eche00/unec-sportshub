import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./ScrollToTop";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#0A0F1C",
            color: "#22D3EE",
            border: "1px solid #22D3EE",
            borderRadius: "12px",
          },
          success: {
            iconTheme: {
              primary: "#22D3EE",
              secondary: "#0A0F1C",
            },
          },
          error: {
            iconTheme: {
              primary: "#22D3EE",
              secondary: "#0A0F1C",
            },
          },
        }}
      />
      <body className="min-h-full flex flex-col">
        <ScrollToTop />
        {children}</body>
    </html>
  );
}