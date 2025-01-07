'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Settings,
  LayoutGrid,
  CalendarDays,
  PackageSearch,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const mainNavItems = [
  {
    name: 'Projekte',
    path: '/projects',
    icon: LayoutGrid,
  },
  {
    name: 'Termine',
    path: '/bookings',
    icon: CalendarDays,
  },
  {
    name: 'Inventar',
    path: '/inventories',
    icon: PackageSearch,
  },
];

const settingsNavItems = [
  {
    name: 'Allgemein',
    path: '/settings/general',
  },
  {
    name: 'Vorlagen',
    path: '/settings/templates',
  },
];

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-background border-r fixed left-0 top-0">
      <div className="p-6">
        <div className="space-y-4">
          <div className="px-4">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Company Logo"
                width={40}
                height={12}
                className="mb-0"
                priority
              />
              <span className="text-lg font-bold">lubo</span>
            </div>
          </div>
          <div className="px-3 space-y-6">
            <nav className="space-y-1">
              {mainNavItems.map((item) => (
                <Link key={item.path} href={item.path} className="block">
                  <Button
                    variant={pathname === item.path ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              ))}
            </nav>
            <nav className="space-y-1">
              {settingsNavItems.map((item) => (
                <Link key={item.path} href={item.path} className="block">
                  <Button
                    variant={pathname === item.path ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
} 