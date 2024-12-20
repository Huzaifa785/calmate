// src/components/dashboard/leaderboard.tsx
import { Card } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

interface LeaderboardEntry {
  username: string;
  total_points: number;
  highest_streak: number;
}

// src/components/dashboard/leaderboard.tsx
function LeaderboardPodium({ leaders }: { leaders: LeaderboardEntry[] }) {
    return (
      <div className="flex justify-around items-end pt-16 pb-8">
        {/* First Place (Gold) */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full border-2 border-yellow-400 bg-yellow-50 flex items-center justify-center mb-2">
            <span className="text-2xl font-medium text-yellow-700">
              {leaders[0]?.username[0].toLowerCase()}
            </span>
          </div>
          <div className="text-center mb-2">
            <div className="text-base font-medium">{leaders[0]?.username}</div>
            <div className="text-sm text-gray-500">{leaders[0]?.highest_streak} day streak</div>
          </div>
          <div className="w-24 h-32 bg-yellow-400 flex items-end justify-center">
            <div className="text-white pb-4">
              <div className="text-3xl font-bold">{leaders[0]?.total_points}</div>
              <div className="text-sm">points</div>
            </div>
          </div>
        </div>
  
        {/* Second Place (Silver) */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full border-2 border-gray-300 bg-gray-50 flex items-center justify-center mb-2">
            <span className="text-2xl font-medium text-gray-600">
              {leaders[1]?.username[0].toLowerCase()}
            </span>
          </div>
          <div className="text-center mb-2">
            <div className="text-base font-medium">{leaders[1]?.username}</div>
            <div className="text-sm text-gray-500">{leaders[1]?.highest_streak} day streak</div>
          </div>
          <div className="w-24 h-24 bg-gray-300 flex items-end justify-center">
            <div className="text-white pb-4">
              <div className="text-3xl font-bold">{leaders[1]?.total_points}</div>
              <div className="text-sm">points</div>
            </div>
          </div>
        </div>
  
        {/* Third Place (Bronze) */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full border-2 border-orange-400 bg-orange-50 flex items-center justify-center mb-2">
            <span className="text-2xl font-medium text-orange-700">
              {leaders[2]?.username[0].toLowerCase()}
            </span>
          </div>
          <div className="text-center mb-2">
            <div className="text-base font-medium">{leaders[2]?.username}</div>
            <div className="text-sm text-gray-500">{leaders[2]?.highest_streak} day streak</div>
          </div>
          <div className="w-24 h-20 bg-orange-400 flex items-end justify-center">
            <div className="text-white pb-4">
              <div className="text-3xl font-bold">{leaders[2]?.total_points}</div>
              <div className="text-sm">points</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

export function Leaderboard({ data }: { data: LeaderboardEntry[] }) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Top Performers</h2>
        <Trophy className="w-6 h-6 text-yellow-500" />
      </div>

      <LeaderboardPodium leaders={data.slice(0, 3)} />
      
      {/* Other Rankings */}
      <div className="space-y-4 mt-4">
        {data.slice(3).map((entry, index) => (
          <div 
            key={entry.username}
            className="flex items-center p-2"
          >
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-medium">{index + 4}</span>
            </div>
            <div className="ml-4 flex-1">
              <div className="font-medium">{entry.username}</div>
              <div className="text-sm text-gray-500">{entry.highest_streak} day streak</div>
            </div>
            <div className="text-right">
              <span className="text-gray-600">{entry.total_points} points</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}