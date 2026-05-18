import type { GameLevel, GameLevelRound, GameOption } from "@/types/game";

const howToPlayInstructions = {
  whatTimeIsIt: [
    "Lihat gambar jam yang ada di layar.",
    "Pilih kotak kata yang tepat di bagian bawah.",
    "Tarik dan lepaskan kata tersebut ke area jawaban.",
    "Selesaikan sebelum waktunya habis, ya!",
  ],
  vroomLetsRide: [
    "Lihat gambar alat transportasi yang muncul di layar.",
    "Cari nama kendaraan yang sesuai di bagian bawah.",
    "Tarik dan lepaskan kata tersebut ke area jawaban.",
    "Selesaikan sebelum waktunya habis, ya!",
  ],
  splishSplashBath: [
    "Lihat gambar benda kamar mandi yang muncul di layar.",
    "Cari nama benda yang sesuai di bagian bawah.",
    "Tarik dan lepaskan kata tersebut ke area jawaban.",
    "Selesaikan sebelum waktunya habis, ya!",
  ],
  myCozyLivingRoom: [
    "Lihat gambar benda di ruang keluarga yang muncul di layar.",
    "Cari nama benda yang sesuai di bagian bawah.",
    "Tarik dan lepaskan kata tersebut ke area jawaban.",
    "Selesaikan sebelum waktunya habis, ya!",
  ],
  myAwesomeClass: [
    "Lihat gambar benda di kelasmu yang muncul di layar.",
    "Cari nama benda yang sesuai di bagian bawah.",
    "Tarik dan lepaskan kata tersebut ke area jawaban.",
    "Selesaikan sebelum waktunya habis, ya!",
  ],
};

type RoundSeed = {
  correctAnswer: string;
  distractors: string[];
};

function toImageSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getRoundImageSrc(gameId: string, level: 1 | 2, correctAnswer: string): string {
  return `/images/games/${gameId}/level-${level}/${toImageSlug(correctAnswer)}.png`;
}

const roundSeedsByGameId: Record<string, Record<1 | 2, RoundSeed[]>> = {
  "what-time-is-it": {
    1: [
      { correctAnswer: "06:00 o'clock", distractors: ["six thirty", "seven o'clock"] },
      { correctAnswer: "09:30 o'clock", distractors: ["nine o'clock", "half past eight"] },
      { correctAnswer: "11:00 o'clock", distractors: ["twelve o'clock", "half past eleven"] },
      { correctAnswer: "06:45 o'clock", distractors: ["quarter to six", "six o'clock"] },
      { correctAnswer: "07:00 o'clock", distractors: ["seven thirty", "eight o'clock"] },
    ],
    2: [
      { correctAnswer: "Half past seven", distractors: ["seven o'clock", "half past eight", "six thirty"] },
      { correctAnswer: "Half past one", distractors: ["one o'clock", "half past two", "two thirty"] },
      { correctAnswer: "Quarter past eight", distractors: ["eight o'clock", "quarter to eight", "nine fifteen"] },
      { correctAnswer: "Half past five", distractors: ["five o'clock", "half past four", "five fifteen"] },
      { correctAnswer: "Quarter to ten", distractors: ["ten o'clock", "quarter past ten", "nine forty-five"] },
    ],
  },
  "vroom-lets-ride": {
    1: [
      { correctAnswer: "Pedicab", distractors: ["bicycle", "rickshaw"] },
      { correctAnswer: "Truck", distractors: ["van", "bus"] },
      { correctAnswer: "Helicopter", distractors: ["airplane", "drone"] },
      { correctAnswer: "Train", distractors: ["tram", "subway"] },
      { correctAnswer: "Motorcycle", distractors: ["scooter", "moped"] },
    ],
    2: [
      { correctAnswer: "Rowboat", distractors: ["canoe", "ferry", "sailboat"] },
      { correctAnswer: "Ferry", distractors: ["ship", "boat", "tugboat"] },
      { correctAnswer: "Airplane", distractors: ["jet", "helicopter", "glider"] },
      { correctAnswer: "School Bus", distractors: ["minibus", "van", "truck"] },
      { correctAnswer: "Sailboat", distractors: ["rowboat", "ship", "ferry"] },
    ],
  },
  "splish-splash-bath": {
    1: [
      { correctAnswer: "Toothbrush", distractors: ["hairbrush", "comb"] },
      { correctAnswer: "Mirror", distractors: ["glass", "window"] },
      { correctAnswer: "Toothpaste", distractors: ["soap", "shampoo"] },
      { correctAnswer: "Towel", distractors: ["washcloth", "napkin"] },
      { correctAnswer: "Shower", distractors: ["faucet", "tap"] },
    ],
    2: [
      { correctAnswer: "Dipper", distractors: ["bucket", "basin", "comb"] },
      { correctAnswer: "Bucket", distractors: ["dipper", "tub", "basin"] },
      { correctAnswer: "Comb", distractors: ["brush", "pin", "hairband"] },
      { correctAnswer: "Bathtub", distractors: ["sink", "bucket", "basin"] },
      { correctAnswer: "Bar Soap", distractors: ["liquid soap", "shampoo", "lotion", "detergent"] },
    ],
  },
  "my-cozy-living-room": {
    1: [
      { correctAnswer: "Vase", distractors: ["pot", "jar"] },
      { correctAnswer: "Wall Clock", distractors: ["alarm clock", "watch"] },
      { correctAnswer: "Floor Lamp", distractors: ["ceiling light", "table lamp"] },
      { correctAnswer: "Picture Frame", distractors: ["painting", "poster"] },
      { correctAnswer: "Remote Control", distractors: ["controller", "switch"] },
    ],
    2: [
      { correctAnswer: "Rug", distractors: ["carpet", "mat", "blanket"] },
      { correctAnswer: "Bolster", distractors: ["pillow", "cushion", "pad"] },
      { correctAnswer: "Bookshelf", distractors: ["cupboard", "cabinet", "shelf"] },
      { correctAnswer: "Cupboard", distractors: ["wardrobe", "cabinet", "shelf"] },
      { correctAnswer: "Curtain", distractors: ["blind", "drape", "screen"] },
    ],
  },
  "my-awesome-class": {
    1: [
      { correctAnswer: "Ruler", distractors: ["stick", "pencil"] },
      { correctAnswer: "Pencil Sharpener", distractors: ["eraser", "cutter"] },
      { correctAnswer: "Glue Stick", distractors: ["tape", "stapler"] },
      { correctAnswer: "Eraser", distractors: ["rubber", "cleaner"] },
      { correctAnswer: "Scissors", distractors: ["cutter", "knife"] },
    ],
    2: [
      { correctAnswer: "Whiteboard", distractors: ["blackboard", "chalkboard", "board", "paper"] },
      { correctAnswer: "Stapler", distractors: ["punch", "clip", "tape"] },
      { correctAnswer: "Paper Clip", distractors: ["staple", "pin", "binder"] },
      { correctAnswer: "Globe", distractors: ["map", "sphere", "atlas"] },
      { correctAnswer: "Pencil Case", distractors: ["pouch", "bag", "box"] },
    ],
  },
};

