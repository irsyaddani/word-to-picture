"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { audioAssets } from "@/lib/audio";

function getBgmSrc(pathname: string): string | null {
  if (pathname.startsWith("/game-start/")) {
    return null;
  }

  return audioAssets.bgm.game;
}

export function BackgroundMusic() {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    const unlockAudio = () => {
      void audio.play().catch(() => undefined);
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };

    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const src = getBgmSrc(pathname);

    if (src === null) {
      audio.pause();
      audio.currentTime = 0;
      return;
    }

    if (audio.src.endsWith(src)) {
      if (audio.paused) {
        void audio.play().catch(() => undefined);
      }
      return;
    }

    audio.pause();
    audio.src = src;
    audio.currentTime = 0;
    void audio.play().catch(() => undefined);
  }, [pathname]);

  return null;
}
