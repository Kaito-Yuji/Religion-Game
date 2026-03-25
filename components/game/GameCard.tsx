'use client';

import { motion } from 'framer-motion';
import { Card, RELIGION_INFO } from '@/lib/game/types';
import { Star, Heart, Users, AlertTriangle, CheckCircle } from 'lucide-react';

interface GameCardProps {
  card: Card;
  onClick?: () => void;
  disabled?: boolean;
  isPlayed?: boolean;
  isRevealed?: boolean;
  index?: number;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-24 h-32',
  md: 'w-32 h-44',
  lg: 'w-40 h-56',
};

export const GameCard = ({
  card,
  onClick,
  disabled = false,
  isPlayed = false,
  isRevealed = true,
  index = 0,
  size = 'md',
}: GameCardProps) => {
  const religionInfo = RELIGION_INFO[card.religion];
  const isNegative = card.isNegative;

  const cardVariants = {
    initial: { rotateY: 180, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    hover: { y: -10, scale: 1.05 },
    tap: { scale: 0.95 },
    played: { y: -100, opacity: 0, scale: 0.8 },
  };

  if (!isRevealed) {
    return (
      <motion.div
        initial={{ rotateY: 180 }}
        animate={{ rotateY: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`${sizeClasses[size]} rounded-lg bg-gradient-to-br from-secondary to-muted border-2 border-border flex items-center justify-center`}
        style={{ perspective: 1000 }}
      >
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-primary text-lg">?</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.button
      variants={cardVariants}
      initial="initial"
      animate={isPlayed ? 'played' : 'animate'}
      whileHover={!disabled ? 'hover' : undefined}
      whileTap={!disabled ? 'tap' : undefined}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${sizeClasses[size]}
        relative rounded-lg overflow-hidden
        ${isNegative 
          ? 'bg-gradient-to-br from-red-950/80 to-red-900/50' 
          : 'bg-gradient-to-br from-green-950/80 to-green-900/50'
        }
        border-2 transition-colors duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-lg'}
        flex flex-col p-2
        focus:outline-none focus:ring-2 focus:ring-primary
      `}
      style={{
        borderColor: isNegative ? '#EF4444' : '#22C55E',
        boxShadow: `0 4px 20px ${isNegative ? '#EF444430' : '#22C55E30'}`,
      }}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between mb-1">
        {isNegative ? (
          <AlertTriangle size={size === 'sm' ? 12 : 16} className="text-red-400" />
        ) : (
          <CheckCircle size={size === 'sm' ? 12 : 16} className="text-green-400" />
        )}
        <div
          className="px-1.5 py-0.5 rounded text-[8px] font-medium truncate max-w-[60%]"
          style={{ backgroundColor: `${religionInfo.color}30`, color: religionInfo.color }}
        >
          {religionInfo.name.split(' ')[0]}
        </div>
      </div>

      {/* Card Name */}
      <h4 className={`font-bold text-foreground text-center leading-tight mb-1 ${
        size === 'sm' ? 'text-[10px] line-clamp-2' : 'text-xs line-clamp-2'
      }`}>
        {card.name}
      </h4>

      {/* Card Description */}
      <p className={`text-muted-foreground leading-tight text-center flex-1 ${
        size === 'sm' ? 'text-[8px] line-clamp-2' : 'text-[10px] line-clamp-3'
      }`}>
        {card.description}
      </p>

      {/* Effect indicators */}
      <div className="mt-auto flex flex-wrap gap-1 justify-center">
        {card.effects.reputation !== 0 && (
          <div className={`flex items-center gap-0.5 px-1 py-0.5 rounded ${
            card.effects.reputation > 0 ? 'bg-yellow-500/20' : 'bg-red-500/20'
          }`}>
            <Star size={10} className="text-yellow-400" />
            <span className={`text-[9px] font-bold ${
              card.effects.reputation > 0 ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {card.effects.reputation > 0 ? '+' : ''}{card.effects.reputation}
            </span>
          </div>
        )}
        {card.effects.belief !== 0 && (
          <div className={`flex items-center gap-0.5 px-1 py-0.5 rounded ${
            card.effects.belief > 0 ? 'bg-purple-500/20' : 'bg-red-500/20'
          }`}>
            <Heart size={10} className="text-purple-400" />
            <span className={`text-[9px] font-bold ${
              card.effects.belief > 0 ? 'text-purple-400' : 'text-red-400'
            }`}>
              {card.effects.belief > 0 ? '+' : ''}{card.effects.belief}
            </span>
          </div>
        )}
        {card.effects.community !== 0 && (
          <div className={`flex items-center gap-0.5 px-1 py-0.5 rounded ${
            card.effects.community > 0 ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}>
            <Users size={10} className="text-green-400" />
            <span className={`text-[9px] font-bold ${
              card.effects.community > 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {card.effects.community > 0 ? '+' : ''}{card.effects.community}
            </span>
          </div>
        )}
      </div>

      {/* Negative/Positive indicator */}
      <div className={`absolute top-0 right-0 px-1 py-0.5 rounded-bl text-[8px] font-bold ${
        isNegative ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
      }`}>
        {isNegative ? 'Hại' : 'Lợi'}
      </div>

      {/* Glow effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(circle at center, ${isNegative ? '#EF444420' : '#22C55E20'} 0%, transparent 70%)`,
        }}
      />
    </motion.button>
  );
};
