// src/hooks/use-stats.ts
import { useState, useEffect } from 'react';
import { ApiService } from '@/lib/api';
import { Streak, LeaderboardEntry, User, CalorieStatus } from '@/types/api';

export function useStreak() {
  const [streak, setStreak] = useState<Streak | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStreak = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getCurrentStreak();
      setStreak(data);
    } catch (err) {
      setError('Failed to fetch streak data');
      console.error('Error fetching streak:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStreak();
  }, []);

  return { streak, loading, error, refetch: fetchStreak };
}

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getLeaderboard();
      setLeaderboard(data);
    } catch (err) {
      setError('Failed to fetch leaderboard');
      console.error('Error fetching leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return { leaderboard, loading, error, refetch: fetchLeaderboard };
}

export function useCalorieStatus() {
  const [status, setStatus] = useState<CalorieStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getCalorieStatus();
      setStatus(data);
    } catch (err) {
      setError('Failed to fetch calorie status');
      console.error('Error fetching calorie status:', err);
    } finally {
      setLoading(false);
    }
  };

  const setGoal = async (goal: number) => {
    try {
      await ApiService.setCalorieGoal(goal);
      await fetchStatus(); // Refresh status after setting goal
    } catch (err) {
      console.error('Error:', err);
      throw new Error('Failed to set calorie goal');
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return { status, loading, error, setGoal, refetch: fetchStatus };
}

export function useProfile() {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getProfile();
      setProfile(data);
    } catch (err) {
      setError('Failed to fetch profile');
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      const updated = await ApiService.updateProfile(updates);
      setProfile(updated);
      return updated;
    } catch (err) {
      console.error('Error:', err);
      throw new Error('Failed to update profile');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, loading, error, updateProfile, refetch: fetchProfile };
}