import React, { useState } from 'react';

const categories = {
  Animals: ['🐶', '🐱', '🐵', '🐰'],
  Food: ['🍕', '🍟', '🍔', '🍩'],
  Sports: ['⚽️', '🏀', '🏈', '🎾'],
};

function EmojiSelection({ onSelect }) {
  const [player1Category, setPlayer1Category] = useState('Animals');
  const [player2Category, setPlayer2Category] = useState('Food');

  const startGame = () => {
    onSelect({
      player1: categories[player1Category],
      player2: categories[player2Category],
    });
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Choose Emoji Categories</h2>
      <div className="flex flex-col gap-4">
        <div>
          <label className="font-bold">Player 1:</label>
          <select value={player1Category} onChange={(e) => setPlayer1Category(e.target.value)} className="ml-2">
            {Object.keys(categories).map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-bold">Player 2:</label>
          <select value={player2Category} onChange={(e) => setPlayer2Category(e.target.value)} className="ml-2">
            {Object.keys(categories).map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <button onClick={startGame} className="bg-blue-500 text-white px-4 py-2 rounded">Start Game</button>
      </div>
    </div>
  );
}

export default EmojiSelection;
