// src/utils/constants.js

export const EMOJI_CATEGORIES = {
    Animals: ['🐶', '🐱', '🐵', '🐰', '🦊', '🐻', '🐼', '🐨'],
    Food: ['🍕', '🍟', '🍔', '🍩', '🌮', '🍱', '🍜', '🥗'],
    Sports: ['⚽️', '🏀', '🏈', '🎾', '🏐', '🏓', '⚾️', '🏒'],
    Nature: ['🌸', '🌺', '🌻', '🌷', '🌹', '🌵', '🍄', '🌿'],
    Objects: ['⭐️', '💎', '🎈', '🎁', '🎨', '🎭', '🎪', '🎯'],
    Faces: ['😀', '😎', '🤔', '😍', '🥳', '😜', '🤗', '😇']
  };
  
  export const GAME_STATES = {
    SETUP: 'setup',
    PLAYING: 'playing',
    FINISHED: 'finished'
  };
  
  export const WIN_PATTERNS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];
  
  export const SOUND_TYPES = {
    PLACE: 'place',
    WIN: 'win',
    VANISH: 'vanish'
  };
  
  export const PLAYER_COLORS = {
    1: {
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      text: 'text-blue-800',
      button: 'bg-blue-500 hover:bg-blue-600'
    },
    2: {
      bg: 'bg-red-50',
      border: 'border-red-300',
      text: 'text-red-800',
      button: 'bg-red-500 hover:bg-red-600'
    }
  };