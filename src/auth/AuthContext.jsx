import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import * as authService from './authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Membaca sesi langsung saat pertama render agar tidak ada kedipan halaman login.
  const [session, setSession] = useState(() => authService.getSession());

  const login = useCallback(async (email, password) => {
    const next = await authService.login(email, password);
    setSession(next);
    return next.user;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      expiresAt: session?.expiresAt ?? null,
      login,
      logout,
    }),
    [session, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth harus dipakai di dalam AuthProvider');
  return ctx;
}
