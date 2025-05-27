// src/components/PlayerSetup.js

import React from 'react';
import { EMOJI_CATEGORIES } from '../utils/constants.js';

const PlayerSetup = ({ 
  selectedCategories, 
  onCategoriesChange, 
  onStartGame 
}) => {
  const handleCategoryChange = (player, category) => {
    onCategoriesChange({
      ...selectedCategories,
      [player]: category
    });
  };

  const renderCategorySelect = (player, playerNum, bgColor, textColor, borderColor) => (
    <div className={`${bgColor} p-6 rounded-2xl`}>
      <h3 className={`text-xl font-bold ${textColor} mb-4`}>
        🎯 Player {playerNum}
      </h3>
      <select
        value={selectedCategories[player]}
        onChange={(e) => handleCategoryChange(player, e.target.value)}
        className={`w-full p-3 border-2 ${borderColor} rounded-lg text-lg`}
        aria-label={`Player ${playerNum} emoji category selection`}
      >
        {Object.keys(EMOJI_CATEGORIES).map(category => (
          <option key={category} value={category}>
            {category} {EMOJI_CATEGORIES[category].slice(0, 4).join(' ')}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            🎮 Blink Tac Toe
          </h1>
          <p className="text-lg text-gray-600">
            The emoji twist on classic Tic Tac Toe!
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {renderCategorySelect(
              'player1', 
              1, 
              'bg-blue-50', 
              'text-blue-800', 
              'border-blue-300'
            )}
            {renderCategorySelect(
              'player2', 
              2, 
              'bg-red-50', 
              'text-red-800', 
              'border-red-300'
            )}
          </div>

          <div className="text-center">
            <button
              onClick={onStartGame}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
              aria-label="Start the game"
            >
              🚀 Start Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerSetup;