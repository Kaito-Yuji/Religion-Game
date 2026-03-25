'use client';

import { motion } from 'framer-motion';
import { Player, RELIGION_INFO, MAX_ATTRIBUTE, calculateScore } from '@/lib/game/types';
import Image from 'next/image';
import { Star, Heart, Users, Crown, Trophy } from 'lucide-react';

interface PlayerPanelProps {
  player: Player;
  isCurrentTurn?: boolean;
  isWinner?: boolean;
  showChanges?: {
    reputation?: number;
    belief?: number;
    community?: number;
  };
}

const ResourceBar = ({
  label,
  value,
  maxValue = MAX_ATTRIBUTE,
  color,
  icon: Icon,
  change,
}: {
  label: string;
  value: number;
  maxValue?: number;
  color: string;
  icon: typeof Star;
  change?: number;
}) => {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const isMaxed = value >= maxValue;

  return (
    <div className="flex items-center gap-2">
      <Icon size={14} style={{ color }} className="shrink-0" />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-0.5">
          <span className="text-[10px] text-muted-foreground">{label}</span>
          <div className="flex items-center gap-1">
            <span className={`text-xs font-bold ${isMaxed ? 'text-green-400' : 'text-foreground'}`}>
              {value}/{maxValue}
            </span>
            {change !== undefined && change !== 0 && (
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`text-[10px] font-bold ${change > 0 ? 'text-green-400' : 'text-red-400'}`}
              >
                {change > 0 ? '+' : ''}{change}
              </motion.span>
            )}
          </div>
        </div>
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${isMaxed ? 'animate-pulse' : ''}`}
            style={{ backgroundColor: isMaxed ? '#22C55E' : color }}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
};

export const PlayerPanel = ({
  player,
  isCurrentTurn = false,
  isWinner = false,
  showChanges,
}: PlayerPanelProps) => {
  const religionInfo = RELIGION_INFO[player.religion];
  const totalScore = calculateScore(player.resources);
  const maxTotalScore = MAX_ATTRIBUTE * 3; // 20 * 3 = 60

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        boxShadow: isCurrentTurn ? `0 0 20px ${religionInfo.glowColor}` : 'none',
      }}
      className={`
        relative bg-card rounded-xl p-3 border-2 transition-all duration-300
        ${isCurrentTurn ? 'border-primary' : 'border-border'}
        ${isWinner ? 'ring-2 ring-yellow-400' : ''}
      `}
      style={{
        borderColor: isCurrentTurn ? religionInfo.color : undefined,
      }}
    >
      {/* Winner crown */}
      {isWinner && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-3 left-1/2 -translate-x-1/2"
        >
          <Crown className="w-6 h-6 text-yellow-400 fill-yellow-400" />
        </motion.div>
      )}

      {/* Player Info */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="relative w-12 h-12 rounded-full overflow-hidden border-2"
          style={{ borderColor: religionInfo.color }}
        >
          <Image
            src={religionInfo.avatar}
            alt={player.name}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-foreground text-sm truncate">
            {player.name}
            {!player.isBot && (
              <span className="ml-1 text-[10px] text-primary">(Bạn)</span>
            )}
          </h3>
          <p className="text-[10px] text-muted-foreground truncate">
            {religionInfo.name}
          </p>
        </div>
        {/* Total score */}
        <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-lg">
          <Trophy className="w-3 h-3 text-primary" />
          <span className="text-sm font-bold text-primary">{totalScore}</span>
        </div>
      </div>

      {/* Resources */}
      <div className="space-y-2">
        <ResourceBar
          label="Uy tín"
          value={player.resources.reputation}
          color="#EAB308"
          icon={Star}
          change={showChanges?.reputation}
        />
        <ResourceBar
          label="Niềm tin"
          value={player.resources.belief}
          color="#A855F7"
          icon={Heart}
          change={showChanges?.belief}
        />
        <ResourceBar
          label="Cộng đồng"
          value={player.resources.community}
          color="#22C55E"
          icon={Users}
          change={showChanges?.community}
        />
      </div>

      {/* Win condition hint */}
      <div className="mt-2 pt-2 border-t border-border/50">
        <p className="text-[9px] text-muted-foreground text-center">
          Đạt {MAX_ATTRIBUTE} ở 1 thuộc tính hoặc tổng điểm cao nhất sau 20 round
        </p>
      </div>

      {/* Turn indicator */}
      {isCurrentTurn && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-primary rounded-full"
        >
          <span className="text-[10px] font-bold text-primary-foreground">Đang chơi</span>
        </motion.div>
      )}
    </motion.div>
  );
};
