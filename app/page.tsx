'use client';

import { GameProvider } from '@/lib/game/context';
import { Game } from '@/components/game/Game';

export default function HomePage() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}
