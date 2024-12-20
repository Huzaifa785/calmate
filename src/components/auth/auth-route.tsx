// src/components/auth/auth-route.tsx
'use client';

import { useAuth } from '@/contexts/auth';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export function AuthRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until the component is mounted
  if (!mounted) {
    return null;
  }

  if (!isLoading && user) {
    redirect('/dashboard');
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}