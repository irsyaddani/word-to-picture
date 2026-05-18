"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { GameOption } from "@/types/game";
import { getLevelStars } from "@/components/game/progress-storage";
import { GameBackground } from "@/components/ui/background";
import { Button } from "@/components/ui/button";
import { CardLevel } from "@/components/ui/card-level";
import { HomeIcon } from "@/components/game/game-icons";

function ArrowLeftIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M15 5 8 12l7 7"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4 9.5v5h3.35L12 18.25V5.75L7.35 9.5H4Z"
        fill="currentColor"
      />
      <path
        d="M15.25 8.25a5.25 5.25 0 0 1 0 7.5M17.75 5.75a8.75 8.75 0 0 1 0 12.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

type ChooseLevelClientProps = {
  game: GameOption;
};

export function ChooseLevelClient({ game }: ChooseLevelClientProps) {
  const [starsByLevel, setStarsByLevel] = useState<Record<number, number>>({});

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setStarsByLevel(
        Object.fromEntries(
          game.levels.map((level) => [level.level, getLevelStars(game.id, level.level)]),
        ),
      );
    }, 0);

    return () => window.clearTimeout(timerId);
  }, [game]);

  return (
    <GameBackground className="bg-parchment-100">
      <main className="flex min-h-screen flex-col">
        <header className="flex min-h-22 items-center justify-between gap-4 bg-white/20 px-5 py-4 sm:min-h-26 sm:px-6">
          <Button asChild variant="neutral" size="lg" iconOnly>
            <Link href="/choose-game" aria-label="Kembali ke beranda">
              <ArrowLeftIcon />
            </Link>
          </Button>

          <h1 className="text-display3 text-stroke-4 text-stroke-white text-center text-state-feature-darker [text-shadow:0px_2px_12px_rgba(15,15,15,0.1)] sm:text-display2">
            Choose Your Mission!
          </h1>

          <Button asChild variant="secondary" size="lg" iconOnly>
            <Link href="/" aria-label="Kembali ke beranda">
              <HomeIcon />
            </Link>
          </Button>
        </header>

        <section className="flex flex-1 items-center overflow-hidden px-5 py-9 sm:px-10 lg:px-20">
          <div className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto px-1 pb-4 pt-1 lg:justify-center">
            {game.levels.map((level) => {
              const stars = starsByLevel[level.level] ?? 0;
              const active = level.level === 1 || (starsByLevel[1] ?? 0) >= 2;

              return (
                <CardLevel
                  key={level.level}
                  level={level.level}
                  active={active}
                  stars={stars}
                  href={active ? level.href : undefined}
                  unlockMessage="Reach level 2 to unlock"
                  className="shrink-0 snap-start"
                />
              );
            })}
          </div>
        </section>
      </main>
    </GameBackground>
  );
}
