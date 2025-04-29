import React from 'react';
import Mole from './Mole';
import { useGameContext } from '../context/GameContext';

const MoleGrid: React.FC = () => {
  const { isPlaying } = useGameContext();
  
  return (
    <div className={`grid grid-cols-3 gap-4 ${!isPlaying ? 'pointer-events-none opacity-80' : ''}`}>
      {Array.from({ length: 9 }).map((_, index) => (
        <Mole key={index} index={index} />
      ))}
    </div>
  );
};

export default MoleGrid;