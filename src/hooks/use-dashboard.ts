// src/hooks/use-dashboard.ts
import { useState, useEffect } from 'react';
import { ApiService } from '@/lib/api';
import { CalorieStatus, FoodLog } from '@/types/api';

interface LeaderboardEntry {
  username: string;
  total_points: number;
  achievements: number;
  highest_streak: number;
}

export function useDashboard() {
  const [calorieStatus, setCalorieStatus] = useState<CalorieStatus | null>(null);
  const [recentLogs, setRecentLogs] = useState<FoodLog[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statusData, logsData, leaderboardData] = await Promise.all([
        ApiService.getCalorieStatus(),
        ApiService.getFoodLogs(),
        ApiService.getLeaderboard()
      ]);

      setCalorieStatus(statusData);
      setRecentLogs(logsData);
      setLeaderboard(leaderboardData);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Calculate weekly data from real logs
  const weeklyData = recentLogs.reduce((acc, log) => {
    const date = new Date(log.timestamp).toLocaleDateString('en-US', { weekday: 'short' });
    acc[date] = (acc[date] || 0) + log.calories;
    return acc;
  }, {} as Record<string, number>);

  return {
    calorieStatus,
    recentLogs,
    weeklyData,
    leaderboard,
    loading,
    error,
    refresh: fetchDashboardData
  };
}