@AGENTS.md
# Roadmap & Dokumentasi Implementasi
## Aplikasi Word to Picture — Gamifikasi Bahasa Inggris Kelas 4 SD

---

## Daftar Isi

1. [Gambaran Umum Proyek](#1-gambaran-umum-proyek)
2. [Arsitektur Aplikasi](#2-arsitektur-aplikasi)
3. [Struktur Folder Next.js](#3-struktur-folder-nextjs)
4. [State Management & Data Model](#4-state-management--data-model)
5. [Roadmap Implementasi](#5-roadmap-implementasi)
6. [Workflow Harian](#6-workflow-harian)
7. [Prompt Library (Master Prompts)](#7-prompt-library-master-prompts)
8. [Konvensi & Aturan Koding](#8-konvensi--aturan-koding)
9. [Checklist QA per Fitur](#9-checklist-qa-per-fitur)

---

## 1. Gambaran Umum Proyek

| Item | Detail |
|------|--------|
| Nama Aplikasi | Word to Picture |
| Nama Project | word-to-pict |
| Tech Stack | Next.js 14 (App Router), TypeScript, Tailwind CSS v4 |
| State Runtime | React Context + useReducer (tidak pakai Zustand) |
| State Persisten | localStorage — key: `word-to-picture-progress` |
| Scope | Frontend only — tidak ada backend, tidak ada autentikasi |
| Reset | Via URL `/reset` ATAU tombol tersembunyi `/?dev=true` |
| Editor | Antigravity + MCP Figma |

### Mekanisme Game (Ringkasan)

```
Pilih Unit (4 unit) → Pilih Level (3 level per unit) →
Loading Screen → Mode Permainan (5 soal, 2-2-1 per stage) →
Timer berjalan → Drag & Drop jawaban ke placeholder →
Feedback real-time → Pop-up Hasil (bintang + achievement)
```

---

## 2. Arsitektur Aplikasi

### Halaman (Pages / Routes)

| Route | Fungsi |
|-------|--------|
| `/` | Home / Pilih Unit |
| `/unit/[unitId]` | Pilih Level |
| `/play/[unitId]/[levelId]` | Mode Permainan |
| `/result/[unitId]/[levelId]` | Hasil (bintang & achievement) |
| `/reset` | Reset semua progress ke nol |

### Flow Antar Halaman

```
/ (Home)
 └── /unit/[unitId]                    ← klik unit card
      └── /play/[unitId]/[levelId]     ← klik level card + loading screen
           └── /result/[unitId]/[levelId]   ← selesai 5 soal atau timer habis
                └── / atau /unit/[unitId]   ← tombol "Main Lagi" atau "Pilih Level Lain"
```

---

## 3. Struktur Folder Next.js

```
word-to-pict/
├── public/
│   └── images/
│       └── questions/
│           ├── unit1/     ← gambar soal unit 1
│           ├── unit2/
│           ├── unit3/
│           └── unit4/
│
└── src/
    ├── app/                                    ← khusus routing Next.js
    │   ├── layout.tsx
    │   ├── page.tsx                            # Home — pilih unit
    │   ├── unit/
    │   │   └── [unitId]/
    │   │       └── page.tsx                    # Pilih level
    │   ├── play/
    │   │   └── [unitId]/
    │   │       └── [levelId]/
    │   │           └── page.tsx                # Mode permainan
    │   ├── result/
    │   │   └── [unitId]/
    │   │       └── [levelId]/
    │   │           └── page.tsx                # Hasil
    │   └── reset/
    │       └── page.tsx                        # Reset progress
    │
    ├── components/                             ← sejajar dengan app
    │   ├── ui/                                 # Komponen design system
    │   │   ├── Button.tsx
    │   │   ├── Card.tsx
    │   │   ├── ProgressBar.tsx
    │   │   ├── StarRating.tsx
    │   │   ├── Badge.tsx
    │   │   └── Timer.tsx
    │   │
    │   ├── game/                               # Komponen khusus permainan
    │   │   ├── DragCard.tsx
    │   │   ├── DropPlaceholder.tsx
    │   │   ├── QuestionArea.tsx
    │   │   ├── AnswerArea.tsx
    │   │   ├── StageIndicator.tsx
    │   │   ├── FeedbackToast.tsx
    │   │   └── ResultPopup.tsx
    │   │
    │   └── layout/
    │       ├── GameHeader.tsx
    │       └── LoadingScreen.tsx
    │
    ├── data/
    │   ├── units.ts                            # Metadata 4 unit
    │   ├── questions/
    │   │   ├── unit1.ts                        # 3 level × 5 soal
    │   │   ├── unit2.ts
    │   │   ├── unit3.ts
    │   │   └── unit4.ts
    │   └── achievements.ts
    │
    ├── hooks/
    │   ├── useGameState.ts
    │   ├── useTimer.ts
    │   ├── useProgress.ts
    │   ├── useDragDrop.ts
    │   └── useAchievement.ts
    │
    ├── types/
    │   └── index.ts
    │
    ├── utils/
    │   ├── storage.ts
    │   ├── scoring.ts
    │   ├── shuffle.ts
    │   └── feedbackMessages.ts
    │
    ├── lib/
    │   └── utils.ts                            # cn() helper
    │
    └── styles/
        ├── globals.css                         # Entry point
        ├── typography.css                      # Font & skala teks
        └── tokens/
            ├── foundation.css                  # Warna primitif
            └── semantic.css                    # Token fungsional
```

---

## 4. State Management & Data Model

### TypeScript Types (`src/types/index.ts`)

```typescript
// ─── Data Soal ───────────────────────────────────────────────────
export interface Question {
  id: string;
  type: 'word-to-image' | 'image-to-word' | 'sentence-fill';
  questionText?: string;
  questionImage?: string;
  options: string[];
  correctAnswer: string;
  hint?: string;
}

export interface Level {
  id: number;           // 1 | 2 | 3
  questions: Question[]; // Selalu 5 soal
  timeLimit: number;    // Detik (90 atau 120)
}

export interface Unit {
  id: number;           // 1 | 2 | 3 | 4
  title: string;
  description: string;
  theme: string;
  icon: string;
  levels: Level[];
}

// ─── State Permainan ─────────────────────────────────────────────
export interface GameState {
  unitId: number;
  levelId: number;
  currentStage: number;         // 0 | 1 | 2
  answers: Record<string, string | null>;
  score: number;
  timeRemaining: number;
  isComplete: boolean;
  incorrectAttempts: number;
  feedback: FeedbackState | null;
}

export interface FeedbackState {
  type: 'correct' | 'incorrect';
  message: string;
  questionId: string;
}

// ─── Progress & Penyimpanan ───────────────────────────────────────
export interface LevelProgress {
  stars: number;          // 0 | 1 | 2 | 3
  bestScore: number;      // 0–5
  attempts: number;
  achievements: string[];
  completedAt?: string;
}

export interface AppProgress {
  units: Record<number, Record<number, LevelProgress>>;
}

// ─── Achievement ──────────────────────────────────────────────────
export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  condition: (result: GameResult) => boolean;
}

export interface GameResult {
  score: number;
  totalQuestions: number;   // Selalu 5
  timeUsed: number;
  timeLimit: number;
  incorrectAttempts: number;
  unitId: number;
  levelId: number;
  attempts: number;
}
```

### Skema localStorage

```typescript
// Key: "word-to-picture-progress"
// Value: JSON.stringify(AppProgress)

{
  "units": {
    "1": {
      "1": { "stars": 3, "bestScore": 5, "attempts": 2, "achievements": ["perfect"] },
      "2": { "stars": 2, "bestScore": 4, "attempts": 1, "achievements": [] },
      "3": { "stars": 0, "bestScore": 0, "attempts": 0, "achievements": [] }
    }
  }
}
```

### Kalkulasi Bintang

```typescript
export function calculateStars(score: number, total: number): number {
  const pct = score / total;
  if (pct === 1)    return 3;   // 5/5
  if (pct >= 0.6)   return 2;   // 3–4/5
  if (pct >= 0.4)   return 1;   // 2/5
  return 0;                     // 0–1/5
}
```

### Distribusi Stage (2-2-1)

```typescript
export function getStageQuestions(questions: Question[], stage: number): Question[] {
  const dist = [
    questions.slice(0, 2),  // stage 0: soal 1–2
    questions.slice(2, 4),  // stage 1: soal 3–4
    questions.slice(4, 5),  // stage 2: soal 5
  ];
  return dist[stage] ?? [];
}
```

---

## 5. Roadmap Implementasi

### Fase 0 — Setup & Fondasi ✅ (Selesai)
- [x] Inisiasi Next.js 14 dengan TypeScript, Tailwind v4, src/ directory
- [x] Setup Antigravity + MCP Figma
- [x] Buat `src/styles/tokens/foundation.css`
- [x] Buat `src/styles/tokens/semantic.css`
- [x] Buat `src/styles/typography.css`
- [x] Setup `globals.css` dengan text utilities (h1–h6, body, label)
- [ ] Buat `src/lib/utils.ts` — cn() helper
- [ ] Buat `src/types/index.ts` — semua TypeScript interfaces
- [ ] Buat `tailwind.config.ts` (jika perlu untuk v4)

### Fase 1 — Komponen UI Dasar

- [ ] `Button.tsx` — varian primary, secondary, ghost
- [ ] `Card.tsx` — Unit card, Level card
- [ ] `ProgressBar.tsx`
- [ ] `StarRating.tsx` — 0–3 bintang
- [ ] `Badge.tsx` — achievement badge
- [ ] `Timer.tsx` — countdown display
- [ ] `LoadingScreen.tsx`

### Fase 2 — Halaman Navigasi

- [ ] Home page (`/`) — 4 unit card
- [ ] Unit page (`/unit/[unitId]`) — 3 level card + lock system
- [ ] Reset page (`/reset`)

### Fase 3 — Core Game Mechanics

- [ ] `src/utils/storage.ts` — localStorage helper
- [ ] `src/utils/scoring.ts` — kalkulasi bintang
- [ ] `src/utils/shuffle.ts` — acak pilihan jawaban
- [ ] `src/utils/feedbackMessages.ts` — pesan benar/salah
- [ ] `src/data/units.ts` — metadata unit
- [ ] `src/data/questions/unit1–4.ts` — data soal
- [ ] `src/data/achievements.ts`
- [ ] `useTimer.ts`
- [ ] `useGameState.ts` (useReducer)
- [ ] `useProgress.ts`
- [ ] `useDragDrop.ts`
- [ ] `DragCard.tsx` + `DropPlaceholder.tsx`
- [ ] `QuestionArea.tsx` + `AnswerArea.tsx`

### Fase 4 — Halaman Permainan

- [ ] Play page (`/play/[unitId]/[levelId]`)
- [ ] `FeedbackToast.tsx`
- [ ] `StageIndicator.tsx`
- [ ] `GameHeader.tsx`

### Fase 5 — Hasil & Achievement

- [ ] `useAchievement.ts`
- [ ] `ResultPopup.tsx`
- [ ] Result page (`/result/[unitId]/[levelId]`)

### Fase 6 — Polish & Testing

- [ ] Animasi transisi halaman
- [ ] Responsif mobile
- [ ] Testing semua alur (4 unit × 3 level)
- [ ] Edge case: timer habis, semua salah, semua benar
- [ ] Reset localStorage berfungsi

---

## 6. Workflow Harian

### Sebelum Mulai Coding
1. Buka Antigravity — pastikan MCP Figma aktif (status: Enabled, 2/2 tools)
2. Buka dokumen ini sebagai referensi
3. Pilih 1 task dari fase aktif
4. Siapkan prompt dari Bagian 7

### Alur per Komponen
```
1. Lihat desain di Figma (copy link selection)
2. Buka Antigravity, paste prompt dari Bagian 7
3. Review output — pastikan sesuai design system
4. Integrasi ke halaman
5. Test di browser (npm run dev)
6. Centang checklist di Bagian 9
```

---

## 7. Prompt Library

### 7.1 System Prompt (Wajib di Awal Setiap Sesi Baru)

```
Kamu adalah senior React developer yang membantu saya membangun
aplikasi gamifikasi pembelajaran bahasa Inggris untuk kelas 4 SD.

IDENTITAS PROYEK:
- Nama aplikasi: Word to Picture
- Nama folder: word-to-pict
- Target: Siswa kelas 4 SD (usia 9–10 tahun)

TECH STACK:
- Next.js 14 App Router
- TypeScript strict mode
- Tailwind CSS v4 (pakai @theme di globals.css, BUKAN tailwind.config)
- @dnd-kit/core untuk drag & drop
- React Context + useReducer untuk state (tidak pakai Zustand)
- localStorage untuk persistensi — key: "word-to-picture-progress"

STRUKTUR FOLDER:
- Semua kode ada di src/
- src/app/ → routing only
- src/components/ui/ → design system components
- src/components/game/ → game-specific components
- src/components/layout/ → header, loading screen
- src/hooks/ → custom hooks
- src/data/ → data soal & achievements
- src/types/ → TypeScript interfaces
- src/utils/ → helper functions
- src/lib/utils.ts → cn() helper
- src/styles/ → CSS files

DESIGN SYSTEM:
- Text utilities: .text-h1-bold, .text-b1-regular, .text-label-medium dll
- Warna semantik: --color-semantic-text-strong, --color-semantic-bg-white dll
- Warna foundation: --color-neutral-*, --color-purple-*, dll
- Font: Nunito (heading & body), Catfiles (display)

ATURAN KODE:
1. TypeScript strict — tidak ada tipe 'any'
2. Functional component + hooks
3. Tailwind CSS untuk semua styling
4. Semua label UI dalam Bahasa Indonesia
5. Mobile-first responsive
6. next/image untuk semua gambar
7. Tidak ada @apply antar komponen class

MEKANISME GAME:
- 4 unit, 3 level per unit, 5 soal per level
- Distribusi stage: 2-2-1
- Timer: 90–120 detik per level
- Kalkulasi bintang: 5/5=3★, 3-4/5=2★, 2/5=1★, 0-1/5=0★
- Drag & drop: placeholder hijau=benar, shake=salah

FORMAT OUTPUT:
- Kode lengkap (bukan penggalan)
- Sertakan semua import
- Komentar untuk logika kompleks
- Sebutkan potensi masalah setelah kode
```

---

### 7.2 Context Prompt (Sertakan Jika Ganti Model/Sesi di Tengah Proyek)

```
Proyek: Word to Picture — Next.js 14, TypeScript, Tailwind CSS v4
localStorage key: "word-to-picture-progress"
Folder project: word-to-pict, semua kode di src/ (sejajar dengan app/)

Progress saat ini: [SEBUTKAN FASE YANG SEDANG DIKERJAKAN]

File yang sudah ada:
- src/styles/globals.css ✅
- src/styles/typography.css ✅
- src/styles/tokens/foundation.css ✅
- src/styles/tokens/semantic.css ✅
[tambahkan file lain yang sudah selesai]

Sekarang saya butuh bantuan untuk: [DESKRIPSIKAN TASK]
```

---

### 7.3 Prompt: Buat Komponen UI dari Figma

```
Buat komponen [NAMA KOMPONEN] berdasarkan link Figma ini: [LINK]

Ketentuan:
- Path: src/components/ui/[NamaKomponen].tsx
- TypeScript — definisikan interface Props
- Tailwind CSS — gunakan text utilities dari design system
  (.text-h5-bold, .text-b3-regular, dll)
- Gunakan CSS variables untuk warna
  (var(--color-semantic-text-strong), dll)
- Semua varian dari Figma jadi prop (variant, size, state)
- Accessible (aria label jika relevan)
- Tidak ada logika bisnis

Setelah komponen, berikan contoh penggunaan.
```

---

### 7.4 Prompt: Buat useGameState Hook

```
Buat custom hook useGameState di src/hooks/useGameState.ts

Gunakan useReducer untuk state berikut:
- questions: Question[] (soal level ini, opsi sudah diacak)
- currentStage: 0 | 1 | 2
- answers: Record<string, string | null>
- score: number
- incorrectAttempts: number
- feedback: { type, message, questionId } | null
- isStageComplete: boolean
- isGameComplete: boolean

Actions:
- ANSWER: cek benar/salah, update answers, set feedback
- NEXT_STAGE: increment stage, clear feedback
- RESET: kembali ke awal

Aturan:
- Jawaban benar tidak bisa diubah (locked)
- Jawaban salah bisa dicoba lagi
- Feedback hilang otomatis setelah 1500ms
- Distribusi stage 2-2-1 dari 5 soal

Import types dari @/types.
```

---

### 7.5 Prompt: Buat useTimer Hook

```
Buat custom hook useTimer di src/hooks/useTimer.ts

Input: initialTime: number, onTimeUp: () => void

Output:
- timeRemaining: number
- isRunning: boolean
- isUrgent: boolean (true jika <= 10 detik)
- formattedTime: string ("MM:SS")
- start(), pause(), reset()

Aturan:
- useEffect + setInterval, bersihkan di cleanup
- Berhenti otomatis di 0, panggil onTimeUp
- Format selalu dua digit: "01:05" bukan "1:5"
- Pause mempertahankan sisa waktu
- Handle SSR (typeof window check tidak diperlukan untuk timer)
```

---

### 7.6 Prompt: Buat DragCard & DropPlaceholder

```
Buat dua komponen drag & drop menggunakan @dnd-kit/core:

1. src/components/game/DragCard.tsx
Props: id, label, isUsed, isDisabled
- Gunakan useDraggable dari @dnd-kit/core
- Saat di-drag: opacity turun, scale sedikit besar
- Saat isUsed: visibility hidden (jangan hapus dari DOM)
- Saat isDisabled: tidak bisa di-drag, opacity rendah
- Font besar dan bold (cocok untuk anak SD)

2. src/components/game/DropPlaceholder.tsx
Props: id, currentAnswer, isCorrect (boolean|null), isShaking
- Gunakan useDroppable dari @dnd-kit/core
- Kosong: border dashed
- isCorrect true: border hijau + bg hijau muda (gunakan
  --color-semantic-state-success-light)
- isShaking true: tambah class animate-shake
- Ukuran minimal 120×48px, responsif

Bungkus penggunaan di halaman play dengan DndContext dari @dnd-kit/core.
Gunakan CSS variables dari design system untuk semua warna.
```

---

### 7.7 Prompt: Buat Sistem Achievement

```
Buat src/data/achievements.ts dan src/hooks/useAchievement.ts

Achievement (minimal 5):
1. "perfect" — Semua benar (score === 5)
2. "speed-demon" — Semua benar + waktu < 50% timeLimit
3. "persistent" — incorrectAttempts >= 3 DAN score >= 3
4. "three-stars" — stars === 3
5. "first-complete" — attempts === 1 (pertama kali)

Interface Achievement:
{ id, title, description, emoji, condition: (result: GameResult) => boolean }

Hook useAchievement:
- Input: GameResult
- Output: Achievement[] yang kondisinya terpenuhi
```

---

### 7.8 Prompt: Buat ResultPopup

```
Buat src/components/game/ResultPopup.tsx

Props: stars (0|1|2|3), score, totalQuestions, achievements,
       onPlayAgain, onNextLevel, onHome

Tampilkan:
1. Animasi pop-in saat muncul (gunakan animate-pop-in)
2. Judul dinamis per jumlah bintang
3. Row 3 bintang — diraih: warna --color-yellow-base, kosong: abu
4. Bintang muncul satu per satu (delay 200ms per bintang)
5. Teks "X dari 5 jawaban benar"
6. Grid achievement (jika ada)
7. Tiga tombol: Ulangi, Level Berikutnya, Beranda

Background overlay: bg-black/50
Card: bg-white, rounded-2xl, shadow-xl
Gunakan text utilities dari design system (.text-h4-bold, dll)
```

---

### 7.9 Prompt: Setup localStorage Helper

```
Buat src/utils/storage.ts

const STORAGE_KEY = 'word-to-picture-progress';

Fungsi:
1. loadProgress(): AppProgress
2. saveProgress(progress: AppProgress): void
3. updateLevelProgress(unitId, levelId, result): void
   → Simpan hanya jika stars baru > stars lama
   → Selalu increment attempts
4. getLevelProgress(unitId, levelId): LevelProgress | null
5. resetAllProgress(): void
6. isLevelUnlocked(unitId, levelId): boolean
   → Level 1 selalu terbuka
   → Level 2 terbuka jika level 1 stars >= 1
   → Level 3 terbuka jika level 2 stars >= 1
   → Semua unit selalu terbuka

Handle SSR: cek typeof window !== 'undefined' sebelum akses localStorage.
TypeScript strict — tidak ada tipe any.
Import types dari @/types.
```

---

### 7.10 Prompt: Setup Data Soal

```
Buat template data soal untuk keempat unit.

Format (src/data/questions/unit1.ts):
import type { Level } from '@/types';

const unit1Levels: Level[] = [
  {
    id: 1,
    timeLimit: 120,
    questions: [
      {
        id: 'u1-l1-q1',
        type: 'word-to-image',
        questionText: 'This is a ___',
        questionImage: '/images/questions/unit1/cat.png',
        options: ['cat', 'dog', 'bird', 'fish'],
        correctAnswer: 'cat',
      },
      // 4 soal lagi
    ],
  },
  { id: 2, timeLimit: 90, questions: [ /* 5 soal */ ] },
  { id: 3, timeLimit: 60, questions: [ /* 5 soal */ ] },
];
export default unit1Levels;

Tema per unit:
- Unit 1: Animals (hewan)
- Unit 2: Colors & Shapes
- Unit 3: Numbers & Counting
- Unit 4: Family Members

ID format: u[unitId]-l[levelId]-q[1-5]
Buat placeholder untuk semua 4 unit.
```

---

## 8. Konvensi & Aturan Koding

### Penamaan

| Item | Konvensi | Contoh |
|------|----------|--------|
| Komponen | PascalCase | `DragCard.tsx` |
| Hook | camelCase + prefix use | `useGameState.ts` |
| Util | camelCase | `scoring.ts` |
| Type/Interface | PascalCase | `GameResult` |
| CSS class utility | kebab-case | `.text-h1-bold` |

### Urutan Import

```typescript
// 1. React & Next.js
import { useState, useReducer } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// 2. Library pihak ketiga
import { useDraggable } from '@dnd-kit/core';

// 3. Komponen internal
import Button from '@/components/ui/Button';

// 4. Hooks
import { useGameState } from '@/hooks/useGameState';

// 5. Types
import type { Question, GameState } from '@/types';

// 6. Data & Utils
import { calculateStars } from '@/utils/scoring';
```

### Penggunaan Warna di Komponen

```tsx
// ✅ Benar — pakai CSS variable
<div className="bg-[var(--color-semantic-bg-white)]">

// ✅ Benar — pakai foundation color via Tailwind
<div className="bg-neutral-50 text-neutral-900">

// ✅ Benar — pakai text utility class
<h1 className="text-h4-bold text-neutral-900">Judul</h1>

// ❌ Hindari — hardcode warna
<div style={{ backgroundColor: '#FFFFFF' }}>
```

---

## 9. Checklist QA per Fitur

### Home Page (/)
- [ ] 4 unit card ditampilkan
- [ ] Progress bintang terekap dari localStorage
- [ ] Navigasi ke `/unit/[unitId]` benar
- [ ] Tombol reset muncul hanya saat `?dev=true`

### Unit Page (/unit/[unitId])
- [ ] 3 level card ditampilkan
- [ ] Level 1 selalu terbuka
- [ ] Level 2 terbuka jika level 1 ≥ 1 bintang
- [ ] Level 3 terbuka jika level 2 ≥ 1 bintang
- [ ] Bintang yang diraih tampil di card

### Play Page (/play/[unitId]/[levelId])
- [ ] Loading screen 2–3 detik sebelum game
- [ ] Timer berjalan mundur
- [ ] Timer merah saat ≤ 10 detik
- [ ] Stage indicator benar (2-2-1)
- [ ] Drag & drop berfungsi
- [ ] Placeholder hijau saat benar
- [ ] Card shake + pesan saat salah
- [ ] Jawaban benar tidak bisa diubah
- [ ] Jawaban salah bisa dicoba lagi
- [ ] Pindah stage otomatis setelah semua soal dijawab
- [ ] Game selesai setelah stage 2 atau timer habis
- [ ] Progress tersimpan ke localStorage

### Result Page (/result/[unitId]/[levelId])
- [ ] Bintang sesuai skor
- [ ] Animasi bintang muncul satu per satu
- [ ] Achievement yang relevan tampil
- [ ] Tombol Ulangi, Level Berikutnya, Beranda berfungsi
- [ ] Level Berikutnya hidden di level 3

### Reset (/reset)
- [ ] Halaman konfirmasi tampil
- [ ] Tombol Batal kembali ke home
- [ ] Tombol Reset hapus localStorage + redirect ke /
- [ ] Setelah reset, semua bintang hilang

---

*Versi: 2.0 — Word to Picture | Tailwind v4 | Tanpa Zustand*
*Update terakhir: sesuai sesi diskusi*