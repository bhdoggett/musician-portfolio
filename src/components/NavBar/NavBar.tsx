"use client";

import React from "react";
import Link from "next/link";
import styles from "./NavBar.module.css";

export const NavBar: React.FC = () => {
  return (
    <div className={styles.navBar}>
      <Link href="/discography" className={styles.link}>
        Releases
      </Link>
      <Link href="/resources" className={styles.link}>
        Resources
      </Link>
      <Link href="/remix" className={styles.link}>
        Remix
      </Link>
      <Link href="/reminisce" className={styles.link}>
        Reminisce
      </Link>
    </div>
  );
};
