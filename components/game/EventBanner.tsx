'use client';

import { motion } from 'framer-motion';
import { GameEvent } from '@/lib/game/types';
import { Sparkles, Calendar, Info } from 'lucide-react';

interface EventBannerProps {
  event: GameEvent;
  currentRound: number;
  maxRounds: number;
}

export const EventBanner = ({ event, currentRound, maxRounds }: EventBannerProps) => {
  // Color based on event type (can be customized per event)
  const eventColors = [
    '#EF4444', // red - crisis
    '#F97316', // orange - disease
    '#EAB308', // yellow - social media
    '#84CC16', // lime - youth
    '#22C55E', // green - disaster relief
    '#14B8A6', // teal - legal
    '#06B6D4', // cyan - unity
    '#3B82F6', // blue - economic
    '#6366F1', // indigo - media
    '#8B5CF6', // violet - internal
    '#A855F7', // purple - festival
    '#D946EF', // fuchsia - youth criticism
    '#EC4899', // pink - competitor
    '#F43F5E', // rose - fake news
    '#22C55E', // green - media opportunity
    '#14B8A6', // teal - new policy
    '#6366F1', // indigo - social pressure
    '#3B82F6', // blue - community development
    '#EF4444', // red - image crisis
    '#22C55E', // green - stability
  ];

  const eventColor = eventColors[(event.id - 1) % eventColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-card rounded-xl border-2 p-4 overflow-hidden"
      style={{
        borderColor: eventColor,
        background: `linear-gradient(135deg, ${eventColor}15 0%, transparent 50%)`,
      }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <Sparkles className="w-full h-full" style={{ color: eventColor }} />
      </div>

      {/* Round indicator */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${eventColor}20` }}
          >
            <Calendar className="w-5 h-5" style={{ color: eventColor }} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Sự kiện vòng {currentRound}</p>
            <h2 className="text-lg font-bold text-foreground">{event.name}</h2>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-muted-foreground">Vòng</p>
          <p className="text-2xl font-bold text-foreground">
            {currentRound}
            <span className="text-sm text-muted-foreground">/{maxRounds}</span>
          </p>
        </div>
      </div>

      {/* Event description */}
      <p className="text-sm text-muted-foreground mb-3">{event.description}</p>

      {/* Info hint */}
      <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
        <Info className="w-4 h-4 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">
          Mỗi tôn giáo có 5 lá bài riêng cho sự kiện này (3 lá lợi, 2 lá hại). Chọn lá bài phù hợp!
        </p>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: eventColor }}
            initial={{ width: 0 }}
            animate={{ width: `${(currentRound / maxRounds) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-muted-foreground">Bắt đầu</span>
          <span className="text-[10px] text-muted-foreground">Kết thúc</span>
        </div>
      </div>
    </motion.div>
  );
};
