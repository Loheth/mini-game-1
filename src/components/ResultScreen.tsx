import { motion } from 'framer-motion';
import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { submitScore } from '../lib/leaderboardApi';
import { Leaderboard } from './Leaderboard';
import { useAudio } from '../hooks/useAudio';

export function ResultScreen() {
  const { score, resetGame } = useGameStore();
  const { playClick } = useAudio();
  const [nickname, setNickname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleSubmit = async () => {
    if (!nickname.trim()) {
      alert('Please enter a nickname');
      return;
    }

    playClick();
    setIsSubmitting(true);
    try {
      const success = await submitScore(nickname.trim(), score);
      if (success) {
        setIsSubmitted(true);
        setShowLeaderboard(true);
      }
    } catch (error) {
      console.error('Failed to submit score:', error);
      alert('Failed to submit score. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-4xl border-4 border-minecraft-border bg-minecraft-dirt/80 p-6 md:p-10 pixel-shadow"
      >
        <div className="mb-10 text-center">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-block-shadow text-3xl md:text-5xl"
          >
            QUEST COMPLETE
          </motion.h1>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mt-6 inline-block border-4 border-minecraft-border bg-minecraft-grass px-6 py-4 text-block-shadow text-minecraft-lapis pixel-shadow"
          >
            Final Score: {score}
          </motion.div>
        </div>

        {!isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="border-4 border-minecraft-border bg-minecraft-dirtDark/80 p-6 pixel-shadow"
          >
            <h2 className="text-sm text-minecraft-cobble">Add your name to the Hall of Fame</h2>
            <div className="mt-4 flex flex-col gap-4 md:flex-row">
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Enter nickname"
                maxLength={20}
                className="flex-1 border-4 border-minecraft-border bg-minecraft-dirt/70 px-4 py-3 text-xs text-white placeholder-minecraft-cobble focus:outline-none focus:border-minecraft-emerald"
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="border-4 border-minecraft-border bg-minecraft-emerald px-6 py-3 text-xs text-minecraft-border transition disabled:opacity-50 disabled:cursor-not-allowed pixel-shadow"
              >
                {isSubmitting ? 'Saving...' : 'Submit'}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 text-center">
            <p className="text-sm text-minecraft-emerald">Score submitted successfully!</p>
          </motion.div>
        )}

        {showLeaderboard && <Leaderboard />}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              playClick();
              resetGame();
            }}
            className="border-4 border-minecraft-border bg-minecraft-lapis px-8 py-3 text-xs text-white pixel-shadow"
          >
            PLAY AGAIN
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

