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
        colors: ['#1fb862', '#1d4ed8', '#d94830'],
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
        className="mx-auto max-w-6xl border-4 border-minecraft-border bg-minecraft-dirt/80 p-4 md:p-8 pixel-shadow"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <motion.div
            key={currentRound}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-block border-4 border-minecraft-border bg-minecraft-grass px-4 py-2 text-xs md:text-sm pixel-shadow"
          >
            ROUND {currentRound} / 10
          </motion.div>
          <h2 className="mt-6 text-2xl md:text-4xl text-block-shadow">
            {currentScenario.theme}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
            <div className="border-4 border-minecraft-border bg-minecraft-dirtDark/70 px-4 py-3 pixel-shadow">
              <span className="block text-minecraft-cobble">Score</span>
              <span className="text-minecraft-emerald text-block-shadow">{score}</span>
            </div>
            <div className="border-4 border-minecraft-border bg-minecraft-dirtDark/70 px-4 py-3 pixel-shadow">
              <span className="block text-minecraft-cobble">Streak</span>
              <span className="text-minecraft-lapis text-block-shadow">{streak}</span>
            </div>
          </div>
        </div>

        {/* Character Cards */}
        <motion.div
          key={`round-${currentRound}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-3"
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
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                className="max-w-2xl border-4 border-minecraft-border bg-minecraft-dirt/90 p-6 md:p-8 pixel-shadow"
              >
                <h3 className="text-xl text-block-shadow text-minecraft-ember">Incorrect!</h3>
                <p className="mt-4 text-sm text-minecraft-cobble">
                  The unsafe mob was{' '}
                  <span className="text-minecraft-emerald">{unsafeCharacter.name}</span>.
                </p>
                <p className="mt-3 text-xs text-white">{unsafeCharacter.behavior}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