function createRound(gameId: string, level: 1 | 2, roundNumber: number, seed: RoundSeed): GameLevelRound {
  const correctAnswerId = `${gameId}-level-${level}-round-${roundNumber}-answer-correct`;
  const answers = [
    { id: correctAnswerId, label: seed.correctAnswer },
    ...seed.distractors.map((label, distractorIndex) => ({
      id: `${gameId}-level-${level}-round-${roundNumber}-answer-distractor-${distractorIndex + 1}`,
      label,
    })),
  ];

  return {
    id: `${gameId}-level-${level}-round-${roundNumber}`,
    promptImageSrc: getRoundImageSrc(gameId, level, seed.correctAnswer),
    promptImageAlt: `Gambar ${seed.correctAnswer}`,
    correctAnswerId,
    answers,
  };
}

function createLevel(gameId: string, level: 1 | 2): GameLevel {
  const rounds = roundSeedsByGameId[gameId][level].map((seed, index) => (
    createRound(gameId, level, index + 1, seed)
  ));

  return {
    level,
    title: `Level ${level}`,
    href: `/game-start/${gameId}/${level}`,
    active: true,
    stars: 0,
    totalRounds: rounds.length,
    durationSeconds: level === 1 ? 60 : 55,
    rounds,
  };
}

function createLevels(gameId: string): GameLevel[] {
  return [createLevel(gameId, 1), createLevel(gameId, 2)];
}

export const games: GameOption[] = [
  {
    id: "what-time-is-it",
    title: "What Time Is It?",
    description: "Tebak jam berapa sekarang!",
    imageSrc: "/images/game-cards/what-time-is-it.png",
    howToPlay: {
      instructions: howToPlayInstructions.whatTimeIsIt,
      chooseLevelHref: "/choose-level/what-time-is-it",
    },
    levels: createLevels("what-time-is-it"),
  },
  {
    id: "vroom-lets-ride",
    title: "Vroom! Let's Ride!",
    description: "Kenali alat transportasi di sekitarmu!",
    imageSrc: "/images/game-cards/vroom-lets-ride.png",
    howToPlay: {
      instructions: howToPlayInstructions.vroomLetsRide,
      chooseLevelHref: "/choose-level/vroom-lets-ride",
    },
    levels: createLevels("vroom-lets-ride"),
  },
  {
    id: "splish-splash-bath",
    title: "Splish Splash Bath!",
    description: "Temukan barang di kamar mandi!",
    imageSrc: "/images/game-cards/splish-splash-bath.png",
    howToPlay: {
      instructions: howToPlayInstructions.splishSplashBath,
      chooseLevelHref: "/choose-level/splish-splash-bath",
    },
    levels: createLevels("splish-splash-bath"),
  },
  {
    id: "my-cozy-living-room",
    title: "My Cozy Living Room",
    description: "Pasangkan benda di ruang keluarga!",
    imageSrc: "/images/game-cards/my-cozy-living-room.png",
    howToPlay: {
      instructions: howToPlayInstructions.myCozyLivingRoom,
      chooseLevelHref: "/choose-level/my-cozy-living-room",
    },
    levels: createLevels("my-cozy-living-room"),
  },
  {
    id: "my-awesome-class",
    title: "My Awesome Class!",
    description: "Tebak nama benda di kelasmu!",
    imageSrc: "/images/game-cards/my-awesome-class.png",
    howToPlay: {
      instructions: howToPlayInstructions.myAwesomeClass,
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
