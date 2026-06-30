"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Mail, Lock, Check } from "lucide-react";
import api from "@/lib/axios"; // your axios instance
import axios from "axios";

export default function RegisterPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const password = form.password;
  const strength = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const strengthCount = strength.filter(Boolean).length;
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strengthCount];
  const strengthColor = ["", "#FC5C7D", "#FCA75C", "#5CC8F0", "#5CF0B0"][strengthCount];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic client-side validation
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      // Send registration request
      const response = await api.post("/auth/register/", {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        password: form.password,
        password2: form.confirm,
      });
      console.log(response)

      // Registration successful – you can either:
      // 1. Automatically log them in (if backend returns tokens or sets cookies)
      //    In your current backend, registration doesn't auto-login; it only creates the user.
      //    So we can redirect to login page with a success query.
      // 2. Or call the login endpoint to get tokens, then redirect.
      // Let's redirect to login with a message.
      router.push("/login?registered=true");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data;
    
        if (data && typeof data === "object") {
          const messages = Object.entries(data)
            .map(([, value]) =>
              Array.isArray(value) ? value.join(" ") : String(value)
            )
            .join(" | ");
    
          setError(messages || "Registration failed. Please try again.");
        } else {
          setError("Registration failed. Please try again.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex">
      {/* Left panel — branding (unchanged) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#7C5CFC]/25 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#FC5C7D]/20 rounded-full blur-[100px] pointer-events-none translate-x-1/3 translate-y-1/3" />

        {/* Logo */}
        <div className="relative font-display text-2xl font-black tracking-tight">
          Digi<span className="text-[#7C5CFC]">Bank</span>
        </div>

        {/* Center content */}
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-[12px] font-medium text-white/60 px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5CF0B0] animate-pulse" />
            Trusted by 2.4M+ people worldwide
          </div>
          <h2 className="font-display text-[44px] font-black tracking-tight leading-[1.0] mb-5">
            Your money,<br />
            <span className="bg-gradient-to-r from-[#7C5CFC] via-[#FC5C7D] to-[#FCA75C] bg-clip-text text-transparent">
              beautifully managed.
            </span>
          </h2>
          <p className="text-[14px] text-white/50 leading-relaxed max-w-xs">
            Join millions who trust DigiBank for instant transfers, virtual cards, and AI-powered savings.
          </p>

          {/* Feature pills */}
          <div className="mt-8 flex flex-col gap-3">
            {[
              { label: "Zero fees on global transfers", color: "#5CF0B0" },
              { label: "Virtual cards in one tap", color: "#7C5CFC" },
              { label: "AI savings that work while you sleep", color: "#FC5C7D" },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}20` }}>
                  <Check className="w-3 h-3" style={{ color }} />
                </div>
                <span className="text-[13px] text-white/60">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom card */}
        <div className="relative bg-white/4 border border-white/8 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-xl bg-[#7C5CFC]/20 flex items-center justify-center text-[11px] font-bold text-[#7C5CFC] font-display">
              SK
            </div>
            <div>
              <p className="text-[13px] font-semibold">Sarah K.</p>
              <p className="text-[11px] text-white/40">Startup founder</p>
            </div>
          </div>
          <p className="text-[12.5px] text-white/55 leading-relaxed italic">
          &quot;Setup took 2 minutes. Now I save hours every month on expense tracking.&quot;
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#7C5CFC]/10 rounded-full blur-[80px] pointer-events-none translate-x-1/2 -translate-y-1/2" />

        <div className="w-full max-w-sm relative">
          {/* Mobile logo */}
          <div className="lg:hidden font-display text-xl font-black tracking-tight mb-8">
            Digi<span className="text-[#7C5CFC]">Bank</span>
          </div>

          <div className="mb-8">
            <h1 className="font-display text-[32px] font-black tracking-tight mb-1">Create account</h1>
            <p className="text-[13px] text-white/45">Start your free account — no card required.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name + Last Name (two inputs) */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[12px] font-medium text-white/50 mb-1.5">First name</label>
                <input
                  type="text"
                  placeholder="Alex"
                  value={form.first_name}
                  onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                  required
                  className="w-full bg-white/4 border border-white/8 hover:border-white/[0.14] focus:border-[#7C5CFC]/60 focus:bg-white/6 outline-none text-[13px] text-white placeholder:text-white/20 px-4 py-3 rounded-xl transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-white/50 mb-1.5">Last name</label>
                <input
                  type="text"
                  placeholder="Morgan"
                  value={form.last_name}
                  onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                  required
                  className="w-full bg-white/4 border border-white/8 hover:border-white/[0.14] focus:border-[#7C5CFC]/60 focus:bg-white/6 outline-none text-[13px] text-white placeholder:text-white/20 px-4 py-3 rounded-xl transition-all duration-200"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[12px] font-medium text-white/50 mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full bg-white/4 border border-white/8 hover:border-white/[0.14] focus:border-[#7C5CFC]/60 focus:bg-white/6 outline-none text-[13px] text-white placeholder:text-white/20 pl-10 pr-4 py-3 rounded-xl transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[12px] font-medium text-white/50 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input
                  type={show ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  className="w-full bg-white/4 border border-white/8 hover:border-white/[0.14] focus:border-[#7C5CFC]/60 focus:bg-white/6 outline-none text-[13px] text-white placeholder:text-white/20 pl-10 pr-10 py-3 rounded-xl transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                >
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Strength bar */}
              {password.length > 0 && (
                <div className="mt-2.5 space-y-1.5">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: i < strengthCount ? strengthColor : "rgba(255,255,255,0.08)",
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] font-medium" style={{ color: strengthColor }}>
                    {strengthLabel} password
                  </p>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-[12px] font-medium text-white/50 mb-1.5">Confirm password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repeat password"
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  required
                  className={`w-full bg-white/4 border hover:border-white/[0.14] focus:bg-white/6 outline-none text-[13px] text-white placeholder:text-white/20 pl-10 pr-10 py-3 rounded-xl transition-all duration-200 ${
                    form.confirm.length > 0
                      ? form.confirm === form.password
                        ? "border-[#5CF0B0]/50 focus:border-[#5CF0B0]/70"
                        : "border-[#FC5C7D]/50 focus:border-[#FC5C7D]/70"
                      : "border-white/8 focus:border-[#7C5CFC]/60"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Confirm mismatch hint */}
              {form.confirm.length > 0 && form.confirm !== form.password && (
                <p className="text-[11px] text-[#FC5C7D] mt-1.5">Passwords do not match</p>
              )}
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-[#FC5C7D]/10 border border-[#FC5C7D]/30 rounded-xl p-3 text-[#FC5C7D] text-[13px]">
                {error}
              </div>
            )}

            {/* Terms */}
            <p className="text-[11.5px] text-white/35 leading-relaxed">
              By creating an account you agree to our{" "}
              <Link href="/terms" className="text-[#7C5CFC] hover:text-[#9C7CFE] transition-colors">Terms of Service</Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#7C5CFC] hover:text-[#9C7CFE] transition-colors">Privacy Policy</Link>.
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full flex items-center justify-center gap-2 bg-[#7C5CFC] hover:bg-[#6B4EE6] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[14px] font-semibold py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(124,92,252,0.55)] active:scale-95 mt-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-[13px] text-white/40 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[#7C5CFC] hover:text-[#9C7CFE] font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}