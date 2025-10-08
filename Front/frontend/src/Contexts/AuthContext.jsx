import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer les données stockées au chargement
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData.username);
      setSessionId(userData.session_id);
    }
    setLoading(false);
  }, []);

  const login = (username, session_id) => {
    setUser(username);
    setSessionId(session_id);
    localStorage.setItem('user', JSON.stringify({ username, session_id }));
  };

  const logout = () => {
    setUser(null);
    setSessionId(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, sessionId, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};