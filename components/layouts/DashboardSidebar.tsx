"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, CreditCard, ArrowRightLeft, PiggyBank,
  Landmark, Bell, Settings, Users, FileText, Banknote,
} from "lucide-react";

const items = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/accounts", label: "Accounts", icon: Landmark },
  { href: "/dashboard/transfers", label: "Transfers", icon: ArrowRightLeft },
  { href: "/dashboard/payments", label: "Payments", icon: FileText },
  { href: "/dashboard/cards", label: "Cards", icon: CreditCard },
  { href: "/dashboard/savings", label: "Savings", icon: PiggyBank },
  { href: "/dashboard/loans", label: "Loans", icon: Banknote },
  { href: "/dashboard/beneficiaries", label: "Beneficiaries", icon: Users },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  return (
    <aside className="h-full py-6 px-4">
      <nav className="space-y-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
              pathname === item.href
                ? "bg-[#7C5CFC]/20 text-white border border-[#7C5CFC]/40"
                : "text-white/50 hover:bg-white/4 hover:text-white"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}