'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Settings,
  FolderOpen,
  Calendar,
  Package,
  Users,
  FileText,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface SidebarLink {
  href: string
  label: string
  icon: React.ReactNode
  subItems?: SidebarLink[]
}

const mainNavigation: SidebarLink[] = [
  {
    href: "/projects",
    label: "Projekte",
    icon: <FolderOpen className="h-4 w-4" />,
  },
  {
    href: "/bookings",
    label: "Termine",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    href: "/inventories",
    label: "Inventar",
    icon: <Package className="h-4 w-4" />,
  },
]

const settingsNavigation: SidebarLink = {
  href: "/settings",
  label: "Einstellungen",
  icon: <Settings className="h-4 w-4" />,
  subItems: [
    {
      href: "/settings/users",
      label: "Benutzerverwaltung",
      icon: <Users className="h-4 w-4" />,
    },
    {
      href: "/settings/templates",
      label: "Vorlagen",
      icon: <FileText className="h-4 w-4" />,
    },
  ],
}

export function Sidebar() {
  const pathname = usePathname()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

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
              {mainNavigation.map((link) => (
                <Link key={link.href} href={link.href} className="block">
                  <Button
                    variant={pathname === link.href ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2"
                  >
                    {link.icon}
                    {link.label}
                  </Button>
                </Link>
              ))}
            </nav>
            <nav className="space-y-1">
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="w-full"
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2"
                >
                  {settingsNavigation.icon}
                  {settingsNavigation.label}
                  {isSettingsOpen ? (
                    <ChevronDown className="h-4 w-4 ml-auto" />
                  ) : (
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  )}
                </Button>
              </button>
              {isSettingsOpen && settingsNavigation.subItems && (
                <div className="pl-4 space-y-1">
                  {settingsNavigation.subItems.map((subItem) => (
                    <Link key={subItem.href} href={subItem.href} className="block">
                      <Button
                        variant={pathname === subItem.href ? "secondary" : "ghost"}
                        className="w-full justify-start gap-2"
                      >
                        {subItem.icon}
                        {subItem.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
} 