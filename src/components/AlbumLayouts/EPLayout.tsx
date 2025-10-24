"use client";

import React from "react";
import { Album } from "@/types";
import { SongList } from "@/components/SongList";
import styles from "./AlbumLayouts.module.css";

interface EPLayoutProps {
  album: Album;
}

export const EPLayout: React.FC<EPLayoutProps> = ({ album }) => {
  return (
    <div className={styles.epLayout}>
      <SongList songs={album.songs} albumType={album.type} album={album} />
    </div>
  );
};

export default EPLayout;
