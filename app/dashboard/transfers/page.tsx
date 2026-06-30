"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
} from "lucide-react";
import axios from "axios";
import api from "@/lib/axios";
import { useToast } from "@/components/ui/use-toast";
import { Account, Transaction } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";

/* ─── Shared field ─────────────────────────────────────────────────── */
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[12px] font-semibold text-white/40 uppercase tracking-widest">
        {label}
      </label>
      {children}
    </div>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-white/20 focus:border-[#7C5CFC]/60 focus:bg-white/[0.07] outline-none transition-all duration-200"
      {...props}
    />
  );
}

/* ─── Step indicator ───────────────────────────────────────────────── */
function Steps({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {["Details", "Review", "Done"].map((label, i) => {
        const step = i + 1;
        const done = current > step;
        const active = current === step;
        return (
          <div key={label} className="flex items-center gap-2 flex-1 last:flex-none">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center text-[12px] font-bold transition-all duration-300 ${
                  done
                    ? "bg-[#5CF0B0]/20 text-[#5CF0B0]"
                    : active
                    ? "bg-[#7C5CFC] text-white shadow-[0_0_14px_rgba(124,92,252,0.5)]"
                    : "bg-white/5 text-white/25"
                }`}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : step}
              </div>
              <span
                className={`text-[12px] font-semibold hidden sm:block ${
                  active ? "text-white" : done ? "text-[#5CF0B0]" : "text-white/25"
                }`}
              >
                {label}
              </span>
            </div>
            {i < 2 && (
              <div
                className={`flex-1 h-px mx-2 transition-all duration-500 ${
                  done ? "bg-[#5CF0B0]/40" : "bg-white/10"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Transfer form ────────────────────────────────────────────────── */
export default function TransfersPage() {
  const [step, setStep] = useState(1);
  const [source, setSource] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: accounts } = useQuery<Account[]>({
    queryKey: ["accounts"],
    queryFn: () =>
      api.get("/accounts/accounts/").then((r) =>
        Array.isArray(r.data) ? r.data : r.data.results || []
      ),
  });

  const { data: transactions } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: () =>
      api.get("/transactions/history/").then((r) =>
        Array.isArray(r.data) ? r.data : r.data.results || []
      ),
  });

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
      toast({
        title: "Transfer sent!",
        description: `${formatCurrency(parseFloat(amount))} sent to ${recipient}.`,
        variant: "success",
      });
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

  const sourceAcc = accounts?.find((a) => a.id.toString() === source);
  const recentTransfers = transactions
    ?.filter((t) => t.transaction_type === "transfer")
    .slice(0, 5);

  return (
    <div className="max-w-2xl mx-auto pb-12 space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-[11px] font-semibold text-[#7C5CFC] uppercase tracking-widest mb-1">
          Money movement
        </p>
        <h1 className="font-display text-[36px] font-black tracking-tight text-white">
          Send money
        </h1>
        <p className="text-[13px] text-white/40 mt-1">
          Transfer funds to any DigiBank account instantly.
        </p>
      </motion.div>

      {/* Transfer card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-3xl bg-white/4 border border-white/[0.07] p-7"
      >
        <Steps current={step} />

        <AnimatePresence mode="wait">
          {/* Step 1 – Details */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              {/* Source account */}
              <Field label="From account">
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white outline-none focus:border-[#7C5CFC]/60 transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#141420]">
                    Select an account
                  </option>
                  {accounts?.map((a) => (
                    <option key={a.id} value={a.id} className="bg-[#141420]">
                      {a.account_type} (****{a.account_number.slice(-4)}) —{" "}
                      {formatCurrency(a.balance)}
                    </option>
                  ))}
                </select>
              </Field>

              {/* Show balance hint */}
              {sourceAcc && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="flex items-center justify-between bg-[#7C5CFC]/10 border border-[#7C5CFC]/20 rounded-xl px-4 py-2.5"
                >
                  <span className="text-[12px] text-white/50">Available balance</span>
                  <span className="text-[14px] font-bold text-[#7C5CFC]">
                    {formatCurrency(sourceAcc.balance)}
                  </span>
                </motion.div>
              )}

              <Field label="Recipient account number">
                <TextInput
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Enter account number"
                />
              </Field>

              <Field label="Amount (USD)">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] text-white/30 font-semibold">
                    $
                  </span>
                  <TextInput
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="pl-8"
                  />
                </div>
              </Field>

              <Field label="Note (optional)">
                <TextInput
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="What's this for?"
                />
              </Field>

              <button
                disabled={!source || !recipient || !amount}
                onClick={() => setStep(2)}
                className="w-full flex items-center justify-center gap-2 bg-[#7C5CFC] hover:bg-[#6B4EE6] text-white text-[14px] font-bold py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(124,92,252,0.5)] active:scale-95 disabled:opacity-30 disabled:pointer-events-none mt-2"
              >
                Review transfer <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          )}

          {/* Step 2 – Review */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div className="rounded-2xl bg-white/4 border border-white/[0.07] divide-y divide-white/6 overflow-hidden">
                {[
                  {
                    label: "From",
                    value: `${sourceAcc?.account_type} ****${sourceAcc?.account_number.slice(-4)}`,
                  },
                  { label: "To", value: recipient },
                  ...(desc ? [{ label: "Note", value: desc }] : []),
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center px-5 py-3.5"
                  >
                    <span className="text-[12px] text-white/40 uppercase tracking-wider">
                      {label}
                    </span>
                    <span className="text-[14px] font-semibold text-white">{value}</span>
                  </div>
                ))}
                {/* Amount row highlighted */}
                <div className="flex justify-between items-center px-5 py-4 bg-[#7C5CFC]/8">
                  <span className="text-[12px] text-white/40 uppercase tracking-wider">Amount</span>
                  <span className="font-display text-[22px] font-black text-[#7C5CFC]">
                    {formatCurrency(parseFloat(amount))}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-[13px] font-semibold py-3 rounded-xl transition-all duration-200"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button
                  disabled={mutation.isPending}
                  onClick={() => mutation.mutate()}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#7C5CFC] hover:bg-[#6B4EE6] text-white text-[13px] font-bold py-3 rounded-xl transition-all duration-200 hover:shadow-[0_0_24px_rgba(124,92,252,0.5)] active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
                >
                  {mutation.isPending ? "Sending…" : "Confirm & send"}
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3 – Success */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 280, delay: 0.1 }}
                className="w-16 h-16 rounded-2xl bg-[#5CF0B0]/15 flex items-center justify-center mb-5"
              >
                <Check className="h-8 w-8 text-[#5CF0B0]" />
              </motion.div>
              <p className="font-display text-[24px] font-black text-white">Money sent!</p>
              <p className="text-[13px] text-white/40 mt-1 mb-2">
                {formatCurrency(parseFloat(amount))} is on its way to {recipient}.
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-white/30 mb-8">
                <Clock className="h-3.5 w-3.5" /> Usually arrives within seconds.
              </div>
              <button
                onClick={reset}
                className="w-full flex items-center justify-center gap-2 bg-[#7C5CFC] hover:bg-[#6B4EE6] text-white text-[14px] font-bold py-3.5 rounded-xl transition-all duration-200 hover:shadow-[0_0_28px_rgba(124,92,252,0.5)] active:scale-95"
              >
                Make another transfer
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Recent transfers */}
      {recentTransfers && recentTransfers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-4">
            Recent transfers
          </p>
          <div className="space-y-2">
            {recentTransfers.map((tx, i) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="flex items-center justify-between rounded-2xl bg-white/3 border border-white/6 hover:border-white/10 px-5 py-4 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#7C5CFC]/10 flex items-center justify-center">
                    <ArrowUpRight className="h-4 w-4 text-[#7C5CFC]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-white capitalize">
                      {tx.transaction_type}
                    </p>
                    <p className="text-[11px] text-white/30">{formatDate(tx.created_at)}</p>
                  </div>
                </div>
                <span className="text-[13px] font-bold text-red-400">
                  {formatCurrency(tx.amount)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}