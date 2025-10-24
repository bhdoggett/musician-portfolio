import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Artist Portfolio | Worship Music & Faith",
    template: "%s | Artist Portfolio",
  },
  description:
    "A collection of musical works exploring faith, worship, and the depths of God's love. Listen to worship songs, EPs, and singles.",
  keywords: [
    "worship music",
    "christian music",
    "faith",
    "artist portfolio",
    "albums",
    "EPs",
    "singles",
  ],
  authors: [{ name: "Artist Portfolio" }],
  creator: "Artist Portfolio",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Artist Portfolio | Worship Music & Faith",
    description:
      "A collection of musical works exploring faith, worship, and the depths of God's love.",
    siteName: "Artist Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artist Portfolio | Worship Music & Faith",
    description:
      "A collection of musical works exploring faith, worship, and the depths of God's love.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
