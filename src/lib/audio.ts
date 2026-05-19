export const audioAssets = {
  bgm: {
    game: "/audio/bgm/game-theme.wav",
    level1: "/audio/bgm/level-1-theme.mp3",
    level2: "/audio/bgm/level-2-theme.wav",
  },
  sfx: {
    correct: "/audio/sfx/answer-correct.wav",
    wrong: "/audio/sfx/answer-wrong.mp3",
    modalSuccess: "/audio/sfx/modal-success.wav",
    modalFailed: "/audio/sfx/modal-failed.mp3",
  },
} as const;

export function playSfx(src: string) {
  const audio = new Audio(src);
  audio.currentTime = 0;
  audio.volume = 0.85;
  void audio.play().catch(() => undefined);
}
