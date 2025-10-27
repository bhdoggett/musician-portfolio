import React from "react";
import styles from "./StreamingLinks.module.css";

interface StreamingLinksProps {
  streamingLinks?: {
    bandcamp?: string;
    spotify?: string;
    appleMusic?: string;
  };
}

const StreamingLinks: React.FC<StreamingLinksProps> = ({ streamingLinks }) => {
  if (!streamingLinks) return null;

  const platforms = [
    {
      name: "Bandcamp",
      url: streamingLinks.bandcamp,
      icon: (
        <svg viewBox="0 0 512 512" fill="currentColor" className={styles.icon}>
          <path d="M354.27,407.291H0.5l157.231-302.582H511.5L354.27,407.291z" />
        </svg>
      ),
    },
    {
      name: "Spotify",
      url: streamingLinks.spotify,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      ),
    },
    {
      name: "Apple Music",
      url: streamingLinks.appleMusic,
      icon: (
        <svg
          viewBox="0 0 361 361"
          fill="currentColor"
          className={styles.appleMusicIcon}
        >
          <path
            d="M254.5,55c-0.87,0.08-8.6,1.45-9.53,1.64l-107,21.59l-0.04,0.01c-2.79,0.59-4.98,1.58-6.67,3
            c-2.04,1.71-3.17,4.13-3.6,6.95c-0.09,0.6-0.24,1.82-0.24,3.62c0,0,0,109.32,0,133.92c0,3.13-0.25,6.17-2.37,8.76
            c-2.12,2.59-4.74,3.37-7.81,3.99c-2.33,0.47-4.66,0.94-6.99,1.41c-8.84,1.78-14.59,2.99-19.8,5.01
            c-4.98,1.93-8.71,4.39-11.68,7.51c-5.89,6.17-8.28,14.54-7.46,22.38c0.7,6.69,3.71,13.09,8.88,17.82
            c3.49,3.2,7.85,5.63,12.99,6.66c5.33,1.07,11.01,0.7,19.31-0.98c4.42-0.89,8.56-2.28,12.5-4.61c3.9-2.3,7.24-5.37,9.85-9.11
            c2.62-3.75,4.31-7.92,5.24-12.35c0.96-4.57,1.19-8.7,1.19-13.26l0-116.15c0-6.22,1.76-7.86,6.78-9.08c0,0,88.94-17.94,93.09-18.75
            c5.79-1.11,8.52,0.54,8.52,6.61l0,79.29c0,3.14-0.03,6.32-2.17,8.92c-2.12,2.59-4.74,3.37-7.81,3.99
            c-2.33,0.47-4.66,0.94-6.99,1.41c-8.84,1.78-14.59,2.99-19.8,5.01c-4.98,1.93-8.71,4.39-11.68,7.51
            c-5.89,6.17-8.49,14.54-7.67,22.38c0.7,6.69,3.92,13.09,9.09,17.82c3.49,3.2,7.85,5.56,12.99,6.6c5.33,1.07,11.01,0.69,19.31-0.98
            c4.42-0.89,8.56-2.22,12.5-4.55c3.9-2.3,7.24-5.37,9.85-9.11c2.62-3.75,4.31-7.92,5.24-12.35c0.96-4.57,1-8.7,1-13.26V64.46
            C263.54,58.3,260.29,54.5,254.5,55z"
          />
        </svg>
      ),
    },
  ];

  const availablePlatforms = platforms.filter((platform) => platform.url);

  if (availablePlatforms.length === 0) return null;

  return (
    <div className={styles.streamingLinks}>
      <div className={styles.platformList}>
        {availablePlatforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.platformLink}
            aria-label={`Listen on ${platform.name}`}
          >
            {platform.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default StreamingLinks;
