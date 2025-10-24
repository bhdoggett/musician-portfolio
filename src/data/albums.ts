import { Album } from "@/types";

// Centralized album data configuration mapping to existing assets
export const albums: Album[] = [
  // Deep to Deep EP
  {
    id: "deep-to-deep",
    title: "Deep to Deep",
    type: "ep",
    coverArt: "/assets/images/deep_to_deep.jpg",
    description: "An EP exploring the depths of faith and worship",
    songs: [
      {
        id: "faithful-one",
        title: "Faithful One",
        audioUrl: "/assets/music/deep_to_deep/faithful_one.m4a",
      },
      {
        id: "more-than-watchmen",
        title: "More Than Watchmen",
        audioUrl: "/assets/music/deep_to_deep/more_than_watchmen.m4a",
      },
      {
        id: "name-above-all-names",
        title: "Name Above All Names",
        audioUrl: "/assets/music/deep_to_deep/name_above_all_names.m4a",
      },
      {
        id: "o-the-fathers-love",
        title: "O The Father's Love",
        audioUrl: "/assets/music/deep_to_deep/o_the_fathers_love.m4a",
      },
      {
        id: "romans-doxology",
        title: "Romans Doxology",
        audioUrl: "/assets/music/deep_to_deep/romans_doxology.m4a",
      },
    ],
  },

  // Glad EP
  {
    id: "glad",
    title: "Glad",
    type: "ep",
    coverArt: "/assets/images/glad.jpeg",
    description: "Songs that mark a season of fighting for joy",
    songs: [
      {
        id: "a-whole-years-wages",
        title: "A Whole Year's Wages",
        audioUrl: "/assets/music/glad/a_whole_years_wages.m4a",
      },
      {
        id: "abba-father",
        title: "Abba Father",
        audioUrl: "/assets/music/glad/abba_father.m4a",
      },
      {
        id: "hope-of-glory",
        title: "Hope of Glory",
        audioUrl: "/assets/music/glad/hope_of_glory.m4a",
      },
      {
        id: "make-me-glad",
        title: "Make Me Glad",
        audioUrl: "/assets/music/glad/make_me_glad.m4a",
      },
      {
        id: "o-my-soul",
        title: "O My Soul",
        audioUrl: "/assets/music/glad/o_my_soul.m4a",
      },
      {
        id: "poor-in-spirit",
        title: "Poor in Spirit",
        audioUrl: "/assets/music/glad/poor_in_spirit.m4a",
      },
      {
        id: "soul-be-stirred",
        title: "Soul Be Stirred",
        audioUrl: "/assets/music/glad/soul_be_stirred.m4a",
      },
      {
        id: "speak-to-me",
        title: "Speak to Me",
        audioUrl: "/assets/music/glad/speak_to_me.m4a",
      },
      {
        id: "whatever-was-to-my-profit",
        title: "Whatever Was to My Profit",
        audioUrl: "/assets/music/glad/whatever_was_to_my_profit.m4a",
      },
      {
        id: "why-are-you-downcast",
        title: "Why Are You Downcast",
        audioUrl: "/assets/music/glad/why_are_you_downcast.m4a",
      },
    ],
  },

  // Singles
  {
    id: "love-1-corinthians-13",
    title: "Love (1 Corinthians 13)",
    type: "single",
    coverArt: "/assets/images/love_1_corinthians_13.jpg",
    description: "A musical meditation on the love chapter",
    songs: [
      {
        id: "love-1-corinthians-13",
        title: "Love (1 Corinthians 13)",
        audioUrl: "/assets/music/1_corinthians_13_love.m4a",
      },
    ],
  },

  {
    id: "psalm-23-shepherd-me",
    title: "Psalm 23 (Shepherd Me)",
    type: "single",
    coverArt: "/assets/images/psalm_23.jpg",
    description: "The Lord is my shepherd, I shall not want",
    songs: [
      {
        id: "psalm-23-shepherd-me",
        title: "Psalm 23 (Shepherd Me)",
        audioUrl: "/assets/music/psalm_23_shepherd_me.m4a",
      },
    ],
  },

  {
    id: "psalm-27-one-thing",
    title: "Psalm 27 (One Thing)",
    type: "single",
    coverArt: "/assets/images/psalm_27.jpg",
    description: "One thing I ask from the Lord, this only do I seek",
    songs: [
      {
        id: "psalm-27-one-thing",
        title: "Psalm 27 (One Thing)",
        audioUrl: "/assets/music/psalm_27_one_thing.m4a",
      },
    ],
  },

  {
    id: "psalm-63-better-than-life",
    title: "Psalm 63 (Better Than Life)",
    type: "single",
    coverArt: "/assets/images/psalm_63.jpg",
    description: "Your love is better than life, my lips will glorify you",
    songs: [
      {
        id: "psalm-63-better-than-life",
        title: "Psalm 63 (Better Than Life)",
        audioUrl: "/assets/music/psalm_63_better_than_life.m4a",
      },
    ],
  },

  {
    id: "son-of-glory-john-1",
    title: "Son of Glory (John 1)",
    type: "single",
    coverArt: "/assets/images/son_of_glory.jpg",
    description: "In the beginning was the Word, and the Word was with God",
    songs: [
      {
        id: "son-of-glory-john-1",
        title: "Son of Glory (John 1)",
        audioUrl: "/assets/music/son_of_glory_john_1.m4a",
      },
    ],
  },
];

// Helper functions for working with album data
export const getAlbumById = (id: string): Album | undefined => {
  return albums.find((album) => album.id === id);
};

export const getAlbumsByType = (type: "single" | "ep"): Album[] => {
  return albums.filter((album) => album.type === type);
};

export const getAllAlbums = (): Album[] => {
  return albums;
};
