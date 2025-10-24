"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { AudioPlayerProps, AudioPlayerState } from "@/types";
import {
  isMobileDevice,
  isIOSDevice,
  enableAudioContext,
} from "@/utils/mobile";
import styles from "./AudioPlayer.module.css";

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  title,
  onPlayStateChange,
}) => {
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    isLoading: false,
    currentTime: 0,
    duration: 0,
    error: undefined,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize audio element
  const initializeAudio = useCallback(() => {
    setState((prev) => ({ ...prev, isLoading: true, error: undefined }));

    try {
      // Create new audio element
      const audio = new Audio(audioUrl);
      audio.preload = "metadata";

      // Mobile-specific audio settings
      (audio as any).playsInline = true; // Prevent fullscreen on iOS
      audio.crossOrigin = "anonymous"; // Handle CORS if needed

      // iOS-specific settings
      if (isIOSDevice()) {
        audio.load(); // Preload on iOS
      }

      // Set up event listeners
      audio.addEventListener("loadedmetadata", () => {
        console.log(
          "Audio metadata loaded:",
          audioUrl,
          "Duration:",
          audio.duration
        );
        setState((prev) => ({
          ...prev,
          isLoading: false,
          duration: audio.duration || 0,
          error: undefined,
        }));
      });

      audio.addEventListener("error", (e) => {
        console.error("Audio load error:", e, "URL:", audioUrl);
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: `Failed to load audio: ${audio.error?.message || "Unknown error"}`,
        }));
      });

      audio.addEventListener("timeupdate", () => {
        setState((prev) => ({
          ...prev,
          currentTime: audio.currentTime,
        }));
      });

      audio.addEventListener("ended", () => {
        setState((prev) => ({ ...prev, isPlaying: false, currentTime: 0 }));
        stopProgressTracking();
        onPlayStateChange?.(false);
      });

      audio.addEventListener("play", () => {
        setState((prev) => ({ ...prev, isPlaying: true }));
        onPlayStateChange?.(true);
      });

      audio.addEventListener("pause", () => {
        setState((prev) => ({ ...prev, isPlaying: false }));
        onPlayStateChange?.(false);
      });

      audioRef.current = audio;

      // Add timeout for loading
      setTimeout(() => {
        setState((prev) => {
          if (prev.isLoading) {
            console.warn("Audio loading timeout for:", audioUrl);
            return {
              ...prev,
              isLoading: false,
              error:
                "Audio loading timeout - file may not exist or be accessible",
            };
          }
          return prev;
        });
      }, 10000);
    } catch (error) {
      console.error("Audio initialization error:", error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Audio initialization failed",
      }));
    }
  }, [audioUrl, onPlayStateChange]);

  // Start progress tracking
  const startProgressTracking = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    progressIntervalRef.current = setInterval(() => {
      if (audioRef.current) {
        setState((prev) => ({
          ...prev,
          currentTime: audioRef.current!.currentTime,
        }));
      }
    }, 100);
  }, []);

  // Stop progress tracking
  const stopProgressTracking = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  // Handle play
  const handlePlay = useCallback(async () => {
    console.log("Play button clicked");

    if (!audioRef.current) {
      console.log("No audio element, initializing...");
      initializeAudio();
      return;
    }

    try {
      console.log("Starting playback");

      // Mobile-specific: Enable audio context (iOS requirement)
      if (isMobileDevice()) {
        await enableAudioContext();
      }

      await audioRef.current.play();
      startProgressTracking();
    } catch (error) {
      console.error("Playback error:", error);
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Playback failed",
      }));
    }
  }, [initializeAudio, startProgressTracking]);

  // Handle pause
  const handlePause = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      stopProgressTracking();
    }
  }, [stopProgressTracking]);

  // Handle stop
  const handleStop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setState((prev) => ({ ...prev, isPlaying: false, currentTime: 0 }));
    stopProgressTracking();
    onPlayStateChange?.(false);
  }, [stopProgressTracking, onPlayStateChange]);

  // Handle seek
  const handleSeek = useCallback((seekTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setState((prev) => ({ ...prev, currentTime: seekTime }));
    }
  }, []);

  // Handle progress bar click and touch
  const handleProgressClick = useCallback(
    (
      event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
      if (!state.duration) return;

      const rect = event.currentTarget.getBoundingClientRect();
      let clientX: number;

      // Handle both mouse and touch events
      if ("touches" in event) {
        if (event.touches.length === 0) return;
        clientX = event.touches[0].clientX;
      } else {
        clientX = event.clientX;
      }

      const clickX = clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, clickX / rect.width));
      const seekTime = percentage * state.duration;

      handleSeek(seekTime);
    },
    [state.duration, handleSeek]
  );

  // Format time display
  const formatTime = useCallback((seconds: number): string => {
    if (!isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  // Initialize audio on mount and when URL changes
  useEffect(() => {
    initializeAudio();

    return () => {
      stopProgressTracking();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioUrl, initializeAudio, stopProgressTracking]);

  return (
    <div className={styles.audioPlayer}>
      <div className={styles.header}>
        <h4 className={styles.title}>{title}</h4>
        {state.error && (
          <div className={styles.error}>
            {state.error}
            <button
              className={styles.retryButton}
              onClick={initializeAudio}
              disabled={state.isLoading}
            >
              Retry
            </button>
          </div>
        )}
      </div>

      <div className={styles.controls}>
        <button
          className={`${styles.playButton} ${state.isPlaying ? styles.playing : ""}`}
          onClick={state.isPlaying ? handlePause : handlePlay}
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
          <div
            className={styles.progressBar}
            onClick={handleProgressClick}
            onTouchStart={handleProgressClick}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={state.duration}
            aria-valuenow={state.currentTime}
            aria-label="Audio progress"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft" && state.duration > 0) {
                handleSeek(Math.max(0, state.currentTime - 5));
              } else if (e.key === "ArrowRight" && state.duration > 0) {
                handleSeek(Math.min(state.duration, state.currentTime + 5));
              }
            }}
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
            <div
              className={styles.progressThumb}
              style={{
                left:
                  state.duration > 0
                    ? `${(state.currentTime / state.duration) * 100}%`
                    : "0%",
              }}
            />
          </div>
        </div>

        <div className={styles.timeDisplay}>
          <span className={styles.currentTime}>
            {formatTime(state.currentTime)}
          </span>
          <span className={styles.separator}>/</span>
          <span className={styles.duration}>{formatTime(state.duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
