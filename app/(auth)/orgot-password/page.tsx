"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import Link from "next/link";

const schema = z.object({ email: z.string().email() });

export default function ForgotPasswordPage() {
  const form = useForm({ resolver: zodResolver(schema) });
  const mutation = useMutation({
    mutationFn: (email: string) => api.post("/auth/forgot-password/", { email }),
    onSuccess: () => alert("If the email exists, a reset link was sent."),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
      <div className="glass-card w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Forgot Password</h1>
        </div>
        <form onSubmit={form.handleSubmit((data) => mutation.mutate(data.email))} className="space-y-4">
          <Input placeholder="Email" {...form.register("email")} />
          <Button type="submit" className="w-full">Send Reset Link</Button>
        </form>
        <div className="text-center text-sm">
          <Link href="/login" className="text-primary hover:underline">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}