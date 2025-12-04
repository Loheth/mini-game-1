import { create } from 'zustand';
import { Character } from '../data/scenarios';

export type GameState = 'start' | 'playing' | 'gameOver';

interface GameStore {
  gameState: GameState;
  currentRound: number;
  score: number;
  streak: number;
  selectedCharacter: Character | null;
  isAnswering: boolean;
  showFeedback: boolean;
  
  startGame: () => void;
  selectCharacter: (character: Character) => void;
  nextRound: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: 'start',
  currentRound: 1,
  score: 0,
  streak: 0,
  selectedCharacter: null,
  isAnswering: false,
  showFeedback: false,

  startGame: () => {
    set({
      gameState: 'playing',
      currentRound: 1,
      score: 0,
      streak: 0,
      selectedCharacter: null,
      isAnswering: false,
      showFeedback: false,
    });
  },

  selectCharacter: (character: Character) => {
    const { isAnswering } = get();
    if (isAnswering) return;

    set({ isAnswering: true, selectedCharacter: character });

    const isCorrect = character.isUnsafe;
    const { streak } = get();

    if (isCorrect) {
      // Correct answer
      const basePoints = 100;
      const streakBonus = streak * 20;
      const pointsEarned = basePoints + streakBonus;

      set((state) => ({
        score: state.score + pointsEarned,
        streak: state.streak + 1,
      }));

      // Auto advance after 1 second
      setTimeout(() => {
        get().nextRound();
      }, 1000);
    } else {
      // Incorrect answer
      set({ streak: 0, showFeedback: true });

      // Auto advance after 2 seconds
      setTimeout(() => {
        set({ showFeedback: false });
        get().nextRound();
      }, 2000);
    }
  },

  nextRound: () => {
    const { currentRound } = get();
    if (currentRound >= 10) {
      set({ gameState: 'gameOver', isAnswering: false });
    } else {
      set({
        currentRound: currentRound + 1,
        selectedCharacter: null,
        isAnswering: false,
      });
    }
  },

  resetGame: () => {
    set({
      gameState: 'start',
      currentRound: 1,
      score: 0,
      streak: 0,
      selectedCharacter: null,
      isAnswering: false,
      showFeedback: false,
    });
  },
}));

