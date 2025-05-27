// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
// import PlayerSetup from './components/PlayerSetup.js';
import PlayerSetup from './components/PlayerSetup'
import GameBoard from './components/GameBoard.js';
import ScoreBoard from './components/ScoreBoard.js';
import GameStatus from './components/GameStatus.js';
import PlayerHistory from './components/PlayerHistory.js';
import GameControls from './components/GameControls.js';
import RulesModal from './components/RulesModal.js';
import { 
  GAME_STATES, 
  EMOJI_CATEGORIES,
  SOUND_TYPES 
} from './utils/constants.js';
import { 
  createEmptyGrid, 
  createInitialHistory, 
  createInitialScores,
  checkWinner,
  canPlaceEmoji,
  processEmojiPlacement,
  playSound
} from './utils/gameLogic.js';

const App = () => {
  // Game state management
  const [gameState, setGameState] = useState(GAME_STATES.SETUP);
  const [grid, setGrid] = useState(createEmptyGrid());
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState({
    player1: 'Animals',
    player2: 'Food'
  });
  const [emojiHistory, setEmojiHistory] = useState(createInitialHistory());
  const [scores, setScores] = useState(createInitialScores());
  const [winner, setWinner] = useState(null);
  const [winningCombination, setWinningCombination] = useState([]);
  const [lastRemovedPosition, setLastRemovedPosition] = useState(null);
  const [gameMessage, setGameMessage] = useState('');
  const [showRules, setShowRules] = useState(false);

  // Clear game message after delay
  useEffect(() => {
    if (gameMessage) {
      const timer = setTimeout(() => {
        setGameMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [gameMessage]);

  // Check for winner after each move
  useEffect(() => {
    const result = checkWinner(grid);
    if (result && !winner) {
      setWinner(result.winner);
      setWinningCombination(result.combination);
      setGameState(GAME_STATES.FINISHED);
      
      // Update scores
      setScores(prev => ({
        ...prev,
        [`player${result.winner}`]: prev[`player${result.winner}`] + 1
      }));
      
      playSound(SOUND_TYPES.WIN);
    }
  }, [grid, winner]);

  // Handle starting the game
  const handleStartGame = useCallback(() => {
    setGameState(GAME_STATES.PLAYING);
    resetRound();
  }, []);

  // Handle category selection changes
  const handleCategoriesChange = useCallback((newCategories) => {
    setSelectedCategories(newCategories);
  }, []);

  // Reset game round (keep scores)
  const resetRound = useCallback(() => {
    setGrid(createEmptyGrid());
    setCurrentPlayer(1);
    setEmojiHistory(createInitialHistory());
    setWinner(null);
    setWinningCombination([]);
    setLastRemovedPosition(null);
    setGameMessage('');
    setGameState(GAME_STATES.PLAYING);
  }, []);

  // Reset entire game (including scores)
  const resetGame = useCallback(() => {
    setGrid(createEmptyGrid());
    setCurrentPlayer(1);
    setEmojiHistory(createInitialHistory());
    setScores(createInitialScores());
    setWinner(null);
    setWinningCombination([]);
    setLastRemovedPosition(null);
    setGameMessage('');
    setGameState(GAME_STATES.SETUP);
    setSelectedCategories({
      player1: 'Animals',
      player2: 'Food'
    });
  }, []);

  // Handle cell clicks
  const handleCellClick = useCallback((index) => {
    // Only allow moves during active play
    if (gameState !== GAME_STATES.PLAYING || winner) {
      return;
    }

    // Check if move is valid
    if (!canPlaceEmoji(grid, index, lastRemovedPosition)) {
      if (lastRemovedPosition === index) {
        setGameMessage(`🚫 Can't place where emoji just vanished!`);
      } else if (grid[index]) {
        setGameMessage(`🚫 Cell already occupied!`);
      }
      return;
    }

    // Process the emoji placement
    const result = processEmojiPlacement(
      grid,
      index,
      currentPlayer,
      selectedCategories,
      emojiHistory
    );

    // Update game state
    setGrid(result.newGrid);
    setEmojiHistory(prev => ({
      ...prev,
      [`player${currentPlayer}`]: result.newHistory
    }));
    setLastRemovedPosition(result.removedPosition);

    // Play appropriate sounds
    playSound(SOUND_TYPES.PLACE);
    if (result.removedPosition !== null) {
      playSound(SOUND_TYPES.VANISH);
      setGameMessage(`✨ Player ${currentPlayer}'s oldest emoji vanished!`);
    }

    // Switch to next player
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  }, [
    gameState, 
    winner, 
    grid, 
    lastRemovedPosition, 
    currentPlayer, 
    selectedCategories, 
    emojiHistory
  ]);

  // Handle play again (new round)
  const handlePlayAgain = useCallback(() => {
    resetRound();
  }, [resetRound]);

  // Handle new game (complete reset)
  const handleNewGame = useCallback(() => {
    resetGame();
  }, [resetGame]);

  // Toggle rules display
  const handleToggleRules = useCallback(() => {
    setShowRules(!showRules);
  }, [showRules]);

  // Render setup screen
  if (gameState === GAME_STATES.SETUP) {
    return (
      <div className="min-h-screen">
        <PlayerSetup
          selectedCategories={selectedCategories}
          onCategoriesChange={handleCategoriesChange}
          onStartGame={handleStartGame}
        />
        <RulesModal 
          showRules={showRules} 
          onToggleRules={handleToggleRules}
          isSetupMode={true}
        />
      </div>
    );
  }

  // Render main game screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            🎮 Blink Tac Toe
          </h1>
          <p className="text-white text-opacity-90">
            The emoji twist on classic Tic Tac Toe!
          </p>
        </div>

        {/* Score Board */}
        <ScoreBoard scores={scores} />

        {/* Game Status */}
        <GameStatus
          gameState={gameState}
          currentPlayer={currentPlayer}
          winner={winner}
          selectedCategories={selectedCategories}
          gameMessage={gameMessage}
        />

        {/* Player History */}
        <PlayerHistory emojiHistory={emojiHistory} />

        {/* Game Board */}
        <div className="flex justify-center mb-6">
          <GameBoard
            grid={grid}
            onCellClick={handleCellClick}
            winningCombination={winningCombination}
            lastRemovedPosition={lastRemovedPosition}
            gameState={gameState}
          />
        </div>

        {/* Game Controls */}
        <div className="text-center mb-6">
          <GameControls
            winner={winner}
            onPlayAgain={handlePlayAgain}
            onResetGame={handleNewGame}
            onToggleRules={handleToggleRules}
            showRules={showRules}
          />
        </div>

        {/* Rules Modal */}
        <div className="max-w-2xl mx-auto">
          <RulesModal 
            showRules={showRules} 
            onToggleRules={handleToggleRules}
            isSetupMode={false}
          />
        </div>
      </div>
    </div>
  );
};

export default App;