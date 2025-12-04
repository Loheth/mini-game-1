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
  const avatarSeed = encodeURIComponent(`${character.id}-${character.name}`);
  const avatarUrl = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${avatarSeed}&backgroundColor=7fc14b&size=160`;

  const handleClick = () => {
    if (!isAnswering) {
      selectCharacter(character);
    }
  };

  const cardStateClasses = showResult && isSelected
    ? isCorrect
      ? 'border-minecraft-emerald bg-minecraft-grass/20'
      : 'border-minecraft-ember bg-minecraft-dirt/40'
    : 'border-minecraft-border bg-minecraft-dirtDark/70 hover:border-minecraft-grass hover:bg-minecraft-dirt/90';

  return (
    <motion.button
      type="button"
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
      whileHover={!isAnswering ? { scale: 1.02, y: -4 } : {}}
      whileTap={!isAnswering ? { scale: 0.98 } : {}}
      onClick={handleClick}
      disabled={isAnswering}
      aria-pressed={isSelected}
      className={`
        relative flex h-full flex-col gap-4 border-4 p-4 text-left transition-all duration-300 pixel-shadow
        ${cardStateClasses}
        ${isAnswering && !isSelected ? 'opacity-60' : ''}
        ${isAnswering ? 'cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-20 w-20 items-center justify-center border-4 border-minecraft-border bg-minecraft-stone/60 p-1 pixel-shadow">
          <img
            src={avatarUrl}
            alt={`${character.name} avatar`}
            className="h-full w-full object-contain pixelated-image"
            loading="lazy"
          />
        </div>
        <div className="flex-1">
          <p className="text-[10px] text-minecraft-cobble">Mob #{index + 1}</p>
          <h3 className="mt-1 text-sm text-block-shadow">{character.name}</h3>
          <p className="mt-2 text-[10px] text-minecraft-cobble">{character.description}</p>
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-white">{character.behavior}</p>

      {showResult && isSelected && isCorrect && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="absolute right-3 top-2 text-xl text-minecraft-emerald"
        >
          ✓
        </motion.div>
      )}

      {showResult && isSelected && !isCorrect && (
        <motion.div
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="absolute right-3 top-2 text-xl text-minecraft-ember"
        >
          ✗
        </motion.div>
      )}
    </motion.button>
  );
}

