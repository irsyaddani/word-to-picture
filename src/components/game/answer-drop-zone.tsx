import { useDroppable } from "@dnd-kit/core";

import type { GameAnswerOption } from "@/types/game";
import { AnswerCard } from "@/components/ui/answer-card";

export const DROP_ZONE_ID = "answer-drop-zone";

type AnswerDropZoneProps = {
  answer?: GameAnswerOption;
  isCorrect: boolean;
};

export function AnswerDropZone({ answer, isCorrect }: AnswerDropZoneProps) {
  const { setNodeRef, isOver } = useDroppable({ id: DROP_ZONE_ID });
  const answerText = answer && isCorrect && answer.meaning
    ? `${answer.label} = ${answer.meaning}`
    : answer?.label;

  return (
    <div ref={setNodeRef} className="w-full" aria-label="Drop answer here">
      <AnswerCard
        state={answer ? (isCorrect ? "true" : "default") : "placeholder"}
        className={`w-full ${isOver ? "scale-[1.02] ring-4 ring-white/70" : ""}`}
      >
        {answerText ?? "Answer"}
      </AnswerCard>
    </div>
  );
}
