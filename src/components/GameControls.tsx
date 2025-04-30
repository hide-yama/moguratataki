import React from 'react';
import { useGameContext } from '../context/GameContext';

const GameControls: React.FC = () => {
  const { isPlaying, startGame, resetGame, gameOver } = useGameContext();
  
  const handleGameOver = () => {
    // Play Againを押した時はリセットのみを行い、自動的に開始しない
    resetGame();
  };
  
  // ボタンの色を用途によって少し変える
  let buttonGradient = "";
  let hoverGradient = "";
  let activeGradient = "";
  
  if (isPlaying) {
    // Reset Game - 青みがかった紫
    buttonGradient = "from-indigo-500 to-violet-600";
    hoverGradient = "hover:from-indigo-400 hover:to-violet-500";
    activeGradient = "active:from-indigo-600 active:to-violet-700";
  } else if (gameOver) {
    // Play Again - デフォルトの紫
    buttonGradient = "from-purple-500 to-violet-600";
    hoverGradient = "hover:from-purple-400 hover:to-violet-500";
    activeGradient = "active:from-purple-600 active:to-violet-700";
  } else {
    // Start Game - 赤みがかった紫
    buttonGradient = "from-fuchsia-500 to-purple-600";
    hoverGradient = "hover:from-fuchsia-400 hover:to-purple-500";
    activeGradient = "active:from-fuchsia-600 active:to-purple-700";
  }
  
  return (
    <div className="flex justify-center">
      <button
        onClick={isPlaying ? resetGame : gameOver ? handleGameOver : startGame}
        className={`
          px-10 py-4 rounded-full
          bg-gradient-to-br ${buttonGradient}
          ${hoverGradient}
          ${activeGradient}
          text-white font-bold text-xl
          shadow-lg shadow-purple-500/30
          transform active:scale-95
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50
          relative overflow-hidden border border-white/10
        `}
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