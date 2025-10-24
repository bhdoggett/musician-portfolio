"use client";

import React, { useState } from "react";
import { Song } from "@/types";
import { AudioPlayer } from "@/components/AudioPlayer";
import styles from "./SongList.module.css";

interface SongListProps {
  songs: Song[];
  albumType: "single" | "ep";
}

interface SongItemProps {
  song: Song;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const SongItem: React.FC<SongItemProps> = ({
  song,
  index,
  isExpanded,
  onToggle,
}) => {
  return (
    <div className={`${styles.songItem} ${isExpanded ? styles.expanded : ""}`}>
      <div className={styles.songHeader} onClick={onToggle}>
        <div className={styles.songInfo}>
          <span className={styles.trackNumber}>{index + 1}</span>
          <h3 className={styles.songTitle}>{song.title}</h3>
        </div>
        <button
          className={styles.expandButton}
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
          <div className={styles.audioSection}>
            <AudioPlayer
              audioUrl={song.audioUrl}
              title={song.title}
              onPlayStateChange={(isPlaying) => {
                // Optional: Handle play state changes for visual feedback
                console.log(
                  `${song.title} is ${isPlaying ? "playing" : "paused"}`
                );
              }}
            />
          </div>

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

export const SongList: React.FC<SongListProps> = ({ songs, albumType }) => {
  const [expandedSongs, setExpandedSongs] = useState<Set<string>>(new Set());

  const toggleSong = (songId: string) => {
    setExpandedSongs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(songId)) {
        newSet.delete(songId);
      } else {
        newSet.add(songId);
      }
      return newSet;
    });
  };

  return (
    <div className={styles.songList}>
      <div className={styles.songListHeader}>
        <h2 className={styles.songListTitle}>
          {albumType === "ep" ? "Track List" : "Track"}
        </h2>
        <p className={styles.songListSubtitle}>
          Click on any track to expand and listen
        </p>
      </div>

      <div className={styles.songs}>
        {songs.map((song, index) => (
          <SongItem
            key={song.id}
            song={song}
            index={index}
            isExpanded={expandedSongs.has(song.id)}
            onToggle={() => toggleSong(song.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SongList;
