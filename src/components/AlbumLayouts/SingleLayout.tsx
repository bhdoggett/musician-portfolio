"use client";

import React from "react";
import { Album } from "@/types";
import { PlayButton } from "@/components/PlayButton";
import styles from "./AlbumLayouts.module.css";

interface SingleLayoutProps {
  album: Album;
}

export const SingleLayout: React.FC<SingleLayoutProps> = ({ album }) => {
  const song = album.songs[0]; // Singles have only one song

  return (
    <div className={styles.singleLayout}>
      <div className={styles.singleTrack}>
        <div className={styles.singleTrackHeader}>
          <PlayButton song={song} album={album} size="large" />
          <h2 className={styles.singleTrackTitle}>{song.title}</h2>
        </div>

        {/* Direct lyrics access for single tracks */}
        {song.lyrics && (
          <div className={styles.singleLyricsSection}>
            <h3 className={styles.singleLyricsTitle}>Lyrics</h3>
            <div className={styles.singleLyricsContent}>
              {song.lyrics
                .split("\n")
                .map((line: string, lineIndex: number) => (
                  <p key={lineIndex} className={styles.lyricsLine}>
                    {line || "\u00A0"}{" "}
                    {/* Non-breaking space for empty lines */}
                  </p>
                ))}
            </div>
          </div>
        )}

        {/* Copyright information */}
        {song.copyright && (
          <div className={styles.singleCopyrightSection}>
            <p className={styles.singleCopyright}>{song.copyright}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleLayout;
