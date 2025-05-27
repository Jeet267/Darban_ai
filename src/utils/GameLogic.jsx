// src/utils/gameLogic.js


import { WIN_PATTERNS,EMOJI_CATEGORIES } from './constants.jsx';

export const getRandomEmoji = (categoryName) => {
  const emojis = EMOJI_CATEGORIES[categoryName];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

export const checkWinner = (board) => {
  for (let pattern of WIN_PATTERNS) {
    const [a, b, c] = pattern;
    if (board[a] && board[b] && board[c] && 
        board[a].player === board[b].player && 
        board[b].player === board[c].player) {
      return { winner: board[a].player, combination: pattern };
    }
  }
  return null;
};

export const createEmptyGrid = () => Array(9).fill(null);

export const createInitialHistory = () => ({ player1: [], player2: [] });

export const createInitialScores = () => ({ player1: 0, player2: 0 });

export const playSound = (type) => {
  // In a real implementation, you'd play actual sounds
  console.log(`Playing ${type} sound`);
};

export const canPlaceEmoji = (grid, index, lastRemovedPosition) => {
  return !grid[index] && lastRemovedPosition !== index;
};

export const processEmojiPlacement = (
  grid, 
  index, 
  currentPlayer, 
  selectedCategories, 
  emojiHistory
) => {
  const newGrid = [...grid];
  const newEmoji = getRandomEmoji(selectedCategories[`player${currentPlayer}`]);
  const playerKey = `player${currentPlayer}`;
  const newHistory = [...emojiHistory[playerKey]];
  
  let removedPosition = null;
  
  // Handle vanishing rule
  if (newHistory.length >= 3) {
    removedPosition = newHistory[0].position;
    newGrid[removedPosition] = null;
    newHistory.shift(); // Remove oldest from history
  }
  
  // Place new emoji
  newGrid[index] = {
    emoji: newEmoji,
    player: currentPlayer,
    timestamp: Date.now()
  };
  
  newHistory.push({ 
    position: index, 
    emoji: newEmoji, 
    timestamp: Date.now() 
  });
  
  return {
    newGrid,
    newHistory,
    removedPosition,
    newEmoji
  };
};