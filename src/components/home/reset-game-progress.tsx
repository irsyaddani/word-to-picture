"use client";

import { useState } from "react";

import { resetGameProgress } from "@/components/game/progress-storage";
import { Button } from "@/components/ui/button";

function ResetIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M7.63 7.63A6.19 6.19 0 0 1 12 5.82a6.18 6.18 0 1 1-5.44 9.12.875.875 0 1 0-1.54.84 7.93 7.93 0 1 0 1.37-9.39L4.88 4.88A.75.75 0 0 0 3.6 5.41v4.5c0 .41.34.75.75.75h4.5a.75.75 0 0 0 .53-1.28L7.63 7.63Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ResetGameProgress() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  function handleReset() {
    resetGameProgress();
    setShowConfirmation(false);
  }

  return (
    <>
      <button
        type="button"
        className="fixed bottom-6 right-6 z-20 inline-flex items-center justify-center gap-2 rounded-[14px] px-3 py-2 text-b3-extrabold uppercase text-state-error-base [text-shadow:1px_1px_0px_rgba(10,10,10,0.2)] transition-[transform,filter] duration-100 hover:brightness-110 active:translate-y-px active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-state-error-base focus-visible:ring-offset-2 sm:bottom-10 sm:right-10"
        onClick={() => setShowConfirmation(true)}
      >
        <span className="drop-shadow-[1px_1px_0px_rgba(10,10,10,0.2)]">
          <ResetIcon />
        </span>
        RESET GAME
      </button>

      {showConfirmation ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-progress-title"
          aria-describedby="reset-progress-description"
        >
          <div className="relative flex w-full max-w-95 flex-col items-center gap-6 rounded-[36px] bg-parchment-50 p-7 shadow-[0px_2px_12px_rgba(15,15,15,0.1),inset_0px_-6px_0px_0px_var(--color-parchment-base)]">
            <h2
              id="reset-progress-title"
              className="text-display3 text-stroke-4 text-stroke-white text-center text-state-error-base [text-shadow:0px_2px_12px_rgba(15,15,15,0.1)]"
            >
              Reset Game?
            </h2>

            <p
              id="reset-progress-description"
              className="text-b3-extrabold text-center text-text-strong"
            >
              Are you sure you want to reset your game progress?
            </p>

            <div className="grid w-full grid-cols-2 gap-3">
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="w-full"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </Button>

              <Button
                type="button"
                variant="error"
                size="lg"
                className="w-full"
                onClick={handleReset}
              >
                Yes, reset
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
