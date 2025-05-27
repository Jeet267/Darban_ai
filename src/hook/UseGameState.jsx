// src/hooks/useGameState.js

import { useState } from 'react';


import { createEmptyGrid,createInitialHistory,createInitialScores,checkWinner,processEmojiPlacement,canPlaceEmoji,playSound } from '../utils/gameLogic.js';
import { GAME_STATES } from '../utils/constants.js';
export const useGameState = () => {
  const [gameState, setGameState] = useState(GAME_STATES.SETUP);
  const [selectedCategories, setSelectedCategories] = useState({
    player1: 'Animals',
    player2: 'Food'
  });
  const [grid, setGrid] = useState(createEmptyGrid());
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [emojiHistory, setEmojiHistory] = useState(createInitialHistory());
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState(createInitialScores());
  const [winningCombination, setWinningCombination] = useState([]);
  const [lastRemovedPosition, setLastRemovedPosition] = useState(null);
  const [gameMessage, setGameMessage] = useState('');

  const setTemporaryMessage = (message, duration = 2000) => {
    setGameMessage(message);
    setTimeout(() => setGameMessage(''), duration);
  };

  const handleCellClick = (index) => {
    if (grid[index] || winner || gameState !== GAME_STATES.PLAYING) return;

    // Check if trying to place on removed position
    if (!canPlaceEmoji(grid, index, lastRemovedPosition)) {
      setTemporaryMessage(`Cannot place emoji where your oldest emoji was just removed!`);
      return;
    }

    const result = processEmojiPlacement(
      grid, 
      index, 
      currentPlayer, 
      selectedCategories, 
      emojiHistory
    );

    const { newGrid, newHistory, removedPosition, newEmoji } = result;
    const playerKey = `player${currentPlayer}`;

    setGrid(newGrid);
    setEmojiHistory({
      ...emojiHistory,
      [playerKey]: newHistory
    });
    setLastRemovedPosition(removedPosition);

    if (removedPosition !== null) {
      setTemporaryMessage(`Player ${currentPlayer}'s oldest emoji vanished!`, 1500);
    }

    // Check for winner
    const winResult = checkWinner(newGrid);
    if (winResult) {
      setWinner(winResult.winner);
      setWinningCombination(winResult.combination);
      setScores(prev => ({
        ...prev,
        [`player${winResult.winner}`]: prev[`player${winResult.winner}`] + 1
      }));
      setGameState(GAME_STATES.FINISHED);
      playSound('win');
    } else {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      playSound('place');
    }
  };

  const startGame = () => {
    setGameState(GAME_STATES.PLAYING);
    setGrid(createEmptyGrid());
    setCurrentPlayer(1);
    setEmojiHistory(createInitialHistory());
    setWinner(null);
    setWinningCombination([]);
    setLastRemovedPosition(null);
    setGameMessage('');
  };

  const playAgain = () => {
    startGame();
  };

  const resetGame = () => {
    setGameState(GAME_STATES.SETUP);
    setGrid(createEmptyGrid());
    setCurrentPlayer(1);
    setEmojiHistory(createInitialHistory());
    setWinner(null);
    setWinningCombination([]);
    setScores(createInitialScores());
    setLastRemovedPosition(null);
    setGameMessage('');
  };

  const updateCategories = (newCategories) => {
    setSelectedCategories(newCategories);
  };

  return {
    // State
    gameState,
    selectedCategories,
    grid,
    currentPlayer,
    emojiHistory,
    winner,
    scores,
    winningCombination,
    lastRemovedPosition,
    gameMessage,
    
    // Actions
    handleCellClick,
    startGame,
    playAgain,
    resetGame,
    updateCategories,
    setTemporaryMessage
  };
};