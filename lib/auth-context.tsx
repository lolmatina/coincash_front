"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { apiClient, User, AuthResponse } from '@/lib/api'

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, lastname: string, email: string, password: string, profileType: 'personal' | 'company') => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user && !!token

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('auth_token')
        if (storedToken) {
          setToken(storedToken)
          // Verify token and get user data
          const userData = await apiClient.getCurrentUser(storedToken)
          setUser(userData.user)
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error)
        // Clear invalid token
        localStorage.removeItem('auth_token')
        setToken(null)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const response: AuthResponse = await apiClient.login({ email, password })
      
      setUser(response.user)
      setToken(response.token)
      localStorage.setItem('auth_token', response.token)
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, lastname: string, email: string, password: string, profileType: 'personal' | 'company') => {
    try {
      setIsLoading(true)
      const response: AuthResponse = await apiClient.signup({ name, lastname, email, password, profile_type: profileType })
      
      setUser(response.user)
      setToken(response.token)
      localStorage.setItem('auth_token', response.token)
    } catch (error) {
      console.error('Signup failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('auth_token')
  }

  const refreshUser = async () => {
    if (!token) return
    
    try {
      const userData = await apiClient.getCurrentUser(token)
      setUser(userData.user)
    } catch (error) {
      console.error('Failed to refresh user:', error)
      logout()
    }
  }

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    signup,
    logout,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
