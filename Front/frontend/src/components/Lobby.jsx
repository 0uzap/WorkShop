// pages/Lobby.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../Background';
import GreekFrise from '../components/GreekFrise';
import GreekColumn from '../components/GreekColumn';
import Profil from '../components/Profil';
import { Users, Clock, CheckCircle, XCircle } from 'lucide-react';

const Lobby = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(null);

  const API_BASE_URL = 'http://localhost:8000/api';
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    // Get session ID from localStorage (set during login)
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser.session_id) {
      setSessionId(storedUser.session_id);
      fetchSessionStatus(storedUser.session_id);
      
      // Poll for updates every 2 seconds
      const interval = setInterval(() => {
        fetchSessionStatus(storedUser.session_id);
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, []);

  const fetchSessionStatus = async (sid) => {
    try {
      const response = await fetch(`${API_BASE_URL}/session-status/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ session_id: sid })
      });

      const data = await response.json();
      
      if (response.ok) {
        setPlayers(data.players || []);
        
        // Check if all players are ready and we have 4 players
        if (data.players.length === 4 && data.all_ready) {
          startCountdown();
        }
        
        // Check if game has started
        if (data.game_started) {
          navigate('/sante');
        }
      }
    } catch (err) {
      console.error('Error fetching session status:', err);
    }
  };
  const handleReady = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/player-ready/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          session_id: sessionId,
          user_id: currentUser.user_id
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setIsReady(true);
        fetchSessionStatus(sessionId);
      } else {
        setError(data.message || 'Erreur');
      }
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const startCountdown = () => {
    let count = 5;
    setCountdown(count);
    
    const timer = setInterval(() => {
      count--;
      setCountdown(count);
      
      if (count === 0) {
        clearInterval(timer);
        startGame();
      }
    }, 1000);
  };

  const startGame = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/start-game/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ session_id: sessionId })
      });

      if (response.ok) {
        // Store game start time for timer
        localStorage.setItem('gameStartTime', Date.now().toString());
        navigate('/sante');
      }
    } catch (err) {
      console.error('Error starting game:', err);
    }
  };

  const invitePlayer = () => {
    // Copy session ID to clipboard
    navigator.clipboard.writeText(sessionId);
    alert('Code de session copié ! Partagez-le avec vos amis.');
  };

  return (
    <Background>
      <GreekFrise position="top" height={40} opacity={0.8} />
      <GreekFrise position="bottom" height={40} opacity={0.8} />
      
      <div className="relative z-10 w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5C4033] mb-4">
            Salle d'Attente de l'Olympe
          </h1>
          <p className="text-[#8B7355] text-lg">
            Rassemblez votre équipe de 4 héros pour commencer l'aventure
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border-2 border-[#8B7355]/20 p-8">
          {/* Session Info */}
          <div className="flex justify-center mb-8">
            <div className="bg-[#DDD1BC] border-4 border-black px-6 py-2 rounded-md">
              <p className="text-xs text-[#5C4033] font-semibold mb-1">CODE SESSION</p>
              <div className="flex items-center gap-3">
                <code className="text-2xl font-extrabold text-black tracking-wide">
                  {sessionId ? sessionId.slice(0, 8).toUpperCase() : '...'}
                </code>
                <button
                  onClick={invitePlayer}
                  className="px-3 py-1 bg-[#8B7355] text-white rounded-lg hover:bg-[#7A6248] transition text-sm"
                >
                  📋
                </button>
              </div>
            </div>
          </div>

          {/* Players in Row - Using PlayerSlot-like components */}
          <div className="mt-6 flex flex-row justify-center items-start gap-12 px-4 mb-8">
            {[...Array(4)].map((_, index) => {
              const player = players[index];
              return (
                <div
                  key={index}
                  className="relative flex flex-col items-center gap-1"
                >
                 
                  
                  {/* Profil Image */}
                  <div className={`relative ${player ? '' : 'opacity-30'}`}>
                    <Profil size="md" showBorder={true} name={player ? player.username : 'En attente'} />
                    {!player && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Users className="w-8 h-8 text-gray-500" />
                      </div>
                    )}
                  </div>
                  
                  {/* Greek Column */}
                  <GreekColumn size="sm" />
                  
                  {/* Ready Status */}
                  <div className="mt-2">
                    {player && player.ready ? (
                      <div className="flex items-center gap-1 bg-green-500/20 px-3 py-1 rounded-full border-2 border-green-500">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-green-500 font-bold">Prêt</span>
                      </div>
                    ) : player ? (
                      <div className="flex items-center gap-1 bg-orange-500/20 px-3 py-1 rounded-full border-2 border-orange-500">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span className="text-xs text-orange-500 font-bold">En attente</span>
                      </div>
                    ) : (
                      <div className="w-20 h-6"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ready Button */}
          {!isReady && players.some(p => p.username === currentUser.username) && (
            <div className="text-center mb-6">
              <button
                onClick={handleReady}
                disabled={loading}
                className="px-10 py-4 bg-gradient-to-r from-[#8B7355] to-[#A0826D] text-white font-extrabold text-lg rounded-xl hover:from-[#7A6248] hover:to-[#8B7355] transition-all disabled:opacity-50 shadow-xl uppercase tracking-wider"
              >
                {loading ? '⏳ Chargement...' : '⚔️ Je suis prêt !'}
              </button>
            </div>
          )}

          {/* Status Messages */}
          <div className="bg-[#DDD1BC]/20 backdrop-blur border-2 border-[#8B7355]/30 rounded-xl p-4">
            <p className="text-center text-white font-semibold">
              {players.length < 4 
                ? `⏳ En attente de ${4 - players.length} héros...`
                : players.every(p => p.ready)
                ? '✅ Tous les héros sont prêts ! Le voyage commence...'
                : `⏳ Héros prêts: ${players.filter(p => p.ready).length}/4`
              }
            </p>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* Countdown Overlay */}
        {countdown !== null && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 text-center">
              <h2 className="text-3xl font-bold text-[#5C4033] mb-4">
                Le jeu commence dans...
              </h2>
              <div className="text-7xl font-bold text-[#8B7355] animate-pulse">
                {countdown}
              </div>
              <p className="mt-4 text-[#8B7355]">
                Préparez-vous pour l'aventure !
              </p>
            </div>
          </div>
        )}
      </div>
    </Background>
  );
};

export default Lobby;