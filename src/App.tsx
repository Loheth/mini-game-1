import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGameStore } from './store/gameStore';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { ResultScreen } from './components/ResultScreen';
import { useAudio } from './hooks/useAudio';

function App() {
  const gameState = useGameStore((state) => state.gameState);
  const { playBgMusic } = useAudio();

  useEffect(() => {
    playBgMusic();
  }, [playBgMusic]);

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {gameState === 'start' && <StartScreen key="start" />}
        {gameState === 'playing' && <GameScreen key="playing" />}
        {gameState === 'gameOver' && <ResultScreen key="gameOver" />}
      </AnimatePresence>
    </div>
  );
}

export default App;

