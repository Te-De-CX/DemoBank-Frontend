"use client";
import { useAuthStore } from "@/store/auth-store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { useState } from "react";
import { User, Lock, Shield, Eye, EyeOff, Check, AlertTriangle } from "lucide-react";

/* ─── Schemas ──────────────────────────────────────────────────────── */
const profileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
});
const passwordSchema = z.object({
  old_password: z.string().min(8, "Minimum 8 characters"),
  new_password: z.string().min(8, "Minimum 8 characters"),
});

/* ─── Primitives ───────────────────────────────────────────────────── */
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
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return (
    <input
      className={`w-full bg-white/5 border ${
        error ? "border-red-500/50" : "border-white/10"
      } rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-white/20 focus:border-[#7C5CFC]/60 focus:bg-white/[0.07] outline-none transition-all duration-200 ${className}`}
      {...props}
    />
  );
}

function PasswordInput({
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <TextInput type={show ? "text" : "password"} error={error} className="pr-12" {...props} />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

function SubmitBtn({
  loading,
  label,
  loadingLabel = "Saving…",
}: {
  loading: boolean;
  label: string;
  loadingLabel?: string;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex items-center gap-2 bg-[#7C5CFC] hover:bg-[#6B4EE6] text-white text-[13px] font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:pointer-events-none hover:shadow-[0_0_24px_rgba(124,92,252,0.4)]"
    >
      {loading ? loadingLabel : label}
    </button>
  );
}

/* ─── Tab component ────────────────────────────────────────────────── */
const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "password", label: "Password", icon: Lock },
  { id: "security", label: "Security", icon: Shield },
];

/* ─── Settings Page ────────────────────────────────────────────────── */
export default function SettingsPage() {
  const { user, setUser } = useAuthStore();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");

  /* Profile form */
  const {
    register: rp,
    handleSubmit: hp,
    formState: { errors: ep },
  } = useForm({ resolver: zodResolver(profileSchema), defaultValues: { first_name: user?.first_name || "", last_name: user?.last_name || "", phone: user?.phone || "" } });

  /* Password form */
  const {
    register: rpw,
    handleSubmit: hpw,
    reset: resetPw,
    formState: { errors: epw },
  } = useForm({ resolver: zodResolver(passwordSchema) });

  const updateProfile = useMutation({
    mutationFn: (data: any) => api.put("/auth/profile/", data),
    onSuccess: (res) => {
      setUser(res.data);
      toast({ title: "Profile updated", description: "Your details have been saved.", variant: "success" });
    },
    onError: (err: any) =>
      toast({ title: "Update failed", description: err.response?.data?.error, variant: "destructive" }),
  });

  const changePassword = useMutation({
    mutationFn: (data: any) => api.put("/auth/change-password/", data),
    onSuccess: () => {
      resetPw();
      toast({ title: "Password changed", description: "Your new password is active.", variant: "success" });
    },
    onError: (err: any) =>
      toast({ title: "Failed", description: err.response?.data?.error, variant: "destructive" }),
  });

  const enable2FA = useMutation({
    mutationFn: () => api.post("/auth/enable-2fa/"),
    onSuccess: () => toast({ title: "2FA enabled", description: "Your account is more secure.", variant: "success" }),
  });

  const disable2FA = useMutation({
    mutationFn: () => api.post("/auth/disable-2fa/"),
    onSuccess: () => toast({ title: "2FA disabled", variant: "default" }),
  });

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-[11px] font-semibold text-[#7C5CFC] uppercase tracking-widest mb-1">Account</p>
        <h1 className="font-display text-[36px] font-black tracking-tight text-white">Settings</h1>
        <p className="text-[13px] text-white/40 mt-1">Manage your profile and security preferences.</p>
      </motion.div>

      {/* Tab bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex gap-1 bg-white/4 border border-white/[0.07] rounded-2xl p-1"
      >
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
              activeTab === id
                ? "bg-[#7C5CFC] text-white shadow-[0_0_16px_rgba(124,92,252,0.4)]"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </motion.div>

      {/* Panel */}
      <AnimatedPanel key={activeTab}>
        {activeTab === "profile" && (
          <form onSubmit={hp((d) => updateProfile.mutate(d))} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="First name" error={ep.first_name?.message}>
                <TextInput {...rp("first_name")} placeholder="Alex" error={ep.first_name?.message} />
              </Field>
              <Field label="Last name" error={ep.last_name?.message}>
                <TextInput {...rp("last_name")} placeholder="Morgan" error={ep.last_name?.message} />
              </Field>
            </div>
            <Field label="Phone number" error={ep.phone?.message}>
              <TextInput {...rp("phone")} placeholder="+1 555 000 0000" type="tel" />
            </Field>
            <div className="pt-2">
              <SubmitBtn loading={updateProfile.isPending} label="Save profile" />
            </div>
          </form>
        )}

        {activeTab === "password" && (
          <form onSubmit={hpw((d) => changePassword.mutate(d))} className="space-y-5">
            <Field label="Current password" error={epw.old_password?.message}>
              <PasswordInput {...rpw("old_password")} placeholder="Enter current password" error={epw.old_password?.message} />
            </Field>
            <Field label="New password" error={epw.new_password?.message}>
              <PasswordInput {...rpw("new_password")} placeholder="Minimum 8 characters" error={epw.new_password?.message} />
            </Field>
            <div className="pt-2">
              <SubmitBtn loading={changePassword.isPending} label="Update password" />
            </div>
          </form>
        )}

        {activeTab === "security" && (
          <div className="space-y-6">
            {/* 2FA card */}
            <div className="rounded-2xl bg-white/4 border border-white/[0.07] p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      user?.is_2fa_enabled ? "bg-[#5CF0B0]/15" : "bg-white/5"
                    }`}
                  >
                    <Shield
                      className={`h-5 w-5 ${user?.is_2fa_enabled ? "text-[#5CF0B0]" : "text-white/30"}`}
                    />
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-white">Two-factor authentication</p>
                    <p className="text-[13px] text-white/40 mt-0.5">
                      Add a second layer of security to your account using a TOTP authenticator app.
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-lg ${
                          user?.is_2fa_enabled
                            ? "bg-[#5CF0B0]/10 text-[#5CF0B0]"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {user?.is_2fa_enabled ? (
                          <><Check className="h-3 w-3" /> Enabled</>
                        ) : (
                          <><AlertTriangle className="h-3 w-3" /> Disabled</>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() =>
                    user?.is_2fa_enabled ? disable2FA.mutate() : enable2FA.mutate()
                  }
                  disabled={enable2FA.isPending || disable2FA.isPending}
                  className={`shrink-0 text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-40 ${
                    user?.is_2fa_enabled
                      ? "bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400"
                      : "bg-[#7C5CFC] hover:bg-[#6B4EE6] text-white hover:shadow-[0_0_20px_rgba(124,92,252,0.4)]"
                  }`}
                >
                  {user?.is_2fa_enabled ? "Disable 2FA" : "Enable 2FA"}
                </button>
              </div>
            </div>

            {/* Info note */}
            <div className="rounded-xl bg-[#7C5CFC]/10 border border-[#7C5CFC]/20 px-4 py-3 text-[13px] text-white/60">
              We recommend enabling 2FA. It protects your account even if your password is compromised.
            </div>
          </div>
        )}
      </AnimatedPanel>
    </div>
  );
}

function AnimatedPanel({ children, key: _ }: { children: React.ReactNode; key?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl bg-white/4 border border-white/[0.07] p-7"
    >
      {children}
    </motion.div>
  );
}