import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "../interfaces/user";

interface AuthContextProps {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void; 
  isLoggedIn: boolean; 
  login: (user: User) => void; 
  logout: () => void; 
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const storedUser = sessionStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const storedStatus = sessionStorage.getItem("isLoggedIn");
    return storedStatus === "true";
  });

  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [isLoggedIn, currentUser]);

  const login = (user: User) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
