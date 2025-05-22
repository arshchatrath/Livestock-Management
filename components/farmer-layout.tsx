"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { MilkIcon as Cow, Home, PlusCircle, AlertCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { logoutUser } from "@/lib/actions"

export default function FarmerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleLogout = async () => {
    await logoutUser()
  }

  const navItems = [
    { href: "/farmer/dashboard", label: "Home", icon: Home },
    { href: "/farmer/livestock", label: "My Animals", icon: Cow },
    { href: "/farmer/register-livestock", label: "Register Animal", icon: PlusCircle },
    { href: "/farmer/health-issues", label: "Report Health Issue", icon: AlertCircle },
  ]

  return (
    <div className="min-h-screen bg-green-50">
      {/* Mobile header */}
      <header className="md:hidden bg-white border-b border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Cow className="h-6 w-6 text-green-600" />
            <h1 className="text-lg font-bold text-green-800">Livestock Health</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </header>

      {/* Mobile navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-10">
        <nav className="flex justify-around">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-3 ${
                pathname === item.href ? "text-green-600" : "text-gray-600"
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white h-screen fixed border-r border-gray-200">
          <div className="flex items-center space-x-2 p-4 border-b border-gray-200">
            <Cow className="h-6 w-6 text-green-600" />
            <h1 className="text-lg font-bold text-green-800">Livestock Health</h1>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 p-3 rounded-md ${
                      pathname === item.href ? "bg-green-100 text-green-800" : "text-gray-700 hover:bg-green-50"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main content */}
        <main className="ml-64 flex-1 p-8">{children}</main>
      </div>

      {/* Mobile content */}
      <main className="md:hidden p-4 pb-20">{children}</main>
    </div>
  )
}
