'use client';

import { useGame } from '@/lib/game/context';
import { CharacterSelect } from './CharacterSelect';
import { GameBoard } from './GameBoard';

export const Game = () => {
  const { gameState } = useGame();

  if (!gameState) {
    return <CharacterSelect />;
  }

  return <GameBoard />;
};
