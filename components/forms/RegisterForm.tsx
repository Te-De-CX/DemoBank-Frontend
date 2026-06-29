// "use client";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { registerSchema } from "@/lib/validations";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useMutation } from "@tanstack/react-query";
// import api from "@/lib/axios";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// type RegisterFormValues = z.infer<typeof registerSchema>;

// export function RegisterForm() {
//   const router = useRouter();
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   const form = useForm<RegisterFormValues>({
//     resolver: zodResolver(registerSchema),
//   });

//   const registerMutation = useMutation({
//     mutationFn: (data: RegisterFormValues) => api.post("/auth/register/", data),
//     onSuccess: () => {
//       setSuccess(true);
//       setTimeout(() => router.push("/login"), 3000);
//     },
//     onError: (err: any) => {
//       setError(err.response?.data?.error || "Registration failed");
//     },
//   });

//   return (
//     <form onSubmit={form.handleSubmit((data) => registerMutation.mutate(data))} className="space-y-4">
//       <div className="grid grid-cols-2 gap-4">
//         <Input placeholder="First Name" {...form.register("first_name")} />
//         <Input placeholder="Last Name" {...form.register("last_name")} />
//       </div>
//       <Input placeholder="Email" {...form.register("email")} />
//       <Input placeholder="Phone (optional)" {...form.register("phone")} />
//       <Input type="password" placeholder="Password" {...form.register("password")} />
//       <Input type="password" placeholder="Confirm Password" {...form.register("password2")} />
//       {error && <p className="text-sm text-red-500">{error}</p>}
//       {success && <p className="text-sm text-green-500">Registration successful! Redirecting...</p>}
//       <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
//         {registerMutation.isPending ? "Creating Account..." : "Sign Up"}
//       </Button>
//     </form>
//   );
// }