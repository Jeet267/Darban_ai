// src/components/RulesModal.js

import React from 'react';

const RulesModal = ({ showRules, onToggleRules, isSetupMode = false }) => {
  if (!showRules) return null;

  const rulesData = [
    {
      emoji: '🎯',
      text: 'Each player gets a random emoji from their chosen category on each turn.'
    },
    {
      emoji: '✨',
      text: 'You can only have 3 emojis on the board at once. When placing your 4th emoji, your oldest one vanishes!'
    },
    {
      emoji: '🚫',
      text: 'You cannot place an emoji where your oldest emoji just vanished.'
    },
    {
      emoji: '🏆',
      text: 'Win by getting 3 of your emojis in a line (horizontal, vertical, or diagonal).'
    },
    {
      emoji: '🔄',
      text: 'No draws possible - the game continues until someone wins!'
    }
  ];

  const containerClass = isSetupMode 
    ? "mt-8 bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-6"
    : "mt-6 bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-4";

  const titleClass = isSetupMode 
    ? "text-2xl font-bold text-yellow-800 mb-4"
    : "text-lg font-bold text-yellow-800 mb-3";

  return (
    <div className={containerClass}>
      <div className="flex justify-between items-center mb-3">
        <h3 className={titleClass}>
          📜 {isSetupMode ? 'Game Rules' : 'Quick Rules'}
        </h3>
        {!isSetupMode && (
          <button
            onClick={onToggleRules}
            className="text-yellow-700 hover:text-yellow-900 text-xl"
            aria-label="Close rules"
          >
            ✕
          </button>
        )}
      </div>
      
      {isSetupMode ? (
        <div className="space-y-3 text-gray-700">
          {rulesData.map((rule, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="text-xl">{rule.emoji}</span>
              <p>{rule.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Random emoji from your category each turn</li>
          <li>• Max 3 emojis on board (oldest vanishes)</li>
          <li>• Can't place where emoji just vanished</li>
          <li>• Get 3 in a line to win!</li>
        </ul>
      )}
      
      {isSetupMode && (
        <button
          onClick={onToggleRules}
          className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Hide Rules
        </button>
      )}
    </div>
  );
};

export default RulesModal;