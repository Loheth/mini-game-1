import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { useGameStore } from '../store/gameStore';
import { scenarios, Scenario } from '../data/scenarios';
import { CharacterCard } from './CharacterCard';
import { Character } from '../data/scenarios';

export function GameScreen() {
  const { currentRound, score, streak, showFeedback, selectedCharacter } = useGameStore();
  const [shuffledCharacters, setShuffledCharacters] = useState<Character[]>([]);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);

  useEffect(() => {
    const scenario = scenarios[currentRound - 1];
    if (scenario) {
      setCurrentScenario(scenario);
      // Shuffle characters array
      const shuffled = [...scenario.characters].sort(() => Math.random() - 0.5);
      setShuffledCharacters(shuffled);
    }
  }, [currentRound]);

  useEffect(() => {
    if (selectedCharacter && selectedCharacter.isUnsafe) {
      // Trigger confetti on correct answer
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00ff88', '#ff0080', '#8b5cf6'],
      });
    }
  }, [selectedCharacter]);

  if (!currentScenario) return null;

  const unsafeCharacter = currentScenario.characters.find((c) => c.isUnsafe);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <motion.div
            key={currentRound}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-block mb-4"
          >
            <span className="text-2xl md:text-3xl font-bold text-cyber-green">
              Round {currentRound} / 10
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-glow-pink">
            {currentScenario.theme}
          </h2>
          <div className="flex justify-center gap-6 mt-4">
            <div className="text-lg">
              <span className="text-gray-400">Score: </span>
              <span className="text-cyber-green font-bold">{score}</span>
            </div>
            <div className="text-lg">
              <span className="text-gray-400">Streak: </span>
              <span className="text-cyber-pink font-bold">{streak}</span>
            </div>
          </div>
        </div>

        {/* Character Cards */}
        <motion.div
          key={`round-${currentRound}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {shuffledCharacters.map((character, index) => (
            <CharacterCard key={character.id} character={character} index={index} />
          ))}
        </motion.div>

        {/* Feedback Modal */}
        <AnimatePresence>
          {showFeedback && unsafeCharacter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                className="bg-cyber-dark border-2 border-red-500 rounded-lg p-6 md:p-8 max-w-2xl"
              >
                <h3 className="text-2xl font-bold text-red-500 mb-4">Incorrect!</h3>
                <p className="text-gray-300 mb-4">
                  The correct answer was <span className="text-cyber-green font-bold">{unsafeCharacter.name}</span>
                </p>
                <p className="text-gray-400 italic">{unsafeCharacter.behavior}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

