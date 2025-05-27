// src/components/GameBoard.js

import React from 'react';
import Cell from './Cell.js';

const GameBoard = ({ 
  grid, 
  onCellClick, 
  winningCombination, 
  lastRemovedPosition,
  gameState 
}) => {
  const renderCell = (index) => {
    const cell = grid[index];
    const isWinning = winningCombination.includes(index);
    const isLastRemoved = lastRemovedPosition === index;
    
    return (
      <Cell
        key={index}
        cell={cell}
        index={index}
        onClick={onCellClick}
        isWinning={isWinning}
        isLastRemoved={isLastRemoved}
        gameState={gameState}
      />
    );
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 mx-auto max-w-md">
      <div className="grid grid-cols-3 gap-2 mb-6">
        {Array(9).fill(null).map((_, index) => renderCell(index))}
      </div>
    </div>
  );
};

export default GameBoard;