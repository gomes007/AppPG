import React, { createContext, useState, useContext } from 'react';

//export const AuthContext = createContext();

export const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => {}
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
