"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Zap, Shield, Globe, TrendingUp, Heart, Users } from "lucide-react";

const VALUES = [
  {
    icon: Shield,
    color: "#FC5C7D",
    bg: "rgba(252,92,125,0.12)",
    title: "Security-first",
    desc: "Every feature is built with your safety as the foundation, not an afterthought.",
  },
  {
    icon: Zap,
    color: "#FCA75C",
    bg: "rgba(252,167,92,0.12)",
    title: "Radically fast",
    desc: "Transfers, payments, and decisions happen in seconds — not business days.",
  },
  {
    icon: Globe,
    color: "#5CC8F0",
    bg: "rgba(92,200,240,0.12)",
    title: "Borderless",
    desc: "We believe money should move as freely as ideas. Zero fees in 180+ countries.",
  },
  {
    icon: Heart,
    color: "#FC5C7D",
    bg: "rgba(252,92,125,0.12)",
    title: "Human-centred",
    desc: "Banking language stripped of jargon. Designed for people, not accountants.",
  },
  {
    icon: TrendingUp,
    color: "#5CF0B0",
    bg: "rgba(92,240,176,0.12)",
    title: "Built to grow",
    desc: "From your first deposit to your first million, DigiBank scales with your ambitions.",
  },
  {
    icon: Users,
    color: "#7C5CFC",
    bg: "rgba(124,92,252,0.12)",
    title: "Community-driven",
    desc: "Shaped by the 2.4 million people who use it every day and aren't shy about feedback.",
  },
];

const MILESTONES = [
  { year: "2021", label: "Founded in Lagos with a team of 5." },
  { year: "2022", label: "Launched in beta. 10,000 accounts in 3 months." },
  { year: "2023", label: "Series A — $18M raised. Expanded to East Africa." },
  { year: "2024", label: "Crossed 1 million users. Launched virtual cards." },
  { year: "2025", label: "Global expansion. 180+ countries. AI savings launched." },
  { year: "2026", label: "2.4M users. $18B processed monthly." },
];

const TEAM = [
  { initials: "AO", name: "Adaeze Obi", role: "CEO & Co-founder", color: "#7C5CFC" },
  { initials: "TM", name: "Tunde Mensah", role: "CTO & Co-founder", color: "#FC5C7D" },
  { initials: "SK", name: "Sara Kamau", role: "Head of Design", color: "#5CF0B0" },
  { initials: "EJ", name: "Emeka Jones", role: "Head of Security", color: "#FCA75C" },
];

