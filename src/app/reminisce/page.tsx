"use client";

import React from "react";
import { NavBar } from "../../components/NavBar/NavBar";
import styles from "./page.module.css";
import Link from "next/link";

export default function ReminiscePage() {
  return (
    <div>
      <NavBar />
      <main className={styles.main}>
        <p>
          When I started writing songs in high school, a friend of mine who was
          into film-making had the grand idea of pointing his video camera at
          me, scraping the audio from the resulting file, burning it to a CD,
          and that was my first “release.” I’m not going to share those songs
          with you. Lol. But it’s fun to look back and see where this journey
          has taken me since then. Later in high school, and through college, I
          spent hours at friends’ houses, using their recording equipment to put
          some tracks down that I could share with family and friends. Nothing
          fancy, just vocals and guitar. This resulted in a few song collections
          that I burned onto CD’s and passed around. (I’m also not planning to
          share those songs here…)
        </p>
        <p>
          After graduating college, a friend offered to produce an release for
          me. Much of it was recorded in another friend’s basement, with a
          studio session to record drums and a session in my parent’s basement
          to record strings and group vocals. The result of all this was my
          release{" "}
          <Link
            href="/releases/glad"
            className={`${styles.link} ${styles.releaseLink}`}
          >
            Glad
          </Link>
          , released in 2012, full of songs written through a season of
          depression and anxiety.
        </p>
        <p>
          Throughout the production of <em>Glad</em>, and for the next few
          years, I wrote more songs than I had the time to put a full production
          behind, so I started a{" "}
          <Link
            href="https://bendoggettmusic.blogspot.com/"
            className={styles.link}
          >
            blog
          </Link>{" "}
          and a{" "}
          <Link
            href="https://soundcloud.com/bendoggett/sets/music-meditations"
            className={styles.link}
          >
            Soundcloud playlist
          </Link>{" "}
          where I continued to upload “songs I recorded in my room.”
        </p>
        <p>
          One year after <em>Glad</em>, I mustered up the gumption to cold-email
          some{" "}
          <Link href="https://edcash.com/home" className={styles.link}>
            well-known producers
          </Link>{" "}
          in Nashville to see if they would be interested in producing my next
          collection of songs. I was INCREDIBLY surprised when I got an email
          back saying, “Yep, we’re in!” The result was my EP,{" "}
          <Link
            href="/releases/deep-to-deep"
            className={`${styles.link} ${styles.releaseLink}`}
          >
            Deep to Deep
          </Link>
          , released in 2013. This project is made up of five songs that I wrote
          for my home church at the eager encouragement of my pastor, songs that
          we could sing together in response to the ways were learning and
          growing collectively. These are songs that I continue to be proud of,
          with a production that is so creative and excellent that I can enjoy
          them as something no longer my own.
        </p>
        <p>
          <em>Deep to Deep</em> was not cheap to make. When I pulled the trigger
          on that project, I was young and married and had some ambitious hopes
          of “making it big” some day. I had some savings, but I <em>didn’t</em>{" "}
          have a mortgage or children (yet). As life would have it, it would be
          some time before I was able to invest in music production again, and
          this time it would be slow and steady, in my own basement, watching
          YouTube videos on how to use EQ plugins, compressors, and reverb,
          borrowing mics from friends, purchasing some of my own, etc, etc, etc.
        </p>
        <p>
          In 2022 I released my first-in-a-long-time solo-produced song,{" "}
          <Link
            href="/releases/love-1-corinthians-13"
            className={`${styles.link} ${styles.releaseLink}`}
          >
            Love (1 Corinthians 13)
          </Link>
          . It was invigorating to learn how to get behind the creative process
          of producing my own original songs. After <em>Love</em>, I continued
          the slow and steady pace, releasing a few singles over the next few
          years:{" "}
          <Link
            href="/releases/one-thing-psalm-27"
            className={`${styles.link} ${styles.releaseLink}`}
          >
            One Thing (Psalm 27)
          </Link>
          ,{" "}
          <Link
            href="/releases/psalm-23-shepherd-me"
            className={`${styles.link} ${styles.releaseLink}`}
          >
            Psalm 23 (Shepherd Me)
          </Link>
          ,{" "}
          <Link
            href="/releases/psalm-63-better-than-life"
            className={`${styles.link} ${styles.releaseLink}`}
          >
            Psalm 63 (Better than Life)
          </Link>
          ,{" "}
          <Link
            href="/releases/son-of-glory-john-1"
            className={`${styles.link} ${styles.releaseLink}`}
          >
            {" "}
            and Son of Glory (John 1)
          </Link>
          .
        </p>
      </main>
    </div>
  );
}
