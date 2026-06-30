"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations";
import { z } from "zod";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Mail, Lock, TrendingUp, CreditCard, Shield, KeyRound, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"; // <-- import toast

type LoginFormValues = z.infer<typeof loginSchema>;
export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const { toast } = useToast(); // <-- get the toast function

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [is2FA, setIs2FA] = useState(false);
  const [totp, setTotp] = useState("");

  type ApiError = {
    response?: {
      data?: {
        error?: string;
      };
    };
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log("Submitting login...");
    console.log(data);
  
    try {
      const response = await login(
        data.email,
        data.password,
        totp || undefined
      );
  
      console.log("Login response:");
      console.log(response);
  
      if (response?.require_2fa) {
        console.log("2FA required");
        setIs2FA(true);
      } else {
        console.log("Login successful");
  
        try {
          console.log("Fetching profile...");
  
          await useAuthStore.getState().fetchUser();
  
          console.log("Profile fetched!");
  
          const user = useAuthStore.getState().user;
  
          console.log("Current user:");
          console.log(user);
  
          if (!user?.phone) {
            console.log("Redirecting -> complete-profile");
            router.push("/complete-profile");
          } else {
            console.log("Redirecting -> dashboard");
            router.push("/dashboard");
          }
  
        } catch (err) {
          console.error("fetchUser failed");
          console.error(err);
        }
      }
  
    } catch (err) {
      console.error("LOGIN FAILED");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex">
      {/* ── Left branding panel (unchanged) ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#7C5CFC]/25 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#FC5C7D]/20 rounded-full blur-[100px] pointer-events-none translate-x-1/3 translate-y-1/3" />

        <div className="relative font-display text-2xl font-black tracking-tight">
          Digi<span className="text-[#7C5CFC]">Bank</span>
        </div>

        <div className="relative">
          <h2 className="font-display text-[44px] font-black tracking-tight leading-[1.0] mb-5">
            Welcome back<br />
            <span className="bg-gradient-to-r from-[#7C5CFC] via-[#FC5C7D] to-[#FCA75C] bg-clip-text text-transparent">
              to the future.
            </span>
          </h2>
          <p className="text-[14px] text-white/50 leading-relaxed max-w-xs mb-10">
            Your money is safe, your cards are ready, and your savings are growing — right where you left them.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: TrendingUp, label: "Portfolio growth", value: "+8.4%",    color: "#5CF0B0", bg: "rgba(92,240,176,0.1)"  },
              { icon: CreditCard, label: "Active cards",     value: "3 virtual", color: "#7C5CFC", bg: "rgba(124,92,252,0.1)" },
              { icon: Shield,     label: "Security score",   value: "Excellent", color: "#5CC8F0", bg: "rgba(92,200,240,0.1)"  },
              { icon: TrendingUp, label: "Saved this month", value: "$320.00",   color: "#FCA75C", bg: "rgba(252,167,92,0.1)" },
            ].map(({ icon: Icon, label, value, color, bg }) => (
              <div key={label} className="bg-white/4 border border-white/6 rounded-xl p-4">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: bg }}>
                  <Icon className="w-3.5 h-3.5" style={{ color }} />
                </div>
                <p className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">{label}</p>
                <p className="font-display text-[15px] font-bold">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative bg-white/4 border border-white/8 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#5CF0B0]/15 flex items-center justify-center flex-shrink-0">
            <Shield className="w-4 h-4 text-[#5CF0B0]" />
          </div>
          <div>
            <p className="text-[12px] font-semibold mb-0.5">Bank-grade encryption</p>
            <p className="text-[11px] text-white/40">256-bit SSL · Biometric auth · Real-time fraud detection</p>
          </div>
        </div>
      </div>

      {/* ── Right form panel (unchanged except removed serverError/totpError) ── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#7C5CFC]/10 rounded-full blur-[80px] pointer-events-none translate-x-1/2 -translate-y-1/2" />

        <div className="w-full max-w-sm relative">
          {/* Mobile logo */}
          <div className="lg:hidden font-display text-xl font-black tracking-tight mb-8">
            Digi<span className="text-[#7C5CFC]">Bank</span>
          </div>

          <div className="mb-8">
            {is2FA ? (
              <>
                <div className="w-11 h-11 rounded-2xl bg-[#7C5CFC]/15 flex items-center justify-center mb-4">
                  <KeyRound className="w-5 h-5 text-[#7C5CFC]" />
                </div>
                <h1 className="font-display text-[32px] font-black tracking-tight mb-1">Two-factor auth</h1>
                <p className="text-[13px] text-white/45">Enter the 6-digit code from your authenticator app.</p>
              </>
            ) : (
              <>
                <h1 className="font-display text-[32px] font-black tracking-tight mb-1">Sign in</h1>
                <p className="text-[13px] text-white/45">Good to have you back.</p>
              </>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {!is2FA && (
              <>
                {/* Email */}
                <div>
                  <label className="block text-[12px] font-medium text-white/50 mb-1.5">Email address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      {...register("email")}
                      className={`w-full bg-white/4 border hover:border-white/[0.14] focus:bg-white/6 outline-none text-[13px] text-white placeholder:text-white/20 pl-10 pr-4 py-3 rounded-xl transition-all duration-200 ${
                        errors.email
                          ? "border-[#FC5C7D]/60 focus:border-[#FC5C7D]/80"
                          : "border-white/8 focus:border-[#7C5CFC]/60"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="flex items-center gap-1.5 text-[11.5px] text-[#FC5C7D] mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[12px] font-medium text-white/50">Password</label>
                    <Link href="/forgot-password" className="text-[12px] text-[#7C5CFC] hover:text-[#9C7CFE] transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Your password"
                      autoComplete="current-password"
                      {...register("password")}
                      className={`w-full bg-white/4 border hover:border-white/[0.14] focus:bg-white/6 outline-none text-[13px] text-white placeholder:text-white/20 pl-10 pr-10 py-3 rounded-xl transition-all duration-200 ${
                        errors.password
                          ? "border-[#FC5C7D]/60 focus:border-[#FC5C7D]/80"
                          : "border-white/8 focus:border-[#7C5CFC]/60"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="flex items-center gap-1.5 text-[11.5px] text-[#FC5C7D] mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Remember me */}
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setRemember(!remember)}
                    aria-checked={remember}
                    role="checkbox"
                    className={`rounded-md border transition-all duration-200 flex items-center justify-center flex-shrink-0 ${
                      remember ? "bg-[#7C5CFC] border-[#7C5CFC]" : "bg-transparent border-white/20 hover:border-white/40"
                    }`}
                    style={{ width: 18, height: 18 }}
                  >
                    {remember && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
                        <polyline points="2,6 5,9 10,3" />
                      </svg>
                    )}
                  </button>
                  <span className="text-[12px] text-white/50 select-none cursor-pointer" onClick={() => setRemember(!remember)}>
                    Remember me for 30 days
                  </span>
                </div>

                {/* We removed the inline serverError box – now errors appear as toast */}
              </>
            )}

            {/* ── 2FA code field ── */}
            {is2FA && (
              <>
                <div>
                  <label className="block text-[12px] font-medium text-white/50 mb-1.5">Authenticator code</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="000000"
                    value={totp}
                    onChange={(e) => setTotp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="w-full bg-white/4 border border-white/8 hover:border-white/[0.14] focus:bg-white/6 outline-none text-[20px] font-display font-bold text-white placeholder:text-white/15 text-center tracking-[0.35em] py-3.5 rounded-xl transition-all duration-200 focus:border-[#7C5CFC]/60"
                    autoFocus
                  />
                </div>
                <button
                  type="button"
                  onClick={() => { setIs2FA(false); setTotp(""); }}
                  className="text-[12px] text-white/40 hover:text-white/70 transition-colors"
                >
                  ← Back to login
                </button>
              </>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || (is2FA && totp.length < 6)}
              className="group w-full flex items-center justify-center gap-2 bg-[#7C5CFC] hover:bg-[#6B4EE6] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none text-white text-[14px] font-semibold py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(124,92,252,0.55)] active:scale-95 mt-2"
            >
              {isSubmitting ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {is2FA ? "Verify code" : "Sign in"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>

            {/* Social login (only before 2FA) */}
            {!is2FA && (
              <>
                <div className="flex items-center gap-3 my-1">
                  <div className="flex-1 h-px bg-white/6" />
                  <span className="text-[11px] text-white/25">or continue with</span>
                  <div className="flex-1 h-px bg-white/6" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      label: "Google",
                      icon: (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                      ),
                    },
                    {
                      label: "Apple",
                      icon: (
                        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                        </svg>
                      ),
                    },
                  ].map(({ label, icon }) => (
                    <button
                      key={label}
                      type="button"
                      className="flex items-center justify-center gap-2.5 bg-white/4 hover:bg-white/8 border border-white/8 hover:border-white/[0.14] text-[13px] font-medium text-white/70 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95"
                    >
                      {icon}
                      {label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </form>

          <p className="text-center text-[13px] text-white/40 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#7C5CFC] hover:text-[#9C7CFE] font-medium transition-colors">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}