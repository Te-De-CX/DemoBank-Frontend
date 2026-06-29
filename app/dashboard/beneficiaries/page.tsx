// "use client";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import api from "@/lib/axios";
// import { Beneficiary } from "@/types";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useToast } from "@/components/ui/use-toast";
// import { useState } from "react";

// export default function BeneficiariesPage() {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();
//   const [name, setName] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [bankName, setBankName] = useState("");

//   const { data: beneficiaries } = useQuery<Beneficiary[]>({
//     queryKey: ["beneficiaries"],
//     queryFn: () => api.get("/accounts/beneficiaries/").then(r => r.data),
//   });

//   const addBeneficiary = useMutation({
//     mutationFn: () => api.post("/accounts/beneficiaries/", { name, account_number: accountNumber, bank_name: bankName }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["beneficiaries"] });
//       toast({ title: "Beneficiary added", variant: "success" });
//       setName(""); setAccountNumber(""); setBankName("");
//     },
//     onError: (err: any) => toast({ title: "Error", description: err.response?.data?.error, variant: "destructive" }),
//   });

//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold text-white">Beneficiaries</h1>
//       <div className="glass-card p-6 max-w-xl">
//         <h2 className="text-xl font-semibold text-white mb-4">Add New Beneficiary</h2>
//         <div className="space-y-4">
//           <div>
//             <Label className="text-gray-300">Name</Label>
//             <Input value={name} onChange={(e) => setName(e.target.value)} className="bg-white/5 border-white/10 text-white" />
//           </div>
//           <div>
//             <Label className="text-gray-300">Account Number</Label>
//             <Input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className="bg-white/5 border-white/10 text-white" />
//           </div>
//           <div>
//             <Label className="text-gray-300">Bank Name</Label>
//             <Input value={bankName} onChange={(e) => setBankName(e.target.value)} className="bg-white/5 border-white/10 text-white" />
//           </div>
//           <Button onClick={() => addBeneficiary.mutate()} className="bg-[#7C5CFC] hover:bg-[#6B4EE6]">Add Beneficiary</Button>
//         </div>
//       </div>
//       <div className="grid gap-3">
//         {beneficiaries?.map(b => (
//           <div key={b.id} className="glass-card p-4 flex justify-between items-center">
//             <div>
//               <p className="font-medium text-white">{b.name}</p>
//               <p className="text-sm text-gray-400">{b.account_number} - {b.bank_name}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }