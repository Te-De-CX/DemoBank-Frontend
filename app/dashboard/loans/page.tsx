// "use client";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import api from "@/lib/axios";
// import { LoanProduct, LoanApplication } from "@/types";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { SelectNative } from "@/components/ui/select";
// import { useState } from "react";
// import { useToast } from "@/components/ui/use-toast";
// import { formatCurrency } from "@/lib/utils";

// export default function LoansPage() {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();
//   const [selectedProduct, setSelectedProduct] = useState("");
//   const [amount, setAmount] = useState("");
//   const [months, setMonths] = useState("");
//   const [emi, setEmi] = useState<number | null>(null);

//   const { data: products } = useQuery<LoanProduct[]>({
//     queryKey: ["loan-products"],
//     queryFn: () => api.get("/loans/products/").then((r) => r.data),
//   });

//   const { data: applications } = useQuery<LoanApplication[]>({
//     queryKey: ["loan-applications"],
//     queryFn: () => api.get("/loans/applications/").then((r) => r.data),
//   });

//   const productOptions = products?.map(p => ({ value: p.id.toString(), label: p.name })) || [];

//   const calculateEMI = () => {
//     const product = products?.find(p => p.id.toString() === selectedProduct);
//     if (product && amount && months) {
//       const principal = parseFloat(amount);
//       const rate = product.interest_rate / 100 / 12;
//       const n = parseInt(months);
//       if (rate === 0) setEmi(principal / n);
//       else {
//         const emiVal = principal * rate * Math.pow(1 + rate, n) / (Math.pow(1 + rate, n) - 1);
//         setEmi(Math.round(emiVal * 100) / 100);
//       }
//     }
//   };

//   const applyMutation = useMutation({
//     mutationFn: () =>
//       api.post("/loans/applications/", {
//         product: parseInt(selectedProduct),
//         amount: parseFloat(amount),
//         duration_months: parseInt(months),
//       }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["loan-applications"] });
//       toast({ title: "Application submitted", variant: "success" });
//     },
//   });

//   return (
//     <div className="space-y-8">
//       <h1 className="text-3xl font-bold text-white">Loans</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="glass-card p-6">
//           <h2 className="text-xl font-semibold text-white mb-4">Available Products</h2>
//           <div className="space-y-2">
//             {products?.map(product => (
//               <div key={product.id} className="flex justify-between text-white/70">
//                 <span>{product.name}</span>
//                 <span className="font-semibold">{product.interest_rate}%</span>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="glass-card p-6">
//           <h2 className="text-xl font-semibold text-white mb-4">Apply for a Loan</h2>
//           <div className="space-y-4">
//             <div>
//               <Label className="text-white/50">Product</Label>
//               <SelectNative options={productOptions} value={selectedProduct} onChange={setSelectedProduct} />
//             </div>
//             <div>
//               <Label className="text-white/50">Amount</Label>
//               <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="bg-white/5 border-white/10 text-white" />
//             </div>
//             <div>
//               <Label className="text-white/50">Duration (months)</Label>
//               <Input type="number" value={months} onChange={(e) => setMonths(e.target.value)} className="bg-white/5 border-white/10 text-white" />
//             </div>
//             <Button onClick={calculateEMI} variant="outline" className="border-white/10 text-white hover:bg-white/10">Calculate EMI</Button>
//             {emi !== null && <p className="text-sm text-white">Estimated Monthly EMI: {formatCurrency(emi)}</p>}
//             <Button onClick={() => applyMutation.mutate()} className="w-full bg-[#7C5CFC] hover:bg-[#6B4EE6]" disabled={!selectedProduct || !amount || !months}>
//               Submit Application
//             </Button>
//           </div>
//         </div>
//       </div>
//       <div>
//         <h2 className="text-xl font-semibold text-white mb-2">My Applications</h2>
//         <div className="space-y-3">
//           {applications?.map(app => (
//             <div key={app.id} className="glass-card p-4">
//               <p className="text-white">Amount: {formatCurrency(app.amount)} | EMI: {formatCurrency(app.monthly_emi)} | Status: <span className="capitalize">{app.status}</span></p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }