import React, { useState, useCallback, useMemo } from 'react';
import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = 'admin' | 'brand' | 'influencer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

const USER_STORAGE_KEY = '@foriqen:user';
const ROLE_STORAGE_KEY = '@foriqen:role';

export const [UserProvider, useUser] = createContextHook(() => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadUser = useCallback(async () => {
    try {
      const [storedUser, storedRole] = await Promise.all([
        AsyncStorage.getItem(USER_STORAGE_KEY),
        AsyncStorage.getItem(ROLE_STORAGE_KEY),
      ]);

      if (storedUser && storedRole) {
        setUser(JSON.parse(storedUser));
        setRole(storedRole as UserRole);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = useCallback(async (userData: User) => {
    try {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      await AsyncStorage.setItem(ROLE_STORAGE_KEY, userData.role);
      setUser(userData);
      setRole(userData.role);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.multiRemove([USER_STORAGE_KEY, ROLE_STORAGE_KEY]);
      setUser(null);
      setRole(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  }, []);

  const switchRole = useCallback(async (newRole: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role: newRole };
      await login(updatedUser);
    }
  }, [user, login]);

  return useMemo(() => ({
    user,
    role,
    isAuthenticated,
    isLoading,
    login,
    logout,
    switchRole,
  }), [user, role, isAuthenticated, isLoading, login, logout, switchRole]);
});
