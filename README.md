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
- **Express** - Backend API server for leaderboard

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development servers:
   - **Option A**: Run both frontend and backend together:
   ```bash
   npm run dev:all
   ```
   
   - **Option B**: Run them separately (in two terminals):
   ```bash
   # Terminal 1: Backend API server
   npm run dev:server
   
   # Terminal 2: Frontend dev server
   npm run dev
   ```

3. Build for production:
```bash
npm run build
```

**Note**: The leaderboard API server runs on `http://localhost:3001` by default. The frontend is configured to proxy API requests to the backend during development.

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
server/
├── index.js          # Express backend server
└── leaderboard.json  # Leaderboard data storage
```

