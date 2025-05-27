// src/components/ScoreBoard.js

import React from 'react';

const ScoreBoard = ({ scores }) => {
  return (
    <div className="flex justify-center gap-8 mb-4">
      <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md">
        <span className="font-bold">Player 1: {scores.player1}</span>
      </div>
      <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md">
        <span className="font-bold">Player 2: {scores.player2}</span>
      </div>
    </div>
  );
};

export default ScoreBoard;