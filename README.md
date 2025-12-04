# Catch the Hacker

A fast, simple web game built with React + TypeScript + Vite + Tailwind CSS.

## Tech Stack

- **Vite** - Fast build tool and dev server
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling with cyberpunk theme
- **Zustand** - Lightweight state management
- **Framer Motion** - Animation library
- **canvas-confetti** - Celebration effects

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Game Rules

- Identify the character with unsafe cybersecurity behavior in each round
- Correct answers earn 100 base points + 20 points per streak
- Incorrect answers reset your streak
- Complete all 10 rounds to see your final score

## Project Structure

```
src/
├── components/       # React components
├── data/            # Game scenarios data
├── lib/             # Utility functions (leaderboard API)
├── store/           # Zustand state management
├── App.tsx          # Main app component
└── main.tsx         # Entry point

