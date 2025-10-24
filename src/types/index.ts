// Core data models for the artist portfolio

export interface Song {
  id: string;
  title: string;
  audioUrl: string;
  lyrics?: string;
  copyright?: string;
  duration?: number;
}

export interface Album {
  id: string;
  title: string;
  type: "single" | "ep";
  coverArt: string;
  songs: Song[];
  description?: string;
}

// Audio player related types
export interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export interface AudioPlayerState {
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  error?: string;
}

// Component prop types
export interface AlbumCardProps {
  album: Album;
  onClick: () => void;
}

export interface SongListProps {
  songs: Song[];
  albumType: "single" | "ep";
  album: Album;
}
