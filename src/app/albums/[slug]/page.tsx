import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAlbumById, getAllAlbums } from "@/data/albums";
import { SingleLayout, EPLayout } from "@/components/AlbumLayouts";
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
