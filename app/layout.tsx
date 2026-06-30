import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://unecsportshub.com"), // Replace with your domain

  title: {
    default: "UNEC Sports Hub | Tournament & Match Management",
    template: "%s | UNEC Sports Hub",
  },

  description:
    "UNEC Sports Hub is a modern sports tournament management platform for organizing competitions, scheduling fixtures, managing teams, tracking live scores, standings, and match results.",

  applicationName: "UNEC Sports Hub",

  keywords: [
    "UNEC Sports Hub",
    "UNEC",
    "Sports",
    "Tournament Management",
    "Football Tournament",
    "Basketball Tournament",
    "Match Fixtures",
    "Sports Management",
    "Live Scores",
    "Sports Standings",
    "University Sports",
    "Campus Sports",
    "Tournament Bracket",
    "Knockout Tournament",
    "League Management",
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
      "Manage tournaments, teams, fixtures, standings, and live matches with UNEC Sports Hub.",

    url: "https://unecsportshub.com", // Replace with your domain
    siteName: "UNEC Sports Hub",

    images: [
      {
        url: "/og-image.png", // Place this image in /public
        width: 1200,
        height: 630,
        alt: "UNEC Sports Hub",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "UNEC Sports Hub",
    description:
      "Tournament management platform for organizing teams, fixtures, standings, and live matches.",

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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}