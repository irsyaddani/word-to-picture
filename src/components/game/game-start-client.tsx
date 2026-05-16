"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import type { GameLevel, GameLevelRound } from "@/types/game";
import { AnswerCard } from "@/components/ui/answer-card";
import { GameBackground } from "@/components/ui/background";
import { Notification } from "@/components/ui/notification";
import { DROP_ZONE_ID } from "@/components/game/answer-drop-zone";
import { GameAnswerFooter } from "@/components/game/game-answer-footer";
import { GameHeader } from "@/components/game/game-header";
import { GamePromptArea } from "@/components/game/game-prompt-area";
import { PauseModal } from "@/components/game/pause-modal";
import { calculateStars, getLevelStars, saveLevelStars } from "@/components/game/progress-storage";
import { SuccessModal } from "@/components/game/success-modal";

type GameStartClientProps = {
  gameId: string;
  level: GameLevel;
  chooseLevelHref: string;
  nextLevelHref?: string;
};

function formatTimer(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

const notificationMessages = {
  success: [
    "Excellent move, you nailed it!",
    "You solved it perfectly!",
    "You are shining bright today!",
    "You are unstoppable right now!",
  ],
  error: [
    "Take a deep breath and try again!",
    "Oops, a little mix-up!",
    "Almost had it, explorer!",
    "That was a tricky one!",
  ],
};

function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffleArray<T>(items: T[]): T[] {
  const shuffledItems = [...items];

  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const targetIndex = Math.floor(Math.random() * (index + 1));
    [shuffledItems[index], shuffledItems[targetIndex]] = [
      shuffledItems[targetIndex],
      shuffledItems[index],
    ];
  }

  return shuffledItems;
}

function shuffleAnswers(round: GameLevelRound): GameLevelRound {
  const answers = shuffleArray(round.answers);

  if (answers[0]?.id === round.correctAnswerId && answers.length > 1) {
    [answers[0], answers[1]] = [answers[1], answers[0]];
  }

  return {
    ...round,
    answers,
  };
}

function shuffleRounds(rounds: GameLevelRound[]): GameLevelRound[] {
  return shuffleArray(rounds).map(shuffleAnswers);
}

