// "use client";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { loginSchema } from "@/lib/validations";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useAuthStore } from "@/store/auth-store";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// type LoginFormValues = z.infer<typeof loginSchema>;

// export function LoginForm() {
//   const router = useRouter();
//   const { login } = useAuthStore();
//   const [error, setError] = useState("");
//   const [is2FA, setIs2FA] = useState(false);
//   const [totp, setTotp] = useState("");

//   const form = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = async (data: LoginFormValues) => {
//     try {
//       const response = await login(data.email, data.password, totp);
//       if (response?.require_2fa) {
//         setIs2FA(true);
//       } else {
//         router.push("/dashboard");
//       }
//     } catch (err: any) {
//       setError(err.response?.data?.error || "Login failed");
//     }
//   };

//   return (
//     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//       <Input placeholder="Email" {...form.register("email")} />
//       {form.formState.errors.email && <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>}
//       <Input type="password" placeholder="Password" {...form.register("password")} />
//       {form.formState.errors.password && <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>}
//       {is2FA && (
//         <Input placeholder="2FA Code" value={totp} onChange={(e) => setTotp(e.target.value)} />
//       )}
//       {error && <p className="text-sm text-red-500">{error}</p>}
//       <Button type="submit" className="w-full">
//         {is2FA ? "Verify 2FA" : "Login"}
//       </Button>
//     </form>
//   );
// }