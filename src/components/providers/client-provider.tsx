// src/components/providers/client-provider.tsx
'use client';

import { AuthProvider } from '@/contexts/auth';

export function ClientProvider({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}