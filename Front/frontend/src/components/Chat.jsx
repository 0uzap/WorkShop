import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Users } from 'lucide-react';

const Chat = ({sessionId, currentUser}) => {

    const[isOpen,setIsOpen] = useState(false);
    const[messages,setMessages] = useState([]);
    const[newMessage,setNewMessage] = useState('');
    const[isLoading,setIsLoading] = useState(false);
    const[error, setError] = useState(null);
    const messagesEndRef = useRef(null);
    const chatIntervalRef = useRef(null);

    const fetchMessages = async () => {
        // Ne pas faire de requête si pas de vrai sessionId
        if (!sessionId || sessionId === 'debug-session') {
          return;
        }
        
        try {
          const response = await fetch(`http://localhost:8000/api/get-messages/${sessionId}/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
    
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des messages');
          }
    
          const data = await response.json();
          if (data.status === 'success') {
            setMessages(data.messages);
          }
        } catch (err) {
          console.error('Erreur fetch messages:', err);
          setError('Impossible de charger les messages');
        }
      };
    
      // Fonction pour envoyer un message
      const sendMessage = async () => {
        if (!newMessage.trim()) return;
        
        // Ne pas envoyer si pas de vrai sessionId
        if (!sessionId || sessionId === 'debug-session') {
          setError('Session non valide');
          return;
        }
    
        setIsLoading(true);
        setError(null);
    
        try {
          const response = await fetch('http://localhost:8000/api/send-message/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              session_id: sessionId,
              message: newMessage,
            }),
          });
    
          if (!response.ok) {
            throw new Error('Erreur lors de l\'envoi du message');
          }
    
          const data = await response.json();
          if (data.status === 'success') {
            setNewMessage('');
            // Rafraîchir les messages immédiatement
            fetchMessages();
          }
        } catch (err) {
          console.error('Erreur envoi message:', err);
          setError('Impossible d\'envoyer le message');
        } finally {
          setIsLoading(false);
        }
      };
    
      // Auto-scroll vers le bas quand de nouveaux messages arrivent
      const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      };
    
      useEffect(() => {
        scrollToBottom();
      }, [messages]);
    
      // Polling pour récupérer les nouveaux messages
      useEffect(() => {
        if (isOpen && sessionId) {
          fetchMessages(); // Charger les messages initiaux
    
          // Mettre en place le polling
          chatIntervalRef.current = setInterval(() => {
            fetchMessages();
          }, 2000); // Rafraîchir toutes les 2 secondes
    
          return () => {
            if (chatIntervalRef.current) {
              clearInterval(chatIntervalRef.current);
            }
          };
        }
      }, [isOpen, sessionId]);
    
      // Gérer l'envoi avec Enter
      const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      };
    
      return (
        <>
          {/* Bouton flottant pour ouvrir le chat */}
          <button
            onClick={() => setIsOpen(true)}
            className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-[#8B7355] to-[#A0826D] text-white shadow-lg hover:scale-105 transition-all flex items-center justify-center ${
              isOpen ? 'hidden' : 'block'
            }`}
            aria-label="Ouvrir le chat"
          >
            <MessageCircle className="w-6 h-6" />
            {messages.length > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            )}
          </button>
    
          {/* Fenêtre de chat */}
          <div
            className={`fixed bottom-6 right-6 z-40 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border-2 border-[#8B7355]/20 flex flex-col transition-all duration-300 transform ${
              isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
            }`}
          >
            {/* Header du chat */}
            <div className="bg-gradient-to-r from-[#8B7355] to-[#A0826D] p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <Users className="w-5 h-5" />
                <h3 className="font-bold">Chat d'équipe</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Fermer le chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
    
            {/* Zone des messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAFAF8]">
              {error && (
                <div className="text-center text-red-500 text-sm p-2 bg-red-50 rounded-lg">
                  {error}
                </div>
              )}
              
              {messages.length === 0 ? (
                <div className="text-center text-[#8B7355] text-sm py-8">
                  Aucun message pour le moment. Commencez la discussion !
                </div>
              ) : (
                messages.map((msg, index) => {
                  const isOwnMessage = msg.sender === currentUser;
                  return (
                    <div
                      key={index}
                      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-xl px-4 py-2 ${
                          isOwnMessage
                            ? 'bg-gradient-to-r from-[#8B7355] to-[#A0826D] text-white'
                            : 'bg-white border border-[#E8D4B8]'
                        }`}
                      >
                        {!isOwnMessage && (
                          <div className="text-xs font-semibold text-[#5C4033] mb-1">
                            {msg.sender}
                          </div>
                        )}
                        <div className={`text-sm ${isOwnMessage ? 'text-white' : 'text-[#5C4033]'}`}>
                          {msg.content}
                        </div>
                        <div 
                          className={`text-xs mt-1 ${
                            isOwnMessage ? 'text-white/70' : 'text-[#8B7355]/60'
                          }`}
                        >
                          {new Date(msg.timestamp).toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>
    
            {/* Zone d'envoi de message */}
            <div className="p-4 border-t border-[#E8D4B8]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tapez votre message..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 rounded-xl border-2 border-[#C4B5A0] focus:outline-none focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355] bg-white text-[#5C4033] placeholder-[#C4B5A0] disabled:opacity-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !newMessage.trim()}
                  className="px-4 py-2 bg-gradient-to-r from-[#8B7355] to-[#A0826D] text-white rounded-xl hover:from-[#7A6248] hover:to-[#8B7355] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Envoyer"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      );
    };
    
    export default Chat;
