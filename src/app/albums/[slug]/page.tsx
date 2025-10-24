import { notFound } from "next/navigation";
import { getAlbumById } from "@/data/albums";

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
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>{album.title}</h1>
        <p>Type: {album.type.toUpperCase()}</p>
        <p>Songs: {album.songs.length}</p>
        {album.description && <p>{album.description}</p>}
        <p style={{ marginTop: "2rem", color: "#666" }}>
          Album page implementation coming in future tasks...
        </p>
      </div>
    </div>
  );
}
