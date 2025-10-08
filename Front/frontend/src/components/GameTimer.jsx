// components/GameTimer.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Clock, AlertCircle } from 'lucide-react';

const GameTimer = ({ onTimeUp }) => {
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45 minutes in seconds
  
  useEffect(() => {
    const gameStartTime = parseInt(localStorage.getItem('gameStartTime') || '0');
    
    // Si pas de gameStartTime, on initialise maintenant (pour le mode test)
    if (!gameStartTime) {
      console.log("⚠️ Pas de gameStartTime trouvé, initialisation maintenant");
      localStorage.setItem('gameStartTime', Date.now().toString());
    }
    
    const startTime = gameStartTime || Date.now();
    
    // Update immédiatement au montage
    const updateTimer = () => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, (45 * 60) - elapsed);
      
      console.log(`⏱️ Timer: ${Math.floor(remaining / 60)}:${(remaining % 60).toString().padStart(2, '0')}`);
      setTimeRemaining(remaining);
      
      if (remaining === 0 && onTimeUp) {
        console.log("⏰ Temps écoulé!");
        onTimeUp();
      }
    };
    
    updateTimer(); // Appel immédiat
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, [onTimeUp]);
  
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const isWarning = timeRemaining < 300; 
  const isCritical = timeRemaining < 60; 
  
  return (
    <div className={`fixed left-4 z-30 ${
      isCritical ? 'animate-pulse' : ''
    }`} style={{ top: '48px' }}>
      <div className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg ${
        isCritical ? 'bg-red-600 text-white' :
        isWarning ? 'bg-orange-500 text-white' :
        'bg-white/90 text-[#5C4033]'
      }`}>
        {isCritical ? (
          <AlertCircle className="w-5 h-5" />
        ) : (
          <Clock className="w-5 h-5" />
        )}
        <span className="font-bold text-lg">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};

export default GameTimer;