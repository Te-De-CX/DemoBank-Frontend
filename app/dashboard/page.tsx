"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  PlusCircle,
  Check,
  ArrowLeft,
  ArrowRight,
  X,
  CreditCard,
  ReceiptText,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import api from "@/lib/axios";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/store/auth-store";
import { Transaction, Account } from "@/types";
import { formatCurrency, formatDate, maskAccountNumber } from "@/lib/utils";

/* ─── Shared primitives ──────────────────────────────────────────── */
function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Sheet */}
          <motion.div
            className="relative z-10 w-full sm:max-w-md mx-0 sm:mx-4 rounded-t-3xl sm:rounded-3xl border border-white/10 bg-[#141420] p-7 shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
          >
            {/* Drag handle (mobile) */}
            <div className="sm:hidden w-10 h-1 rounded-full bg-white/20 mx-auto mb-5" />
            <button
              className="absolute right-5 top-5 w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="font-display text-[22px] font-black tracking-tight text-white">{title}</h2>
            {subtitle && <p className="text-[13px] text-white/40 mt-1 mb-5">{subtitle}</p>}
            {!subtitle && <div className="mt-5" />}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FieldInput({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[12px] font-semibold text-white/40 uppercase tracking-widest">
        {label}
      </label>
      <input
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-white/20 focus:border-[#7C5CFC]/60 focus:bg-white/[0.07] outline-none transition-all duration-200"
        {...props}
      />
    </div>
  );
}

function Btn({
  variant = "primary",
  className = "",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl text-[13px] font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:pointer-events-none h-11 px-5";
  const styles = {
    primary:
      "bg-[#7C5CFC] hover:bg-[#6B4EE6] text-white hover:shadow-[0_0_24px_rgba(124,92,252,0.45)]",
    ghost:
      "bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white",
  };
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

/* ─── Fund Modal ─────────────────────────────────────────────────── */
function FundModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [amount, setAmount] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const quickAmounts = ["500", "1000", "2500", "5000"];

  const mutation = useMutation({
    mutationFn: () =>
      api.post("/transactions/deposit/", { amount: parseFloat(amount) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast({ title: "Funds added!", description: `$${amount} deposited successfully.`, variant: "success" });
      onClose();
      setAmount("");
    },
    onError: (err: unknown) => {
      const message =
        axios.isAxiosError(err)
          ? err.response?.data?.error ?? "Deposit failed."
          : "Deposit failed.";
    
      toast({
        title: "Deposit failed",
        description: message,
        variant: "destructive",
      });
}})
  

  return (
    <Modal open={open} onClose={onClose} title="Add funds" subtitle="Choose an amount or enter a custom value.">
      <div className="space-y-5">
        {/* Quick amounts */}
        <div className="grid grid-cols-4 gap-2">
          {quickAmounts.map((q) => (
            <button
              key={q}
              onClick={() => setAmount(q)}
              className={`py-2.5 rounded-xl text-[13px] font-semibold border transition-all duration-150 ${
                amount === q
                  ? "bg-[#7C5CFC]/20 border-[#7C5CFC]/60 text-[#7C5CFC]"
                  : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              ${q}
            </button>
          ))}
        </div>
        <FieldInput
          label="Custom amount (USD)"
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="flex gap-3 pt-1">
          <Btn variant="ghost" onClick={onClose} className="flex-1">
            Cancel
          </Btn>
          <Btn
            className="flex-1"
            onClick={() => mutation.mutate()}
            disabled={!amount || mutation.isPending}
          >
            {mutation.isPending ? "Processing…" : "Deposit funds"}
          </Btn>
        </div>
      </div>
    </Modal>
  );
}

/* ─── Transfer Modal ─────────────────────────────────────────────── */
function TransferModal({
  open,
  onClose,
  accounts,
}: {
  open: boolean;
  onClose: () => void;
  accounts: Account[];
}) {
  const [step, setStep] = useState(1);
  const [source, setSource] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const titles = ["", "Send money", "Confirm transfer", "Transfer sent"];
  const subtitles = [
    "",
    "Enter the details below to send money.",
    "Review before confirming.",
    "",
  ];

  const mutation = useMutation({
    mutationFn: () =>
      api.post("/transactions/transfer/", {
        source_account_id: parseInt(source),
        recipient_account: recipient,
        amount: parseFloat(amount),
        description: desc,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast({ title: "Transfer complete!", description: `$${amount} sent to ${recipient}.`, variant: "success" });
      setStep(3);
    },
    onError: (err: unknown) => {
      const message =
        axios.isAxiosError(err)
          ? err.response?.data?.error ?? "Transfer failed."
          : "Transfer failed.";
    
      toast({
        title: "Transfer failed",
        description: message,
        variant: "destructive",
      });
    },
  });

  const reset = () => {
    setStep(1);
    setSource("");
    setRecipient("");
    setAmount("");
    setDesc("");
  };

  const sourceAcc = accounts.find((a) => a.id.toString() === source);

  return (
    <Modal
      open={open}
      onClose={() => { reset(); onClose(); }}
      title={titles[step]}
      subtitle={subtitles[step]}
    >
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <label className="block text-[12px] font-semibold text-white/40 uppercase tracking-widest">
                From account
              </label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white outline-none focus:border-[#7C5CFC]/60 transition-all"
              >
                <option value="" className="bg-[#141420]">Select account</option>
                {accounts.map((a) => (
                  <option key={a.id} value={a.id} className="bg-[#141420]">
                    {a.account_type} (****{a.account_number.slice(-4)}) — {formatCurrency(a.balance)}
                  </option>
                ))}
              </select>
            </div>
            <FieldInput
              label="Recipient account number"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter account number"
            />
            <FieldInput
              label="Amount (USD)"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
            />
            <FieldInput
              label="Note (optional)"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="What's this for?"
            />
            <div className="flex gap-3 pt-1">
              <Btn variant="ghost" onClick={onClose} className="flex-1">Cancel</Btn>
              <Btn
                className="flex-1"
                disabled={!source || !recipient || !amount}
                onClick={() => setStep(2)}
              >
                Continue <ArrowRight className="h-4 w-4" />
              </Btn>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            className="space-y-4"
          >
            <div className="rounded-2xl bg-white/4 border border-white/[0.07] p-5 space-y-4">
              {[
                { label: "From", value: `${sourceAcc?.account_type} ****${sourceAcc?.account_number.slice(-4)}` },
                { label: "To", value: recipient },
                { label: "Amount", value: formatCurrency(parseFloat(amount)), highlight: true },
                ...(desc ? [{ label: "Note", value: desc }] : []),
              ].map(({ label, value, highlight }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-[12px] text-white/40 uppercase tracking-wider">{label}</span>
                  <span className={`text-[14px] font-semibold ${highlight ? "text-[#7C5CFC] text-[18px]" : "text-white"}`}>{value}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 pt-1">
              <Btn variant="ghost" onClick={() => setStep(1)} className="flex-1">
                <ArrowLeft className="h-4 w-4" /> Back
              </Btn>
              <Btn
                className="flex-1"
                onClick={() => mutation.mutate()}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Sending…" : "Confirm & send"}
              </Btn>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-6 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
              className="w-16 h-16 rounded-2xl bg-[#5CF0B0]/15 flex items-center justify-center mb-5"
            >
              <Check className="h-8 w-8 text-[#5CF0B0]" />
            </motion.div>
            <p className="font-display text-[22px] font-black text-white">Money sent!</p>
            <p className="text-[13px] text-white/40 mt-1 mb-7">
              {formatCurrency(parseFloat(amount))} is on its way to {recipient}.
            </p>
            <Btn onClick={() => { reset(); onClose(); }} className="w-full">Done</Btn>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}

/* ─── Skeleton ───────────────────────────────────────────────────── */
function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl bg-white/5 ${className}`} />;
}

/* ─── Custom chart tooltip ───────────────────────────────────────── */
type ChartTooltipProps = {
  active?: boolean;
  label?: string | number;
  payload?: Array<{
    value: number | string;
  }>;
};

function ChartTooltip({
  active,
  payload,
  label,
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-[#1C1C2E] border border-white/10 rounded-xl px-4 py-2.5 shadow-xl">
      <p className="text-[11px] text-white/40 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className="text-[15px] font-bold text-white">
        {formatCurrency(Number(payload[0].value))}
      </p>
    </div>
  );
}
/* ─── Dashboard Page ─────────────────────────────────────────────── */
export default function DashboardPage() {
  const [fundOpen, setFundOpen] = useState(false);
  const [transferOpen, setTransferOpen] = useState(false);
  const { user } = useAuthStore();

  const { data: accounts, isLoading: loadingAccounts } = useQuery<Account[]>({
    queryKey: ["accounts"],
    queryFn: () =>
      api.get("/accounts/accounts/").then((r) =>
        Array.isArray(r.data) ? r.data : r.data.results || []
      ),
  });

  const { data: transactions, isLoading: loadingTxns } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: () =>
      api.get("/transactions/history/").then((r) =>
        Array.isArray(r.data) ? r.data : r.data.results || []
      ),
  });

  // Build monthly chart data
  const monthlyData = (() => {
    const acc: Record<string, number> = {};
    transactions?.forEach((t) => {
      const m = new Date(t.created_at).toLocaleString("default", { month: "short" });
      acc[m] = (acc[m] || 0) + Math.abs(t.amount);
    });
    return Object.entries(acc).map(([name, amount]) => ({ name, amount }));
  })();

  const totalBalance = accounts?.reduce((s, a) => s + a.balance, 0) || 0;
  const firstName = user?.first_name || "there";

  if (loadingAccounts || loadingTxns) {
    return (
      <div className="space-y-6 pb-10">
        <Skeleton className="h-10 w-56" />
        <Skeleton className="h-36 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
        </div>
        <Skeleton className="h-72 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <p className="text-[11px] font-semibold text-[#7C5CFC] uppercase tracking-widest mb-1">
            Welcome back
          </p>
          <h1 className="font-display text-[32px] sm:text-[40px] font-black tracking-tight text-white leading-tight">
            Hey, {firstName} 👋
          </h1>
          <p className="text-[13px] text-white/40 mt-1">Here&apos;s your financial overview</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setFundOpen(true)}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <PlusCircle className="h-4 w-4" /> Add money
          </button>
          <button
            onClick={() => setTransferOpen(true)}
            className="flex items-center gap-2 bg-[#7C5CFC] hover:bg-[#6B4EE6] text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-[0_0_24px_rgba(124,92,252,0.45)] active:scale-95"
          >
            <ArrowUpRight className="h-4 w-4" /> Send
          </button>
        </div>
      </motion.div>

      {/* ── Total Balance Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#7C5CFC] via-[#9C7CFE] to-[#FC5C7D] p-7 shadow-[0_24px_60px_rgba(124,92,252,0.35)]"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="text-[11px] text-white/60 uppercase tracking-widest mb-1">Total balance</p>
            <p className="font-display text-[48px] sm:text-[56px] font-black tracking-tight text-white leading-none">
              {formatCurrency(totalBalance)}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur rounded-lg px-2.5 py-1 text-[12px] font-semibold">
                <TrendingUp className="w-3.5 h-3.5" /> +8.4% this month
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setFundOpen(true)}
              className="flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <PlusCircle className="h-4 w-4" /> Add money
            </button>
            <button
              onClick={() => setTransferOpen(true)}
              className="flex items-center gap-2 bg-white text-[#7C5CFC] text-[13px] font-bold px-5 py-2.5 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
            >
              <ArrowUpRight className="h-4 w-4" /> Send
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── Account Cards ── */}
      {accounts && accounts.length > 0 && (
        <div>
          <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-4">
            Your accounts
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.map((account, i) => (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="rounded-2xl bg-white/4 hover:bg-white/[0.07] border border-white/[0.07] hover:border-white/[0.14] p-6 transition-all duration-200 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-white/40 mb-1">
                      {account.account_type}
                    </p>
                    <p className="font-display text-[28px] font-black text-white tracking-tight">
                      {formatCurrency(account.balance)}
                    </p>
                    <p className="text-[12px] text-white/30 font-mono mt-1">
                      {maskAccountNumber(account.account_number)}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#7C5CFC]/15 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-[#7C5CFC]" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTransferOpen(true)}
                    className="flex-1 flex items-center justify-center gap-1.5 border border-white/10 hover:bg-white/10 text-white/70 hover:text-white text-[12px] font-medium py-2 rounded-xl transition-colors duration-200"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" /> Send
                  </button>
                  <button
                    onClick={() => setFundOpen(true)}
                    className="flex-1 flex items-center justify-center gap-1.5 border border-white/10 hover:bg-white/10 text-white/70 hover:text-white text-[12px] font-medium py-2 rounded-xl transition-colors duration-200"
                  >
                    <ArrowDownLeft className="h-3.5 w-3.5" /> Deposit
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ── Chart + Recent Transactions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Area chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="lg:col-span-3 rounded-2xl bg-white/4 border border-white/[0.07] p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-1">Activity</p>
              <h3 className="font-display text-[18px] font-black text-white">Monthly spending</h3>
            </div>
          </div>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C5CFC" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7C5CFC" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.25)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.25)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip content={<ChartTooltip />} />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#7C5CFC"
                  strokeWidth={2.5}
                  fill="url(#spendGrad)"
                  dot={{ r: 4, fill: "#7C5CFC", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#7C5CFC", strokeWidth: 2, stroke: "#fff" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-55 flex flex-col items-center justify-center text-white/20">
              <TrendingUp className="h-8 w-8 mb-3" />
              <p className="text-[13px]">No activity yet</p>
            </div>
          )}
        </motion.div>

        {/* Recent transactions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 rounded-2xl bg-white/4 border border-white/[0.07] p-6 flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-1">Latest</p>
              <h3 className="font-display text-[18px] font-black text-white">Transactions</h3>
            </div>
            <ReceiptText className="h-5 w-5 text-white/20" />
          </div>
          <div className="space-y-1 flex-1 overflow-y-auto max-h-64 pr-1 scrollbar-thin">
            {transactions && transactions.length > 0 ? (
              transactions.slice(0, 8).map((tx, i) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="flex justify-between items-center py-3 border-b border-white/5 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      tx.amount > 0 ? "bg-[#5CF0B0]/10" : "bg-red-500/10"
                    }`}>
                      {tx.amount > 0
                        ? <ArrowDownLeft className="h-4 w-4 text-[#5CF0B0]" />
                        : <ArrowUpRight className="h-4 w-4 text-red-400" />
                      }
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-white capitalize">{tx.transaction_type}</p>
                      <p className="text-[11px] text-white/30">{formatDate(tx.created_at)}</p>
                    </div>
                  </div>
                  <span className={`text-[13px] font-bold ${tx.amount > 0 ? "text-[#5CF0B0]" : "text-red-400"}`}>
                    {tx.amount > 0 ? "+" : ""}{formatCurrency(tx.amount)}
                  </span>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-white/20">
                <ReceiptText className="h-8 w-8 mb-3" />
                <p className="text-[13px]">No transactions yet</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <FundModal open={fundOpen} onClose={() => setFundOpen(false)} />
      <TransferModal
        open={transferOpen}
        onClose={() => setTransferOpen(false)}
        accounts={accounts || []}
      />
    </div>
  );
}