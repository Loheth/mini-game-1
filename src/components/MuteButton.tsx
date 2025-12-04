import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { useAudio } from '../hooks/useAudio';

export function MuteButton() {
  const isMuted = useGameStore((state) => state.isMuted);
  const toggleMute = useGameStore((state) => state.toggleMute);
  const { playClick } = useAudio();

  const handleToggle = () => {
    if (!isMuted) {
      playClick();
    }
    toggleMute();
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleToggle}
      className="fixed right-4 top-4 z-50 border-4 border-minecraft-border bg-minecraft-dirtDark/90 p-3 text-2xl text-white transition hover:bg-minecraft-dirtDark pixel-shadow"
      aria-label={isMuted ? 'Unmute' : 'Mute'}
      title={isMuted ? 'Unmute' : 'Mute'}
    >
      {isMuted ? '🔇' : '🔊'}
    </motion.button>
  );
}

