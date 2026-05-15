import Link from "next/link";

import { Button } from "@/components/ui/button";
import { GameBackground } from "@/components/ui/background";

function AwardIcon() {
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
        d="M12 2.25 5.25 5.5v5.65c0 4.25 2.85 8.18 6.75 9.35 3.9-1.17 6.75-5.1 6.75-9.35V5.5L12 2.25Z"
        fill="currentColor"
      />
      <path
        d="M12 6.75 13.38 9.3l2.87.52-2 2.09.39 2.84L12 13.52l-2.64 1.23.39-2.84-2-2.09 2.87-.52L12 6.75Z"
        fill="var(--color-state-information-base)"
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

export default function Home() {
  return (
    <GameBackground>
      <main className="flex min-h-screen w-full items-center justify-center px-6 py-16 text-center sm:px-10 lg:px-20">
        <section className="flex w-full max-w-160 flex-col items-center gap-10 sm:gap-15">
          <div className="flex flex-col items-center gap-4 [text-shadow:0px_2px_12px_rgba(15,15,15,0.1)]">
            <h1 className="text-display1 text-stroke-4 text-stroke-white text-state-feature-darker sm:text-display1">
              WORD TO PICTURE
            </h1>
            <p className="text-b3-extrabold max-w-95.25 text-text-strong sm:text-b2-extrabold">
              Tarik kata, pasangkan gambar, dan kumpulkan lencananya!
            </p>
          </div>

          <div className="flex w-full max-w-[320px] flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              leftIcon={<AwardIcon />}
              className="w-full sm:w-auto"
            >
              My Badges
            </Button>
            <Button
              asChild
              variant="primary"
              size="lg"
              rightIcon={<ArrowRightIcon />}
              className="w-full sm:w-auto"
            >
              <Link href="/choose-game">Let&apos;s Play</Link>
            </Button>
          </div>
        </section>

      </main>
    </GameBackground>
  );
}
