import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Star } from "@/components/ui/star";
import { LogoutIcon, PlayIcon, ReplayIcon } from "@/components/game/game-icons";

type SuccessModalProps = {
  levelTitle: string;
  stars: number;
  totalRounds: number;
  wrongAnswerCount: number;
  chooseLevelHref: string;
  nextLevelHref?: string;
  onReplay: () => void;
};

type FailedModalProps = {
  levelTitle: string;
  chooseLevelHref: string;
  onRetry: () => void;
};

function ModalLevelBanner({ levelTitle }: { levelTitle: string }) {
  return (
    <div
      className="-mt-1 rounded-b-3xl border-x-4 border-b-4 border-purple-950 bg-purple-800 px-7 py-3 text-center text-h5-extrabold uppercase text-white [text-shadow:0px_2px_12px_rgba(15,15,15,0.1)]"
    >
      {levelTitle}
    </div>
  );
}

export function SuccessModal({
  levelTitle,
  stars,
  totalRounds,
  wrongAnswerCount,
  chooseLevelHref,
  nextLevelHref,
  onReplay,
}: SuccessModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(10,10,10,0.4)] px-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
    >
      <div className="relative flex w-full max-w-95 flex-col items-center rounded-[36px] bg-parchment-50 shadow-[0px_2px_12px_rgba(15,15,15,0.1),inset_0px_-6px_0px_0px_var(--color-parchment-base)] animate-[countdownPop_0.6s_cubic-bezier(0.34,1.56,0.64,1)_both]">
        <ModalLevelBanner levelTitle={levelTitle} />

        <div className="flex w-full flex-col items-center gap-6 px-7 pb-7 pt-7">
          <div className="flex items-end justify-center -space-x-2.5" aria-label={`${stars} dari 3 bintang`}>
            <div className="animate-[countdownPop_0.5s_cubic-bezier(0.34,1.56,0.64,1)_0.4s_both]">
              <Star active={stars >= 1} size={80} />
            </div>
            <div className="animate-[countdownPop_0.5s_cubic-bezier(0.34,1.56,0.64,1)_0.6s_both]">
              <Star active={stars >= 2} size={92} />
            </div>
            <div className="animate-[countdownPop_0.5s_cubic-bezier(0.34,1.56,0.64,1)_0.8s_both]">
              <Star active={stars >= 3} size={80} />
            </div>
          </div>

          <h2
            id="success-title"
            className="text-display1 uppercase text-purple-950 [text-shadow:0px_2px_12px_rgba(15,15,15,0.1)] animate-[countdownPop_0.6s_ease-out_0.9s_both]"
          >
            COMPLETE
          </h2>

          <div className="grid w-73.5 max-w-full shrink-0 grid-cols-2 gap-3 text-center opacity-100">
            <div className="flex min-w-0 shrink-0 flex-col items-center justify-center gap-1 rounded-xl bg-parchment-100 px-4 py-3">
              <span className="text-b2-extrabold text-text-sub">Total Soal</span>
              <span className="text-h6-extrabold text-text-strong">{totalRounds}</span>
            </div>
            <div className="flex min-w-0 shrink-0 flex-col items-center justify-center gap-1 rounded-xl bg-parchment-100 px-4 py-3">
              <span className="text-b2-extrabold text-text-sub">Salah Drag</span>
              <span className="text-h6-extrabold text-state-error-base">{wrongAnswerCount}</span>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3">
            {nextLevelHref ? (
              <Button
                asChild
                variant="confirm"
                size="lg"
                leftIcon={<PlayIcon />}
                className="w-full text-b3-extrabold"
              >
                <Link href={nextLevelHref}>NEXT LEVEL</Link>
              </Button>
            ) : (
              <Button
                asChild
                variant="confirm"
                size="lg"
                leftIcon={<PlayIcon />}
                className="w-full text-b3-extrabold"
              >
                <Link href={chooseLevelHref}>FINISH!</Link>
              </Button>
            )}

            <div className="grid grid-cols-2 gap-3">
              <Button
                asChild
                variant="error"
                size="lg"
                leftIcon={<LogoutIcon />}
                className="w-full text-b3-extrabold"
              >
                <Link href={chooseLevelHref}>EXIT</Link>
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                leftIcon={<ReplayIcon />}
                className="w-full text-b3-extrabold"
                onClick={onReplay}
              >
                REPLAY
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FailedModal({
  levelTitle,
  chooseLevelHref,
  onRetry,
}: FailedModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="failed-title"
    >
      <div className="relative flex w-full max-w-95 flex-col items-center gap-6 rounded-[36px] bg-parchment-50 pb-7 pt-0 shadow-[0px_2px_12px_rgba(15,15,15,0.1),inset_0px_-6px_0px_0px_var(--color-parchment-base)] animate-[countdownPop_0.6s_cubic-bezier(0.34,1.56,0.64,1)_both]">
        <ModalLevelBanner levelTitle={levelTitle} />

        <div className="flex flex-col items-center gap-0 pt-8">
          <h2
            id="failed-title"
            className="text-display1 text-state-error-base uppercase animate-[countdownPop_0.6s_ease-out_0.2s_both]"
            style={{
              textShadow: "0px 2px 0px #FFFFFF, 0px 4px 12px rgba(15, 15, 15, 0.1)",
            }}
          >
            FAILED
          </h2>
        </div>

        <div className="grid w-full grid-cols-2 gap-3 px-7">
          <Button
            asChild
            variant="error"
            size="lg"
            leftIcon={<LogoutIcon />}
            className="w-full text-b3-extrabold"
          >
            <Link href={chooseLevelHref}>EXIT</Link>
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            leftIcon={<ReplayIcon />}
            className="w-full text-b3-extrabold"
            onClick={onRetry}
          >
            RETRY
          </Button>
        </div>
      </div>
    </div>
  );
}
