import React from 'react';
import Game from './components/Game';
import { GameProvider } from './context/GameContext';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/10">
        <GameProvider>
          <Game />
        </GameProvider>
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> dae98ae323912bed01819f41597f537a09f8845c
