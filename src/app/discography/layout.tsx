import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discography",
  description:
    "Explore a collection of musical works exploring faith, worship, and the depths of God's love. Listen to EPs, singles, and worship songs.",
  keywords: [
    "worship music",
    "christian music",
    "faith",
    "discography",
    "albums",
    "EPs",
    "singles",
  ],
  openGraph: {
    title: "Discography | Artist Portfolio",
    description:
      "Explore a collection of musical works exploring faith, worship, and the depths of God's love.",
    type: "website",
    url: "/discography",
  },
  twitter: {
    card: "summary_large_image",
    title: "Discography | Artist Portfolio",
    description:
      "Explore a collection of musical works exploring faith, worship, and the depths of God's love.",
  },
};

export default function DiscographyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
