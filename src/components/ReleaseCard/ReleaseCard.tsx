"use client";

import Image from "next/image";
import { ReleaseCardProps } from "@/types";
import styles from "./ReleaseCard.module.css";

export default function ReleaseCard({ release, onClick }: ReleaseCardProps) {
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
      className={styles.ReleaseCard}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View ${release.title} ${release.type}`}
    >
      <div className={styles.imageContainer}>
        <Image
          src={release.coverArt}
          alt={`${release.title} release cover`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.coverImage}
          priority={false}
        />
        {/* <div className={styles.overlay}>
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
        </div> */}
      </div>
    </div>
  );
}
