// src/components/GameControls.js

import React from 'react';

const GameControls = ({ 
  winner, 
  onPlayAgain, 
  onResetGame, 
  onToggleRules,
  showRules 
}) => {
  const buttonBaseClass = "px-6 py-3 rounded-lg font-bold transform hover:scale-105 transition-all duration-200";

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {winner && (
        <button
          onClick={onPlayAgain}
          className={`${buttonBaseClass} bg-green-500 text-white hover:bg-green-600`}
          aria-label="Play another round"
        >
          🔄 Play Again
        </button>
      )}
      <button
        onClick={onResetGame}
        className={`${buttonBaseClass} bg-gray-500 text-white hover:bg-gray-600`}
        aria-label="Start a completely new game"
      >
        🏠 New Game
      </button>
      <button
        onClick={onToggleRules}
        className={`${buttonBaseClass} bg-yellow-500 text-white hover:bg-yellow-600`}
        aria-label={showRules ? "Hide game rules" : "Show game rules"}
      >
        📖 Rules
      </button>
    </div>
  );
};

export default GameControls;