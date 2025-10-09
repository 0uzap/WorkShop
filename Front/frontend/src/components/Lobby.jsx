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
  const [sessionId, setSessionId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [pollPaused, setPollPaused] = useState(false);
  
  const API_BASE_URL = 'http://localhost:8000/api';
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  console.log('🔍 USER DATA:', {
    currentUser_userId: currentUser.user_id,
    currentUser_userId_type: typeof currentUser.user_id,
  });
  const me = players.find(p => String(p?.user_id) === String(currentUser?.user_id));
  const iAmReady = !!me?.ready;
  
  console.log('🔍 Current state:', { 
    currentUser: currentUser.username, 
    userId: currentUser.user_id,
    players: players.map(p => ({ username: p?.username, user_id: p?.user_id, ready: p?.ready })),
    me,
    iAmReady 
  });


  useEffect(() => {
    // Get session ID from localStorage (set during login)
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser.session_id) {
      setSessionId(storedUser.session_id);
      fetchSessionStatus(storedUser.session_id);
      
      // Poll for updates every 2 seconds
      const interval = setInterval(() => {
        if (!pollPaused) {
          fetchSessionStatus(storedUser.session_id);
        }
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [pollPaused]);

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
  const handleToggleReady = async (userId) => {
    console.log('🎯 handleToggleReady called', { userId, currentUser: currentUser.user_id });
    
    if (!sessionId || userId !== currentUser.user_id) {
      console.log('❌ Check failed', { sessionId, matches: userId === currentUser.user_id });
      return;
    }
  
    const nextReady = !iAmReady;
    console.log('🔄 Toggling ready state:', { from: iAmReady, to: nextReady });
    
    setLoading(true);
    setError(null);
    setPollPaused(true);                // ⬅️ pause polling
  
    // optimistic flip
    setPlayers(prev =>
      prev.map(p => p?.user_id === currentUser.user_id ? { ...p, ready: nextReady } : p)
    );
  
    try {
      const res = await fetch(`${API_BASE_URL}/player-ready/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          session_id: sessionId,
          user_id: currentUser.user_id,
          ready: nextReady,             // send explicit desired state
        }),
      });
  
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Erreur serveur');
      }
  
      console.log('✅ Toggle successful');
      // one fresh fetch after server confirms
      await fetchSessionStatus(sessionId);
    } catch (e) {
      console.error('❌ Toggle failed:', e);
      // rollback on error
      setPlayers(prev =>
        prev.map(p => p?.user_id === currentUser.user_id ? { ...p, ready: iAmReady } : p)
      );
      setError(e.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
      // small grace period so late responses don't overwrite
      setTimeout(() => setPollPaused(false), 1200);
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
              const isCurrentUser = player && player.user_id === currentUser.user_id;
              console.log(`🎮 Player ${index}:`, {
                player_user_id: player?.user_id,
                player_user_id_type: typeof player?.user_id,
                current_user_id: currentUser.user_id,
                current_user_id_type: typeof currentUser.user_id,
                isCurrentUser: isCurrentUser
              });
              
              if (player) {
                console.log('👤 Player check:', { 
                  index,
                  playerUserId: player.user_id, 
                  currentUserId: currentUser.user_id,
                  isCurrentUser,
                  playerUsername: player.username
                });
              }
              
              return (
                <div
                  key={index}
                  className="relative flex flex-col items-center gap-1"
                >
                  {/* "Vous" Badge */}
                  {isCurrentUser && (
                    <div className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg z-10">
                      Vous
                    </div>
                  )}
                  
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
                  
                  {/* Ready Status Button - Clickable for current user */}
                  <div className="mt-2">
                    {player ? (
                      <button
                        onClick={() => handleToggleReady(player.user_id)}
                        disabled={loading || !isCurrentUser}
                        className={`flex items-center gap-1 px-3 py-1 rounded-full border-2 transition-all ${
                          player.ready
                            ? 'bg-green-500/20 border-green-500'
                            : 'bg-orange-500/20 border-orange-500'
                        } ${
                          isCurrentUser
                            ? 'cursor-pointer hover:scale-105 hover:shadow-lg'
                            : 'cursor-default'
                        } disabled:opacity-50`}
                      >
                        {player.ready ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-green-500 font-bold">Prêt</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-4 h-4 text-orange-500" />
                            <span className="text-xs text-orange-500 font-bold">En attente</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="w-20 h-6"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

            {/* Status Messages */}
                <div className="bg-[#DDD1BC]/20 backdrop-blur border-2 border-[#8B7355]/30 rounded-xl p-4">
                <p className="text-center text-white font-semibold">
                    {(() => {
                    const readyCount = players.filter(p => p.ready).length;
                    const totalPlayers = players.length;
                    const missingPlayers = 4 - totalPlayers;
                    
                    // If less than 4 players
                    if (totalPlayers < 4) {
                        if (readyCount === 0) {
                        return `⏳ En attente de ${missingPlayers} héros...`;
                        } else {
                        return `⏳ Héros prêts: ${readyCount}/${totalPlayers} (En attente de ${missingPlayers} héros)`;
                        }
                    }
                    
                    // If exactly 4 players
                    if (readyCount === 4) {
                        return '✅ Tous les héros sont prêts ! Le voyage commence...';
                    } else {
                        return `⏳ Héros prêts: ${readyCount}/4`;
                    }
                    })()}
                </p>
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
      </div>
    </Background>
  );
};

export default Lobby;