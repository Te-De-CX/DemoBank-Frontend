"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Shield, FileText } from "lucide-react";

const SECTIONS = [
  {
    title: "Acceptance of terms",
    body: "By accessing or using DigiBank's services, you confirm that you are at least 18 years old and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.",
  },
  {
    title: "Account responsibilities",
    body: "You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Notify us immediately at support@digibank.com if you suspect unauthorised access.",
  },
  {
    title: "Permitted use",
    body: "DigiBank is provided for lawful personal and business banking purposes only. You may not use the platform to conduct fraudulent transactions, launder money, or violate any applicable laws or regulations.",
  },
  {
    title: "Fees and charges",
    body: "Certain services may carry fees as disclosed in our Pricing section. We reserve the right to modify fees with reasonable prior notice. Continued use of the service after a fee change constitutes acceptance.",
  },
  {
    title: "Limitation of liability",
    body: "To the maximum extent permitted by law, DigiBank shall not be liable for indirect, incidental, or consequential damages arising from your use of our services. Our total liability shall not exceed the amounts paid by you in the preceding 12 months.",
  },
  {
    title: "Termination",
    body: "We reserve the right to suspend or terminate your account at any time for violation of these terms or for any conduct we deem harmful to other users or the platform. You may close your account at any time by contacting support.",
  },
  {
    title: "Governing law",
    body: "These Terms are governed by the laws of the Federal Republic of Nigeria and any applicable international banking regulations. Disputes shall be resolved through binding arbitration before being escalated to courts of competent jurisdiction.",
  },
  {
    title: "Changes to terms",
    body: "We may update these Terms from time to time. We will notify you via email or an in-app notification at least 14 days before material changes take effect. Your continued use constitutes agreement to the revised Terms.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
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
      <section className="relative max-w-3xl mx-auto px-6 pt-20 pb-12 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#7C5CFC]/15 rounded-full blur-[100px] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-[12px] font-medium text-white/60 px-4 py-1.5 rounded-full mb-6">
            <FileText className="w-3.5 h-3.5 text-[#7C5CFC]" />
            Last updated — January 2026
          </div>
          <h1 className="font-display text-[52px] sm:text-[64px] font-black tracking-tighter leading-[0.95] mb-5">
            Terms of{" "}
            <span className="bg-gradient-to-r from-[#7C5CFC] via-[#FC5C7D] to-[#FCA75C] bg-clip-text text-transparent">
              Service
            </span>
          </h1>
          <p className="text-[15px] text-white/45 max-w-md mx-auto leading-relaxed">
            Please read these terms carefully before using DigiBank. They outline your rights and our responsibilities.
          </p>
        </motion.div>
      </section>

      {/* Notice card */}
      <div className="max-w-3xl mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-start gap-4 rounded-2xl bg-[#7C5CFC]/10 border border-[#7C5CFC]/25 px-6 py-5"
        >
          <Shield className="h-5 w-5 text-[#7C5CFC] shrink-0 mt-0.5" />
          <p className="text-[13px] text-white/60 leading-relaxed">
            By creating a DigiBank account or continuing to use our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
        </motion.div>
      </div>

      {/* Sections */}
      <main className="max-w-3xl mx-auto px-6 pb-24 space-y-4">
        {SECTIONS.map(({ title, body }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * i + 0.15 }}
            className="rounded-2xl bg-white/3 hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/[0.1] px-7 py-6 transition-colors duration-200"
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-7 h-7 rounded-lg bg-[#7C5CFC]/15 flex items-center justify-center mt-0.5">
                <span className="text-[11px] font-black text-[#7C5CFC]">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <h2 className="font-display text-[17px] font-black text-white mb-2">{title}</h2>
                <p className="text-[14px] text-white/50 leading-relaxed">{body}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </main>

      {/* Footer strip */}
      <div className="border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/25">© 2026 DigiBank. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-[12px] text-white/40 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="text-[12px] text-white/40 hover:text-white transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}