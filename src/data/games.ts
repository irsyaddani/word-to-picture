import type { GameLevel, GameOption } from "@/types/game";

const defaultHowToPlayInstructions = [
  "Lihat gambar jam yang ada di layar.",
  "Pilih kotak kata yang tepat di bagian bawah.",
  "Tarik dan Lepaskan kata tersebut ke gambar jam yang benar.",
  "Selesaikan sebelum waktunya habis, ya!",
];

function createLevels(gameId: string): GameLevel[] {
  return [
    {
      level: 1,
      title: "Level 1",
      href: `/game-start/${gameId}/1`,
      active: true,
      stars: 0,
      totalRounds: 5,
      durationSeconds: 120,
      rounds: [
        {
          id: `${gameId}-level-1-round-1`,
          promptImageSrc: "/card-game-thumb.png",
          promptImageAlt: "Gambar bus sekolah",
          correctAnswerId: "answer-1",
          answers: [
            { id: "answer-1", label: "School Bus" },
            { id: "answer-2", label: "Bicycle" },
            { id: "answer-3", label: "Airplane" },
          ],
        },
        {
          id: `${gameId}-level-1-round-2`,
          promptImageSrc: "/card-game-thumb.png",
          promptImageAlt: "Gambar soal 2",
          correctAnswerId: "answer-4",
          answers: [
            { id: "answer-4", label: "Train" },
            { id: "answer-5", label: "Boat" },
            { id: "answer-6", label: "Car" },
          ],
        },
        {
          id: `${gameId}-level-1-round-3`,
          promptImageSrc: "/card-game-thumb.png",
          promptImageAlt: "Gambar soal 3",
          correctAnswerId: "answer-7",
          answers: [
            { id: "answer-7", label: "Helicopter" },
            { id: "answer-8", label: "Truck" },
            { id: "answer-9", label: "Scooter" },
          ],
        },
        {
          id: `${gameId}-level-1-round-4`,
          promptImageSrc: "/card-game-thumb.png",
          promptImageAlt: "Gambar soal 4",
          correctAnswerId: "answer-10",
          answers: [
            { id: "answer-10", label: "Motorcycle" },
            { id: "answer-11", label: "Ship" },
            { id: "answer-12", label: "Rocket" },
          ],
        },
        {
          id: `${gameId}-level-1-round-5`,
          promptImageSrc: "/card-game-thumb.png",
          promptImageAlt: "Gambar soal 5",
          correctAnswerId: "answer-13",
          answers: [
            { id: "answer-13", label: "Ambulance" },
            { id: "answer-14", label: "Taxi" },
            { id: "answer-15", label: "Tram" },
          ],
        },
      ],
    },
    {
      level: 2,
      title: "Level 2",
      href: `/game-start/${gameId}/2`,
      active: false,
      stars: 0,
      unlockMessage: "Reach level 1 to unlock",
      totalRounds: 5,
      durationSeconds: 55,
      rounds: [],
    },
    {
      level: 3,
      title: "Level 3",
      href: `/game-start/${gameId}/3`,
      active: false,
      stars: 0,
      unlockMessage: "Reach level 2 to unlock",
      totalRounds: 5,
      durationSeconds: 55,
      rounds: [],
    },
  ];
}

export const games: GameOption[] = [
  {
    id: "what-time-is-it",
    title: "What Time Is It?",
    description: "Tebak jam berapa sekarang!",
    imageSrc: "/card-game-thumb.png",
    howToPlay: {
      instructions: defaultHowToPlayInstructions,
      chooseLevelHref: "/choose-level/what-time-is-it",
    },
    levels: createLevels("what-time-is-it"),
  },
  {
    id: "vroom-lets-ride",
    title: "Vroom! Let's Ride!",
    description: "Kenali alat transportasi di sekitarmu!",
    imageSrc: "/card-game-thumb.png",
    howToPlay: {
      instructions: defaultHowToPlayInstructions,
      chooseLevelHref: "/choose-level/vroom-lets-ride",
    },
    levels: createLevels("vroom-lets-ride"),
  },
  {
    id: "splish-splash-bath",
    title: "Splish Splash Bath!",
    description: "Temukan barang di kamar mandi!",
    imageSrc: "/card-game-thumb.png",
    howToPlay: {
      instructions: defaultHowToPlayInstructions,
      chooseLevelHref: "/choose-level/splish-splash-bath",
    },
    levels: createLevels("splish-splash-bath"),
  },
  {
    id: "my-cozy-living-room",
    title: "My Cozy Living Room",
    description: "Pasangkan benda di ruang keluarga!",
    imageSrc: "/card-game-thumb.png",
    howToPlay: {
      instructions: defaultHowToPlayInstructions,
      chooseLevelHref: "/choose-level/my-cozy-living-room",
    },
    levels: createLevels("my-cozy-living-room"),
  },
  {
    id: "my-awesome-class",
    title: "My Awesome Class!",
    description: "Tebak nama benda di kelasmu!",
    imageSrc: "/card-game-thumb.png",
    howToPlay: {
      instructions: defaultHowToPlayInstructions,
      chooseLevelHref: "/choose-level/my-awesome-class",
    },
    levels: createLevels("my-awesome-class"),
  },
];

export function getGameById(gameId: string): GameOption | undefined {
  return games.find((game) => game.id === gameId);
}

export function getGameLevel(gameId: string, level: number): GameLevel | undefined {
  return getGameById(gameId)?.levels.find((gameLevel) => gameLevel.level === level);
}
