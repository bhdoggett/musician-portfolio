"use client";

import React from "react";
import { useAudio } from "@/contexts/AudioContext";
import { Song, Release } from "@/types";
import styles from "./PlayButton.module.css";

interface PlayButtonProps {
  song: Song;
  release: Release;
  size?: "small" | "medium" | "large";
}

export const PlayButton: React.FC<PlayButtonProps> = ({
  song,
  release,
  size = "medium",
}) => {
  const { state, playTrack, pauseTrack, isCurrentTrack } = useAudio();

  const isThisTrackCurrent = isCurrentTrack(song.id);
  const isPlaying = isThisTrackCurrent && state.isPlaying;
  const isLoading = isThisTrackCurrent && state.isLoading;

  const handleClick = () => {
    if (isThisTrackCurrent && state.isPlaying) {
      pauseTrack();
    } else {
      playTrack(song, release);
    }
  };

  return (
    <button
      className={`${styles.playButton} ${styles[size]} ${isPlaying ? styles.playing : ""} ${isThisTrackCurrent ? styles.current : ""}`}
      onClick={handleClick}
      disabled={isLoading}
      aria-label={isPlaying ? "Pause" : "Play"}
    >
      {isLoading ? (
        <div className={styles.spinner} />
      ) : isPlaying ? (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
};

export default PlayButton;
