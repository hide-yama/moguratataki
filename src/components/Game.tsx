import React from 'react';
import MoleGrid from './MoleGrid';
import ScoreBoard from './ScoreBoard';
import GameControls from './GameControls';
import { useGameContext } from '../context/GameContext';
import { getScoreEvaluation } from '../utils/scoreEvaluation';

const Game: React.FC = () => {
  const { 
    isPlaying,
    gameOver,
    score
  } = useGameContext();

  const { rank, description, color } = getScoreEvaluation(score);

  return (
    <div className="w-full">      
      <div className="relative space-y-6 sm:space-y-8">
        <ScoreBoard />
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-3xl -m-2" />
          <MoleGrid />
        </div>
        
        <GameControls />
        
        {gameOver && !isPlaying && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center rounded-3xl">
            <div className="bg-black/40 backdrop-blur-xl p-5 sm:p-8 md:p-10 rounded-3xl shadow-2xl text-center border border-white/10 w-10/12 sm:w-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 sm:mb-4">Game Over!</h2>
              <div className="space-y-2 sm:space-y-4 mb-4 sm:mb-8">
                <div className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-br from-purple-200 to-white bg-clip-text text-transparent">
                  {score}
                </div>
                <div className={`text-xl sm:text-2xl font-bold ${color}`}>
                  {rank}
                </div>
                <div className="text-sm sm:text-base text-purple-200/70">
                  {description}
                </div>
              </div>
              <GameControls />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;