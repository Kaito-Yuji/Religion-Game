import {
  GameState,
  Player,
  Religion,
  Card,
  PlayedCard,
  TurnResult,
  PlayerResources,
  RELIGION_INFO,
  calculateScore,
  checkWinCondition,
  getHighestAttribute,
  MAX_ATTRIBUTE,
} from './types';
import { GAME_EVENTS, drawInitialHand, drawCard, createEventCardDeck, drawCardFromDeck } from './data';

// Bot names
const BOT_NAMES = ['Trí Tuệ', 'Từ Bi', 'Hòa Bình'];

// Initialize a new game
export const initializeGame = (playerReligion: Religion): GameState => {
  // Get available religions for bots
  const allReligions: Religion[] = ['thien_chua', 'phat_giao', 'cao_dai', 'hoa_hao'];
  const botReligions = allReligions.filter((r) => r !== playerReligion);
  
  // Shuffle bot religions
  const shuffledBotReligions = [...botReligions].sort(() => Math.random() - 0.5);

  const initialEvent = GAME_EVENTS[0];

  // Create human player
  // Starting resources: 5 each - need to reach 20 in any one attribute to win (or highest total after 20 rounds)
  const humanPlayer: Player = {
    id: 'player_human',
    name: 'Bạn',
    religion: playerReligion,
    resources: { reputation: 5, belief: 5, community: 5 },
    hand: drawInitialHand(initialEvent.id, playerReligion, false), // Human: 3 positive, 2 negative
    isBot: false,
    isActive: true,
  };

  // Create bot players (they get disadvantaged hands: 2 positive, 3 negative)
  const botPlayers: Player[] = BOT_NAMES.map((name, index) => ({
    id: `player_bot_${index}`,
    name,
    religion: shuffledBotReligions[index],
    resources: { reputation: 5, belief: 5, community: 5 },
    hand: drawInitialHand(initialEvent.id, shuffledBotReligions[index], true), // Bot: 2 positive, 3 negative
    isBot: true,
    isActive: true,
  }));

  // Initialize card decks for first event
  const eventCardDecks: Record<number, Record<Religion, Card[]>> = {};
  const cardDrawIndices: Record<number, Record<Religion, number>> = {};
  
  eventCardDecks[initialEvent.id] = {
    thien_chua: createEventCardDeck(initialEvent.id, 'thien_chua'),
    phat_giao: createEventCardDeck(initialEvent.id, 'phat_giao'),
    cao_dai: createEventCardDeck(initialEvent.id, 'cao_dai'),
    hoa_hao: createEventCardDeck(initialEvent.id, 'hoa_hao'),
  };
  
  cardDrawIndices[initialEvent.id] = {
    thien_chua: 0,
    phat_giao: 0,
    cao_dai: 0,
    hoa_hao: 0,
  };

  return {
    phase: 'playing',
    currentRound: 1,
    maxRounds: 20,
    currentEvent: initialEvent,
    players: [humanPlayer, ...botPlayers],
    currentPlayerIndex: 0,
    playedCards: [],
    turnResults: [],
    winner: null,
    eventCardDecks,
    cardDrawIndices,
  };
};

// Bot AI - select a card to play
export const botSelectCard = (player: Player): Card => {
  const hand = player.hand;
  
  // Strategy: Focus on getting one attribute to 30, prefer positive cards
  let bestCard = hand[0];
  let bestScore = -Infinity;

  // Find which attribute is closest to winning
  const { reputation, belief, community } = player.resources;
  const highestAttr = Math.max(reputation, belief, community);
  const focusAttr = reputation === highestAttr ? 'reputation' : belief === highestAttr ? 'belief' : 'community';

  for (const card of hand) {
    let score = 0;

    // Strongly prefer positive cards
    if (!card.isNegative) {
      score += 10;
    } else {
      score -= 5;
    }

    // Focus on the attribute closest to winning
    const effects = card.effects;
    
    if (focusAttr === 'reputation') {
      score += effects.reputation * 3;
      score += effects.belief * 1;
      score += effects.community * 1;
    } else if (focusAttr === 'belief') {
      score += effects.reputation * 1;
      score += effects.belief * 3;
      score += effects.community * 1;
    } else {
      score += effects.reputation * 1;
      score += effects.belief * 1;
      score += effects.community * 3;
    }

    // Add slight randomness
    score += Math.random() * 2;

    if (score > bestScore) {
      bestScore = score;
      bestCard = card;
    }
  }

  return bestCard;
};

// Apply card effects to a player
export const applyCardEffects = (
  player: Player,
  card: Card
): Partial<PlayerResources> => {
  return {
    reputation: card.effects.reputation,
    belief: card.effects.belief,
    community: card.effects.community,
  };
};

