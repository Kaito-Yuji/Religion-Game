'use client';

import { motion } from 'framer-motion';
import { Religion, RELIGION_INFO } from '@/lib/game/types';
import { useGame } from '@/lib/game/context';
import Image from 'next/image';

export const CharacterSelect = () => {
  const { startGame } = useGame();

  const religions = Object.values(RELIGION_INFO);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
          Con Đường Đức Tin
        </h1>
        <p className="text-muted-foreground text-lg">
          Chọn 1 tôn giáo để bắt đầu hành trình của bạn
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl w-full">
        {religions.map((religion, index) => (
          <motion.button
            key={religion.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => startGame(religion.id)}
            className="group relative bg-card border border-border rounded-xl p-4 md:p-6 hover:border-primary/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
            style={{
              boxShadow: `0 0 0 0 ${religion.glowColor}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 30px 5px ${religion.glowColor}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 0 0 0 ${religion.glowColor}`;
            }}
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 transition-colors duration-300"
              style={{ borderColor: religion.color }}
            >
              <Image
                src={religion.avatar}
                alt={religion.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 96px, 128px"
                loading={index === 0 ? "eager" : "lazy"}
                priority={index === 0}
              />
            </div>
            
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 text-center">
              {religion.name}
            </h3>
            
            <p className="text-xs md:text-sm text-muted-foreground text-center line-clamp-2">
              {religion.description}
            </p>

            <motion.div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                background: `radial-gradient(circle at center, ${religion.glowColor} 0%, transparent 70%)`,
                opacity: 0,
              }}
              whileHover={{ opacity: 0.2 }}
            />
          </motion.button>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-muted-foreground text-sm text-center"
      >
        Sau khi chọn, bạn sẽ không thể thay đổi tôn giáo trong suốt trận đấu
      </motion.p>
    </div>
  );
};
