import React from 'react';
import { useGameContext } from '../context/GameContext';

const GameControls: React.FC = () => {
  const { isPlaying, startGame, resetGame, gameOver } = useGameContext();
  
  return (
    <div className="flex justify-center">
      <button
        onClick={isPlaying ? resetGame : startGame}
        className="
          px-10 py-4 rounded-full
          bg-gradient-to-br from-purple-500 to-violet-600
          hover:from-purple-400 hover:to-violet-500
          active:from-purple-600 active:to-violet-700
          text-white font-bold text-xl
          shadow-lg shadow-purple-500/30
          transform active:scale-95
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50
          relative overflow-hidden border border-white/10
        "
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        <span className="relative">
          {gameOver ? "Play Again" : isPlaying ? "Reset Game" : "Start Game"}
        </span>
      </button>
    </div>
  );
};

export default GameControls