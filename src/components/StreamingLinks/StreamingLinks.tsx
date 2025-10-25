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
        <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
          <path d="M0 18.75l7.437-13.5h16.563v13.5z" />
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
        <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
          <path d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.15-.04-.003-.083-.01-.124-.013H5.988c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208c-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18-.013.43-.024.86-.024 1.29v9.884c0 .373.014.746.024 1.12.01.394.044.786.1 1.178.071.483.171.96.363 1.408.565 1.328 1.529 2.25 2.865 2.78.703.278 1.446.358 2.193.401.152.009.303.016.455.026h11.028c.041-.003.084-.01.124-.013.526-.015 1.047-.057 1.564-.15.673-.121 1.303-.353 1.877-.717 1.118-.733 1.863-1.734 2.18-3.043.175-.72.24-1.452.24-2.19V6.124zM7.874 11.549c0-1.195.91-2.105 2.106-2.105.154 0 .308.017.459.05v6.344c0 .842-.67 1.512-1.512 1.512-.842 0-1.512-.67-1.512-1.512 0-.154.017-.308.05-.459.033-.151.05-.305.05-.459V11.549zm8.91-8.64c-.033-.151-.05-.305-.05-.459 0-.842.67-1.512 1.512-1.512.842 0 1.512.67 1.512 1.512 0 .154-.017.308-.05.459v8.64c0 1.195-.91 2.105-2.106 2.105-.154 0-.308-.017-.459-.05V2.909z" />
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
