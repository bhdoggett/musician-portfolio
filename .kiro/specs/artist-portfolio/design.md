# Design Document

## Overview

The artist portfolio website is built on Next.js 16 with React 19, utilizing the App Router architecture. The system provides a modern organic interface for browsing and playing musical works, with responsive design and interactive audio capabilities powered by Tone.js.

The application follows a component-based architecture with CSS modules for styling, creating a cohesive visual experience that emphasizes the artistic nature of the content while maintaining excellent usability across devices.

## Architecture

### Application Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with global styles
│   ├── page.tsx                # Home/Discography page
│   ├── globals.css             # Global CSS variables and base styles
│   └── albums/
│       └── [slug]/
│           └── page.tsx        # Dynamic album pages
├── components/
│   ├── AlbumCard/
│   │   ├── AlbumCard.tsx       # Reusable album card component
│   │   └── AlbumCard.module.css
│   ├── AudioPlayer/
│   │   ├── AudioPlayer.tsx     # Tone.js-powered audio player
│   │   └── AudioPlayer.module.css
│   ├── SongList/
│   │   ├── SongList.tsx        # Interactive song list for EPs
│   │   └── SongList.module.css
│   └── Layout/
│       ├── Navigation.tsx      # Site navigation
│       └── Navigation.module.css
├── data/
│   └── albums.ts               # Album metadata and configuration
├── types/
│   └── index.ts                # TypeScript type definitions
└── utils/
    └── audio.ts                # Tone.js utilities and helpers
```

### Technology Stack

- **Framework**: Next.js 16 with App Router
- **UI Library**: React 19
- **Styling**: CSS Modules + Global CSS
- **Audio**: Tone.js for audio playback and analysis
- **TypeScript**: Full type safety
- **Assets**: Static files served from public/assets/

## Components and Interfaces

### Core Components

#### AlbumCard Component

```typescript
interface AlbumCardProps {
  album: Album;
  onClick: () => void;
}
```

- Displays album cover art as primary visual element
- Handles click navigation to album pages
- Responsive design with hover effects
- Prioritizes JPG format for optimal web performance

#### AudioPlayer Component

```typescript
interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
}
```

- Powered by Tone.js for advanced audio capabilities
- Custom controls with organic design
- Progress tracking and seek functionality
- Maintains playback state across navigation

#### SongList Component

```typescript
interface SongListProps {
  songs: Song[];
  albumType: "single" | "ep";
}
```

- Expandable song items for EPs
- Integrated lyrics and copyright display
- Embedded AudioPlayer for each track
- Smooth animations for expand/collapse

### Data Models

#### Album Interface

```typescript
interface Album {
  id: string;
  title: string;
  type: "single" | "ep";
  coverArt: string; // JPG format for optimal web performance
  songs: Song[];
  description?: string;
}
```

#### Song Interface

```typescript
interface Song {
  id: string;
  title: string;
  audioUrl: string;
  lyrics?: string;
  copyright?: string;
  duration?: number;
}
```

## Data Models

### Album Configuration

The system uses a centralized album configuration that maps to the existing asset structure:

```typescript
const albums: Album[] = [
  {
    id: "deep-to-deep",
    title: "Deep to Deep",
    type: "ep",
    coverArt: "/assets/images/deep_to_deep.jpg",

    songs: [
      {
        id: "faithful-one",
        title: "Faithful One",
        audioUrl: "/assets/music/deep_to_deep/faithful_one.m4a",
      },
      // ... additional tracks
    ],
  },
  // ... additional albums
];
```

### Routing Strategy

- **Home Page** (`/`): Discography grid with all album cards
- **Album Pages** (`/albums/[slug]`): Dynamic routing based on album ID
- **Static Generation**: Pre-render all album pages at build time

## Error Handling

### Audio Playback Errors

- Graceful fallback when Tone.js fails to load
- User-friendly error messages for unsupported audio formats
- Retry mechanisms for network-related audio loading issues

### Navigation Errors

- 404 handling for invalid album slugs
- Fallback to home page when album data is missing
- Loading states during navigation transitions

### Asset Loading

- Progressive image loading with blur placeholders
- Primary use of JPG format for album covers (optimal for photographic content)
- Lazy loading for audio files until user interaction

## Testing Strategy

### Component Testing

- Unit tests for AlbumCard click handling and prop rendering
- AudioPlayer integration tests with mocked Tone.js
- SongList expand/collapse functionality testing

### Integration Testing

- End-to-end navigation flow from discography to album pages
- Audio playback across different browsers and devices
- Responsive design testing across viewport sizes

### Performance Testing

- Audio loading and playback performance metrics
- Image optimization and loading speed analysis
- Bundle size optimization for Tone.js integration

## Visual Design System

### Color Palette (Modern Organic)

```css
:root {
  --primary-earth: #8b7355;
  --secondary-sage: #9caf88;
  --accent-terracotta: #c65d00;
  --neutral-cream: #f5f1eb;
  --neutral-charcoal: #2c2c2c;
  --surface-white: #ffffff;
  --surface-warm: #faf8f5;
}
```

### Typography

- Primary: Geist Sans (already configured)
- Monospace: Geist Mono for technical elements
- Organic spacing with natural rhythm

### Layout Principles

- Asymmetrical grid layouts with organic flow
- Generous whitespace and natural content breathing
- Curved corners and soft shadows
- Responsive breakpoints: 768px (tablet), 1024px (desktop)

### Interactive Elements

- Subtle hover animations with organic easing
- Focus states with natural color transitions
- Touch-friendly sizing for mobile devices
- Accessible contrast ratios throughout

## Performance Considerations

### Audio Optimization

- Lazy loading of Tone.js library until first audio interaction
- Audio file preloading for improved user experience
- Memory management for multiple audio instances

### Image Optimization

- Next.js Image component for automatic optimization
- WebP format support with fallbacks
- Responsive image sizing based on viewport

### Bundle Optimization

- Dynamic imports for Tone.js to reduce initial bundle size
- Tree shaking for unused CSS modules
- Code splitting at the album page level
