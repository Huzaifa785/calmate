// src/components/layout/navigation.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutGrid,
  UtensilsCrossed,
  Users,
  Settings,
  GraduationCap
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
  { name: 'Food Log', href: '/dashboard/food', icon: UtensilsCrossed },
  { name: 'Social', href: '/dashboard/social', icon: Users },
  { name: 'Leaderboard', href: '/dashboard/leaderboard', icon: GraduationCap },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-1 px-2 py-4">
      {navigation.map((item) => {
        const IconComponent = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <IconComponent className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}