'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { GameState, Religion } from './types';
import { initializeGame, processRound } from './engine';

interface GameContextType {
  gameState: GameState | null;
  startGame: (religion: Religion) => void;
  playCard: (cardIndex: number) => void;
  continueToNextRound: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState | null>(null);

  const startGame = useCallback((religion: Religion) => {
    const newState = initializeGame(religion);
    setGameState(newState);
  }, []);

  const playCard = useCallback((cardIndex: number) => {
    if (!gameState || gameState.phase !== 'playing') return;
    
    const newState = processRound(gameState, cardIndex);
    setGameState(newState);
  }, [gameState]);

  const continueToNextRound = useCallback(() => {
    if (!gameState || gameState.phase !== 'round_result') return;
    
    setGameState({
      ...gameState,
      phase: 'playing',
      playedCards: [],
      turnResults: [],
    });
  }, [gameState]);

  const resetGame = useCallback(() => {
    setGameState(null);
  }, []);

  return (
    <GameContext.Provider
      value={{
        gameState,
        startGame,
        playCard,
        continueToNextRound,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
