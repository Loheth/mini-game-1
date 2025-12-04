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
      className="mb-8 border-4 border-minecraft-border bg-minecraft-dirtDark/90 p-6 md:p-8 pixel-shadow"
    >
      <h2 className="text-center text-block-shadow text-minecraft-emerald">LEADERBOARD</h2>
      
      {isLoading ? (
        <div className="mt-6 text-center text-minecraft-cobble">Loading...</div>
      ) : (
        <div className="mt-6 space-y-4">
          {scores.map((entry, index) => (
            <motion.div
              key={`${entry.nickname}-${entry.score}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className="flex items-center justify-between border-4 border-minecraft-border bg-minecraft-dirt/80 px-4 py-3 text-xs text-white pixel-shadow"
            >
              <div className="flex items-center gap-4">
                <span className="border-4 border-minecraft-border bg-minecraft-lapis px-3 py-2 text-block-shadow">
                  {index + 1}
                </span>
                <span>{entry.nickname}</span>
              </div>
              <span className="text-minecraft-emerald text-block-shadow">{entry.score}</span>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

