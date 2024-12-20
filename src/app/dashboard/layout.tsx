// src/app/dashboard/layout.tsx
import { ClientProvider } from '@/components/providers/client-provider';
import DashboardWrapper from '@/components/layout/dashboard-wrapper';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProvider>
      <DashboardWrapper>{children}</DashboardWrapper>
    </ClientProvider>
  );
}