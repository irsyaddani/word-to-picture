import Link from "next/link";

import { Button } from "@/components/ui/button";
import { LogoutIcon, PlayIcon, ReplayIcon } from "@/components/game/game-icons";

type PauseModalProps = {
  chooseLevelHref: string;
  onResume: () => void;
  onReplay: () => void;
};

export function PauseModal({ chooseLevelHref, onResume, onReplay }: PauseModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pause-title"
    >
      <div className="relative flex w-full max-w-95 flex-col items-center gap-6 rounded-[36px] bg-parchment-50 p-7 shadow-[0px_2px_12px_rgba(15,15,15,0.1),inset_0px_-6px_0px_0px_var(--color-parchment-base)]">
        <h2
          id="pause-title"
          className="text-display3 text-stroke-4 text-stroke-white text-center text-state-feature-darker [text-shadow:0px_2px_12px_rgba(15,15,15,0.1)]"
        >
          Game Paused
        </h2>

        <div className="flex w-full flex-col gap-3">
          <Button
            type="button"
            variant="confirm"
            size="lg"
            leftIcon={<PlayIcon />}
            className="w-full"
            onClick={onResume}
          >
            Resume
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button asChild variant="error" size="lg" leftIcon={<LogoutIcon />} className="w-full">
              <Link href={chooseLevelHref}>Exit</Link>
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              leftIcon={<ReplayIcon />}
              className="w-full"
              onClick={onReplay}
            >
              Replay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
