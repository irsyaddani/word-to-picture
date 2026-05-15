import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ClockIcon, PauseIcon } from "@/components/game/game-icons";

type GameHeaderProps = {
  title: string;
  timeLeft: string;
  progressValue: number;
  totalRounds: number;
  pauseDisabled: boolean;
  onPause: () => void;
};

export function GameHeader({
  title,
  timeLeft,
  progressValue,
  totalRounds,
  pauseDisabled,
  onPause,
}: GameHeaderProps) {
  return (
    <header className="grid min-h-25 grid-cols-[auto_1fr_auto] items-center gap-4 bg-white/20 px-5 py-4 sm:px-6">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="warning"
          size="lg"
          iconOnly
          aria-label="Pause game"
          disabled={pauseDisabled}
          onClick={onPause}
        >
          <PauseIcon />
        </Button>
      </div>

      <div className="flex h-full flex-col items-center justify-between gap-2 text-center">
        <h1 className="text-h5-extrabold text-state-feature-darker sm:text-h4-regular">
          {title}
        </h1>
        <div className="flex items-center gap-3 w-full max-w-55">
          <ProgressBar
            value={progressValue}
            total={totalRounds}
            className="flex-1"
          />
          <p className="text-b3-extrabold text-purple-700 shrink-0">
            {`${progressValue} / ${totalRounds}`}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 text-state-feature-darker">
        <ClockIcon />
        <p className="text-h5-extrabold sm:text-h4-regular">
          {timeLeft}
        </p>
      </div>
    </header>
  );
}
