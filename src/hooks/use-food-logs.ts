// src/hooks/use-food-logs.ts
import { useState, useEffect } from 'react';
import { ApiService } from '@/lib/api';
import { FoodLog } from '@/types/api';

export function useFoodLogs() {
  const [logs, setLogs] = useState<FoodLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = async () => {
    try {
      const fetchedLogs = await ApiService.getFoodLogs();
      setLogs(fetchedLogs);
    } catch (err) {
      setError('Failed to fetch food logs');
      console.error('Error fetching food logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const addLog = (newLog: FoodLog) => {
    setLogs(prev => [newLog, ...prev]);
  };

  return {
    logs,
    loading,
    error,
    refetch: fetchLogs,
    addLog,
  };
}