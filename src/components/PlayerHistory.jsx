// src/components/PlayerHistory.js

import React from 'react';

const PlayerHistory = ({ emojiHistory }) => {
  const renderPlayerHistory = (player, playerNum, bgColor, textColor) => (
    <div className={`${bgColor} p-3 rounded-lg`}>
      <h4 className={`font-bold ${textColor} mb-2`}>
        Player {playerNum} History
      </h4>
      <div className="flex gap-1 flex-wrap">
        {emojiHistory[player].map((item, idx) => (
          <span 
            key={`${item.timestamp}-${idx}`} 
            className="text-lg p-1 bg-white rounded shadow-sm"
            title={`Placed at position ${item.position + 1}`}
          >
            {item.emoji}
          </span>
        ))}
        {emojiHistory[player].length === 0 && (
          <span className="text-gray-500 text-sm italic">No emojis placed yet</span>
        )}
      </div>
      <div className="text-xs text-gray-600 mt-1">
        Active: {emojiHistory[player].length}/3
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
      {renderPlayerHistory('player1', 1, 'bg-blue-50', 'text-blue-800')}
      {renderPlayerHistory('player2', 2, 'bg-red-50', 'text-red-800')}
    </div>
  );
};

export default PlayerHistory;