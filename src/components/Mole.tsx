import React, { useState, useEffect, useRef } from 'react';
import { useGameContext } from '../context/GameContext';
import { MoleType } from '../types/mole';

// Import mole images
import normalMole from '../images/normal.png';
import bonusMole from '../images/bonus.png';
import penaltyMole from '../images/penalty.png';
import normalHit from '../images/normal_hit.png';
import bonusHit from '../images/bonus_hit.png';
import penaltyHit from '../images/penalty_hit.png';

interface MoleProps {
  index: number;
}

const getMoleImages = (type: MoleType) => {
  switch (type) {
    case 'golden':
      return {
        normal: bonusMole,
        hit: bonusHit,
        bgColor: 'bg-yellow-500/20',
        ringColor: 'ring-yellow-400',
      };
    case 'bomb':
      return {
        normal: penaltyMole,
        hit: penaltyHit,
        bgColor: 'bg-red-500/20',
        ringColor: 'ring-red-400',
      };
    default:
      return {
        normal: normalMole,
        hit: normalHit,
        bgColor: 'bg-purple-500/20',
        ringColor: 'ring-purple-400',
      };
  }
};

const Mole: React.FC<MoleProps> = ({ index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isWhacked, setIsWhacked] = useState(false);
  const [moleType, setMoleType] = useState<MoleType>('normal');
  const moleRef = useRef<HTMLDivElement>(null);
  
  const { 
    isPlaying, 
    increaseScore, 
    activeMoles,
    setHoleCooldown,
    removeActiveMole
  } = useGameContext();

  useEffect(() => {
    const activeMole = activeMoles.find(mole => mole.index === index);
    if (activeMole && !isVisible && isPlaying) {
      setMoleType(activeMole.type);
      setIsVisible(true);
      setIsWhacked(false);
    } else if (!activeMole && isVisible) {
      setIsVisible(false);
      setIsWhacked(false);
    }
  }, [activeMoles, index, isPlaying, isVisible]);

  const handleWhack = () => {
    if (!isVisible || isWhacked || !isPlaying) return;
    setIsWhacked(true);
    increaseScore(moleType);
    setHoleCooldown(index, Date.now() + 700);
    setTimeout(() => {
      removeActiveMole(index);
      setIsWhacked(false);
    }, 700);
  };

  const { normal, hit, bgColor, ringColor } = getMoleImages(moleType);
  const displayRingColor = isWhacked ? 'ring-yellow-400' : ringColor;

  return (
    <div className="relative group">
      <div className={`absolute inset-0 ${bgColor} rounded-full transform scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300`} />
      
      <div className={`aspect-square bg-gradient-to-b from-purple-950 to-purple-900 rounded-full overflow-hidden flex items-center justify-center shadow-[inset_0_2px_8px_rgba(0,0,0,0.4)] relative border border-purple-800/50
        ${isWhacked && moleType === 'golden' ? 'animate-gold-glow-ring' : ''}
      `}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
        <div 
          className={`
            w-11/12 h-11/12 flex items-center justify-center transition-all duration-300 ease-out transform
            ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
            ${isWhacked ? 'rotate-12 scale-90' : 'hover:scale-105'}
            ${isWhacked ? 'pointer-events-none' : 'cursor-pointer'}
          `}
          onClick={handleWhack}
          ref={moleRef}
        >
          <img 
            src={isWhacked ? hit : normal} 
            alt={`${moleType} mole`}
            className={`
              w-full h-full object-contain rounded-full ring-2 ${displayRingColor}
              transition-all duration-200 transform
              ${isWhacked ? 'rotate-12 scale-90' : 'hover:scale-105'}
              relative
            `}
          />
        </div>
      </div>
    </div>
  );
};
export default Mole;
