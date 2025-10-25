"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import { albums } from "@/data/albums";
import AlbumCard from "@/components/AlbumCard";
import styles from "./page.module.css";

// Note: Metadata export doesn't work in client components,
// but we'll add it via next/head or move to a layout if needed
export default function DiscographyPage() {
  const router = useRouter();

  const handleAlbumClick = (albumId: string) => {
    router.push(`/albums/${albumId}`);
  };

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: "Artist Portfolio",
    description:
      "Musical works exploring faith, worship, and the depths of God's love",
    genre: ["Worship", "Christian", "Faith"],
    album: albums.map((album) => ({
      "@type": "MusicAlbum",
      name: album.title,
      description: album.description,
      albumProductionType: album.type === "ep" ? "StudioAlbum" : "Single",
      numTracks: album.songs.length,
      track: album.songs.map((song, index) => ({
        "@type": "MusicRecording",
        name: song.title,
        position: index + 1,
      })),
    })),
  };

  return (
    <>
      <Script
        id="discography-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Discography</h1>
        </header>

        <main className={styles.main}>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-lg sm:gap-xl lg:gap-2xl ${styles.albumGrid}`}
          >
            {albums.map((album) => (
              <AlbumCard
                key={album.id}
                album={album}
                onClick={() => handleAlbumClick(album.id)}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
