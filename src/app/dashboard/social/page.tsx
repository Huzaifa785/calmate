// src/app/dashboard/social/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, UserPlus, Heart, Utensils, Check, Clock } from 'lucide-react';
import { ApiService } from '@/lib/api';
import { FriendRequest } from '@/types/api';

// Types
interface Friend {
  id: string;
  username: string;
  streak_count: number;
  last_interaction: string;
}

interface UserMin {
  id: string;
  username: string;
  highest_streak: number;
  total_points: number;
  achievements_count: number;
}

interface FeedItem {
  id: string;
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

// Social Feed Component
function SocialFeed() {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true);
        const response = await ApiService.getFeed();
        setFeed(response);
      } catch (err) {
        console.error('Error fetching feed:', err);
        setError('Failed to load feed');
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <Heart className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Error loading feed</h3>
        <p className="mt-1 text-sm text-gray-500">{error}</p>
      </div>
    );
  }

  if (feed.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <Utensils className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No posts in your feed</h3>
        <p className="mt-1 text-sm text-gray-500">
          Add friends to see their food logs and healthy meals!
        </p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => window.location.href = '#friends'}
        >
          Find Friends
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {feed.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                {item.username[0].toUpperCase()}
              </div>
              <div>
                <p className="font-semibold">{item.username}</p>
                <p className="text-sm text-gray-500">
                  {new Date(item.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-4 md:mb-0">
                <div className="bg-gray-100 h-48 rounded-lg">
                  {item.image_url && (
                    <img 
                      src={item.image_url} 
                      alt={item.food_name}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  )}
                </div>
              </div>
              
              <div className="md:pl-6 flex-1">
                <h3 className="text-lg font-semibold capitalize mb-2">
                  {item.food_name}
                </h3>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Protein</p>
                    <p className="text-lg font-semibold">
                      {item.macronutrients.protein}g
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Carbs</p>
                    <p className="text-lg font-semibold">
                      {item.macronutrients.carbs}g
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-gray-600">Fats</p>
                    <p className="text-lg font-semibold">
                      {item.macronutrients.fats}g
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// Friends List Component
function FriendsList() {
  const [activeTab, setActiveTab] = useState<'available' | 'received' | 'sent' | 'friends'>('available');
  const [friends, setFriends] = useState<Friend[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<FriendRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<FriendRequest[]>([]);
  const [availableUsers, setAvailableUsers] = useState<UserMin[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tabs = [
    { id: 'available', label: 'Available', count: availableUsers.length },
    { id: 'received', label: 'Received', count: receivedRequests.length },
    { id: 'sent', label: 'Sent', count: sentRequests.length },
    { id: 'friends', label: 'Friends', count: friends.length },
  ];

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [friendsResponse, receivedResponse, sentResponse, usersResponse] = await Promise.all([
        ApiService.getFriends(),
        ApiService.getFriendRequests('received'),
        ApiService.getFriendRequests('sent'),
        ApiService.getAllUsers()
      ]);
      setFriends(friendsResponse);
      setReceivedRequests(receivedResponse);
      setSentRequests(sentResponse);
      setAvailableUsers(usersResponse);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async (userId: string) => {
    try {
      await ApiService.sendFriendRequest(userId);
      await fetchAllData(); // Refresh all data
    } catch (err) {
      console.error('Failed to send friend request:', err);
      setError('Failed to send friend request. Please try again.');
    }
  };

  const handleAcceptRequest = async (requestId: string) => {
    try {
      await ApiService.acceptFriendRequest(requestId);
      await fetchAllData(); // Refresh all data
    } catch (err) {
      console.error('Failed to accept friend request:', err);
      setError('Failed to accept friend request. Please try again.');
    }
  };

  // Filter out users who are already friends or have pending requests
  const filteredUsers = availableUsers.filter(user => {
    const isFriend = friends.some(friend => friend.id === user.id);
    const hasSentRequest = sentRequests.some(req => req.to_user.id === user.id);
    const hasReceivedRequest = receivedRequests.some(req => req.from_user.id === user.id);
    return !isFriend && !hasSentRequest && !hasReceivedRequest;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Friends</h1>
      </div>

      {error && (
        <div className="text-sm text-red-500 bg-red-50 p-3 rounded">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'available' && (
          <div className="grid gap-4">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No available users</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You&apos;ve either added all users as friends or sent them requests!
                </p>
              </div>
            ) : (
              filteredUsers.map((user) => (
                <Card key={user.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                        {user.username[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold">{user.username}</p>
                        <p className="text-sm text-gray-500">
                          Streak: {user.highest_streak} days • Points: {user.total_points}
                        </p>
                      </div>
                    </div>
                    <Button onClick={() => handleSendRequest(user.id)} variant="outline">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add Friend
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

        {activeTab === 'received' && (
          <div className="grid gap-4">
            {receivedRequests.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No pending requests</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You don&apos;t have any friend requests at the moment.
                </p>
              </div>
            ) : (
              receivedRequests.map((request) => (
                <Card key={request.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                        {request.from_user.username[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold">{request.from_user.username}</p>
                        <p className="text-sm text-gray-500">
                          Sent {new Date(request.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button onClick={() => handleAcceptRequest(request.id)} variant="outline">
                      <Check className="w-4 h-4 mr-2" />
                      Accept
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

        {activeTab === 'sent' && (
          <div className="grid gap-4">
            {sentRequests.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Clock className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No sent requests</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You haven&apos;t sent any friend requests yet.
                </p>
              </div>
            ) : (
              sentRequests.map((request) => (
                <Card key={request.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                        {request.to_user.username[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold">{request.to_user.username}</p>
                        <p className="text-sm text-gray-500">
                          Sent {new Date(request.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">Pending</span>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

        {activeTab === 'friends' && (
          <div className="grid gap-4">
            {friends.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No friends yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Start adding friends to see them here!
                </p>
              </div>
            ) : (
              friends.map((friend) => (
                <Card key={friend.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                        {friend.username[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold">{friend.username}</p>
                        <p className="text-sm text-gray-500">
                          Streak: {friend.streak_count} days
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      Last active: {new Date(friend.last_interaction).toLocaleDateString()}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Main Social Page Component
export default function SocialPage() {
  const [activeTab, setActiveTab] = useState<'feed' | 'friends'>('feed');

  const tabs = [
    { id: 'feed', label: 'Feed', icon: Heart },
    { id: 'friends', label: 'Friends', icon: Users },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Social</h1>
      </div>

      <div className="flex space-x-4 border-b">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'feed' | 'friends')}
              className={`flex items-center space-x-2 px-4 py-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div>
        {activeTab === 'feed' ? (
          <SocialFeed />
        ) : (
          <FriendsList />
        )}
      </div>
    </div>
  );
}