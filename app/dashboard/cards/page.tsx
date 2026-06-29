// "use client";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import api from "@/lib/axios";
// import { Card as CardType } from "@/types";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import { CreditCard, Snowflake, Flame, PlusCircle } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast";
// import { FundAccountModal } from "@/components/modals/FundAccountModal";

// export default function CardsPage() {
//   const queryClient = useQueryClient();
//   const { toast } = useToast();
//   const { data: cards, isLoading } = useQuery<CardType[]>({
//     queryKey: ["cards"],
//     queryFn: () => api.get("/cards/").then((r) => r.data),
//   });

//   const generateCard = useMutation({
//     mutationFn: () => api.post("/cards/generate/"),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["cards"] });
//       toast({ title: "Card generated", variant: "success" });
//     },
//   });

//   const freezeCard = useMutation({
//     mutationFn: (id: number) => api.post(`/cards/${id}/freeze/`),
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cards"] }),
//   });
//   const unfreezeCard = useMutation({
//     mutationFn: (id: number) => api.post(`/cards/${id}/unfreeze/`),
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cards"] }),
//   });

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-white">Virtual Cards</h1>
//           <p className="text-white/50">Manage your virtual cards</p>
//         </div>
//         <div className="flex gap-3">
//           <FundAccountModal />
//           <Button onClick={() => generateCard.mutate()} disabled={generateCard.isPending} className="gap-2 bg-[#7C5CFC] hover:bg-[#6B4EE6]">
//             <PlusCircle className="w-4 h-4" /> New Card
//           </Button>
//         </div>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {cards?.map((card) => (
//           <motion.div key={card.id} whileHover={{ scale: 1.02 }}>
//             <div className="glass-card p-6">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="text-sm text-white/50 capitalize">{card.status}</p>
//                   <p className="text-lg font-mono mt-2 text-white">{card.card_number_masked}</p>
//                   <p className="text-xs text-white/40">Exp: {card.expiry_month}/{card.expiry_year}</p>
//                 </div>
//                 <CreditCard className="h-8 w-8 text-[#7C5CFC]" />
//               </div>
//               <div className="mt-4 flex gap-2">
//                 {card.status === "active" ? (
//                   <Button variant="outline" size="sm" onClick={() => freezeCard.mutate(card.id)} className="border-white/10 text-white hover:bg-white/10">
//                     <Snowflake className="h-4 w-4 mr-1" /> Freeze
//                   </Button>
//                 ) : card.status === "frozen" ? (
//                   <Button variant="outline" size="sm" onClick={() => unfreezeCard.mutate(card.id)} className="border-white/10 text-white hover:bg-white/10">
//                     <Flame className="h-4 w-4 mr-1" /> Unfreeze
//                   </Button>
//                 ) : null}
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }