"use client";

import Image from "next/image";
import { AlbumCardProps } from "@/types";
import styles from "./AlbumCard.module.css";

export default function AlbumCard({ album, onClick }: AlbumCardProps) {
  const handleClick = () => {
    onClick();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={styles.albumCard}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View ${album.title} ${album.type}`}
    >
      <div className={styles.imageContainer}>
        <Image
          src={album.coverArt}
          alt={`${album.title} album cover`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.coverImage}
          priority={false}
        />
        <div className={styles.overlay}>
          <div className={styles.playIcon}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
