"use client";

import { motion } from "framer-motion";
import { Account } from "@/types";
import { formatCurrency, maskAccountNumber } from "@/lib/utils";
import {
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const CARD_THEMES = [
  {
    gradient: "from-[#7C5CFC] via-[#9C7CFE] to-[#FC5C7D]",
    shadow: "rgba(124,92,252,0.35)",
    icon: "#fff",
  },
  {
    gradient: "from-[#1C1C2E] via-[#2A1A3E] to-[#1C1C2E]",
    shadow: "rgba(30,20,50,0.5)",
    icon: "#7C5CFC",
  },
  {
    gradient: "from-[#0F2027] via-[#203A43] to-[#2C5364]",
    shadow: "rgba(15,32,39,0.5)",
    icon: "#5CC8F0",
  },
];

export function AccountCard({
  account,
  index = 0,
  onSend,
  onDeposit,
}: {
  account: Account;
  index?: number;
  onSend?: () => void;
  onDeposit?: () => void;
}) {
  const theme = CARD_THEMES[index % CARD_THEMES.length];
  const isPrimary = index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.07 * index, duration: 0.3 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="relative overflow-hidden rounded-3xl cursor-pointer"
      style={{ boxShadow: `0 20px 50px ${theme.shadow}` }}
    >
      {/* Card face */}
      <div className={`bg-gradient-to-br ${theme.gradient} p-6 relative`}>
        {/* Decorative circles */}
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-12 -right-4 w-56 h-56 rounded-full bg-white/4 pointer-events-none" />

        <div className="relative">
          {/* Top row */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p
                className={`text-[10px] uppercase tracking-widest mb-1 ${
                  isPrimary ? "text-white/60" : "text-white/40"
                }`}
              >
                {account.account_type}
              </p>
              <p
                className={`font-display text-[32px] font-black tracking-tight leading-none ${
                  isPrimary ? "text-white" : "text-white"
                }`}
              >
                {formatCurrency(account.balance)}
              </p>
            </div>
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isPrimary ? "bg-white/20 backdrop-blur" : "bg-white/10"
              }`}
            >
              <CreditCard className="h-5 w-5" style={{ color: theme.icon }} />
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex items-end justify-between">
            <div>
              <p
                className={`text-[10px] uppercase tracking-wider mb-0.5 ${
                  isPrimary ? "text-white/50" : "text-white/30"
                }`}
              >
                Account no.
              </p>
              <p className="font-mono text-[13px] text-white/70">
                {maskAccountNumber(account.account_number)}
              </p>
            </div>
            {isPrimary && (
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur rounded-lg px-2.5 py-1 text-[11px] font-semibold text-white">
                <TrendingUp className="h-3 w-3" /> Primary
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="flex border-t border-white/[0.08] bg-white/4">
        <button
          onClick={onSend}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 text-[12px] font-semibold text-white/50 hover:text-white hover:bg-white/6 transition-all duration-200 border-r border-white/[0.07]"
        >
          <ArrowUpRight className="h-3.5 w-3.5" /> Send
        </button>
        <button
          onClick={onDeposit}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 text-[12px] font-semibold text-white/50 hover:text-white hover:bg-white/6 transition-all duration-200"
        >
          <ArrowDownLeft className="h-3.5 w-3.5" /> Deposit
        </button>
      </div>
    </motion.div>
  );
}