"use client";

import { useAuthStore } from "@/store/auth-store";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Bell, Moon, Sun, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { useNotificationStore } from "@/store/notification-store";

export function DashboardHeader({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  const { user, logout } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const unreadCount = useNotificationStore((s) => s.unreadCount);

  return (
    <header className="h-16 border-b border-white/5 bg-[#0A0A0F]/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white"
          onClick={onToggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Link href="/dashboard" className="text-2xl font-bold text-white">
          Digi<span className="text-[#7C5CFC]">Bank</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Link href="/dashboard/notifications" className="relative">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5 text-white/70" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {unreadCount}
              </span>
            )}
          </Button>
        </Link>
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-sm font-medium text-white/70">{user?.first_name}</span>
          <Button variant="ghost" size="icon" onClick={logout}>
            <LogOut className="h-5 w-5 text-white/70" />
          </Button>
        </div>
      </div>
    </header>
  );
}