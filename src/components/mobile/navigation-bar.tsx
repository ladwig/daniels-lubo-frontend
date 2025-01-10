"use client"

import Link from "next/link"
import { Briefcase, Package, User } from "lucide-react"
import { usePathname } from "next/navigation"

export function NavigationBar() {
  const pathname = usePathname()

  return (
    <div className="bg-white border-t flex justify-around py-4">
      <Link 
        href="/mobile"
        className={`p-3 rounded-full ${pathname === '/mobile' ? "text-[#FEDC00]" : "text-gray-400"}`}
      >
        <Briefcase className="w-7 h-7" />
      </Link>
      <Link 
        href="/mobile/inventory"
        className={`p-3 rounded-full ${pathname.includes('/inventory') ? "text-[#FEDC00]" : "text-gray-400"}`}
      >
        <Package className="w-7 h-7" />
      </Link>
      <Link 
        href="/mobile/profile"
        className={`p-3 rounded-full ${pathname.includes('/profile') ? "text-[#FEDC00]" : "text-gray-400"}`}
      >
        <User className="w-7 h-7" />
      </Link>
    </div>
  )
} 