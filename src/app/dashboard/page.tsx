// src/app/dashboard/page.tsx
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Target, Utensils, Flame } from 'lucide-react';
import { useDashboard } from '@/hooks/use-dashboard';
import { Leaderboard } from '@/components/dashboard/leaderboard';
import { RecentActivity } from '@/components/dashboard/recent-activity';

export default function DashboardPage() {
  const { user } = useAuth();
  const { 
    calorieStatus, 
    recentLogs, 
    weeklyData,
    leaderboard,
    loading, 
    error 
  } = useDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        {error}
      </div>
    );
  }

  const weeklyChartData = Object.entries(weeklyData).map(([day, calories]) => ({
    day,
    calories
  }));

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-400/10 via-blue-400/10 to-purple-400/10 rounded-3xl p-8">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {user?.full_name || 'Builder'}! 💪🏼
          </h1>
          <p className="text-gray-600 mb-6">
            {calorieStatus?.consumed 
              ? `You've consumed ${calorieStatus.consumed} out of ${calorieStatus.goal} calories today.`
              : 'Start tracking your calories for today!'}
          </p>
          {calorieStatus && (
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-1">
              <div className="relative h-6 bg-gradient-to-r from-green-100 to-green-50 rounded-full">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min((calorieStatus.consumed / calorieStatus.goal) * 100, 100)}%` 
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                  {Math.round((calorieStatus.consumed / calorieStatus.goal) * 100)}% of daily goal
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="transform hover:scale-105 transition-all duration-200">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Daily Goal</CardTitle>
              <Target className="w-5 h-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{calorieStatus?.goal || 0}</div>
            <p className="text-sm text-gray-500">calories target</p>
          </CardContent>
        </Card>

        <Card className="transform hover:scale-105 transition-all duration-200">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Consumed</CardTitle>
              <Utensils className="w-5 h-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{calorieStatus?.consumed || 0}</div>
            <p className="text-sm text-gray-500">calories consumed</p>
          </CardContent>
        </Card>

        <Card className="transform hover:scale-105 transition-all duration-200">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Remaining</CardTitle>
              <Flame className="w-5 h-5 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{calorieStatus?.remaining || 0}</div>
            <p className="text-sm text-gray-500">calories remaining</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Leaderboard */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>Weekly Progress</span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                Last 7 days
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyChartData}>
                <defs>
                  <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="calories" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  dot={{ fill: '#22c55e', strokeWidth: 2 }}
                  fill="url(#colorCalories)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Leaderboard data={leaderboard} />
      </div>

      <RecentActivity logs={recentLogs.slice(0, 5)} />
    </div>
  );
}