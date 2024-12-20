// src/contexts/auth.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ApiService } from '@/lib/api';
import { User } from '@/types/api';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      ApiService.setToken(token);
      loadUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const userData = await ApiService.getProfile();
      setUser(userData);
    } catch (error) {
      console.error('Error loading user:', error);
      Cookies.remove('token');
      ApiService.setToken('');
    } finally {
      setIsLoading(false);
    }
  };


  const login = async (email: string, password: string) => {
    try {
      const response = await ApiService.login(email, password);
      console.log('Login response:', response);
      
      // Set token in cookies and ApiService
      Cookies.set('token', response.access_token);
      ApiService.setToken(response.access_token);
      
      // Load user data
      await loadUser();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };


  const signup = async (email: string, password: string, username: string) => {
    try {
      console.log('Starting signup in AuthProvider...');
      const signupResponse = await ApiService.signup(email, password, username);
      console.log('Signup response:', signupResponse);
      
      console.log('Starting login after signup...');
      const loginResponse = await ApiService.login(email, password);
      console.log('Login response:', loginResponse);
      
      Cookies.set('token', loginResponse.access_token, { expires: 7 });
      ApiService.setToken(loginResponse.access_token);
      
      console.log('Loading user profile...');
      await loadUser();
      console.log('Signup process completed successfully!');
    } catch (error) {
      console.error('Error in signup process:', error);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}