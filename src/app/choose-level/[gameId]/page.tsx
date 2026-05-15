import { notFound } from "next/navigation";

import { games, getGameById } from "@/data/games";
import { ChooseLevelClient } from "./choose-level-client";

export function generateStaticParams() {
  return games.map((game) => ({ gameId: game.id }));
}

export default async function ChooseLevelPage({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = await params;
  const game = getGameById(gameId);

  if (!game) {
    notFound();
  }

  return <ChooseLevelClient game={game} />;
}
