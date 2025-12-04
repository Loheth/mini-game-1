import { motion } from 'framer-motion';
import { Character } from '../data/scenarios';
import { useGameStore } from '../store/gameStore';

interface CharacterCardProps {
  character: Character;
  index: number;
}

export function CharacterCard({ character, index }: CharacterCardProps) {
  const { selectCharacter, selectedCharacter, isAnswering } = useGameStore();
  const isSelected = selectedCharacter?.id === character.id;
  const isCorrect = character.isUnsafe;
  const showResult = isAnswering && selectedCharacter;

  const handleClick = () => {
    if (!isAnswering) {
      selectCharacter(character);
    }
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        x: showResult && isSelected && !isCorrect ? [0, -10, 10, -10, 10, 0] : 0,
      }}
      transition={{
        delay: index * 0.1,
        type: 'spring',
        stiffness: 200,
        damping: 15,
        x: showResult && isSelected && !isCorrect ? {
          duration: 0.5,
          repeat: 0,
        } : undefined,
      }}
      whileHover={!isAnswering ? { scale: 1.05 } : {}}
      whileTap={!isAnswering ? { scale: 0.98 } : {}}
      onClick={handleClick}
      className={`
        relative cursor-pointer rounded-lg border-2 p-6
        transition-all duration-300
        ${
          showResult && isSelected
            ? isCorrect
              ? 'border-cyber-green bg-cyber-green/20 shadow-lg shadow-cyber-green/50'
              : 'border-red-500 bg-red-500/20 shadow-lg shadow-red-500/50'
            : 'border-cyber-purple/50 bg-cyber-dark/50 hover:border-cyber-green/70 hover:bg-cyber-dark/70'
        }
        ${isAnswering && !isSelected ? 'opacity-50' : ''}
        ${isAnswering ? 'cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {showResult && isSelected && isCorrect && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 rounded-lg bg-cyber-green/30"
        />
      )}
      
      {showResult && isSelected && !isCorrect && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-lg bg-red-500/30"
        />
      )}

      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-2 text-cyber-green">{character.name}</h3>
        <p className="text-sm text-gray-300 mb-3">{character.description}</p>
        {showResult && isSelected && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-gray-400 mt-2 italic"
          >
            {character.behavior}
          </motion.p>
        )}
      </div>

      {showResult && isSelected && isCorrect && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="absolute top-2 right-2 text-2xl"
        >
          ✓
        </motion.div>
      )}

      {showResult && isSelected && !isCorrect && (
        <motion.div
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="absolute top-2 right-2 text-2xl text-red-500"
        >
          ✗
        </motion.div>
      )}
    </motion.div>
  );
}

