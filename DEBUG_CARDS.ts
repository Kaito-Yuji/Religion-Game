// DEBUG FILE - CHECK CARD DISTRIBUTION
import { getCardsForEvent, drawInitialHand, drawCard } from '@/lib/game/data';
import { Religion, RELIGION_INFO } from '@/lib/game/types';

const religions: Religion[] = ['thien_chua', 'phat_giao', 'cao_dai', 'hoa_hao'];

console.log('=== DEBUGGING CARD DISTRIBUTION ===\n');

// Check all events 1-20
for (let eventId = 1; eventId <= 20; eventId++) {
  console.log(`\n📌 EVENT ${eventId}:`);
  
  for (const religion of religions) {
    const cards = getCardsForEvent(eventId, religion);
    const positiveCards = cards.filter(c => !c.isNegative);
    const negativeCards = cards.filter(c => c.isNegative);
    
    console.log(
      `  ${religion}: ${cards.length} cards total | ${positiveCards.length} lợi | ${negativeCards.length} hại`,
      cards.length !== 5 ? '❌ ERROR' : positiveCards.length === 3 && negativeCards.length === 2 ? '✅ OK' : '⚠️ WARNING'
    );
    
    if (cards.length !== 5) {
      console.log('    Cards:', cards.map(c => c.name));
    }
  }
}

// Check initial hand distribution (simulate 10 times)
console.log('\n\n=== INITIAL HAND TEST (Human) ===');
const testReligion: Religion = 'thien_chua';
for (let i = 0; i < 3; i++) {
  const hand = drawInitialHand(1, testReligion, false);
  const positive = hand.filter(c => !c.isNegative);
  const negative = hand.filter(c => c.isNegative);
  console.log(
    `Test ${i + 1}: ${hand.length} cards | ${positive.length} lợi | ${negative.length} hại`,
    positive.length === 3 && negative.length === 2 ? '✅' : '❌'
  );
}

// Check drawCard distribution (simulate many times)
console.log('\n\n=== DRAW CARD TEST (100 draws, Event 15, Human) ===');
let positiveCount = 0;
let negativeCount = 0;
for (let i = 0; i < 100; i++) {
  const card = drawCard(15, testReligion, false);
  if (card.isNegative) negativeCount++;
  else positiveCount++;
}
console.log(`Positive: ${positiveCount} | Negative: ${negativeCount}`);
console.log(`Expected: ~60 positive, ~40 negative (40% chance for negative with human)`);
