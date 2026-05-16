import type { GameAnswerOption, GameLevelRound } from "@/types/game";
import { ImageContainer } from "@/components/ui/image-container";
import { AnswerDropZone } from "@/components/game/answer-drop-zone";

type GamePromptAreaProps = {
  round: GameLevelRound;
  placedAnswer?: GameAnswerOption;
  isCorrect: boolean;
  hasError: boolean;
  progressValue: number;
  totalRounds: number;
};

export function GamePromptArea({
  round,
  placedAnswer,
  isCorrect,
  hasError,
  progressValue,
  totalRounds,
}: GamePromptAreaProps) {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-5 px-5 py-8 sm:px-10 lg:px-20">
      <div className="flex w-full max-w-120 flex-col gap-5">
        <div className="relative">
          <ImageContainer
            imageSrc={round.promptImageSrc}
            alt={round.promptImageAlt}
            className={`max-w-none ${hasError ? "animate-[shake_0.4s_ease-in-out]" : ""}`}
          />
          {/* <div
            className="absolute -bottom-2 left-1/2 z-10 -translate-x-1/2 rounded-full border border-neutral-200 bg-bg-weak px-4 py-1.5 shadow-[0px_2px_12px_rgba(15,15,15,0.1)]"
            aria-label={`Progress ${progressValue} dari ${totalRounds}`}
          >
            <p className="text-b3-extrabold text-text-strong">
              {progressValue} / {totalRounds}
            </p>
          </div> */}
        </div>
        <AnswerDropZone answer={placedAnswer} isCorrect={isCorrect} />
      </div>
    </section>
  );
}
