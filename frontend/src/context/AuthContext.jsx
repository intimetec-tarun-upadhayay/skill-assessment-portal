import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/apiClient';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    const decoded = JSON.parse(atob(res.data.token.split('.')[1]));
    setUser(decoded);
    localStorage.setItem('user', JSON.stringify(decoded));
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  const value = { user, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
