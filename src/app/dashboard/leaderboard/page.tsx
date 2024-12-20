'use client';

import { useLeaderboard, useStreak } from '@/hooks/use-stats';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function LeaderboardPage() {
  const { leaderboard, loading: leaderboardLoading } = useLeaderboard();
  const { streak, loading: streakLoading } = useStreak();

  if (leaderboardLoading || streakLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const achievements = {
    WEEK_WARRIOR: {
      title: 'Week Warrior',
      description: 'Maintained a 7-day streak',
      points: 100,
      emoji: '🔥' // Fire emoji
    },
    MONTH_MASTER: {
      title: 'Month Master',
      description: 'Maintained a 30-day streak',
      points: 500,
      emoji: '👑' // Crown emoji
    },
    CENTURY_LOGGER: {
      title: 'Century Logger',
      description: 'Logged 100 meals',
      points: 1000,
      emoji: '📱' // Phone emoji
    },
    PROTEIN_CHAMPION: {
      title: 'Protein Champion',
      description: 'Maintained high protein intake for a week',
      points: 200,
      emoji: '💪' // Camera emoji (to represent food photo logging)
    },
    SOCIAL_BUTTERFLY: {
      title: 'Social Butterfly',
      description: 'Connected with 10 friends',
      points: 300,
      emoji: '🦋' // Bird emoji
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Leaderboard</h1>

      {/* Achievements Info Section */}
      <Card className="p-6 bg-gradient-to-br from-teal-50 to-green-50">
        <h2 className="text-2xl font-semibold">Earn Achievements</h2>
        <p className="text-sm text-gray-500">Complete challenges and earn points!</p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {Object.keys(achievements).map((key) => {
            const achievement = achievements[key as keyof typeof achievements];
            return (
              <div key={key} className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
                  {achievement.emoji}
                </div>
                <div>
                  <p className="font-semibold text-lg">{achievement.title}</p>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  <p className="text-sm text-gray-400">+{achievement.points} points</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Current User Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <span className="text-yellow-600">🏆</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Current Streak</p>
              <p className="text-2xl font-bold">{streak?.current_streak || 0} days</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <span className="text-purple-600">⭐</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Highest Streak</p>
              <p className="text-2xl font-bold">{streak?.highest_streak || 0} days</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <span className="text-blue-600">🏅</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Active</p>
              <p className="text-lg font-semibold">
                {streak?.last_log_date
                  ? new Date(streak.last_log_date).toLocaleDateString()
                  : 'No activity yet'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Leaderboard Table */}
      <Card>
        <div className="relative overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Highest Streak
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Achievements
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaderboard.map((entry, index) => (
                <tr key={index} className={index < 3 ? 'bg-gradient-to-r from-opacity-10' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {index < 3 ? (
                        <span className={`text-${index === 0 ? 'yellow' : index === 1 ? 'gray' : 'amber'}-400`}>
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                        </span>
                      ) : (
                        <span className="text-gray-500">{index + 1}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                        {entry.username[0].toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {entry.username}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{entry.total_points}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{entry.highest_streak} days</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{entry.achievements}</div>
                  </td>
                </tr>
              ))}
              {leaderboard.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No leaderboard data available yet. Start logging your meals to appear here!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
