import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { fetchTopScores, LeaderboardEntry } from '../lib/leaderboardApi';

export function Leaderboard() {
  const [scores, setScores] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadScores = async () => {
    setIsLoading(true);
    try {
      const topScores = await fetchTopScores();
      setScores(topScores);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadScores();
    // Auto-refresh every 10 seconds
    const interval = setInterval(loadScores, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-cyber-dark border-2 border-cyber-purple/50 rounded-lg p-6 md:p-8 mb-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-cyber-green text-center">Leaderboard</h2>
      
      {isLoading ? (
        <div className="text-center text-gray-400">Loading...</div>
      ) : (
        <div className="space-y-3">
          {scores.map((entry, index) => (
            <motion.div
              key={`${entry.nickname}-${entry.score}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex justify-between items-center p-4 bg-cyber-darker/50 rounded-lg
                       border border-cyber-purple/30 hover:border-cyber-green/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-cyber-pink w-8">
                  {index + 1}
                </span>
                <span className="text-xl font-bold text-white">{entry.nickname}</span>
              </div>
              <span className="text-xl font-bold text-cyber-green">{entry.score}</span>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

