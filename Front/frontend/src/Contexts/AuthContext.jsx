import React, { createContext, useState, useContext } from 'react';

const AuthContewt = createContext();

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null); 
    const [sessionId,setSessionId] = useState(null);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user'); 

        if(storedUser){

            const userData = JSON.parse(storedUser);
            setUser(userData.username);
            setSessionId(userData.session_id);
        }
        setLoading(false);
    }, []);


    const login = async (username, password) => {
        setUser(null);
        setSessionId(null);
       localStorage.setItem('user',JSON.stringify({username, session_id}));
    }; 

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        setSessionId(null);
    }; 


return (

    <AuthContext.Provider value={{user, sessionId, loading, login, logout}}>
        {children}
    </AuthContext.Provider>
  );
};