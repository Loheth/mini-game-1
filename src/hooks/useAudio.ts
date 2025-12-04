import useSound from 'use-sound';

export function useAudio() {
  const [playBgMusic] = useSound('/sounds/bg_music.mp3', {
    loop: true,
    volume: 0.005,
  });

  const [playClick] = useSound('/sounds/click.mp3', {
    volume: 0.7,
  });

  const [playCorrect] = useSound('/sounds/correct.mp3', {
    volume: 0.05,
  });

  const [playIncorrect] = useSound('/sounds/incorrect.mp3', {
    volume: 0.8,
  });

  return {
    playBgMusic,
    playClick,
    playCorrect,
    playIncorrect,
  };
}

