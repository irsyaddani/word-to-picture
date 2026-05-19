export type GameAnswerOption = {
  id: string;
  label: string;
  meaning?: string;
};

export type GameLevelRound = {
  id: string;
  promptImageSrc?: string;
  promptImageAlt: string;
  correctAnswerId: string;
  answers: GameAnswerOption[];
};

export type GameLevel = {
  level: number;
  title: string;
  href: string;
  active: boolean;
  stars: number;
  unlockMessage?: string;
  totalRounds: number;
  durationSeconds: number;
  rounds: GameLevelRound[];
};

export type GameOption = {
  id: string;
  title: string;
  description: string;
  imageSrc?: string;
  howToPlay: {
    instructions: string[];
    chooseLevelHref: string;
  };
  levels: GameLevel[];
};
