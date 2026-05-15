import { notFound } from "next/navigation";

import { games, getGameById, getGameLevel } from "@/data/games";
import { GameStartClient } from "@/components/game/game-start-client";

export function generateStaticParams() {
  return games.flatMap((game) =>
    game.levels.map((level) => ({
      gameId: game.id,
      level: String(level.level),
    })),
  );
}

export default async function GameStartPage({
  params,
}: {
  params: Promise<{ gameId: string; level: string }>;
}) {
  const { gameId, level } = await params;
  const levelNumber = Number(level);

  if (!Number.isInteger(levelNumber) || levelNumber < 1) {
    notFound();
  }

  const game = getGameById(gameId);
  const gameLevel = getGameLevel(gameId, levelNumber);

  if (!game || !gameLevel || !gameLevel.active) {
    notFound();
  }

  const nextLevel = game.levels.find(
    (candidateLevel) => candidateLevel.level === gameLevel.level + 1 && candidateLevel.active,
  );

  return (
    <GameStartClient
      key={`${game.id}-${gameLevel.level}`}
      level={gameLevel}
      chooseLevelHref={game.howToPlay.chooseLevelHref}
      nextLevelHref={nextLevel?.href}
    />
  );
}
