import useSound from 'use-sound';
import { useGameStore } from '../store/gameStore';

export function useAudio() {
  const isMuted = useGameStore((state) => state.isMuted);

  const [playBgMusic, { stop: stopBgMusic }] = useSound('/sounds/bg_music.mp3', {
    loop: true,
    volume: 0.005, // Lowered volume for milder background music
    soundEnabled: !isMuted,
  });

  const [playClick] = useSound('/sounds/click.mp3', {
    volume: 0.7,
    soundEnabled: !isMuted,
  });

  const [playCorrect] = useSound('/sounds/correct.mp3', {
    volume: 0.05,
    soundEnabled: !isMuted,
  });

  const [playIncorrect] = useSound('/sounds/incorrect.mp3', {
    volume: 0.8,
    soundEnabled: !isMuted,
  });

  return {
    playBgMusic,
    stopBgMusic,
    playClick,
    playCorrect,
    playIncorrect,
  };
}

