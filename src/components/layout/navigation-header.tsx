import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowLeftIcon, HomeIcon } from "@/components/game/game-icons";
import { Button } from "@/components/ui/button";

type NavigationHeaderProps = {
  title: ReactNode;
  backHref: string;
  backLabel: string;
  homeHref?: string;
  homeLabel?: string;
  className?: string;
};

export function NavigationHeader({
  title,
  backHref,
  backLabel,
  homeHref = "/",
  homeLabel = "Home",
  className = "",
}: NavigationHeaderProps) {
  return (
    <header className={`grid min-h-25 grid-cols-[auto_1fr_auto] items-center gap-4 bg-white/20 px-5 py-4 sm:px-6 ${className}`}>
      <div className="flex items-center gap-3">
        <Button asChild variant="neutral" size="lg" iconOnly>
          <Link href={backHref} aria-label={backLabel}>
            <ArrowLeftIcon />
          </Link>
        </Button>
      </div>

      <h1 className="text-display3 text-stroke-4 text-stroke-white text-center text-state-feature-darker [text-shadow:0px_2px_12px_rgba(15,15,15,0.1)] sm:text-display2">
        {title}
      </h1>

      <div className="flex items-center justify-end gap-3">
        <Button asChild variant="secondary" size="lg" iconOnly>
          <Link href={homeHref} aria-label={homeLabel}>
            <HomeIcon />
          </Link>
        </Button>
      </div>
    </header>
  );
}
