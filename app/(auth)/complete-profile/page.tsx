"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import api from "@/lib/axios";
import { ArrowRight, User, Phone, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const profileSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function CompleteProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      phone: user?.phone || "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const response = await api.put("/auth/profile/", data);
      setUser(response.data);
      toast({
        title: "Profile completed",
        description: "Welcome to your dashboard!",
      });
      router.push("/dashboard");
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.detail || "Failed to save profile",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-6">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#7C5CFC]/20 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#FC5C7D]/15 rounded-full blur-[100px] pointer-events-none translate-x-1/3 translate-y-1/3" />

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="font-display text-2xl font-black tracking-tight mb-2">
            Digi<span className="text-[#7C5CFC]">Bank</span>
          </div>
          <h1 className="font-display text-[32px] font-black tracking-tight">
            Complete your profile
          </h1>
          <p className="text-[13px] text-white/45 mt-1">
            We need a few more details before you get started.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-white/50 mb-1.5">First name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                <input
                  {...form.register("first_name")}
                  className="w-full bg-white/4 border border-white/[0.08] hover:border-white/[0.14] focus:border-[#7C5CFC]/60 focus:bg-white/[0.06] outline-none text-[13px] text-white placeholder:text-white/20 pl-10 pr-4 py-3 rounded-xl transition-all duration-200"
                />
              </div>
              {form.formState.errors.first_name && (
                <p className="text-[11px] text-[#FC5C7D] mt-1">{form.formState.errors.first_name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-[12px] font-medium text-white/50 mb-1.5">Last name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                <input
                  {...form.register("last_name")}
                  className="w-full bg-white/4 border border-white/[0.08] hover:border-white/[0.14] focus:border-[#7C5CFC]/60 focus:bg-white/[0.06] outline-none text-[13px] text-white placeholder:text-white/20 pl-10 pr-4 py-3 rounded-xl transition-all duration-200"
                />
              </div>
              {form.formState.errors.last_name && (
                <p className="text-[11px] text-[#FC5C7D] mt-1">{form.formState.errors.last_name.message}</p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[12px] font-medium text-white/50 mb-1.5">Phone number</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
              <input
                type="tel"
                placeholder="+1 555 123 4567"
                {...form.register("phone")}
                className="w-full bg-white/4 border border-white/[0.08] hover:border-white/[0.14] focus:border-[#7C5CFC]/60 focus:bg-white/[0.06] outline-none text-[13px] text-white placeholder:text-white/20 pl-10 pr-4 py-3 rounded-xl transition-all duration-200"
              />
            </div>
            {form.formState.errors.phone && (
              <p className="text-[11px] text-[#FC5C7D] mt-1">{form.formState.errors.phone.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="group w-full flex items-center justify-center gap-2 bg-[#7C5CFC] hover:bg-[#6B4EE6] disabled:opacity-50 disabled:cursor-not-allowed text-white text-[14px] font-semibold py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(124,92,252,0.55)] active:scale-95 mt-2"
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Continue to dashboard
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}