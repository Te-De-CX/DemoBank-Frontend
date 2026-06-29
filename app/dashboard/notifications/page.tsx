"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Notification } from "@/types";
import { formatDate } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  BellOff,
  CreditCard,
  ShieldCheck,
  ArrowUpRight,
  CheckCheck,
  Info,
} from "lucide-react";

const TYPE_ICON: Record<string, { icon: typeof Bell; color: string; bg: string }> = {
  transfer: { icon: ArrowUpRight, color: "#7C5CFC", bg: "rgba(124,92,252,0.12)" },
  deposit:  { icon: CreditCard,   color: "#5CF0B0", bg: "rgba(92,240,176,0.12)" },
  security: { icon: ShieldCheck,  color: "#FC5C7D", bg: "rgba(252,92,125,0.12)" },
  default:  { icon: Info,         color: "#FCA75C", bg: "rgba(252,167,92,0.12)" },
};

function NotifIcon({ type }: { type: string }) {
  const { icon: Icon, color, bg } = TYPE_ICON[type] || TYPE_ICON.default;
  return (
    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: bg }}>
      <Icon className="h-5 w-5" style={{ color }} />
    </div>
  );
}

export default function NotificationsPage() {
  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: () => api.get("/notifications/").then((r) => r.data),
  });

  const markRead = useMutation({
    mutationFn: (id: number) => api.put(`/notifications/${id}/read/`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const markAllRead = useMutation({
    mutationFn: () => api.put("/notifications/read-all/"),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const unreadCount = notifications?.filter((n) => !n.is_read).length || 0;

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <p className="text-[11px] font-semibold text-[#7C5CFC] uppercase tracking-widest mb-1">Inbox</p>
          <h1 className="font-display text-[36px] font-black tracking-tight text-white">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-[13px] text-white/40 mt-1">
              You have{" "}
              <span className="text-[#7C5CFC] font-semibold">{unreadCount} unread</span>{" "}
              notification{unreadCount !== 1 ? "s" : ""}.
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={() => markAllRead.mutate()}
            disabled={markAllRead.isPending}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white text-[13px] font-medium px-4 py-2.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <CheckCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Mark all read</span>
          </button>
        )}
      </motion.div>

      {/* List */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse rounded-2xl bg-white/5 h-20" />
          ))}
        </div>
      ) : !notifications || notifications.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-white/20"
        >
          <BellOff className="h-12 w-12 mb-4" />
          <p className="text-[15px] font-semibold">No notifications yet</p>
          <p className="text-[13px] mt-1">We&apos;ll let you know when something happens.</p>
        </motion.div>
      ) : (
        <div className="space-y-2">
          <AnimatePresence>
            {notifications.map((n, i) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.04 * i }}
                className={`flex items-start gap-4 rounded-2xl p-5 border transition-all duration-200 ${
                  !n.is_read
                    ? "bg-[#7C5CFC]/[0.07] border-[#7C5CFC]/25"
                    : "bg-white/3 border-white/6 hover:border-white/10"
                }`}
              >
                <NotifIcon type={n.type} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[14px] font-semibold text-white leading-snug">{n.title}</p>
                    {!n.is_read && (
                      <span className="shrink-0 w-2 h-2 rounded-full bg-[#7C5CFC] mt-1.5" />
                    )}
                  </div>
                  <p className="text-[13px] text-white/50 mt-0.5 leading-relaxed">{n.message}</p>
                  <p className="text-[11px] text-white/25 mt-2">{formatDate(n.created_at)}</p>
                </div>
                {!n.is_read && (
                  <button
                    onClick={() => markRead.mutate(n.id)}
                    className="shrink-0 text-[11px] font-semibold text-[#7C5CFC] hover:text-white/60 transition-colors mt-0.5 whitespace-nowrap"
                  >
                    Mark read
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}