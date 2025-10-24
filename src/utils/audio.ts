// Tone.js utilities and helpers for audio functionality

import * as Tone from "tone";

export class AudioManager {
  private player: Tone.Player | null = null;
  private isInitialized = false;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      await Tone.start();
      this.isInitialized = true;
    } catch (error) {
      console.error("Failed to initialize Tone.js:", error);
      throw new Error("Audio initialization failed");
    }
  }

  async loadAudio(url: string): Promise<Tone.Player> {
    await this.initialize();

    return new Promise((resolve, reject) => {
      const player = new Tone.Player({
        url,
        onload: () => resolve(player),
        onerror: (error) => reject(new Error(`Failed to load audio: ${error}`)),
      }).toDestination();

      this.player = player;
    });
  }

  play(): void {
    if (this.player && this.player.loaded) {
      this.player.start();
    }
  }

  pause(): void {
    if (this.player) {
      this.player.stop();
    }
  }

  stop(): void {
    if (this.player) {
      this.player.stop();
      this.player.dispose();
      this.player = null;
    }
  }

  getDuration(): number {
    return this.player?.buffer.duration || 0;
  }

  getCurrentTime(): number {
    return Tone.Transport.seconds;
  }

  seek(time: number): void {
    if (this.player) {
      this.player.stop();
      this.player.start(0, time);
    }
  }

  dispose(): void {
    this.stop();
  }
}

// Singleton instance for global audio management
export const audioManager = new AudioManager();
