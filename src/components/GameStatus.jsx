// src/components/GameStatus.js

import React from 'react';
import { EMOJI_CATEGORIES, GAME_STATES } from '../utils/constants.js';

const GameStatus = ({ 
  gameState, 
  currentPlayer, 
  winner, 
  selectedCategories, 
  gameMessage 
}) => {
  const getCurrentPlayerEmoji = () => {
    const categoryName = selectedCategories[`player${currentPlayer}`];
    return EMOJI_CATEGORIES[categoryName][0];
  };

  const renderPlayingStatus = () => (
    <div className="bg-white bg-opacity-90 rounded-lg px-6 py-3 inline-block">
      <h2 className="text-xl font-bold text-gray-800">
        Player {currentPlayer}'s Turn
        <span className="ml-2">{getCurrentPlayerEmoji()}</span>
      </h2>
    </div>
  );

  const renderWinnerStatus = () => (
    <div className="bg-yellow-400 rounded-lg px-6 py-3 inline-block animate-bounce">
      <h2 className="text-2xl font-bold text-gray-800">
        🎉 Player {winner} Wins! 🎉
      </h2>
    </div>
  );

  const renderGameMessage = () => (
    <div className="bg-orange-400 text-white rounded-lg px-4 py-2 mt-2 inline-block animate-pulse">
      {gameMessage}
    </div>
  );

  return (
    <div className="text-center mb-6">
      {gameState === GAME_STATES.PLAYING && !winner && renderPlayingStatus()}
      {winner && renderWinnerStatus()}
      {gameMessage && renderGameMessage()}
    </div>
  );
};

export default GameStatus;