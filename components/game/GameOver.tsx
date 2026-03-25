'use client';

import { motion } from 'framer-motion';
import { Player, RELIGION_INFO, calculateScore, MAX_ATTRIBUTE } from '@/lib/game/types';
import { useGame } from '@/lib/game/context';
import Image from 'next/image';
import { Crown, Trophy, Medal, Star, Heart, Users } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface GameOverProps {
  winner: Player;
  players: Player[];
  winReason?: 'max_rounds';
}

const Podium = ({ players }: { players: Player[] }) => {
  // Sort players by total score (sum of all attributes)
  const sortedPlayers = [...players].sort((a, b) => {
    const aTotal = calculateScore(a.resources);
    const bTotal = calculateScore(b.resources);
    return bTotal - aTotal;
  });

  const podiumOrder = [1, 0, 2, 3]; // 2nd, 1st, 3rd, 4th position order for display

  return (
    <div className="flex items-end justify-center gap-2 md:gap-4 mt-8">
      {podiumOrder.map((rankIndex, displayIndex) => {
        const player = sortedPlayers[rankIndex];
        if (!player) return null;

        const rank = rankIndex + 1;
        const totalScore = calculateScore(player.resources);
        const religionInfo = RELIGION_INFO[player.religion];

        const heights = ['h-32', 'h-40', 'h-24', 'h-16'];
        const podiumHeight = heights[rankIndex];

        const medals = [
          { icon: Crown, color: '#FFD700' },
          { icon: Trophy, color: '#C0C0C0' },
          { icon: Medal, color: '#CD7F32' },
          { icon: Star, color: '#808080' },
        ];
        const MedalIcon = medals[rankIndex].icon;
        const medalColor = medals[rankIndex].color;

        return (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: displayIndex * 0.2 }}
            className="flex flex-col items-center"
          >
            {/* Player avatar */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: displayIndex * 0.2 + 0.3, type: 'spring' }}
              className="relative mb-2"
            >
              <div
                className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4"
                style={{ borderColor: religionInfo.color }}
              >
                <Image
                  src={religionInfo.avatar}
                  alt={player.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 64px, 80px"
                />
              </div>
              <div
                className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: medalColor }}
              >
                <MedalIcon className="w-5 h-5 text-black" />
              </div>
            </motion.div>

            {/* Player name and score */}
            <p className="font-bold text-foreground text-sm md:text-base text-center">
              {player.name}
            </p>
            <p className="text-xs text-muted-foreground">{religionInfo.name}</p>
            <p className="text-lg md:text-xl font-bold text-primary">{totalScore} điểm</p>

            {/* Podium */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              transition={{ delay: displayIndex * 0.2 + 0.5 }}
              className={`
                ${podiumHeight} w-20 md:w-24 mt-2 rounded-t-lg flex items-center justify-center
                ${rank === 1 ? 'bg-gradient-to-b from-yellow-500/50 to-yellow-600/50' : ''}
                ${rank === 2 ? 'bg-gradient-to-b from-gray-400/50 to-gray-500/50' : ''}
                ${rank === 3 ? 'bg-gradient-to-b from-amber-700/50 to-amber-800/50' : ''}
                ${rank === 4 ? 'bg-gradient-to-b from-gray-600/50 to-gray-700/50' : ''}
              `}
            >
              <span className="text-2xl md:text-3xl font-bold text-foreground/50">
                {rank}
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

const StatCard = ({
  player,
  delay,
}: {
  player: Player;
  delay: number;
}) => {
  const religionInfo = RELIGION_INFO[player.religion];
  const totalScore = calculateScore(player.resources);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="bg-card border border-border rounded-xl p-4"
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="relative w-10 h-10 rounded-full overflow-hidden border-2"
          style={{ borderColor: religionInfo.color }}
        >
          <Image
            src={religionInfo.avatar}
            alt={player.name}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
        <div>
          <p className="font-bold text-foreground">{player.name}</p>
          <p className="text-xs text-muted-foreground">{religionInfo.name}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-xs text-muted-foreground">Tổng điểm</p>
          <p className="text-xl font-bold text-primary">{totalScore}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className={player.resources.reputation >= MAX_ATTRIBUTE ? 'bg-green-500/20 rounded-lg p-1' : ''}>
          <Star className="w-4 h-4 mx-auto text-yellow-400 mb-1" />
          <p className="text-lg font-bold text-foreground">{player.resources.reputation}/{MAX_ATTRIBUTE}</p>
          <p className="text-[10px] text-muted-foreground">Uy tín</p>
        </div>
        <div className={player.resources.belief >= MAX_ATTRIBUTE ? 'bg-green-500/20 rounded-lg p-1' : ''}>
          <Heart className="w-4 h-4 mx-auto text-purple-400 mb-1" />
          <p className="text-lg font-bold text-foreground">{player.resources.belief}/{MAX_ATTRIBUTE}</p>
          <p className="text-[10px] text-muted-foreground">Niềm tin</p>
        </div>
        <div className={player.resources.community >= MAX_ATTRIBUTE ? 'bg-green-500/20 rounded-lg p-1' : ''}>
          <Users className="w-4 h-4 mx-auto text-green-400 mb-1" />
          <p className="text-lg font-bold text-foreground">{player.resources.community}/{MAX_ATTRIBUTE}</p>
          <p className="text-[10px] text-muted-foreground">Cộng đồng</p>
        </div>
      </div>
    </motion.div>
  );
};

export const GameOver = ({ winner, players, winReason }: GameOverProps) => {
  const { resetGame } = useGame();
  const isHumanWinner = !winner.isBot;

  useEffect(() => {
    // Trigger confetti for human winner
    if (isHumanWinner) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFD700', '#FFA500', '#FF6347'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FFD700', '#FFA500', '#FF6347'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [isHumanWinner]);

  const winReasonText = 'Tổng điểm cao nhất sau 20 vòng';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-background overflow-y-auto"
    >
      <div className="min-h-screen flex flex-col items-center justify-center p-4 py-8">
        {/* Title */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="text-center mb-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            {isHumanWinner ? 'Chúc Mừng!' : 'Trận Đấu Kết Thúc'}
          </h1>
          <p className="text-xl text-muted-foreground">
            {isHumanWinner
              ? 'Bạn đã giành chiến thắng!'
              : `${winner.name} đã giành chiến thắng!`}
          </p>
          <p className="text-sm text-primary mt-2">{winReasonText}</p>
        </motion.div>

        {/* Podium */}
        <Podium players={players} />

        {/* Stats */}
        <div className="w-full max-w-2xl mt-8 space-y-3">
          <h3 className="text-lg font-bold text-foreground mb-4">Chi tiết điểm số</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Thắng khi đạt {MAX_ATTRIBUTE} ở 1 thuộc tính hoặc tổng điểm cao nhất sau 20 round
          </p>
          {[...players]
            .sort((a, b) => calculateScore(b.resources) - calculateScore(a.resources))
            .map((player, index) => (
              <StatCard key={player.id} player={player} delay={1 + index * 0.1} />
            ))}
        </div>

        {/* Play again button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          onClick={resetGame}
          className="mt-8 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors"
        >
          Chơi Lại
        </motion.button>
      </div>
    </motion.div>
  );
};
