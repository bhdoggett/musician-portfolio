"use client";

import React, { useCallback } from "react";
import { useAudio } from "@/contexts/AudioContext";
import styles from "./GlobalAudioPlayer.module.css";

export const GlobalAudioPlayer: React.FC = () => {
  const { state, playTrack, pauseTrack, seekTo } = useAudio();

  // Format time display
  const formatTime = useCallback((seconds: number): string => {
    if (!isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  // Handle progress bar click
  const handleProgressClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!state.duration) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, clickX / rect.width));
      const seekTime = percentage * state.duration;

      seekTo(seekTime);
    },
    [state.duration, seekTo]
  );

  // Don't render if no track is loaded
  if (!state.currentTrack) {
    return null;
  }

  return (
    <div className={styles.globalPlayer}>
      <div className={styles.trackInfo}>
        <div className={styles.releaseCover}>
          <img
            src={state.currentTrack.release.coverArt}
            alt={state.currentTrack.release.title}
          />
        </div>
        <div className={styles.trackDetails}>
          <div className={styles.songTitle}>
            {state.currentTrack.song.title}
          </div>
          <div className={styles.releaseTitle}>
            {state.currentTrack.release.title}
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <button
          className={`${styles.playButton} ${state.isPlaying ? styles.playing : ""}`}
          onClick={
            state.isPlaying
              ? pauseTrack
              : () =>
                  playTrack(
                    state.currentTrack!.song,
                    state.currentTrack!.release
                  )
          }
          disabled={state.isLoading || !!state.error}
          aria-label={state.isPlaying ? "Pause" : "Play"}
        >
          {state.isLoading ? (
            <div className={styles.spinner} />
          ) : state.isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className={styles.progressContainer}>
          <span className={styles.currentTime}>
            {formatTime(state.currentTime)}
          </span>
          <div
            className={styles.progressBar}
            onClick={handleProgressClick}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={state.duration}
            aria-valuenow={state.currentTime}
            aria-label="Audio progress"
          >
            <div
              className={styles.progressFill}
              style={{
                width:
                  state.duration > 0
                    ? `${(state.currentTime / state.duration) * 100}%`
                    : "0%",
              }}
            />
          </div>
          <span className={styles.duration}>{formatTime(state.duration)}</span>
        </div>
      </div>

      {state.error && <div className={styles.error}>{state.error}</div>}
    </div>
  );
};

export default GlobalAudioPlayer;
