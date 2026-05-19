import type { GameLevel, GameLevelRound, GameOption } from "@/types/game";

const howToPlayInstructions = {
  myYummyKitchen: [
    "Lihat gambar benda dapur yang muncul di layar.",
    "Cari nama benda yang sesuai di bagian bawah.",
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
  "my-yummy-kitchen": {
    1: [
      { correctAnswer: "Gas stove", distractors: ["Rice cooker", "Oven"] },
      { correctAnswer: "Rice cooker", distractors: ["Gas stove", "Blender"] },
      { correctAnswer: "Cutting board", distractors: ["Dish rack", "Rolling pin"] },
      { correctAnswer: "Dish rack", distractors: ["Cutting board", "Trash bag"] },
      { correctAnswer: "Paper towel", distractors: ["Trash bag", "Kitchen gloves"] },
      { correctAnswer: "Kitchen gloves", distractors: ["Paper towel", "Frying pan"] },
      { correctAnswer: "Trash bag", distractors: ["Paper towel", "Kitchen sink"] },
      { correctAnswer: "Frying pan", distractors: ["Gas stove", "Kitchen gloves"] },
      { correctAnswer: "Water filter", distractors: ["Blender", "Rice cooker"] },
      { correctAnswer: "Kitchen sink", distractors: ["Water filter", "Dish rack"] },
    ],
    2: [
      { correctAnswer: "Grater", distractors: ["Peeler", "Whisk", "Colander"] },
      { correctAnswer: "Peeler", distractors: ["Grater", "Spatula", "Funnel"] },
      { correctAnswer: "Whisk", distractors: ["Ladle", "Strainer", "Mortar"] },
      { correctAnswer: "Funnel", distractors: ["Faucet", "Kettle", "Tray"] },
      { correctAnswer: "Faucet", distractors: ["Kitchen sink", "Funnel", "Apron"] },
      { correctAnswer: "Apron", distractors: ["Tray", "Table mat", "Kitchen gloves"] },
      { correctAnswer: "Tray", distractors: ["Apron", "Table mat", "Colander"] },
      { correctAnswer: "Kettle", distractors: ["Teapot", "Whisk", "Faucet"] },
      { correctAnswer: "Ladle", distractors: ["Spatula", "Strainer", "Mortar"] },
      { correctAnswer: "Strainer", distractors: ["Colander", "Ladle", "Spatula"] },
    ],
  },
  "vroom-lets-ride": {
    1: [
      { correctAnswer: "Fire engine", distractors: ["Minivan", "Ambulance"] },
      { correctAnswer: "Carriage", distractors: ["Scooter", "Horse"] },
      { correctAnswer: "Cable car", distractors: ["Bus", "Helicopter"] },
      { correctAnswer: "Speed boat", distractors: ["Sail boat", "Canoe"] },
      { correctAnswer: "Forklift", distractors: ["Excavator", "Tractor"] },
      { correctAnswer: "Scooter", distractors: ["Carriage", "Bicycle"] },
      { correctAnswer: "Sail boat", distractors: ["Speed boat", "Canoe"] },
      { correctAnswer: "Minivan", distractors: ["Fire engine", "Ambulance"] },
      { correctAnswer: "Excavator", distractors: ["Forklift", "Crane truck"] },
      { correctAnswer: "Hot air balloon", distractors: ["Cable car", "Helicopter"] },
    ],
    2: [
      { correctAnswer: "Fighter Jet", distractors: ["Cargo ship", "Cargo plane", "Spaceship"] },
      { correctAnswer: "Garbage truck", distractors: ["Tow truck", "Cement mixer", "Dump truck"] },
      { correctAnswer: "Tow truck", distractors: ["Garbage truck", "Pickup truck", "Crane truck"] },
      { correctAnswer: "Steamroller", distractors: ["Bulldozer", "Excavator", "Tractor"] },
      { correctAnswer: "Submarine", distractors: ["Cargo ship", "Yacht", "Subway"] },
      { correctAnswer: "Cargo ship", distractors: ["Yacht", "Cruise ship", "Cargo plane"] },
      { correctAnswer: "Bulldozer", distractors: ["Steamroller", "Excavator", "Tractor"] },
      { correctAnswer: "Cement mixer", distractors: ["Garbage truck", "Tow truck", "Dump truck"] },
      { correctAnswer: "Yacht", distractors: ["Row boat", "Cruise ship", "Submarine"] },
      { correctAnswer: "Pickup truck", distractors: ["Minivan", "Tow truck", "Dump truck"] },
    ],
  },
  "splish-splash-bath": {
    1: [
      { correctAnswer: "Dipper", distractors: ["Comb", "Water scoop"] },
      { correctAnswer: "Bucket", distractors: ["Dipper", "Trash can"] },
      { correctAnswer: "Slippers", distractors: ["Bath mat", "Bathrobe"] },
      { correctAnswer: "Shower cap", distractors: ["Comb", "Hair dryer"] },
      { correctAnswer: "Comb", distractors: ["Razor", "Toothbrush"] },
      { correctAnswer: "Razor", distractors: ["Comb", "Toothbrush"] },
      { correctAnswer: "Hair dryer", distractors: ["Shower cap", "Comb"] },
      { correctAnswer: "Bath mat", distractors: ["Slippers", "Towel"] },
      { correctAnswer: "Sink", distractors: ["Mouthwash", "Tap"] },
      { correctAnswer: "Mouthwash", distractors: ["Toothpaste", "Liquid soap"] },
    ],
    2: [
      { correctAnswer: "Bathrobe", distractors: ["Shower curtain", "Towel hanger", "Bath mat"] },
      { correctAnswer: "Plunger", distractors: ["Toilet brush", "Toilet paper", "Trash can"] },
      { correctAnswer: "Bidet spray", distractors: ["Faucet", "Shower", "Tap"] },
      { correctAnswer: "Shower curtain", distractors: ["Bathrobe", "Bathub", "Towel hanger"] },
      { correctAnswer: "Faucet", distractors: ["Bidet spray", "Tap", "Sink"] },
      { correctAnswer: "Dental floss", distractors: ["Toothpaste", "Toothbrush", "Mouthwash"] },
      { correctAnswer: "Air freshener spray", distractors: ["Liquid soap", "Mouthwash", "Hand soap"] },
      { correctAnswer: "Bathub", distractors: ["Shower curtain", "Shower", "Floor drain"] },
      { correctAnswer: "Toilet brush", distractors: ["Plunger", "Toilet paper", "Laundry basket"] },
      { correctAnswer: "Toilet paper", distractors: ["Toilet brush", "Plunger", "Paper"] },
    ],
  },
  "my-cozy-living-room": {
    1: [
      { correctAnswer: "Snack jar", distractors: ["Flower vase", "Jam"] },
      { correctAnswer: "Window blind", distractors: ["Wood", "Window"] },
      { correctAnswer: "Rocking chair", distractors: ["Stool", "Armchair"] },
      { correctAnswer: "Bean bag", distractors: ["Stool", "Rocking chair"] },
      { correctAnswer: "Wall sconce lamp", distractors: ["Wall clock", "Floor lamp"] },
      { correctAnswer: "Throw pillow", distractors: ["Rug", "Cushion"] },
      { correctAnswer: "Rug", distractors: ["Door mat", "Floor mop"] },
      { correctAnswer: "Air purifier", distractors: ["Standing fan", "Television"] },
      { correctAnswer: "Display cabinet", distractors: ["Book shelf", "Bookcase"] },
      { correctAnswer: "Book shelf", distractors: ["Display cabinet", "Bookcase"] },
    ],
    2: [
      { correctAnswer: "Extension cable", distractors: ["Remote control", "Power strip", "Wire"] },
      { correctAnswer: "Ashtray", distractors: ["Coaster", "Matchbox", "Bowl"] },
      { correctAnswer: "Vacuum cleaner", distractors: ["Air purifier", "Broom", "Floor mop"] },
      { correctAnswer: "Chandelier", distractors: ["Floor lamp", "Wall sconce lamp", "Ceiling fan"] },
      { correctAnswer: "Coffee table", distractors: ["Chair", "Tablecloth", "Desk"] },
      { correctAnswer: "Door mat", distractors: ["Floor rug", "Rug", "Bath mat"] },
      { correctAnswer: "Water pitcher", distractors: ["Teapot", "Mug", "Snack jar"] },
      { correctAnswer: "Shoe rack", distractors: ["Coat rack", "Wardrobe", "Folding chair"] },
      { correctAnswer: "Table cloth", distractors: ["Sofa cover", "Door mat", "Curtain"] },
      { correctAnswer: "Coat rack", distractors: ["Shoe rack", "Hanger", "Folding chair"] },
    ],
  },
  "my-awesome-class": {
    1: [
      { correctAnswer: "Rubber stamp", distractors: ["Ink pad", "Correction tape"] },
      { correctAnswer: "Microscope", distractors: ["Magnifying glass", "Telescope"] },
      { correctAnswer: "Correction tape", distractors: ["Eraser", "Tape"] },
      { correctAnswer: "Bulletin board", distractors: ["Chalkboard", "Blackboard"] },
      { correctAnswer: "Projector", distractors: ["Screen", "Smart TV"] },
      { correctAnswer: "Tape", distractors: ["Tape dispenser", "Correction tape"] },
      { correctAnswer: "Locker", distractors: ["Desk", "Wardrobe"] },
      { correctAnswer: "Paint palette", distractors: ["Paintbrush", "Drawing easel"] },
      { correctAnswer: "Megaphone", distractors: ["Microphone", "Smart speaker"] },
      { correctAnswer: "Floor mop", distractors: ["Broom", "Trash can"] },
    ],
    2: [
      { correctAnswer: "Abacus", distractors: ["Calculator", "Ruler", "Geometric block"] },
      { correctAnswer: "Protractor", distractors: ["Ruler", "Drawing compass", "Set square"] },
      { correctAnswer: "First aid kit", distractors: ["Toy box", "Bandage", "Tissue box"] },
      { correctAnswer: "Drawing compass", distractors: ["Protractor", "Divider", "Pencil case"] },
      { correctAnswer: "Feather duster", distractors: ["Broom", "Floor mop", "Cleaning cloth"] },
      { correctAnswer: "Trophy cup", distractors: ["Medal", "Ribbon", "Certificate"] },
      { correctAnswer: "Drawing canvas", distractors: ["Paint palette", "Color pencil", "Board"] },
      { correctAnswer: "Magnifying glass", distractors: ["Microscope", "Binoculars", "Lens"] },
      { correctAnswer: "Dust pan", distractors: ["Garbage can", "Trash can", "Broom"] },
      { correctAnswer: "Hole puncher", distractors: ["Stapler", "Paper cutter", "Tape dispenser"] },
    ],
  },
};

const answerMeanings: Record<string, string> = {
  "Gas stove": "kompor gas",
  "Rice cooker": "penanak nasi",
  "Cutting board": "talenan",
  "Dish rack": "rak piring",
  "Paper towel": "tisu dapur",
  "Kitchen gloves": "sarung tangan dapur",
  "Trash bag": "kantong sampah",
  "Frying pan": "wajan penggorengan",
  "Water filter": "penyaring air",
  "Kitchen sink": "bak cuci piring",
  Grater: "parutan",
  Peeler: "pengupas",
  Whisk: "pengocok",
  Funnel: "corong",
  Faucet: "keran",
  Apron: "celemek",
  Tray: "nampan",
  Kettle: "ketel",
  Ladle: "sendok sayur",
  Strainer: "saringan",
  "Fire engine": "mobil pemadam kebakaran",
  Carriage: "kereta kuda",
  "Cable car": "kereta gantung",
  "Speed boat": "perahu cepat",
  Forklift: "forklift",
  Scooter: "skuter",
  "Sail boat": "perahu layar",
  Minivan: "mobil van",
  Excavator: "ekskavator",
  "Hot air balloon": "balon udara",
  "Fighter Jet": "jet tempur",
  "Garbage truck": "truk sampah",
  "Tow truck": "mobil derek",
  Steamroller: "mesin penggilas jalan",
  Submarine: "kapal selam",
  "Cargo ship": "kapal kargo",
  Bulldozer: "buldoser",
  "Cement mixer": "truk pengaduk semen",
  Yacht: "kapal pesiar",
  "Pickup truck": "mobil pikap",
  Dipper: "gayung",
  Bucket: "ember",
  Slippers: "sandal",
  "Shower cap": "topi mandi",
  Comb: "sisir",
  Razor: "pisau cukur",
  "Hair dryer": "pengering rambut",
  "Bath mat": "keset kamar mandi",
  Sink: "wastafel",
  Mouthwash: "obat kumur",
  Bathrobe: "jubah mandi",
  Plunger: "penyedot WC",
  "Bidet spray": "semprotan bidet",
  "Shower curtain": "tirai kamar mandi",
  "Dental floss": "benang gigi",
  "Air freshener spray": "semprotan pewangi ruangan",
  Bathub: "bak mandi",
  "Toilet brush": "sikat toilet",
  "Toilet paper": "tisu toilet",
  "Snack jar": "toples camilan",
  "Window blind": "tirai jendela",
  "Rocking chair": "kursi goyang",
  "Bean bag": "kursi bean bag",
  "Wall sconce lamp": "lampu dinding",
  "Throw pillow": "bantal sofa",
  Rug: "karpet",
  "Air purifier": "penjernih udara",
  "Display cabinet": "lemari pajangan",
  "Book shelf": "rak buku",
  "Extension cable": "kabel ekstensi",
  Ashtray: "asbak",
  "Vacuum cleaner": "penyedot debu",
  Chandelier: "lampu gantung",
  "Coffee table": "meja kopi",
  "Door mat": "keset",
  "Water pitcher": "kendi air",
  "Shoe rack": "rak sepatu",
  "Table cloth": "taplak meja",
  "Coat rack": "gantungan mantel",
  "Rubber stamp": "stempel",
  Microscope: "mikroskop",
  "Correction tape": "pita koreksi",
  "Bulletin board": "papan pengumuman",
  Projector: "proyektor",
  Tape: "selotip",
  Locker: "loker",
  "Paint palette": "palet cat",
  Megaphone: "megafon",
  "Floor mop": "kain pel",
  Abacus: "sempoa",
  Protractor: "busur derajat",
  "First aid kit": "kotak P3K",
  "Drawing compass": "jangka",
  "Feather duster": "kemoceng",
  "Trophy cup": "piala",
  "Drawing canvas": "kanvas gambar",
  "Magnifying glass": "kaca pembesar",
  "Dust pan": "pengki",
  "Hole puncher": "pelubang kertas",
};

function createRound(gameId: string, level: 1 | 2, roundNumber: number, seed: RoundSeed): GameLevelRound {
  const correctAnswerId = `${gameId}-level-${level}-round-${roundNumber}-answer-correct`;
  const answers = [
    { id: correctAnswerId, label: seed.correctAnswer, meaning: answerMeanings[seed.correctAnswer] },
    ...seed.distractors.map((label, distractorIndex) => ({
      id: `${gameId}-level-${level}-round-${roundNumber}-answer-distractor-${distractorIndex + 1}`,
      label,
      meaning: answerMeanings[label],
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
    durationSeconds: level === 1 ? 150 : 120,
    rounds,
  };
}

function createLevels(gameId: string): GameLevel[] {
  return [createLevel(gameId, 1), createLevel(gameId, 2)];
}

export const games: GameOption[] = [
  {
    id: "my-yummy-kitchen",
    title: "My Yummy Kitchen",
    description: "Kenali benda-benda di dapurmu!",
    imageSrc: "/images/game-cards/my-yummy-kitchen.png",
    howToPlay: {
      instructions: howToPlayInstructions.myYummyKitchen,
      chooseLevelHref: "/choose-level/my-yummy-kitchen",
    },
    levels: createLevels("my-yummy-kitchen"),
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
