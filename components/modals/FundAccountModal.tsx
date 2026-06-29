"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useToast } from "@/components/ui/use-toast";
import { X, PlusCircle, Check } from "lucide-react";

const QUICK = ["500", "1000", "2500", "5000"];

function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
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
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            className="relative z-10 w-full sm:max-w-md mx-0 sm:mx-4 rounded-t-3xl sm:rounded-3xl border border-white/10 bg-[#141420] p-7 shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
          >
            <div className="sm:hidden w-10 h-1 rounded-full bg-white/20 mx-auto mb-5" />
            <button
              onClick={onClose}
              className="absolute right-5 top-5 w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function FundAccountModal({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [done, setDone] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      api.post("/transactions/deposit/", { amount: parseFloat(amount) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast({
        title: "Funds added!",
        description: `$${amount} deposited to your account.`,
        variant: "success",
      });
      setDone(true);
      setTimeout(() => {
        setOpen(false);
        setAmount("");
        setDone(false);
      }, 1800);
    },
    onError: (err: any) =>
      toast({
        title: "Deposit failed",
        description: err.response?.data?.error,
        variant: "destructive",
      }),
  });

  return (
    <>
      <span onClick={() => setOpen(true)} className="cursor-pointer">
        {children ?? (
          <button className="flex items-center gap-2 bg-[#7C5CFC] hover:bg-[#6B4EE6] text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-[0_0_24px_rgba(124,92,252,0.45)] active:scale-95">
            <PlusCircle className="h-4 w-4" /> Fund account
          </button>
        )}
      </span>

      <Modal open={open} onClose={() => { setOpen(false); setAmount(""); setDone(false); }}>
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-6 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                className="w-14 h-14 rounded-2xl bg-[#5CF0B0]/15 flex items-center justify-center mb-4"
              >
                <Check className="h-7 w-7 text-[#5CF0B0]" />
              </motion.div>
              <p className="font-display text-[22px] font-black text-white">Deposit successful!</p>
              <p className="text-[13px] text-white/40 mt-1">${amount} has been added to your account.</p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <div>
                <h2 className="font-display text-[22px] font-black tracking-tight text-white">
                  Add funds
                </h2>
                <p className="text-[13px] text-white/40 mt-1">
                  Choose an amount or enter a custom value.
                </p>
              </div>

              {/* Quick amounts */}
              <div className="grid grid-cols-4 gap-2">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    onClick={() => setAmount(q)}
                    className={`py-2.5 rounded-xl text-[13px] font-semibold border transition-all duration-150 hover:scale-105 active:scale-95 ${
                      amount === q
                        ? "bg-[#7C5CFC]/20 border-[#7C5CFC]/60 text-[#7C5CFC]"
                        : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    ${q}
                  </button>
                ))}
              </div>

              {/* Custom input */}
              <div className="space-y-1.5">
                <label className="block text-[12px] font-semibold text-white/40 uppercase tracking-widest">
                  Custom amount (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] text-white/30 font-semibold">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-[14px] text-white placeholder:text-white/20 focus:border-[#7C5CFC]/60 focus:bg-white/[0.07] outline-none transition-all duration-200"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => { setOpen(false); setAmount(""); }}
                  className="flex-1 h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-[13px] font-semibold transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  disabled={!amount || mutation.isPending}
                  onClick={() => mutation.mutate()}
                  className="flex-1 h-11 rounded-xl bg-[#7C5CFC] hover:bg-[#6B4EE6] text-white text-[13px] font-semibold transition-all duration-200 hover:shadow-[0_0_24px_rgba(124,92,252,0.45)] active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
                >
                  {mutation.isPending ? "Processing…" : "Deposit funds"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>
    </>
  );
}