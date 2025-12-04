import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGameStore } from './store/gameStore';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { ResultScreen } from './components/ResultScreen';
import { MuteButton } from './components/MuteButton';
import { useAudio } from './hooks/useAudio';

function App() {
  const gameState = useGameStore((state) => state.gameState);
  const isMuted = useGameStore((state) => state.isMuted);
  const { playBgMusic, stopBgMusic } = useAudio();

  useEffect(() => {
    if (!isMuted) {
      playBgMusic();
    } else {
      stopBgMusic();
    }
  }, [playBgMusic, stopBgMusic, isMuted]);

  return (
    <div className="min-h-screen">
      <MuteButton />
      <AnimatePresence mode="wait">
        {gameState === 'start' && <StartScreen key="start" />}
        {gameState === 'playing' && <GameScreen key="playing" />}
        {gameState === 'gameOver' && <ResultScreen key="gameOver" />}
      </AnimatePresence>
    </div>
  );
}

export default App;

