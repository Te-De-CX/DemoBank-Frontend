// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { transferSchema } from "@/lib/validations";
// import { z } from "zod";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import api from "@/lib/axios";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, ... } from "@/components/ui/select"; // (simplified)
// import { useToast } from "@/components/ui/use-toast";

// type TransferFormValues = z.infer<typeof transferSchema>;

// export function TransferForm({ accounts }: { accounts: { id: number; account_number: string; balance: number }[] }) {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();
//   const form = useForm<TransferFormValues>({
//     resolver: zodResolver(transferSchema),
//   });

//   const transferMutation = useMutation({
//     mutationFn: (data: TransferFormValues) =>
//       api.post("/transactions/transfer/", data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["accounts"] });
//       queryClient.invalidateQueries({ queryKey: ["transactions"] });
//       toast({ title: "Transfer successful" });
//     },
//     onError: (error: any) => {
//       toast({ title: "Transfer failed", description: error.response?.data?.error, variant: "destructive" });
//     },
//   });

//   return (
//     <form onSubmit={form.handleSubmit((data) => transferMutation.mutate(data))} className="space-y-4">
//       {/* Select source account */}
//       <Select ... />
//       <Input placeholder="Recipient Account" {...form.register("recipient_account")} />
//       <Input type="number" step="0.01" placeholder="Amount" {...form.register("amount", { valueAsNumber: true })} />
//       <Input placeholder="Description (optional)" {...form.register("description")} />
//       <Button type="submit" disabled={transferMutation.isPending}>
//         Transfer
//       </Button>
//     </form>
//   );
// }