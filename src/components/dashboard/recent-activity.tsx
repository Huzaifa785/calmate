// src/components/dashboard/recent-activity.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FoodLog } from '@/types/api';

export function RecentActivity({ logs }: { logs: FoodLog[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-green-500/20 to-transparent" />
          {logs.map((log) => (
            <div key={log.id} className="relative pl-16 pb-8 group">
              <div className="absolute left-6 w-4 h-4 rounded-full bg-green-100 border-2 border-green-500 group-hover:scale-125 transition-all" />
              <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{log.food_name}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(log.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      {log.calories} cal
                    </div>
                    <div className="text-sm text-gray-500">
                      {log.portion_size}g
                    </div>
                  </div>
                </div>
                
                {/* Macros Pills */}
                <div className="flex gap-2 mt-2">
                  {Object.entries(log.macronutrients).map(([key, value]) => (
                    <span key={key} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                      {key}: {value}g
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}