import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export function StartScreen() {
  const startGame = useGameStore((state) => state.startGame);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-8"
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        className="text-6xl md:text-8xl font-bold mb-4 text-glow-green"
      >
        CATCH THE HACKER
      </motion.h1>

      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
        className="text-xl md:text-2xl text-gray-300 mb-8 text-center max-w-2xl"
      >
        Test your cybersecurity knowledge! Identify unsafe behaviors across 10 rounds.
        <br />
        <span className="text-cyber-green">Correct answers</span> earn points and build streaks.
      </motion.p>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={startGame}
        className="px-12 py-4 bg-cyber-green text-cyber-darker font-bold text-xl rounded-lg
                   shadow-lg shadow-cyber-green/50 hover:shadow-cyber-green/70
                   transition-all duration-300"
      >
        START GAME
      </motion.button>
    </motion.div>
  );
}

