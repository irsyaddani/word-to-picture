import Link from "next/link";
import { notFound } from "next/navigation";

import { games, getGameById } from "@/data/games";
import { GameBackground } from "@/components/ui/background";
import { Button } from "@/components/ui/button";

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

function ArrowRightIcon() {
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
        d="M5 12h14m-5.25-5.25L19 12l-5.25 5.25"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function generateStaticParams() {
  return games.map((game) => ({ gameId: game.id }));
}

export default async function HowToPlayPage({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = await params;
  const game = getGameById(gameId);

  if (!game) {
    notFound();
  }

  return (
    <GameBackground className="bg-[var(--color-parchment-100)]">
      <main className="flex min-h-screen flex-col">
        <header className="grid min-h-[100px] grid-cols-[auto_1fr] items-center gap-4 bg-white/20 px-5 py-4 sm:grid-cols-[234px_1fr_234px] sm:px-6">
          <div className="flex items-center gap-3">
            <Button asChild variant="neutral" size="lg" iconOnly>
              <Link href="/choose-game" aria-label="Kembali ke pilih permainan">
                <ArrowLeftIcon />
              </Link>
            </Button>
            <Button type="button" variant="secondary" size="lg" iconOnly aria-label="Suara">
              <VolumeIcon />
            </Button>
          </div>

          <h1 className="text-display3 text-stroke-4 text-stroke-white text-center text-state-feature-darker [text-shadow:0px_2px_12px_rgba(15,15,15,0.1)] sm:text-display2">
            HOW TO PLAY?
          </h1>

          <div className="col-span-2 flex flex-col items-end gap-1 text-right sm:col-span-1">
            <p className="text-h6-extrabold text-stroke-4 text-stroke-white text-purple-600">{game.title}</p>
            {/* <p className="text-b3-semibold text-text-white sm:text-b4-semibold">
              {game.description}
            </p> */}
          </div>
        </header>

        <section className="flex flex-1 items-start justify-center px-5 py-9 sm:px-10 lg:px-20">
          <div className="flex w-full max-w-[570px] flex-col items-end gap-10">
            <div className="w-full rounded-[36px] bg-[var(--color-parchment-50)] p-6 shadow-[0px_2px_12px_rgba(15,15,15,0.1),inset_0px_-6px_0px_0px_var(--color-parchment-base)] sm:p-8">
              <ol className="list-decimal space-y-3 pl-6 text-b2-semibold text-text-strong sm:text-b1-semibold">
                {game.howToPlay.instructions.map((instruction) => (
                  <li key={instruction} className="pl-1">
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>

            <Button
              asChild
              variant="primary"
              size="lg"
              rightIcon={<ArrowRightIcon />}
              className="w-full sm:w-auto"
            >
              <Link href={game.howToPlay.chooseLevelHref}>Choose Level</Link>
            </Button>
          </div>
        </section>
      </main>
    </GameBackground>
  );
}
