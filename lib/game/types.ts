// Game Types - Vietnamese Strategy Board Game

export type Religion = 'thien_chua' | 'phat_giao' | 'cao_dai' | 'hoa_hao';

export interface ReligionInfo {
  id: Religion;
  name: string;
  tagline: string;
  description: string;
  avatar: string;
  color: string;
  glowColor: string;
}

export interface PlayerResources {
  reputation: number;  // Uy tín
  belief: number;      // Niềm tin
  community: number;   // Cộng đồng
}

export interface Player {
  id: string;
  name: string;
  religion: Religion;
  resources: PlayerResources;
  hand: Card[];
  isBot: boolean;
  isActive: boolean;
}

export interface Card {
  id: string;
  name: string;
  description: string;
  isNegative: boolean;
  effects: {
    reputation: number;
    belief: number;
    community: number;
  };
  religion: Religion;
  eventId: number;
}

export interface GameEvent {
  id: number;
  name: string;
  description: string;
}

export interface PlayedCard {
  playerId: string;
  card: Card;
}

export interface TurnResult {
  playerId: string;
  playerName: string;
  religion: Religion;
  cardPlayed: Card;
  resourceChanges: Partial<PlayerResources>;
}

export interface GameState {
  phase: 'character_select' | 'playing' | 'round_result' | 'game_over';
  currentRound: number;
  maxRounds: number;
  currentEvent: GameEvent | null;
  players: Player[];
  currentPlayerIndex: number;
  playedCards: PlayedCard[];
  turnResults: TurnResult[];
  winner: Player | null;
  winReason?: 'max_rounds'; // Game ends only after max rounds
  // New: Track card deck state per event per religion to avoid card repetition
  eventCardDecks?: Record<number, Record<Religion, Card[]>>; // Event -> Religion -> Cards
  cardDrawIndices?: Record<number, Record<Religion, number>>; // Event -> Religion -> NextIndex
}

// Max value for each attribute
export const MAX_ATTRIBUTE = 20;

// Calculate total score (simple sum of all attributes)
export const calculateScore = (resources: PlayerResources): number => {
  return resources.reputation + resources.belief + resources.community;
};

// Check if player has won (any attribute reaches MAX_ATTRIBUTE)
export const checkWinCondition = (resources: PlayerResources): boolean => {
  return (
    resources.reputation >= MAX_ATTRIBUTE ||
    resources.belief >= MAX_ATTRIBUTE ||
    resources.community >= MAX_ATTRIBUTE
  );
};

// Get the highest attribute value
export const getHighestAttribute = (resources: PlayerResources): number => {
  return Math.max(resources.reputation, resources.belief, resources.community);
};

// Avatar URLs for each religion
export const RELIGION_INFO: Record<Religion, ReligionInfo> = {
  thien_chua: {
    id: 'thien_chua',
    name: 'Thiên Chúa giáo',
    tagline: 'Đức tin – Cứu rỗi – Kỷ luật',
    description: 'Tin vào Chúa, sống theo luật đạo, hướng tới sự cứu rỗi.',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20%284%29-kXiOfyuhGDV10CgTFGILJRRkWqy382.jpg',
    color: '#DC2626',
    glowColor: 'rgba(220, 38, 38, 0.5)',
  },
  phat_giao: {
    id: 'phat_giao',
    name: 'Phật giáo',
    tagline: 'Nhân quả – Giác ngộ – Bình an',
    description: 'Tu tâm, hiểu nhân quả, giải thoát khỏi khổ đau.',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20%283%29-kZdgLmmVPkjy5tD19W0fGUbnbdvyK6.jpg',
    color: '#EAB308',
    glowColor: 'rgba(234, 179, 8, 0.5)',
  },
  cao_dai: {
    id: 'cao_dai',
    name: 'Cao Đài',
    tagline: 'Hòa hợp – Đa giáo – Triết lý',
    description: 'Kết hợp nhiều tôn giáo, hướng tới sự cân bằng và hợp nhất.',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20%282%29-x7ZhS66adCKdUAOhRgNagaJOtYSnbg.jpg',
    color: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.5)',
  },
  hoa_hao: {
    id: 'hoa_hao',
    name: 'Phật giáo Hòa Hảo',
    tagline: 'Đơn giản – Thực tế – Tu tại gia',
    description: 'Tập trung sống tốt đời thường, tu không cầu kỳ.',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20%281%29-KyHc8MpXNm13b62BlwXHaZspLwCpDl.png',
    color: '#92400E',
    glowColor: 'rgba(146, 64, 14, 0.5)',
  },
};
