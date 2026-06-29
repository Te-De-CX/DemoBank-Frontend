"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Zap, CreditCard, TrendingUp, Bell, Globe, ChevronRight, Star } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white overflow-x-hidden">

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0A0A0F]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          <div className="font-display text-xl font-black tracking-tight">
            Digi<span className="text-[#7C5CFC]">Bank</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {["About", "Contact", "Privacy", "Terms"].map((item) => (
              <Link
                key={item}
                href={`${item.toLowerCase()}`}
                className="text-[13px] text-white/50 hover:text-white transition-colors duration-200 font-medium"
              >
                {item}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login">
              <button className="text-[13px] font-medium text-white/60 hover:text-white px-3 sm:px-4 py-2 rounded-xl transition-colors duration-200">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="text-[13px] font-semibold bg-[#7C5CFC] hover:bg-[#6B4EE6] text-white px-4 sm:px-5 py-2.5 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-[0_0_24px_rgba(124,92,252,0.5)] active:scale-95">
                Get started
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 text-center relative">
        {/* Background glow blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[400px] bg-[#7C5CFC]/20 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-[120px] sm:w-[200px] h-[120px] sm:h-[200px] bg-[#FC5C7D]/15 rounded-full blur-[60px] sm:blur-[80px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-[12px] font-medium text-white/70 px-4 py-1.5 rounded-full mb-6 sm:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5CF0B0] animate-pulse" />
            Now with AI-powered spending insights
          </div>

          <h1 className="font-display text-[44px] sm:text-[64px] md:text-[80px] font-black leading-[0.95] tracking-tighter mb-5 sm:mb-6">
            Banking that's{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-[#7C5CFC] via-[#FC5C7D] to-[#FCA75C] bg-clip-text text-transparent">
                actually
              </span>
            </span>
            <br />
            beautiful.
          </h1>

          <p className="text-[14px] sm:text-[15px] text-white/50 max-w-md mx-auto leading-relaxed mb-8 sm:mb-10">
            Real-time updates, virtual cards, and AI savings — all in one strikingly simple app.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/register">
              <button className="group flex items-center gap-2 bg-[#7C5CFC] hover:bg-[#6B4EE6] text-white text-[14px] font-semibold px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-[0_0_32px_rgba(124,92,252,0.6)] active:scale-95">
                Open an account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
            <Link href="#features">
              <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 text-[14px] font-medium px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95">
                See how it works
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Hero card mockup */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mt-16 sm:mt-20 max-w-sm sm:max-w-lg mx-auto px-4 sm:px-0"
        >
          <div className="bg-gradient-to-br from-[#7C5CFC] via-[#9C7CFE] to-[#FC5C7D] rounded-3xl p-5 sm:p-6 shadow-[0_40px_80px_rgba(124,92,252,0.4)]">
            <div className="flex justify-between items-start mb-6 sm:mb-8">
              <div>
                <p className="text-white/60 text-[11px] uppercase tracking-widest mb-1">Total balance</p>
                <p className="font-display text-3xl sm:text-4xl font-black tracking-tight">$24,819.40</p>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-xl px-3 py-1.5 text-[12px] font-medium flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                +8.4%
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-white/50 text-[10px] uppercase tracking-wider mb-0.5">Card holder</p>
                <p className="font-medium text-[13px]">Alex Morgan</p>
              </div>
              <div className="text-right">
                <p className="text-white/50 text-[10px] uppercase tracking-wider mb-0.5">Expires</p>
                <p className="font-medium text-[13px]">08 / 29</p>
              </div>
              <p className="font-mono text-[13px] text-white/70">•••• 4291</p>
            </div>
          </div>

          {/* Floating notifications — hidden on very small screens, tucked in on sm */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="hidden sm:flex absolute -right-4 md:-right-8 top-6 bg-[#141420] border border-white/10 rounded-2xl p-3 sm:p-3.5 items-center gap-3 shadow-xl"
          >
            <div className="w-9 h-9 rounded-xl bg-[#5CF0B0]/15 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-[#5CF0B0]" />
            </div>
            <div>
              <p className="text-[11px] font-semibold whitespace-nowrap">Payment received</p>
              <p className="text-[10px] text-white/40 whitespace-nowrap">+ $1,250.00 · just now</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="hidden sm:flex absolute -left-4 md:-left-8 bottom-6 bg-[#141420] border border-white/10 rounded-2xl p-3 sm:p-3.5 items-center gap-3 shadow-xl"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FC5C7D]/15 flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-[#FC5C7D]" />
            </div>
            <div>
              <p className="text-[11px] font-semibold whitespace-nowrap">Fraud blocked</p>
              <p className="text-[10px] text-white/40 whitespace-nowrap">$840 attempt stopped</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {[
            { num: "2.4M+", label: "Active users" },
            { num: "$18B", label: "Processed monthly" },
            { num: "99.99%", label: "Uptime SLA" },
          ].map(({ num, label }) => (
            <div key={label} className="bg-[#0A0A0F] py-6 sm:py-8 text-center px-2">
              <p className="font-display text-xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-[#7C5CFC] to-[#FC5C7D] bg-clip-text text-transparent">
                {num}
              </p>
              <p className="text-[10px] sm:text-[12px] text-white/40 mt-1 uppercase tracking-widest leading-tight">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="mb-10 sm:mb-14 max-w-lg">
          <p className="text-[11px] font-semibold text-[#7C5CFC] uppercase tracking-widest mb-3">Features</p>
          <h2 className="font-display text-[30px] sm:text-[40px] font-black tracking-tight leading-tight mb-4">
            Everything you need,<br />nothing you don't.
          </h2>
          <p className="text-[14px] text-white/50 leading-relaxed">
            Built for speed and simplicity. Tools to manage, move, and grow your money — beautifully.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {[
            { icon: Zap, label: "Instant transfers", desc: "Send money to anyone in seconds. No delays, no hidden fees.", color: "#FCA75C", bg: "rgba(252,167,92,0.1)" },
            { icon: Shield, label: "Bank-level security", desc: "Advanced encryption, biometric auth, and real-time fraud detection.", color: "#FC5C7D", bg: "rgba(252,92,125,0.1)" },
            { icon: CreditCard, label: "Virtual cards", desc: "Generate disposable cards for online shopping in one tap.", color: "#7C5CFC", bg: "rgba(124,92,252,0.1)" },
            { icon: TrendingUp, label: "Smart savings", desc: "AI-powered round-ups and savings goals that work while you sleep.", color: "#5CF0B0", bg: "rgba(92,240,176,0.1)" },
            { icon: Bell, label: "Instant alerts", desc: "Push notifications for every transaction before it even settles.", color: "#FC5C7D", bg: "rgba(252,92,125,0.1)" },
            { icon: Globe, label: "Global spending", desc: "Zero foreign transaction fees in 180+ countries. Always.", color: "#5CC8F0", bg: "rgba(92,200,240,0.1)" },
          ].map(({ icon: Icon, label, desc, color, bg }) => (
            <motion.div
              key={label}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group bg-white/3 hover:bg-white/6 border border-white/[0.06] hover:border-white/[0.12] rounded-2xl p-5 sm:p-6 cursor-pointer transition-colors duration-200"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 sm:mb-5"
                style={{ backgroundColor: bg }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <h3 className="font-display font-bold text-[15px] mb-2">{label}</h3>
              <p className="text-[13px] text-white/45 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-[11px] font-semibold text-[#7C5CFC] uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="font-display text-[30px] sm:text-[40px] font-black tracking-tight mb-4">Simple, honest pricing.</h2>
          <p className="text-[14px] text-white/50">No hidden fees. No surprises. Cancel any time.</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {[
            {
              tier: "Personal", price: "$0", period: "/mo",
              desc: "Perfect for getting started",
              features: ["1 virtual card", "Instant local transfers", "Basic spending insights", "2FA security"],
              accent: false,
            },
            {
              tier: "Plus", price: "$9", period: "/mo",
              desc: "For individuals who want more",
              features: ["5 virtual cards", "Global transfers", "AI savings goals", "Priority support"],
              accent: true,
              badge: "Most popular",
            },
            {
              tier: "Business", price: "$29", period: "/mo",
              desc: "Built for teams and founders",
              features: ["Unlimited virtual cards", "Team expense tracking", "API access", "Dedicated account manager"],
              accent: false,
            },
          ].map(({ tier, price, period, desc, features, accent, badge }) => (
            <div
              key={tier}
              className={`relative rounded-2xl p-6 sm:p-7 border transition-all duration-200 ${
                accent
                  ? "bg-gradient-to-b from-[#7C5CFC]/20 to-[#7C5CFC]/5 border-[#7C5CFC]/50 shadow-[0_0_40px_rgba(124,92,252,0.2)]"
                  : "bg-white/3 border-white/[0.06] hover:border-white/[0.12]"
              }`}
            >
              {badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#7C5CFC] text-white text-[11px] font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  {badge}
                </div>
              )}
              <p className="font-display font-black text-[14px] mb-1">{tier}</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="font-display text-[38px] sm:text-[42px] font-black tracking-tight leading-none">{price}</span>
                <span className="text-white/40 text-[14px] mb-1.5">{period}</span>
              </div>
              <p className="text-[12px] text-white/40 mb-6 sm:mb-7">{desc}</p>
              <ul className="space-y-3 mb-7 sm:mb-8">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[13px] text-white/70">
                    <div className="w-4 h-4 rounded-full bg-[#5CF0B0]/15 flex items-center justify-center flex-shrink-0">
                      <ChevronRight className="w-2.5 h-2.5 text-[#5CF0B0]" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-xl text-[13px] font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                  accent
                    ? "bg-[#7C5CFC] hover:bg-[#6B4EE6] text-white hover:shadow-[0_0_24px_rgba(124,92,252,0.5)]"
                    : "bg-white/5 hover:bg-white/10 border border-white/10 text-white/80"
                }`}
              >
                {tier === "Personal" ? "Get started free" : tier === "Business" ? "Contact sales" : "Start free trial"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-[11px] font-semibold text-[#7C5CFC] uppercase tracking-widest mb-3">Reviews</p>
          <h2 className="font-display text-[30px] sm:text-[40px] font-black tracking-tight mb-4">Loved by thousands.</h2>
          <p className="text-[14px] text-white/50">Real people. Real results.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { quote: "DigiBank changed how I manage money. The virtual cards alone are worth it — I never worry about fraud anymore.", name: "James K.", role: "Freelance designer", initials: "JK", color: "#7C5CFC" },
            { quote: "I moved my entire business banking here. The expense tracking saves us hours monthly and the UI is genuinely beautiful.", name: "Sarah O.", role: "Startup founder", initials: "SO", color: "#FC5C7D" },
            { quote: "Zero fees abroad and instant alerts — exactly what I needed for travelling. Setup took under 3 minutes.", name: "Marco T.", role: "Digital nomad", initials: "MT", color: "#FCA75C" },
            { quote: "The AI savings goals are sneaky-good. I saved $1,200 in 3 months without thinking about it.", name: "Amara L.", role: "Product manager", initials: "AL", color: "#5CF0B0" },
          ].map(({ quote, name, role, initials, color }) => (
            <motion.div
              key={name}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white/3 border border-white/[0.06] hover:border-white/[0.12] rounded-2xl p-6 sm:p-7 transition-colors duration-200"
            >
              <div className="flex gap-0.5 mb-4 sm:mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#FCA75C] text-[#FCA75C]" />
                ))}
              </div>
              <p className="text-[13.5px] text-white/60 leading-relaxed mb-5 sm:mb-6 italic">"{quote}"</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                  style={{ backgroundColor: `${color}20`, color }}
                >
                  {initials}
                </div>
                <div>
                  <p className="text-[13px] font-semibold">{name}</p>
                  <p className="text-[11px] text-white/40">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="relative bg-gradient-to-br from-[#7C5CFC] via-[#9C5CFC] to-[#FC5C7D] rounded-3xl px-6 sm:px-12 md:px-16 py-12 sm:py-16 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,#fff,transparent_60%)]" />
          <div className="relative">
            <h2 className="font-display text-[32px] sm:text-[40px] md:text-[48px] font-black tracking-tight leading-tight mb-4">
              Ready to bank smarter?
            </h2>
            <p className="text-white/70 text-[14px] sm:text-[15px] mb-8 sm:mb-10">
              Join 2.4 million people who've already made the switch.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link href="/register">
                <button className="group flex items-center gap-2 bg-white text-[#7C5CFC] text-[14px] font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95">
                  Open an account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
              <button className="text-[14px] font-medium text-white/80 hover:text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-200 hover:scale-105 active:scale-95">
                Talk to sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="font-display text-xl font-black tracking-tight mb-3">
              Digi<span className="text-[#7C5CFC]">Bank</span>
            </div>
            <p className="text-[12px] text-white/40 leading-relaxed max-w-[200px]">
              Modern banking for modern people. Fast, secure, and beautifully simple.
            </p>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "Security", "Changelog"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
            { title: "Legal", links: ["Privacy", "Terms", "Cookies", "Compliance"] },
          ].map(({ title, links }) => (
            <div key={title}>
              <p className="text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-4">{title}</p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-[13px] text-white/50 hover:text-white transition-colors duration-200">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
            <p className="text-[12px] text-white/30">© 2026 DigiBank. All rights reserved.</p>
            <p className="text-[12px] text-white/30">Made with ♥ for the future of finance.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}