import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { submitScore } from '../lib/leaderboardApi';
import { Leaderboard } from './Leaderboard';

export function ResultScreen() {
  const { score, resetGame } = useGameStore();
  const [nickname, setNickname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleSubmit = async () => {
    if (!nickname.trim()) {
      alert('Please enter a nickname');
      return;
    }

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
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-bold mb-4 text-glow-green"
          >
            GAME OVER
          </motion.h1>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-4xl md:text-6xl font-bold text-cyber-pink mb-8"
          >
            Final Score: {score}
          </motion.div>
        </div>

        {!isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-cyber-dark border-2 border-cyber-green rounded-lg p-6 md:p-8 mb-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-cyber-green">Submit Your Score</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Enter your nickname"
                maxLength={20}
                className="flex-1 px-4 py-3 bg-cyber-darker border-2 border-cyber-purple/50 rounded-lg
                         text-white placeholder-gray-500 focus:border-cyber-green focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-3 bg-cyber-green text-cyber-darker font-bold rounded-lg
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-8"
          >
            <p className="text-xl text-cyber-green mb-4">Score submitted successfully!</p>
          </motion.div>
        )}

        {showLeaderboard && <Leaderboard />}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className="px-8 py-3 bg-cyber-pink text-white font-bold rounded-lg
                     shadow-lg shadow-cyber-pink/50 hover:shadow-cyber-pink/70"
          >
            Play Again
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

