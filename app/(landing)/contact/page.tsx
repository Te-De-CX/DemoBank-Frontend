"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  MessageSquare,
  Clock,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const CHANNELS = [
  {
    icon: Mail,
    color: "#7C5CFC",
    bg: "rgba(124,92,252,0.12)",
    label: "Email support",
    value: "support@digibank.com",
    hint: "We reply within 4 hours on weekdays",
    href: "mailto:support@digibank.com",
  },
  {
    icon: MessageSquare,
    color: "#5CF0B0",
    bg: "rgba(92,240,176,0.12)",
    label: "Live chat",
    value: "Available in-app",
    hint: "Mon – Fri, 8 AM – 10 PM WAT",
    href: "/dashboard",
  },
  {
    icon: Clock,
    color: "#FCA75C",
    bg: "rgba(252,167,92,0.12)",
    label: "Priority support",
    value: "DigiBank Plus & Business",
    hint: "24/7 dedicated line for paid plans",
    href: "/register",
  },
];

const FAQS = [
  {
    q: "How do I reset my password?",
    a: "Go to the login page and click Forgot password. You,ll receive a reset link at your registered email address within a minute.",
  },
  {
    q: "How long do transfers take?",
    a: "DigiBank-to-DigiBank transfers are instant. International transfers typically settle within 1–2 business days depending on the destination country.",
  },
  {
    q: "Is my money insured?",
    a: "Yes. Deposits held with DigiBank are insured up to the regulatory limit under applicable deposit protection schemes in each jurisdiction we operate.",
  },
  {
    q: "How do I report a suspicious transaction?",
    a: "Tap the transaction in your app and select Report an issue, or email fraud@digibank.com immediately. We'll freeze the transaction and investigate within 2 hours.",
  },
  {
    q: "Can I use DigiBank outside my home country?",
    a: "Absolutely. DigiBank works in 180+ countries with zero foreign transaction fees. Your card is accepted anywhere Visa is supported.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen((o) => !o)}
      className="w-full text-left rounded-2xl bg-white/3 hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/[0.1] px-6 py-5 transition-all duration-200"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-[14px] font-semibold text-white">{q}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-[#7C5CFC] shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-white/30 shrink-0" />
        )}
      </div>
      {open && (
        <p className="text-[13px] text-white/50 mt-3 leading-relaxed border-t border-white/[0.06] pt-3">
          {a}
        </p>
      )}
    </button>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white overflow-x-hidden">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0A0A0F]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="font-display text-xl font-black tracking-tight">
            Digi<span className="text-[#7C5CFC]">Bank</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-[13px] font-medium text-white/50 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" /> Back home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#7C5CFC]/15 rounded-full blur-[100px] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-[12px] font-medium text-white/60 px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5CF0B0] animate-pulse" />
            Average response time — under 4 hours
          </div>
          <h1 className="font-display text-[52px] sm:text-[72px] font-black tracking-tighter leading-[0.93] mb-5">
            We're here to{" "}
            <span className="bg-gradient-to-r from-[#7C5CFC] via-[#FC5C7D] to-[#FCA75C] bg-clip-text text-transparent">
              help.
            </span>
          </h1>
          <p className="text-[15px] text-white/45 max-w-md mx-auto leading-relaxed">
            Got a question, a problem, or just want to say hi? Pick a channel and we'll get back to you fast.
          </p>
        </motion.div>
      </section>

      {/* Contact channels */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="grid sm:grid-cols-3 gap-4">
          {CHANNELS.map(({ icon: Icon, color, bg, label, value, hint, href }, i) => (
            <motion.a
              key={label}
              href={href}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.07 * i }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group rounded-2xl bg-white/3 hover:bg-white/6 border border-white/[0.06] hover:border-white/[0.12] p-6 transition-all duration-200"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-110"
                style={{ backgroundColor: bg }}
              >
                <Icon className="h-5 w-5" style={{ color }} />
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-white/35 mb-1">{label}</p>
              <p className="text-[15px] font-bold text-white mb-1">{value}</p>
              <p className="text-[12px] text-white/40">{hint}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Form + FAQ row */}
      <section className="max-w-6xl mx-auto px-6 mb-24 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl bg-white/4 border border-white/[0.07] p-8"
        >
          <p className="text-[11px] font-semibold text-[#7C5CFC] uppercase tracking-widest mb-2">Send a message</p>
          <h2 className="font-display text-[28px] font-black tracking-tight text-white mb-7">
            Get in touch directly.
          </h2>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-10 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 280, delay: 0.1 }}
                className="w-14 h-14 rounded-2xl bg-[#5CF0B0]/15 flex items-center justify-center mb-4"
              >
                <Check className="h-7 w-7 text-[#5CF0B0]" />
              </motion.div>
              <p className="font-display text-[22px] font-black text-white mb-2">Message sent!</p>
              <p className="text-[13px] text-white/45 max-w-xs leading-relaxed">
                We got it. Expect a reply at {form.email} within 4 hours on weekdays.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                className="mt-6 text-[13px] font-semibold text-[#7C5CFC] hover:text-white/60 transition-colors"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FieldInput
                  label="Your name"
                  placeholder="Alex Morgan"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                <FieldInput
                  label="Email"
                  type="email"
                  placeholder="alex@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <FieldInput
                label="Subject"
                placeholder="What's this about?"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                required
              />
              <div className="space-y-1.5">
                <label className="block text-[12px] font-semibold text-white/40 uppercase tracking-widest">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us what's on your mind…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-white/20 focus:border-[#7C5CFC]/60 focus:bg-white/[0.07] outline-none transition-all duration-200 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full group flex items-center justify-center gap-2 bg-[#7C5CFC] hover:bg-[#6B4EE6] text-white text-[14px] font-bold py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(124,92,252,0.5)] active:scale-95 disabled:opacity-50 disabled:pointer-events-none mt-2"
              >
                {sending ? "Sending…" : (
                  <>Send message <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></>
                )}
              </button>
            </form>
          )}
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          <p className="text-[11px] font-semibold text-[#7C5CFC] uppercase tracking-widest mb-2">FAQs</p>
          <h2 className="font-display text-[28px] font-black tracking-tight text-white mb-7">
            Quick answers.
          </h2>
          <div className="space-y-2">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} {...faq} />
            ))}
          </div>

          {/* Social row */}
          <div className="mt-8 pt-7 border-t border-white/[0.06]">
            <p className="text-[12px] text-white/35 uppercase tracking-widest mb-4">Follow us</p>
            <div className="flex items-center gap-3">
              {[
                { icon: Mail, href: "https://twitter.com/digibank", label: "Twitter" },
                { icon: Mail, href: "https://instagram.com/digibank", label: "Instagram" },
                { icon: Mail, href: "https://linkedin.com/company/digibank", label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#7C5CFC]/20 border border-white/[0.07] hover:border-[#7C5CFC]/40 flex items-center justify-center text-white/40 hover:text-[#7C5CFC] transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer strip */}
      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/25">© 2026 DigiBank. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="text-[12px] text-white/40 hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="text-[12px] text-white/40 hover:text-white transition-colors">Privacy</Link>
            <Link href="/about" className="text-[12px] text-white/40 hover:text-white transition-colors">About</Link>
          </div>
        </div>
      </div>
    </div>
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