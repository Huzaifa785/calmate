// src/hooks/use-social.ts
import { useState, useEffect } from 'react';
import { ApiService } from '@/lib/api';

interface Friend {
  id: string;
  user_id: string;
  friend_id: string;
  username: string;
  streak_count: number;
  last_interaction: string;
  status: string;
}

interface FeedItem {
  id: string;
  user_id: string;
  username: string;
  food_name: string;
  portion_size: number;
  calories: number;
  macronutrients: {
    protein: number;
    carbs: number;
    fats: number;
  };
  image_url: string;
  timestamp: string;
}

export function useFriends() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFriends = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getFriends();
      setFriends(response);
      setError(null);
    } catch (err) {
      setError('Failed to fetch friends');
      console.error('Error fetching friends:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const sendFriendRequest = async (userId: string) => {
    try {
      await ApiService.sendFriendRequest(userId);
      await fetchFriends(); // Refresh the list
    } catch (err) {
      console.error('Error sending friend request:', err);
      throw err;
    }
  };

  const acceptFriendRequest = async (requestId: string) => {
    try {
      await ApiService.acceptFriendRequest(requestId);
      await fetchFriends(); // Refresh the list
    } catch (err) {
      console.error('Error accepting friend request:', err);
      throw err;
    }
  };

  return {
    friends,
    loading,
    error,
    sendFriendRequest,
    acceptFriendRequest,
    refetch: fetchFriends,
  };
}

export function useSocialFeed() {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeed = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getFeed();
      setFeed(response);
      setError(null);
    } catch (err) {
      setError('Failed to fetch social feed');
      console.error('Error fetching feed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return {
    feed,
    loading,
    error,
    refetch: fetchFeed,
  };
}