import React from 'react';
import { useGameContext } from '../context/GameContext';

const ScoreBoard: React.FC = () => {
  const { score, timeLeft, highScore, initialTimeLimit } = useGameContext();
  
  const timePercentage = (timeLeft / initialTimeLimit) * 100;
  
  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl relative overflow-hidden border border-white/10">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
      
      <div className="grid grid-cols-2 gap-8 mb-8 relative">
        <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5">
          <p className="text-purple-200/70 text-sm font-medium mb-1">SCORE</p>
          <p className="text-5xl font-black text-white bg-gradient-to-br from-purple-200 to-white bg-clip-text text-transparent">{score}</p>
        </div>
        <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5">
          <p className="text-purple-200/70 text-sm font-medium mb-1">HIGH SCORE</p>
          <p className="text-5xl font-black text-white bg-gradient-to-br from-purple-200 to-white bg-clip-text text-transparent">{highScore}</p>
        </div>
      </div>
      
      <div className="relative">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-purple-200/70">TIME LEFT</span>
          <span className="font-bold text-white">{timeLeft}s</span>
        </div>
        <div className="h-3 bg-black/25 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
          <div 
            className={`h-full transition-all duration-300 ease-out ${
              timePercentage <= 20 
                ? 'bg-gradient-to-r from-red-500 to-pink-500' 
                : 'bg-gradient-to-r from-purple-500 to-violet-500'
            }`}
            style={{ width: `${timePercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard