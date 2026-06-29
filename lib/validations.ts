import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  password2: z.string().min(8),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  phone: z.string().optional(),
}).refine((data) => data.password === data.password2, {
  message: "Passwords don't match",
  path: ["password2"],
});

export const transferSchema = z.object({
  source_account_id: z.number(),
  recipient_account: z.string().min(10),
  amount: z.number().positive(),
  description: z.string().optional(),
});

export const billPaymentSchema = z.object({
  bill_type: z.enum(["airtime", "internet", "utilities", "cable", "education"]),
  provider: z.string().min(1),
  customer_reference: z.string().min(1),
  amount: z.number().positive(),
});