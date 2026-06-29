// "use client";
// import { useQuery } from "@tanstack/react-query";
// import api from "@/lib/axios";
// import { Account } from "@/types";
// import { AccountCard } from "@/components/cards/AccountCard";
// import { Skeleton } from "@/components/ui/skeleton";
// import { FundAccountModal } from "@/components/modals/FundAccountModal";
// import { Button } from "@/components/ui/button";
// import { PlusCircle } from "lucide-react";

// export default function AccountsPage() {
//   const { data: accounts, isLoading } = useQuery<Account[]>({
//     queryKey: ["accounts"],
//     queryFn: () => api.get("/accounts/accounts/").then((r) => (Array.isArray(r.data) ? r.data : r.data.results || [])),
//   });

//   if (isLoading) return <Skeleton className="h-64 w-full rounded-2xl" />;

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-white">My Accounts</h1>
//           <p className="text-white/50">Manage your bank accounts</p>
//         </div>
//         <FundAccountModal>
//           <Button className="gap-2 bg-[#7C5CFC] hover:bg-[#6B4EE6] text-white">
//             <PlusCircle className="w-4 h-4" /> Fund Account
//           </Button>
//         </FundAccountModal>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {accounts?.map((account) => (
//           <AccountCard key={account.id} account={account} />
//         ))}
//       </div>
//     </div>
//   );
// }