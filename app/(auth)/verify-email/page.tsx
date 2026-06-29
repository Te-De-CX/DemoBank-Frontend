"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Link from "next/link";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (token) {
      api
        .post("/auth/verify-email/", { token })
        .then(() => setStatus("success"))
        .catch(() => setStatus("error"));
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
      <div className="glass-card p-8 text-center">
        {status === "loading" && <p>Verifying your email...</p>}
        {status === "success" && (
          <>
            <h1 className="text-2xl font-bold text-green-500">Email Verified!</h1>
            <Link href="/login" className="text-primary hover:underline mt-4 block">Proceed to Login</Link>
          </>
        )}
        {status === "error" && (
          <>
            <h1 className="text-2xl font-bold text-red-500">Verification Failed</h1>
            <p className="text-muted-foreground">Invalid or expired token.</p>
            <Link href="/login" className="text-primary hover:underline mt-4 block">Go to Login</Link>
          </>
        )}
      </div>
    </div>
  );
}