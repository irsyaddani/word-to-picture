import type { CSSProperties } from "react";
import { useDraggable } from "@dnd-kit/core";

import type { GameAnswerOption } from "@/types/game";
import { AnswerCard } from "@/components/ui/answer-card";

export type DraggableAnswerCardProps = {
  answer: GameAnswerOption;
  disabled?: boolean;
  shakeHint?: boolean;
};

export function DraggableAnswerCard({
  answer,
  disabled = false,
  shakeHint = false,
}: DraggableAnswerCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: answer.id,
    disabled,
  });

  const style: CSSProperties = {
    touchAction: "none",
    ...(transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : {}),
  };
  const hintClass = shakeHint && !disabled && !isDragging
    ? "animate-[hintWiggle_0.5s_ease-in-out_0.4s_1]"
    : "";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`shrink-0 touch-none select-none ${hintClass} ${disabled ? "pointer-events-none opacity-60" : isDragging ? "opacity-40" : ""}`}
    >
      <AnswerCard state="default" disabled={disabled} className="min-w-0 px-3 sm:px-4">
        {answer.label}
      </AnswerCard>
    </div>
  );
}
