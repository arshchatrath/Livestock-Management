"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  MilkIcon as Cow,
  Syringe,
  Stethoscope,
  Users,
  Tent,
  Calendar,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { logoutUser } from "@/lib/actions"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)

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
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/livestock", label: "All Livestock", icon: Cow },
    { href: "/admin/vaccinations", label: "Vaccinations", icon: Syringe },
    { href: "/admin/health-records", label: "Health Records", icon: Stethoscope },
    { href: "/admin/veterinarians", label: "Veterinarians", icon: Users },
    { href: "/admin/health-camps", label: "Health Camps", icon: Tent },
    { href: "/admin/upcoming-vaccinations", label: "Upcoming Vaccinations", icon: Calendar },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile header */}
      <header className="lg:hidden bg-white border-b border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Cow className="h-6 w-6 text-green-600" />
            <h1 className="text-lg font-bold text-green-800">Admin Panel</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Cow className="h-6 w-6 text-green-600" />
                    <h1 className="text-lg font-bold text-green-800">Admin Panel</h1>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </Button>
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
                          onClick={() => setOpen(false)}
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
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Desktop layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white h-screen fixed border-r border-gray-200 hidden lg:block">
          <div className="flex items-center space-x-2 p-4 border-b border-gray-200">
            <Cow className="h-6 w-6 text-green-600" />
            <h1 className="text-lg font-bold text-green-800">Admin Panel</h1>
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
        <main className="lg:ml-64 flex-1 p-4 lg:p-8 w-full">{children}</main>
      </div>
    </div>
  )
}
