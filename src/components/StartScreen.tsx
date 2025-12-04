import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export function StartScreen() {
  const startGame = useGameStore((state) => state.startGame);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen items-center justify-center p-4 md:p-8"
    >
      <div className="w-full max-w-4xl border-4 border-minecraft-border bg-minecraft-dirt/80 p-6 md:p-10 text-center pixel-shadow">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          className="text-block-shadow text-3xl md:text-5xl leading-[1.4]"
        >
          CRAFT YOUR CYBER DEFENSE
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
          className="mt-6 text-sm md:text-base text-minecraft-cobble"
        >
          Spot the shady mob in each scenario before the realm is compromised.
          <br />
          <span className="text-minecraft-emerald">Earn emeralds</span> for every safe call and keep your streak alive.
        </motion.p>

        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startGame}
          className="mt-10 inline-block border-4 border-minecraft-border bg-minecraft-emerald px-10 py-4 text-sm text-minecraft-border transition-transform duration-200 pixel-shadow"
        >
          START ADVENTURE
        </motion.button>
      </div>
    </motion.div>
  );
}

