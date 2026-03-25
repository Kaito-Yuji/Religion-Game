'use client';

import { motion } from 'framer-motion';
import { useGame } from '@/lib/game/context';
import { PlayerPanel } from './PlayerPanel';
import { GameCard } from './GameCard';
import { EventBanner } from './EventBanner';
import { RoundResult } from './RoundResult';
import { GameOver } from './GameOver';
import { useState } from 'react';
import { RELIGION_INFO, getHighestAttribute, MAX_ATTRIBUTE } from '@/lib/game/types';
import { Trophy, Target } from 'lucide-react';

export const GameBoard = () => {
  const { gameState, playCard } = useGame();
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

  if (!gameState) return null;

  const humanPlayer = gameState.players[0];
  const botPlayers = gameState.players.slice(1);
  const religionInfo = RELIGION_INFO[humanPlayer.religion];
  const humanHighestAttr = getHighestAttribute(humanPlayer.resources);

  const handleCardClick = (index: number) => {
    if (gameState.phase !== 'playing') return;
    setSelectedCardIndex(index);
  };

  const handleConfirmPlay = () => {
    if (selectedCardIndex === null) return;
    playCard(selectedCardIndex);
    setSelectedCardIndex(null);
  };

  const handleCancelSelection = () => {
    setSelectedCardIndex(null);
  };

  // Calculate changes for display in round_result
  const getPlayerChanges = (playerId: string) => {
    const result = gameState.turnResults.find((r) => r.playerId === playerId);
    if (!result) return undefined;
    
    return {
      reputation: result.resourceChanges.reputation || 0,
      belief: result.resourceChanges.belief || 0,
      community: result.resourceChanges.community || 0,
    };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Game Over Screen */}
      {gameState.phase === 'game_over' && gameState.winner && (
        <GameOver 
          winner={gameState.winner} 
          players={gameState.players} 
          winReason={gameState.winReason}
        />
      )}

      {/* Round Result Modal */}
      {gameState.phase === 'round_result' && gameState.turnResults.length > 0 && (
        <RoundResult results={gameState.turnResults} />
      )}

      {/* Main Game Layout */}
      <div className="p-4 max-w-7xl mx-auto">
        {/* Top Section: Event Banner */}
        {gameState.currentEvent && (
          <EventBanner
            event={gameState.currentEvent}
            currentRound={gameState.currentRound}
            maxRounds={gameState.maxRounds}
          />
        )}

        {/* Score Progress */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Thuộc tính cao nhất:</span>
            <span className="text-lg font-bold text-primary">{humanHighestAttr}/{MAX_ATTRIBUTE}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border">
            <Target className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">Mục tiêu:</span>
            <span className="text-lg font-bold text-accent">Chơi {gameState.maxRounds} vòng</span>
          </div>
          <div className="w-48 h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((humanHighestAttr / MAX_ATTRIBUTE) * 100, 100)}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Middle Section: Players Grid */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Human Player */}
          <PlayerPanel
            player={humanPlayer}
            isCurrentTurn={gameState.phase === 'playing'}
            isWinner={gameState.winner?.id === humanPlayer.id}
            showChanges={gameState.phase === 'round_result' ? getPlayerChanges(humanPlayer.id) : undefined}
          />

          {/* Bot Players */}
          {botPlayers.map((bot) => (
            <PlayerPanel
              key={bot.id}
              player={bot}
              isWinner={gameState.winner?.id === bot.id}
              showChanges={gameState.phase === 'round_result' ? getPlayerChanges(bot.id) : undefined}
            />
          ))}
        </div>

        {/* Bottom Section: Player's Hand */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground">Bài của bạn</h3>
            <span className="text-sm text-muted-foreground">
              {humanPlayer.hand.length}/5 lá | Đánh 1 lá mỗi lượt
            </span>
          </div>

          {/* Card Selection UI */}
          <div className="flex flex-col items-center gap-6">
            {/* Cards */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {humanPlayer.hand.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: selectedCardIndex === index ? -20 : 0,
                    scale: selectedCardIndex === index ? 1.1 : 1,
                  }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    ${selectedCardIndex === index ? 'ring-2 ring-primary rounded-lg' : ''}
                  `}
                >
                  <GameCard
                    card={card}
                    onClick={() => handleCardClick(index)}
                    disabled={gameState.phase !== 'playing'}
                    index={index}
                    size="lg"
                  />
                </motion.div>
              ))}
            </div>

            {/* Selection Actions */}
            {selectedCardIndex !== null && gameState.phase === 'playing' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4"
              >
                <button
                  onClick={handleCancelSelection}
                  className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleConfirmPlay}
                  className="px-6 py-2 rounded-lg font-bold text-primary-foreground transition-colors"
                  style={{ backgroundColor: religionInfo.color }}
                >
                  Đánh Lá Này
                </button>
              </motion.div>
            )}

            {/* Instruction */}
            {selectedCardIndex === null && gameState.phase === 'playing' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-muted-foreground text-sm"
              >
                Chọn một lá bài để đánh (lá xanh = có lợi, lá đỏ = có hại)
              </motion.p>
            )}
          </div>
        </div>

        {/* Played Cards Display (for round result) */}
        {gameState.phase === 'round_result' && gameState.playedCards.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8"
          >
            <h3 className="text-lg font-bold text-foreground mb-4 text-center">
              Lá bài đã đánh trong vòng này
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {gameState.playedCards.map(({ playerId, card }) => {
                const player = gameState.players.find((p) => p.id === playerId);
                const pReligion = player ? RELIGION_INFO[player.religion] : null;
                return (
                  <div key={`${playerId}-${card.id}`} className="text-center">
                    <GameCard card={card} disabled size="md" />
                    <p
                      className="mt-2 text-sm font-medium"
                      style={{ color: pReligion?.color }}
                    >
                      {player?.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
