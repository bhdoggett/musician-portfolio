import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAlbumById, getAllAlbums } from "@/data/albums";
import { SongList } from "@/components/SongList";
import styles from "./page.module.css";

// Generate static params for all albums at build time
export async function generateStaticParams() {
  const albums = getAllAlbums();

  return albums.map((album) => ({
    slug: album.id,
  }));
}

// Generate metadata for each album page
export async function generateMetadata({ params }: AlbumPageProps) {
  const { slug } = await params;
  const album = getAlbumById(slug);

  if (!album) {
    return {
      title: "Album Not Found",
    };
  }

  return {
    title: `${album.title} - Artist Portfolio`,
    description:
      album.description ||
      `${album.type === "ep" ? "Extended Play" : "Single"} by Artist Portfolio`,
    openGraph: {
      title: album.title,
      description: album.description,
      images: [
        {
          url: album.coverArt,
          width: 400,
          height: 400,
          alt: `${album.title} cover art`,
        },
      ],
    },
  };
}

interface AlbumPageProps {
  params: Promise<{ slug: string }>;
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { slug } = await params;
  const album = getAlbumById(slug);

  if (!album) {
    notFound();
  }

  return (
    <div className="container">
      <div className={styles.albumPage}>
        {/* Navigation */}
        <nav className={styles.navigation}>
          <Link href="/discography" className={styles.backLink}>
            ← Back to Discography
          </Link>
        </nav>

        {/* Album Header */}
        <header className={styles.albumHeader}>
          <div className={styles.coverArt}>
            <Image
              src={album.coverArt}
              alt={`${album.title} cover art`}
              width={400}
              height={400}
              className={styles.coverImage}
              priority
            />
          </div>

          <div className={styles.albumInfo}>
            <h1 className={styles.albumTitle}>{album.title}</h1>
            <p className={styles.albumType}>
              {album.type === "ep" ? "Extended Play" : "Single"}
            </p>
            {album.description && (
              <p className={styles.albumDescription}>{album.description}</p>
            )}
            <div className={styles.albumMeta}>
              <span className={styles.trackCount}>
                {album.songs.length}{" "}
                {album.songs.length === 1 ? "track" : "tracks"}
              </span>
            </div>
          </div>
        </header>

        {/* Album Content - Different layouts for Singles vs EPs */}
        <main className={styles.albumContent}>
          {album.type === "single" ? (
            <SingleLayout album={album} />
          ) : (
            <EPLayout album={album} />
          )}
        </main>
      </div>
    </div>
  );
}

// Single Layout Component
function SingleLayout({ album }: { album: any }) {
  const song = album.songs[0]; // Singles have only one song

  return (
    <div className={styles.singleLayout}>
      <div className={styles.singleTrack}>
        <h2 className={styles.trackTitle}>{song.title}</h2>
        <div className={styles.trackPlaceholder}>
          <p>Audio player will be implemented in task 7</p>
          <p className={styles.audioPath}>Audio: {song.audioUrl}</p>
        </div>

        {song.lyrics && (
          <div className={styles.lyricsSection}>
            <h3>Lyrics</h3>
            <div className={styles.lyricsContent}>
              <p>Lyrics display will be implemented in task 9</p>
            </div>
          </div>
        )}

        {song.copyright && (
          <div className={styles.copyrightSection}>
            <p className={styles.copyright}>{song.copyright}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// EP Layout Component
function EPLayout({ album }: { album: any }) {
  return (
    <div className={styles.epLayout}>
      <SongList songs={album.songs} albumType={album.type} />
    </div>
  );
}