export default function AboutPage() {
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
      <section className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#7C5CFC]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-16 left-1/4 w-[180px] h-[180px] bg-[#FC5C7D]/15 rounded-full blur-[80px] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-[12px] font-medium text-white/60 px-4 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5CF0B0] animate-pulse" />
            Founded 2021 · Lagos, Nigeria
          </div>
          <h1 className="font-display text-[56px] sm:text-[80px] font-black tracking-tighter leading-[0.92] mb-7">
            We&apos;re reimagining
            <br />
            <span className="bg-gradient-to-r from-[#7C5CFC] via-[#FC5C7D] to-[#FCA75C] bg-clip-text text-transparent">
              what banking
            </span>
            <br />
            can feel like.
          </h1>
          <p className="text-[16px] text-white/45 max-w-xl mx-auto leading-relaxed mb-10">
            DigiBank was born from a simple frustration — banking felt slow, ugly, and designed for institutions rather than people. We set out to fix that.
          </p>
          <Link href="/register">
            <button className="group inline-flex items-center gap-2 bg-[#7C5CFC] hover:bg-[#6B4EE6] text-white text-[14px] font-semibold px-7 py-3.5 rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-[0_0_32px_rgba(124,92,252,0.6)] active:scale-95">
              Join 2.4M users
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {[
            { num: "2.4M+", label: "Active users" },
            { num: "$18B", label: "Processed monthly" },
            { num: "180+", label: "Countries served" },
          ].map(({ num, label }) => (
            <div key={label} className="bg-[#0A0A0F] py-8 text-center">
              <p className="font-display text-[30px] sm:text-[36px] font-black tracking-tight bg-gradient-to-r from-[#7C5CFC] to-[#FC5C7D] bg-clip-text text-transparent">
                {num}
              </p>
              <p className="text-[11px] text-white/35 mt-1 uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="mb-12">
          <p className="text-[11px] font-semibold text-[#7C5CFC] uppercase tracking-widest mb-3">Our values</p>
          <h2 className="font-display text-[40px] font-black tracking-tight leading-tight">
            What we stand for.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {VALUES.map(({ icon: Icon, color, bg, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * i }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group rounded-2xl bg-white/3 hover:bg-white/6 border border-white/6 hover:border-white/[0.12] p-6 transition-all duration-200"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-110"
                style={{ backgroundColor: bg }}
              >
                <Icon className="h-5 w-5" style={{ color }} />
              </div>
              <h3 className="font-display font-black text-[16px] text-white mb-2">{title}</h3>
              <p className="text-[13px] text-white/45 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-3xl mx-auto px-6 mb-24">
        <div className="mb-12 text-center">
          <p className="text-[11px] font-semibold text-[#7C5CFC] uppercase tracking-widest mb-3">History</p>
          <h2 className="font-display text-[40px] font-black tracking-tight">How we got here.</h2>
        </div>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[28px] top-0 bottom-0 w-px bg-white/[0.07]" />
          <div className="space-y-2">
            {MILESTONES.map(({ year, label }, i) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.07 * i }}
                className="flex items-start gap-5"
              >
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#7C5CFC]/10 border border-[#7C5CFC]/20 flex items-center justify-center relative z-10">
                  <span className="font-display text-[11px] font-black text-[#7C5CFC]">{year}</span>
                </div>
                <div className="flex-1 bg-white/3 hover:bg-white/[0.05] border border-white/6 rounded-2xl px-5 py-4 transition-colors duration-200 mt-1">
                  <p className="text-[14px] text-white/70 leading-relaxed">{label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="mb-12 text-center">
          <p className="text-[11px] font-semibold text-[#7C5CFC] uppercase tracking-widest mb-3">The team</p>
          <h2 className="font-display text-[40px] font-black tracking-tight">Built by believers.</h2>
          <p className="text-[14px] text-white/45 mt-3 max-w-md mx-auto">
            A small team with big conviction — that great banking should be available to everyone.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TEAM.map(({ initials, name, role, color }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i }}
              whileHover={{ y: -4 }}
              className="rounded-2xl bg-white/3 hover:bg-white/6 border border-white/6 hover:border-white/[0.12] p-6 text-center transition-all duration-200"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-[18px] font-black mx-auto mb-4"
                style={{ backgroundColor: `${color}20`, color }}
              >
                {initials}
              </div>
              <p className="text-[14px] font-bold text-white">{name}</p>
              <p className="text-[12px] text-white/40 mt-0.5">{role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="relative bg-gradient-to-br from-[#7C5CFC] via-[#9C5CFC] to-[#FC5C7D] rounded-3xl p-14 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,#fff,transparent_60%)]" />
          <div className="relative">
            <h2 className="font-display text-[40px] font-black tracking-tight leading-tight mb-4">
              Be part of the story.
            </h2>
            <p className="text-white/70 text-[15px] mb-8 max-w-sm mx-auto">
              Join millions who&apos;ve already made the switch to smarter banking.
            </p>
            <Link href="/register">
              <button className="group inline-flex items-center gap-2 bg-white text-[#7C5CFC] text-[14px] font-bold px-8 py-3.5 rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95">
                Open an account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/25">© 2026 DigiBank. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="text-[12px] text-white/40 hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="text-[12px] text-white/40 hover:text-white transition-colors">Privacy</Link>
            <Link href="/contact" className="text-[12px] text-white/40 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
}