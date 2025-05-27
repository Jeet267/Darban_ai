// src/components/Cell.js

import React from 'react';
import { GAME_STATES } from '../utils/constants.js';

const Cell = ({ 
  cell, 
  index, 
  onClick, 
  isWinning, 
  isLastRemoved, 
  gameState 
}) => {
  const handleClick = () => {
    onClick(index);
  };

  const getCellStyles = () => {
    let baseStyles = `
      w-20 h-20 md:w-24 md:h-24 flex items-center justify-center 
      border-2 border-gray-400 text-2xl md:text-3xl cursor-pointer 
      transition-all duration-300 hover:scale-105
    `;

    if (cell) {
      if (isWinning) {
        baseStyles += ' bg-yellow-200 border-yellow-500 animate-pulse';
      } else {
        baseStyles += ' bg-blue-50';
      }
    } else {
      baseStyles += ' bg-white hover:bg-gray-100';
    }

    if (isLastRemoved) {
      baseStyles += ' bg-red-100 border-red-300';
    }

    if (gameState !== GAME_STATES.PLAYING) {
      baseStyles += ' cursor-not-allowed';
    }

    return baseStyles;
  };

  return (
    <div
      onClick={handleClick}
      className={getCellStyles()}
      role="button"
      tabIndex={0}
      aria-label={`Cell ${index + 1}${cell ? `, contains ${cell.emoji}` : ', empty'}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <span className={`${cell && isWinning ? 'animate-bounce' : ''}`}>
        {cell?.emoji || ''}
      </span>
    </div>
  );
};

export default Cell;