// Process a complete round
export const processRound = (state: GameState, humanCardIndex: number): GameState => {
  const newPlayers = state.players.map((p) => ({ 
    ...p, 
    hand: [...p.hand],
    resources: { ...p.resources }
  }));
  const playedCards: PlayedCard[] = [];
  const turnResults: TurnResult[] = [];

  // Human plays card
  const humanPlayer = newPlayers[0];
  const humanCard = humanPlayer.hand[humanCardIndex];
  playedCards.push({ playerId: humanPlayer.id, card: humanCard });
  
  // Apply effects to human (capped at 0 and MAX_ATTRIBUTE)
  const humanChanges = applyCardEffects(humanPlayer, humanCard);
  humanPlayer.resources.reputation = Math.min(MAX_ATTRIBUTE, Math.max(0, humanPlayer.resources.reputation + (humanChanges.reputation || 0)));
  humanPlayer.resources.belief = Math.min(MAX_ATTRIBUTE, Math.max(0, humanPlayer.resources.belief + (humanChanges.belief || 0)));
  humanPlayer.resources.community = Math.min(MAX_ATTRIBUTE, Math.max(0, humanPlayer.resources.community + (humanChanges.community || 0)));
  
  // Remove played card from hand
  humanPlayer.hand.splice(humanCardIndex, 1);
  
  turnResults.push({
    playerId: humanPlayer.id,
    playerName: humanPlayer.name,
    religion: humanPlayer.religion,
    cardPlayed: humanCard,
    resourceChanges: humanChanges,
  });

  // Bots play cards
  for (let i = 1; i < newPlayers.length; i++) {
    const botPlayer = newPlayers[i];
    const botCard = botSelectCard(botPlayer);
    playedCards.push({ playerId: botPlayer.id, card: botCard });
    
    // Apply effects to bot (capped at 0 and MAX_ATTRIBUTE)
    const botChanges = applyCardEffects(botPlayer, botCard);
    botPlayer.resources.reputation = Math.min(MAX_ATTRIBUTE, Math.max(0, botPlayer.resources.reputation + (botChanges.reputation || 0)));
    botPlayer.resources.belief = Math.min(MAX_ATTRIBUTE, Math.max(0, botPlayer.resources.belief + (botChanges.belief || 0)));
    botPlayer.resources.community = Math.min(MAX_ATTRIBUTE, Math.max(0, botPlayer.resources.community + (botChanges.community || 0)));
    
    // Remove played card from hand
    botPlayer.hand = botPlayer.hand.filter((c) => c.id !== botCard.id);
    
    turnResults.push({
      playerId: botPlayer.id,
      playerName: botPlayer.name,
      religion: botPlayer.religion,
      cardPlayed: botCard,
      resourceChanges: botChanges,
    });
  }

  // Game ends only after 20 rounds (no early win condition)
  let winner: Player | null = null;
  let winReason: 'max_rounds' | undefined;

  const nextRound = state.currentRound + 1;
  const isLastRound = nextRound > state.maxRounds;
  const isGameOver = isLastRound;

  // Determine winner: game ends after 20 rounds, winner is determined by total score
  if (isGameOver) {
    const sortedPlayers = [...newPlayers].sort((a, b) => {
      // Primary: total score (sum of reputation + belief + community)
      const aTotalScore = calculateScore(a.resources);
      const bTotalScore = calculateScore(b.resources);
      if (bTotalScore !== aTotalScore) return bTotalScore - aTotalScore;
      // Tiebreaker: highest single attribute
      return getHighestAttribute(b.resources) - getHighestAttribute(a.resources);
    });
    winner = sortedPlayers[0];
    winReason = 'max_rounds';
  }

  // Draw new cards for next round (if not game over)
  let newEventCardDecks = state.eventCardDecks ? { ...state.eventCardDecks } : {};
  let newCardDrawIndices = state.cardDrawIndices ? { ...state.cardDrawIndices } : {};
  
  if (!isGameOver) {
    const nextEvent = GAME_EVENTS[nextRound - 1];
    
    // Initialize card deck for next event if not exists
    if (!newEventCardDecks[nextEvent.id]) {
      newEventCardDecks[nextEvent.id] = {} as Record<Religion, Card[]>;
      newCardDrawIndices[nextEvent.id] = {} as Record<Religion, number>;
      
      for (const religion of ['thien_chua', 'phat_giao', 'cao_dai', 'hoa_hao'] as Religion[]) {
        newEventCardDecks[nextEvent.id][religion] = createEventCardDeck(nextEvent.id, religion);
        newCardDrawIndices[nextEvent.id][religion] = 0;
      }
    }
    
    for (const player of newPlayers) {
      if (player.hand.length < 5) {
        // Draw card from pre-shuffled deck sequentially (no repeats, ensures variety)
        const deck = newEventCardDecks[nextEvent.id][player.religion];
        const currentIndex = newCardDrawIndices[nextEvent.id][player.religion];
        
        const { card, nextIndex } = drawCardFromDeck(deck, currentIndex);
        newCardDrawIndices[nextEvent.id][player.religion] = nextIndex;
        
        player.hand.push(card);
      }
    }
  }

  return {
    ...state,
    phase: isGameOver ? 'game_over' : 'round_result',
    currentRound: isGameOver ? state.currentRound : nextRound,
    currentEvent: isGameOver ? state.currentEvent : GAME_EVENTS[nextRound - 1] || null,
    players: newPlayers,
    playedCards,
    turnResults,
    winner,
    winReason,
    eventCardDecks: newEventCardDecks,
    cardDrawIndices: newCardDrawIndices,
  };
};

// Get religion display info
export const getReligionInfo = (religion: Religion) => RELIGION_INFO[religion];

// Get player score
export const getPlayerScore = (player: Player): number => {
  return calculateScore(player.resources);
};

// Get sorted players by total score (sum of all attributes)
export const getSortedPlayers = (players: Player[]): Player[] => {
  return [...players].sort((a, b) => {
    const aTotalScore = calculateScore(a.resources);
    const bTotalScore = calculateScore(b.resources);
    if (bTotalScore !== aTotalScore) return bTotalScore - aTotalScore;
    return getHighestAttribute(b.resources) - getHighestAttribute(a.resources);
  });
};
