// src/app/dashboard/settings/page.tsx
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProfile, useCalorieStatus } from '@/hooks/use-stats';
import { Loader2 } from 'lucide-react';

export default function SettingsPage() {
  const { profile, loading: profileLoading, updateProfile } = useProfile();
  const { status, loading: calorieLoading, setGoal } = useCalorieStatus();
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [calorieGoal, setCalorieGoal] = useState('');
  const [updating, setUpdating] = useState(false);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username && !fullName) return;

    try {
      setUpdating(true);
      await updateProfile({
        username: username || undefined,
        full_name: fullName || undefined,
      });
      setUsername('');
      setFullName('');
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setUpdating(false);
    }
  };

  const handleCalorieGoalUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!calorieGoal) return;

    try {
      setUpdating(true);
      await setGoal(Number(calorieGoal));
      setCalorieGoal('');
    } catch (err) {
      console.error('Failed to update calorie goal:', err);
    } finally {
      setUpdating(false);
    }
  };

  if (profileLoading || calorieLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <Input
              placeholder={profile?.username || 'Set username'}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <Input
              placeholder={profile?.full_name || 'Set full name'}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={updating || (!username && !fullName)}>
            {updating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Update Profile
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Calorie Goal</h2>
        <form onSubmit={handleCalorieGoalUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Daily Calorie Goal</label>
            <Input
              type="number"
              placeholder={String(status?.goal || 'Set daily goal')}
              value={calorieGoal}
              onChange={(e) => setCalorieGoal(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={updating || !calorieGoal}>
            {updating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Update Goal
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        <div className="space-y-2">
          <p>Email: {profile?.email}</p>
          <p>Member since: {new Date(profile?.created_at || '').toLocaleDateString()}</p>
          <p>Current streak: {profile?.current_streak} days</p>
          <p>Highest streak: {profile?.highest_streak} days</p>
        </div>
      </Card>
    </div>
  );
}