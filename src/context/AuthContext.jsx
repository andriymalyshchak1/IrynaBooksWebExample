import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getBannedIds } from '../data/mockUsers';

const ADMIN_USER_ID = 'u1';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = useCallback((userData) => {
    if (getBannedIds().includes(userData?.id)) {
      return false;
    }
    setUser(userData);
    try {
      localStorage.setItem('dfw_book_rental_user', JSON.stringify(userData));
    } catch (_) {}
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem('dfw_book_rental_user');
    } catch (_) {}
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('dfw_book_rental_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.id && !getBannedIds().includes(parsed.id)) {
          setUser(parsed);
        }
      }
    } catch (_) {}
  }, []);

  const isAdmin = user?.id === ADMIN_USER_ID;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
