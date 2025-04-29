import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import { MoleState, MoleType } from '../types/mole';

interface GameContextType {
  score: number;
  highScore: number;
  timeLeft: number;
  isPlaying: boolean;
  gameOver: boolean;
  activeMoles: MoleState[];
  increaseScore: (type: MoleType) => void;
  startGame: () => void;
  resetGame: () => void;
  setHoleCooldown: (index: number, cooldown: number) => void;
  removeActiveMole: (index: number) => void;
  initialTimeLimit: number;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

const INITIAL_TIME_LIMIT = 15;

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME_LIMIT);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [activeMoles, setActiveMoles] = useState<MoleState[]>([]);
  const [holeCooldowns, setHoleCooldowns] = useState<{ [index: number]: number }>({});
  
  useEffect(() => {
    const savedHighScore = localStorage.getItem('whackAMoleHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);
  
  const increaseScore = useCallback((type: MoleType) => {
    setScore(prevScore => {
      let points = 0;
      switch (type) {
        case 'golden':
          points = 30;
          break;
        case 'bomb':
          points = -20;
          break;
        default:
          points = 10;
      }
      return prevScore + points;
    });
  }, []);

  useEffect(() => {
    let timer: number | undefined;
    
    if (isPlaying && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      setGameOver(true);
      
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('whackAMoleHighScore', score.toString());
      }
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, timeLeft, score, highScore]);
  
  const setHoleCooldown = useCallback((index: number, cooldown: number) => {
    setHoleCooldowns(prev => ({ ...prev, [index]: cooldown }));
  }, []);
  
  useEffect(() => {
    let moleTimer: number | undefined;
    
    if (isPlaying) {
      moleTimer = window.setInterval(() => {
        const moleCount = Math.floor(Math.random() * 2) + 1;
        const newActiveMoles: MoleState[] = [];
        const now = Date.now();
        while (newActiveMoles.length < moleCount) {
          const randomHole = Math.floor(Math.random() * 9);
          if (holeCooldowns[randomHole] && holeCooldowns[randomHole] > now) continue;
          if (!newActiveMoles.some(mole => mole.index === randomHole)) {
            const random = Math.random();
            let type: MoleType = 'normal';
            
            if (random < 0.1) {
              type = 'golden';
            } else if (random < 0.25) {
              type = 'bomb';
            }
            
            newActiveMoles.push({ type, index: randomHole });
          }
        }
        
        setActiveMoles(newActiveMoles);
      }, 1000);
    } else {
      setActiveMoles([]);
    }
    
    return () => {
      if (moleTimer) clearInterval(moleTimer);
    };
  }, [isPlaying, holeCooldowns]);
  
  const startGame = useCallback(() => {
    setScore(0);
    setTimeLeft(INITIAL_TIME_LIMIT);
    setIsPlaying(true);
    setGameOver(false);
  }, []);
  
  const resetGame = useCallback(() => {
    setIsPlaying(false);
    setScore(0);
    setTimeLeft(INITIAL_TIME_LIMIT);
    setGameOver(false);
    setActiveMoles([]);
  }, []);
  
  const removeActiveMole = useCallback((index: number) => {
    setActiveMoles(prev => prev.filter(mole => mole.index !== index));
  }, []);
  
  const contextValue = useMemo(() => ({
    score,
    highScore,
    timeLeft,
    isPlaying,
    gameOver,
    activeMoles,
    increaseScore,
    startGame,
    resetGame,
    setHoleCooldown,
    removeActiveMole,
    initialTimeLimit: INITIAL_TIME_LIMIT,
  }), [
    score,
    highScore,
    timeLeft,
    isPlaying,
    gameOver,
    activeMoles,
    increaseScore,
    startGame,
    resetGame,
    setHoleCooldown,
    removeActiveMole
  ]);
  
  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};