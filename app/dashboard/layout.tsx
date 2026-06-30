"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ArrowUpRight,
  Receipt,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Wallet,
} from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

/* ─── Nav items ──────────────────────────────────────────────────── */
const NAV = [
  { href: "/dashboard",           label: "Dashboard",    icon: LayoutDashboard },
  { href: "/dashboard/transfers", label: "Transfers",    icon: ArrowUpRight     },
  { href: "/dashboard/payments",  label: "Payments",     icon: Receipt          },
  { href: "/dashboard/notifications", label: "Inbox",   icon: Bell             },
  { href: "/dashboard/settings",  label: "Settings",     icon: Settings         },
];

/* ─── Sidebar content ─────────────────────────────────────────────── */
function SidebarContent({ onNavClick }: { onNavClick?: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/6">
        <Link href="/dashboard" className="font-display text-xl font-black tracking-tight text-white">
          Digi<span className="text-[#7C5CFC]">Bank</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavClick}
              className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                active
                  ? "bg-[#7C5CFC]/15 text-white"
                  : "text-white/40 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <Icon
                className={`h-4 w-4 transition-colors ${
                  active ? "text-[#7C5CFC]" : "text-white/30 group-hover:text-white/60"
                }`}
              />
              {label}
              {active && (
                <motion.div
                  layoutId="nav-pill"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-[#7C5CFC]"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User card + logout */}
      <div className="px-3 py-4 border-t border-white/6">
        <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-white/4 mb-2">
          <div className="w-8 h-8 rounded-xl bg-[#7C5CFC]/20 flex items-center justify-center text-[12px] font-bold text-[#7C5CFC]">
            {user?.first_name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-white truncate">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-[11px] text-white/30 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold text-white/30 hover:text-red-400 hover:bg-red-500/[0.07] transition-all duration-200"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </div>
  );
}

/* ─── Mobile header ───────────────────────────────────────────────── */
function MobileHeader({ onOpen }: { onOpen: () => void }) {
  const pathname = usePathname();
  const currentNav = NAV.find((n) =>
    n.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(n.href)
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-30 md:hidden flex items-center justify-between px-5 py-4 bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-white/6">
      <Link href="/dashboard" className="font-display text-[18px] font-black tracking-tight text-white">
        Digi<span className="text-[#7C5CFC]">Bank</span>
      </Link>
      <div className="flex items-center gap-3">
        <Link href="/dashboard/notifications">
          <button className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors">
            <Bell className="h-4 w-4" />
          </button>
        </Link>
        <button
          onClick={onOpen}
          className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}

/* ─── Layout ──────────────────────────────────────────────────────── */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close drawer on route change
  const pathname = usePathname();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-[#7C5CFC]/20 flex items-center justify-center">
            <Wallet className="h-5 w-5 text-[#7C5CFC] animate-pulse" />
          </div>
          <p className="text-[13px] text-white/30 font-medium">Loading DigiBank…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {/* ── Desktop sidebar ── */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 w-60 flex-col bg-[#0A0A0F] border-r border-white/6 z-20">
        <SidebarContent />
      </aside>

      {/* ── Mobile header ── */}
      <MobileHeader onOpen={() => setDrawerOpen(true)} />

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            {/* Drawer panel */}
            <motion.aside
              className="fixed inset-y-0 right-0 z-50 w-72 bg-[#0D0D18] border-l border-white/[0.07] md:hidden flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
                <span className="font-display text-[18px] font-black tracking-tight text-white">
                  Digi<span className="text-[#7C5CFC]">Bank</span>
                </span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <SidebarContent onNavClick={() => setDrawerOpen(false)} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main content ── */}
      <main className="md:ml-60 pt-16 md:pt-0 min-h-screen">
        {/* Desktop top bar */}
        <div className="hidden md:flex items-center justify-between px-8 py-4 border-b border-white/5 sticky top-0 z-10 bg-[#0A0A0F]/80 backdrop-blur-xl">
          {/* Breadcrumb */}
          <BreadCrumb />
          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Link href="/dashboard/notifications">
              <button className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                <Bell className="h-4 w-4" />
              </button>
            </Link>
            <Link href="/dashboard/settings">
              <button className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                <Settings className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>

        {/* Page */}
        <div className="px-5 sm:px-8 py-8">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

/* ─── Breadcrumb ─────────────────────────────────────────────────── */
function BreadCrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="flex items-center gap-1.5 text-[13px]">
      {segments.map((seg, i) => {
        const isLast = i === segments.length - 1;
        const label = seg.charAt(0).toUpperCase() + seg.slice(1);
        return (
          <span key={seg} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-white/20" />}
            <span className={isLast ? "text-white font-semibold" : "text-white/30"}>
              {label}
            </span>
          </span>
        );
      })}
    </div>
  );
}