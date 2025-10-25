"use client";

import React, { useState } from "react";
import { Song, Album } from "@/types";
import { PlayButton } from "@/components/PlayButton";
import styles from "./SongList.module.css";

interface SongListProps {
  songs: Song[];
  albumType: "single" | "ep";
  album: Album;
}

interface SongItemProps {
  song: Song;
  album: Album;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const SongItem: React.FC<SongItemProps> = ({
  song,
  album,
  index,
  isExpanded,
  onToggle,
}) => {
  return (
    <div className={`${styles.songItem} ${isExpanded ? styles.expanded : ""}`}>
      <div className={styles.songHeader}>
        <div className={styles.songInfo}>
          <span className={styles.trackNumber}>{index + 1}</span>
          <PlayButton song={song} album={album} size="small" />
          <h3 className={styles.songTitle} onClick={onToggle}>
            {song.title}
          </h3>
        </div>
        <button
          className={styles.expandButton}
          onClick={onToggle}
          aria-label={
            isExpanded ? "Collapse song details" : "Expand song details"
          }
          aria-expanded={isExpanded}
        >
          <svg
            className={`${styles.expandIcon} ${isExpanded ? styles.rotated : ""}`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
        </button>
      </div>

      <div className={styles.songContent}>
        <div className={styles.songContentInner}>
          {song.lyrics && (
            <div className={styles.lyricsSection}>
              <h4 className={styles.lyricsTitle}>Lyrics</h4>
              <div className={styles.lyricsContent}>
                {song.lyrics.split("\n").map((line, lineIndex) => (
                  <p key={lineIndex} className={styles.lyricsLine}>
                    {line || "\u00A0"}{" "}
                    {/* Non-breaking space for empty lines */}
                  </p>
                ))}
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
    </div>
  );
};

export const SongList: React.FC<SongListProps> = ({
  songs,
  albumType,
  album,
}) => {
  const [expandedSongId, setExpandedSongId] = useState<string | null>(null);

  const toggleSong = (songId: string) => {
    setExpandedSongId((prev) => {
      // If clicking the same song that's already expanded, collapse it
      if (prev === songId) {
        return null;
      }
      // Otherwise, expand this song (and close any other)
      return songId;
    });
  };

  return (
    <div className={styles.songs}>
      {songs.map((song, index) => (
        <SongItem
          key={song.id}
          song={song}
          album={album}
          index={index}
          isExpanded={expandedSongId === song.id}
          onToggle={() => toggleSong(song.id)}
        />
      ))}
    </div>
  );
};

export default SongList;
