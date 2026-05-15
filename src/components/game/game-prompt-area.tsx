import type { GameAnswerOption, GameLevelRound } from "@/types/game";
import { ImageContainer } from "@/components/ui/image-container";
import { AnswerDropZone } from "@/components/game/answer-drop-zone";

type GamePromptAreaProps = {
  round: GameLevelRound;
  placedAnswer?: GameAnswerOption;
  isCorrect: boolean;
  hasError: boolean;
};

export function GamePromptArea({
  round,
  placedAnswer,
  isCorrect,
  hasError,
}: GamePromptAreaProps) {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-5 px-5 py-8 sm:px-10 lg:px-20">
      <div className="flex w-full max-w-120 flex-col gap-5">
        <ImageContainer
          imageSrc={round.promptImageSrc}
          alt={round.promptImageAlt}
          className={`max-w-none ${hasError ? "animate-[shake_0.4s_ease-in-out]" : ""}`}
        />
        <AnswerDropZone answer={placedAnswer} isCorrect={isCorrect} />
      </div>
    </section>
  );
}
