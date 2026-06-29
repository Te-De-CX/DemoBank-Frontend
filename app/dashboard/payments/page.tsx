"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { billPaymentSchema } from "@/lib/validations";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import {
  Smartphone,
  Wifi,
  Zap,
  Tv,
  GraduationCap,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";

const BILL_TYPES = [
  { value: "airtime",    label: "Airtime",    icon: Smartphone, color: "#7C5CFC", bg: "rgba(124,92,252,0.12)" },
  { value: "internet",   label: "Internet",   icon: Wifi,       color: "#5CC8F0", bg: "rgba(92,200,240,0.12)" },
  { value: "utilities",  label: "Utilities",  icon: Zap,        color: "#FCA75C", bg: "rgba(252,167,92,0.12)" },
  { value: "cable",      label: "Cable TV",   icon: Tv,         color: "#FC5C7D", bg: "rgba(252,92,125,0.12)" },
  { value: "education",  label: "Education",  icon: GraduationCap, color: "#5CF0B0", bg: "rgba(92,240,176,0.12)" },
];

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[12px] font-semibold text-white/40 uppercase tracking-widest">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-[11px] text-red-400 flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" /> {error}
        </p>
      )}
    </div>
  );
}

function TextInput({
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return (
    <input
      className={`w-full bg-white/5 border ${
        error ? "border-red-500/50" : "border-white/10"
      } rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-white/20 focus:border-[#7C5CFC]/60 focus:bg-white/[0.07] outline-none transition-all duration-200`}
      {...props}
    />
  );
}

export default function PaymentsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [paid, setPaid] = useState(false);

  const form = useForm<z.infer<typeof billPaymentSchema>>({
    resolver: zodResolver(billPaymentSchema),
    defaultValues: {
      bill_type: "airtime",
      provider: "",
      customer_reference: "",
      amount: 0,
    },
  });

  const selectedType = form.watch("bill_type");

  const mutation = useMutation({
    mutationFn: (data: any) => api.post("/transactions/bill_payment/", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      toast({ title: "Payment successful", description: "Your bill has been paid.", variant: "success" });
      setPaid(true);
      setTimeout(() => { setPaid(false); form.reset(); }, 2400);
    },
    onError: (err: any) =>
      toast({ title: "Payment failed", description: err.response?.data?.error, variant: "destructive" }),
  });

  return (
    <div className="max-w-xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-[11px] font-semibold text-[#7C5CFC] uppercase tracking-widest mb-1">Payments</p>
        <h1 className="font-display text-[36px] font-black tracking-tight text-white">Pay bills</h1>
        <p className="text-[13px] text-white/40 mt-1">Top up airtime, pay utilities, and more — instantly.</p>
      </motion.div>

      {/* Bill type selector */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-3">
          Select bill type
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {BILL_TYPES.map(({ value, label, icon: Icon, color, bg }) => {
            const active = selectedType === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => form.setValue("bill_type", value as any)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-200 hover:scale-105 active:scale-95 ${
                  active
                    ? "border-[#7C5CFC]/50 bg-[#7C5CFC]/10"
                    : "border-white/[0.07] bg-white/3 hover:border-white/[0.14] hover:bg-white/6"
                }`}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: active ? `${color}25` : bg }}
                >
                  <Icon className="h-4.5 w-4.5" style={{ color: active ? color : "rgba(255,255,255,0.4)" }} />
                </div>
                <span className={`text-[11px] font-semibold ${active ? "text-white" : "text-white/40"}`}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl bg-white/4 border border-white/[0.07] p-7"
      >
        {paid ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-8 text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#5CF0B0]/15 flex items-center justify-center mb-4">
              <CheckCircle className="h-7 w-7 text-[#5CF0B0]" />
            </div>
            <p className="font-display text-[22px] font-black text-white">Payment sent!</p>
            <p className="text-[13px] text-white/40 mt-1">Your bill has been paid successfully.</p>
          </motion.div>
        ) : (
          <form
            onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
            className="space-y-5"
          >
            <Field label="Provider" error={form.formState.errors.provider?.message}>
              <TextInput
                {...form.register("provider")}
                placeholder="e.g. MTN, DStv, IKEDC"
                error={form.formState.errors.provider?.message}
              />
            </Field>
            <Field
              label="Customer reference"
              error={form.formState.errors.customer_reference?.message}
            >
              <TextInput
                {...form.register("customer_reference")}
                placeholder="Phone number or account ID"
                error={form.formState.errors.customer_reference?.message}
              />
            </Field>
            <Field label="Amount (USD)" error={form.formState.errors.amount?.message}>
              <TextInput
                type="number"
                step="0.01"
                {...form.register("amount")}
                placeholder="0.00"
                error={form.formState.errors.amount?.message}
              />
            </Field>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full flex items-center justify-center gap-2 bg-[#7C5CFC] hover:bg-[#6B4EE6] text-white text-[14px] font-bold py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(124,92,252,0.5)] active:scale-95 disabled:opacity-40 disabled:pointer-events-none mt-2"
            >
              {mutation.isPending ? "Processing…" : "Pay now"}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}