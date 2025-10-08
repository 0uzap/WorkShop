// pages/Lobby.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../Background';
import GreekFrise from '../components/GreekFrise';
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

        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl border-2 border-[#8B7355]/20 p-6">
          {/* Session Info */}
          <div className="bg-[#F5E6D3] rounded-lg p-4 mb-6">
            <p className="text-sm text-[#8B7355] mb-2">Code de session</p>
            <div className="flex items-center gap-3">
              <code className="text-2xl font-bold text-[#5C4033]">
                {sessionId ? sessionId.slice(0, 8).toUpperCase() : '...'}
              </code>
              <button
                onClick={invitePlayer}
                className="px-3 py-1 bg-[#8B7355] text-white rounded-lg hover:bg-[#7A6248] transition"
              >
                📋 Copier
              </button>
            </div>
          </div>

          {/* Players Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, index) => {
              const player = players[index];
              return (
                <div
                  key={index}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    player 
                      ? 'bg-white border-[#8B7355]/40' 
                      : 'bg-gray-100 border-gray-300 border-dashed'
                  }`}
                >
                  {player ? (
                    <>
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-[#8B7355] to-[#A0826D] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                          {player.username[0].toUpperCase()}
                        </div>
                        <p className="font-semibold text-[#5C4033]">
                          {player.username}
                        </p>
                        {player.ready && (
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto mt-2" />
                        )}
                      </div>
                      {player.username === currentUser.username && (
                        <div className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-xs px-2 py-1 rounded-full">
                          Vous
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <Users className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">En attente...</p>
                    </div>
                  )}
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
                className="px-8 py-3 bg-gradient-to-r from-[#8B7355] to-[#A0826D] text-white font-bold rounded-xl hover:from-[#7A6248] hover:to-[#8B7355] transition-all disabled:opacity-50"
              >
                {loading ? 'Chargement...' : 'Je suis prêt !'}
              </button>
            </div>
          )}

          {/* Status Messages */}
          <div className="bg-[#FFF8DC] rounded-lg p-4">
            <p className="text-center text-[#8B7355]">
              {players.length < 4 
                ? `En attente de ${4 - players.length} joueur(s)...`
                : players.every(p => p.ready)
                ? '✅ Tous les joueurs sont prêts !'
                : `En attente que tous les joueurs soient prêts (${players.filter(p => p.ready).length}/4)`
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