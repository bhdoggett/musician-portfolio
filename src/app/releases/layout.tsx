import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Releases",
  description:
    "Explore a collection of musical works exploring faith, worship, and the depths of God's love. Listen to EPs, singles, and worship songs.",
  keywords: [
    "worship music",
    "christian music",
    "faith",
    "Releases",
    "releases",
    "EPs",
    "singles",
  ],
  openGraph: {
    title: "Releases | Artist Portfolio",
    description:
      "Explore a collection of musical works exploring faith, worship, and the depths of God's love.",
    type: "website",
    url: "/Releases",
  },
  twitter: {
    card: "summary_large_image",
    title: "Releases | Artist Portfolio",
    description:
      "Explore a collection of musical works exploring faith, worship, and the depths of God's love.",
  },
};

export default function ReleasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
