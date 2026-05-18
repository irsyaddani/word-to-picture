const PROGRESS_STORAGE_KEY = "word-to-picture-progress";

type GameProgress = Record<string, Record<string, number>>;

function readProgress(): GameProgress {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const storedProgress = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!storedProgress) {
      return {};
    }

    return JSON.parse(storedProgress) as GameProgress;
  } catch {
    return {};
  }
}

function writeProgress(progress: GameProgress) {
  window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
}

export function resetGameProgress() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(PROGRESS_STORAGE_KEY);
}

export function calculateStars(wrongAnswerCount: number): number {
  if (wrongAnswerCount <= 2) {
    return 3;
  }

  if (wrongAnswerCount <= 5) {
    return 2;
  }

  return 1;
}

export function getLevelStars(gameId: string, level: number): number {
  return readProgress()[gameId]?.[String(level)] ?? 0;
}

export function saveLevelStars(gameId: string, level: number, stars: number): number {
  const progress = readProgress();
  const currentStars = progress[gameId]?.[String(level)] ?? 0;
  const bestStars = Math.max(currentStars, stars);

  writeProgress({
    ...progress,
    [gameId]: {
      ...progress[gameId],
      [String(level)]: bestStars,
    },
  });

  return bestStars;
}
