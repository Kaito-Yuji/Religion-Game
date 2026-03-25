'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { TurnResult, RELIGION_INFO, PlayerResources } from '@/lib/game/types';
import { GameCard } from './GameCard';
import { useGame } from '@/lib/game/context';
import Image from 'next/image';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';

interface RoundResultProps {
  results: TurnResult[];
}

const ResultCard = ({ result, index }: { result: TurnResult; index: number }) => {
  const religionInfo = RELIGION_INFO[result.religion];
  
  const changes = result.resourceChanges;

  const isPositive = Object.values(changes).some((v) => v && v > 0);
  const isNegative = Object.values(changes).some((v) => v && v < 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2 }}
      className={`
        relative bg-card rounded-xl p-4 border-2
        ${isPositive && !isNegative ? 'border-green-500/50' : ''}
        ${isNegative && !isPositive ? 'border-red-500/50' : ''}
        ${isPositive && isNegative ? 'border-yellow-500/50' : ''}
        ${!isPositive && !isNegative ? 'border-border' : ''}
      `}
    >
      <div className="flex items-center gap-4">
        {/* Player Info */}
        <div className="flex items-center gap-3 min-w-[120px]">
          <div
            className="relative w-10 h-10 rounded-full overflow-hidden border-2"
            style={{ borderColor: religionInfo.color }}
          >
            <Image
              src={religionInfo.avatar}
              alt={result.playerName}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div>
            <p className="font-bold text-foreground text-sm">{result.playerName}</p>
            <p className="text-[10px] text-muted-foreground">{religionInfo.name}</p>
          </div>
        </div>

        {/* Arrow */}
        <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />

        {/* Card Played */}
        <div className="shrink-0">
          <GameCard card={result.cardPlayed} disabled size="sm" />
        </div>

        {/* Arrow */}
        <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />

        {/* Changes */}
        <div className="flex-1 flex flex-wrap gap-2">
          {Object.entries(changes).map(([key, value]) => {
            if (!value) return null;
            const resourceName =
              key === 'reputation' ? 'Uy tín' :
              key === 'belief' ? 'Niềm tin' :
              'Cộng đồng';

            return (
              <motion.div
                key={key}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2 + 0.3 }}
                className={`
                  flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold
                  ${value > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
                `}
              >
                {value > 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{resourceName}</span>
                <span>{value > 0 ? '+' : ''}{value}</span>
              </motion.div>
            );
          })}
          {Object.keys(changes).filter(k => changes[k as keyof PlayerResources] !== 0).length === 0 && (
            <span className="text-xs text-muted-foreground">Không thay đổi</span>
          )}
        </div>
      </div>

      {/* Glow effect for positive results */}
      {isPositive && !isNegative && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(34, 197, 94, 0.2) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Shake effect for negative results */}
      {isNegative && !isPositive && (
        <motion.div
          animate={{ x: [0, -2, 2, -2, 0] }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 rounded-xl pointer-events-none border-2 border-red-500/30"
        />
      )}
    </motion.div>
  );
};

export const RoundResult = ({ results }: RoundResultProps) => {
  const { continueToNextRound, gameState } = useGame();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-card border border-border rounded-2xl p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
          Kết Quả Vòng {gameState?.currentRound ? gameState.currentRound - 1 : 0}
        </h2>
        <p className="text-muted-foreground text-center mb-6">
          Xem lá bài mà mọi người đã đánh và kết quả
        </p>

        <AnimatePresence>
          <div className="space-y-4">
            {results.map((result, index) => (
              <ResultCard key={result.playerId} result={result} index={index} />
            ))}
          </div>
        </AnimatePresence>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: results.length * 0.2 + 0.5 }}
          onClick={continueToNextRound}
          className="mt-6 w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors"
        >
          Tiếp Tục
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
