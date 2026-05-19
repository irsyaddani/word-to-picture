import type { GameAnswerOption } from "@/types/game";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/game/game-icons";
import { DraggableAnswerCard } from "@/components/game/draggable-answer-card";

type GameAnswerFooterProps = {
  isCorrect: boolean;
  isLastRound: boolean;
  availableAnswers: GameAnswerOption[];
  interactionDisabled: boolean;
  shakeHint: boolean;
  onNextRound: () => void;
};

export function GameAnswerFooter({
  isCorrect,
  isLastRound,
  availableAnswers,
  interactionDisabled,
  shakeHint,
  onNextRound,
}: GameAnswerFooterProps) {
  return (
    <footer className="bg-parchment-50 px-3 py-5 sm:px-5 sm:py-10">
      {isCorrect ? (
        <div className="mx-auto flex max-w-120 justify-center">
          {!isLastRound && (
            <Button
              type="button"
              variant="primary"
              size="lg"
              rightIcon={<ArrowRightIcon />}
              onClick={onNextRound}
            >
              Next
            </Button>
          )}
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-none flex-nowrap items-center justify-center gap-2 sm:gap-3">
          {availableAnswers.map((answer) => (
            <DraggableAnswerCard
              key={answer.id}
              answer={answer}
              disabled={interactionDisabled}
              shakeHint={shakeHint}
            />
          ))}
        </div>
      )}
    </footer>
  );
}