export function GameStartClient({
  gameId,
  level,
  chooseLevelHref,
  nextLevelHref,
}: GameStartClientProps) {
  const router = useRouter();
  const [rounds, setRounds] = useState<GameLevelRound[]>(level.rounds);
  const [activeAnswerId, setActiveAnswerId] = useState<string | null>(null);
  const [placedAnswerId, setPlacedAnswerId] = useState<string | null>(null);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(level.durationSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const [notification, setNotification] = useState<"success" | "error" | null>(null);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [wrongAnswerCount, setWrongAnswerCount] = useState(0);
  const [earnedStars, setEarnedStars] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(3);
  const [countdownRunId, setCountdownRunId] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const currentRound = rounds[currentRoundIndex];
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 0,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor),
  );

  const placedAnswer = useMemo(
    () => currentRound.answers.find((answer) => answer.id === placedAnswerId),
    [currentRound.answers, placedAnswerId],
  );
  const activeAnswer = useMemo(
    () => currentRound.answers.find((answer) => answer.id === activeAnswerId),
    [activeAnswerId, currentRound.answers],
  );
  const availableAnswers = currentRound.answers.filter(
    (answer) => answer.id !== placedAnswerId,
  );
  const isCorrect = placedAnswer?.id === currentRound.correctAnswerId;
  const isLastRound = currentRoundIndex === rounds.length - 1;
  const isInteractionDisabled = countdown !== null || isPaused || notification !== null || showSuccessModal;
  const progressValue = isCorrect ? currentRoundIndex + 1 : currentRoundIndex;
  const potentialStars = calculateStars(wrongAnswerCount);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setRounds(shuffleRounds(level.rounds));
    }, 0);

    return () => window.clearTimeout(timerId);
  }, [level.rounds]);

  useEffect(() => {
    if (level.level === 2 && getLevelStars(gameId, 1) < 2) {
      router.replace(chooseLevelHref);
    }
  }, [chooseLevelHref, gameId, level.level, router]);

  useEffect(() => {
    if (notification === "error") {
      const timer = window.setTimeout(() => {
        setNotification(null);
        setPlacedAnswerId(null);
      }, 700);
      return () => window.clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    const steps = [3, 2, 1, 0] as const;
    let stepIndex = 0;

    const intervalId = window.setInterval(() => {
      stepIndex += 1;

      if (stepIndex >= steps.length) {
        window.clearInterval(intervalId);
        setCountdown(null);
        return;
      }

      setCountdown(steps[stepIndex]);
    }, 1000);

    const fallbackId = window.setTimeout(() => {
      window.clearInterval(intervalId);
      setCountdown(null);
    }, 4500);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(fallbackId);
    };
  }, [countdownRunId]);

  useEffect(() => {
    if (countdown !== null || showSuccessModal || isPaused || timeLeft <= 0) {
      return;
    }

    const timerId = window.setInterval(() => {
      setTimeLeft((currentTime) => Math.max(0, currentTime - 1));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [countdown, showSuccessModal, isPaused, timeLeft]);

  function handlePause() {
    setActiveAnswerId(null);
    setIsPaused(true);
  }

  function handleResume() {
    setIsPaused(false);
  }

  function handleReplay() {
    setRounds(shuffleRounds(level.rounds));
    setCurrentRoundIndex(0);
    setActiveAnswerId(null);
    setPlacedAnswerId(null);
    setTimeLeft(level.durationSeconds);
    setIsPaused(false);
    setNotification(null);
    setNotificationMessage("");
    setWrongAnswerCount(0);
    setEarnedStars(0);
    setCountdown(3);
    setCountdownRunId((runId) => runId + 1);
    setShowSuccessModal(false);
  }

  function submitAnswer(answerId: string) {
    if (isInteractionDisabled || isCorrect) {
      return;
    }

    setPlacedAnswerId(answerId);

    if (answerId === currentRound.correctAnswerId) {
      setNotificationMessage(getRandomItem(notificationMessages.success));
      setNotification("success");
      if (isLastRound) {
        const stars = calculateStars(wrongAnswerCount);
        const bestStars = saveLevelStars(gameId, level.level, stars);
        setEarnedStars(bestStars);
        window.setTimeout(() => {
          setShowSuccessModal(true);
        }, 1200);
      }
    } else {
      setWrongAnswerCount((count) => count + 1);
      setNotificationMessage(getRandomItem(notificationMessages.error));
      setNotification("error");
    }
  }

  function handleNextRound() {
    if (currentRoundIndex < rounds.length - 1) {
      setRounds((currentRounds) => currentRounds.map((round, index) => (
        index === currentRoundIndex + 1 ? shuffleAnswers(round) : round
      )));
      setCurrentRoundIndex((prev) => prev + 1);
      setPlacedAnswerId(null);
      setNotification(null);
    }
  }

  function handleDragStart(event: DragStartEvent) {
    if (isInteractionDisabled) {
      return;
    }
    setActiveAnswerId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    if (event.over?.id === DROP_ZONE_ID) {
      submitAnswer(String(event.active.id));
    }
    setActiveAnswerId(null);
  }

  function handleDragCancel() {
    setActiveAnswerId(null);
  }

  return (
    <GameBackground className="bg-parchment-100">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <main className="flex min-h-screen flex-col">
          <GameHeader
            title={level.title}
            timeLeft={formatTimer(timeLeft)}
            progressValue={progressValue}
            totalRounds={level.totalRounds}
            pauseDisabled={countdown !== null || showSuccessModal}
            onPause={handlePause}
          />

          <GamePromptArea
            round={currentRound}
            placedAnswer={placedAnswer}
            isCorrect={isCorrect}
            hasError={notification === "error"} progressValue={0} totalRounds={0}          />

          <GameAnswerFooter
            isCorrect={isCorrect}
            isLastRound={isLastRound}
            availableAnswers={availableAnswers}
            interactionDisabled={isInteractionDisabled}
            shakeHint={countdown === null}
            onNextRound={handleNextRound}
          />
        </main>

        <DragOverlay>
          {activeAnswer ? <AnswerCard state="default">{activeAnswer.label}</AnswerCard> : null}
        </DragOverlay>

        {countdown !== null && (
          <div
            className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            aria-live="assertive"
            aria-label={countdown === 0 ? "Go!" : `Mulai dalam ${countdown}`}
          >
            <div className="flex flex-col items-center gap-4">
              {countdown > 0 ? (
                <>
                  <span
                    key={countdown}
                    className="text-[120px] font-extrabold leading-none text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)] animate-[countdownPop_0.4s_cubic-bezier(0.34,1.56,0.64,1)_both]"
                    style={{ fontFamily: "var(--font-heading)", textShadow: "0 0 40px rgba(140,35,222,0.8)" }}
                  >
                    {countdown}
                  </span>
                  <p className="text-b1-extrabold text-white/80 tracking-widest uppercase">
                    Get Ready!
                  </p>
                </>
              ) : (
                <span
                  key="go"
                  className="text-[80px] font-extrabold leading-none text-yellow-300 drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)] animate-[countdownPop_0.4s_cubic-bezier(0.34,1.56,0.64,1)_both]"
                  style={{ fontFamily: "var(--font-heading)", textShadow: "0 0 40px rgba(254,199,0,0.9)" }}
                >
                  GO! 🚀
                </span>
              )}
            </div>
          </div>
        )}

        {notification !== null && (
          <div
            className="pointer-events-none fixed inset-0 z-40 flex items-start justify-center pt-30"
            aria-live="polite"
          >
            <div className="animate-[fadeInUp_0.3s_ease-out]">
              <Notification
                type={notification === "success" ? "success" : "error"}
                message={notificationMessage}
              />
            </div>
          </div>
        )}

        {isPaused ? (
          <PauseModal
            chooseLevelHref={chooseLevelHref}
            onResume={handleResume}
            onReplay={handleReplay}
          />
        ) : null}

        {showSuccessModal ? (
          <SuccessModal
            levelTitle={level.title}
            stars={earnedStars}
            chooseLevelHref={chooseLevelHref}
            nextLevelHref={nextLevelHref}
            onReplay={handleReplay}
          />
        ) : null}
      </DndContext>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes countdownPop {
          from { opacity: 0; transform: scale(0.4); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        @keyframes hintWiggle {
          0%, 100% { transform: rotate(0deg); }
          15% { transform: rotate(-4deg) translate(-2px, 0); }
          30% { transform: rotate(3deg) translate(2px, 0); }
          45% { transform: rotate(-3deg) translate(-1px, 0); }
          60% { transform: rotate(2deg) translate(1px, 0); }
          75% { transform: rotate(0deg); }
        }
      `}</style>
    </GameBackground>
  );
}
