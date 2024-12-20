// src/app/(auth)/layout.tsx
import { ClientProvider } from '@/components/providers/client-provider';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientProvider>{children}</ClientProvider>;
}