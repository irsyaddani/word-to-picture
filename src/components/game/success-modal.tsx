import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Star } from "@/components/ui/star";
import { LogoutIcon, PlayIcon, ReplayIcon } from "@/components/game/game-icons";

type SuccessModalProps = {
  levelTitle: string;
  chooseLevelHref: string;
  nextLevelHref?: string;
  onReplay: () => void;
};

export function SuccessModal({
  levelTitle,
  chooseLevelHref,
  nextLevelHref,
  onReplay,
}: SuccessModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
    >
      <div className="relative flex w-full max-w-95 flex-col items-center gap-6 rounded-[36px] bg-parchment-50 pb-7 pt-0 shadow-[0px_2px_12px_rgba(15,15,15,0.1),inset_0px_-6px_0px_0px_var(--color-parchment-base)] animate-[countdownPop_0.6s_cubic-bezier(0.34,1.56,0.64,1)_both]">
        <div
          style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.2)" }}
          className="bg-[#751DBA] text-white rounded-b-3xl py-3 px-8 text-display5 border-b-4 border-x-4 border-[#3C0E67] text-center -mt-1 uppercase"
        >
          {levelTitle}
        </div>

        <div className="flex justify-center items-end gap-3 mt-2 h-[65px]">
          <div className="animate-[countdownPop_0.5s_cubic-bezier(0.34,1.56,0.64,1)_0.4s_both]">
            <Star active size={42} className="-rotate-[15deg] translate-y-2" />
          </div>
          <div className="animate-[countdownPop_0.5s_cubic-bezier(0.34,1.56,0.64,1)_0.6s_both]">
            <Star active size={56} className="translate-y-1" />
          </div>
          <div className="animate-[countdownPop_0.5s_cubic-bezier(0.34,1.56,0.64,1)_0.8s_both]">
            <Star active size={42} className="rotate-[15deg] translate-y-2" />
          </div>
        </div>

        <div className="border-4 border-parchment-base bg-parchment-50/40 rounded-[36px] p-4 mx-5 w-[calc(100%-40px)] flex flex-col items-center gap-3">
          <p className="text-b3-extrabold text-neutral-900 tracking-wide uppercase">
            Awards Unlocked!
          </p>
          <div className="flex justify-center gap-4 py-1">
            <div className="flex flex-col items-center gap-1 animate-[fadeInUp_0.3s_ease-out_0.2s_both]">
              <div className="w-14 h-14 flex items-center justify-center bg-[#F15A25] text-2xl rounded-full shadow-[0px_2.5px_15px_rgba(15,15,15,0.15)] border-[2.5px] border-[#FFFFFF]">
                🏆
              </div>
              <span className="text-[10px] font-extrabold text-neutral-800 whitespace-nowrap">Star Solver</span>
            </div>
            <div className="flex flex-col items-center gap-1 animate-[fadeInUp_0.3s_ease-out_0.3s_both]">
              <div className="w-14 h-14 flex items-center justify-center bg-[#328BF3] text-2xl rounded-full shadow-[0px_2.5px_15px_rgba(15,15,15,0.15)] border-[2.5px] border-[#FFFFFF]">
                ⚡
              </div>
              <span className="text-[10px] font-extrabold text-neutral-800 whitespace-nowrap">Quick Wit</span>
            </div>
            <div className="flex flex-col items-center gap-1 animate-[fadeInUp_0.3s_ease-out_0.4s_both]">
              <div className="w-14 h-14 flex items-center justify-center bg-[#41885C] text-2xl rounded-full shadow-[0px_2.5px_15px_rgba(15,15,15,0.15)] border-[2.5px] border-[#FFFFFF]">
                🎯
              </div>
              <span className="text-[10px] font-extrabold text-neutral-800 whitespace-nowrap">Bullseye</span>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 px-7">
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
  );
}
